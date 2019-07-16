
function offscreenCanvas(game, width, height) {
  var canvasEl = document.createElement("canvas");
  canvasEl.width = width;
  canvasEl.height = height;
	var osCtx = canvasEl.getContext("2d");

	var osCanvas = {
    canvas: canvasEl,
    ctx: osCtx,
  };
  osCanvas.toImage = function () {
    var image = new Image();
    image.src = canvasEl.toDataURL("image/png");
    return image;
  };
  return osCanvas;
}

function addImageToLibrary(imageLibrary, image, imageData) {
  imageLibrary[imageData.name] = {
    image: image,
    type: imageData.type,
  }
  if (imageData.type === 'tileset') {
    imageLibrary[imageData.name].tilesize = imageData.tilesize;
    imageLibrary[imageData.name].tilesX = imageData.tilesX;
    imageLibrary[imageData.name].tilesY = imageData.tilesY;
  }
}

function loadImages(images, imageLibrary, callback) {
  var loadCount = images.length;
  if (loadCount < 1) {
    callback();
    return;
  }
  images.forEach(function (imageData) {
    var loadedImage = new Image();
    loadedImage.onload = function () {
      addImageToLibrary(imageLibrary, loadedImage, imageData);
      loadCount = loadCount - 1;
      if (loadCount <= 0) {
        callback();
      }
    };
    loadedImage.src = imageData.url;
  });
}

function buildImageMaps(imageMaps, game) {
  var realCtx = game.ctx;

  imageMaps.forEach(function (mapData) {
    var width = mapData.tilesX * game.tilesize;
    var height = mapData.tilesY * game.tilesize;
    var osCanvas = offscreenCanvas(game, width, height);
    game.ctx = osCanvas.ctx;
    game.drawTileMap(mapData.imageName, mapData.tilemap, mapData.tilesX, mapData.tilesY, 0, 0);
    var image = osCanvas.toImage();
    addImageToLibrary(game.images, image, mapData);
  });

  game.ctx = realCtx;
}

function StartGameEngine(canvas, config, gameLoop) {
  // Create the main game object. This will have all the methods attached to it.
  var game = {
    tilesize: config.dimensions.tilesize,
    tilesX: config.dimensions.tilesX,
    tilesY: config.dimensions.tilesY,
    width: config.dimensions.tilesX * config.dimensions.tilesize,
    height: config.dimensions.tilesY * config.dimensions.tilesize,
    images: {},
    debug: false,
  };

  // Size the canvas
  canvas.width = game.width;
  canvas.height = game.height;

  // Get context we need to draw
  game.ctx = canvas.getContext("2d");

  // Create the methods that will be used
  game.drawImage = function(name, xPos, yPos) {
    var imageData = game.images[name];
    if (imageData === undefined) {
      throw new Error("Could not find image: " + name);
    }
    game.ctx.drawImage(imageData.image, xPos, yPos);
  };

  game.drawTileToPos = function (imageName, tileNumber, xPos, yPos) {
    var imageData = game.images[imageName];
    if (imageData === undefined) {
      throw new Error("Could not find image: " + imageName);
    }
    if (imageData.type !== 'tileset') {
      throw new Error("Image is not a tileset: " + imageName);
    }
    var sourceTilesize = imageData.tilesize;
    var xTile = (tileNumber % imageData.tilesX) * sourceTilesize;
    var yTile = Math.floor(tileNumber / imageData.tilesX) * sourceTilesize;
    var width = game.tilesize;
    var height = game.tilesize;
    game.ctx.drawImage(imageData.image,
      xTile, yTile, sourceTilesize, sourceTilesize,
      xPos, yPos, width, height,
    );
    if (game.debug) {
      game.ctx.strokeRect(xPos, yPos, width, height);
    }
  };

  game.drawTileToGrid = function (imageName, tileNumber, xTile, yTile) {
    var imageData = game.images[imageName];
    if (imageData === undefined) {
      throw new Error("Could not find image: " + imageName);
    }
    if (imageData.type !== 'tileset') {
      throw new Error("Image is not a tileset: " + imageName);
    }
    var sourceTilesize = imageData.tilesize;
    var xPos = (tileNumber % imageData.tilesX) * sourceTilesize;
    var yPos = Math.floor(tileNumber / imageData.tilesX) * sourceTilesize;
    game.ctx.drawImage(imageData.image,
      xPos, yPos, sourceTilesize, sourceTilesize,
      xTile * game.tilesize, yTile * game.tilesize, game.tilesize, game.tilesize,
    );
    if (game.debug) {
      game.ctx.strokeRect(xTile * game.tilesize, yTile * game.tilesize, game.tilesize, game.tilesize);
    }
  };

  game.drawTileMap = function (imageName, tilemap, tilesX, tilesY, xTile, yTile) {
    for (var y = 0; y < tilesY; y = y + 1) {
      for (var x = 0; x < tilesX; x = x + 1) {
        game.drawTileToGrid(imageName, tilemap[y][x], x + xTile, y + yTile);
      }
    }
  };

  game.colided = function (
    thing1X1, thing1Y1, thing1Width, thing1Height,
    thing2X1, thing2Y1, thing2Width, thing2Height
  ) {
    var thing1X2 = thing1X1 + thing1Width;
    var thing1Y2 = thing1Y1 + thing1Height;
    var thing2X2 = thing2X1 + thing2Width;
    var thing2Y2 = thing2Y1 + thing2Height;
    return (thing1X2 >= thing2X1 && thing1X1 <= thing2X2) &&
           (thing1Y2 >= thing2Y1 && thing1Y1 <= thing2Y2)
  }

  // Start loading the images
  loadImages(config.images, game.images, function () {
    buildImageMaps(config.imageMaps, game);
    gameLoop(game);
  });
}
