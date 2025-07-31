import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef, useEffect, useState } from "react";

export function RequestAirdrop() {
    const amountRef = useRef<HTMLInputElement | null>(null);
    const { connection } = useConnection();
    const wallet = useWallet();

    const [balance, setBalance] = useState<number>(0);

    async function getUserBalance() {
        if (wallet.publicKey) {
            const lamports = await connection.getBalance(wallet.publicKey);
            setBalance(lamports / LAMPORTS_PER_SOL);
        }
    }

    useEffect(() => {
        if (wallet.connected) {
            getUserBalance();
        }
    }, [wallet.connected, wallet.publicKey]);

    async function airdrop() {
        const amount = Number(amountRef.current?.value);
        if (!amount || amount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        if (!wallet.publicKey) {
            alert("Wallet not connected");
            return;
        }

        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        await getUserBalance();
    }

    return (
        <div className="space-x-4">
            <input
                ref={amountRef}
                placeholder="Enter the amount..."
                type="number"
                className="px-2 py-1 rounded-md bg-white text-black"
            />
            <button
                className="px-2 py-1 text-sm font-medium rounded-md bg-white text-black"
                onClick={airdrop}
            >
                Request
            </button>

            <div className="text-lg text-white font-bold">
                SOL balance: {balance}
            </div>
        </div>
    );
}
