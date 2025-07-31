import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
// import { RequestAirdrop } from "./components/RequestAirdrop"
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';
import { SignMessage } from './components/SignMessage';

function App() {

  return <div className="min-h-screen bg-black flex items-center justify-center space-x-4">
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/ocjTmvWQ_uflOz59lt9Qm7fD1bib7LN8">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

          <WalletMultiButton />
          {/* <RequestAirdrop /> */}
          <SignMessage />

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
}

export default App
