import React, { useEffect } from 'react';
import { TextInput, TextArea, DateInput } from "../../common/input/text";
import {FileInput} from "../../common/input/files";
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import IMask from "imask";
import { useFormik } from "formik";

const RegisterPage = () => {
    const phoneRegExp = /^\+\d{2}\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const registrationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        lastName: Yup.string().required('Last name is required'),
        firstName: Yup.string().required('First name is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
        textarea: Yup.string().required('Text is required'),
        image: Yup.mixed().required('Profile picture is required').test(
            'fileType',
            'Please select a valid image file',
            (value) => value && ['image/png','image/jpeg'].includes(value?.type)
        ),
        date: Yup.date().required('Date is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            lastName: '',
            firstName: '',
            password: '',
            date: '',
            textarea: '',
            phone: '',
            image: null
        },
        validationSchema: registrationSchema,
        onSubmit: async (values) => {
            try {
                await registrationSchema.validate(values, { abortEarly: false });
                console.log(`Form Add:`,values);
            } catch (error) {
                console.log(error);
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });

                setModalMessage("Input Data is invalid! Please check input data.");
                setShowModal(true);
            }
        }
    });

    const { values, touched, errors, handleSubmit, handleChange, setFieldValue, isValid, dirty } = formik;

    // useEffect(() => {
    //     const phoneInput = document.getElementById('phone');
    //     if (phoneInput) {
    //         const maskOptions = {
    //             mask: '+00(000) 000-00-00',
    //         };
    //         IMask(phoneInput, maskOptions);
    //     }
    // }, []);

    const [showModal, setShowModal] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');

    const handleFileChange = (event) => {
        const files = event.target.value;
        console.log(files);
        setFieldValue('image', files);
    };

    return (
        <>
            <h1 className="text-center">Register</h1>
            <div className="row mt-5">
                <form id="signupForm"
                      className={`col-md-6 offset-md-3 `} //${!isValid && dirty ? 'was-validated' : ''}
                      onSubmit={handleSubmit} noValidate>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="lastName"
                                type="text"
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                required={true}
                                placeholder="Last Name"
                                error={errors.lastName}

                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="firstName"
                                label="First Name"
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                required={true}
                                placeholder="First Name"
                                error={errors.firstName}
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
                                value={values.email}
                                onChange={handleChange}
                                required={true}
                                placeholder="example@gmail.com"
                                error={errors.email}
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <TextInput
                                id="phone"
                                label="Phone"
                                type="tel"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                required={true}
                                placeholder="+XX(XXX) XXX-XX-XX"
                                error={errors.phone}
                            />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-3">
                        <FileInput
                            id="photo"
                            label="Photo"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            value={values.image}
                            required={true}
                            error={errors.image  ? errors.image : null}
                        />
                    </div>

                    <div className="mb-3">
                        <TextInput
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            required={true}
                            error={errors.password}
                        />
                    </div>
                    <div className="mb-3">
                        <DateInput
                            onChange={handleChange}
                            value={values.date}
                            name="date"
                            id="date"
                            label="Birth Date"
                            required={true}
                            error={errors.date}
                        />
                    </div>
                    <div className="mb-3">
                        <TextArea
                            id="textarea"
                            label="Hobbies"
                            name="textarea"
                            value={values.textarea}
                            onChange={handleChange}
                            required={true}
                            error={errors.textarea}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success me-4">Register</button>
                        <button type="reset" className="btn btn-primary" onClick={() => formik.resetForm()}>Cancel</button>
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
