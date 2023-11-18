import { useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { step3ValidationSchema  } from "../utils/schemaUtil"
import { useSelector, useDispatch } from "react-redux";
import { grantStorageAccess } from "../redux/user"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
                                Were almost there. One last step ....
                            </span>
                        </div>
                        <div className=" flex flex-col gap-2 mb-3 ">
                            <DatePicker
                                name="dateOfBirth"
                                selected={values.dateOfBirth}
                                onChange={(date) => setFieldValue('dateOfBirth', date)}
                                dateFormat="MM/dd/yyyy"
                                showYearDropdown
                                placeholderText="Select date of birth"
                                className="w-1/2"
                            />
                            {errors.dateOfBirth && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.dateOfBirth}</span>}
                        </div>
                        <div className="flex gap-2 ">
                            <div className="  text-[0.65rem] font-bold w-full flex flex-col mb-3 ">
                                <Field as="select" id="genderOptions" name="genderOptions" className="border p-2 rounded-md items-center">
                                    <option value={values.gender} label="Select Your Gender" />
                                    {genderOptions.map((option) => (
                                        <option key={option.value} value={option.value} className="text-center">
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                {errors.genderOptions && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.genderOptions}</span>}
                            </div>
                            <div className="  text-[0.65rem] font-bold w-full flex flex-col mb-3 ">
                                <Field as="select" id="sectorOption" name="sectorOption" className="border p-2 rounded-md">
                                    <option value={values.sector} label="Select Your Field" />
                                    {sectorOption.map((option) => (
                                        <option key={option.value} value={option.value} className="text-center">
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                {errors.sectorOption && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.sectorOption}</span>}
                            </div>
                        </div>
                       <div className="flex gap-2">
                            <div className="mb-3">
                                <div className="flex flex-row justify-between  mb-1">
                                    <Field name="bvnnumber" type='text' placeholder="Enter Your BVN Number" />
                                </div>
                                {errors.bvnnumber && touched.bvnnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.bvnnumber}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <div className="flex flex-row justify-between mb-1">
                                    <Field type="number" name="ninnumber" id='ninnumber' className='ninnumber' placeholder="Enter Your NIN Number" />
                                </div>
                                {errors.ninnumber && touched.ninnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                                ) : null}
                            </div>
                       </div>

                        

                        <div id="image" className=" flex flex-col  mb-3">
                            <div className="flex flex-col">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="image2">Image of your NIN slip : </label>
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
                            </div>
                            {errors.image2 && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.image2}</span>}
                        </div>
                        <div id="image2" className=" flex flex-col mb-3">
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="profilePicture">Profile Picture : </label>

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
                            </div>
                            {errors.profilePicture && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.profilePicture}</span>}
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