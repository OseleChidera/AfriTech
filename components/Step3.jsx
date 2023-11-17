import { useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { step3ValidationSchema  } from "../utils/schemaUtil"
import { useSelector, useDispatch } from "react-redux";
import { grantStorageAccess } from "../redux/user"

const Step3 = ({ data, next, prev }) => {
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const dispatch = useDispatch();
    const requestPermission = async () => {
        // Request permission from the user to access storage
        if (!hasPermission) {
            if (window.confirm('To be able to upload your documents we would require access to your storage. Would you like to grant us access to your storage 😃 ?')) {
                dispatch(grantStorageAccess(true))
            }
            else {
                dispatch(grantStorageAccess(false))

            }
        }

    };
    requestPermission()

    const handleSubmit = (values) => {
        console.table(values)
        next(values)
    }
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'prefer not to say', label: 'Prefer not to say' },
    ];
    const sectorOption = [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Business', label: 'Business' },
        { value: 'Management', label: 'Management' },
        { value: 'Maintainance', label: 'Maintainance' },
        { value: 'Banking & Finance', label: 'Banking & Finance' },
        { value: 'Education', label: 'Education' },
        { value: 'Entertainment', label: 'Entertainment' },
    ];
    return (
        <Formik
            initialValues={data}
            validationSchema={step3ValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Form>
                    <div id='form-three' className='max-w-xs '>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize  mb-4 text-white text-xl'>
                                Were almost there. ne last step ....
                            </span>
                        </div>
                        <div className="mb-3">
                            <div className="flex flex-row justify-between items-center mb-1">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="bvnnumber">BVN Number : </label>
                                <Field name="bvnnumber" type='text' />
                            </div>
                            {errors.bvnnumber && touched.bvnnumber ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.bvnnumber}</div>
                            ) : null}
                       </div>

                        <div className=" flex flex-col gap-2 mb-3">
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="profilePicture">Upload a clear Profile Profile Picture : </label>

                                <Field
                                    type="file"
                                    name="profilePicture"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value=""
                                    onChange={(event) => {
                                        setFieldValue('profilePicture', event.currentTarget.files[0]);
                                    }}
                                />
                                {errors.profilePicture && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.profilePicture}</span>}
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2 mb-3">
                            <div className="flex flex-row justify-between items-center mb-1">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="ninnumber">NIN Number : </label>
                                 <Field type="number" name="ninnumber" id='ninnumber' className='ninnumber' />
                            </div>
                            {errors.ninnumber && touched.ninnumber ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                            ) : null}
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="image2">Upload a clear image of your NIN slip : </label>

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
                        <div className="mb-3">
                        <div className="">
                                <label htmlFor="genderOptions" className='font-bold capitalize block mb-[0.25rem] text-white'>Select Your Gender :</label>
                            <Field as="select" id="genderOptions" name="genderOptions">
                                <option value={values.gender} label="Select an option" />
                                    {genderOptions.map((option) => (
                                    <option key={option.value} value={option.value} className="text-center">
                                        {option.label}
                                    </option>
                                ))}
                            </Field>
                        </div>
                            {errors.genderOptions && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.genderOptions}</span>}
                        </div>
                        <div className="mb-3">
                            <div className="">
                                <label htmlFor="sectorOption" className='font-bold capitalize block mb-[0.25rem] text-white'>Select Your Occupation Field :</label>
                                <Field as="select" id="sectorOption" name="sectorOption">
                                    <option value={values.sector} label="Select an option" />
                                    {sectorOption.map((option) => (
                                        <option key={option.value} value={option.value} className="text-center">
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            {errors.sectorOption && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.sectorOption}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="bbutton" onClick={() => prev(values)} className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative '
                            >Prev</button>
                            <button type="submit" className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative'
                            >Next</button>
                        </div>

                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default Step3