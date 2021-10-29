import React from 'react';
import axios from 'axios';
import Settings from './settings';
import Victory from './victory';
import Jump from './jump';
import Messager from './messager';
import TypeText from './typeText';
import { Howl } from 'howler';

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      textClass: 'nameBox',
      text: 'Click on the piece to start your turn.',
      texts: [
        '',
        'Click on the piece to start your turn.',
        'Pieces can move forward 1 and either left or right 1! Click on either square to finish your turn.',
        'If you can jump at the beginning of your turn, you must! Click on the piece to start your turn.',
        'Jump the red piece to remove it from the board.',
        'Any follow-on jumps are optional! Choose an option.',
        'Finish your turn.',
        'When you reach your opponents side of the board, your piece gets kinged! Click on the piece to start your turn.',
        'Finish your turn.',
        'Kings can move backwards and forwards! Click \"Take it\" to win the game...',
        'Finish your turn.',
        ''
      ],
      openMessager: false,
      nextJump: false,
      settings: false,
      board: [],
      black: 12,
      red: 12,
      selected: [],
      turn: 'black',
      autoJumpRed: false,
      autoJumpBlack: false,
      victory: '',
      victoryMessage: '',
      playerOne: 'Player One',
      playerTwo: 'Player Two',
    };
    this.makeBoard = this.makeBoard.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.playSound = this.playSound.bind(this);
    this.settings = this.settings.bind(this);
    this.toggleJump = this.toggleJump.bind(this);
    this.skipJump = this.skipJump.bind(this);
    this.exitGuest = this.exitGuest.bind(this);
    this.jumpCheckBlack = this.jumpCheckBlack.bind(this);
    this.checkNextJumpBlack = this.checkNextJumpBlack.bind(this);
    this.moveSelected = this.moveSelected.bind(this);
    this.resetBlack = this.resetBlack.bind(this);
    this.resetBlackJump = this.resetBlackJump.bind(this);
    this.selectBlack = this.selectBlack.bind(this);
  }

  componentDidMount() {
    this.makeBoard('000000000000000000000001');
  }

  playSound(src) {
    const sound = new Howl ({
      src,
      html5: true
    });
    sound.play();
  }

  toggleDrawer() {
    const { openMessager } = this.state;
    this.setState({ openMessager: !openMessager });
  }

  makeBoard(id) {
    axios.get(`/api/boards/${id}`)
      .then((data) => {
        data = data.data;
        this.setState({
          board: data.board, black: data.black, red: data.red, turn: data.turn, autoJumpRed: data.autoJumpRed, autoJumpBlack: data.autoJumpBlack, playerOne: 'Player One', playerTwo: 'Player Two', victory: '' });
      });
  }

  exitGuest() {
    this.setState({ victory: '' });
    this.makeBoard('000000000000000000000000');
  }

  settings() {
    const { settings } = this.state;
    this.setState({ settings: !settings });
  }

  toggleJump(decision) {
    const { nextJump, step, texts } = this.state;
    this.setState({ nextJump: !nextJump, text: texts[decision === 'skip' ? step + 2 : step + 1], step: decision === 'skip' ? step + 2 : step + 1, textClass: decision === 'skip' || step >= 6 ? 'nextBox' : 'nameBox' });
  }

  skipJump() {
    const { step } = this.state;
    this.resetBlackJump();
    this.makeBoard(`00000000000000000000000${step + 1}`);
    this.toggleJump('skip');
  }

  checkNextJumpBlack(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'moveSelected';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'moveSelected';
    }
    this.setState({ selected: [rows, columns] });
    this.setState({ nextJump: true });
  }

  jumpCheckBlack(rows, columns) {
    const { board } = this.state;
    let isDouble = false;
    if (board[rows][columns][0] === 'O') {
      if ((board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'x' && board[rows + 2][columns - 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'X' && board[rows + 2][columns - 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'x' && board[rows + 2][columns + 2][0] === null)
        || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'X' && board[rows + 2][columns + 2][0] === null)) {
        this.checkNextJumpBlack(rows, columns);
        isDouble = true;
      }
    }
    if ((board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'x' && board[rows - 2][columns - 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'X' && board[rows - 2][columns - 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'x' && board[rows - 2][columns + 2][0] === null)
      || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'X' && board[rows - 2][columns + 2][0] === null)) {
      this.checkNextJumpBlack(rows, columns);
      isDouble = true;
    }
    return isDouble;
  }

  moveSelected(event) {
    const target = event.target.getAttribute('name');
    const {
      texts, step, board, selected, turn, autoJumpBlack, autoJumpRed,
      black, red, playerOne, playerTwo,
    } = this.state;
    const rows = Number(target.charAt(0));
    const columns = Number(target.charAt(1));
    const to = board[rows][columns];
    const from = board[selected[0]][selected[1]];
    let isDouble = false;
    board[rows][columns] = from;
    board[selected[0]][selected[1]] = to;
    board[rows][columns][1] = 'redSquare tutorial';
    board[selected[0]][selected[1]][2] = '';
    if (rows === 0) {
      board[rows][columns][0] = 'O';
    }
    if (autoJumpBlack) {
      const rowToDelete = (rows + selected[0]) / 2;
      const columnToDelete = (columns + selected[1]) / 2;
      board[rowToDelete][columnToDelete] = [null, 'redSquare tutorial', ''];
      this.setState((prevState) => ({ red: prevState.red - 1 }));
      this.resetBlackJump();
      isDouble = this.jumpCheckBlack(rows, columns);
    } else {
      this.resetBlack();
    }
    if (!isDouble) {
      this.setState({ victory: playerOne, victoryMessage: 'You have finished the tutorial!' });
    }
    this.playSound('https://tencentcheckers.s3.us-west-2.amazonaws.com/move.mp3');
    if (step !== 4 && step !== 8 && step !== 10 && step !== 11) {
      this.makeBoard(`00000000000000000000000${step}`);
    }
    this.setState({ step: step + 1, text: texts[step + 1], textClass: step >= 6 ? 'nextBox' : 'nameBox' });
  }

  resetBlack() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare tutorial';
    if (selected[0] > 0 && selected[1] > 0 && board[selected[0] - 1][selected[1] - 1]
      !== undefined && board[selected[0] - 1][selected[1] - 1][0] === null) {
      board[selected[0] - 1][selected[1] - 1][1] = 'redSquare tutorial';
      board[selected[0] - 1][selected[1] - 1][2] = '';
    }
    if (selected[0] > 0 && selected[1] < 7 && board[selected[0] - 1][selected[1] + 1]
      !== undefined && board[selected[0] - 1][selected[1] + 1][0] === null) {
      board[selected[0] - 1][selected[1] + 1][1] = 'redSquare tutorial';
      board[selected[0] - 1][selected[1] + 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] > 0 && board[selected[0] + 1][selected[1] - 1]
      !== undefined && board[selected[0] + 1][selected[1] - 1][0] === null) {
      board[selected[0] + 1][selected[1] - 1][1] = 'redSquare tutorial';
      board[selected[0] + 1][selected[1] - 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] < 7 && board[selected[0] + 1][selected[1] + 1]
      !== undefined && board[selected[0] + 1][selected[1] + 1][0] === null) {
      board[selected[0] + 1][selected[1] + 1][1] = 'redSquare tutorial';
      board[selected[0] + 1][selected[1] + 1][2] = '';
    }
    this.setState({ selected: [] });
  }

  resetBlackJump() {
    const { board, selected } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare tutorial';
    if (selected[0] > 1 && selected[1] > 1 && board[selected[0] - 2][selected[1] - 2]
      !== undefined && board[selected[0] - 2][selected[1] - 2][0] === null) {
      board[selected[0] - 2][selected[1] - 2][1] = 'redSquare tutorial';
      board[selected[0] - 2][selected[1] - 2][2] = '';
    }
    if (selected[0] > 1 && selected[1] < 6 && board[selected[0] - 2][selected[1] + 2]
      !== undefined && board[selected[0] - 2][selected[1] + 2][0] === null) {
      board[selected[0] - 2][selected[1] + 2][1] = 'redSquare tutorial';
      board[selected[0] - 2][selected[1] + 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] > 1 && board[selected[0] + 2][selected[1] - 2]
      !== undefined && board[selected[0] + 2][selected[1] - 2][0] === null) {
      board[selected[0] + 2][selected[1] - 2][1] = 'redSquare tutorial';
      board[selected[0] + 2][selected[1] - 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] < 6 && board[selected[0] + 2][selected[1] + 2]
      !== undefined && board[selected[0] + 2][selected[1] + 2][0] === null) {
      board[selected[0] + 2][selected[1] + 2][1] = 'redSquare tutorial';
      board[selected[0] + 2][selected[1] + 2][2] = '';
    }
    this.setState({ selected: [] });
  }

  selectBlack(event) {
    const {
      texts, step, board, selected, turn, autoJumpBlack,
    } = this.state;
    const target = event.target.getAttribute('name');
    const columns = Number(target.charAt(1));
    const rows = Number(target.charAt(0));
    if (autoJumpBlack) {
      board[rows][columns][1] = 'selectedPiece';
      if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
        board[rows - 2][columns - 2][1] = 'selectedSquare';
        board[rows - 2][columns - 2][2] = 'moveSelected';
      }
      if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
        board[rows - 2][columns + 2][1] = 'selectedSquare';
        board[rows - 2][columns + 2][2] = 'moveSelected';
      }
      if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
        board[rows + 2][columns - 2][1] = 'selectedSquare';
        board[rows + 2][columns - 2][2] = 'moveSelected';
      }
      if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
        board[rows + 2][columns + 2][1] = 'selectedSquare';
        board[rows + 2][columns + 2][2] = 'moveSelected';
      }
      this.setState({ selected: [rows, columns], text: texts[step + 1], step: step + 1 });
    } else {
      board[rows][columns][1] = 'selectedPiece';
      if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
        !== undefined && board[rows - 1][columns - 1][0] === null) {
        board[rows - 1][columns - 1][1] = 'selectedSquare';
        board[rows - 1][columns - 1][2] = 'moveSelected';
      }
      if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
        !== undefined && board[rows - 1][columns + 1][0] === null) {
        board[rows - 1][columns + 1][1] = 'selectedSquare';
        board[rows - 1][columns + 1][2] = 'moveSelected';
      }
      if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
        !== undefined && board[rows + 1][columns - 1][0] === null && board[rows][columns][0] === 'O') {
        board[rows + 1][columns - 1][1] = 'selectedSquare';
        board[rows + 1][columns - 1][2] = 'moveSelected';
      }
      if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
        !== undefined && board[rows + 1][columns + 1][0] === null && board[rows][columns][0] === 'O') {
        board[rows + 1][columns + 1][1] = 'selectedSquare';
        board[rows + 1][columns + 1][2] = 'moveSelected';
      }
      this.setState({ selected: [rows, columns], text: texts[step + 1], step: step + 1 });
    }
  }

  render() {
    const { turn, playerOne, playerTwo, board, text, textClass, openMessager, settings, victory, victoryMessage, nextJump, step,
    } = this.state;
    const { isLoggedIn, toggleTutorial } = this.props;
    return (
      <div className="bodyBackground">
        <img onClick={this.settings} className="settings" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/settings.png"/>
        <a href="http://mrgunyan.com" target="_blank">
          <img className="mr" src="https://michaelgunyanresume.s3.us-west-2.amazonaws.com/images/blackMr.png"/>
        </a>
        <div className="head">
          <h5>{`Your turn ${turn === 'black' ? playerOne : playerTwo}!`}</h5>
        </div>
        <div>
          {board.map((row, index) => (
            <div className="grid" key={`row ${Math.random() * 1000}`}>
              {row.map((square, i) => (
                <div
                  onClick={square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
                  onKeyPress={square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
                  name={`${index}${i}`}
                  className={square[1]}
                  key={`square ${Math.random() * 1000}`}
                >
                  {square[0] === null ?
                    null :
                    <img
                      name={`${index}${i}`}
                      className="piece"
                      alt=""
                      src={
                        `https://tencentcheckers.s3.us-west-2.amazonaws.com/${
                          square[0] === 'x' ?
                            'redPiece' :
                            square[0] === 'X' ?
                              'kingRedPiece' :
                              square[0] === 'O' ?
                                'kingBlackPiece' :
                                'blackPiece'
                        }.png`
                      }
                    />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>

        <TypeText
          text={text}
          textClass={textClass}
        />

        <Messager
          openMessager={openMessager}
          isLoggedIn={isLoggedIn}
          toggleTutorial={toggleTutorial}
          toggleDrawer={this.toggleDrawer}
        />

        <Settings
          settings={settings}
          isLoggedIn={isLoggedIn}
          toggleTutorial={toggleTutorial}
          exit={this.settings}
        />

        <Victory
          victory={victory}
          message={victoryMessage}
          isLoggedIn={isLoggedIn}
          toggleTutorial={toggleTutorial}
          exit={this.exitGuest}
        />

        <Jump
          nextJump={nextJump}
          step={step}
          toggleJump={this.toggleJump}
          skipJump={this.skipJump}
        />

      </div>
    );
  }
}

export default Tutorial;
