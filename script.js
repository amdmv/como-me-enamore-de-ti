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
        question: "PREGUNTA 1 AQUÍ",
        answers: ["Respuesta A", "Respuesta B", "Respuesta C", "Respuesta D"],
        correct: 0 // índice de la respuesta correcta
    },
    {
        question: "PREGUNTA 2 AQUÍ",
        answers: ["Respuesta A", "Respuesta B", "Respuesta C", "Respuesta D"],
        correct: 1
    },
    {
        question: "PREGUNTA 3 AQUÍ",
        answers: ["Respuesta A", "Respuesta B", "Respuesta C", "Respuesta D"],
        correct: 2
    },
    {
        question: "PREGUNTA 4 AQUÍ",
        answers: ["Respuesta A", "Respuesta B", "Respuesta C", "Respuesta D"],
        correct: 0
    },
    {
        question: "PREGUNTA 5 AQUÍ",
        answers: ["Respuesta A", "Respuesta B", "Respuesta C", "Respuesta D"],
        correct: 3
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
    "RESTAURANTE 1",
    "RESTAURANTE 2",
    "RESTAURANTE 3",
    "RESTAURANTE 4",
    "RESTAURANTE 5",
    "RESTAURANTE 6",
    "RESTAURANTE 7",
    "RESTAURANTE 8"
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
    { text: "TEXTO DE LA HISTORIA 1 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 2 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 3 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 4 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 5 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 6 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 7 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 8 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 9 AQUÍ", image: null },
    { text: "TEXTO DE LA HISTORIA 10 AQUÍ - FIN", image: null }
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
    
    // Update progress
    const progress = ((currentStoryIndex + 1) / storySegments.length) * 100;
    document.getElementById('storyProgress').style.width = progress + '%';
    document.getElementById('storyCounter').textContent = 
        `${currentStoryIndex + 1} / ${storySegments.length}`;
    
    // Hide click indicator on last segment
    if (currentStoryIndex === storySegments.length - 1) {
        document.querySelector('.click-indicator').style.display = 'none';
    }
}

function closeStoryGame() {
    document.getElementById('storyGameContainer').style.display = 'none';
    currentStoryIndex = 0;
}

// ===== GALLERY MODAL =====
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption').textContent;
            
            if (img) {
                modal.classList.add('active');
                modalImg.src = img.src;
                modalCaption.textContent = caption;
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
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