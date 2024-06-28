import React from "react";
import PropTypes from 'prop-types';
import noPhoto from '../../../../assets/no-photo.png'
const FileInput = ({ id, label, name, onChange, accept, required = false, value, invalidFeedback }) => {
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
                className="form-control"
                onChange={onChange}
                accept={accept}
                required={required}
            />
            {invalidFeedback && <div className="invalid-feedback">{invalidFeedback}</div>}
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
    invalidFeedback: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
}

export default FileInput;
