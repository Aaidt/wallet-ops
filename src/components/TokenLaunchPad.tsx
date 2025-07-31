import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createMintToInstruction, createAssociatedTokenAccountInstruction, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';



export function TokenLaunchpad() {
    const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken(){
        const mintKeyPair = Keypair.generate();
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen)

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: mintKeyPair.publicKey!,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID
            }),
            createInitializeMintInstruction(mintKeyPair.publicKey, Number(wallet.publicKey), mintKeyPair.publicKey, TOKEN_2022_PROGRAM_ID)
        )

        transaction.feePayer = wallet.publicKey!;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeyPair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);

    }

    return <div className="flex-col space-y-4">
        <h1>Solana Token Launchpad</h1>
        <input type='text' placeholder='Name'></input> <br />
        <input type='text' placeholder='Symbol'></input> <br />
        <input type='text' placeholder='Image URL'></input> <br />
        <input type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}