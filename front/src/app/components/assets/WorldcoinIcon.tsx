import React from 'react';
import WorldcoinIcon from '../assets/pictures/WorldcoinIcon.png';
import Image from 'next/image';

const Worldcoin: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image src={WorldcoinIcon} alt="Worldcoin" className='w-16 h-16' />
    </div>
  );
};

export default Worldcoin;