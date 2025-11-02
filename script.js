// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// File upload button functionality
const uploadButton = document.querySelector('.upload-button');
if (uploadButton) {
    uploadButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.pdf';
        input.onchange = async function(e) {
            const file = e.target.files[0];
            if (file) {
                await uploadAndAnalyzeFile(file);
            }
        };
        input.click();
    });
}

// Upload and analyze file
async function uploadAndAnalyzeFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const primaryButton = document.querySelector('.primary-button');
    const originalText = primaryButton ? primaryButton.innerHTML : '';
    
    if (primaryButton) {
        primaryButton.disabled = true;
        primaryButton.innerHTML = `
            <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Analyse du fichier en cours...
        `;
    }
    
    showNotification(`Analyse du fichier: ${file.name}`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            displayAnalysisResults(data.analysis);
            showNotification('Analyse du fichier terminée!', 'success');
        } else {
            throw new Error(data.error || 'Erreur lors de l\'analyse du fichier');
        }
    } catch (error) {
        console.error('File analysis error:', error);
        showNotification(`Erreur: ${error.message}`, 'error');
    } finally {
        if (primaryButton) {
            primaryButton.disabled = false;
            primaryButton.innerHTML = originalText;
        }
    }
}

// API Configuration
const API_BASE_URL = 'http://localhost:5000';

// Primary button functionality - Analyze Text
const primaryButton = document.querySelector('.primary-button');
if (primaryButton) {
    primaryButton.addEventListener('click', async function() {
        const textInput = document.querySelector('.text-input');
        const text = textInput ? textInput.value.trim() : '';
        
        if (!text) {
            showNotification('Veuillez saisir un texte à analyser', 'warning');
            return;
        }
        
        // Show loading state
        const originalText = this.innerHTML;
        this.disabled = true;
        this.innerHTML = `
            <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Analyse en cours...
        `;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                displayAnalysisResults(data.analysis);
                showNotification('Analyse terminée avec succès!', 'success');
            } else {
                throw new Error(data.error || 'Erreur lors de l\'analyse');
            }
        } catch (error) {
            console.error('Analysis error:', error);
            showNotification(`Erreur: ${error.message}`, 'error');
        } finally {
            this.disabled = false;
            this.innerHTML = originalText;
        }
    });
}

// Plan button functionality
const planButtons = document.querySelectorAll('.plan-button');
planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
        console.log('Selected plan:', planName);
        alert(`Vous avez sélectionné le forfait: ${planName}`);
    });
});

// Toggle buttons functionality
const toggleButtons = document.querySelectorAll('.toggle-btn');
toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// FAQ accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
        });
        
        // Toggle current answer
        if (!isActive) {
            answer.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.card, .feature-card, .pricing-card, .partner-card, .stat-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to cards
const cards = document.querySelectorAll('.card, .feature-card, .pricing-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Text input character counter (optional enhancement)
const textInput = document.querySelector('.text-input');
if (textInput) {
    textInput.addEventListener('input', function() {
        const charCount = this.value.length;
        console.log('Character count:', charCount);
        // You can add a character counter display here
    });
}

// CTA buttons functionality
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('CTA clicked:', buttonText);
        
        if (buttonText.includes('Gratuitement')) {
            alert('Redirection vers l\'inscription gratuite...');
        } else if (buttonText.includes('Demo')) {
            alert('Redirection vers la démo...');
        } else if (buttonText.includes('appel')) {
            alert('Redirection vers la page de contact...');
        }
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleEffect = button.getElementsByClassName('ripple')[0];
    if (rippleEffect) {
        rippleEffect.remove();
    }
    
    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Local storage for user preferences
function savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getPreference(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('EmoLetr website loaded successfully');
    
    // Add fade-in animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Check for saved preferences
    const savedTheme = getPreference('theme');
    if (savedTheme) {
        console.log('Saved theme:', savedTheme);
    }
    
    // Check API health
    checkAPIHealth();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized');
        // Add any resize-specific logic here
    }, 250);
});

// Print functionality
function printPage() {
    window.print();
}

// Share functionality (if needed)
function shareContent(platform) {
    const url = window.location.href;
    const title = document.title;
    
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
            break;
    }
}

// Display analysis results
function displayAnalysisResults(analysis) {
    const welcomeSection = document.querySelector('.welcome-section');
    if (!welcomeSection) return;
    
    // Create results HTML
    const resultsHTML = `
        <div class="analysis-results">
            <h3 class="results-title">Résultats de l'Analyse</h3>
            
            <div class="dominant-emotion">
                <h4>Émotion Dominante</h4>
                <div class="emotion-badge">${analysis.dominant_emotion || 'Non détectée'}</div>
                <p class="emotional-tone">Ton émotionnel: <strong>${analysis.emotional_tone || 'Mixte'}</strong></p>
            </div>
            
            <div class="emotions-list">
                <h4>Émotions Détectées</h4>
                ${analysis.emotions ? analysis.emotions.map(emotion => `
                    <div class="emotion-item">
                        <div class="emotion-header">
                            <span class="emotion-name">${emotion.type}</span>
                            <span class="emotion-percentage">${emotion.percentage || emotion.intensity}%</span>
                        </div>
                        <div class="emotion-bar">
                            <div class="emotion-fill" style="width: ${emotion.percentage || emotion.intensity}%"></div>
                        </div>
                        ${emotion.context ? `<p class="emotion-context">${emotion.context}</p>` : ''}
                    </div>
                `).join('') : '<p>Aucune émotion détectée</p>'}
            </div>
            
            ${analysis.cultural_notes ? `
                <div class="cultural-notes">
                    <h4>Notes Culturelles</h4>
                    <p>${analysis.cultural_notes}</p>
                </div>
            ` : ''}
            
            ${analysis.summary ? `
                <div class="analysis-summary">
                    <h4>Résumé</h4>
                    <p>${analysis.summary}</p>
                </div>
            ` : ''}
            
            <button class="export-button" onclick="exportResults()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Exporter les résultats
            </button>
        </div>
    `;
    
    welcomeSection.innerHTML = resultsHTML;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Export results function
function exportResults() {
    const results = document.querySelector('.analysis-results');
    if (!results) return;
    
    // Create a simple text export
    const text = results.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emoletr-analysis-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Résultats exportés avec succès!', 'success');
}

// Check API health on page load
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        
        if (data.status === 'healthy' && data.api_configured) {
            console.log('✅ API is healthy and configured');
        } else if (data.status === 'healthy' && !data.api_configured) {
            console.warn('⚠️ API is running but LLM not configured');
            showNotification('API configurée mais clé LLM manquante. Veuillez configurer votre .env', 'warning');
        }
    } catch (error) {
        console.error('❌ Cannot connect to API:', error);
        showNotification('Impossible de se connecter au serveur. Assurez-vous que le serveur Python est démarré.', 'error');
    }
}

// Export functions for external use
window.EmoLetr = {
    validateEmail,
    savePreference,
    getPreference,
    printPage,
    shareContent,
    displayAnalysisResults,
    showNotification,
    exportResults,
    uploadAndAnalyzeFile
};
