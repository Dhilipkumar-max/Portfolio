// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});

// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2500,
    delay: 400
});

// Reveal sections
sr.reveal('.hero-content', { delay: 500 });
sr.reveal('.about-content', { interval: 200 });
sr.reveal('.project-card', { interval: 200 });
sr.reveal('.contact-content', { interval: 200 });

// Typing Animation for Hero Section
const text = "Full Stack Developer";
const title = document.querySelector('.title');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Parallax Effect for Floating Shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Add CSS animation for typing effect
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .burger.toggle .line2 {
        opacity: 0;
    }

    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// ========== SMOOTH SCROLL ANIMATIONS - SAME AS HOME ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Main scroll observer for sections
const mainScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Animating section:', entry.target.id);
            
            // Add animate class to section
            entry.target.classList.add('animate-in');
            
            // Animate all direct children
            const children = entry.target.querySelectorAll('h2, .section-description, .about-text, .about-stats, .skills-container, .certifications-container, .ai-grid, .metrics-container, .project-categories, .achievements, .contact-content');
            children.forEach(child => {
                child.classList.add('animate-in');
            });
            
            // Animate all cards and items
            const items = entry.target.querySelectorAll('.achievement, .skill-category, .project-card, .certification-card, .ai-category, .metric, .stat, .category');
            items.forEach(item => {
                item.classList.add('animate-in');
            });
            
            // Animate paragraphs
            const paragraphs = entry.target.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.classList.add('animate-in');
            });
            
            console.log('Animated', items.length, 'items');
            
            mainScrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections except home
console.log('Setting up scroll observers...');
const sections = document.querySelectorAll('section:not(#home)');
console.log('Found', sections.length, 'sections to observe');

sections.forEach(section => {
    console.log('Observing section:', section.id || section.className);
    mainScrollObserver.observe(section);
});

// Test: Make sure CSS is loaded
console.log('Animation CSS loaded from styles.css');

// Skills Section Enhancement
const skillsData = {
    mlDl: {
        title: "ML/DL & Computer Vision",
        description: "Deep Learning & CV Expertise",
        skills: [
            { name: "CNNs & Transfer Learning", level: 90, description: "ResNet-50, EfficientNet-B0/B3" },
            { name: "TensorFlow & Keras", level: 90, description: "Production ML models" },
            { name: "PyTorch", level: 75, description: "Learning & experimentation" },
            { name: "OpenCV", level: 88, description: "Real-time CV pipelines" },
            { name: "Image Classification", level: 90, description: "Disease detection, fire detection" },
            { name: "Data Augmentation", level: 85, description: "CLAHE, noise filtering" }
        ]
    },
    coreProgramming: {
        title: "Programming Languages",
        description: "Production-Ready Development",
        skills: [
            { name: "Python", level: 95, description: "ML/DL, scripting, automation" },
            { name: "JavaScript", level: 85, description: "React, Node.js" },
            { name: "C", level: 80, description: "System programming" },
            { name: "Java/Dart", level: 70, description: "Learning Flutter" }
        ]
    },
    frameworks: {
        title: "Frameworks & Tools",
        description: "Full-Stack & ML Development",
        skills: [
            { name: "scikit-learn", level: 88, description: "ML algorithms" },
            { name: "NumPy & Pandas", level: 90, description: "Data preprocessing" },
            { name: "Flask/Django", level: 85, description: "ML API deployment" },
            { name: "React & Node.js", level: 85, description: "Full-stack web apps" }
        ]
    },
    mlops: {
        title: "MLOps & DevOps",
        description: "Production ML Deployment",
        skills: [
            { name: "Git/GitHub", level: 90, description: "Version control" },
            { name: "Docker", level: 70, description: "Containerization (beginner)" },
            { name: "CI/CD", level: 80, description: "Automated pipelines" },
            { name: "REST APIs", level: 88, description: "ML model serving" },
            { name: "PyTest/Jest", level: 85, description: "95%+ test coverage" }
        ]
    },
    evaluation: {
        title: "Model Evaluation & Analysis",
        description: "Performance Metrics & Optimization",
        skills: [
            { name: "F1-score & ROC-AUC", level: 90, description: "Model evaluation" },
            { name: "Precision/Recall", level: 90, description: "Classification metrics" },
            { name: "Confusion Matrix", level: 88, description: "Error analysis" },
            { name: "EDA", level: 85, description: "Exploratory data analysis" },
            { name: "A/B Testing", level: 80, description: "Model comparison" }
        ]
    }
};

