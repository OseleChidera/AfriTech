"use client"
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import Landing from "./Landing";

export default function Home() {
  const user = auth.currentUser;
  return (
    <main className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border ">
      <Landing />
    </main>
  );
}
