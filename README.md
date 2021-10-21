# Battleship

The game of Battleship written in vanilla JS.

🚢 [Live Preview]()

## Challenges Presented

There were a couple of key challenges that I set out to overcome while building this app.

### 1. Smart Enemy AI

I wanted the enemy to be able to make the same kind of decisions as the player would when presented with information about its attacks. There are a couple of layers to the enemy's decision making tree. The enemy attacks random cells on the board until it registers a hit. If there are any hits:

1. See if there are any adjacent hits (on ships that aren't sunk). If there are, treat it as a ship and continue guessing the next open cells along the axis to hit the rest of the ship until it's sunk.

2. If the hit is just a single hit, get a list of all adjacent empty cells and pick one to attack on the next turn.

3. If attacking a ship and the enemy gets to the end of each side without sinking it, determine that the registered hits are actually adjacent ships oriented perpendicularly. From this point, attack each ship along the opposite axis until each one is sunk.

### 2. Responsive UI

As in all of my apps, I set out to create a responsive layout that works on any screen size. This particular app switches from a 2-column to a 1-column layout (from display: flex to display: block) at a certain breakpoint, and makes use of a couple of min, max, and clamp functions to dynamically size the game container as well as font sizes.

### 3. Hit Ship Animation

I wanted to present a unique animation to the player for when they register a hit on an enemy ship. The look I chose is a card-flipping animation. I first added this animation to a class that was added to each cell that was hit. However, because the cells were hit at different intervals, the card flips occured out of sync with one another, which looked more like chaos than a clean bit of feedback.

To clean this up, I added a script that syncs the flip animations of every card on the board. To implement this, I created addToFlipCells() inside of animate.js. This script maintains a list of all of the flipping cards and performs a DOM reflow at a set interval (I chose 0.9 seconds) that restarts the animation for all cells at the same time. This script stops flipping cards at the end of the game.
