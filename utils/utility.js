import { auth } from '@/firebaseConfig'
import { toast } from 'react-toastify'; 
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { database, storage } from '@/firebaseConfig';


export function throwMessage(errorcode) {
    console.log('utility error preview', errorcode)
    let errorCode;
    switch (errorcode) {
        case 'auth/user-not-found':
            toast.error('This user does not exist . SignUp instead', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                    window.location.href = "/signup";
                }
            });
            break; 
            
        case 'auth/invalid-login-credentials':
            toast.error('Invalid username or password', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            break;
        case 'auth/network-request-failed':
            toast.error('Network error please get a stable connection and retry login', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            break;
        case 'auth/user-disabled':
            toast.error('This users account has been temporarily disabled. Contact support', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            break;
        case 'Error fetching data':
            toast.error('Error fetching data', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            break;
        case 'A verification email was sent to you follow the instructions':
            toast.success('Check your Email for the verification link.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    // console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                }
            });
            break;
        case 'Feedback-recorded':
            toast.success('Your feedback has beeen recorded. We would contact you as soon as possible', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    // console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                }
            });
            break;
        case 'logout successful':
            toast.success('User has been logged out successfully', {
                position: "top-right",
                autoClose: 700,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    // console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                    window.location.href = "/signin";
                }
            });
            break;
            case 'password reset successful':
            toast.success('password reset successful. Check your email for the link', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    // console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                    window.location.href = "/signin";
                }
            });
            break;
        case 'User SignUp complete':
            toast.success('User SignUp complete.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    window.location.href = "/signin";
                    console.log('Toast opened redirecting to signin page')
                }
            });
            break;
        case 'An Email was sent to reset your password':
            toast.success('Check your Email for the link to reset your password.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                onOpen: () => {
                    // console.log('Toast opened redirecting to signup page');
                    // Perform actions after toast is displayed
                }
            });
            break;   

        default:
            toast.info(`${errorcode}`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            break;


    }
}

export function findUserByEmail(email) {

    sendPasswordResetEmail(auth, email).then(data => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
    // console.log(firebase.auth())
}

export const fetchData = async (docRef) => {
    const dispatch = useDispatch()
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('USER DATABASE INFO ', JSON.stringify(docSnap.data(), null, 2))
            dispatch(setUserData(JSON.stringify(docSnap.data(), null, 2)))
            console.log("userDataVariable: " + userDataVariable)
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



// const calculateAge = (selectedDate) => {
//     const today = new Date();
//     const birthDate = new Date(selectedDate);

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }

//     console.log('User age:', age);
// };



