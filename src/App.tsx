import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { RequestAirdrop } from "./components/RequestAirdrop"
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {

  return <div className="min-h-screen bg-black flex items-center justify-center space-x-4">
    <ConnectionProvider endpoint="">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

          <WalletMultiButton />
          <RequestAirdrop />

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
}

export default App