// Create and animate skill bars
function createSkillBars() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    Object.values(skillsData).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        categoryDiv.innerHTML = `
            <h4>${category.title}</h4>
            <p class="category-description">${category.description}</p>
            <div class="skills-list">
                ${category.skills.map(skill => `
                    <div class="skill-item" data-tooltip="${skill.description}">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-percentage">${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 0%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        skillsContainer.appendChild(categoryDiv);
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.parentElement.previousElementSibling
                    .querySelector('.skill-percentage').textContent;
                progressBar.style.width = targetWidth;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Add certifications section
const certificationsData = [
    { category: "AICTE Internships", items: ["Microsoft AI Intern (Mar-Apr 2024)", "EduNet-Shell Green AI Intern (Apr-Jun 2024)"] },
    { category: "AI/ML Projects", items: ["Disease Detection System (85% accuracy)", "Real-Time Fire Detection (90% accuracy)"] },
    { category: "Technical Skills", items: ["CSC Course: MySQL, Python, C, MS Office (2022-2024)", "AI Centre Fire Safety Project (2024)"] }
];

function createCertificationsSection() {
    const certsContainer = document.querySelector('.certifications-container');
    if (!certsContainer) return;

    certificationsData.forEach(cert => {
        const certDiv = document.createElement('div');
        certDiv.className = 'cert-category';
        certDiv.innerHTML = `
            <h4>${cert.category}</h4>
            <ul class="cert-list">
                ${cert.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        certsContainer.appendChild(certDiv);
    });
}

// Add metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const targetValue = parseInt(metric.getAttribute('data-value'));
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps

        function updateValue() {
            if (currentValue < targetValue) {
                currentValue = Math.min(currentValue + increment, targetValue);
                metric.textContent = Math.round(currentValue).toLocaleString();
                requestAnimationFrame(updateValue);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateValue();
                observer.disconnect();
            }
        });

        observer.observe(metric);
    });
}

// Initialize new sections
document.addEventListener('DOMContentLoaded', () => {
    createSkillBars();
    createCertificationsSection();
    animateMetrics();
});

// Add CSS for new sections
const skillStyles = document.createElement('style');
skillStyles.textContent = `
    .skill-category {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .category-description {
        color: var(--accent-color);
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .skill-item {
        margin-bottom: 1rem;
        position: relative;
    }

    .skill-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .skill-bar {
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        background: var(--primary-color);
        transition: width 1s ease-out;
        position: relative;
    }

    .skill-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .cert-category {
        margin-bottom: 1.5rem;
    }

    .cert-list {
        list-style: none;
        padding-left: 1rem;
    }

    .cert-list li {
        position: relative;
        padding: 0.5rem 0;
        padding-left: 1.5rem;
    }

    .cert-list li::before {
        content: 'ðŸ†';
        position: absolute;
        left: 0;
        opacity: 0.8;
    }
`;

document.head.appendChild(skillStyles);

// Mobile Project Categories Toggle
function initProjectCategories() {
    const categories = document.querySelectorAll('.category');
    
    // Initialize project categories
    categories.forEach(category => {
        const title = category.querySelector('.category-title');
        const grid = category.querySelector('.project-grid');
        
        // Hide all project grids on mobile by default
        if (window.innerWidth <= 768) {
            grid.style.display = 'none';
            category.classList.remove('active');
        }
        
        // Add click handler for category titles
        title.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Close other open categories
                categories.forEach(otherCategory => {
                    if (otherCategory !== category && otherCategory.classList.contains('active')) {
                        otherCategory.classList.remove('active');
                        otherCategory.querySelector('.project-grid').style.display = 'none';
                    }
                });
                
                // Toggle current category
                const isActive = category.classList.contains('active');
                category.classList.toggle('active');
                
                // Show/hide project grid with animation
                if (!isActive) {
                    grid.style.display = 'grid';
                    grid.style.opacity = '0';
                    grid.style.transform = 'translateY(-10px)';
                    
                    // Trigger animation
                    setTimeout(() => {
                        grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        grid.style.opacity = '1';
                        grid.style.transform = 'translateY(0)';
                        
                        // Smooth scroll to the opened category
                        category.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 10);
                } else {
                    grid.style.opacity = '0';
                    grid.style.transform = 'translateY(-10px)';
                    
                    // Hide after animation
                    setTimeout(() => {
                        grid.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Show all project grids on desktop
            categories.forEach(category => {
                const grid = category.querySelector('.project-grid');
                category.classList.remove('active');
                grid.style.display = 'grid';
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            });
        } else {
            // Hide all project grids on mobile
            categories.forEach(category => {
                const grid = category.querySelector('.project-grid');
                category.classList.remove('active');
                grid.style.display = 'none';
            });
        }
    });
}

// Animate skills on scroll
function animateSkillsOnScroll() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-skills');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initProjectCategories();
    animateSkillsOnScroll();
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Typing Animation
const texts = ['Machine Learning Engineer', 'Deep Learning Specialist', 'Computer Vision Expert', 'AI Developer'];
let textIndex = 0;
let charIndex = 0;
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

function type() {
    if (charIndex < texts[textIndex].length) {
        typingText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

type();

// Scroll Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Animate metrics on scroll
const metrics = document.querySelectorAll('.metric-value');
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.getAttribute('data-value'));
            animateValue(target, 0, value, 2000);
            metricsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

metrics.forEach(metric => metricsObserver.observe(metric));

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
} 

// ========== ANIMATION FOR PROJECT CARDS (ALL AT ONCE) ==========
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach((card) => {
                card.classList.add('animate-in');
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe project grids
document.querySelectorAll('.project-grid').forEach(grid => {
    staggerObserver.observe(grid);
});

// ========== ANIMATION FOR SKILLS (ALL AT ONCE) ==========
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const categories = entry.target.querySelectorAll('.skill-category');
            categories.forEach((category) => {
                category.classList.add('animate-in');
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe skills container
const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
}

// ========== ANIMATION FOR ACHIEVEMENTS (ALL AT ONCE) ==========
const achievementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const achievements = entry.target.querySelectorAll('.achievement');
            achievements.forEach((achievement) => {
                achievement.classList.add('animate-in');
            });
            achievementsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe achievements container
const achievementsContainer = document.querySelector('.achievements');
if (achievementsContainer) {
    achievementsObserver.observe(achievementsContainer);
}

// ========== SMOOTH REVEAL FOR CATEGORY SECTIONS ==========
const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate category title
            const title = entry.target.querySelector('.category-title');
            if (title) {
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
            }
            
            // Animate all project cards at once
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach((card) => {
                card.classList.add('animate-in');
            });
            
            categoryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all categories
document.querySelectorAll('.category').forEach(category => {
    categoryObserver.observe(category);
    
    // Set initial state for category title
    const title = category.querySelector('.category-title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-30px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
});

// ========== SCROLL PROGRESS INDICATOR ==========
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--primary-color);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
};

createScrollProgress();

// ========== SMOOTH SCROLL TO TOP ==========
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--secondary-color);
        border: none;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0)';
        }
    }, { passive: true });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollBtn);
};

createScrollToTop();
