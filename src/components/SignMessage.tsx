import { ed25519 } from "@noble/curves/ed25519"
import { useWallet } from "@solana/wallet-adapter-react"
import bs58 from "bs58";
import { useRef } from "react";

export function SignMessage () {
    
    const messageRef = useRef<HTMLInputElement | null>(null);
    const { signMessage, publicKey } = useWallet(); 


    return <div className="flex space-x-4">
        <input className="bg-white text-black rounded-md px-2 py-1 " placeholder="Enter the message..."
            type="text" ref={messageRef} />

        <button onClick={async () => {
            if(!publicKey) throw new Error("No publick key")
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            const message = messageRef.current?.value as string;
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);
            
            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
            alert(`Message signature: ${bs58.encode(signature)}`);

        }} className="rounded-md px-3 py-1 font-bold text-sm bg-white text-black">
            Sign
        </button>
    </div>

}