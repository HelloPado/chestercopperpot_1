#!/bin/bash

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "Starting Chester Copperpot Adventure game server..."
    node launch-server.js
else
    echo "Node.js is not installed. Please install Node.js or use another method to launch the game."
    echo "See README.md for alternative launch methods."
    
    # Try to open the launch-game.html directly as a fallback
    echo "Attempting to open launch-game.html directly..."
    
    # Check which command to use based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open launch-game.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open launch-game.html
        else
            echo "Could not open the file automatically. Please open launch-game.html manually in your browser."
        fi
    else
        echo "Could not open the file automatically. Please open launch-game.html manually in your browser."
    fi
fi

# Keep the terminal open if launched by double-clicking
read -p "Press Enter to exit..." 