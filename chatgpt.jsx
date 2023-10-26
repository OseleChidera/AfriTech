import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const MultiStepForm = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        // Handle form submission logic here
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, values }) => (
                <Form>
                    {/* Step 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <label htmlFor="firstName">First Name</label>
                        <Field type="text" name="firstName" />
                        <ErrorMessage name="firstName" component="div" className="error" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <label htmlFor="lastName">Last Name</label>
                        <Field type="text" name="lastName" />
                        <ErrorMessage name="lastName" component="div" className="error" />
                    </div>

                    {/* Step 2 */}
                    {values.firstName && values.lastName && (
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                    )}

                    {/* Step 3 */}
                    {values.email && (
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                    )}

                    {/* Buttons htmlFor navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" disabled={values.firstName === ''} onClick={() => console.log('Step 1')}>Next</button>
                        <button type="button" disabled={values.email === ''} onClick={() => console.log('Step 2')}>Next</button>
                        <button type="submit" disabled={isSubmitting || !isValid}>Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MultiStepForm;