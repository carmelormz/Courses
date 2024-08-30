export default function Log({ turns }) {
  return (
    <ol id='log'>
      {turns.map((turn, i) => (
        <li key={i}>
          <p>{`Player ${turn.player} selected (${turn.square.row}, ${turn.square.col})`}</p>
        </li>
      ))}
    </ol>
  );
}
