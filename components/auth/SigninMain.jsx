"use client";
import React, { useState , useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth } from "@/firebase/firebaseConfig";
import { database } from '../../firebase/firebaseConfig';

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {toast } from 'react-toastify';
import { SigninSchema } from '../../utils/schemaUtil'
import 'react-toastify/dist/ReactToastify.css';
import { throwMessage } from "@/utils/utility";
import { useSelector, useDispatch } from "react-redux";
import { setUserIdData, removeUserData, setLoading, fetchDataByUserId } from '../../redux/user'




const SigninMain = ({nextStep, isDisabled }) => {
const userId = useSelector((state) => state.user.value);
const userObj = useSelector((state) => state.user.valueObj);

const dispatch = useDispatch();
const [showPassword, setShowPassword] = useState(false);


  // useEffect(() => {
  //   dispatch(fetchDataByUserId(userId, userObj));
  // }, [dispatch, userId]);

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
            email: "oselechidwerwedeerkka590@gmail.com",
              password: !isDisabled ? "11111111" : "",
            }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  console.log(userCredential);
                  const userCredentials = userCredential.user;
                  //set value of the user 
                  dispatch(setUserIdData(userCredentials.reloadUserInfo.localId))
                    console.log(userCredentials)
       
                  //save the user id in local storage on signin
                  console.log("userId : " + userCredentials.reloadUserInfo.localId)
                  console.log("typeof userId : " + typeof userCredentials.reloadUserInfo.localId)
                  localStorage.setItem('afriTechUserID', JSON.stringify({ userID: userCredentials.reloadUserInfo.localId }))
                  //Display notification to user
                  toast.success("Login successful", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    onOpen: () => {
                      console.log('Toast opened redirecting to home page');
                      // Perform actions after toast is displayed
                      
                      window.location.href = "/home";
                    }
                  });
                })
                .catch((error) => {
                  console.log(error)
                  console.log(error.code);
                  throwMessage(error.code);
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
