// Level designs and configurations
const levelDesigns = {
    1: {
      name: "Underground Tunnel",
      background: 0,
      platformColor: "#4E342E",
      dangerTypes: ["bat", "water"],
      decorationTypes: ["lantern", "stalagmite"],
      playerStart: { x: 50, y: 300 },
      exitPosition: { x: 1200, y: 300 }
    },
    2: {
      name: "Cave Platformer",
      background: 1,
      platformColor: "#5D4037",
      dangerTypes: ["bat", "water", "spike"],
      decorationTypes: ["lantern", "stalagmite", "stalactite"],
      playerStart: { x: 50, y: 200 },
      exitPosition: { x: 1200, y: 200 }
    },
    3: {
      name: "Boulder Trap",
      background: 2,
      platformColor: "#3E2723",
      dangerTypes: ["bat", "spike", "tripwire"],
      decorationTypes: ["lantern", "stalagmite", "stalactite", "skeleton"],
      playerStart: { x: 50, y: 300 },
      keyPosition: { x: 1100, y: 300 }
    }
  };
  
  // Function to create level based on level number
  function createLevel(levelNum, gameWidth, gameHeight, levelWidth) {
    const design = levelDesigns[levelNum];
    const level = {
      name: design.name,
      background: design.background,
      platformColor: design.platformColor,
      platforms: [],
      coins: [],
      dangers: [],
      decorations: [],
      playerStart: design.playerStart,
      exitPosition: design.exitPosition
    };
    
    // Base floor platform
    level.platforms.push(createPlatform(0, gameHeight - 40, levelWidth, 40));
    
    // Add level-specific platforms
    if (levelNum === 1) {
      // Tunnel platforms
      level.platforms.push(createPlatform(200, 320, 200, 20));
      level.platforms.push(createPlatform(450, 270, 150, 20));
      level.platforms.push(createPlatform(650, 320, 180, 20));
      level.platforms.push(createPlatform(880, 260, 200, 20));
      level.platforms.push(createPlatform(1150, 320, 130, 20));
    } else if (levelNum === 2) {
      // Platformer level
      level.platforms.push(createPlatform(150, 340, 100, 20));
      level.platforms.push(createPlatform(300, 280, 120, 20));
      level.platforms.push(createPlatform(450, 220, 100, 20));
      level.platforms.push(createPlatform(600, 260, 80, 20));
      level.platforms.push(createPlatform(720, 320, 120, 20));
      level.platforms.push(createPlatform(880, 260, 100, 20));
      level.platforms.push(createPlatform(1030, 200, 80, 20));
      level.platforms.push(createPlatform(1150, 280, 130, 20));
    } else if (levelNum === 3) {
      // Boulder trap level
      level.platforms.push(createPlatform(150, 340, 150, 20));
      level.platforms.push(createPlatform(350, 300, 120, 20));
      level.platforms.push(createPlatform(520, 340, 100, 20));
      level.platforms.push(createPlatform(670, 280, 160, 20));
      level.platforms.push(createPlatform(880, 340, 130, 20));
      level.platforms.push(createPlatform(1050, 340, 200, 20));
      
      // Create the skeleton key for the final level
      level.skeletonKey = {
        x: design.keyPosition.x,
        y: design.keyPosition.y - 10,
        width: 40,
        height: 80,
        collected: false
      };
      
      // Create the boulder that will fall
      level.boulder = {
        x: design.keyPosition.x,
        y: -100, // Start off-screen
        width: 64,
        height: 64,
        velocityY: 0,
        falling: false
      };
    }
    
    // Create coins
    for (let i = 0; i < 15 + levelNum * 5; i++) {
      let x = random(100, levelWidth - 100);
      let y = random(100, gameHeight - 100);
      
      // Make sure coins are accessible
      let accessible = false;
      for (let platform of level.platforms) {
        if (x >= platform.x && x <= platform.x + platform.width && 
            y >= platform.y - 50 && y <= platform.y - 20) {
          accessible = true;
          y = platform.y - 30; // Place above platform
          break;
        }
      }
      
      if (accessible) {
        level.coins.push(createCoin(x, y));
      } else {
        i--; // Try again
      }
    }
    
    // Create dangers
    for (let i = 0; i < 5 + levelNum * 3; i++) {
      let type = random(design.dangerTypes);
      let x, y;
      
      if (type === "bat") {
        x = random(levelWidth);
        y = random(50, 200);
      } else if (type === "water") {
        x = random(levelWidth - 100);
        y = gameHeight - 60;
      } else if (type === "spike") {
        x = random(100, levelWidth - 100);
        y = gameHeight - 72;
        
        // Try to place spikes on platforms
        for (let platform of level.platforms) {
          if (random() > 0.7 && platform.width > 100) {
            x = platform.x + random(30, platform.width - 30);
            y = platform.y - 32;
            break;
          }
        }
      } else if (type === "tripwire") {
        for (let platform of level.platforms) {
          if (platform.width > 100) {
            x = platform.x + 30;
            y = platform.y - 20;
            break;
          }
        }
      }
      
      level.dangers.push(createDanger(x, y, type));
    }
    
    // Create decorations
    for (let i = 0; i < 10; i++) {
      let type = random(design.decorationTypes);
      let x = random(levelWidth);
      let y;
      
      if (type === "lantern") {
        y = random(50, 150);
      } else if (type === "stalagmite") {
        y = gameHeight - 40;
      } else if (type === "stalactite") {
        y = 0;
      } else if (type === "skeleton") {
        x = random(200, levelWidth - 200);
        y = gameHeight - 70;
        
        // Try to place skeleton near platforms
        for (let platform of level.platforms) {
          if (random() > 0.5) {
            x = platform.x + random(-50, platform.width + 50);
            y = platform.y;
            break;
          }
        }
      }
      
      level.decorations.push(createDecoration(x, y, type));
    }
    
    return level;
  }
  
  // Helper functions to create game objects
  function createPlatform(x, y, width, height) {
    return {
      x,
      y,
      width,
      height
    };
  }
  
  function createCoin(x, y) {
    return {
      x,
      y,
      width: 24,
      height: 24,
      collected: false
    };
  }
  
  function createDanger(x, y, type) {
    let width = 32;
    let height = 32;
    let velocityX = 0;
    let velocityY = 0;
    
    if (type === "bat") {
      velocityX = random(-2, 2);
      velocityY = random(-1, 1);
      width = 32;
      height = 24;
    } else if (type === "water") {
      width = 48;
      height = 16;
    } else if (type === "spike") {
      width = 40;
      height = 32;
    } else if (type === "tripwire") {
      width = 80;
      height = 16;
    }
    
    return {
      x,
      y,
      width,
      height,
      type,
      velocityX,
      velocityY
    };
  }
  
  function createDecoration(x, y, type) {
    let width = 32;
    let height = 32;
    
    if (type === "lantern") {
      width = 24;
      height = 32;
    } else if (type === "stalagmite") {
      height = random(30, 60);
      width = 20;
    } else if (type === "stalactite") {
      height = random(30, 60);
      width = 20;
      y = 0; // Hang from ceiling
    } else if (type === "skeleton") {
      width = 40;
      height = 30;
    }
    
    return {
      x,
      y,
      width,
      height,
      type
    };
  }