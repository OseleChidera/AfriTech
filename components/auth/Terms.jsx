
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    agreeToTerms: Yup.bool()
    .required('You cant proceed further without accepting therms'),
    
});
const Terms = () => {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [showPassowrd, setShowPassowrd] = useState(false)

   const handleSubmit =(values)=>{
console.log(values)
   }
    const initialValues = {
        agreeToTerms: false,
        
    };
    return (
        <div className="max-w-xs w-full overflow-scroll">
            <h5 className="font-bold text-7xl capitalize mb-3 text-shadow-md">
                Legal Terms and Conditions
            </h5>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
            {({ errors , touched,values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex-row items-start">
                    {/* <span>1.</span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'> Introduction</h3>
                                <ol className='text-xs'>
                                    <li>
                                        Welcome to our platform! This platform provides users with
                                        access to a variety of features and services, including the
                                        ability to determine whether to grant user access to the platform
                                        based on user-entered data and data found online, as well as
                                        confirming with Nigeria's financial security standards.
                                    </li>
                                    <li>
                                        By using our platform, you agree to be bound by these Terms and
                                        Conditions. If you do not agree to these Terms and Conditions,
                                        please do not use our platform.
                                    </li>
                                </ol>
                    </div>
                </div>

                       <div className="mb-3 flex-row items-start">
                    {/* <span>2.</span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>2. Definitions</h3>
                                <ul className='text-xs'>
                                    <li>User: Any person or entity that uses our platform.</li>
                                    <li>Personal Data: Any information relating to an identified or identifiable natural person.</li>
                                    <li>Financial Security Standards: The financial security standards set by the Nigerian government.</li>
                                </ul>
                    </div>
                </div>

                        <div className="mb-3 flex-row items-start">
                    {/* <span>3. </span> */}
                    <h3 className='font-bold underline leading-tight'>Use of the Platform</h3>
                            <div className="flex flex-col gap-2 text-xs" >
                                <span>
                                    You may use our platform for any lawful purpose. However, you may
                                    not use our platform for any purpose that is:
                                </span>
                                <ul>
                                    <li>Illegal</li>
                                    <li>Fraudulent</li>
                                    <li>Harmful to our platform or to other users</li>
                                    <li>In violation of these Terms and Conditions</li>
                                </ul>
                    </div>
                </div>

                        <div className="mb-3 flex-row items-start">
                            {/* <span>4. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Data Collection and Use</h3>
                                <ul className='text-xs'>
                                    <li>
                                        We collect and use Personal Data from users in order to provide the
                                        features and services of our platform. We also collect and use
                                        Personal Data to comply with Nigeria's financial security
                                        standards.
                                    </li>

                                    <li>
                                        We will only collect and use Personal Data that is necessary to
                                        provide the features and services of our platform and to comply
                                        with Nigeria's financial security standards. We will not sell or
                                        share your Personal Data with any third parties without your
                                        consent.
                                    </li>
                                </ul>
                    </div>
                </div>
{/* <div className="mb-3 flex-row items-start"> */}
                       <div className="mb-3 flex-row items-start">
                            {/* <span>5. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Data Security</h3>
                                <span className='text-xs'>
                                    We take the security of your Personal Data very seriously. We have
                                    implemented a variety of security measures to protect your
                                    Personal Data from unauthorized access, use, disclosure,
                                    modification, or destruction.
                                </span>
                    </div>
                </div>

                       <div className="mb-3 flex-row items-start">
                            {/* <span>6. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Your Rights</h3>
                                <div className="flex flex-col gap-2 text-xs">
                                    <span>
                                        You have the following rights with respect to your Personal Data:
                                    </span>
                                    <ul>
                                        <li>The right to access your Personal Data</li>
                                        <li>The right to rectify your Personal Data</li>
                                        <li>The right to erase your Personal Data</li>
                                        <li>The right to restrict processing of your Personal Data</li>
                                        <li>The right to object to processing of your Personal Data</li>
                                        <li>The right to data portability</li>
                                    </ul>
                                </div>
                    </div>
                </div>

                       <div className="mb-3 flex-row items-start">
                            {/* <span>7. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Changes to These Terms and Conditions</h3>
                                <span className='text-xs'>
                                    We may update these Terms and Conditions from time to time. If we
                                    make any changes, we will post the updated Terms and Conditions on
                                    our platform.</span>
                   </div>
                    </div>

                       <div className="mb-3 flex-row items-start">
                            {/* <span>8. </span> */}
                            <div className="flex flex-col gap-2">
                                <h3 className='font-bold underline leading-tight'>Governing Law and Jurisdiction</h3>
                                <span className='text-xs'>These Terms and Conditions shall be governed by and construed in accordance with the laws of Nigeria. Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Nigeria.</span>
                    </div>
                    </div>

                   <div className="mb-3 flex-row items-start">
                            {/* <span>9. </span> */}
                    <div className="flex flex-col gap-2">
                                <h3>Contact Us</h3>
                                <span className='text-xs'>If you have any questions about these Terms and Conditions, please contact us at [email protected]</span>
                    </div>

                    </div>
                    <div className="mb-3">
                    <h3 className='font-bold underline leading-tight'>10. Acceptance</h3>
                            <span className='text-xs'>By using our platform, you agree to be bound by these Terms and Conditions.</span>
                    </div>

                    <div className="mb-3">
                   <div className="flex gap-3">
                                <Field name="agreeToTerms" type="checkbox" onChange={handleChange} />
                                <span className='text-sm'> I [customer firstName , LastName] agree to the terms and conditions stated above</span>
                   </div>
                            {errors.agreeToTerms && errors.touvhed ?<span className='text-[0.7rem] text-red-600 font-semibold'>{errors.agreeToTerms}</span> : null}
                    </div>
                <div className="flex w-full">
                
                    <button
                        type="submit"
                        className='font-buld capitalize bg-blue-500 text-white capitalize px-[0.5rem] py-[0.35rem] w-full'>
                        Proceed
                    </button>
                </div>
            </form>
             )}
        </Formik>
        </div>
    )
}

export default Terms







