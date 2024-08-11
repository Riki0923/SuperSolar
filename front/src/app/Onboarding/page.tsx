"use client";
import React from 'react';
import Image from 'next/image';
import Sunsky from '../components/assets/pictures/Sunny.jpg'; // Adjust the path as needed
import { useRouter } from 'next/navigation';
import AlchemyloginHeader from '../components/AlchemyLoginHeader';
import { useSendUserOperation, useSmartAccountClient, useUser } from "@account-kit/react";

export default function Onboarding() {

    const user = useUser();

    const router = useRouter(); // Initialize useRouter

    const sellingPage = () => {
        router.push('Selling')
    }

    const buyingPage = () => {
        router.push('Buying')
    }

    return (
        <div className="relative min-h-screen bg-white">
      <div className="relative w-full flex items-center p-4">
        {/* Header */}
  <div className="text-4xl italic font-bold text-gray-800 absolute left-16 top-8">
    🌞 SuperSolar
  </div>
  <div className='flex-1 flex justify-end'>
    <AlchemyloginHeader/>
  </div>
</div>
            {/* Background Image Wrapper */}
            <div className="relative mx-auto my-10 max-w-4xl">
                <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={Sunsky}
                        alt="Sunsky Background"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                        priority
                    />
                </div>
            </div>

            {/* Page Content */}
            <div className="relative flex flex-col items-center py-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10">What would you like to do?</h1>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-5xl px-4">
                    {/* Buy Option Box */}
                    <div className="flex-1 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">I Would Like to Buy Energy</h2>
                        <p className="text-gray-700 mb-4">Explore options to purchase solar energy. Choose the best plan for your needs and start earn some money!</p>
                        <button onClick={() => buyingPage()} className="bg-white text-black border-2 border-black py-2 px-6 rounded-lg shadow-md transform transition-transform duration-300 hover:bg-black hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700">
                            Buy Energy
                        </button>

                    </div>
                    {/* Sell Option Box */}
                    <div className="flex-1 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">I Would Like to Sell Energy</h2>
                        <p className="text-gray-700 mb-4">Earn by selling excess solar energy. Get started today and contribute to a greener future!</p>
                        <button onClick={() => sellingPage()} className="bg-white text-black border-2 border-black py-2 px-6 rounded-lg shadow-md transform transition-transform duration-300 hover:bg-black hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700">
                            Sell Energy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
