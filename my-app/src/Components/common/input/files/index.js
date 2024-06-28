import React from "react";
import PropTypes from 'prop-types';

const FileInput = ({ id, label, name, onChange, accept, required = false, invalidFeedback }) => {
    return (
        <>
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
