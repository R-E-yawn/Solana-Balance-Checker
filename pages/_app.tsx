import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as SolanaWeb3 from '@solana/web3.js'

const HomePage: NextPage = () => {
  const [solBalance, setSolBalance] = useState(0)
  const [solAddress, setSolAddress] = useState('')
  const [canExecute, setCanExecute] = useState(false)

  const onAddressSubmit = (submittedAddress: string) => {
    try {
      setSolAddress(submittedAddress)
      const publicKey = new SolanaWeb3.PublicKey(submittedAddress)
      const solConnection = new SolanaWeb3.Connection(SolanaWeb3.clusterApiUrl('devnet'))

      solConnection.getBalance(publicKey).then(balance => {
        setSolBalance(balance / SolanaWeb3.LAMPORTS_PER_SOL)
      })

      solConnection.getAccountInfo(publicKey).then(info => {
        setCanExecute(info?.executable ?? false)
      })
    } catch (error) {
      setSolAddress('')
      setSolBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={onAddressSubmit} />
        <p>{`Address: ${solAddress}`}</p>
        <p>{`Balance: ${solBalance} SOL`}</p>
        <p>{`Is it executable? ${canExecute ? 'Yes!' : 'No'}`}</p>
      </header>
    </div>
  )
}

export default HomePage
