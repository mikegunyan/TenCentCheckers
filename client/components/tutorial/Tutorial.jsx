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
    this.checkTurnRed = this.checkTurnRed.bind(this);
    this.checkTurnBlack = this.checkTurnBlack.bind(this);
    this.jumpCheckRed = this.jumpCheckRed.bind(this);
    this.jumpCheckBlack = this.jumpCheckBlack.bind(this);
    this.checkAutoJumpRed = this.checkAutoJumpRed.bind(this);
    this.checkAutoJumpBlack = this.checkAutoJumpBlack.bind(this);
    this.checkNextJumpBlack = this.checkNextJumpBlack.bind(this);
    this.moveSelected = this.moveSelected.bind(this);
    this.resetRed = this.resetRed.bind(this);
    this.resetRedJump = this.resetRedJump.bind(this);
    this.selectRed = this.selectRed.bind(this);
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
    const { turn, step } = this.state;
    if (turn === 'red') {
      this.setState({ autoJumpRed: false});
      this.resetRedJump();
      this.checkAutoJumpBlack();
    } else {
      this.setState({ autoJumpBlack: false});
      this.resetBlackJump();
      this.checkAutoJumpRed();
    }
    this.setState({ turn: turn === 'red' ? 'black' : 'red' });
    this.makeBoard(`00000000000000000000000${step + 1}`);
    this.toggleJump('skip');
  }

  checkNextJumpRed(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'moveSelected';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'moveSelected';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'moveSelected';
    }
    this.setState({ selected: [rows, columns] });
    this.setState({ nextJump: true });
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

  checkTurnRed() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'x' || board[row][column][0] === 'X') {
          if (board[row][column][0] === 'X') {
            if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'o' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'O' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'o' && board[row - 2][column + 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'O' && board[row - 2][column + 2][0] === null)
              || (board[row - 1] && board[row - 1][column - 1] && board[row - 1][column - 1][0] === null)
              || (board[row - 1] && board[row - 1][column + 1] && board[row - 1][column + 1][0] === null)) {
              return true;
            }
          }
          if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'o' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'O' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'o' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'O' && board[row + 2][column + 2][0] === null)
            || (board[row + 1] && board[row + 1][column - 1] && board[row + 1][column - 1][0] === null)
            || (board[row + 1] && board[row + 1][column + 1] && board[row + 1][column + 1][0] === null)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkTurnBlack() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'o' || board[row][column][0] === 'O') {
          if (board[row][column][0] === 'O') {
            if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'X' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'X' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'x' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'x' && board[row + 2][column + 2][0] === null)
            || (board[row + 1] && board[row + 1][column - 1] && board[row + 1][column - 1][0] === null)
            || (board[row + 1] && board[row + 1][column + 1] && board[row + 1][column + 1][0] === null)) {
              return true;
            }
          }
          if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'X' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'X' && board[row - 2][column + 2][0] === null)
            || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'x' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'x' && board[row - 2][column + 2][0] === null)
            || (board[row - 1] && board[row - 1][column - 1] && board[row - 1][column - 1][0] === null)
            || (board[row - 1] && board[row - 1][column + 1] && board[row - 1][column + 1][0] === null)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkAutoJumpRed() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'x' || board[row][column][0] === 'X') {
          if (board[row][column][0] === 'X') {
            if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'o' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'O' && board[row - 2][column - 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'o' && board[row - 2][column + 2][0] === null)
              || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'O' && board[row - 2][column + 2][0] === null)) {
              this.setState({ autoJumpRed: true });
              break;
            }
          }
          if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'o' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'O' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'o' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'O' && board[row + 2][column + 2][0] === null)) {
            this.setState({ autoJumpRed: true });
            break;
          }
        }
      }
    }
  }

  checkAutoJumpBlack() {
    const { board } = this.state;
    for (let row = 0; row < board.length; row += 1) {
      for (let column = 0; column < board[row].length; column += 1) {
        if (board[row][column][0] === 'o' || board[row][column][0] === 'O') {
          if (board[row][column][0] === 'O') {
            if ((board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'X' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'X' && board[row + 2][column + 2][0] === null)
            || (board[row + 2] && board[row + 2][column - 2] && row < 7 && column > 0 && board[row + 1][column - 1][0] === 'x' && board[row + 2][column - 2][0] === null)
            || (board[row + 2] && board[row + 2][column + 2] && row < 7 && column < 7 && board[row + 1][column + 1][0] === 'x' && board[row + 2][column + 2][0] === null)) {
              this.setState({ autoJumpBlack: true });
              break;
            }
          }
          if ((board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'X' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'X' && board[row - 2][column + 2][0] === null)
            || (board[row - 2] && board[row - 2][column - 2] && row > 0 && column > 0 && board[row - 1][column - 1][0] === 'x' && board[row - 2][column - 2][0] === null)
            || (board[row - 2] && board[row - 2][column + 2] && row > 0 && column < 7 && board[row - 1][column + 1][0] === 'x' && board[row - 2][column + 2][0] === null)) {
            this.setState({ autoJumpBlack: true });
            break;
          }
        }
      }
    }
  }

  jumpCheckRed(rows, columns) {
    const { board } = this.state;
    let isDouble = false;
    if (board[rows][columns][0] === 'X') {
      if ((board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'o' && board[rows - 2][columns - 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns - 2] && rows > 0 && columns > 0 && board[rows - 1][columns - 1][0] === 'O' && board[rows - 2][columns - 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'o' && board[rows - 2][columns + 2][0] === null)
        || (board[rows - 2] && board[rows - 2][columns + 2] && rows > 0 && columns < 7 && board[rows - 1][columns + 1][0] === 'O' && board[rows - 2][columns + 2][0] === null)) {
        this.checkNextJumpRed(rows, columns);
        isDouble = true;
      }
    }
    if ((board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'o' && board[rows + 2][columns - 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns - 2] && rows < 7 && columns > 0 && board[rows + 1][columns - 1][0] === 'O' && board[rows + 2][columns - 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'o' && board[rows + 2][columns + 2][0] === null)
      || (board[rows + 2] && board[rows + 2][columns + 2] && rows < 7 && columns < 7 && board[rows + 1][columns + 1][0] === 'O' && board[rows + 2][columns + 2][0] === null)) {
      this.checkNextJumpRed(rows, columns);
      isDouble = true;
    }
    return isDouble;
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
    if (turn === 'black') {
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
        this.setState({ turn: 'red', autoJumpBlack: false });
        if (this.checkTurnRed()) {
          this.checkAutoJumpRed();
        } else {
          const message = red === 1 ? '' : 'No more turns!';
          this.setState({ victory: playerOne, victoryMessage: message });
        }
      }
    } else {
      if (rows === 7) {
        board[rows][columns][0] = 'X';
      }
      if (autoJumpRed) {
        const rowToDelete = (rows + selected[0]) / 2;
        const columnToDelete = (columns + selected[1]) / 2;
        board[rowToDelete][columnToDelete] = [null, 'redSquare tutorial', ''];
        this.setState((prevState) => ({ black: prevState.black - 1 }));
        this.resetRedJump();
        isDouble = this.jumpCheckRed(rows, columns);
      } else {
        this.resetRed();
      }
      if (!isDouble) {
        this.setState({ turn: 'black', autoJumpRed: false });
        if (this.checkTurnBlack()) {
          this.checkAutoJumpBlack();
        } else {
          const message = black === 1 ? '' : 'No more turns!';
          this.setState({ victory: playerTwo, victoryMessage: message });
        }
      }
    }
    this.playSound('https://tencentcheckers.s3.us-west-2.amazonaws.com/move.mp3');
    console.log(step)
    if (step !== 4 && step !== 8 && step !== 10 && step !== 11) {
      this.makeBoard(`00000000000000000000000${step}`);
    }
    this.setState({ step: step + 1, text: texts[step + 1], textClass: step >= 6 ? 'nextBox' : 'nameBox' });
  }

  resetRed() {
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

  resetRedJump() {
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

  selectRed(event) {
    const {
      board, selected, turn, autoJumpRed,
    } = this.state;
    if (turn === 'red') {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpRed) {
        if (selected.length > 0) {
          this.resetRedJump();
        } else {
          board[rows][columns][1] = 'selectedPiece';
          if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
            board[rows - 2][columns - 2][1] = 'selectedSquare';
            board[rows - 2][columns - 2][2] = 'moveSelected';
          }
          if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
            board[rows - 2][columns + 2][1] = 'selectedSquare';
            board[rows - 2][columns + 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
            board[rows + 2][columns - 2][1] = 'selectedSquare';
            board[rows + 2][columns - 2][2] = 'moveSelected';
          }
          if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
            board[rows + 2][columns + 2][1] = 'selectedSquare';
            board[rows + 2][columns + 2][2] = 'moveSelected';
          }
          this.setState({ selected: [rows, columns] });
        }
      } else if (selected.length > 0) {
        this.resetRed();
      } else {
        board[rows][columns][1] = 'selectedPiece';
        if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
          !== undefined && board[rows - 1][columns - 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns - 1][1] = 'selectedSquare';
          board[rows - 1][columns - 1][2] = 'moveSelected';
        }
        if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
          !== undefined && board[rows - 1][columns + 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns + 1][1] = 'selectedSquare';
          board[rows - 1][columns + 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
          !== undefined && board[rows + 1][columns - 1][0] === null) {
          board[rows + 1][columns - 1][1] = 'selectedSquare';
          board[rows + 1][columns - 1][2] = 'moveSelected';
        }
        if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
          !== undefined && board[rows + 1][columns + 1][0] === null) {
          board[rows + 1][columns + 1][1] = 'selectedSquare';
          board[rows + 1][columns + 1][2] = 'moveSelected';
        }
        this.setState({ selected: [rows, columns] });
      }
    }
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
    if (turn === 'black') {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpBlack) {
        if (selected.length > 0) {
          // this.resetBlackJump();
        } else {
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
        }
      } else if (selected.length > 0) {
        // this.resetBlack();
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
  }

  render() {
    const { step, text, textClass, openMessager, board, turn, playerOne, playerTwo, victory, settings, nextJump, victoryMessage,
    } = this.state;
    const { isLoggedIn, toggleTutorial } = this.props;
    const playersTurn = () => {
      if (turn === 'black') {
        return playerOne;
      }
      return playerTwo;
    };
    const whichPiece = (square, index, i) => {
      if (square[0] === null) {
        return null;
      }
      if (square[0] === 'x') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/redPiece.png" />
        );
      }
      if (square[0] === 'X') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/kingRedPiece.png" />
        );
      }
      if (square[0] === 'O') {
        return (
          <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/kingBlackPiece.png" />
        );
      }
      return (
        <img name={`${index}${i}`} className="piece" alt="" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/blackPiece.png" />
      );
    };
    return (
      <div className="bodyBackground">
        <img onClick={this.settings} className="settings" src="https://tencentcheckers.s3.us-west-2.amazonaws.com/settings.png"/>
        <a href="http://mrgunyan.com" target="_blank">
          <img className="mr" src="https://michaelgunyanresume.s3.us-west-2.amazonaws.com/images/blackMr.png"/>
        </a>
        <div className="head">
          <h5>{`Your turn ${playersTurn()}!`}</h5>
        </div>
        <div>
          {board.map((row, index) => (
            <div className="grid" key={`row ${Math.random() * 1000}`}>
              {row.map((square, i) => (
                <div
                  onClick={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
                  onKeyPress={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'moveSelected' ? this.moveSelected : null}
                  name={`${index}${i}`}
                  className={square[1]}
                  key={`square ${Math.random() * 1000}`}
                >
                  {whichPiece(square, index, i)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <TypeText text={text} textClass={textClass} />


        <Messager
          openMessager={openMessager}
          toggleTutorial={toggleTutorial}
          toggleDrawer={this.toggleDrawer}
        />

        <Settings
          exit={this.settings}
          isLoggedIn={isLoggedIn}
          toggleTutorial={toggleTutorial}
          settings={settings}
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
