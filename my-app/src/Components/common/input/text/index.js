import PropTypes from 'prop-types';
import React from "react";

const TextInput = ({ id, label, type, name, value, onChange, required = false, invalidFeedback,placeholder }) => {
    return (
      <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {invalidFeedback && <div className="invalid-feedback">{invalidFeedback}</div>}
       </>
    );
}
TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email','tel']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.oneOf([true,false]).isRequired,
    invalidFeedback: PropTypes.string.isRequired,
    placeholder: PropTypes.string,


};




const TextArea = ({ id, label, name, value, onChange, required = false, invalidFeedback, placeholder, rows }) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <textarea
                className="form-control"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                rows={rows}
            />
            {invalidFeedback && <div className="invalid-feedback">{invalidFeedback}</div>}
        </>
    );
}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    invalidFeedback: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
};

export  {TextArea , TextInput};