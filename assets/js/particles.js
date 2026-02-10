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
  let isEnabled = true;
  
  // Configuration - ELEGANT (slower, less dense)
  const config = {
    petalCount: 15,           // Reduced from 40 for elegance
    minSize: 4,
    maxSize: 10,
    minSpeed: 0.2,            // Slower fall (was 0.3)
    maxSpeed: 0.6,            // Slower fall (was 1.2)
    swayAmplitude: 1.0,       // Gentler sway (was 1.5)
    swaySpeed: 0.015,         // Slower sway (was 0.02)
    colors: ['#FFB6C1', '#FFC0CB', '#FFB7C5', '#FF69B4', '#FFA6C9'],
    rotationSpeed: 0.015,     // Slower rotation (was 0.02)
  };
  
  // Create toggle button
  function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'sakura-toggle';
    button.innerHTML = '🌸';
    button.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 10000;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 182, 193, 0.3);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s, background 0.3s;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
      button.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.opacity = '0.6';
      button.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    button.addEventListener('click', () => {
      isEnabled = !isEnabled;
      canvas.style.display = isEnabled ? 'block' : 'none';
      button.innerHTML = isEnabled ? '🌸' : '🌸';
      button.style.opacity = isEnabled ? '0.6' : '0.3';
    });
    
    document.body.appendChild(button);
  }
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Petal class
  class Petal {
    constructor() {
      this.reset();
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
      this.opacity = 0.5 + Math.random() * 0.3; // Slightly more transparent
      this.shape = Math.random() > 0.5 ? 'oval' : 'heart';
    }
    
    update() {
      this.y += this.speed;
      this.x += Math.sin(this.y * config.swaySpeed * this.swayFreq + this.swayOffset) * 0.3; // Gentler sway
      this.rotation += this.rotationSpeed;
      
      if (this.y > canvas.height + 20) {
        this.reset();
      }
      
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
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.7);
        ctx.lineTo(0, this.size * 0.7);
        ctx.stroke();
      } else {
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
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.petalCount; i++) {
      particles.push(new Petal());
    }
  }
  
  function animate() {
    if (!isActive || !isEnabled) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(petal => {
      petal.update();
      petal.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
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
  
  function init() {
    resizeCanvas();
    initParticles();
    createToggleButton();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
