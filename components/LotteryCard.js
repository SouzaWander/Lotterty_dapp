import style from '../styles/PotCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useAppContext } from '../context/context'

const LotteryCard = () => {
  //  Get the data needed from context
  const {enterLottery, address, lotteryPot, lotteryId, pickWinner, lastWinner} = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        {/* Dynamically render the lotteryID */}
        Lottery <span className={style.textAccent}>{lotteryId}</span>
      </div>
      <div className={style.pot}>
        {/* Dynamically render the lottery pot */}
        Pot 🍯: <span className={style.goldAccent}>{lotteryPot}</span>
      </div>

      <div className={style.recentWinnerTitle}>🏆Last Winners🏆</div>
      {!lastWinner.length ? (
        <div className={style.winner}>No Winner Yet</div>
      ): (
        <div className={style.winner}>
          {truncateEthAddress(lastWinner[lastWinner.length-1])}
        </div>
      )}

      <div className={style.btn} onClick={enterLottery}>Enter</div>
      <div className={style.btn} onClick={pickWinner}>Pick Winner!</div>
    </div>
  )
}
export default LotteryCard
