import React,{useRef,useState} from "react";
import PropTypes from 'prop-types';
import noPhoto from '../../../../assets/no-photo.png'
import plus from '../../../../assets/plus.jpg'
import classNames from "classnames";
import './style.css';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from 'react-bootstrap';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const FileInput = ({ id, label, name, onChange, accept, required = false, value, error }) => {
    const [image, setImage] = useState(value);
    const [cropper, setCropper] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const inputRef = useRef(null);
    const imgRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target?.files?.[0];
        if (!file) {
            setErrorMessage("Please select a file.");
            resetInput();
            return;
        }

        // Validate file type (accept only image files)
        if (!file.type.startsWith('image/')) {
            setErrorMessage("Only image files are allowed.");
            resetInput();
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setShowModal(true);
            setErrorMessage(null);
        };
        reader.readAsDataURL(file);
    };

    const resetInput = () => {
        if (inputRef.current) {
            inputRef.current.value = ''; // Reset input field
        }
    };

    const handleRotate = () => {
        if (cropper) {
            cropper.rotate(90);
        }
    };

    const handleCrop = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            canvas.toBlob(blob => {
                const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
                onChange({ target: { name, value: file } });
                setImage(URL.createObjectURL(blob));
                setShowModal(false);
            });
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setErrorMessage(null);
    };

    return (
        <>
            <div className="col-md-3">
                <label htmlFor="photo" className="form-label">
                    <img
                        src={image || noPhoto}
                        alt="Preview"
                        id="userImg"
                        width="100vw"
                        className={"img-fluid"}
                    />
                </label>
            </div>

            <div className={"mb-3 col-md-9"}>
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="file"
                    className={classNames("form-control", {
                        "is-invalid": errorMessage // Apply is-invalid class based on errorMessage
                    })}
                    onChange={handleFileChange}
                    accept={accept}
                    required={required}
                />
                {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crop Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="crop-container">
                        <img
                            src={image}
                            alt="Crop"
                            ref={imgRef}
                            style={{ maxWidth: "100%" }}
                            onLoad={() => {
                                if (cropper) cropper.destroy();
                                const cropperInstance = new Cropper(imgRef.current, {
                                    aspectRatio: 1,
                                    viewMode: 1,
                                    rotatable: true,
                                });
                                setCropper(cropperInstance);
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRotate}>
                        Rotate 90°
                    </Button>
                    <Button variant="success" onClick={handleCrop}>
                        Crop & Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

FileInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    accept: PropTypes.string.isRequired,
    error: PropTypes.string,
};
const MultiFileInput = ({ id, label, name, onChange, accept, required = false, value, error }) => {
    const [images, setImages] = React.useState([]);
    const [fileList, setFileList] = React.useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newFileList = [...fileList, ...files];
        setFileList(newFileList);
        onChange(newFileList);
        const imageFiles = files.map((file) => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageFiles]);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newFileList = fileList.filter((_, i) => i !== index);
        setImages(newImages);
        setFileList(newFileList);
        onChange(newFileList);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);
        setImages(reorderedImages);

        const reorderedFiles = Array.from(fileList);
        const [movedFile] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, movedFile);
        setFileList(reorderedFiles);
        onChange(reorderedFiles);
    };

    return (
        <>
            <div className="mb-3">
                <div className="row">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                <div
                                    className="row"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {images.map((image, index) => (
                                        <Draggable key={image} draggableId={image} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="col-md-3 image-preview"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <img src={image} className="img-fluid" alt={`Preview ${index}`} />
                                                    <button onClick={() => removeImage(index)} className="remove-button">X</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    <div className="col-md-3">
                                        <label htmlFor={id} className="form-label">
                                            <img src={plus} alt="" className="img-fluid" />
                                        </label>
                                        <input
                                            type="file"
                                            className= {"d-none"}
                                            id={id}
                                            name={name}
                                            multiple
                                            onChange={handleFileChange}
                                            accept={accept}
                                        />
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        </>
    );
};


MultiFileInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    required: PropTypes.bool.isRequired,
    accept: PropTypes.string.isRequired,
}
export {FileInput , MultiFileInput};


