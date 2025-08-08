// Screen navigation functions
function showAnnouncements() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('announcements').classList.add('active');
}

function showDashboard() {
    document.getElementById('announcements').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
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