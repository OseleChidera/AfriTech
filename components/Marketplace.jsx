import React, {useContext, useState , useEffect} from 'react'
import MarketplaceItem from './Marketplace/MarketplaceItem'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { DataContext } from '@/utils/Context';
const Marketplace = ({ }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, marketplaceData, fetchMarketplaceData } = useContext(DataContext)
  const [userID , setUserID] = useState(user.uid)
  // const { marketplaceData } = useContext(DataContext)
  // const [data, setData] = useState(dataList)
  // console.log('marketplaceData ', marketplaceData)
  // console.log('data ', data)

  const handleSearchClick = () => {
    setShowInput(true);
    if (showInput && searchQuery) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchMarketplaceData()
    const revalidationInterval = setInterval(() => {
      fetchMarketplaceData()
    }, 60000);

    return () => clearInterval(revalidationInterval);
  }, [])


  const userObject = useSelector((state) => state.user.userData);
  return (
    <div className = 'w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom hide-scrollbar '>
      <div className="text-xl font-bold text-right w-fit border border-red-700 mb-2 md:ml-11">Available Items : 3</div>
      <div className="flex w-[90%] max-w-[90%] border border-red-600 relative mx-auto items-center gap-3 justify-end mb-2">
        {showInput && (<input type="text" id='searchbar' className='p-[0.2rem] rounded-sm flex-grow' />)}
        <button className="border-2 border-black p-1 px-2 font-bold text-md" onClick={() => handleSearchClick()}>Search</button>
      </div>


      <div className="flex overflow-y-auto flex-col w-full  border gap-3 relative hide-scrollbar">
        {
          marketplaceData.map(e => <MarketplaceItem id={e.id} data={e} />)
        }
        {/* <MarketplaceItem id={1} />
        <MarketplaceItem id={2} /> */}
      </div>
    </div>
  )
}

export default Marketplace