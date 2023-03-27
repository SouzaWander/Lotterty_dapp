import style from '../styles/Table.module.css'
import TableRow from './TableRow'
import { useAppContext } from '../context/context'
const Table = () => {
  // Bring in the players data from the context.
  const {lotteryPlayers} = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.tableHeader}>
        <div className={style.addressTitle}>💳 User Address</div>
        <div className={style.amountTitle}>💲 Amount</div>
      </div>
      {/* Map through the players array and render a table row for each player. */}
      <div className={style.rows}>
        {lotteryPlayers.length ? (
          lotteryPlayers.map((player, index) => (
            <TableRow key={index} player={player}></TableRow>
          ))
        ): (
          <div className={style.noPlayers}> No players yet</div>
        )}
        
      </div>
    </div>
  )
}
export default Table
