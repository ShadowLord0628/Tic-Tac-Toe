import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'
import isWInner from "../../src/helpers/checkWinner";

function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurns] = useState(true); //  true -> X, false -> O
    const [winner, setWinner] = useState(null);
    function play(index) {
        if (turn == true) {
            board[index] = 'X';
        } else {
            board[index] = 'O';
        }

        const win = isWInner(board, turn ? "X" : "O");
        if (win) {
            setWinner(win);
        }
        setBoard([...board]);
        setTurns(!turn);
    }

    function isDraw(board) {
        let full = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i] != "") {
                full += 1;
            }
        }
        if (full == 9 && !winner) {
            return true;
        } else {
            false;
        }
    }

    function reset() {
        setTurns(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(""));

    }

    return (
        <div className="grid-wrapper">
            {
                <>
                    <h1 className="title">Tic-Tac-Toe</h1>
                </>
            }
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            {
                isDraw(board) && (
                    <>
                        <h1 className="turn-highlight">Its a Draw</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current Turn: {(winner || isDraw(board)) ? '--' : ((turn) ? 'X' : 'O')}</h1>
            <div className="grid">
                {board.map((el, idx) => <Card key={idx} onPlay={play} player={el} index={idx} gameEnd={winner ? true : false} />)}
            </div>
        </div>
    );
}

export default Grid;
