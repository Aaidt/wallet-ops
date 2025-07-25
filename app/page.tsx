"use client"

import { motion } from "motion/react"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

const text = "Wallet_ops"
export default function Home() {
    const letterVariants = {
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0 },

    }

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }       
        }
    }

    const walletVariant = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: {
                delayChildren: 1
            }
        } 
    } 

    return (
        <div className="flex-col">
            <motion.div variants={containerVariant} initial="hidden" animate="visible" 
                className="text-5xl font-bold flex justify-center items-center pt-25">

                {text.split("").map((char, idx) => (
                    <motion.span 
                        variants={letterVariants}
                        key={idx}>
                        {char}
                    </motion.span>
                ))}
            </motion.div>

                <motion.div variants={walletVariant} initial="hidden" animate="visible" className="flex justify-center pt-30">
                    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                        <WalletProvider wallets={[]}>
                            <WalletModalProvider>
                                <div className="">
                                    <WalletMultiButton />
                                </div>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </motion.div>
        </div>
  )
}
