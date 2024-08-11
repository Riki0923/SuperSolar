"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseEther } from 'ethers';
import { useSendUserOperation, useSmartAccountClient, useUser } from "@account-kit/react";
import MyContract from '../../../../contracts/artifacts/contracts/Solar.sol/Solar.json';
import { Interface } from 'ethers';
import AlchemyloginHeader from '../components/AlchemyLoginHeader';

export default function SellingPage() {

    const user = useUser();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        amount: "",
        price: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage submit button status


    const { client } = useSmartAccountClient({
        type: "LightAccount",
        policyId: "51dd572f-22f6-4b3d-bfa4-3ffdb4e9571c"
    });



    const { sendUserOperation } = useSendUserOperation({
        client,
        waitForTxn: true,
        onSuccess: ({ hash }) => {
            console.log("Transaction Hash:", hash);
            alert(`Selling Solar Order completed! Hash: ${hash}`);
        },
        onError: (error) => {
            console.log("Error:", error);
            alert('Transaction Failed. Please try again.');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const amount = Number(formData.amount); // Energy amount in kWh
            const priceInWei = parseEther(formData.price); // Convert price to Wei

            const abi = MyContract.abi;
            const iface = new Interface(abi);
            const data = iface.encodeFunctionData("sellEnergy", [
                amount,
                priceInWei,
            ]) as `0x${string}`;

            await sendUserOperation({
                uo: {
                    target: "0xD5A9DB1EdE907c09aE3b5eBC9506Ac4D7dB588e0", // Contract address
                    data: data,
                },
            });
        } catch (error) {
            console.error("Error processing transaction:", error);
            alert('Failed to send the transaction. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start relative">
            {/* Header */}
            <div className="relative w-full flex items-center p-4">
                <div className="text-4xl italic font-bold text-gray-800 absolute left-16 top-8">
                    🌞 SuperSolar
                </div>
                <button
                    onClick={() => router.push("/Onboarding")}
                    className="absolute left-28 top-24 flex items-center text-gray-800 hover:text-gray-600 font-semibold text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back
                </button>
                <div className='flex-1 flex justify-end'>
                    <AlchemyloginHeader />
                </div>
            </div>
            {/* Page Content */}
            <div className="relative flex flex-col items-center justify-center py-10 mt-14">
                <h1 className="text-3xl font-bold text-gray-800 mb-12">Sell Your Energy</h1>
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                    {/* Energy Amount Input */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount (kWh)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter the amount of energy (kWh)"
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price (ETH)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Set your price (ETH)"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white 
                         hover:bg-black hover:text-white active:bg-gray-800 active:text-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-black transition-transform duration-150 ease-in-out 
                         transform active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Sell Energy"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Large Sun Emoji */}
            <div className="bottom-60 right-20 text-[50rem] opacity-50 pointer-events-none">
                🌞
            </div>
        </div>
    );
}
