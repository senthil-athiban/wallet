import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Eye, EyeOff, Trash } from 'lucide-react';

export type Wallet = {
  publicKey: string | undefined;
  privateKey: string | undefined;
};

type AddressProps = {
  solWallets: Array<Wallet>;
  ethWallets: Array<Wallet>;
  setCurrentWallet: (value: string) => void;
  handleWallet: () => void;
  setSolWallets: (wallets: Wallet[]) => void;
  setEthWallets: (wallets: Wallet[]) => void;
};

type VisibilityState = {
  [key: number]: boolean;
};

const Address = ({
  solWallets,
  ethWallets,
  setCurrentWallet,
  handleWallet,
  setSolWallets,
  setEthWallets,
}: AddressProps) => {
  const [activeWalletType, setActiveWalletType] = useState("Solana");
  const [visibleAddress, setVisibleAddress] = useState<VisibilityState>({});
  const [visiblePrivateKey, setVisiblePrivateKey] = useState<VisibilityState>({});

  const wallets = activeWalletType === "Solana" ? solWallets : ethWallets;

  const handleChangeWallet = (value: string) => {
    setCurrentWallet(value);
    setActiveWalletType(value);
  };

  const handleDeleteAddress = () => {
    if (activeWalletType === "Solana") setSolWallets([]);
    else setEthWallets([]);
  };

  const toggleVisibility = (index: number) => {
    setVisibleAddress((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setVisiblePrivateKey((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleRemoveAddress = (index: number) => {
    if (activeWalletType === "Solana") {
      const updatedWallets = solWallets.filter((_, i) => i !== index);
      setSolWallets(updatedWallets);
    } else {
      const updatedWallets = ethWallets.filter((_, i) => i !== index);
      setEthWallets(updatedWallets);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 m-2 p-2">
          <p
            className={`border p-2 rounded-lg cursor-pointer ${
              activeWalletType === "Solana"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleChangeWallet("Solana")}
          >
            Solana
          </p>
          <p
            className={`border p-2 rounded-lg cursor-pointer ${
              activeWalletType === "ETH"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleChangeWallet("ETH")}
          >
            ETH
          </p>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={handleWallet}>Add wallet</Button>
          <Button onClick={handleDeleteAddress} variant={"destructive"}>
            Clear wallets
          </Button>
        </div>
      </div>
      <div className={`w-full ${wallets.length > 1 ? "bg-gray-100" : ""} p-2 rounded-lg m-2`}>
        {wallets.length > 0
          ? wallets.map((item: Wallet, i: number) => 
            item?.privateKey && item.publicKey && (
              <div
                key={i}
                className="flex flex-col bg-gray-300 p-2 rounded-lg mb-2 overflow-hidden"
              >
                <div className="p-4 flex justify-between items-center bg-slate-400 rounded-lg">
                  <p>Wallet {i}</p>
                  <div className="flex gap-x-2">
                    <button onClick={() => toggleVisibility(i)}>
                      {visibleAddress[i] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    <Trash size={20} color="red" onClick={() => handleRemoveAddress(i)} />
                  </div>
                </div>
                {visibleAddress[i] && (
                  <>
                    <div className="flex p-2 mr-2 items-center">
                      <h4>Public key: </h4>
                      <p className="text-sm ml-2">{item.publicKey}</p>
                    </div>
                    <div className="p-2 flex items-center justify-between">
                      <div className="flex gap-x-2 items-center">
                        <h4>Private key: </h4>
                        <p className="text-sm ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {visiblePrivateKey[i]
                            ? item.privateKey
                            : "************************"}
                        </p>
                      </div>
                      <div>
                        <button onClick={() => togglePrivateKeyVisibility(i)}>
                          {visiblePrivateKey[i] ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          )
          : null}
      </div>
    </div>
  );
};

export default Address;