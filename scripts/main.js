
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Cart dropdown functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            cartDropdown.classList.toggle('active');
            
            // Add animation effect
            if (cartDropdown.classList.contains('active')) {
                cartIcon.querySelector('svg').style.transform = 'scale(1.1) rotate(-10deg)';
                setTimeout(() => {
                    cartIcon.querySelector('svg').style.transform = 'scale(1)';
                }, 300);
            }
        });
        
        // Close cart dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
                cartDropdown.classList.remove('active');
            }
        });
    }
    
    // Prevent event bubbling in cart dropdown
    if (cartDropdown) {
        cartDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        }
    });

    // Line section expand/collapse for large product lines (optional enhancement)
    const lineTitles = document.querySelectorAll('.line-title');
    
    if (lineTitles) {
        lineTitles.forEach(title => {
            title.addEventListener('click', function() {
                const productGrid = this.nextElementSibling;
                
                // Only add toggle capability on mobile
                if (window.innerWidth < 768) {
                    if (productGrid.classList.contains('product-grid')) {
                        if (productGrid.style.maxHeight) {
                            productGrid.style.maxHeight = null;
                            this.classList.remove('collapsed');
                        } else {
                            productGrid.style.maxHeight = productGrid.scrollHeight + 'px';
                            this.classList.add('collapsed');
                        }
                    }
                }
            });
        });
    }

    // Function to check for image comments and apply backgrounds (optional helper)
    // You can uncomment this if you want to automatically apply backgrounds based on comments
    /*
    function applyImageLabels() {
        // This function would find HTML comments with IMAGE: tags and apply appropriate backgrounds
        // For now, this is left as a helper for manual implementation
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            // Check for preceding comment nodes that have IMAGE: in them
            let node = el.previousSibling;
            while (node && node.nodeType !== 8) { // 8 is comment node type
                node = node.previousSibling;
            }
            
            if (node && node.nodeType === 8 && node.textContent.includes('IMAGE:')) {
                // Extract image name from comment
                const imageName = node.textContent.split('IMAGE:')[1].trim();
                console.log(`Found image label: ${imageName} for element:`, el);
                // Apply background or other treatments here
            }
        });
    }
    
    // Uncomment to enable automatic image label detection
    // applyImageLabels();
    */
});
