/**
 * 纤络星 - 光纤光缆外贸网站
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(3, 7, 18, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(3, 7, 18, 0.85)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .feature-item, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Category switching for products
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    // Handle dropdown toggle
    const dropdownToggles = document.querySelectorAll('.category-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.parentElement;
            const isOpen = dropdown.classList.contains('open');
            // Close all dropdowns
            document.querySelectorAll('.category-dropdown').forEach(d => d.classList.remove('open'));
            // Toggle current dropdown
            if (!isOpen) {
                dropdown.classList.add('open');
            }
        });
    });

    // Handle sub-category clicks
    const subCategoryBtns = document.querySelectorAll('.sub-category-btn');
    subCategoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const subCategory = btn.dataset.category;
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Hide all category content
            categoryContents.forEach(content => content.classList.remove('active'));
            // Show selected category content
            const contentEl = document.getElementById(subCategory);
            if (contentEl) {
                contentEl.classList.add('active');
            } else {
                // If no content, try parent category
                const parentCategory = subCategory.replace('-3', '').replace('-2', '').replace('-1', '');
                const parentContent = document.getElementById(parentCategory);
                if (parentContent) {
                    parentContent.classList.add('active');
                }
            }
        });
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Skip if it's a dropdown toggle or sub-category (handled separately)
            if (btn.classList.contains('category-dropdown-toggle') || btn.classList.contains('sub-category-btn')) {
                return;
            }
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all category content
            categoryContents.forEach(content => content.classList.remove('active'));
            // Show selected category content
            const category = btn.dataset.category;
            document.getElementById(category).classList.add('active');
        });
    });

    // Add hover effect to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });

    // Parallax effect for hero (subtle)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
});

// Utility: Debounce function
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
