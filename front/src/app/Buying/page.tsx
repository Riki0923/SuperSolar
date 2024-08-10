"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import MyContract from '../../../../contracts/artifacts/contracts/Solar.sol/Solar.json';
import AlchemyloginHeader from '../components/AlchemyloginHeader';

const contractAddress = '0x970030E31F3eb14547410845217f11f5009CAB4a'; // Replace with your contract address
const abi = MyContract.abi;

export default function Buying() {
  const [energySales, setEnergySales] = useState<any[]>([]);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(ethersProvider);

          const ethersContract = new ethers.Contract(contractAddress, abi, ethersProvider);
          setContract(ethersContract);

          // Fetch energy sales data
          const fetchData = async () => {
            try {
              const data = await ethersContract.getSolarEnergies();
              const filteredData = data.filter((energy: any) => !energy.isSold);
              setEnergySales(filteredData);
              console.log(filteredData)
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          };

          fetchData();
        } catch (error) {
          console.error('Error initializing provider or contract:', error);
        }
      } else {
        console.error('No Ethereum provider detected.');
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleBuy = (solarId: number) => {
    console.log(`Buy button clicked for solarId: ${solarId}`);
    // Implement your buy functionality here
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-start relative'>
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
      <div className='font-semibold text-lg mt-20'>Energies on Sale:</div>
      <div className='w-full max-w-4xl mt-8 space-y-4'>
        {energySales.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {energySales.map((energy: any) => (
              <div
                key={energy.solarId.toString()}
                className='
                  bg-white 
                  p-6 
                  rounded-lg 
                  shadow-md 
                  transition 
                  duration-300 
                  transform 
                  hover:-translate-y-2
                '
              >
                <div className='flex flex-col space-y-2'>
                  <div className='text-lg font-semibold'>{energy.sellerName}</div>
                  <div>Email: {energy.sellerEmail}</div>
                  <div>Country: {energy.sellerCountry}</div>
                  <div>Amount: {Number(energy.amount)} kWh</div> {/* Convert BigInt to number */}
                  <div>Price: {ethers.formatEther(energy.price)} ETH</div>
                  <div className='text-sm text-gray-500'>
                    Grid Status: {energy.gridStatus === 0 ? 'Connected Without Permission' : 'Connected With Permission'}
                  </div>
                  <button
                    onClick={() => handleBuy(energy.solarId)}
                    className='
                      bg-white 
                      text-black 
                      border 
                      border-black 
                      px-4 
                      py-2 
                      rounded 
                      hover:bg-black 
                      hover:text-white 
                      active:scale-95 
                      transition 
                      duration-200 
                      ease-in-out
                    '
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No energies available for sale.</div>
        )}
      </div>
    </div>
  );
}
