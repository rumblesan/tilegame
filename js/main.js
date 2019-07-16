// Game logic goes here

var state = {
  character: {
    xPos: 100,
    yPos: 100,
    direction: 'right',
    speed: 4,
  },
};

var canvas = document.querySelector("canvas");

function runGame(game) {
  console.log(game);

  function animate() {
    game.drawImage("forest", 0, 0);

    game.drawImage("tree", 400, 200);
    var characterTile = 0;
    if (state.character.direction === 'left') {
      characterTile = 3;
    }

    game.drawTileToPos("character", characterTile, state.character.xPos, state.character.yPos);

    game.drawTileToPos("terrain", 69, 300, 240);

    game.drawTileToPos("treasure", 4, 100, 240);
    setTimeout(function () {
      requestAnimationFrame(animate)
    }, 30);
  }
  animate();
}

StartGameEngine(canvas, config, runGame);

window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    state.character.yPos = state.character.yPos - state.character.speed;
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    state.character.yPos = state.character.yPos + state.character.speed;
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    state.character.direction = 'left';
    state.character.xPos = state.character.xPos - state.character.speed;
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    state.character.direction = 'right';
    state.character.xPos = state.character.xPos + state.character.speed;
  }
});
