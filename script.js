// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Search functionality with keyboard shortcut
const searchInput = document.getElementById('searchInput');
const categoryItems = document.querySelectorAll('.category-item');
const quickLinks = document.querySelectorAll('.quick-link');

// Keyboard shortcut for search (⌘ K or Ctrl K)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Debounce function for search
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

// Search functionality
const handleSearch = debounce((searchTerm) => {
    const allItems = [...categoryItems, ...quickLinks];
    
    allItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const isVisible = text.includes(searchTerm.toLowerCase());
        
        item.style.display = isVisible ? 'flex' : 'none';
        if (isVisible) {
            item.style.animation = 'fadeIn 0.3s ease-in-out';
        }
    });
}, 300);

searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
});

// Add keyboard navigation for category items
categoryItems.forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Add hover effect to category items
categoryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Add click tracking for analytics (you can implement your own analytics)
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href !== '#') {
            // You can add your analytics tracking here
            console.log(`Clicked: ${href}`);
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize card animations
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Add hover effect to featured cards
const featuredCards = document.querySelectorAll('.featured-card');
featuredCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 