import React, { useState } from "react";
import { auth, provider } from "../services/firebase"; // Import Firebase configuration
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import vibesnaplogo from "../assets/vibesnaplogo.png";
import googlelogo from "../assets/googlelogo.png";
import loginimg from "../assets/loginimg.png";

const Login = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // New state to handle error messages
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      // Redirect to the feed page after successful login
      navigate("/feed");
    } catch (error) {
      // Handle errors and display a message
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Image and Login Section Wrapper */}
      <div className="w-full max-w-md rounded-lg overflow-hidden relative">
        {/* Image Section */}
        <img
          src={loginimg}
          alt="Login"
          className="object-cover w-full" // Adjust the height as needed
        />
        
        {/* Login Section below the image */}
        <div className="absolute bottom-0 w-full bg-white px-6 py-8 rounded-t-3xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-500 mb-4 justify-center">
            <img src={vibesnaplogo} alt="Vibesnap Logo" className="w-10 h-10" />
            <span>Vibesnap</span>
          </div>
          <p className="text-center text-gray-500 text-sm mb-6">
            Moments That Matter, Shared Forever.
          </p>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 bg-black text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-800 transition-all"
          >
            <img src={googlelogo} alt="Google Logo" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
