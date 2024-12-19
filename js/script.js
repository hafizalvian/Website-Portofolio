// Mengambil elemen-elemen yang diperlukan
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

// Mengatur toggle menu mobile
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    nav.classList.toggle('menu-open'); // Menambahkan class untuk mengatur tampilan navbar saat menu terbuka
});

// Menutup menu mobile saat link diklik
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        nav.classList.remove('menu-open');
    });
});

// Mengatur scroll halus untuk link navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Konfigurasi Intersection Observer untuk animasi fade-in
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

// Membuat instance Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Mengamati semua elemen dengan class fade-in
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Mengatur highlight link navigasi aktif
const sections = document.querySelectorAll('.scroll-section');
const navItems = document.querySelectorAll('.nav-link');

// Fungsi untuk mengupdate link navigasi aktif
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === currentSection) {
            item.classList.add('active');
        }
    });
}

// Event listener untuk scroll
window.addEventListener('scroll', () => {
    // Mengatur class scrolled pada navbar
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Update link navigasi aktif
    updateActiveNavLink();
});

// Menangani resize window
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        nav.classList.remove('menu-open');
    }
});