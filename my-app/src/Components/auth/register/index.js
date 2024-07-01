import React, { useState ,useEffect} from 'react';
import { TextInput, TextArea ,DateInput } from "../../common/input/text";
import FileInput from "../../common/input/files";
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import IMask from "imask";
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        lastName: '',
        firstName: '',
        password: '',
        phone: '',
        image: null
    });
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const phoneRegExp = /^\+\d{2}\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    // Define Yup schema for validation

    useEffect(() => {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            const maskOptions = {
                mask: '+00(000) 000-00-00',
            };
            IMask(phoneInput, maskOptions);
        }

    }, []);
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        lastName: Yup.string().required('Last name is required'),
        firstName: Yup.string().required('First name is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        textarea: Yup.string().required('Text is required'),
        image: Yup.mixed().required('Profile picture is required').test(
            'fileType',
            'Please select a valid image file',
            (value) => value && value?.type.startsWith('image/')
        )
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    image: file
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
            setValidated(true);
            console.log(`Form Add: ${JSON.stringify(formData, null, 2)}`);
        } catch (error) {
            console.log(error);
            setValidated(true);
            const errors = {};
            error.inner.forEach(err => {
                errors[err.path] = err.message;
            });
            setValidationErrors(errors);
            setModalMessage("Input Data is invalid! Please check input data.");
            setShowModal(true);
        }
    };

    return (
        <>
            <h1 className="text-center">Register</h1>
            <div className="row mt-5">
                <form id="signupForm"
                      className={`col-md-6 offset-md-3 ${validated ? 'was-validated' : ''}`}
                      onSubmit={handleSubmit} noValidate>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="lastName"
                                type="text"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required={true}
                                className={`form-control ${validated && validationErrors.lastName ? 'is-invalid' : 'is-valid' }`}
                                placeholder="Last Name"
                                invalidFeedback={ validated && validationErrors.lastName}
                            />

                        </div>
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="firstName"
                                label="First Name"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required={true}
                                className={`form-control ${validated && validationErrors.firstName ? 'is-invalid' : 'is-valid' }`}
                                placeholder="First Name"
                                invalidFeedback={validated && validationErrors.firstName}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={true}
                                className={`form-control ${validated && validationErrors.email ? 'is-invalid' : 'is-valid' }`}
                                placeholder="example@gmail.com"
                                invalidFeedback={ validated && validationErrors.email}
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="phone"
                                label="Phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required={true}
                                className={`form-control ${validated && validationErrors.phone ? 'is-invalid' : 'is-valid' }`}
                                placeholder="+XX(XXX) XXX-XX-XX"
                                invalidFeedback={ validated && validationErrors.phone}/>
                        </div>
                    </div>

                    <div className="row d-flex align-items-center">
                        <FileInput
                            id="photo"
                            label="Photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            value={formData.image}
                            required={true}
                            invalidFeedback={ validated && validationErrors.image}
                            className={`form-control ${validated && validationErrors.image ? 'is-invalid' : 'is-valid' }`}/>

                    </div>

                    <div className="mb-3">
                        <TextInput
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={true}
                            className={`form-control ${validated && validationErrors.password ? 'is-invalid' : 'is-valid' }`}
                            invalidFeedback={ validated && validationErrors.password}
                        />
                    </div>
                    <div className={'mb-3'}>
                        <DateInput
                            onChange={handleChange}
                            name={'date'}
                            id={'date'}
                            label={"Birth Day"}
                            required={true}

                            />
                    </div>
                    <div className="mb-3">
                        <TextArea
                            id="textarea"
                            label="Hobbies"
                            name="textarea"
                            onChange={handleChange}
                            required={true}
                            className={`form-control ${validated && validationErrors.textarea ? 'is-invalid' : 'is-valid' }`}
                            invalidFeedback={ validated && validationErrors.textarea}/>

                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success me-4">Register</button>
                        <button type="reset" className="btn btn-primary" onClick={() => setFormData({
                            email: '',
                            lastName: '',
                            firstName: '',
                            password: '',
                            phone: '',
                            image: null
                        })}>Cancel</button>
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
