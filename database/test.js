const Board = require('./board.js');
const Games = require('./gamesList.js');
const Users = require('./users.js');

const board = {
  _id: '000000000000000000000000',
  name: 'newBoard',
  board: [
    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['x', 'redSquare', 'selectRed'],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      ['o', 'redSquare', 'selectBlack'],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],

    [[null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', '']],

    [[null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', ''],
      [null, 'blackSquare', ''],
      [null, 'redSquare', '']],
  ],
  black: 1,
  red: 1,
  turn: 'black',
  autoJumpRed: false,
  autoJumpBlack: true,
  playerOne: '',
  playerTwo: '',
};

const users = [
  {
    _id: '60676bd61029f4fc9cd84a00',
    id: '1617152727626',
    firstName: 'One',
    lastName: 'Player',
    email: 'one@player.com',
    userName: 'oneplayer',
    password: '$2b$10$B0/8p0/DSIsp9lQyj3A2Iu4/1ZUXaSuVLKiofsgBpWbKXjt3VmMB2',
  },
  {
    _id: '60676bd61029f4fc9cd84a01',
    id: '1617152727627',
    firstName: 'Two',
    lastName: 'Player',
    email: 'two@player.com',
    userName: 'twoplayer',
    password: '$2b$10$B0/8p0/DSIsp9lQyj3A2Iu4/1ZUXaSuVLKiofsgBpWbKXjt3VmMB2',
  },
  {
    _id: '60676bd61029f4fc9cd84a02',
    id: '1617152727628',
    firstName: 'Three',
    lastName: 'Player',
    email: 'three@player.com',
    userName: 'threeplayer',
    password: '$2b$10$B0/8p0/DSIsp9lQyj3A2Iu4/1ZUXaSuVLKiofsgBpWbKXjt3VmMB2',
  },
  {
    _id: '60676bd61029f4fc9cd84a03',
    id: '1617152727629',
    firstName: 'Four',
    lastName: 'Player',
    email: 'four@player.com',
    userName: 'fourplayer',
    password: '$2b$10$B0/8p0/DSIsp9lQyj3A2Iu4/1ZUXaSuVLKiofsgBpWbKXjt3VmMB2',
  },
  {
    _id: '60676bd61029f4fc9cd84a04',
    id: '1617152727630',
    firstName: 'Mike',
    lastName: 'Gunyan',
    email: 'mrgunyan@gmail.com',
    userName: 'mrgunyan',
    password: '$2b$10$jS/8ZzY/EsJiwjOysZiLxOH4ZiDUWUA/7Qtzbl6t.1MCoHnRLoDcC',
  },
  {
    _id: '60676bd61029f4fc9cd84a05',
    id: '1617152727631',
    firstName: 'Ayla',
    lastName: 'Gibson',
    email: 'hipchick1oh1@yahoo.com',
    userName: 'Funstuff69',
    password: '$2b$10$7MMO0nJbxdN5r2uRvOLs2OMIV3ghX9wNdkRxSK.HCiRIsG1CTmYuC',
  }
];

const games = {
  _id: '60676bd61029f4fc9cd84a00',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
  _id: '60676bd61029f4fc9cd84a01',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
  _id: '60676bd61029f4fc9cd84a02',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
  _id: '60676bd61029f4fc9cd84a03',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
  _id: '60676bd61029f4fc9cd84a04',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
  _id: '60676bd61029f4fc9cd84a05',
  games: [{
    name: 'Test',
    gameId: '111111111111111111111111',
  }],
};

const seed = () => {
  Users.create(users)
    .then(() => process.exit())
    .catch((err) => console.log(err));
  Board.create(board)
    .then(() => process.exit())
    .catch((err) => console.log(err));
  Games.create(games)
    .then(() => process.exit())
    .catch((err) => console.log(err));
};

seed();