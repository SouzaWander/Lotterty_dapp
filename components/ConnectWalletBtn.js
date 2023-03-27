import style from '../styles/Header.module.css'

const ConnectWalletBtn = ({connectWallet}) => {
  // Get the connect wallet function from the context.
  return <button className={style.loginBtn} onClick={connectWallet}> Connect Wallet</button>
}
export default ConnectWalletBtn
