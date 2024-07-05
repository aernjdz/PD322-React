import React from "react";
import PropTypes from 'prop-types';
import noPhoto from '../../../../assets/no-photo.png'
import plus from '../../../../assets/plus.jpg'
import classNames from "classnames";
import './style.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const FileInput = ({ id, label, name, onChange, accept, required = false, value, error }) => {
    const img = value === null ? noPhoto : URL.createObjectURL(value);
    return (
        <>
            <div className="col-md-3">
            <label htmlFor="photo" className="form-label">
                <img src={img} alt="Preview" id="userImg" width="100vw" className={"img-fluid"} />
            </label>
            </div>

            <div className={"mb-3 col-md-9"}>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                id={id}
                name={name}
                type="file"
                className={classNames("form-control",{
                    "is-invalid": error
                })}
                onChange={onChange}
                accept={accept}
                required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    )
}

FileInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    accept: PropTypes.string.isRequired,
}

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


