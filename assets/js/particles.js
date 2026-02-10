/**
 * Sakura Particle System
 * Falling cherry blossom petals with natural physics
 */

(function() {
  'use strict';
  
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let isActive = true;
  
  // Configuration
  const config = {
    petalCount: 40,           // Number of petals
    minSize: 4,               // Minimum petal size
    maxSize: 10,              // Maximum petal size
    minSpeed: 0.3,            // Minimum fall speed
    maxSpeed: 1.2,            // Maximum fall speed
    swayAmplitude: 1.5,       // How much petals sway
    swaySpeed: 0.02,          // Speed of swaying
    colors: ['#FFB6C1', '#FFC0CB', '#FFB7C5', '#FF69B4', '#FFA6C9'], // Sakura pinks
    rotationSpeed: 0.02,      // How fast petals spin
  };
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Petal class
  class Petal {
    constructor() {
      this.reset();
      // Start at random Y position initially
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
      this.speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
      this.swayOffset = Math.random() * Math.PI * 2;
      this.swayFreq = 0.5 + Math.random() * 0.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed * 2;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.opacity = 0.6 + Math.random() * 0.4;
      
      // Petal shape variation (0 = oval, 1 = heart-like)
      this.shape = Math.random() > 0.5 ? 'oval' : 'heart';
    }
    
    update() {
      // Fall down
      this.y += this.speed;
      
      // Sway side to side
      this.x += Math.sin(this.y * config.swaySpeed * this.swayFreq + this.swayOffset) * 0.5;
      
      // Rotate
      this.rotation += this.rotationSpeed;
      
      // Reset if off screen
      if (this.y > canvas.height + 20) {
        this.reset();
      }
      
      // Wrap horizontally
      if (this.x > canvas.width + 20) this.x = -20;
      if (this.x < -20) this.x = canvas.width + 20;
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      if (this.shape === 'oval') {
        // Draw oval petal
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Petal vein
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.7);
        ctx.lineTo(0, this.size * 0.7);
        ctx.stroke();
      } else {
        // Draw heart-like petal shape
        ctx.beginPath();
        const s = this.size;
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.5, -s * 0.5, s * 0.8, 0, 0, s * 0.8);
        ctx.bezierCurveTo(-s * 0.8, 0, -s * 0.5, -s * 0.5, 0, -s);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }
  
  // Initialize particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.petalCount; i++) {
      particles.push(new Petal());
    }
  }
  
  // Animation loop
  function animate() {
    if (!isActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(petal => {
      petal.update();
      petal.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Pause animation when tab is hidden
  function handleVisibilityChange() {
    if (document.hidden) {
      isActive = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    } else {
      isActive = true;
      animate();
    }
  }
  
  // Initialize
  function init() {
    resizeCanvas();
    initParticles();
    animate();
    
    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
