// PlayAgain.tsx

import React from 'react';

type Props = {
  resetLottery: () => void;
};

const PlayAgain: React.FC<Props> = ({ resetLottery }) => {
  return (
    <div>
      <p>No more tickets. Want to play again?</p>
      <button onClick={resetLottery}>Yes</button>
    </div>
  );
};

export default PlayAgain;
