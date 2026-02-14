// Intersection Observer para animaciones de timeline
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Añadir delay escalonado para efecto cascada
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los items de la timeline
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item:not(.mallorca-item)');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observador especial para la sección de Mallorca
    const mallorcaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger airplane animation
                const airplane = document.querySelector('.airplane-container');
                if (airplane) {
                    airplane.style.animationPlayState = 'running';
                }
                mallorcaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const mallorcaSection = document.querySelector('.mallorca-section');
    if (mallorcaSection) {
        mallorcaObserver.observe(mallorcaSection);
    }

    // Smooth scroll para el indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const timelineSection = document.querySelector('.timeline-section');
            timelineSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Parallax suave para los corazones de fondo
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hearts = document.querySelectorAll('.heart');
                
                hearts.forEach((heart, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrolled * speed;
                    heart.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Función para manejar la carga de imágenes
    setupImageHandling();
});

// Manejo de imágenes (para cuando el usuario añada sus propias fotos)
function setupImageHandling() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        // El usuario puede reemplazar el placeholder con una imagen real
        // Ejemplo: <img src="ruta/a/tu/imagen.jpg" alt="Descripción">
        
        // Si hay una imagen dentro del placeholder, ajustar estilos
        const img = placeholder.querySelector('img');
        if (img) {
            placeholder.style.border = 'none';
            placeholder.style.background = 'transparent';
        }
    });
}

// Efecto de hover mejorado para las imágenes
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.timeline-image');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(1.03)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Easter egg: Click en el corazón del footer
document.addEventListener('DOMContentLoaded', () => {
    const footerHeart = document.querySelector('.footer-heart');
    let clickCount = 0;
    
    if (footerHeart) {
        footerHeart.addEventListener('click', () => {
            clickCount++;
            
            // Crear corazones flotantes
            createFloatingHeart(event.clientX, event.clientY);
            
            if (clickCount >= 5) {
                createHeartExplosion();
                clickCount = 0;
            }
        });
    }
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFloatingHeart(x, y);
        }, i * 100);
    }
}

// Animación CSS para corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-200px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);