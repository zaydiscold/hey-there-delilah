/**
 * Theme Toggle System
 * Light/Dark mode switching with localStorage persistence
 */

(function() {
  'use strict';
  
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Theme configuration
  const themes = {
    dark: 'light',
    light: 'dark'
  };
  
  // Get current theme
  function getCurrentTheme() {
    return html.getAttribute('data-theme') || 'dark';
  }
  
  // Set theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
  }
  
  // Update toggle button icon
  function updateToggleIcon(theme) {
    if (!toggleBtn) return;
    
    const icon = toggleBtn.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌸' : '🌙';
    }
    
    // Update button text
    const text = toggleBtn.querySelector('.theme-toggle-text');
    if (text) {
      text.textContent = theme === 'dark' ? 'Theme' : 'Theme';
    }
    
    // Update aria-label
    toggleBtn.setAttribute('aria-label', `Switch to ${themes[theme]} mode`);
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = themes[currentTheme];
    setTheme(newTheme);
  }
  
  // Initialize
  function init() {
    // Ensure theme is set
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    
    // Add click handler
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      
      // Only apply system preference if no saved preference
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'light' : 'dark');
      }
      
      // Optional: Listen for system changes in real-time
      // Uncomment if you want system changes to override:
      // mediaQuery.addEventListener('change', (e) => {
      //   setTheme(e.matches ? 'light' : 'dark');
      // });
    }
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
