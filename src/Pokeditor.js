import React, { Component } from 'react';
import PokeditorChooseTile from './PokeditorChooseTile';
import PokeditorChooseItem from './PokeditorChooseItem';
import PokeditorChooseStartingPoint from './PokeditorChooseStartingPoint';
import PokeditorChooseSize from './PokeditorChooseSize';
import PokeditorBoard from './PokeditorBoard';
import PokeditorMatrix from './PokeditorMatrix';
import './Pokeditor.css';

class Pokeditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // TO DO : add a way to modify/write a json file
      // TO DO: select/edit existing levels
      // TO DO: save the level (local storage?)
      level: [
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "502", "503", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "505", "504", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"],
        ["008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008", "008"]
      ],
      items: [
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"],
        ["000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"]
      ],
      selectedTile: null,
      selectedItem: null,
      playerOneX: null,
      playerOneY: null,
      playerTwoX: null,
      playerTwoY: null,
      timer: 60,
    }
    this.changeTile = this.changeTile.bind(this)
  }
  //    TO DO : add a way to get file list from assets/tiles folder...
  //    ADD YOUR TILES HERE
  tiles = ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "010", "015", "016",
    "017", "018", "018", "019", "020", "021", "022", "023", "024", "025", "026", "027",
    "028", "029", "030", "031", "032", "033", "034", "035", "036", "037", "038", "039",
    "040", "041", "042", "043", "044", "045", "046", "047", "048", "049", "050", "051",
    "052", "053", "054", "055", "056", "057", "058", "059", "500", "501", "502", "503",
    "504", "505", "510", "511", "512", "513", "514", "515", "518", "519", "520", "521", "522", "523",
    "524", "525", "526"]
  //    ADD YOUR ITEMS HERE
  items = ["000", "001", "002", "700", "701", "800", "801", "900"]

  selectTile = (event) => {
    this.setState({ selectedTile: event.target.value, selectedItem: null })
  }

  selectItem = (event) => {
    this.setState({ selectedItem: event.target.value, selectedTile: null })
  }

  changeTile = (rowIndex, colIndex) => () => {
    if (this.state.selectedTile !== null) {
      if (this.state.selectedTile === 'p1') {
        this.setState({ playerOneX: rowIndex, playerOneY: colIndex })
        return
      }
      if (this.state.selectedTile === 'p2') {
        this.setState({ playerTwoX: rowIndex, playerTwoY: colIndex })
        return
      }
      let level = [...this.state.level]
      level[rowIndex][colIndex] = this.state.selectedTile
      this.setState({ level })
    }
    if (this.state.selectedItem !== null) {
      let items = [...this.state.items]
      items[rowIndex][colIndex] = this.state.selectedItem
      this.setState({ items })
    }
  }

  changeSize = (x, y) => {
    const newLevel = [];
    for (let i = 0; i < y; i += 1){
      newLevel.push([])
      for (let j = 0; j < x; j += 1){
        newLevel[i].push('008')
      }
    }
    const newItemMatrix = [];
    for (let i = 0; i < y; i += 1){
      newItemMatrix.push([])
      for (let j = 0; j < x; j += 1){
        newItemMatrix[i].push('000')
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
    })
  }

  render() {
    const { level, items, playerOneX, playerOneY, playerTwoX, playerTwoY, timer } = this.state;
    return (
      <div className="Pokeditor">
        <h1>Pokeditor</h1>
        <PokeditorChooseSize changeSize={this.changeSize} x="10" y="10"/>
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
        <PokeditorMatrix
          level={level}
          items={items}
          playerOneX={playerOneX}
          playerOneY={playerOneY}
          playerTwoX={playerTwoX}
          playerTwoY={playerTwoY}
          timer={timer}
        />
      </div>
    )
  }
}

export default Pokeditor;
