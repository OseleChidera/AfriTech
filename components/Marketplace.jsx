import React, {useState} from 'react'
import MarketplaceItem from './Marketplace/MarketplaceItem'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
const Marketplace = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setShowInput(true);
    if (showInput && searchQuery) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const userObject = useSelector((state) => state.user.userData);
  return (
    <div className = 'w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom hide-scrollbar '>
      <div className="text-xl font-bold text-right w-fit border border-red-700 mb-2 md:ml-11">Available Items : 3</div>
      <div className="flex w-[90%] max-w-[90%] border border-red-600 relative mx-auto items-center gap-3 justify-end mb-2">
        {showInput && (<input type="text" id='searchbar' className='p-[0.2rem] rounded-sm flex-grow' />)}
        <button className="border-2 border-black p-1 px-2 font-bold text-md" onClick={() => handleSearchClick()}>Search</button>
      </div>


      <div className="flex overflow-y-auto flex-col w-full  border gap-3 relative hide-scrollbar">
        <MarketplaceItem id={0} />
        <MarketplaceItem id={1} />
        <MarketplaceItem id={2} />
      </div>
    </div>
  )
}

export default Marketplace