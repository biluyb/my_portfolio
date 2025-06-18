// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const navLinksContainer = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYear = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

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

    // Update active nav link
    updateActiveLink();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.resume-button');
  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('assets/pdfs/resume.pdf', '_blank'); // Replace with actual path

      if (typeof gtag !== 'undefined') {
        gtag('event', 'resume_view', {
          'event_category': 'engagement',
          'event_label': 'Resume View'
        });
      }

      console.log('Resume viewed');
    });
  }
});

// Visitor Counter
async function updateVisitorCount() {
    const countEl = document.getElementById('visitCount');
    
    try {
      // First try CountAPI
      const response = await fetch('https://api.countapi.xyz/hit/your-domain.com/visits');
      const data = await response.json();
      countEl.textContent = data.value.toLocaleString();
    } catch (error) {
      // Fallback to localStorage
      let count = localStorage.getItem('visitorCount') || 0;
      count = parseInt(count) + 1;
      countEl.textContent = count.toLocaleString();
      localStorage.setItem('visitorCount', count);
    }
    
    // Add animation
    countEl.style.transform = 'scale(1.2)';
    setTimeout(() => {
      countEl.style.transform = 'scale(1)';
    }, 300);
  }

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// Function to update active link
function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Adjust for header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

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

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
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

