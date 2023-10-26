"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import FogortpasswordEmail from "../../components/auth/FogortpasswordEmail";
import { throwMessage } from "@/utils/utility";
import SigninMain from "../../components/auth/SigninMain";

const SigninPage = (user) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  function nextStep(final = false) {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  }
  function prevStep(final = false) {
    setCurrentIndex((currentIndex) => currentIndex - 1);
  }
  const steps = [
    <SigninMain
      nextStep={nextStep}
      prevStep={prevStep}
      isDisabled={isDisabled}
      setIsDisabled={setIsDisabled}
      user={user}
    />,
    <FogortpasswordEmail
      nextStep={nextStep}
      prevStep={prevStep}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      isDisabled={isDisabled}
      setIsDisabled={setIsDisabled}
      user={user}
    />,
  ];
  return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
            {steps[currentIndex]}
        </div>
    )
};

export default SigninPage
