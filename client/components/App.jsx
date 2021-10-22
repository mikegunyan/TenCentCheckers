import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';
import Welcome from './welcome';
import Settings from './settings';
import Save from './save';
import Jump from './jump';
import Invitation from './invitation';
import Messager from './messager';
import { Howl } from 'howler';

let client;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileBrowser: false,
      openMessager: false,
      messageCount: 0,
      messages: [],
      usersList: [],
      clientID: '',
      opponentID: '',
      id: '',
      invitation: false,
      sender: false,
      moveSender: false,
      nextJump: false,
      settings: false,
      saveView: false,
      savedView: false,
      board: [],
      black: 12,
      red: 12,
      selected: [],
      turn: 'black',
      autoJumpRed: false,
      autoJumpBlack: false,
      modal: true,
      victory: '',
      victoryMessage: '',
      gameList: [],
      playerOne: 'Player One',
      playerTwo: 'Player Two',
    };
    this.checkBrowser = this.checkBrowser.bind(this);
    this.playSound = this.playSound.bind(this);
    this.createConnection = this.createConnection.bind(this);
    this.makeBoard = this.makeBoard.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.sendMove = this.sendMove.bind(this);
    this.sendJump = this.sendJump.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.declineInvite = this.declineInvite.bind(this);
    this.settings = this.settings.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.save = this.save.bind(this);
    this.toggleJump = this.toggleJump.bind(this);
    this.skipJump = this.skipJump.bind(this);
    this.checkTurnRed = this.checkTurnRed.bind(this);
    this.checkTurnBlack = this.checkTurnBlack.bind(this);
    this.jumpCheckRed = this.jumpCheckRed.bind(this);
    this.jumpCheckBlack = this.jumpCheckBlack.bind(this);
    this.checkAutoJumpRed = this.checkAutoJumpRed.bind(this);
    this.checkAutoJumpBlack = this.checkAutoJumpBlack.bind(this);
    this.checkNextJumpBlack = this.checkNextJumpBlack.bind(this);
    this.changeGame = this.changeGame.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeWelcomeView = this.changeWelcomeView.bind(this);
    this.changeVictory = this.changeVictory.bind(this);
    this.players = this.players.bind(this);
    this.moveSelected = this.moveSelected.bind(this);
    this.resetRed = this.resetRed.bind(this);
    this.resetRedJump = this.resetRedJump.bind(this);
    this.selectRed = this.selectRed.bind(this);
    this.resetBlack = this.resetBlack.bind(this);
    this.resetBlackJump = this.resetBlackJump.bind(this);
    this.selectBlack = this.selectBlack.bind(this);
  }

  componentDidMount() {
    this.checkBrowser();
  }

  checkBrowser() {
    window.mobileCheck = function() {
      let check = false;
      ((a) => {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    this.setState({ mobileBrowser: window.mobileCheck() });
  }

  playSound(src) {
    const sound = new Howl ({
      src,
      html5: true
    });
    sound.play();
  }

  createConnection() {
    const { clientID, opponentID, sender } = this.state;
    if (client) {
      client.close();
    }
    client = new W3CWebSocket('ws://54.219.137.236:8000'); // 54.219.137.236
    this.setState({ victory: '', victoryMessage: '', sender: false });
    client.onopen = () => {};
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === 'users') {
        this.setState({ usersList: dataFromServer.list, clientID: dataFromServer.userID });
      }
      if (dataFromServer.type === 'invite') {
        this.setState({ opponentID: dataFromServer.playerTwo, playerTwo: dataFromServer.username, invitation: true });
      }
      if (dataFromServer.type === 'accept') {
        this.setState({ invitation: false, modal: false });
      }
      if (dataFromServer.type === 'decline') {
        this.setState({ invitation: false, sender: false, playerTwo: 'Player Two', opponentID: '' });
      }
      if (dataFromServer.type === 'move') {
        this.moveSelected(
          dataFromServer.target,
          dataFromServer.selected,
          dataFromServer.turn,
          dataFromServer.autoJumpBlack,
          dataFromServer.autoJumpRed
        );
      }
      if (dataFromServer.type === 'jump') {
        if (dataFromServer.choice === 'take') {
          this.setState({ nextJump: dataFromServer.nextJump });
        }
        if (dataFromServer.choice === 'skip') {
          this.setState({ nextJump: false });
          this.skipJump(dataFromServer.turn);
        }
      }
      if (dataFromServer.type === 'message') {
        const { messages, messageCount, openMessager } = this.state;
        let newCount = openMessager ? messageCount : messageCount + 1;
        let newMessages = messages.slice();
        newMessages.unshift({
          source: 'opponent',
          message: dataFromServer.message
        });
        this.setState({ messages: newMessages, messageCount: newCount });
        if (!openMessager) {
          this.playSound('https://tencentcheckers.s3.us-west-2.amazonaws.com/message.mp3');
        }
      }
    };
  }

  makeBoard(id, username, userid) {
    this.createConnection();
    axios.get(`/api/boards/${id}`)
      .then((data) => {
        return data.data;
      })
      .then((data) => {
        data.username = username;
        data.id = userid;
        return data;
      })
      .then((data) => {
        axios.get(`/api/games/${data.id}`)
          .then((games) => {
            if (data.playerTwo === '') {
              data.playerTwo = 'Player Two';
            }
            this.setState({
              board: data.board, black: data.black, red: data.red, turn: data.turn, autoJumpRed: data.autoJumpRed, autoJumpBlack: data.autoJumpBlack, playerTwo: data.playerTwo, victory: '', playerOne: data.username, id: data.id, gameList: games.data.games });
            client.send(JSON.stringify({
              type: 'username',
              username: data.username
            }));
          });
      });
  }

  toggleDrawer() {
    const { openMessager } = this.state;
    this.setState({ openMessager: !openMessager, messageCount: 0 });
  }

  sendMessage(message) {
    const { messages, opponentID } = this.state;
    let newMessages = messages.slice();
    newMessages.unshift({
      source: 'client',
      message
    });
    this.setState({ messages: newMessages });
    client.send(JSON.stringify({
      type: 'message',
      opponentID,
      message
    }));
  }

  sendInvite(one, two) {
    this.setState({ sender: true });
    client.send(JSON.stringify({
      type: 'invite',
      playerOne: one,
      playerTwo: two
    }));
  }

  sendMove(event) {
    const target = event.target.getAttribute('name');
    this.setState({ moveSender: true });
    const { clientID, opponentID, selected, turn, autoJumpBlack, autoJumpRed } = this.state;
    client.send(JSON.stringify({
      type: 'move',
      clientID,
      opponentID,
      target,
      selected,
      turn,
      autoJumpBlack,
      autoJumpRed
    }));
  }
  sendJump(choice) {
    const { clientID, opponentID, turn } = this.state;
    client.send(JSON.stringify({
      type: 'jump',
      turn,
      clientID,
      opponentID,
      choice
    }));
  }

  acceptInvite() {
    const { clientID, opponentID } = this.state;
    client.send(JSON.stringify({
      type: 'accept',
      clientID,
      opponentID
    }));
  }

  declineInvite() {
    const { clientID, opponentID } = this.state;
    client.send(JSON.stringify({
      type: 'decline',
      clientID,
      opponentID
    }));
  }

  changeWelcomeView() {
    const { savedView } = this.state;
    this.setState({ savedView: !savedView });
  }

  settings() {
    const { settings } = this.state;
    this.setState({ settings: !settings });
  }

  saveGame() {
    const { saveView } = this.state;
    this.setState({ saveView: !saveView });
  }

  toggleJump() {
    const { nextJump } = this.state;
    this.setState({ nextJump: !nextJump });
  }

  skipJump(turn) {
    const { selected } = this.state;
    if (turn === 'red') {
      this.setState({ autoJumpRed: false});
      this.resetRedJump(selected);
      this.checkAutoJumpBlack();
    } else {
      this.setState({ autoJumpBlack: false});
      this.resetBlackJump(selected);
      this.checkAutoJumpRed();
    }
    this.setState({ turn: turn === 'red' ? 'black' : 'red' });
  }

  save(name) {
    const {
      playerOne, playerTwo, board, black, red,
      turn, autoJumpRed, autoJumpBlack, gameList, id,
    } = this.state;
    axios.post(`/api/games/${id}`, {
      board: {
        name: name === '' ? `${playerOne} v ${playerTwo}` : name,
        board,
        black,
        red,
        turn,
        autoJumpRed,
        autoJumpBlack,
        playerOne,
        playerTwo,
      },
      games: gameList,
    });
  }

  changeGame() {
    const { playerOne, id} = this.state;
    this.toggleModal();
    this.makeBoard('000000000000000000000000', playerOne, id);
  }

  toggleModal() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  changeVictory() {
    this.setState({ victory: '', victoryMessage: '' });
  }

  players(two) {
    this.setState({ playerTwo: two });
  }

  checkNextJumpRed(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'sendMove';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'sendMove';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'sendMove';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'sendMove';
    }
    this.setState({ selected: [rows, columns] });
    this.setState({ nextJump: true });
  }

  checkNextJumpBlack(rows, columns) {
    const { board } = this.state;
    board[rows][columns][1] = 'selectedPiece';
    if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
      board[rows - 2][columns - 2][1] = 'selectedSquare';
      board[rows - 2][columns - 2][2] = 'sendMove';
    }
    if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
      board[rows - 2][columns + 2][1] = 'selectedSquare';
      board[rows - 2][columns + 2][2] = 'sendMove';
    }
    if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
      board[rows + 2][columns - 2][1] = 'selectedSquare';
      board[rows + 2][columns - 2][2] = 'sendMove';
    }
    if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
      board[rows + 2][columns + 2][1] = 'selectedSquare';
      board[rows + 2][columns + 2][2] = 'sendMove';
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

  moveSelected(target, selected, turn, autoJumpBlack, autoJumpRed) {
    const { board, black, red, playerOne, playerTwo, sender } = this.state;
    const rows = Number(target.charAt(0));
    const columns = Number(target.charAt(1));
    const to = board[rows][columns];
    const from = board[selected[0]][selected[1]];
    let isDouble = false;
    board[rows][columns] = from;
    board[selected[0]][selected[1]] = to;
    board[rows][columns][1] = 'redSquare';
    board[selected[0]][selected[1]][2] = '';
    if (turn === 'black') {
      if (rows === 0) {
        board[rows][columns][0] = 'O';
      }
      if (autoJumpBlack) {
        const rowToDelete = (rows + selected[0]) / 2;
        const columnToDelete = (columns + selected[1]) / 2;
        board[rowToDelete][columnToDelete] = [null, 'redSquare', ''];
        this.setState((prevState) => ({ red: prevState.red - 1 }));
        this.resetBlackJump(selected);
        isDouble = this.jumpCheckBlack(rows, columns);
      } else {
        this.resetBlack(selected);
      }
      if (!isDouble) {
        this.setState({ turn: 'red', autoJumpBlack: false, moveSender: false });
        if (this.checkTurnRed()) {
          this.checkAutoJumpRed();
        } else {
          const message = red === 1 ? '' : 'No more turns!';
          const newVictory = sender ? playerTwo : playerOne;
          this.setState({ modal: true, savedView: false, victory: newVictory, victoryMessage: message });
        }
      }
    } else {
      if (rows === 7) {
        board[rows][columns][0] = 'X';
      }
      if (autoJumpRed) {
        const rowToDelete = (rows + selected[0]) / 2;
        const columnToDelete = (columns + selected[1]) / 2;
        board[rowToDelete][columnToDelete] = [null, 'redSquare', ''];
        this.setState((prevState) => ({ black: prevState.black - 1 }));
        this.resetRedJump(selected);
        isDouble = this.jumpCheckRed(rows, columns);
      } else {
        this.resetRed(selected);
      }
      if (!isDouble) {
        this.setState({ turn: 'black', autoJumpRed: false, moveSender: false });
        if (this.checkTurnBlack()) {
          this.checkAutoJumpBlack();
        } else {
          const message = black === 1 ? '' : 'No more turns!';
          const newVictory = sender ? playerOne : playerTwo;
          this.setState({ modal: true, savedView: false, victory: newVictory, victoryMessage: message });
        }
      }
    }
    this.playSound('https://tencentcheckers.s3.us-west-2.amazonaws.com/move.mp3');
  }

  resetRed(selected) {
    const { board } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 0 && selected[1] > 0 && board[selected[0] - 1][selected[1] - 1]
      !== undefined && board[selected[0] - 1][selected[1] - 1][0] === null) {
      board[selected[0] - 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] - 1][2] = '';
    }
    if (selected[0] > 0 && selected[1] < 7 && board[selected[0] - 1][selected[1] + 1]
      !== undefined && board[selected[0] - 1][selected[1] + 1][0] === null) {
      board[selected[0] - 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] + 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] > 0 && board[selected[0] + 1][selected[1] - 1]
      !== undefined && board[selected[0] + 1][selected[1] - 1][0] === null) {
      board[selected[0] + 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] - 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] < 7 && board[selected[0] + 1][selected[1] + 1]
      !== undefined && board[selected[0] + 1][selected[1] + 1][0] === null) {
      board[selected[0] + 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] + 1][2] = '';
    }
    this.setState({ selected: [], nextJump: false });
  }

  resetRedJump(selected) {
    const { board } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 1 && selected[1] > 1 && board[selected[0] - 2][selected[1] - 2]
      !== undefined && board[selected[0] - 2][selected[1] - 2][0] === null) {
      board[selected[0] - 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] - 2][2] = '';
    }
    if (selected[0] > 1 && selected[1] < 6 && board[selected[0] - 2][selected[1] + 2]
      !== undefined && board[selected[0] - 2][selected[1] + 2][0] === null) {
      board[selected[0] - 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] + 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] > 1 && board[selected[0] + 2][selected[1] - 2]
      !== undefined && board[selected[0] + 2][selected[1] - 2][0] === null) {
      board[selected[0] + 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] - 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] < 6 && board[selected[0] + 2][selected[1] + 2]
      !== undefined && board[selected[0] + 2][selected[1] + 2][0] === null) {
      board[selected[0] + 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] + 2][2] = '';
    }
    this.setState({ selected: [], nextJump: false });
  }

  selectRed(event) {
    const {
      board, selected, turn, autoJumpRed, sender
    } = this.state;
    if (turn === 'red' && sender) {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpRed) {
        if (selected.length > 0) {
          this.resetRedJump(selected);
        } else {
          board[rows][columns][1] = 'selectedPiece';
          if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns - 1][0] === 'o' || board[rows - 1][columns - 1][0] === 'O')) {
            board[rows - 2][columns - 2][1] = 'selectedSquare';
            board[rows - 2][columns - 2][2] = 'sendMove';
          }
          if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && board[rows][columns][0] === 'X' && (board[rows - 1][columns + 1][0] === 'o' || board[rows - 1][columns + 1][0] === 'O')) {
            board[rows - 2][columns + 2][1] = 'selectedSquare';
            board[rows - 2][columns + 2][2] = 'sendMove';
          }
          if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && (board[rows + 1][columns - 1][0] === 'o' || board[rows + 1][columns - 1][0] === 'O')) {
            board[rows + 2][columns - 2][1] = 'selectedSquare';
            board[rows + 2][columns - 2][2] = 'sendMove';
          }
          if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && (board[rows + 1][columns + 1][0] === 'o' || board[rows + 1][columns + 1][0] === 'O')) {
            board[rows + 2][columns + 2][1] = 'selectedSquare';
            board[rows + 2][columns + 2][2] = 'sendMove';
          }
          this.setState({ selected: [rows, columns] });
        }
      } else if (selected.length > 0) {
        this.resetRed(selected);
      } else {
        board[rows][columns][1] = 'selectedPiece';
        if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
          !== undefined && board[rows - 1][columns - 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns - 1][1] = 'selectedSquare';
          board[rows - 1][columns - 1][2] = 'sendMove';
        }
        if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
          !== undefined && board[rows - 1][columns + 1][0] === null && board[rows][columns][0] === 'X') {
          board[rows - 1][columns + 1][1] = 'selectedSquare';
          board[rows - 1][columns + 1][2] = 'sendMove';
        }
        if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
          !== undefined && board[rows + 1][columns - 1][0] === null) {
          board[rows + 1][columns - 1][1] = 'selectedSquare';
          board[rows + 1][columns - 1][2] = 'sendMove';
        }
        if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
          !== undefined && board[rows + 1][columns + 1][0] === null) {
          board[rows + 1][columns + 1][1] = 'selectedSquare';
          board[rows + 1][columns + 1][2] = 'sendMove';
        }
        this.setState({ selected: [rows, columns] });
      }
    }
  }

  resetBlack(selected) {
    const { board } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 0 && selected[1] > 0 && board[selected[0] - 1][selected[1] - 1]
      !== undefined && board[selected[0] - 1][selected[1] - 1][0] === null) {
      board[selected[0] - 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] - 1][2] = '';
    }
    if (selected[0] > 0 && selected[1] < 7 && board[selected[0] - 1][selected[1] + 1]
      !== undefined && board[selected[0] - 1][selected[1] + 1][0] === null) {
      board[selected[0] - 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] - 1][selected[1] + 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] > 0 && board[selected[0] + 1][selected[1] - 1]
      !== undefined && board[selected[0] + 1][selected[1] - 1][0] === null) {
      board[selected[0] + 1][selected[1] - 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] - 1][2] = '';
    }
    if (selected[0] < 7 && selected[1] < 7 && board[selected[0] + 1][selected[1] + 1]
      !== undefined && board[selected[0] + 1][selected[1] + 1][0] === null) {
      board[selected[0] + 1][selected[1] + 1][1] = 'redSquare';
      board[selected[0] + 1][selected[1] + 1][2] = '';
    }
    this.setState({ selected: [], nextJump: false });
  }

  resetBlackJump(selected) {
    const { board } = this.state;
    board[selected[0]][selected[1]][1] = 'redSquare';
    if (selected[0] > 1 && selected[1] > 1 && board[selected[0] - 2][selected[1] - 2]
      !== undefined && board[selected[0] - 2][selected[1] - 2][0] === null) {
      board[selected[0] - 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] - 2][2] = '';
    }
    if (selected[0] > 1 && selected[1] < 6 && board[selected[0] - 2][selected[1] + 2]
      !== undefined && board[selected[0] - 2][selected[1] + 2][0] === null) {
      board[selected[0] - 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] - 2][selected[1] + 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] > 1 && board[selected[0] + 2][selected[1] - 2]
      !== undefined && board[selected[0] + 2][selected[1] - 2][0] === null) {
      board[selected[0] + 2][selected[1] - 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] - 2][2] = '';
    }
    if (selected[0] < 6 && selected[1] < 6 && board[selected[0] + 2][selected[1] + 2]
      !== undefined && board[selected[0] + 2][selected[1] + 2][0] === null) {
      board[selected[0] + 2][selected[1] + 2][1] = 'redSquare';
      board[selected[0] + 2][selected[1] + 2][2] = '';
    }
    this.setState({ selected: [], nextJump: false });
  }

  selectBlack(event) {
    const {
      board, selected, turn, autoJumpBlack, sender
    } = this.state;
    if (turn === 'black' && !sender) {
      const target = event.target.getAttribute('name');
      const columns = Number(target.charAt(1));
      const rows = Number(target.charAt(0));
      if (autoJumpBlack) {
        if (selected.length > 0) {
          this.resetBlackJump(selected);
        } else {
          board[rows][columns][1] = 'selectedPiece';
          if (rows > 1 && columns > 1 && board[rows - 2][columns - 2] !== undefined && board[rows - 2][columns - 2][0] === null && (board[rows - 1][columns - 1][0] === 'x' || board[rows - 1][columns - 1][0] === 'X')) {
            board[rows - 2][columns - 2][1] = 'selectedSquare';
            board[rows - 2][columns - 2][2] = 'sendMove';
          }
          if (rows > 1 && columns < 6 && board[rows - 2][columns + 2] !== undefined && board[rows - 2][columns + 2][0] === null && (board[rows - 1][columns + 1][0] === 'x' || board[rows - 1][columns + 1][0] === 'X')) {
            board[rows - 2][columns + 2][1] = 'selectedSquare';
            board[rows - 2][columns + 2][2] = 'sendMove';
          }
          if (rows < 6 && columns > 1 && board[rows + 2][columns - 2] !== undefined && board[rows + 2][columns - 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns - 1][0] === 'x' || board[rows + 1][columns - 1][0] === 'X')) {
            board[rows + 2][columns - 2][1] = 'selectedSquare';
            board[rows + 2][columns - 2][2] = 'sendMove';
          }
          if (rows < 6 && columns < 6 && board[rows + 2][columns + 2] !== undefined && board[rows + 2][columns + 2][0] === null && board[rows][columns][0] === 'O' && (board[rows + 1][columns + 1][0] === 'x' || board[rows + 1][columns + 1][0] === 'X')) {
            board[rows + 2][columns + 2][1] = 'selectedSquare';
            board[rows + 2][columns + 2][2] = 'sendMove';
          }
          this.setState({ selected: [rows, columns] });
        }
      } else if (selected.length > 0) {
        this.resetBlack(selected);
      } else {
        board[rows][columns][1] = 'selectedPiece';
        if (rows > 0 && columns > 0 && board[rows - 1][columns - 1]
          !== undefined && board[rows - 1][columns - 1][0] === null) {
          board[rows - 1][columns - 1][1] = 'selectedSquare';
          board[rows - 1][columns - 1][2] = 'sendMove';
        }
        if (rows > 0 && columns < 7 && board[rows - 1][columns + 1]
          !== undefined && board[rows - 1][columns + 1][0] === null) {
          board[rows - 1][columns + 1][1] = 'selectedSquare';
          board[rows - 1][columns + 1][2] = 'sendMove';
        }
        if (rows < 7 && columns > 0 && board[rows + 1][columns - 1]
          !== undefined && board[rows + 1][columns - 1][0] === null && board[rows][columns][0] === 'O') {
          board[rows + 1][columns - 1][1] = 'selectedSquare';
          board[rows + 1][columns - 1][2] = 'sendMove';
        }
        if (rows < 7 && columns < 7 && board[rows + 1][columns + 1]
          !== undefined && board[rows + 1][columns + 1][0] === null && board[rows][columns][0] === 'O') {
          board[rows + 1][columns + 1][1] = 'selectedSquare';
          board[rows + 1][columns + 1][2] = 'sendMove';
        }
        this.setState({ selected: [rows, columns] });
      }
    }
  }

  render() {
    const { sender, board, turn, modal, gameList, playerOne, playerTwo, victory, settings, messages, messageCount,
      savedView, saveView, nextJump, victoryMessage, usersList, clientID, invitation, openMessager, moveSender, mobileBrowser,
    } = this.state;
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
          <h5>{turn === 'black' ? sender ? `Waiting on ${playerTwo}` : `Your turn ${playerOne}` : sender ? `Your turn ${playerOne}` : `Waiting on ${playerTwo}`}!</h5>
        </div>
        <div className={sender ? 'rotate' : ''}>
          {board.map((row, index) => (
            <div className="grid" key={`row ${Math.random() * 1000}`}>
              {row.map((square, i) => (
                <div
                  onClick={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'sendMove' ? this.sendMove : null}
                  onKeyPress={square[2] === 'selectRed' ? this.selectRed : square[2] === 'selectBlack' ? this.selectBlack : square[2] === 'sendMove' ? this.sendMove : null}
                  name={`${index}${i}`}
                  className={sender ? `${square[1]} rotate` : square[1]}
                  key={`square ${Math.random() * 1000}`}
                >
                  {whichPiece(square, index, i)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Messager
          openMessager={openMessager}
          mobileBrowser={mobileBrowser}
          messageCount={messageCount}
          messages={messages}
          playerOne={playerOne}
          playerTwo={playerTwo}
          toggleDrawer={this.toggleDrawer}
          sendMessage={this.sendMessage}
        />

        <Settings
          saveGame={this.saveGame}
          changeGame={this.changeGame}
          exit={this.settings}
          modal={modal}
          settings={settings}
        />

        <Save
          save={this.save}
          exit={this.saveGame}
          saveView={saveView}
        />

        <Jump
          nextJump={nextJump}
          moveSender={moveSender}
          playerTwo={playerTwo}
          sendJump={this.sendJump}
          toggleJump={this.toggleJump}
          skipJump={this.skipJump}
        />

        <Welcome
          username={playerOne}
          makeBoard={this.makeBoard}
          modal={modal}
          victory={victory}
          message={victoryMessage}
          savedView={savedView}
          usersList={usersList}
          clientID={clientID}
          changeView={this.changeWelcomeView}
          changeVictory={this.changeVictory}
          sendInvite={this.sendInvite}
          onClose={this.toggleModal}
          toggleInvitation={this.toggleInvitation}
          players={this.players}
          gameList={gameList}
        />

        <Invitation
          invitation={invitation}
          sender={sender}
          clientID={clientID}
          playerTwo={playerTwo}
          acceptInvite={this.acceptInvite}
          declineInvite={this.declineInvite}
        />

      </div>
    );
  }
}

export default App;
