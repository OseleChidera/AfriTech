import Link from "next/link";

export default function UnauthorizedAccess() {
    return (
        <div className="flex  svh-minHeight  w-full flex-col items-center justify-center bg-[#005377] border py-4 px-5 border-1 border-red-800 gap-10 error-page">
            <div className="text-white mx-auto text-center">
                <h1 className=" font-bold notfound text-shadow cursor-pointer">Oops</h1>
                <p>You cannot access this page yet. Your profile is pending verification.</p>
                <p>Await further instruction</p>
            </div>
                <button type="button"
                    onClick={window.open('/', '_blank')}
                    className={`font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg  `}>
                    Return to Signin Page
                </button>
        </div>
    );
}
































































// [
// 'Phone': '07957640902' ,
// 'Username': 'Osele' ,
// 'accountVerified': false ,
// 'address': 'Chancellor Pl, London NW9 5JB' ,
// 'agreeToTerms': true ,
// 'bvnnumber': 'n111111111' ,
// 'dateOfBirth': '1025823600000' ,
// 'email': 'deraemma8@gmail.com' ,
// 'firstname': 'Chidera ' ,
// 'genderOptions': 'male' ,
// 'image2': 'https://firebasestorage.googleapis.com/v0/b/afrite…=media&token=454377cf-9805-4fcc-bef6-e3c6b191a387' ,
// 'lastname': 'Osele' ,
// 'ninImage': 'https://firebasestorage.googleapis.com/v0/b/afrite…=media&token=6285fbc7-c403-4149-98b6-337c26f97557' ,
// 'reuploadNin': false ,
// 'ninnumber': '111111' , 
// 'profilePicture': 'https://firebasestorage.googleapis.com/v0/b/afrite…=media&token=bbd5f6cd-72b7-43bc-a0b7-6e77e06c9f0e' ,
//  'sectorOption': 'Engineering' 
// ]