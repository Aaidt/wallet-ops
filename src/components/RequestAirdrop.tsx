import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useRef } from "react";


export function RequestAirdrop(){
    const amountRef = useRef<HTMLInputElement | null>(null)
    const wallet = useWallet();
    const { connection } = useConnection();

    async function airdrop(){
        const amount = Number(amountRef.current?.value);
        await connection.requestAirdrop(wallet.publicKey!, amount * LAMPORTS_PER_SOL)
        alert("Aidroped " + amount + "to " + wallet.publicKey?.toBase58());
    }

    return <div className="space-x-4">
        <input ref={amountRef} placeholder="Enter the amount..." type="number" className="px-2 py-1 rounded-md bg-white text-black " />
        <button className="px-2 py-1 text-sm font-medium rounded-md bg-white text-black" onClick={airdrop}>Request</button>
    </div>
}