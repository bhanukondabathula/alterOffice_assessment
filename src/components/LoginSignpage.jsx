

import React from "react";

import loginimage1 from '../assets/loginpage-img1.png';
import loginimage2 from '../assets/loginpage-img2.png';
import loginimage3 from '../assets/loginpage-img3.png';
import loginimage4 from '../assets/loginpage-img4.png';
import loginimage5 from '../assets/loginpage-img5.png';
import loginimage6 from '../assets/loginpage-img6.png';
import loginimage7 from '../assets/loginpage-img7.png';
import loginimage8 from '../assets/loginpage-img8.png';
import loginimage9 from '../assets/loginpage-img9.png';
import vibesnaplogo from '../assets/vibesnaplogo.png';
import googlelogo from '../assets/googlelogo.png';
import { useFirebase } from "../services/Firebase";
const LoginSignpage = () => {
    const firebase = useFirebase();
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* Image Grid Section */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4 max-w-4xl">
        <img src={loginimage1} alt="Login Image1" className="object-cover w-full h-full" />
        <img src={loginimage2} alt="Login Image2" className="object-cover w-full h-full" />
        <img src={loginimage3} alt="Login Image3" className="object-cover w-full h-full" />
        <img src={loginimage4} alt="Login Image4" className="object-cover w-full h-full" />
        <img src={loginimage5} alt="Login Image5" className="col-span-2 object-cover w-full h-full" />
        <img src={loginimage6} alt="Login Image6" className="object-cover w-full h-full" />
        <img src={loginimage7} alt="Login Image7" className="object-cover w-full h-full" />
        <img src={loginimage8} alt="Login Image8" className="object-cover w-full h-full" />
        <img src={loginimage9} alt="Login Image9" className="object-cover w-full h-full" />
      </div>

      {/* Login Section */}
      <div className="flex flex-col items-center justify-center bg-white p-6 mt-4 shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          <img src={vibesnaplogo} alt="Vibesnap Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          Vibesnap
        </div>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-4">Moments That Matter, Shared Forever.</p>
        <button
        onClick={firebase.signinWithGoogle}
          className="flex items-center gap-2 bg-gray-800 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-md hover:bg-gray-700 transition-all">
          <img src={googlelogo} alt="Google Logo" className="w-4 h-4 sm:w-5 sm:h-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignpage;
