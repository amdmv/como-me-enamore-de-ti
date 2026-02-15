// ===== LOVE COUNTER =====
function updateLoveCounter() {
    const startDate = new Date('2025-04-15T00:00:00');
    const now = new Date();
    
    // Calcular diferencia en milisegundos
    const diff = now - startDate;
    
    // Convertir a días totales
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Calcular años, meses y días
    let tempDate = new Date(startDate);
    let years = 0;
    let months = 0;
    let days = 0;
    
    // Calcular años completos
    while (tempDate.setFullYear(tempDate.getFullYear() + 1) <= now) {
        years++;
    }
    tempDate.setFullYear(tempDate.getFullYear() - 1);
    
    // Calcular meses completos
    while (tempDate.setMonth(tempDate.getMonth() + 1) <= now) {
        months++;
    }
    tempDate.setMonth(tempDate.getMonth() - 1);
    
    // Calcular días restantes
    days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    
    // Actualizar el DOM
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('totalDays').textContent = totalDays;
}

// Actualizar contador cada segundo
setInterval(updateLoveCounter, 1000);
updateLoveCounter(); // Llamada inicial

// ===== EASTER EGGS =====
const foundEasterEggs = new Set();
const totalEasterEggs = 6;

document.addEventListener('DOMContentLoaded', () => {
    const easterEggTriggers = document.querySelectorAll('.easter-egg-trigger');
    const easterEggModal = document.getElementById('easterEggModal');
    const easterEggImage = document.getElementById('easterEggImage');
    const easterEggClose = document.querySelector('.easteregg-close');
    const eggCounter = document.getElementById('eggCounter');
    
    // Configurar triggers de easter eggs
    easterEggTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const eggNumber = this.getAttribute('data-easteregg');
            
            if (!foundEasterEggs.has(eggNumber)) {
                foundEasterEggs.add(eggNumber);
                this.classList.add('found');
                
                // Mostrar modal con imagen
                easterEggImage.src = `fotos/easteregg (${eggNumber}).jpeg`;
                easterEggModal.classList.add('active');
                eggCounter.textContent = foundEasterEggs.size;
                document.body.style.overflow = 'hidden';
                
                // Animación de confeti
                createConfetti();
                
                // Guardar en localStorage
                localStorage.setItem('foundEasterEggs', JSON.stringify([...foundEasterEggs]));
            }
        });
    });
    
    // Cerrar modal
    if (easterEggClose) {
        easterEggClose.addEventListener('click', closeEasterEggModal);
    }
    
    if (easterEggModal) {
        easterEggModal.addEventListener('click', (e) => {
            if (e.target === easterEggModal) {
                closeEasterEggModal();
            }
        });
    }
    
    // Cargar easter eggs encontrados previamente
    const savedEggs = localStorage.getItem('foundEasterEggs');
    if (savedEggs) {
        const saved = JSON.parse(savedEggs);
        saved.forEach(eggNum => {
            foundEasterEggs.add(eggNum);
            const trigger = document.querySelector(`[data-easteregg="${eggNum}"]`);
            if (trigger) trigger.classList.add('found');
        });
        eggCounter.textContent = foundEasterEggs.size;
    }
});

