document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        let currentIndex = 0;

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

const sections = document.querySelectorAll('section');
const navLinks2 = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        console.log('Form submitted:', { name, email, message });
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
});

const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

function createProjectCard(projectData) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHTML = projectData.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');
    
    const linksHTML = projectData.links
        .map(link => `<a href="${link.url}" class="project-link"><i class="fas fa-${link.icon}"></i> ${link.text}</a>`)
        .join('');
    
    card.innerHTML = `
        <div class="project-image">
            <div class="placeholder">
                <i class="fas ${projectData.icon}"></i>
            </div>
        </div>
        <div class="project-content">
            <h3>${projectData.title}</h3>
            <p>${projectData.description}</p>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <div class="project-links">
                ${linksHTML}
            </div>
        </div>
    `;
    
    return card;
}

function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const settingsLink = document.querySelector('[href="#"]');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (settingsLink && dropdownMenu) {
        const allLinks = document.querySelectorAll('.nav-link');
        let settingsNav = null;
        
        allLinks.forEach(link => {
            if (link && link.innerHTML && link.innerHTML.includes('fa-cog')) {
                settingsNav = link;
            }
        });
        
        if (settingsNav) {
            settingsNav.addEventListener('click', (e) => {
                e.preventDefault();
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('active');
                }
            });
        }
    }
    
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('active');
                }
            }
        });
    }
    
    const accessibilityLink = document.querySelector('[data-accessibility]');
    if (accessibilityLink) {
        accessibilityLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Accessibility options would be displayed here. Features may include: font size, high contrast mode, screen reader support, etc.');
            const menu = document.querySelector('.dropdown-menu');
            if (menu) menu.classList.remove('active');
        });
    }
    
    const themeLink = document.querySelector('[data-theme]');
    if (themeLink) {
        themeLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Theme options would be displayed here. Options may include: dark mode, light mode, custom colors, etc.');
            const menu = document.querySelector('.dropdown-menu');
            if (menu) menu.classList.remove('active');
        });
    }
});
