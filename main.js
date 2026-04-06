/**
 * IPTV CAD - Main JavaScript
 * Domain: iptvcad.online
 * Brand: iptv cad
 * WhatsApp: +212776056268
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initAnnouncementBar();
  initScrollReveal();
  initCounters();
  initFAQ();
  initMobileMenu();
  initSmoothScroll();
  initCheckoutRedirect();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================
// Announcement Bar
// ============================================
function initAnnouncementBar() {
  const bar = document.querySelector('.announcement-bar');
  const closeBtn = document.querySelector('.announcement-bar .close-btn');
  
  if (!bar || !closeBtn) return;
  
  // Check if user dismissed the bar
  if (localStorage.getItem('announcementClosed') === 'true') {
    bar.style.display = 'none';
    document.body.style.paddingTop = '70px';
  } else {
    document.body.style.paddingTop = '110px';
  }
  
  closeBtn.addEventListener('click', () => {
    bar.style.display = 'none';
    localStorage.setItem('announcementClosed', 'true');
    document.body.style.paddingTop = '70px';
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  
  updateCounter();
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// Checkout Redirect
// ============================================
function initCheckoutRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan');
  
  if (plan && window.location.pathname.includes('checkout.html')) {
    const planData = {
      monthly: { name: 'Monthly', price: '12.99', period: 'month' },
      '3month': { name: '3-Month', price: '39.99', period: '3 months' },
      '6month': { name: '6-Month', price: '44.99', period: '6 months' },
      yearly: { name: 'Yearly', price: '69.99', period: 'year' }
    };
    
    const selectedPlan = planData[plan];
    if (selectedPlan) {
      const message = `Hi! I want the ${selectedPlan.name} IPTV plan ($${selectedPlan.price} CAD/${selectedPlan.period}). How do I pay?`;
      const whatsappUrl = `https://wa.me/212776056268?text=${encodeURIComponent(message)}`;
      
      // Update page content
      const planNameEl = document.getElementById('plan-name');
      const planPriceEl = document.getElementById('plan-price');
      const whatsappBtn = document.getElementById('whatsapp-redirect');
      
      if (planNameEl) planNameEl.textContent = selectedPlan.name;
      if (planPriceEl) planPriceEl.textContent = `$${selectedPlan.price} CAD`;
      if (whatsappBtn) whatsappBtn.href = whatsappUrl;
    }
  }
}

// ============================================
// Channel Filter
// ============================================
function filterChannels(category) {
  const chips = document.querySelectorAll('.channel-chip');
  const channels = document.querySelectorAll('.channel-logo');
  
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === category);
  });
  
  channels.forEach(channel => {
    if (category === 'all' || channel.dataset.category === category) {
      channel.style.display = 'block';
    } else {
      channel.style.display = 'none';
    }
  });
}

// ============================================
// Copy to Clipboard
// ============================================
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  });
}

// ============================================
// Form Validation
// ============================================
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length === 0) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Performance: Debounce
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// Performance: Throttle
// ============================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// WhatsApp Link Generator
// ============================================
function getWhatsAppLink(message) {
  const baseUrl = 'https://wa.me/212776056268';
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

// ============================================
// Analytics (Placeholder)
// ============================================
function trackEvent(eventName, eventData) {
  // Placeholder for analytics tracking
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }
  console.log('Event tracked:', eventName, eventData);
}

// ============================================
// Utility: Format Currency
// ============================================
function formatCurrency(amount, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// ============================================
// Utility: Format Number
// ============================================
function formatNumber(num) {
  return num.toLocaleString('en-CA');
}

// ============================================
// Preload Critical Resources
// ============================================
function preloadResources() {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
  ];
  
  criticalFonts.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Initialize preload
preloadResources();
