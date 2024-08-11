"use client";
import React, { useState } from 'react';
import SunPicture from "../components/assets/pictures/sun.jpg";
import Image from 'next/image';
import Alchemylogin from "./Alchemylogin";
import { useRouter } from 'next/navigation';

const SunPicutre: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleLoginStatusChange = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const handleVerifyClick = () => {
    if (isLoggedIn) {
      router.push('Verification'); // Navigate to the Verify page
    } else {
      alert('You must be logged in to verify yourself.'); // Optionally show a message if not logged in
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg shadow-lg bg-white max-w-md gap-4">
      <Image src={SunPicture} alt="Placeholder Image" className="w-full h-auto rounded mb-4" />
      <Alchemylogin onLoginStatusChange={handleLoginStatusChange}/>
      <button 
        className="btn btn-secondary mt-4 mb-4" // Add some styling if needed
        onClick={handleVerifyClick}
      >
        Verify yourself
      </button>
    </div>
  );
};

export default SunPicutre;
