import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const ChooseLevel = ({
  player1,
  player2,
  mate1,
  mate2,
  closeModal,
}) => {
  const duoLevels = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('GameData')).default.levels.multiplayer);
  return (
    <div className="modal-wrapper" style={{ minHeight: '15vw' }}>
      <div className="modal-body">
        <img
          className="greycross"
          src="./assets/deletegrey.png"
          alt="cross"
          role="presentation"
          onClick={closeModal}
        />
        <h3 style={{ marginTop: '2.7vw', marginBottom: '1.5vw' }}>Choose your level</h3>
        {
          duoLevels.map((level, index) => (
            <Link
              to={{
                pathname: '/multiplayer',
                state: {
                  player1,
                  mate1,
                  player2,
                  mate2,
                  levelduo: level,
                },
              }}
              key={`link-${index + 1}`}
            >
              <button
                className="homeButton"
                style={{ marginRight: 5 }}
                type="button"
                key={`levelId-${index + 1}`}
                value={level}
              >
                {level}
              </button>
            </Link>
          ))
        }
      </div>
    </div>
  );
};
export default ChooseLevel;
