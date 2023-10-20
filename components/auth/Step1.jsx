import { useState , useContext } from "react";
import { MyContext } from "@/utils/Datacontext";
import { Formik,Form, Field ,FormikStep, FormikStepper, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { database } from '@/firebase/firebaseConfig';
const Step1 = ({ initialValues, pageindex, isSubmitClicked, partiallyDisableButton, user, setUser }) => {
    const [showPassowrd1, setShowPassword1] = useState(false)
    const [showPassowrd2, setShowPassword2] = useState(false)
    
  
    const [prompt, setPrompt] = useState(user);

   
    return (
        <div id='form-two' className='max-w-xs w-full'>
            <div className="mb-3">
                <span className='font-extrabold capitalize text-base mb-4'>
                    Hi there,welcome to AfriTech! 👋
                </span>
            </div>
            <Formik
                initialValues={{
                    email: 'oselechidera560@gmail.com',
                    password: '11111111',
                    confirm_password: '11111111',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .min(2, 'Too Short!')
                        .max(45, 'Too Long!')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Too Short!')
                        .max(12, 'Too Long!')
                        .required('Required'),
                    confirm_password: Yup.string()
                        .min(8, 'Too Short!')
                        .max(12, 'Too Long!')
                        .required('Required')
                        .oneOf([Yup.ref("password")], "Passwords must match"),
                })}
                async onSubmit={(values ) => {
                    // setPrompt(values)
                    console.log(values);
                    // console.log(prompt)
                      createUserWithEmailAndPassword(auth, values.email, values.password)
                          .then((userCredential) => {
                              console.log(userCredential)
                              // Signed in 
                              const userProfile = userCredential.user;
                              // ...
                              console.log(userProfile.reloadUserInfo.localId)
                              const customDocRef = doc(database, 'Users', `${userProfile.reloadUserInfo.localId}`);
                              setDoc(customDocRef, { email: values.email, password: values.password });


                          })
                          .catch((error) => {
                              console.log(error)
                              const errorCode = error.code;
                              const errorMessage = error.message;
                          });
                          console.log('user created successfuly')

                    
                    // setPageIndex(pageindex => pageindex + 1)


                }}
            >
                {({ errors, touched }) => (

                    <Form>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="email">Email : </label>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="password">Password : </label>
                            <div className="flex flex-row items-center">
                                <Field name="password" type={showPassowrd1 ? 'text' : 'password'} />
                                <button type='button' onClick={() => setShowPassword1((showPassowrd1) => !showPassowrd1)} className='bg-transparent border-none absolute right-10 z-10'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.password && touched.password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.password}</div>
                            ) : null}
                        </div>

                        <div className="mb-3">
                            <label className='font-bold capitalize block mb-[0.25rem]' for="confirm_password">Re-enter Password : </label>
                            <div className="flex flex-row items-center">
                                <Field name="confirm_password" type={showPassowrd2 ? 'text' : 'password'} />
                                <button type='button' onClick={() => setShowPassword2((showPassowrd2) => !showPassowrd2)} className='bg-transparent border-none absolute right-10 z-10'>
                                    <img width="18" height="18" src="https://img.icons8.com/ios/50/show-password.png" alt="show-password" />
                                </button>
                            </div>
                            {errors.confirm_password && touched.confirm_password ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.confirm_password}</div>
                            ) : null}
                        </div>
                        {prompt && <p className="text-red-700 font-bold text-lg">{prompt}</p>}


                        {/* <div className="flex flex-row justify-between items-center"> */}
                        <button
                            type="submit"
                            // onClick={(e) => { partiallyDisableButton(e.target) }}
                            className={`font-bold capitalize bg-blue-500 text-xl text-white capitalize px-4 py-[0.55rem] rounded-lg relative float-right `}>
                            Sign Up
                        </button>
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default Step1
