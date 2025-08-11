// Login form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const remember = document.getElementById('remember').checked;
            
            // Basic validation
            if (!username || !password) {
                showLoginError('Please fill in all fields');
                return;
            }
            
            // Validate student number format (should start with 's' followed by 7 digits)
            if (!username.match(/^s\d{7}$/)) {
                showLoginError('Please enter a valid student number (e.g., s2171023)');
                highlightInputError('username');
                return;
            }
            
            // Simulate login process
            showLoginLoading();
            
            // Simulate API call delay
            setTimeout(() => {
                // Check if student page exists
                if (checkStudentPageExists(username)) {
                    highlightInputSuccess('username');
                    highlightInputSuccess('password');
                    showLoginSuccess();
                    // Redirect to the specific student page after success message
                    setTimeout(() => {
                        window.location.href = username + '.html';
                    }, 1500);
                } else {
                    showLoginError('Login failed - Student not found');
                    highlightInputError('username');
                }
            }, 1500);
        });
    }
});

// Function to check if a student page exists
function checkStudentPageExists(studentNumber) {
    // List of valid student numbers that have pages
    const validStudentNumbers = [
        's2171023', // Daphne Varekamp
        's2169487', // Smaranda Franciuc
        's2157892', // Aleksandar Ivanov
        's2183051'  // Florin Stoica
    ];
    
    return validStudentNumbers.includes(studentNumber);
}

// Function to highlight input field with error styling
function highlightInputError(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.classList.add('error');
        // Remove error styling after 3 seconds
        setTimeout(() => {
            input.classList.remove('error');
        }, 3000);
    }
}

// Function to highlight input field with success styling
function highlightInputSuccess(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.classList.add('success');
        // Remove success styling after 2 seconds
        setTimeout(() => {
            input.classList.remove('success');
        }, 2000);
    }
}

function showLoginLoading() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Signing In...</span>';
        loginBtn.disabled = true;
    }
}

function showLoginSuccess() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-check"></i><span>Success!</span>';
        loginBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
            loginBtn.style.background = 'linear-gradient(135deg, #001157 0%, #0026b3 100%)';
            loginBtn.disabled = false;
        }, 2000);
    }
}

function showLoginError(message) {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
        loginBtn.disabled = false;
    }
    
    // Create error message element
    let errorElement = document.querySelector('.login-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'login-error';
        errorElement.style.cssText = `
            background: #e74c3c;
            color: white;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
        `;
        
        const form = document.querySelector('.login-form');
        if (form) {
            form.insertBefore(errorElement, form.firstChild);
        }
    }
    
    errorElement.textContent = message;
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorElement && errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

// Screen navigation functions
function showAnnouncements() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('announcements').classList.add('active');
    
    // Remove sports tab and related content
    removeSportsTab();
}

function showStudentID() {
    // Show loading screen first
    showStudentIDLoading();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('student-id').classList.add('active');
        
        // Hide loading screen
        hideStudentIDLoading();
    }, 1000);
}

function showDashboard() {
    document.getElementById('announcements').classList.remove('active');
    document.getElementById('student-id').classList.remove('active');
    document.getElementById('results').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
}

function showResults() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('announcements').classList.remove('active');
    document.getElementById('student-id').classList.remove('active');
    document.getElementById('results').classList.add('active');
}

// Function to show loading screen for Student ID
function showStudentIDLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
        // Update loading text for Student ID
        const loadingText = loadingOverlay.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = 'Loading Student ID...';
        }
    }
}

// Function to hide loading screen for Student ID
function hideStudentIDLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
        // Reset loading text
        const loadingText = loadingOverlay.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = 'Refreshing...';
        }
    }
}

// Function to remove sports tab and related content
function removeSportsTab() {
    // Remove sports tab from filter tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent === 'Sports') {
            tab.remove();
        }
    });
    
    // Remove sports announcement cards
    const sportsCards = document.querySelectorAll('.card-tag.sports');
    sportsCards.forEach(card => {
        const announcementCard = card.closest('.announcement-card');
        if (announcementCard) {
            announcementCard.remove();
        }
    });
}

// Function to format current date
function formatCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
}

// Function to format current time
function formatCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
}

// Function to get current study year (Dutch system: Aug-Jul)
function getCurrentStudyYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    
    // Dutch study year: August (8) to July (7)
    if (currentMonth >= 8) {
        // August to December: current year - next year
        return `${currentYear}-${currentYear + 1}`;
    } else {
        // January to July: previous year - current year
        return `${currentYear - 1}-${currentYear}`;
    }
}

// Function to refresh the timestamp
function refreshTimestamp() {
    const idTimestampElement = document.getElementById('id-timestamp');
    const refreshIcon = document.getElementById('refresh-timestamp');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (idTimestampElement && refreshIcon && loadingOverlay) {
        // Show loading screen
        loadingOverlay.classList.add('active');
        
        // Add rotation animation to refresh icon
        refreshIcon.style.transform = 'rotate(360deg)';
        
        // Simulate a brief loading delay (500ms) for better UX
        setTimeout(() => {
            // Update timestamp
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            idTimestampElement.textContent = now.toLocaleDateString('en-US', options);
            
            // Hide loading screen
            loadingOverlay.classList.remove('active');
            
            // Reset refresh icon rotation
            refreshIcon.style.transform = 'rotate(0deg)';
        }, 500);
    }
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current date and time
    const currentDateElement = document.getElementById('current-date');
    const currentTimeElement = document.getElementById('current-time');
    
    if (currentDateElement) {
        currentDateElement.textContent = formatCurrentDate();
    }
    
    if (currentTimeElement) {
        currentTimeElement.textContent = formatCurrentTime();
    }
    
    // Set ID card timestamp
    const idTimestampElement = document.getElementById('id-timestamp');
    if (idTimestampElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        idTimestampElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Set study year
    const studyYearElement = document.getElementById('study-year');
    if (studyYearElement) {
        studyYearElement.textContent = getCurrentStudyYear();
    }
    
    // Update time every minute
    setInterval(() => {
        if (currentTimeElement) {
            currentTimeElement.textContent = formatCurrentTime();
        }
    }, 60000);

    // Filter tabs functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Bottom navigation functionality
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all nav tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked nav tab
            this.classList.add('active');
        });
    });

    // Navigation grid item hover effects
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });


});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function() {}, {passive: true}); 