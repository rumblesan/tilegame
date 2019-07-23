// Game logic goes here

var state = {
  character: {
    xPos: 100,
    yPos: 100,
    width: 32,
    height: 32,
    direction: 'right',
    speed: 4,
  },
  treasures: [
    { tile: 0, xPos: 100, yPos: 200, value: 1, collected: false },
    { tile: 3, xPos: 200, yPos: 150, value: 5, collected: false },
    { tile: 6, xPos: 500, yPos: 300, value: 10, collected: false },
    { tile: 4, xPos: 400, yPos: 400, value: 7, collected: false },
  ],
  score: 0,
};

var canvas = document.querySelector("canvas");

function runGame(game) {
  console.log(game);

  game.ctx.font = "30px Verdana";

  function animate() {
    game.drawTileMap("terrain", forestTilemap, 20, 15, 0, 0);

    game.drawTileMap("terrain", treeTilemap, 4, 4, 10, 4);

    var characterTile = 0;
    if (state.character.direction === 'left') {
      characterTile = 1;
    }
    game.drawTileToPos("character", characterTile, state.character.xPos, state.character.yPos);

    game.drawTileToPos("terrain", 69, 300, 240);

    for (var i = 0; i < state.treasures.length; i = i + 1) {
      var t = state.treasures[i];
      if (!t.collected) {
        game.drawTileToPos("treasure", t.tile, t.xPos, t.yPos);
      }
    }

    for (var i = 0; i < state.treasures.length; i = i + 1) {
      var t = state.treasures[i];
      if (!t.collected && game.collided(
        state.character.xPos, state.character.yPos, 32, 32,
        t.xPos, t.yPos, 32, 32
      )) {
        t.collected = true;
        state.score = state.score + t.value;
      }
    }

    game.ctx.fillText(state.score, 550, 35);

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
