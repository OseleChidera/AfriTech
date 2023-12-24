import Link from "next/link";

export default function GoToSignIn() {
    return (
        <div className="flex  svh-minHeight  w-full flex-col items-center justify-center bg-[#005377] border py-4 px-5 border-1 border-red-800 gap-10 error-page">
            <div className="text-white mx-auto text-center">
                <h1 className=" font-bold notfound text-shadow cursor-pointer">Oops 404</h1>
                <h2>Page Not Found</h2>
                <p>Could not find requested resource</p>
            </div>
            <Link href="/signin">
                <button type="button"
                    className={`font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-lg  `}>
                    Return To SignIn To complete the onboarding form and verify your account.
                </button>
            </Link>
        </div>
    );
}
