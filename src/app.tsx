import { Component } from 'react';

import dice1 from './images/dice-1.png';
import dice2 from './images/dice-2.png'; 
import dice3 from './images/dice-3.png';
import dice4 from './images/dice-4.png';
import dice5 from './images/dice-5.png';
import dice6 from './images/dice-6.png';



export default class GameComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDice: dice6,
      player1Score: 0,
      player2Score: 0,
      player1Point: 0,
      player2Point: 0,
      activClass: ' bg-[#d9aebd] ',
      currentPlayer: 1,
      winnigNumber: 60
    };
  }

  handleDice = () => {
    const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
    const rand = Math.floor(Math.random() * dices.length);
    const selectedDice = dices[rand];
    this.state.currentPlayer === 1
      ? this.setState((prevState: any) => ({
          selectedDice,
          player1Point: rand !== 0 ? prevState.player1Point + rand + 1 : 0,
          currentPlayer: rand !== 0 ? prevState.currentPlayer : 2
        }))
      : this.setState((prevState: any) => ({
          selectedDice,
          player2Point: rand !== 0 ? prevState.player2Point + rand + 1 : 0,
          currentPlayer: rand !== 0 ? prevState.currentPlayer : 1
        }));
  };

  handleNewGame = () =>
    this.setState({
      player1Score: 0,
      player2Score: 0,
      player1Point: 0,
      player2Point: 0,
      currentPlayer: 1
    });

  handleHold = () => {
    this.state.currentPlayer === 1
      ? this.setState({
          player1Score: this.state.player1Score + this.state.player1Point,
          player1Point: 0,
          currentPlayer: 2
        })
      : this.setState({
          player2Score: this.state.player2Score + this.state.player2Point,
          player2Point: 0,
          currentPlayer: 1
        });
  };

  Winner = () => {
    if (this.state.player1Score >= this.state.winnigNumber) {
      alert('Winner Player1..');
      this.handleNewGame();
    } else if (this.state.player2Score >= this.state.winnigNumber) {
      alert('Winner Player2..');
      this.handleNewGame();
    }
  };

  render() {
    const { selectedDice, player1Score, player2Score, player1Point, player2Point, activClass, currentPlayer } = this.state;
    this.Winner();
    return (
      <div className="font-nunito grid place-items-center  w-full h-full bg-gradient-to-tl from-[#763681] to-[#BF2E35]">
        <div className="shadow-2xl relative w-[1000px] h-[600px] flex ">
          <div className={`rounded-s-xl p-24  w-full  flex flex-col items-center ${currentPlayer === 1 ? activClass : 'bg-[#b57a9d]'}`}>
            <div className="text-4xl  text-center font-semibold">Player 1</div>
            <div className="text-7xl pt-10  text-[#d63764]">{player1Score}</div>
            <div className="bg-[#d63764]  rounded-lg text-white w-[200px] h-[100px] text-center py-4 mt-36">
              <div className="uppercase text-xl">Current</div>
              <div className="text-5xl" id="current--score-1">
                {player1Point}
              </div>
            </div>
          </div>
          <div className={`rounded-e-xl p-24  w-full  flex flex-col items-center ${currentPlayer === 2 ? activClass : 'bg-[#b57a9d]'}`}>
            <div>
              <div className="text-4xl  text-center font-semibold">Player 2</div>
              <div className="text-7xl pt-10  text-[#d63764]">{player2Score}</div>
            </div>
            <div className="bg-[#d63764]  rounded-lg text-white w-[200px] h-[100px] text-center py-4 mt-36">
              <div className="uppercase text-xl">Current</div>
              <div className="text-5xl" id="current--score-1">
                {player2Point}
              </div>
            </div>
          </div>

          <button
            className="bg-slate-100 active:translate-y-1.5 transition absolute left-[40%] shadow rounded-full py-2 px-7 cursor-pointer top-[15%] uppercase text-xl"
            onClick={this.handleNewGame}
          >
            🔄 NEW GAME
          </button>
          <img src={selectedDice} className="shadow-xl absolute left-[43%] top-[30%] w-[120px] h-[120px]" alt="dice_image" />
          <button
            className="bg-slate-100 active:translate-y-1.5 transition absolute left-[40%] shadow rounded-full py-2 px-7 cursor-pointer bottom-[30%] uppercase text-xl "
            onClick={this.handleDice}
          >
            🎲 ROOL DICE
          </button>
          <button
            className="bg-slate-100 active:translate-y-1.5 transition absolute left-[43%] shadow rounded-full py-2 px-7 cursor-pointer bottom-[15%] uppercase text-xl"
            onClick={this.handleHold}
          >
            📥 Hold
          </button>
        </div>
      </div>
    );
  }
}
