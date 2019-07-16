# Getting Started

Have a look at the *js/main.js* file. The `runGame` function is what will get called once the game engine has started.

We need to define all our logic inside this function, including any other functions we'll want to use that interact with the `game` object.



The animate function has already been defined, though there's nothing in it yet. This is what will get run every frame, though we need to create the timer to make that happen.

The following might be useful for that.
```
setInterval(functionName, milliseconds);
// or
setTimeout(functionName, milliseconds);
```



The first thing is probably to draw the character. The library documents say we can use the `drawTileToPos` method on the `game` object to draw the tile we want anywhere on the canvas. Open up the *character.png* file in the *images* folder to have a look at the character tiles.

```
game.drawTileToPos("character", which tile?, xPosition, yPosition);
```



If we want the user to control the character, then we're going to need to have them change the position of the character over time. And to do that we're going to need to save the character position in the state somewhere.
Once we've done that, we can create event listeners that will check for the direction keys being pressed, and then change the position in the state that we've saved for the character.
If the animate function is being run every frame, and that's using the position saved in the state to draw the character, then the character will move each frame.

This code may be helpful
```
window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    console.log('The up arrow has been pressed');
  }
});
```


Once we have the character moving then we need to clear the screen each frame. There is already a *forest* image available that is the same size as the canvas, so you can use that to redraw each frame.

