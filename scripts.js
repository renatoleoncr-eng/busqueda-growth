document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Canvas Particles (Hero Background)
    // ==========================================================================
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        let resizeTimeout;
        
        // Determine number of particles based on screen width
        const getParticleCount = () => window.innerWidth < 768 ? 30 : 60;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Very slow movement
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            
            move() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
                ctx.fill();
            }
        }
        
        const initParticles = () => {
            particles = [];
            const count = getParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        
        const animateParticles = () => {
            // Only animate if tab is visible to save resources
            if (document.hidden) {
                animationFrameId = requestAnimationFrame(animateParticles);
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Move and draw all particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].move();
                particles[i].draw();
                
                // Draw lines between close particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Opacity based on distance
                        const opacity = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.2})`;
                        ctx.stroke();
                    }
                }
            }
            
            // Draw lines between particles and mouse (wow interactive factor)
            if (mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < particles.length; i++) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 180) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        const opacity = 1 - (distance / 180);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.35})`;
                        ctx.stroke();
                    }
                }
            }
            
            animationFrameId = requestAnimationFrame(animateParticles);
        };
        
        // Setup
        let mouse = { x: null, y: null };
        
        const updateMousePosition = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
        };
        
        window.addEventListener('mousemove', (e) => {
            updateMousePosition(e.clientX, e.clientY);
        });
        
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Touch support for Canvas (particles interaction on mobile)
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
        
        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        });
        
        resizeCanvas();
        animateParticles();
    }
    
    // ==========================================================================
    // 2. Scroll Animations (Intersection Observer)
    // ==========================================================================
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.15
        };
        
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    } else {
        // Fallback for reduced motion: make everything visible immediately
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }
    
    // ==========================================================================
    // 3. Smooth Scroll for CTAs
    // ==========================================================================
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-scroll-to');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // ==========================================================================
    // 4. Card Cursor Spotlight & Mobile Sweep (Glow Effect)
    // ==========================================================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Desktop mouse tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Mobile touch tracking
        const handleTouch = (e) => {
            if (e.touches.length > 0) {
                card.dataset.isSweeping = 'false'; // Stop scroll sweep if user touches card
                const rect = card.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.classList.add('active-glow');
            }
        };

        card.addEventListener('touchstart', handleTouch, { passive: true });
        card.addEventListener('touchmove', handleTouch, { passive: true });
        card.addEventListener('touchend', () => {
            // Keep the glow active briefly, then fade out smoothly
            setTimeout(() => {
                card.classList.remove('active-glow');
            }, 600);
        });
    });

    // Mobile scroll sweep effect: sweeps a glow spotlight across cards as they enter screen center
    if (window.innerWidth < 768) {
        const sweepGlow = (card) => {
            if (card.dataset.isSweeping === 'true') return;
            card.dataset.isSweeping = 'true';
            
            const rect = card.getBoundingClientRect();
            const width = rect.width || 300;
            const height = rect.height || 200;
            let start = null;
            const duration = 1200; // 1.2s scan sweep duration

            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Sweep from left to right along the center horizontal line of the card
                const x = width * percentage;
                const y = height / 2;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                if (percentage < 1 && card.classList.contains('active-glow') && card.dataset.isSweeping === 'true') {
                    requestAnimationFrame(step);
                } else {
                    card.dataset.isSweeping = 'false';
                }
            };
            requestAnimationFrame(step);
        };

        const mobileObserverOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', // Active when in the center 40% of the screen
            threshold: 0
        };

        const mobileCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    card.classList.add('active-glow');
                    sweepGlow(card);
                } else {
                    card.classList.remove('active-glow');
                    card.dataset.isSweeping = 'false';
                }
            });
        }, mobileObserverOptions);

        cards.forEach(card => {
            mobileCardObserver.observe(card);
        });
    }
});
