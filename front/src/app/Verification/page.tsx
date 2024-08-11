"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser
} from "@account-kit/react";
import { Interface } from "ethers";
import WorldcoinComponent from '../worldcoin/page';
import MyContract from '../../../../contracts/artifacts/contracts/Solar.sol/Solar.json';
import AlchemyloginHeader from '../components/AlchemyLoginHeader';

export default function Verification() {
  const router = useRouter(); // Initialize router for navigation
  const user = useUser();
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    solarCapacity: 0,
    gridStatus: 0,
  });

  useEffect(() => {
    console.log("user is:", user);
  }, [user]);

  const { client } = useSmartAccountClient({ type: "LightAccount", policyId: "51dd572f-22f6-4b3d-bfa4-3ffdb4e9571c" });

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash }) => {
      console.log("Transaction Hash:", hash);
      alert(`Transaction Successful! Hash: ${hash}`);
      router.push('Onboarding'); // Redirect to buyingPage on success
    },
    onError: (error) => {
      console.log("Error:", error);
      alert('Transaction Failed. Please try again.');
    },
  });

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!isVerified) {
      alert('Please complete the World ID verification first.');
      return;
    }

    if (!user || !user.email) {
      alert('User email is not available.');
      return;
    }

    handleSendUserOperation(user.email);
  };

  const handleSendUserOperation = (email: string) => {
    const abi = MyContract.abi;
    const iface = new Interface(abi);
    
    try {
      const data = iface.encodeFunctionData("register", [
        formData.fullName,
        email,
        formData.country,
        formData.solarCapacity,
        formData.gridStatus,
      ]) as `0x${string}`;
  
      console.log("Encoded Data:", data); // Log encoded data for debugging
  
      sendUserOperation({
        uo: {
          target: "0xD5A9DB1EdE907c09aE3b5eBC9506Ac4D7dB588e0",
          data: data,
        },
      });
    } catch (error) {
      console.error("Error encoding function data:", error);
      alert('Failed to prepare the User Operation.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-10 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className="relative w-full flex items-center p-4">
        <div className="text-4xl italic font-bold text-gray-800 absolute left-16 top-8">
          🌞 SuperSolar
        </div>
        <div className='flex-1 flex justify-end'>
          <AlchemyloginHeader />
        </div>
      </div>
      <div className='text-3xl font-semibold text-gray-900 mb-4'>Registration</div>
      <div className='text-xl font-semibold mb-2'>Step 1:</div>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        <p className="text-gray-700 mb-6 font-semibold">
          To join SuperSolar you must verify yourself with WorldId
        </p>
        <WorldcoinComponent onSuccess={handleVerificationSuccess} />
      </div>
      <div className='text-xl font-semibold mt-8 mb-2'>Step 2:</div>
      <div className='text-xl font-semibold mb-4'>Registration Form</div>

      <div className='w-full max-w-lg space-y-4'>
        <input
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          placeholder='Full Name'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          placeholder='Country'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type='number'
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          placeholder='Solar Capacity (kW)'
          name='solarCapacity'
          value={formData.solarCapacity}
          onChange={handleChange}
        />
        <select
          className='form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
          name='gridStatus'
          value={formData.gridStatus}
          onChange={handleChange}
        >
          <option value={0}>Connected with Permission</option>
          <option value={1}>Connected without Permission</option>
        </select>
      </div>

      <button
  className={`mt-6 px-6 py-3 rounded-md border border-black text-black font-semibold transition-transform duration-300 ease-in-out hover:bg-black hover:text-white hover:translate-y-[-2px] active:scale-95 ${isSendingUserOperation ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={isSendingUserOperation}
  onClick={handleSubmit}
>
  {isSendingUserOperation ? "Sending..." : "Register"}
</button>
    </div>
  );
}
