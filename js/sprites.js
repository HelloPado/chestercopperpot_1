// Chester Copperpot Adventure - Sprite Classes

// Base class for all game entities
class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    update() {
        // Base update logic
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    
    render(ctx) {
        // Default rendering (placeholder rectangle)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    getBounds() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height
        };
    }
    
    collidesWith(other) {
        const a = this.getBounds();
        const b = other.getBounds();
        
        return !(
            a.bottom < b.top ||
            a.top > b.bottom ||
            a.right < b.left ||
            a.left > b.right
        );
    }
}

// Player character
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 32, 48);
        this.speed = 5;
        this.jumpForce = 10;
        this.isJumping = false;
        this.gravity = 0.5;
        this.color = '#3498db';
    }
    
    update(keys) {
        // Handle horizontal movement
        if (keys['ArrowLeft'] || keys['a']) {
            this.velocityX = -this.speed;
        } else if (keys['ArrowRight'] || keys['d']) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }
        
        // Handle jumping
        if ((keys['ArrowUp'] || keys['w'] || keys[' ']) && !this.isJumping) {
            this.velocityY = -this.jumpForce;
            this.isJumping = true;
        }
        
        // Apply gravity
        this.velocityY += this.gravity;
        
        // Apply velocity
        super.update();
        
        // Keep player within canvas bounds
        const canvas = document.getElementById('game-canvas');
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw face
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 8, this.y + 10, 5, 5); // Left eye
        ctx.fillRect(this.x + 19, this.y + 10, 5, 5); // Right eye
        ctx.fillRect(this.x + 10, this.y + 25, 12, 3); // Mouth
    }
}

// Coin collectible
class Coin extends Entity {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = '#f1c40f';
        this.value = 10;
        this.animationFrame = 0;
    }
    
    update() {
        // Simple animation
        this.animationFrame += 0.1;
        if (this.animationFrame > Math.PI * 2) {
            this.animationFrame = 0;
        }
    }
    
    render(ctx) {
        const scale = 0.8 + 0.2 * Math.sin(this.animationFrame);
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            (this.width / 2) * scale,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Shine effect
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(
            centerX - 3,
            centerY - 3,
            3,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Enemy character
class Enemy extends Entity {
    constructor(x, y, speed = 2) {
        super(x, y, 30, 30);
        this.speed = speed;
        this.velocityX = speed;
        this.color = '#e74c3c';
    }
    
    update() {
        super.update();
        
        // Reverse direction at canvas edges
        const canvas = document.getElementById('game-canvas');
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.velocityX = -this.velocityX;
        }
    }
    
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw angry eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 5, this.y + 8, 6, 3); // Left eye
        ctx.fillRect(this.x + 19, this.y + 8, 6, 3); // Right eye
        
        // Draw mouth
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y + 20);
        ctx.lineTo(this.x + 22, this.y + 20);
        ctx.lineTo(this.x + 15, this.y + 25);
        ctx.closePath();
        ctx.fill();
    }
} 