"use client"
import React, { useEffect, useState } from "react";
import Landing from "./Landing";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border ">
      <Landing />
    </main>
  );
}
