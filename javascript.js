// Function to load external HTML
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === 'header-placeholder') {
                const navToggle = document.getElementById('modeToggle');
                const currentTheme = localStorage.getItem('theme');
                if (currentTheme === 'dark-mode') navToggle.checked = true;
                navToggle.addEventListener('change', switchTheme);
            }
        });
}

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

window.addEventListener('load', function() {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    type(); // Start typewriter
});


// Theme controller
const toggleSwitch = document.getElementById('modeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
}

// Function to load external HTML
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            // Re-initialize theme toggle if it was loaded in the header
            if (id === 'header-placeholder') {
                const navToggle = document.getElementById('modeToggle');
                if (currentTheme === 'dark-mode') navToggle.checked = true;
                navToggle.addEventListener('change', switchTheme);
            }
        });
}

window.addEventListener('load', function() {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});


const textElement = document.getElementById('typewriter');
const phrases = ["Web Developer", "Creative Thinker", "Learner", "Tech Enthusiast", "Former Educator"];
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    // Determine speed based on state
    // Typing: 80ms | Erasing: 40ms | Pause at end: 1200ms
    let typeSpeed = isDeleting ? 40 : 60;

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
    }

    // Logic transitions
    if (!isDeleting && characterIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 4200; // Time the visitor reads the full word
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 300; // Short pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Ensure effect starts after dynamic header/footer loading
window.addEventListener('load', type);

// Max Length Counter
document.getElementById('message').addEventListener('input', function() {
    const counter = document.getElementById('char-counter');
    const warning = document.getElementById('warning-msg');
    const reach = document.getElementById('reach-msg');
    const current = this.value.length;
    
    counter.textContent = `${current} / 250`;
    
    warning.style.display = (current >= 240 && current < 250) ? "block" : "none";
    reach.style.display = (current == 250) ? "block" : "none";
    
    counter.style.color = current >= 250 ? "#ff4d4d" : "var(--accent-blue)";
});