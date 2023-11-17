import React from 'react'
import MarketplaceItem from './Marketplace/MarketplaceItem'
import Link from 'next/link'

const Marketplace = () => {
  return (
    <div className='w-full h-full overflow-y-auto  text-[#005377]  bg-white rounded-lg pt-5 relative border border-red-700 break-normal box-shadowBottom hide-scrollbar'>
      <div className="text-xl font-bold text-right w-fit border border-red-700 ml-5 mb-4 md:ml-11">Currently financed items:</div>
      <div className="flex overflow-y-auto flex-col w-full  border gap-3 relative hide-scrollbar">
        <Link href={`/${0}`}>
        <MarketplaceItem id={0} />
        </Link>
        <Link href={`/marketplace/item/${1}`}>
        <MarketplaceItem id={1} />
        </Link>
        <Link href={`/marketplace/item/${2}`}>
        <MarketplaceItem id={2} />
        </Link>
      </div>
    </div>
  )
}

export default Marketplace