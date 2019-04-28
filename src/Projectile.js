import React from 'react';

function Projectile(projectile) {
  return (
    <div>
      <img
        alt={projectile}
        src={`./assets/projectiles/${projectile}.png`}
        className={projectile}
      />
    </div>
  );
}

export default Projectile;

// Effects for projectiles
// let projectileClassName;
// if (projectiles[rowIndex][colIndex] !== '000') {
//   if (parseInt(projectiles[rowIndex][colIndex], 10) === 400) {
//     projectileClassName = 'Fire';
//   } else if (parseInt(projectiles[rowIndex][colIndex], 10) === 401) {
//     projectileClassName = 'Lightning';
//   }
// }
// const {
//   img, posX, posY, pixelsPerTile, playerOpacity, playerFrozen, playerConfused, playerStunned,
// } = this.state;
//  Player CSS
// const projectileStyle = {
//   opacity: playerOpacity,
//   position: 'absolute',
//   zIndex: 3,
//   backgroundImage: `url(./assets/characters/${img}.png`,
//   backgroundSize: 'contain',
//   backgroundRepeat: 'no-repeat',
//   height: '2.5vw',
//   width: '2.5vw',
//   marginTop: '4.9vw',
//   marginLeft: '-10.035315vw',
//   transitionDuration: '500ms',
//   // To do: cleaner calculation
//   top: `${posY * pixelsPerTile}vw`,
//   left: `${11 + posX * pixelsPerTile}vw`,
/* projectiles[rowIndex][colIndex] !== '000'
? (
  <img
    alt={projectileClassName}
    src={`./assets/projectiles/${projectiles[rowIndex][colIndex]}.png`}
    className={projectileClassName}
  />
)
: null
*/
// };
