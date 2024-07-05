import React, { useState, useRef } from 'react';

const ImageListPicker = () => {
    const [images, setImages] = useState([
        { id: 1, src: 'https://via.placeholder.com/150', alt: 'Image 1' },
        { id: 2, src: 'https://via.placeholder.com/100', alt: 'Image 2' },
        { id: 3, src: 'https://via.placeholder.com/150', alt: 'Image 3' },
    ]);

    const draggedImage = useRef(null);
    const draggedOverImage = useRef(null);

    const handleDragStart = (e, index) => {
        draggedImage.current = index;
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        draggedOverImage.current = index;
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const imagesCopy = [...images];
        const draggedImageIndex = draggedImage.current;
        const draggedOverImageIndex = draggedOverImage.current;

        if (draggedImageIndex !== draggedOverImageIndex) {
            // Swap images in the array
            const temp = imagesCopy[draggedOverImageIndex];
            imagesCopy[draggedOverImageIndex] = imagesCopy[draggedImageIndex];
            imagesCopy[draggedImageIndex] = temp;
            setImages(imagesCopy);
        }
    };

    const handleDragEnd = () => {
        draggedImage.current = null;
        draggedOverImage.current = null;
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = {
                    id: images.length + i + 1, // Generate unique ID
                    src: e.target.result,
                    alt: `Image ${images.length + i + 1}`
                };
                setImages(prevImages => [...prevImages, newImage]);
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="container">
            <h1 className="my-4">Drag and Drop Images</h1>
            <input type="file" multiple onChange={handleFileUpload} className="mb-3" />

            <div className="row">
                {images.map((image, index) => (
                    <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="image-container"
                             draggable
                             onDragStart={(e) => handleDragStart(e, index)}
                             onDragOver={(e) => handleDragOver(e, index)}
                             onDragEnter={(e) => handleDragEnter(e, index)}
                             onDragLeave={(e) => handleDragLeave(e)}
                             onDrop={(e) => handleDrop(e)}
                             onDragEnd={handleDragEnd}
                        >
                            <img src={image.src} alt={image.alt} className="img-fluid rounded" />
                            <button onClick={() => handleDeleteImage(index)} className="btn btn-danger mt-2">Видалити</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageListPicker;