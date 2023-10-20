import { useState, useContext } from "react";
import { MyContext } from "@/utils/Datacontext";
import { Formik, Form, Field, FormikStep, FormikStepper, FormikProvider } from 'formik';
import * as Yup from 'yup';

const Step3 = () => {
    const { Values, pageindex, setPageIndex, isSubmitClicked, setIsSubmitClicked, partiallyDisableButton } = useContext(MyContext)
    const [hasPermission, setHasPermission] = useState(true);
    const requestPermission = async () => {
        // Request permission from the user to access storage
        if (!hasPermission) {
            if (window.confirm('To be able to upload your documents we would require access to your storage. Would you like to grant us access to your storage 😃 ?')) {
                setHasPermission(true);
            }
            else {
                setHasPermission(false);
            }
        }

    };
    requestPermission()
    const handleSubmit = (values) => {
        // Handle form submission with the uploaded image
        console.log(values);
        setPageIndex(pageindex => pageindex + 1)
    };

    return (
        <div id='form-three' className='max-w-xs w-full'>
            <div className="mb-3">
                <span className='font-extrabold capitalize text-base mb-4'>
                    Were almost there. ne last step ....
                </span>
            </div>
            <Formik
                initialValues={{
                    passportnumber: '',
                    image: null,
                    ninnumber: '',
                    image2: null,
                }}
                validationSchema={Yup.object().shape({
                    passportnumber: Yup.string()
                        .min(2, 'Too Short!')
                        .max(8, 'Too Long!')
                        .required('Required'),
                    image: Yup.mixed()
                        .required('Image is required')
                        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
                        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                            value && (value.type === 'image/jpeg' || value.type === 'image/png')
                        ),
                    ninnumber: Yup.number()
                        .required('Required')
                        .test("length", "too long", (value) => value.toString().length === 6),
                    image2: Yup.mixed()
                        .required('Image is required')
                        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
                        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
                            value && (value.type === 'image/jpeg' || value.type === 'image/png')
                        ),
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <div className=" flex flex-col gap-2 mb-3">
                            <div className="flex flex-col gap-2 justify-start">
                                <label className='font-bold capitalize block mb-[0.25rem]' htmlFor="passportnumber">Passport Number : </label>

                                <Field type="text" name="passportnumber" id='passportnumber' className='passportnumber' />
                                {errors.passportnumber && touched.passportnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.passportnumber}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem]' for="image">Upload a clear image of your passport : </label>

                                <Field
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value=""
                                    onChange={(event) => {
                                        setFieldValue('image', event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.image && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.image}</span>}
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 mb-3">
                            <div className="flex flex-col gap-2 justify-start">
                                <label className='font-bold capitalize block mb-[0.25rem]' htmlFor="ninnumber">NIN Number : </label>

                                <Field type="number" name="ninnumber" id='ninnumber' className='ninnumber' />
                                {errors.ninnumber && touched.ninnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem]' for="image2">Upload a clear image of your NIN slip : </label>

                                <Field
                                    type="file"
                                    name="image2"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value=""
                                    onChange={(event) => {
                                        setFieldValue('image2', event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.image2 && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.image2}</span>}
                            </div>
                        </div>

                        <button type="submit" className='flex items-center justify-center font-bold capitalize bg-blue-500 text-xl text-white capitalize p-2 rounded-sm relative float-right'
                            onClick={(e) => { partiallyDisableButton(e.target) }}
                        >Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default Step3