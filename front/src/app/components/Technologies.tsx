import Base from "../components/assets/pictures/Base.png"
import Blockscout from "../components/assets/pictures/Blockscout.png"
import Alchemyweb3 from "../components/assets/pictures/Alchemyweb3.png"
import Worldcoin from "../components/assets/pictures/WorldcoinIcon.png"


import Image from 'next/image';

const Technologies: React.FC = () => {
    return (
<div className="flex justify-center items-center gap-10 mt-16">
  <Image src={Base} alt="Base" className="h-16 w-16 rounded mb-4" />
  <Image src={Blockscout} alt="Blockscout" className="h-16 w-16 rounded mb-4" />
  <Image src={Alchemyweb3} alt="Alchemyweb3" className="h-16 w-16 rounded mb-4" />
  <Image src={Worldcoin} alt="Worldcoin" className="h-16 w-16 rounded mb-4" />
</div>
    );
  };
  
  export default Technologies;