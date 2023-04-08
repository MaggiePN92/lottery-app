// LotteryForm.tsx

import React, { useState } from 'react';
import './LotteryForm.css';


type Player = {
  name: string;
  tickets: number;
};

type Props = {
  onLotteryStart: (players: Player[]) => void;
};

function LotteryForm({ onLotteryStart }: Props) {
  const [players, setPlayers] = useState<Player[]>([{ name: '', tickets: 0 }]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLotteryStart(players);
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = value;
    setPlayers(newPlayers);
  };

  const handlePlayerTicketsChange = (index: number, value: number) => {
    const newPlayers = [...players];
    newPlayers[index].tickets = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: '', tickets: 0 }]);
  };

  const removePlayer = () => {
    const newPlayers = [...players];
    if (newPlayers.length === 1) {
      return;
    }
    newPlayers.pop();
    setPlayers(newPlayers);
  }

  return (
  <form onSubmit={handleSubmit}>

    <div className='buttons-input-container'>
      <div className="form-container">
        <div className="form-group">
          <label>Name of player:</label>
          {players.map((player, index) => (
            <input
              type="text"
              className='input-boxes'
              value={player.name}
              onChange={(event) =>
                handlePlayerNameChange(index, event.target.value)
              }/>))}
        </div>

      <div className="form-group">
        <label>Number of Tickets:</label>
        {players.map((player, index) => (
          <input
            type="number"
            className='input-boxes'
            min="0"
            value={player.tickets}
            onChange={(event) =>
              handlePlayerTicketsChange(index, parseInt(event.target.value))
            }/>))}
      </div>
    </div>

    <div className='buttons'>
      <button type="button" className='button-form' onClick={addPlayer}>
          Add Player
      </button>

      <button type="submit" className='button-form' >
        Start Lottery
      </button>

      <button type="button" className='button-form' onClick={removePlayer}>
        Remove player
      </button>
    </div>
  </div>
</form>


  );  
}

export default LotteryForm;
