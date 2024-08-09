import React from 'react'
import WorldcoinComponent from '../worldcoin/page'

export default function Verification() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-10'>
    <div className='text-3xl font-semibold text-semantic-accent-content'>Registration</div>
    <div className='text-xl font-semibold'>Step 1:</div>
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
  <p className="text-gray-800 mb-6 font-semibold">To join SuperSolar you must verify yourself with WorldId</p>
  <WorldcoinComponent/>
</div>
<div className='text-xl font-semibold'>Step 2:</div>
    </div>
  )
}