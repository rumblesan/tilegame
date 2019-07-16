# Simple Tiled Game Engine

A tiny game engine for making tiled games on a canvas


## Starting

To start the engine, call the `StartGameEngine` function. This takes the canvas element it will draw to, an object containing all the configuration information, and a function that will be called once everything is ready.

The callback function will be given a Game object with all the information about the game engine, as well as the methods to use to draw to the canvas.


## Configuration

The configuration object is responsible for three things :-

* Defining the dimensions of the game grid.
* Listing the images that need to be loaded and information about them.
* Listing the imageMaps that need to be built and saved as images.


## Game Methods

### Drawing

There are four methods on the Game object that can be used for drawing to the canvas.

#### drawImage

Takes the following arguments :-
* The name of an image
* An X position
* A Y position

Draws the named image onto the canvas with the top left point at the X/Y position.
The name can either be an image name directly, or the name of an image map.

#### drawTileToPos

Takes the following arguments :-
* The name of an tile-set image
* An X position
* A Y position

Draws the chosen tile from the tile-set onto the canvas with the top left point at the X/Y grid position.
The name must be an image with the `'tileset'` type set in the configuration.

#### drawTileToGrid

Takes the following arguments :-
* The name of a tile-set
* An X grid position
* A Y grid position

Draws the chosen tile from the tile-set onto the canvas in the grid position specified by the X and Y values.
The name must be an image with the `'tileset'` type set in the configuration.

#### drawTileMap

Takes the following arguments :-
* The name of a tile-set
* A tile mapping
* The number of tiles wide the mapping is
* The number of tiles high the mapping is
* An X grid position
* A Y grid position

Iterates over the tile mapping, drawing the tiles in the appropriate layout, with the top left tile at the X/Y grid position.
The name must be an image with the `'tileset'` type set in the configuration.

### Collision detection

There is a helper method that can be used to work out when two boxes are colliding.

#### collided

Takes the following arguments :-
* The X position of object 1
* The Y position of object 1
* The width of object 1
* The height of object 1
* The X position of object 2
* The Y position of object 2
* The width of object 2
* The height of object 2

Returns true if the squares are colliding, and false if they're not.


## Contact

Drop me an email at guy@rumblesan.com


## License

All code under BSD License.

The *terrain.png* sprite sheet by [Michele "Buch" Bucelli](https://opengameart.org/users/buch)
The *character.png* sprite sheet by [Elthen](https://www.patreon.com/elthen)
The *loot.png* sprite sheet by [Bonsaiheldin](http://bonsaiheld.org)

