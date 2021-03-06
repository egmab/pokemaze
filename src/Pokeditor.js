import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeditorChooseTile from './PokeditorChooseTile';
import PokeditorChooseItem from './PokeditorChooseItem';
import PokeditorChooseStartingPoint from './PokeditorChooseStartingPoint';
import PokeditorChooseSize from './PokeditorChooseSize';
import PokeditorChooseTimer from './PokeditorChooseTimer';
// import PokeditorChooseGameMode from './PokeditorChooseGameMode';
import PokeditorSaveLevel from './PokeditorSaveLevel';
import PokeditorLoadDeleteLevel from './PokeditorLoadDeleteLevel';
import PokeditorBoard from './PokeditorBoard';
// import PokeditorMatrix from './PokeditorMatrix';
import './Pokeditor.css';

class Pokeditor extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('PokemazeCustomLevels')) {
      localStorage.setItem('PokemazeCustomLevels', JSON.stringify({}));
    }
    const customLevels = Object.keys(JSON.parse(localStorage.getItem('PokemazeCustomLevels')));
    // TO DO : add a way to modify/write a json file
    // TO DO : select/edit existing levels
    // TO DO : add a way to get file list from assets/tiles folder...
    // TO DO : select type of key
    //    ADD YOUR TILES HERE
    this.tiles = ['000', '001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '015', '016',
      '017', '018', '019', '020', '021', '023', '024', '025', '026', '027',
      '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039',
      '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', '050', '051',
      '052', '053', '054', '055', '056', '057', '058', '059', '060', '061', '062', '063',
      '064', '065', '066', '067', '068', '069', '070', '071', '072', '073', '074', '075',
      '405', '500', '501', '502', '503',
      '504', '505', '510', '511', '512', '513', '514', '515', '518', '519', '520', '521',
      '522', '523', '524', '525', '526', '527', '529', '900'];
    //    ADD YOUR ITEMS HERE
    this.items = ['000', '001', '002', '700', '701', '702', '703', '704', '705', '800', '801',
      '802', '803', '804', '805', '900'];
    this.state = {
      // gameMode: 'Solo',
      customLevels,
      level: [
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
        ['008', '008', '008', '008', '008', '008', '008', '008', '008', '008'],
      ],
      items: [
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
        ['000', '000', '000', '000', '000', '000', '000', '000', '000', '000'],
      ],
      selectedTile: null,
      selectedItem: null,
      playerOneX: null,
      playerOneY: null,
      playerTwoX: null,
      playerTwoY: null,
      timer: 60,
    };
  }

  selectTile = (event) => {
    this.setState({ selectedTile: event.target.value, selectedItem: null });
  }

  selectItem = (event) => {
    this.setState({ selectedItem: event.target.value, selectedTile: null });
  }

  saveLevel = (levelName) => {
    const {
      level, items, playerOneX, playerOneY, playerTwoX, playerTwoY, timer, // gameMode,
    } = this.state;
    const currentData = JSON.parse(localStorage.getItem('PokemazeCustomLevels'));
    const currentLevel = {
      tiles: level,
      items,
      startingPositions: {
        player1: {
          x: playerOneY,
          y: playerOneX,
        },
        player2: {
          x: playerTwoY,
          y: playerTwoX,
        },
      },
      timer,
      typeOfKey: '002',
      isTuto: true,
    };
    // currentData[gameMode][levelName] = currentLevel;
    currentData[levelName] = currentLevel;
    localStorage.setItem('PokemazeCustomLevels', JSON.stringify(currentData));
    // Refresh render for load/delete levels
    const customLevels = Object.keys(JSON.parse(localStorage.getItem('PokemazeCustomLevels')));
    this.setState({ customLevels });
  }

  loadLevel = (levelName) => {
    if (levelName && levelName !== undefined) {
      const levelsList = JSON.parse(localStorage.getItem('PokemazeCustomLevels'));
      this.setState({
        level: levelsList[levelName].tiles,
        items: levelsList[levelName].items,
        playerOneX: levelsList[levelName].startingPositions.player1.y,
        playerOneY: levelsList[levelName].startingPositions.player1.x,
        playerTwoX: levelsList[levelName].startingPositions.player2.y,
        playerTwoY: levelsList[levelName].startingPositions.player2.x,
        timer: levelsList[levelName].timer,
      });
    }
  }

  deleteLevel = (levelName) => {
    const levelsList = JSON.parse(localStorage.getItem('PokemazeCustomLevels'));
    delete levelsList[levelName];
    localStorage.setItem('PokemazeCustomLevels', JSON.stringify(levelsList));
    const customLevels = Object.keys(JSON.parse(localStorage.getItem('PokemazeCustomLevels')));
    this.setState({ customLevels });
  }

  // changeGameMode = (gameMode) => {
  //   this.setState({ gameMode });
  // }

  changeTile = (rowIndex, colIndex) => () => {
    const { selectedTile, selectedItem } = this.state;
    if (selectedTile !== null) {
      if (selectedTile === 'p1') {
        this.setState({ playerOneX: rowIndex, playerOneY: colIndex });
        return;
      }
      if (selectedTile === 'p2') {
        this.setState({ playerTwoX: rowIndex, playerTwoY: colIndex });
        return;
      }
      const { level } = this.state;
      level[rowIndex][colIndex] = selectedTile;
      this.setState({ level });
    }
    if (selectedItem !== null) {
      const { items } = this.state;
      items[rowIndex][colIndex] = selectedItem;
      this.setState({ items });
    }
  }

  changeTimer = (newTimer) => {
    this.setState({ timer: newTimer });
  }

  changeSize = (x, y) => {
    const newLevel = [];
    for (let i = 0; i < y; i += 1) {
      newLevel.push([]);
      for (let j = 0; j < x; j += 1) {
        newLevel[i].push('008');
      }
    }
    const newItemMatrix = [];
    for (let i = 0; i < y; i += 1) {
      newItemMatrix.push([]);
      for (let j = 0; j < x; j += 1) {
        newItemMatrix[i].push('000');
      }
    }
    this.setState({
      level: newLevel,
      items: newItemMatrix,
      playerOneX: null,
      playerOneY: null,
      playerTwoX: null,
      playerTwoY: null,
      timer: 60,
    });
  }

  render() {
    const {
      level, items, playerOneX, playerOneY, playerTwoX, playerTwoY, customLevels,
      // gameMode, timer,
    } = this.state;
    return (
      <div className="Pokeditor">
        <h1>Pokeditor</h1>
        <div className="menu">
          <Link to="/">
            <button
              className="backButton"
              type="button"
              size="lg"
              style={{ marginRight: 100 }}
            >
              Back to menu
            </button>
          </Link>
        </div>
        <PokeditorChooseSize changeSize={this.changeSize} />
        {/* <PokeditorChooseGameMode changeGameMode={this.changeGameMode} /> */}
        <PokeditorLoadDeleteLevel
          loadLevel={this.loadLevel}
          deleteLevel={this.deleteLevel}
          customLevels={customLevels}
        />
        <PokeditorSaveLevel saveLevel={this.saveLevel} />
        <PokeditorChooseTimer changeTimer={this.changeTimer} />
        <PokeditorChooseTile tiles={this.tiles} selectTile={this.selectTile} />
        <PokeditorChooseItem items={this.items} selectItem={this.selectItem} />
        <PokeditorChooseStartingPoint selectTile={this.selectTile} />
        <PokeditorBoard
          level={level}
          items={items}
          changeTile={this.changeTile}
          playerOneX={playerOneX}
          playerOneY={playerOneY}
          playerTwoX={playerTwoX}
          playerTwoY={playerTwoY}
        />
        {/* <PokeditorMatrix
          level={level}
          items={items}
          playerOneX={playerOneX}
          playerOneY={playerOneY}
          playerTwoX={playerTwoX}
          playerTwoY={playerTwoY}
          timer={timer}
          gameMode={gameMode}
        /> */}
      </div>
    );
  }
}

export default Pokeditor;
