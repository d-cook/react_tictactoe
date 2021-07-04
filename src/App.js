import "./styles.css";

const isWin = (pieces, x, y) => {
  const piece = pieces[y][x];
  const L = pieces[y][(x + 2) % 3];
  const R = pieces[y][(x + 1) % 3];
  const U = pieces[(y + 2) % 3][x];
  const D = pieces[(y + 1) % 3][x];
  const UL = pieces[(y + 2) % 3][(x + 2) % 3];
  const UR = pieces[(y + 2) % 3][(x + 1) % 3];
  const DL = pieces[(y + 1) % 3][(x + 2) % 3];
  const DR = pieces[(y + 1) % 3][(x + 1) % 3];
  const isOnUpDiag = x - y === 0;
  const isOnDnDiag = x + y === 2;
  const isRowWin = piece === L && piece === R;
  const isColWin = piece === U && piece === D;
  const isDiagWin =
    (isOnUpDiag && piece === UL && piece === DR) ||
    (isOnDnDiag && piece === UR && piece === DL);
  return isRowWin || isColWin || isDiagWin;
};

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
    {(piece && svgPieces[piece]) || []}
  </div>
);

const Board = ({ pieces }) => (
  <div className="board">
    {pieces.map((row, y) =>
      row.map((piece, x) => (
        <Square piece={piece} isWin={isWin(pieces, x, y)} />
      ))
    )}
  </div>
);

export default function Game() {
  return (
    <div className="game">
      <div className="header">
        Next Player:
        <div className="icon">{svgPieces.X}</div>
      </div>
      <Board
        pieces={[
          ["O", "X", "O"],
          ["O", "X", "O"],
          ["X", "X", "X"]
        ]}
      />
      <button className="newGame">New Game</button>
    </div>
  );
}
