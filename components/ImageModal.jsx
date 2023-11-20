import React from 'react'
import Image from 'next/image'

const ImageModal = ({ url, closeImageModal }) => {
  return (
      <div id="imageModal" className="flex flex-col justify-center items-center svh-minHeight  w-full   bg-[#00537788] border py-4 px-5 border-1 border-red-800 gap-10 z-20 pointer-events-auto absolute" >
        <div className="flex flex-col gap-5 w-4/5 h-4/5">
              <div className="border border-white h-fit w-fit self-end">
                  <button type="button" onClick={() => closeImageModal()} className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.65rem] rounded-lg relative float-right'
                  >Close</button>
              </div>
              <div className="max-w-[90%] max-h-[70%] w-full mx-auto border border-white">
                  <Image src={url ? url : null} alt='popup-image' width={350} height={350} className='w-full h-full aspect-video  object-scale-down'/>
              </div>
        </div>
    </div>
  )
}

export default ImageModal