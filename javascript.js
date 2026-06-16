// Global component async fetch orchestrator
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === 'header-placeholder') {
                const navToggle = document.getElementById('modeToggle');
                const currentTheme = localStorage.getItem('theme') || 'light-mode';

                if (currentTheme === 'dark-mode') {
                    navToggle.checked = true;
                    document.body.classList.add('dark-mode');
                }
                navToggle.addEventListener('change', switchTheme);
            }
        }).catch(err => console.error("Error loading component:", err));
}

// Mobile Responsive Navigation Sidebar Drawer Toggles
document.addEventListener('click', function (e) {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (e.target.closest('#mobile-menu')) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (e.target.closest('.navigation a')) {
        menuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Light / Dark configuration setting switch rules
function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
}

// Built-in Lightweight Typewriter Sequence for the Hero Block
const words = ["IT Student", "Web Developer", "Former Teacher", "Rotaractor"];
let i = 0, timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function () {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i];
    var loopDeleting = function () {
        if (word.length > 0) {
            word = word.substring(0, word.length - 1);
            document.getElementById('typewriter').innerHTML = word;
        } else {
            i = (words.length > i + 1) ? i + 1 : 0;
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
}

// Core app entry initializer
window.addEventListener('DOMContentLoaded', function () {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // Safety fallback run for typewriter element if active on page
    setTimeout(() => {
        if (document.getElementById('typewriter')) {
            typingEffect();
        }
    }, 400);
});

// Max Length Counter
document.getElementById('message').addEventListener('input', function () {
    const counter = document.getElementById('char-counter');
    const warning = document.getElementById('warning-msg');
    const reach = document.getElementById('reach-msg');
    const current = this.value.length;

    counter.textContent = `${current} / 250`;

    warning.style.display = (current >= 240 && current < 250) ? "block" : "none";
    reach.style.display = (current == 250) ? "block" : "none";

    counter.style.color = current >= 250 ? "#ff4d4d" : "var(--accent-blue)";
});


// 1. Disable Right-Click (Context Menu)
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Block Keyboard Shortcuts for Inspect Element and View Source
document.onkeydown = function (e) {
    // Block F12 (DevTools)
    if (e.keyCode == 123) {
        return false;
    }

    // Block Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }

    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }

    // Block Ctrl+Shift+C (Element Selector)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }

    // Block Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }

    // Block Ctrl+S (Prevent saving the page)
    if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
        return false;
    }
};

// 2. Disable Copy, Cut, and Paste
document.addEventListener('copy', (e) => {
    e.preventDefault();
    alert("Copying content is disabled on this portfolio.");
});
document.addEventListener('cut', (e) => e.preventDefault());

// 3. Block Keyboard Shortcuts
document.onkeydown = function (e) {
    // Block F12
    if (e.keyCode == 123) return false;

    // Block Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+X (Cut), Ctrl+A (Select All)
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 65)) {
        return false;
    }

    // Block Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;

    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;

    // Block Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};



// Bulletproof Mobile Menu Trigger
document.addEventListener('click', function (e) {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    // If clicking the hamburger button or bars inside it
    if (e.target.closest('#mobile-menu')) {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent background scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Close menu when clicking a navigation link
    if (e.target.closest('.navigation a')) {
        menuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});