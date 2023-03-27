import { createContext, useState, useEffect, useContext } from 'react'

import Web3 from 'web3'
import createLotteryContract from '../utils/lotteryContracts'

export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState('')
  const [web3, setWeb3] = useState()
  const [lotteryContract, setLotteryContract] =  useState()
  const [lotteryId, setLotteryId] =  useState()
  const [lotteryPot, setLotteryPot] = useState('0 ETH')
  const [lotteryPlayers,setLotteryPlayers] = useState([])
  const [lastWinner,setLastWinner] = useState([])

  //Update the lottery card dynamically using our contract
  useEffect(() => {
    updateLottery()
  }, [lotteryContract])

  const updateLottery = async () => {
    if(lotteryContract) {
      const pot = await lotteryContract.methods.getBalance().call()
      setLotteryPot(web3.utils.fromWei(pot, 'ether') + 'ETH')

      setLotteryId(await lotteryContract.methods.lotteryID().call())

      setLotteryPlayers(await lotteryContract.methods.getPlayers().call())

      setLastWinner(await lotteryContract.methods.getWinners().call())
    }
  }

// Pick Winner
const pickWinner = async (address) => {
  try{
    let transaction =  lotteryContract.methods.pickWinner().sent(
      {
        from: address,
        gas: 300000,
        gasPrice: null
      }
    )
    console.log(transaction)
    updateLottery()
  }
  catch(error) {
    console.log(erro)
  }
}

const connectWallet = async () => {
    /* check if MetaMask is installed */
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        /* request wallet connection */
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        /* create web3 instance & set to state */
        const web3 = new Web3(window.ethereum)
        /* set web3 instance in React state */
        setWeb3(web3)
        /* get list of accounts */
        const accounts = await web3.eth.getAccounts()
        /* set account 1 to React state */
        setAddress(accounts[0])
        setLotteryContract(createLotteryContract(web3))
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()

          /* set account 1 to React state */
          setAddress(accounts[0])
        })
      } catch (err) {
        console.log(err, 'connect Wallet')
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask')
    }
  }

  //Enter Lottery
const enterLottery = async () => {
  try{
    await lotteryContract.methods.enter().send({
      from:address,
      value: web3.utils.toWei('0.1', 'ether'),
      gas:300000,
      gasPrice: null
    })
  }catch (error) {
    console.log(error)
  }
}

  return <appContext.Provider value={{connectWallet, address, enterLottery, lotteryPot, lotteryId, lotteryPlayers, pickWinner, lastWinner}}>{children}</appContext.Provider>
}

export const useAppContext = () => {
  return useContext(appContext)
}
