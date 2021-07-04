import "./styles.css";

const svgPieces = {
  X: (
    <svg viewBox="0 0 8 8">
      <line x1="2" y1="2" x2="6" y2="6"></line>
      <line x1="2" y1="6" x2="6" y2="2"></line>
    </svg>
  ),
  O: (
    <svg viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="2.25"></circle>
    </svg>
  )
};

const Square = ({ piece, isWin }) => (
  <div className={isWin ? "square isWin" : "square"}>
    {svgPieces[piece] || []}
  </div>
);

export default function App() {
  return (
    <div className="App">
      <div className="header">Next Player: X</div>
      <div className="board">
        <Square piece="X" isWin={true} />
        <Square piece="O" />
        <Square piece="X" />
        <Square piece="O" />
        <Square piece="X" isWin={true} />
        <Square piece="O" />
        <Square piece="X" />
        <Square piece="" />
        <Square piece="X" isWin={true} />
      </div>
    </div>
  );
}
