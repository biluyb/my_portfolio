// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYear = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Loader
window.addEventListener('load', () => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to Top Button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

currentYear.textContent = new Date().getFullYear();

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Initialize skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        const progress = bar.querySelector('.progress');
        const percentElement = bar.querySelector('.percent');
        
        // Reset width for animation
        progress.style.width = '0';
        
        // Animate when in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                progress.style.width = `${percent}%`;
                percentElement.textContent = `${percent}%`;
                observer.unobserve(bar);
            }
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Call skill bars animation when page loads
window.addEventListener('load', animateSkillBars);

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.querySelector('.progress');
          const percent = entry.target.dataset.percent;
          
          // Start animation
          progress.style.transform = `scaleX(${percent / 100})`;
          
          // Update percentage counter
          const percentElement = entry.target.querySelector('.percent');
          if (percentElement) {
            let counter = 0;
            const duration = 1500; // ms
            const increment = percent / (duration / 16); // 60fps
            
            const updateCount = () => {
              counter += increment;
              if (counter < percent) {
                percentElement.textContent = `${Math.floor(counter)}%`;
                requestAnimationFrame(updateCount);
              } else {
                percentElement.textContent = `${percent}%`;
              }
            };
            
            updateCount();
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });
  
    skillBars.forEach(bar => observer.observe(bar));
  }
  

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', animateSkillBars);
