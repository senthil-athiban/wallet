import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import AddWallet from "./AddWallet";


const Wallet = () => {
  const [mnemonics, setMnemonics] = useState("");

  const handleMnemonics = () => {
    const res = generateMnemonic();
    setMnemonics(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonics);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full">
        <h2 className="flex text-center uppercase text-6xl font-bold text-wrap pt-2 m-2">
          Create your first web based wallet
        </h2>
        <div className="flex justify-between gap-x-2 w-full p-2">
          <Input
            type="text"
            className="w-full"
            placeholder="copy/paste you seed phrase"
            onChange={(e) =>  setMnemonics(e.target.value)}
          />
          <Button onClick={handleMnemonics}>Generate mnemonics</Button>
        </div>
        <div
          className="h-auto w-full border bg-gray-100 rounded-lg p-4 cursor-pointer"
          onClick={handleCopy}
        >
          {mnemonics?.length > 0 && (
            <div className="flex justify-end items-center gap-x-2 mb-4">
              <Copy size={20} />
              <p className="text-sm">Click anywhere to copy</p>
            </div>
          )}
          {mnemonics?.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {mnemonics?.split(" ")?.map((item: string, i: number) => (
                <p key={`${item}-${i}`} className="border p-2 rounded-lg bg-gray-300">{item}</p>
              ))}
            </div>
          ) : (
            <p className="text-xl text-center">No Seed Phrase found.</p>
          )}
        </div>
        <div>{mnemonics && <AddWallet mnemonics={mnemonics} />}</div>
      </div>
    </div>
  );
};

export default Wallet;
