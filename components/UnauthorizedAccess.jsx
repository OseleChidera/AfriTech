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



















const item = {
    itemName: '....',
    itemPrice: 10,

}












































// const users = [
//     {
//         'userId': 'AAAAA12345',
//         'Phone': '07957640902',
//         'Username': 'John',
//         'accountVerified': true,
//         'address': '123, nowhereland.',
//         'agreeToTerms': true,
//         'bvnnumber': '123456',
//         'dateOfBirth': '1025823600000',
//         'email': 'johndoe8@gmail.com',
//         'firstname': 'John ',
//         'genderOptions': 'Male',
//         'lastname': 'Doe',
//         'ninSlipPicture': '...',
//         'reuploadNin': false,
//         'ninnumber': '111111',
//         'profilePicture': '...',
//         'cartItems': [{}],
//         'currentlyFinancedItems': [{}],
//         'previouslyFinancedItems': [{}],

//     },
//     {
//         'userId': 'BBBBB12345',
//         'Phone': '07957640901',
//         'Username': 'Mary',
//         'accountVerified': false,
//         'address': '125, nowhereland.',
//         'agreeToTerms': true,
//         'bvnnumber': '133557',
//         'dateOfBirth': '1025823300000',
//         'email': 'marydoe8@gmail.com',
//         'firstname': 'Mary ',
//         'genderOptions': 'Female',
//         'lastname': 'Doe',
//         'ninSlipPicture': '...',
//         'reuploadNin': false,
//         'ninnumber': '121314',
//         'profilePicture': '...',
//         'sectorOption': 'Teacher',
//         'cartItems': [{}],
//         'currentlyFinancedItems': [{}],
//         'previouslyFinancedItems': [{}],

//     }
// ]

















// const products = [
//     {
//         'productId': 'AAAAA13579',
//         'name': '....',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//         'price': 100,
//         'categoryId': 'AAAAA13579',
//         'brandId': 'SMSNG',
//         'createdAt': 'Timestamp indicating when the product was added',
//         'productRetailers': {},
//         'comprehensiveProductDescriptionLink': '...',
//         'productImages': [],
//         'reviews': [],
//         'productQuantityInStock': 2
//     },
//     {
//         'productId': 'BBBBB13579',
//         'name': '....',
//         'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//         'price': 100,
//         'categoryId': 'BBBBB13579',
//         'brandId': 'TSHBA',
//         'createdAt': 'Timestamp indicating when the product was added',
//         'productRetailers': {},
//         'comprehensiveProductDescriptionLink': '...',
//         'productImages': [],
//         'reviews': [],
//         'productQuantityInStock': 5
//     },
    
// ]