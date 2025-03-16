// Chester Copperpot Adventure - Main Game Logic

// Game canvas setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match container
function resizeCanvas() {
    const container = document.getElementById('game-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// Game state
const game = {
    isRunning: false,
    score: 0,
    lives: 3,
    currentLevel: 0,
    player: null,
    entities: [],
    keys: {}
};

// Initialize game
function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Set up input handlers
    window.addEventListener('keydown', (e) => {
        game.keys[e.key] = true;
    });
    
    window.addEventListener('keyup', (e) => {
        game.keys[e.key] = false;
    });
    
    // Create player
    game.player = new Player(canvas.width / 2, canvas.height / 2);
    
    // Load first level
    loadLevel(game.currentLevel);
    
    // Start game loop
    game.isRunning = true;
    requestAnimationFrame(gameLoop);
}

// Main game loop
function gameLoop(timestamp) {
    if (!game.isRunning) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update game state
    update();
    
    // Render game
    render();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Update player
    game.player.update(game.keys);
    
    // Update all entities
    game.entities.forEach(entity => entity.update());
    
    // Check collisions
    checkCollisions();
    
    // Update UI
    document.getElementById('score-value').textContent = game.score;
    document.getElementById('lives-value').textContent = game.lives;
}

// Render game objects
function render() {
    // Draw background
    drawBackground();
    
    // Draw all entities
    game.entities.forEach(entity => entity.render(ctx));
    
    // Draw player
    game.player.render(ctx);
}

// Check for collisions between game objects
function checkCollisions() {
    // Implement collision detection logic here
}

// Draw level background
function drawBackground() {
    // Implement background drawing logic here
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Load a level
function loadLevel(levelIndex) {
    // Clear existing entities
    game.entities = [];
    
    // Get level data
    const levelData = levels[levelIndex];
    
    if (!levelData) {
        console.error('Level not found:', levelIndex);
        return;
    }
    
    // Create entities from level data
    levelData.entities.forEach(entityData => {
        // Create entity based on type
        let entity;
        switch (entityData.type) {
            case 'coin':
                entity = new Coin(entityData.x, entityData.y);
                break;
            case 'enemy':
                entity = new Enemy(entityData.x, entityData.y, entityData.speed);
                break;
            // Add more entity types as needed
        }
        
        if (entity) {
            game.entities.push(entity);
        }
    });
}

// Start the game when the page loads
window.addEventListener('load', init); 