/* ══════════════════════════════════════════════════════════════
   hiren.js — Enhanced Portfolio JavaScript
══════════════════════════════════════════════════════════════ */

/* ─── 1. HAMBURGER MENU ─────────────────────────────────────── */
const menuIcon = document.getElementById('menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuIcon.classList.toggle('fa-xmark');
    menuIcon.classList.toggle('fa-bars');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    });
});

/* ─── 2. DARK / LIGHT MODE ──────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const htmlEl      = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

/* ─── 3. SCROLL PROGRESS BAR ────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
});

/* ─── 4. BACK TO TOP BUTTON ─────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── 5. ACTIVE NAVBAR ON SCROLL ────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

/* ─── 6. SCROLL REVEAL ──────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay for multiple items
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ─── 7. SKILL PROGRESS BARS ────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill  = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ─── 8. TYPING ANIMATION ───────────────────────────────────── */
const typedEl = document.getElementById('typed-text');
const roles   = [
    'Python Developer',
    'Django Backend Dev',
    'REST API Engineer',
    'Full-Stack Learner',
    'Problem Solver'
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typedEl.textContent = currentRole.slice(0, ++charIndex);
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000); // pause before deleting
            return;
        }
    } else {
        typedEl.textContent = currentRole.slice(0, --charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

type();

/* ─── 9. PROJECT FILTER ─────────────────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            if (filter === 'all' || tags.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight;    // force reflow
                card.style.animation = '';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ─── 10. PARTICLE CANVAS BACKGROUND ───────────────────────── */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

class Particle {
    constructor() { this.reset(); }

    reset() {
        this.x    = Math.random() * canvas.width;
        this.y    = Math.random() * canvas.height;
        this.r    = Math.random() * 2 + 0.5;
        this.vx   = (Math.random() - 0.5) * 0.5;
        this.vy   = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 238, 255, ${this.alpha})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 238, 255, ${0.15 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ─── 11. EMAILJS CONTACT FORM ──────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = "a4cnMDYqoK1TAWBtd";
const EMAILJS_SERVICE_ID  = "service_n01t62s";
const EMAILJS_TEMPLATE_ID = "template_fwiw14k";

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const status = document.getElementById("form-status");
        const btn    = this.querySelector('input[type="submit"]');

        // Basic validation
        const fullname = this.fullname.value.trim();
        const email    = this.email.value.trim();
        const message  = this.message.value.trim();

        if (!fullname || !email || !message) {
            status.textContent = "⚠️ Please fill in all required fields.";
            status.style.color = "orange";
            return;
        }

        btn.value    = "Sending...";
        btn.disabled = true;

        const templateParams = {
            fullname : fullname,
            email    : email,
            mobile   : this.mobile.value,
            subject  : this.subject.value.trim(),
            message  : message,
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                status.textContent = "✅ Message sent successfully! I'll get back to you soon.";
                status.style.color = "#0ef";
                this.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                status.textContent = "❌ Something went wrong. Please try again.";
                status.style.color = "red";
            })
            .finally(() => {
                btn.value    = "Send Message";
                btn.disabled = false;
            });
    });
}
