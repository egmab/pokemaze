import React, { Component } from 'react';

class PokeditorMatrix extends Component {
  render() {
    const {
      level, items, playerOneX, playerOneY, playerTwoX, playerTwoY, timer,
    } = this.props;
    return (
      <div>
      <p style={{ textDecoration: "underline" }}>Tiles matrix :</p>
      <div style={{ fontSize: "0.8em", lineHeight: "0.3em" }}>
        {
          level.map((row, rowIndex) => (
            <p key={rowIndex}>
              {rowIndex === 0 && "["}[
                {row.map((tileId, colIndex) =>
                <span key={colIndex}>
                  "{tileId}"
                    {colIndex < level[rowIndex].length - 1 && ","}
                </span>
              )}
              {rowIndex < level.length - 1 ? "]," : "]]"}
            </p>
          ))
        }
      </div>
      <p style={{ textDecoration: "underline" }}>Items matrix :</p>
      <div style={{ fontSize: "0.8em", lineHeight: "0.3em" }}>
        {
          items.map((row, rowIndex) => (
            <p key={rowIndex}>
              {rowIndex === 0 && "["}[
                {row.map((tileId, colIndex) =>
                <span key={colIndex}>
                  "{tileId}"
                    {colIndex < items[rowIndex].length - 1 && ","}
                </span>
              )}
              {rowIndex < items.length - 1 ? "]," : "]]"}
            </p>
          ))
        }
      </div>
      <p style={{ textDecoration: "underline" }}>Players starting coordinates :</p>
      <p style={{ fontSize: "0.9em", lineHeight: "0.3em" }}>Player 1: {playerOneX}, {playerOneY}</p>
      <p style={{ fontSize: "0.9em", lineHeight: "0.3em" }}>Player 2: {playerTwoX}, {playerTwoY}</p>
      <p style={{ textDecoration: "underline" }}>Timer : {timer}</p>
    </div>
    )
  }
}

export default PokeditorMatrix;