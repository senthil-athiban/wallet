import React, { useState } from 'react';

interface Tabprops {
    setCurrentWallet: React.Dispatch<React.SetStateAction<string>>;
}
const Tab:React.FC<Tabprops> = ({setCurrentWallet}) => {
  const [activeTab, setActiveTab] = useState('Solana');

  const handleChangeWallet = (value: string) => {
    setCurrentWallet(value);
    setActiveTab(value);
  }
  return (
    <div className='flex gap-x-2 m-2 p-2'>
      <p
        className={`border p-2 rounded-lg cursor-pointer ${activeTab === 'Solana' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => handleChangeWallet('Solana')}
      >
        Solana
      </p>
      <p
        className={`border p-2 rounded-lg cursor-pointer ${activeTab === 'ETH' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => handleChangeWallet('ETH')}
      >
        ETH
      </p>
    </div>
  );
};

export default Tab;