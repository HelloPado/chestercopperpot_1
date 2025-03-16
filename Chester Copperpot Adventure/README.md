# Chester Copperpot Adventure

A browser-based adventure game featuring Chester Copperpot, the treasure hunter from "The Goonies" who ventured into the caves before the kids did.

## Game Overview

In this game, you play as Chester Copperpot navigating through dangerous cave systems in search of One-Eyed Willy's treasure. Avoid traps, collect coins, and try to survive the perilous journey.

## How to Launch the Game

There are several ways to play the game:

### Method 1: Using the Launch HTML (Easiest)

1. Simply open the `launch-game.html` file in your web browser
2. Click the "Launch Game" button
3. The game will open in a new tab or in an iframe on the page

### Method 2: Using a Local Server (Recommended)

If you have Node.js installed:

1. Open a terminal/command prompt in the game directory
2. Run `node launch-server.js`
3. Open your browser and navigate to `http://localhost:3000`

If you don't have Node.js, you can use any other local server:

- Python: `python -m http.server` (Python 3) or `python -m SimpleHTTPServer` (Python 2)
- PHP: `php -S localhost:8000`
- Or use extensions like "Live Server" in VS Code

### Method 3: Direct File Access

You can also open the `index.html` file directly in your browser, but some features might not work correctly due to browser security restrictions.

## Game Controls

- **Arrow Keys**: Move Chester left/right
- **Up Arrow / Space**: Jump
- **Down Arrow**: Duck (in some levels)

## Game Features

- Multiple levels with increasing difficulty
- Collectible coins and treasures
- Various hazards including bats, spikes, and tripwires
- The infamous boulder trap that sealed Chester's fate
- Animated SVG graphics

## Technical Notes

- The game uses SVG graphics for all sprites
- Sound files are currently placeholders (.txt files) and need to be replaced with actual audio files
- The game is built with vanilla JavaScript and HTML5 Canvas

## File Structure

- `index.html`: Main game file
- `style.css`: Game styling
- `js/`: JavaScript files
  - `game.js`: Main game logic
  - `sprites.js`: Sprite handling
  - `levels.js`: Level definitions
- `assets/`: Game assets
  - `images/svg/`: SVG sprites
  - `sounds/`: Sound placeholders

## Credits

This game was created as a tribute to "The Goonies" and the character of Chester Copperpot. All graphics and code were created specifically for this project.

## License

This project is for educational purposes only. "The Goonies" and its characters are property of Warner Bros. 

Server running at http://localhost:3000/
Open your browser and navigate to http://localhost:3000/ to play the game 