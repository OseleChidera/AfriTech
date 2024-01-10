"use client";
import React, { useState , useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth } from "@/firebaseConfig";
import { database } from '../../firebaseConfig';

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {toast } from 'react-toastify';
import { SigninSchema } from '../../utils/schemaUtil'
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from "@/utils/utility";
import { useSelector, useDispatch } from "react-redux";
import { setUserIdData, removeUserData, setLoading, fetchDataByUserId, setCurrentUserData, incrementSigninToStartMultistep, incrementSignin } from '../../redux/user'
import axios from 'axios';



const SigninMain = ({nextStep, isDisabled }) => {
const userObj = useSelector((state) => state.user.valueObj);
const dispatch = useDispatch();
const [showPassword, setShowPassword] = useState(false);

  async function checkForUserData(userId, values) {
    console.log(userId)
    try {
      const response = await axios.get(`https://firestore.googleapis.com/v1/projects/afritech-b3227/databases/(default)/documents/Users/${userId}`);
      console.log(response)
      if (response.data.fields.agreeToTerms === undefined && response.data.fields.ninnumber === undefined && response.data.fields.profilePicture === undefined){
        dispatch(incrementSigninToStartMultistep())
      }
        else{
          toast.success("Login successful home page", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            onOpen: () => {
           window.location.href = "/home";
            }
          });
        }
    } catch (error) {console.error('Error fetching data:', error)}}


  return (
    <>
        <div id="form-two" className="max-w-xs w-full">
          <div className="mb-3">
            <span className="font-extrabold capitalize mb-4 text-white text-3xl">
              Hi there,welcome to AfriTech! 👋
            </span>
          </div>
          <Formik
            initialValues={{
              email: "deraemma8@gmail.com",
              password: !isDisabled ? "11111111" : "",
            }}
          validationSchema={SigninSchema}
         async onSubmit={(values) => {
            
           signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  console.log(userCredential);
                  const uID = userCredential.user.reloadUserInfo.localId
                  console.log("uID" + " " + uID)
                  localStorage.setItem('afriTechUserID', JSON.stringify(`${uID}`))
                  dispatch(setUserIdData(uID))
                  checkForUserData(uID, values); 
                })
                .catch((error) => {
                  toast.error("auth/invalid-login-credential signup first", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    onOpen: () => {
                       window.location.href = "/signup";
                    }
                  });
                  console.log(error.code ,  error.message);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3 ">
                  <label
                    className="font-bold capitalize block mb-[0.25rem] text-white"
                    htmlFor="email"
                  >
                    Email :{" "}
                  </label>
                <Field name="email" type="email" placeholder="Enter your email" />
                  {errors.email && touched.email ? (
                    <div className="text-[0.7rem] text-red-600 font-semibold">
                      {errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3 relative">
                  <label
                    className="font-bold capitalize block mb-[0.25rem] text-white"
                    htmlFor="password"
                  >
                    Password :
                  </label>
                  <div className="flex flex-row items-center w-full">
                    <Field
                      name="password"
                      type={showPassword ? "password" : "text"}
                      className="w-full"
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((showPassowrd) => !showPassowrd)
                      }
                      className="bg-transparent absolute right-3"
                    >
                      <img
                        width="18"
                        height="18"
                        src="https://img.icons8.com/ios/50/show-password.png"
                        alt="show-password"
                      />
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-[0.7rem] text-red-600 font-semibold">
                      {errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="flex justify-between">
                  <button
                    className="text-white border-none underline underline-offset-4"
                    type="button"
                    onClick={() => nextStep()}
                  >
                    Forgort Password ?
                  </button>
                  <button
                    type="submit"
                    className="font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg relative float-right"
                  >
                    Sign In
                  </button>
                </div>
                {/* </div> */}
              </Form>
            )}
          </Formik>
        </div>
    </>
  );
};

export default SigninMain;
