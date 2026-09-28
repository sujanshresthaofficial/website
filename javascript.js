// Load a shared HTML component (header / footer) into a placeholder
function loadComponent(id, file) {
    const target = document.getElementById(id);
    if (!target) return;

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`${file} returned ${response.status}`);
            return response.text();
        })
        .then(data => {
            target.innerHTML = data;

            if (id === 'header-placeholder') {
                const navToggle = document.getElementById('modeToggle');
                if (!navToggle) return;
                navToggle.checked = document.body.classList.contains('dark-mode');
                navToggle.addEventListener('change', switchTheme);
            }
        })
        .catch(err => console.error('Error loading component:', err));
}

// Light / dark theme switch
function switchTheme(e) {
    const dark = e.target.checked;
    document.body.classList.toggle('dark-mode', dark);
    try {
        localStorage.setItem('theme', dark ? 'dark-mode' : 'light-mode');
    } catch (err) { /* storage unavailable - ignore */ }
}

// Mobile menu
document.addEventListener('click', function (e) {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    if (e.target.closest('#mobile-menu')) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (e.target.closest('.navigation a')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Typewriter effect for the hero
const words = ['IT Student', 'Web Developer', 'Former Teacher', 'Rotaractor'];
let wordIndex = 0;

function typingEffect() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const letters = words[wordIndex].split('');
    (function loopTyping() {
        if (letters.length > 0) {
            el.textContent += letters.shift();
            setTimeout(loopTyping, 100);
        } else {
            setTimeout(deletingEffect, 2000);
        }
    })();
}

function deletingEffect() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let word = words[wordIndex];
    (function loopDeleting() {
        if (word.length > 0) {
            word = word.substring(0, word.length - 1);
            el.textContent = word;
            setTimeout(loopDeleting, 60);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typingEffect, 500);
        }
    })();
}

// Contact form: 250-character counter
function initMessageCounter() {
    const message = document.getElementById('message');
    if (!message) return;

    const counter = document.getElementById('char-counter');
    const warning = document.getElementById('warning-msg');
    const reach = document.getElementById('reach-msg');

    message.addEventListener('input', function () {
        const current = this.value.length;

        counter.textContent = `${current} / 250`;
        warning.style.display = (current >= 240 && current < 250) ? 'block' : 'none';
        reach.style.display = (current === 250) ? 'block' : 'none';
        counter.style.color = current >= 250 ? '#ff4d4d' : 'var(--accent-blue)';
    });
}

// Entry point
window.addEventListener('DOMContentLoaded', function () {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    initMessageCounter();

    if (document.getElementById('typewriter')) {
        setTimeout(typingEffect, 400);
    }
});