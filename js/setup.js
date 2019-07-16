
var forestTilemap = [
 [  0,  1,  2,  3,  1,  2,  3,  1,  4,  3,  2,  1,  2,  3,  1,  2,  3,  1,  5,150,],
 [ 24,100,100,100,100,100,100,100,100,100, 28,100,100,100,100,100,100,100, 77,150,],
 [ 24,100, 27,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 29,150,],
 [ 48,100,100,100,100,100,100,100,100,  7,  8,  9,  8,  9, 12,100,100,100, 49,  5,],
 [ 72,100,100, 25,124, 26,100,100,100, 31, 34, 34, 34, 34, 60,100,100,100,100, 53,],
 [ 24,100,100, 77, 30, 72,100,100,  7, 57, 83, 34, 34, 34, 36,100,100,100,100, 29,],
 [ 24,100,100, 49,  5, 48,100,100, 55, 34, 34, 34, 34, 82, 84,100,100,100,100, 77,],
 [ 48,100,100,100, 53, 24,100,100,127,130,129,128,129, 33, 36,100,100, 51,100, 53,],
 [ 24,100,100,100, 49, 50,100, 27,100,100,100,100,100,127,132,100,100,100,100, 29,],
 [ 48, 27,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100, 77,],
 [ 24,100,100,100,100,100,100,100,100, 25,123,122,124, 26,100,100,100,100,100, 29,],
 [ 72,100, 28,100,100,100,100,100,100, 49,  4,  5, 54, 48,100, 27,100,100,100, 77,],
 [ 48,100,100,100, 28,100,100,100,100,100,100, 77,150, 72,100,100,100,100,100, 53,],
 [ 24,100,100,100,100,100,100,100,100,100,100, 29,150, 24,100,100,100,100,100, 29,],
 [120,121,122,123,121,122,123,121,124,123,122,125,150,120,121,122,123,121,123,125,],
];

var treeTilemap = [
  [159, 160, 161, 162],
  [183, 184, 185, 186],
  [207, 208, 209, 210],
  [235, 232, 233, 234],
];

var coinsTilemap = [
  [],
];

var config = {
  dimensions: {
    tilesX: 20,
    tilesY: 15,
    tilesize: 32,
  },
  images: [
    { name: 'character', url: 'images/character.png', type: 'tileset', tilesize: 20, tilesX: 13, tilesY:16},
    { name: 'terrain', url: 'images/terrain.png', type: 'tileset', tilesize: 16, tilesX: 24, tilesY:12},
    { name: 'treasure', url: 'images/treasure.png', type: 'tileset', tilesize: 16, tilesX: 4, tilesY:4},
  ],
  imageMaps: [
    { name: 'forest', tilemap: forestTilemap, imageName: 'terrain', type: 'full', tilesX: 20, tilesY: 15},
    { name: 'tree', tilemap: treeTilemap, imageName: 'terrain', type: 'full', tilesX: 4, tilesY: 4},
    { name: 'coins', tilemap: treeTilemap, imageName: 'terrain', type: 'full', tilesX: 4, tilesY: 4},
  ],
};

