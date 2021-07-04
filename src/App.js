import { useState } from "react";
import "./styles.css";

const isWin = (pieces, x, y) => {
  const piece = pieces[y][x];
  if (!piece) {
    return false;
  }
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

const Square = ({ piece, isWin, onClick }) => (
  <div className={isWin ? "square isWin" : "square"} onClick={onClick}>
    {(piece && svgPieces[piece]) || []}
  </div>
);

const Board = ({ pieces, onSpaceSelected }) => (
  <div className="board">
    {pieces.map((row, y) =>
      row.map((piece, x) => (
        <Square
          piece={piece}
          onClick={() => onSpaceSelected(x, y)}
          isWin={isWin(pieces, x, y)}
        />
      ))
    )}
  </div>
);

export default function Game() {
  const newGameState = () => ({
    pieces: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    nextPlayer: "X",
    turnNumber: 1,
    winner: null
  });

  const [state, setState] = useState(newGameState());

  const resetGame = () => {
    setState(newGameState);
  };

  const onSpaceSelected = (x, y) => {
    if (state.winner || state.pieces[y][x]) {
      return;
    }
    const pieces = state.pieces.map((row) => row.slice());
    pieces[y][x] = state.nextPlayer;
    const didWin = isWin(pieces, x, y);
    const winner = didWin ? state.nextPlayer : state.winner;
    const nextPlayer = (state.nextPlayer === "X") !== didWin ? "O" : "X";
    const turnNumber = state.turnNumber + 1;
    setState({
      ...state,
      pieces,
      nextPlayer,
      turnNumber,
      winner
    });
  };

  return (
    <div className={state.winner ? "game ended" : "game"}>
      <div className="header">
        {state.turnNumber > 9 ? (
          "Tie Game!"
        ) : (
          <>
            {state.winner ? "Winner:" : "Next Player:"}
            <div className="icon">{svgPieces[state.nextPlayer]}</div>
          </>
        )}
      </div>
      <Board pieces={state.pieces} onSpaceSelected={onSpaceSelected} />
      <button className="newGame" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}
