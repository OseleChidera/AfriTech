import React, {useState} from 'react'
import Image from 'next/image'
import phone from '../../public/images/pexels-luis-moya-14528919.jpg'
const ImageCarousel = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        phone,
        phone,
        phone,
        phone
    ];

    const handleClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="flex flex-col gap-10 items-center rounded-xl box-shadow">
            <div className="border w-fit flex gap-5 mx-auto p-4 shadow-sm ">
                {images.map((image, index) => (
                    <Image key={index} src={phone} alt={`Image ${index + 1}`} className='cursor-pointer w-10 md:w-16 lg:w-22 rounded-lg hover:shadow-inner' onClick={() => handleClick(image)} />
                ))}
            </div>
            <div className="w-1/2">
                {selectedImage && (
                    <Image src={selectedImage} alt="Selected Image" width={50} className="w-full transform object-cover" />
                )}
            </div>
        </div>
    );
}

export default ImageCarousel