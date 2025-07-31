import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useRef } from "react";

export function SendTokens () {
    const toRef = useRef<HTMLInputElement | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);

    const wallet = useWallet();
    const { connection } = useConnection();

    async function send (){
        const transaction = new Transaction();
        const amount = Number(amountRef.current?.value);
        console.log(amount)
        const toKey = toRef.current?.value
        if(!amount || !toKey){
            alert("Invalid.")
            return
        }
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey!,
            toPubkey: new PublicKey(toKey),
            lamports: amount * LAMPORTS_PER_SOL,
        }))
        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + toKey);
    }

    return <div className="flex space-x-2">
        <input ref={toRef} type="text" placeholder="To..." className="bg-white text-black rounded-md px-2 py-1 " />
        <input ref={amountRef} type="number" placeholder="Enter the amount..." className="bg-white text-black rounded-md px-2 py-1 " />

        <button onClick={send} className="rounded-md px-3 py-1 font-bold text-sm bg-white text-black">Send</button>
    </div>
}