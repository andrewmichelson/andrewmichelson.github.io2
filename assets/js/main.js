document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Content filtering and pagination functionality
    const filterLinks = document.querySelectorAll('#content-filter .nav-link');
    const contentItems = document.querySelectorAll('.content-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenContent = document.getElementById('hidden-content');

    // Filter functionality
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Update active filter
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;

            // Show/hide content items with animation
            contentItems.forEach(item => {
                if (filter === 'all' یا item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50 * visibleCount);
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const loaded = parseInt(this.getAttribute('data-loaded'));
            const total = parseInt(this.getAttribute('data-total'));
            const hiddenItems = hiddenContent.querySelectorAll('.content-item');
            const loadCount = Math.min(3, total - loaded);

            // Move items from hidden to visible with animation
            for (let i = 0; i < loadCount; i++) {
                if (hiddenItems[i]) {
                    const item = hiddenItems[i];
                    document.getElementById('content-container').appendChild(item);

                    // Animate in the new item
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                }
            }

            // Update button state
            const newLoaded = loaded + loadCount;
            this.setAttribute('data-loaded', newLoaded);

            if (newLoaded >= total) {
                this.innerHTML = '<i class="fas fa-check me-2"></i>All Content Loaded';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.disabled = true;
            } else {
                const remaining = total - newLoaded;
                this.querySelector('.badge').textContent = `${remaining} remaining`;
            }
        });
    }

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

    // Observe elements for animation
    document.querySelectorAll('.card, .content-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
