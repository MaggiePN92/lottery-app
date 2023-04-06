// App.tsx

import React, { useState } from 'react';
import LotteryForm from './LotteryForm';
import Lottery from './Lottery';
import PlayAgain from './PlayAgain';

type Player = {
  name: string;
  tickets: number;
};

function App() {
  const [lotteryStarted, setLotteryStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState('');
  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const handleLotteryStart = (players: Player[]) => {
    const totalTickets = players.reduce((sum, player) => sum + player.tickets, 0);
    setPlayers(players);
    setTicketsLeft(totalTickets);
    setLotteryStarted(true);
  };

  const handleWinnerDrawn = (winner: string, updatedPlayers: Player[]) => {
    setWinner(winner);
    setPlayers(updatedPlayers);
    setTicketsLeft(ticketsLeft - 1);

    if (ticketsLeft === 1) {
      setShowPlayAgain(true);
    }
  };

  const resetLottery = () => {
    setShowPlayAgain(false);
    setLotteryStarted(false);
    setWinner('');
  };

  return (
    <div className="App">
      {!lotteryStarted && !showPlayAgain ? (
        <LotteryForm onLotteryStart={handleLotteryStart} />
      ) : showPlayAgain ? (
        <PlayAgain resetLottery={resetLottery} />
      ) : (
        <Lottery players={players} onWinnerDrawn={handleWinnerDrawn} resetLottery={resetLottery} />
      )}
      {winner && <p>The winner is: {winner}!</p>}
    </div>
  );
}

export default App;
