

'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import homeIcon from "../../public/icons/home-inactive.svg";
import homeIconAvtive from "../../public/icons/home-05-active.svg";
import storeIcon from "../../public/icons/store-inactive.svg";
import storeIconActive from "../../public/icons/store-active.svg";
import userIcon from "../../public/icons/user-inactive.svg";
import userIconActive from "../../public/icons/user-active.svg";
import clipboardIcon from "../../public/icons/clipboard-inactive.svg";
import clipboardIconActive from "../../public/icons/clipboard-active.svg";
import User from "@/components/User";
import MainHome from "@/components/MainHome";
import Marketplace from "@/components/Marketplace";
import BankList from "@/components/BankList";
import { gsap, Power3 } from 'gsap';
import { array } from "yup";
import { useSelector, useDispatch } from "react-redux";


const page = () => {
  const userId = useSelector((state) => state.user.value);
  const userObj = useSelector((state) => state.user.data);
  let mobileNav = useRef(null)
  let pages = useRef(null)
  let mainHomeRef = useRef(null)
  let marketplaceRef = useRef(null)
  let bankListRef = useRef(null)
  let userRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const list = [< MainHome className="MainHome" ref={el => (mainHomeRef = el)} />, < Marketplace className="Marketplace" ref={el => (marketplaceRef = el)} />, < BankList className="BankList" ref={el => (bankListRef = el)} />, < User className="User" ref={el => (userRef = el)} />]


  function pageSlider(index){
    setPageIndex(index)
    let buttons = document.querySelectorAll('.tab');
    buttons.forEach(function (btn) {
      btn.classList.remove('focused');
      btn.classList.remove('focused-md');
    });

    mobileNav.children[index].classList.add('focused');
    mobileNav.children[index].classList.add('focused-md');
  };
  useEffect(() => { 
    pageSlider(pageIndex) 
    console.log('home: ' + userObj)
  },[])

  return (
      <div className="flex svh-minHeight  w-full flex-col items-center justify-center bg-[#005377] border py-4 px-5 border-1 border-red-800 gap-10">
      {/* <div id="mobile-container" className="flex flex-col w-full svh-minHeight border-1 border-red-800 gap-3"> */}
      <div id="display" className="w-full h-[75vh] flex rounded-2xl bg-red-700  relative  border border-red-700">
          {
            list[pageIndex]
          }
        </div>

      {/* <div id="mobile-nav" className="flex w-full justify-between h-16 relative" ref={el => (mobileNav = el)}>
        <div className="flex flex-col items-center gap-3 max-w-fit tab">
        <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl  focused"onClick={() => pageSlider(0)}>
            <Image
              src={homeIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={homeIconAvtive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />
          </button>
            <h2 className="text-white text-sm capitalize hidden font-bold md:block description">home</h2>
      </div>
        <div className="flex flex-col items-center gap-3 max-w-fit tab">
        <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl focused" onClick={() => pageSlider(1)}>
            <Image
              src={storeIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={storeIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />
          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">marketplace</h2>
        </div>
        <div className="flex flex-col items-center gap-3 max-w-fit tab">
        <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl  focused" onClick={() => pageSlider(2)}>
            <Image
              src={clipboardIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={clipboardIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />

          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">Bank List</h2>
        </div>
        <div className="flex flex-col items-center gap-3 max-w-fit tab">
        <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl focused" onClick={() => pageSlider(3)}>
            <Image
              src={userIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={userIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />

          </button>
            <h2 className="text-white text-sm capitalize hidden font-bold md:block description">user</h2>
          </div>
        </div> */}
      <div id="mobile-nav" className="flex w-full h-16 relative " ref={el => (mobileNav = el)}>
        <div className="flex flex-col items-center gap-3 h-fit tab flex-1 relative nav-item ">
          <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl  focused" onClick={() => pageSlider(0)}>
            <Image
              src={homeIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={homeIconAvtive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />
          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">home</h2>
        </div>
        <div className="flex flex-col items-center gap-3 h-fit tab flex-1 relative nav-item">
          <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl focused" onClick={() => pageSlider(1)}>
            <Image
              src={storeIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={storeIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />
          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">marketplace</h2>
        </div>
        <div className="flex flex-col items-center gap-3 h-fit tab flex-1 relative nav-item">
          <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl  focused" onClick={() => pageSlider(2)}>
            <Image
              src={clipboardIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={clipboardIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />

          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">Bank List</h2>
        </div>
        <div className="flex flex-col items-center gap-3 h-fit tab flex-1  relative nav-item ">
          <button id="icon-div" className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl focused" onClick={() => pageSlider(3)}>
            <Image
              src={userIcon}
              alt="home"
              width={32}
              className="aspect-square image"
            />
            <Image
              src={userIconActive}
              alt="home"
              width={32}
              className="aspect-square active-image"
            />

          </button>
          <h2 className="text-white text-sm capitalize hidden font-bold md:block description">user</h2>
        </div>
      </div>
      </div>
    // </div>
  )
};

export default page;

