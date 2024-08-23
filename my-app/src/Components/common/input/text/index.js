import PropTypes from 'prop-types';
import React from "react";
import classNames from "classnames";

const TextInput = ({ id, label, type, name, value, onChange, required = false , error ,placeholder}) => {
    return (
      <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className={classNames("form-control",{
                    "is-invalid": error
                })}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
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
    placeholder: PropTypes.string,


};

const TextInputnw = ({ id, label, type, name, value, onChange, required = false , error ,placeholder, touched }) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                className={classNames("form-control",{
                    "is-invalid": error && touched
                })}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {(error && touched) && <div className="invalid-feedback">{error}</div>}
        </>
    );
}
TextInputnw.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email','tel']).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.oneOf([true,false]).isRequired,
    placeholder: PropTypes.string,


};



const TextArea = ({ id, label, name, value, onChange, required = false, error, placeholder, rows }) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <textarea
                className={classNames("form-control",{
                    "is-invalid": error
                })}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                rows={rows}
            />
            {error && <div className="invalid-feedback">{error}</div>}
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
    placeholder: PropTypes.string,
    rows: PropTypes.number,
};


const DateInput = ({ id, label, name, value, onChange, required = false, error, placeholder }) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type="date"
                className={classNames("form-control",{
                    "is-invalid": error
                })}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
}
DateInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,

    placeholder: PropTypes.string,
};

export  {TextArea , TextInput , DateInput, TextInputnw};