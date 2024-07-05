import React from 'react';
import { TextInput_nw } from "../../common/input/text";

import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';

import { useFormik } from "formik";
import {MultiFileInput} from "../../common/input/files";

const PizzaCreatePage = () => {

    const registrationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        // images: Yup.array().of(Yup.mixed().test(
        //     'fileType',
        //     'Please select a valid image file',
        //     (value) => value && ['image/png','image/jpeg'].includes(value?.type)
        // )).required('Please select a valid image file')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description :'',
            images: []
        },
        validationSchema: registrationSchema,
        onSubmit: async (values) => {
            try {
                await registrationSchema.validate(values, { abortEarly: false });
                console.log(`Form Add: ${values}`);
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
    const onChangeFileHandler = (files) => {
        console.log("onChange", files);
        setFieldValue("images", files);
        // const file = e.target.files[0];
        // if (file) {
        //     setFieldValue(e.target.name, file);
        //     //setData({...data, [e.target.name]: file});
        // }
        // else {
        //     setFieldValue(e.target.name, null);
        //     //setData({...data, [e.target.name]: null});
        //     //alert("Оберіть фото");
        // }
    }

    return (
        <>
            <h1 className="text-center">Register</h1>
            <div className="row mt-5">
                <form id="pizza"
                      className={`col-md-6 offset-md-3 `}//${!isValid && dirty ? 'was-validated' : ''}
                      onSubmit={handleSubmit} noValidate>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <TextInput_nw
                                id="name"
                                type="text"
                                label="Name"
                                name="name"
                                value={values.name}
                                touched={touched.name}
                                onChange={handleChange}
                                required={true}
                                placeholder="Name"
                                error={errors.name}

                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <TextInput_nw
                                id="description"
                                label="Description"
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                required={true}
                                placeholder="Description"
                                touched={touched.description}
                                error={errors.description}
                            />
                        </div>
                        <div className={'mb-3'} >
                            <MultiFileInput
                                name={"images"}
                                id={"images"}
                                label={"Images"}
                                required={true}
                                value={values.images}
                                accept="image/*"
                                error={errors.images}
                                onChange={onChangeFileHandler}/>
                        </div>
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

export default PizzaCreatePage;
