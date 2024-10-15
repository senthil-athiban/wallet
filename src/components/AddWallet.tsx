import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import Address, { Wallet } from "./Address";
import {ethers} from "ethers";

interface AddWalletProps {
  mnemonics: string;
}
const AddWallet = ({ mnemonics }: AddWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallet, setCurrentWallet] = useState("Solana");
  const [solWallets, setSolWallets] = useState<Array<Wallet>>([
    { privateKey: "", publicKey: "" },
  ]);
  const [ethWallets, setEthWallets] = useState<Array<Wallet>>([
    { privateKey: "", publicKey: "" },
  ]);

  const getWallet = (currentWallet: string) => {
    let publicKey, privateKey;

    const seed = mnemonicToSeed(mnemonics);
    const derivationPath = `m/44'/${currentWallet === "Solana" ? "501" : "60"}'/${currentIndex}'/0'`;
    // @ts-ignore
    const derivedSeed = derivePath(derivationPath!, seed.toString("hex")).key;
    
    if (currentWallet === "Solana") {  
      // @ts-ignore
      const secret = nacl.sign.keyPair(derivedSeed).secretKey;
      const keyPair = Keypair.fromSecretKey(secret);
      publicKey = keyPair.publicKey.toBase58();
      privateKey = bs58.encode(secret);

    } else if (currentWallet === "ETH") {
      privateKey = Buffer.from(derivedSeed).toString("hex");
      const wallet = new ethers.Wallet(privateKey);
      publicKey = wallet.address;
    }

    setCurrentIndex(currentIndex + 1);
    return { publicKey, privateKey };
  };

  const handleWallet = () => {
    const { privateKey, publicKey } = getWallet(currentWallet);
    if (currentWallet === "Solana") {
      setSolWallets((prev) => [...prev, { privateKey, publicKey }]);
    } else if (currentWallet === "ETH") {
      setEthWallets((prev) => [...prev, { privateKey, publicKey }]);
    }
  };

  return (
    <div className="p-2 m-2">
      <div className="w-full">
        <Address
          solWallets={solWallets}
          ethWallets={ethWallets}
          setCurrentWallet={setCurrentWallet}
          handleWallet={handleWallet}
          setEthWallets={setEthWallets}
          setSolWallets={setSolWallets}
        />
      </div>
    </div>
  );
};

export default AddWallet;
