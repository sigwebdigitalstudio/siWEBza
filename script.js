
    document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECCIÓN DE ELEMENTOS ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = menuToggle?.querySelector('i');
    const header = document.querySelector('header');
    const btnScroll = document.getElementById("scrollToTop"); // ID Unificado
    const counters = document.querySelectorAll('.counter');
    const videos = document.querySelectorAll('video');

    // --- 2. NAVEGACIÓN Y MENÚ MÓVIL ---
    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Cierre al hacer clic fuera o en un enlace
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // --- 3. EFECTOS DE SCROLL (Header y Botón Ir Arriba) ---
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Header Sticky
        if (scrollPos > 50) {
            header.style.background = "rgba(5, 5, 5, 0.95)";
            header.style.padding = "10px 0";
        } else {
            header.style.background = "rgba(5, 5, 5, 0.7)";
            header.style.padding = "20px 0";
        }

        // Botón Scroll Top
        if (btnScroll) {
            btnScroll.style.display = scrollPos > 400 ? "block" : "none";
        }
    });

    btnScroll?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- 4. ANIMACIONES DE ENTRADA (Intersection Observer Único) ---
    // Este observador maneja los .reveal, la sección de prueba (trial) y los contadores
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animación de aparición general
                if (entry.target.classList.contains('reveal') || entry.target.classList.contains('trial-content')) {
                    entry.target.classList.add('active');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }

                // Animación de números (solo una vez)
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                    generalObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });

    // Aplicar observador a los elementos
    document.querySelectorAll('.reveal, .trial-content, .counter').forEach(el => {
        // Estilos iniciales para el trial si no están en CSS
        if (el.classList.contains('trial-content')) {
            el.style.transition = "all 1s ease-out";
        }
        generalObserver.observe(el);
    });

    // --- 5. LÓGICA DE CONTADORES ---
    function startCounter(el) {
        const target = +el.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target + "+";
            }
        };
        updateCount();
    }

    // --- 6. MULTIMEDIA AUTO-PLAY ---
    videos.forEach(video => {
        video.play().catch(() => {
            console.log("Autoplay esperando interacción del usuario.");
        });
    });

    // --- 7. INTERACCIÓN PORTAFOLIO ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3')?.innerText;
            console.log(`Proyecto seleccionado: ${name}`);
        });
    });
});