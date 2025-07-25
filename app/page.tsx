"use client"

import { motion } from "motion/react"

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

    return (
        <div className="">
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
        </div>
  )
}
