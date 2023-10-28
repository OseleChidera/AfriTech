import { auth } from '@/firebase/firebaseConfig'
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

export function throwMessage(errorcode) {
    console.log('error', errorcode)
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
            case 'auth/email-already-in-use':
            toast.error('This email is already in use', {
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
            toast.error(`${errorcode}`, {
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


    }
}

export function findUserByEmail(email) {

    sendPasswordResetEmail(auth, email).then(data => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
    console.log(firebase.auth())
}

