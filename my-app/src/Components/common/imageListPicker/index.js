import React from 'react';
import {MultiFileInput} from "../input/files";

const ImageListPicker = () => {

    return (
     <>
         <MultiFileInput name={'images'} id={"images"} label={"Images"} accept={"image/*"} onChange={() => {}}/>
     </>
    );
};

export default ImageListPicker;