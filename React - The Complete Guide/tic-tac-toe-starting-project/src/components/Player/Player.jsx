import { useState } from 'react';

export default function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const clickHandler = () => {
    // Since we are updating a react state based on the state old/previous value
    // is recommended to update by passing a function that sets the desired updated value
    setIsEditing((wasEditing) => !wasEditing);
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  let playerNameEl = <span className='player-name'>{playerName}</span>;

  if (isEditing) {
    playerNameEl = (
      <input
        type='text'
        required
        value={playerName}
        onChange={handleInputChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {playerNameEl}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={clickHandler}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
