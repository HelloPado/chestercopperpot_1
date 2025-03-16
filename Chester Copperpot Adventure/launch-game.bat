@echo off
echo Chester Copperpot Adventure Game Launcher
echo ========================================

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Starting Chester Copperpot Adventure game server...
    node launch-server.js
) else (
    echo Node.js is not installed. Please install Node.js or use another method to launch the game.
    echo See README.md for alternative launch methods.
    
    echo Attempting to open launch-game.html directly...
    start launch-game.html
    
    echo If the browser doesn't open automatically, please open launch-game.html manually.
)

:: Keep the window open
pause 