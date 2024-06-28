import React, { useState, useEffect } from 'react';
import TextInput from "../../common/input/text";
import FileInput from "../../common/input/files";
import noPhoto from '../../../no-photo.png';
import IMask from 'imask';
import { Modal, Button } from 'react-bootstrap';
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        lastName: '',
        firstName: '',
        password: '',
        phone: '',
        photo: null,
        photoPreview: noPhoto
    });
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'photo' && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    photo: file,
                    photoPreview: URL.createObjectURL(file)
                });
            } else {

                setModalMessage("Please select a valid image file");
                setShowModal(true);
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity() || !formData.photo) {
            e.stopPropagation();
            setValidated(true);
            if (!formData.photo) {
                setModalMessage("Please select a profile picture");
                setShowModal(true);
            } else {
                setModalMessage("Please input valid data");
                setShowModal(true);
            }
            return;
        }else{
            setValidated(true);
            console.log(`Form Add: ${JSON.stringify(formData, null, 2)}`);
        }

    };

    useEffect(() => {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            const maskOptions = {
                mask: '+00(000) 000-00-00',
            };
            IMask(phoneInput, maskOptions);
        }

    }, []);
    return (
        <>
        <h1 className="text-center">Register</h1>
    <div className="row mt-5">
        <form id="signupForm" className={`col-md-6 offset-md-3 needs-validation ${validated ? 'was-validated' : ''}` }
              onSubmit={handleSubmit} noValidate>

            <div className={"row"}>
                <div className={"mb-3 col-md-6"}>
                    <TextInput
                        id="lastName"
                        type={'text'}
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required={true}
                        invalidFeedback="Please provide your last name."
                        placeholder={'Last Name'}
                    />

                </div>
                <div className={"mb-3 col-md-6"}>
                    <TextInput
                        id="firstName"
                        label="First Name"
                        type={'text'}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required={true}
                        invalidFeedback="Please provide your name."
                        placeholder={'First Name'}/>

                </div>
            </div>
            <div className={"row"}>
                <div className={"mb-3 col-md-6"}>
                    <TextInput
                        id="email"
                        label="Email"
                        type={'email'}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        invalidFeedback="Please provide a valid email."
                        placeholder={'example@gmail.com'}/>

                </div>
                <div className={"mb-3 col-md-6"}>
                    <TextInput
                        id="phone"
                        label="Phone"
                        type={'tel'}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required={true}
                        invalidFeedback="Please provide a phone number."
                        placeholder={"+XX(XXX) XXX-XX-XX"}/>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col-md-3">
                    <label htmlFor="photo" className="form-label">
                        <img src={ formData.photoPreview } alt="Preview"  id="userImg" width="100vw"/>
                    </label>
                </div>

                <div className={"mb-3 col-md-9"}>
                    <FileInput id={'photo'}
                               label={'Photo'}
                               name="photo"
                               accept={"image/*"}
                               onChange={handleChange}
                               required={true}
                               invalidFeedback="Please provide a profile picture."/>

                </div>
            </div>
            <div className={"mb-3"}>
                <TextInput
                    id="password"
                    label="Password"
                    type={'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={true}
                    invalidFeedback="Please provide a password."/>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success me-4">Register</button>
                <button type="reset" className="btn btn-primary" onClick={() => setFormData({
                    email: '',
                    lastName: '',
                    firstName: '',
                    password: '',
                    phone: '',
                    photo: null,
                    photoPreview: noPhoto
                })}>Cancel
                </button>
            </div>
        </form>
    </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegisterPage;
