// Portfolio Website JavaScript - Solomon Sands
// Enhanced interactivity and functionality

// Contact reveal functionality with improved UX
function revealContact(type) {
    const emailBtn = document.getElementById('emailBtn');
    const phoneBtn = document.getElementById('phoneBtn');
    const emailSpan = document.getElementById('emailSpan');
    const phoneSpan = document.getElementById('phoneSpan');
    
    if (type === 'email') {
        if (emailBtn) {
            emailBtn.classList.add('loading');
            setTimeout(() => {
                emailBtn.innerHTML = '📧 solomon.j.sands@gmail.com';
                emailBtn.href = 'mailto:solomon.j.sands@gmail.com';
                emailBtn.classList.remove('loading');
                emailBtn.onclick = null; // Remove click handler
            }, 500);
        }
        
        if (emailSpan) {
            emailSpan.classList.add('loading');
            setTimeout(() => {
                emailSpan.innerHTML = '📧 solomon.j.sands@gmail.com';
                emailSpan.style.cursor = 'default';
                emailSpan.style.color = '#666';
                emailSpan.classList.remove('loading');
                emailSpan.onclick = null; // Remove click handler
            }, 500);
        }
    } else if (type === 'phone') {
        if (phoneBtn) {
            phoneBtn.classList.add('loading');
            setTimeout(() => {
                phoneBtn.innerHTML = '📱 (757) 343-8896';
                phoneBtn.href = 'tel:757-343-8896';
                phoneBtn.classList.remove('loading');
                phoneBtn.onclick = null; // Remove click handler
            }, 500);
        }
        
        if (phoneSpan) {
            phoneSpan.classList.add('loading');
            setTimeout(() => {
                phoneSpan.innerHTML = '📱 (757) 343-8896';
                phoneSpan.style.cursor = 'default';
                phoneSpan.style.color = '#666';
                phoneSpan.classList.remove('loading');
                phoneSpan.onclick = null; // Remove click handler
            }, 500);
        }
    }
}

// Enhanced scroll animations
function initScrollAnimations() {
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

    // Observe all cards and major sections
    document.querySelectorAll('.card, .project-card, .experience-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Enhanced project card interactions
function initProjectCardEnhancements() {
    document.querySelectorAll('.project-card').forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A') return;
            
            this.classList.toggle('expanded');
        });

        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Copy to clipboard functionality
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const originalText = element.innerHTML;
        element.innerHTML = '✓ Copied!';
        element.style.background = '#27ae60';
        
        setTimeout(() => {
            element.innerHTML = originalText;
            element.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

// Enhanced print functionality
function enhancedPrint() {
    // Add print-specific styles temporarily
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { font-size: 12pt !important; }
            .card { page-break-inside: avoid; }
        }
    `;
    document.head.appendChild(printStyles);
    
    // Trigger print
    window.print();
    
    // Remove temporary styles after print dialog
    setTimeout(() => {
        document.head.removeChild(printStyles);
    }, 1000);
}

// Analytics and tracking (privacy-friendly)
function initAnalytics() {
    // Track page views (without personal data)
    const pageData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 50) // Truncated for privacy
    };
    
    // Store in localStorage for basic analytics
    const visits = JSON.parse(localStorage.getItem('portfolio_visits') || '[]');
    visits.push(pageData);
    
    // Keep only last 10 visits
    if (visits.length > 10) {
        visits.splice(0, visits.length - 10);
    }
    
    localStorage.setItem('portfolio_visits', JSON.stringify(visits));
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page Load Performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            });
        }
    });
}

// Error handling and reporting
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
}

// Accessibility enhancements
function initAccessibilityEnhancements() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark if not present
    const mainContent = document.querySelector('main') || document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }

    // Enhance focus management
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals or expanded cards
        if (e.key === 'Escape') {
            document.querySelectorAll('.expanded').forEach(el => {
                el.classList.remove('expanded');
            });
        }
    });
}

// Theme and preference management
function initThemeManagement() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    // Respect user's contrast preferences
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Could implement dark mode here in the future
        console.log('Color scheme preference changed:', e.matches ? 'dark' : 'light');
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    initProjectCardEnhancements();
    initAnalytics();
    initPerformanceMonitoring();
    initErrorHandling();
    initAccessibilityEnhancements();
    initThemeManagement();
    
    console.log('Portfolio website initialized successfully');
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.portfolioFunctions = {
    revealContact,
    copyToClipboard,
    enhancedPrint
};
