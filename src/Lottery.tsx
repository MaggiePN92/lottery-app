// Lottery.tsx
import React, { useState }  from 'react';
import './Lottery.css';
import styles from './LotteryTable.module.css';

type Player = {
  name: string;
  tickets: number;
};

type Props = {
  players: Player[];
  onWinnerDrawn: (winner: string, updatedPlayers: Player[]) => void;
  resetLottery: () => void;
};

function Lottery({ players, onWinnerDrawn, resetLottery }: Props) {
  const totalTickets = players.reduce((sum, player) => sum + player.tickets, 0);
  const [selectedWinner, setSelectedWinner] = useState('');
  const [winners, setWinners] = useState<Player[]>([]);
  const [lotteryEnded, setLotteryEnded] = useState(false);

  const handleDrawWinner = () => {
    const tickets: string[] = [];
    players.forEach((player, index) => {
      for (let i = 0; i < player.tickets; i++) {
        tickets.push(index.toString());
      }
    });

    const winnerIndex = Math.floor(Math.random() * tickets.length);
    const winnerPlayerIndex = parseInt(tickets[winnerIndex]);
    const winnerName = players[winnerPlayerIndex].name;
    setSelectedWinner(winnerName);
    setWinners([...winners, players[winnerPlayerIndex]]);
    // Reduce the winner's ticket count by 1
    const updatedPlayers = players.map((player, index) => {
      if (index === winnerPlayerIndex) {
        return { ...player, tickets: player.tickets - 1 };
      }
      return player;
    });

    onWinnerDrawn(winnerName, updatedPlayers);
  };

  return (
    <div className="Lottery">
      <h1>Lottery</h1>
      {selectedWinner && <p className="winner">The winner is: {selectedWinner}!</p>}
      <div className='button-div'>
        <button onClick={handleDrawWinner} disabled={totalTickets === 0}>
          Draw Winner
        </button>
        <button onClick={() => setLotteryEnded(true)}>
          End lottery
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Player</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalTickets === 0 || lotteryEnded ?(
        <div>
          <table>
          <thead>
            <tr>
              <th>Winners</th>
            </tr>
          </thead>

          <tbody>
            {winners.map(player => (
              <tr>
                <td>{player.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
          <p>No more tickets. Want to play one more?</p>
          <button onClick={resetLottery}>Play again</button>
        </div>
      ) : null}
    </div>
  );
}

export default Lottery;