function closeEasterEggModal() {
    const modal = document.getElementById('easterEggModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function createConfetti() {
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Añadir animación de confeti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ===== NAVIGATION MENU =====
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation between sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// ===== QUIZ GAME =====
const quizQuestions = [
    {
        question: "¿Cuál es mi color favorito?",
        answers: ["Rojo", "Verde", "Amarillo", "Morado vegetil"],
        correct: 0 // índice de la respuesta correcta
    },
    {
        question: "Como norma general, en una vía interurbana la parada y el estacionamiento se realizarán...",
        answers: ["siempre fuera de la calzada, en el lado derecho de la misma y dejando libre la parte transitable del arcén.", "en el arcén, cuando sea transitable y suficiente.", "¿Cómo, disculpa?", "siempre en el arcén."],
        correct: 2
    },
    {
        question: "¿Qué dijo Álvaro antes de lanzarse la primera vez?",
        answers: ["Ven pa' aquí que te voy a comer to' el boquino", "Guapa tú", "Iulius pater romanus est", "Salió a la disco a bailar una diva virtual... chequea como se menea"],
        correct: 1
    },
    {
        question: "Sigue la canción en la que Ainhoa siempre se equivoca: Navegando en mi automóvil hablando con la nena por el móvil dime que vamos a hacer...",
        answers: ["si quieres yo te busco me puedes coquetear mientras conduzco dale que te quiero ver", "si quieres te seduzco te puedo regalar un buen molusco no me lo puedo creer", "linda mujer sabes que te amo de la cabeza a los pies y si quieres un castillo dorado eso te daré", "si quieres yo te busco me puedes bellaquear mientras conduzco dale que te quiero ver"],
        correct: 3
    },
    {
        question: "¿Cómo se llamaba el restaurante de la primera cita?",
        answers: ["La Rosa", "Restaurante Chino Shangai", "艾尼霍阿", "Domino's Pizza"],
        correct: 1
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;

function startQuiz() {
    document.getElementById('quizContainer').style.display = 'block';
    currentQuizQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;
    document.getElementById('score').textContent = quizScore;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    document.getElementById('currentQuestion').textContent = currentQuizQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    selectedAnswer = null;
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.textContent = answer;
        answerDiv.onclick = () => selectAnswer(index, answerDiv);
        answersContainer.appendChild(answerDiv);
    });
    
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('restartQuiz').style.display = 'none';
}

function selectAnswer(index, element) {
    if (selectedAnswer !== null) return; // Ya se seleccionó una respuesta
    
    selectedAnswer = index;
    const question = quizQuestions[currentQuizQuestion];
    const allOptions = document.querySelectorAll('.answer-option');
    
    allOptions.forEach((opt, i) => {
        if (i === question.correct) {
            opt.classList.add('correct');
        } else if (i === index && i !== question.correct) {
            opt.classList.add('incorrect');
        }
        opt.style.pointerEvents = 'none';
    });
    
    if (index === question.correct) {
        quizScore++;
        document.getElementById('score').textContent = quizScore;
    }
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
        document.getElementById('nextButton').style.display = 'block';
    } else {
        // Quiz finished
        setTimeout(() => {
            document.getElementById('questionText').textContent = 
                `¡Quiz completado! Puntuación final: ${quizScore}/${quizQuestions.length}`;
            document.getElementById('answersContainer').innerHTML = '';
            document.getElementById('restartQuiz').style.display = 'block';
        }, 1500);
    }
}

function nextQuestion() {
    currentQuizQuestion++;
    showQuestion();
}

function restartQuiz() {
    startQuiz();
}

// ===== TIERLIST GAME =====
const restaurants = [
    "MYA SUSHI",
    "Chino de la Rosa",
    "Muerde la Pasta",
    "Wok",
    "100 Montaditos",
    "Ciao",
    "Five Guys",
    "Taco Bell",
    "McDonald's",
    "Kebab Estrella"
];

function startTierlist() {
    document.getElementById('tierlistContainer').style.display = 'block';
    const container = document.getElementById('restaurantsContainer');
    container.innerHTML = '';
    
    restaurants.forEach((restaurant, index) => {
        const item = document.createElement('div');
        item.className = 'restaurant-item';
        item.textContent = restaurant;
        item.draggable = true;
        item.dataset.restaurant = restaurant;
        
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        
        container.appendChild(item);
    });
    
    // Setup drop zones
    document.querySelectorAll('.tier-items').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
    
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragleave', handleDragLeave);
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'move';
}

function handleDragLeave(e) {
    if (e.target.classList.contains('tier-items') || e.target.classList.contains('restaurants-container')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedElement) {
        this.appendChild(draggedElement);
    }
}

function closeTierlist() {
    document.getElementById('tierlistContainer').style.display = 'none';
}

// ===== STORY GAME =====
const storySegments = [
    { text: "Ainhoa y Álvaro se conocieron de no muy buenas maneras.", image: "historia/1.jpg" },
    { text: "Cayeron en la misma clase y ya se empezaron a llevar bien.", image: "historia/2.jpg" },
    { text: "Volvieron a caer juntos pero se empezaron a llevar mejor...", image: "historia/3.jpg" },
    { text: "Se enamoraron y se prometieron estar juntos para siempre.", image: "historia/4.jpg" },
    { text: "Se mudaron juntos y comenzaron su vida independiente.", image: "historia/5.jpg" },
    { text: "Se prometieron y se casaron en el día más bonito de sus vidas.", image: "historia/6.jpg" },
    { text: "Tuvieron dos hijos y se convirtieron en las personas más felices del planeta.", image: "historia/7.jpg" },
    { text: "Vivieron toda su vida juntos y envejecieron el uno al lado del otro como se prometieron de jóvenes.", image: "historia/8.jpg" }
];

let currentStoryIndex = 0;

function startStoryGame() {
    document.getElementById('storyGameContainer').style.display = 'block';
    currentStoryIndex = 0;
    updateStory();
    
    document.querySelector('.story-text-box').onclick = advanceStory;
}

function advanceStory() {
    if (currentStoryIndex < storySegments.length - 1) {
        currentStoryIndex++;
        updateStory();
    }
}

function updateStory() {
    const segment = storySegments[currentStoryIndex];
    document.getElementById('storyText').textContent = segment.text;
    
    // Update image
    const storyImageContainer = document.getElementById('storyImage');
    if (segment.image) {
        // Si hay imagen, mostrarla
        storyImageContainer.innerHTML = `<img src="${segment.image}" alt="Historia ${currentStoryIndex + 1}" style="width: 100%; height: 100%; object-fit: contain;">`;
    } else {
        // Si no hay imagen, mostrar placeholder
        storyImageContainer.innerHTML = '<div class="story-placeholder"><span>💝</span></div>';
    }
    
    // Update progress
    const progress = ((currentStoryIndex + 1) / storySegments.length) * 100;
    document.getElementById('storyProgress').style.width = progress + '%';
    document.getElementById('storyCounter').textContent = 
        `${currentStoryIndex + 1} / ${storySegments.length}`;
    
    // Hide click indicator on last segment
    if (currentStoryIndex === storySegments.length - 1) {
        document.querySelector('.click-indicator').style.display = 'none';
    } else {
        document.querySelector('.click-indicator').style.display = 'block';
    }
}

function closeStoryGame() {
    document.getElementById('storyGameContainer').style.display = 'none';
    currentStoryIndex = 0;
    // Restaurar el indicador de click
    const indicator = document.querySelector('.click-indicator');
    if (indicator) {
        indicator.style.display = 'block';
    }
}

// ===== GALLERY MODAL =====
// Variables globales del modal
let modal, modalImg, modalCaption, closeModal;

// Función para abrir modal (global)
function openImageModal(imgSrc, altText) {
    if (!modal) return;
    modal.classList.add('active');
    modalImg.src = imgSrc;
    modalCaption.textContent = altText || '';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar modal (global)
function closeImageModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Añadir event listeners a las fotos de la timeline (global)
function setupTimelineImages() {
    const timelineImages = document.querySelectorAll('.timeline-image img, .timeline-content img');
    
    timelineImages.forEach(img => {
        // Hacer que el contenedor sea clickeable
        const container = img.closest('.timeline-image') || img.parentElement;
        
        // Evitar añadir múltiples event listeners
        if (container.dataset.modalSetup === 'true') return;
        container.dataset.modalSetup = 'true';
        
        // Añadir cursor pointer
        container.style.cursor = 'pointer';
        
        // Añadir efecto hover
        container.addEventListener('mouseenter', function() {
            if (img.complete && img.naturalWidth > 0) {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Añadir click para abrir modal
        container.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que se active el evento del timeline-item
            
            if (img && img.complete && img.naturalWidth > 0) {
                // La imagen existe y está cargada
                openImageModal(img.src, img.alt || 'Foto de la timeline');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('galleryModal');
    modalImg = document.getElementById('modalImage');
    modalCaption = document.getElementById('modalCaption');
    closeModal = document.querySelector('.modal-close');
    
    // Añadir event listeners a las fotos cuando se carguen
    function setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                
                if (img && img.complete && img.naturalWidth > 0) {
                    // La imagen existe y está cargada
                    const caption = this.querySelector('.gallery-caption');
                    openImageModal(img.src, caption ? caption.textContent : img.alt);
                }
            });
        });
    }
    
    // Configurar items inicialmente
    setupGalleryItems();
    setupTimelineImages();
    
    // Reconfigurar cuando cambie de sección (por si acaso)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                setupGalleryItems();
                setupTimelineImages();
            }, 100);
        });
    });
    
    // Cerrar con botón X
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }
    
    // Cerrar al hacer click fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeImageModal();
        }
    });
});

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
    const timelineItems = document.querySelectorAll('.timeline-item:not(.mallorca-item):not(.sevilla-item)');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observador especial para la sección de Sevilla
    const sevillaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger decorations animation
                const decorations = document.querySelectorAll('.sevilla-decorations .farol, .flamenco-dancer');
                decorations.forEach((deco, index) => {
                    setTimeout(() => {
                        deco.style.opacity = '1';
                        deco.style.transform = 'scale(1)';
                    }, index * 200);
                });
                sevillaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const sevillaSection = document.querySelector('.sevilla-section');
    if (sevillaSection) {
        sevillaObserver.observe(sevillaSection);
        // Set initial state for decorations
        const decorations = document.querySelectorAll('.sevilla-decorations .farol, .flamenco-dancer');
        decorations.forEach(deco => {
            deco.style.opacity = '0';
            deco.style.transform = 'scale(0)';
            deco.style.transition = 'all 0.5s ease';
        });
    }

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
    
    // Reconfigurar imágenes de timeline después de un breve delay (para imágenes que cargan tarde)
    setTimeout(() => {
        if (typeof setupTimelineImages === 'function') {
            setupTimelineImages();
        }
    }, 1000);
    
    // Observer para detectar cuando se añaden nuevas imágenes
    const imageObserver = new MutationObserver(() => {
        if (typeof setupTimelineImages === 'function') {
            setupTimelineImages();
        }
    });
    
    // Observar cambios en las secciones de timeline
    document.querySelectorAll('.timeline-section, .sevilla-section, .mallorca-section').forEach(section => {
        imageObserver.observe(section, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src']
        });
    });
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