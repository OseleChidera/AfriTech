'use client'
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import homeIcon from "../public/icons/home-inactive.svg";
import homeIconAvtive from "../public/icons/home-05-active.svg";
import storeIcon from "../public/icons/store-inactive.svg";
import storeIconActive from "../public/icons/store-active.svg";
import userIcon from "../public/icons/user-inactive.svg";
import userIconActive from "../public/icons/user-active.svg";
import clipboardIcon from "../public/icons/clipboard-inactive.svg";
import clipboardIconActive from "../public/icons/clipboard-active.svg";
import { sethomePageNavIndex } from "@/redux/user";
import { useSelector, useDispatch } from "react-redux";
import { DataContext } from "@/utils/Context";


const HomeNav = ({pageIndex,setPageIndex}) => {
    const { user , userObject } =  useContext(DataContext)
    const dispatch = useDispatch();
    let mobileNav = useRef(null)

    function pageSlider(index) {
        dispatch(sethomePageNavIndex(index))

        let buttons = document.querySelectorAll('.tab');
        buttons.forEach(function (btn) {
            btn.classList.remove('focused');
            btn.classList.remove('focused-md');
        });

        mobileNav.children[index].classList.add('focused');
        mobileNav.children[index].classList.add('focused-md');
    }
    useEffect(() => {
        pageSlider(pageIndex)
        // console.log('home: ' + userObj)
    }, [])
  return (
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
          {userObject &&
          (<div className="flex flex-col items-center gap-3 h-fit tab flex-1 relative nav-item">
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
          </div>)}
          {userObject && ( <div className="flex flex-col items-center gap-3 h-fit tab flex-1 relative nav-item">
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
          </div>)}
          {userObject && (<div className="flex flex-col items-center gap-3 h-fit tab flex-1  relative nav-item ">
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
          </div>)}
      </div>
  )
}

export default HomeNav