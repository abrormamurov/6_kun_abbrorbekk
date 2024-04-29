import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// context
import { GlobalContext } from "../context/useGlobal";
import { useContext } from "react";

function Signup() {
  const { dispatch } = useContext(GlobalContext);
  const handleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch({ type: "LOG_IN", payload: user });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  };

  return (
    <div className="min-h-screen grid place-content-center ">
      <button
        onClick={handleSignup}
        type="button"
        className="btn btn-secondary"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;
