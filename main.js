document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const modalCloseButtons = document.querySelectorAll('.modal__close');
    
    // Show login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Show signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            signupModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Switch between login and signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('show');
            signupModal.classList.add('show');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('show');
            loginModal.classList.add('show');
        });
    }
    
    // Close modals
    modalCloseButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.classList.remove('show');
            signupModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal || event.target === signupModal) {
            loginModal.classList.remove('show');
            signupModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    // Tag input functionality
    const tagInputs = document.querySelectorAll('.tag-input__input');
    
    tagInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const tagText = this.value.trim();
                
                if (tagText) {
                    // Create tag element
                    const tagContainer = this.parentElement;
                    const tag = document.createElement('span');
                    tag.className = 'tag-input__tag';
                    tag.innerHTML = `${tagText}<i class="fas fa-times"></i>`;
                    
                    // Add delete functionality
                    tag.querySelector('i').addEventListener('click', function() {
                        tag.remove();
                    });
                    
                    // Insert tag before the input
                    tagContainer.insertBefore(tag, this);
                    
                    // Clear input
                    this.value = '';
                }
            }
        });
    });
    
    // Tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        element.addEventListener('mouseenter', function() {
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10 + window.scrollY}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            setTimeout(() => tooltip.classList.add('show'), 10);
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(tooltip)) {
                    document.body.removeChild(tooltip);
                }
            }, 200);
        });
    });
    
    // Dropdown menus
    const dropdownToggles = document.querySelectorAll('.dropdown__toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('show');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.nextElementSibling.classList.remove('show');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    });

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Handle login modal from URL parameter
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a login parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const showLogin = urlParams.get('login');
    
    if (showLogin === 'true') {
        // Show login modal if redirected from registration page
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('show');
            // Clean the URL
            history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // Existing login modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.modal__close');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// Add this script to handle modern interactions and fix the header on scroll

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Login modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.querySelector('.modal__close');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('show');
            document.body.classList.add('modal-open');
        });
        
        closeModalBtn.addEventListener('click', function() {
            loginModal.classList.remove('show');
            document.body.classList.remove('modal-open');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const popularTags = document.querySelectorAll('.tag');
    
    if (searchInput && popularTags) {
        // Focus search input when clicking on the search container
        document.querySelector('.search-wrapper').addEventListener('click', function() {
            searchInput.focus();
        });
        
        // Handle popular tag clicks
        popularTags.forEach(tag => {
            tag.addEventListener('click', function() {
                searchInput.value = this.textContent;
                searchInput.focus();
            });
        });
        
        // Search button click
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                if (searchInput.value.trim()) {
                    // Redirect to search results page
                    window.location.href = `pages/browse.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                }
            });
            
            // Enter key in search field
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    window.location.href = `pages/browse.html?q=${encodeURIComponent(this.value.trim())}`;
                }
            });
        }
    }
});

// Timeline functionality for hackathon schedule
document.addEventListener('DOMContentLoaded', function() {
    // Day tab switching
    const dayTabs = document.querySelectorAll('.day-tab');
    if (dayTabs.length > 0) {
        dayTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                dayTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all day schedules
                const daySchedules = document.querySelectorAll('.day-schedule');
                daySchedules.forEach(schedule => schedule.classList.remove('active'));
                
                // Show the selected day schedule
                const dayId = this.getAttribute('data-day');
                document.getElementById(dayId + '-schedule').classList.add('active');
            });
        });
    }
    
    // Previous/Next day navigation
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    
    if (prevDayBtn && nextDayBtn) {
        prevDayBtn.addEventListener('click', function() {
            navigateDay('prev');
        });
        
        nextDayBtn.addEventListener('click', function() {
            navigateDay('next');
        });
    }
    
    // Function to navigate between days
    function navigateDay(direction) {
        const activeTab = document.querySelector('.day-tab.active');
        if (!activeTab) return;
        
        let targetTab;
        if (direction === 'prev') {
            targetTab = activeTab.previousElementSibling;
            if (!targetTab || !targetTab.classList.contains('day-tab')) {
                targetTab = document.querySelector('.day-tab:last-child');
            }
        } else {
            targetTab = activeTab.nextElementSibling;
            if (!targetTab || !targetTab.classList.contains('day-tab')) {
                targetTab = document.querySelector('.day-tab:first-child');
            }
        }
        
        if (targetTab) {
            targetTab.click();
        }
    }
    
    // Add Event button functionality
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            alert('Add Event functionality will be available in the next update.');
        });
    }
});

// Enhanced workspace tabs functionality with debugging
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - looking for workspace tabs');
    
    const workspaceTabs = document.querySelectorAll('.workspace-tab');
    console.log('Found ' + workspaceTabs.length + ' workspace tabs');
    
    if (workspaceTabs.length > 0) {
        workspaceTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const tabId = this.getAttribute('data-tab');
                console.log('Tab clicked:', tabId);
                
                if (!tabId) {
                    console.error('No data-tab attribute found on tab:', this);
                    return;
                }
                
                // Remove active class from all tabs
                workspaceTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Find the target tab content
                const targetTabContentId = tabId + '-tab';
                const targetTabContent = document.getElementById(targetTabContentId);
                
                if (!targetTabContent) {
                    console.error('No tab content found with ID:', targetTabContentId);
                    return;
                }
                
                // Hide all tab contents
                const tabContents = document.querySelectorAll('.tab-content');
                console.log('Found ' + tabContents.length + ' tab content areas');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the target tab content
                console.log('Activating tab content:', targetTabContentId);
                targetTabContent.classList.add('active');
            });
        });
        
        console.log('Tab event listeners successfully added');
    } else {
        console.warn('No workspace tabs found on this page');
    }
});

// Timeline tab functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing timeline functionality');
    
    // Day tabs navigation
    const dayTabs = document.querySelectorAll('.day-tab');
    if (dayTabs.length > 0) {
        console.log('Found day tabs:', dayTabs.length);
        
        dayTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                dayTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all day schedules
                const daySchedules = document.querySelectorAll('.day-schedule');
                daySchedules.forEach(schedule => schedule.classList.remove('active'));
                
                // Show the selected day schedule
                const dayId = this.getAttribute('data-day');
                const targetSchedule = document.getElementById(dayId + '-schedule');
                if (targetSchedule) {
                    targetSchedule.classList.add('active');
                }
                
                // Update the timeline navigation text
                const currentDayIndex = Array.from(dayTabs).findIndex(t => t === this) + 1;
                const totalDays = dayTabs.length;
                const currentViewText = document.querySelector('.timeline-current-view');
                if (currentViewText) {
                    currentViewText.textContent = `Day ${currentDayIndex} of ${totalDays}`;
                }
                
                console.log(`Switched to ${dayId}, day ${currentDayIndex} of ${totalDays}`);
            });
        });
    }
    
    // Previous/Next day navigation
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    
    if (prevDayBtn && nextDayBtn) {
        prevDayBtn.addEventListener('click', function() {
            navigateDay('prev');
        });
        
        nextDayBtn.addEventListener('click', function() {
            navigateDay('next');
        });
    }
    
    // Function to navigate between days
    function navigateDay(direction) {
        const activeTab = document.querySelector('.day-tab.active');
        if (!activeTab) return;
        
        let targetTab;
        if (direction === 'prev') {
            targetTab = activeTab.previousElementSibling;
            if (!targetTab || !targetTab.classList.contains('day-tab')) {
                targetTab = document.querySelector('.day-tab:last-child');
            }
        } else {
            targetTab = activeTab.nextElementSibling;
            if (!targetTab || !targetTab.classList.contains('day-tab')) {
                targetTab = document.querySelector('.day-tab:first-child');
            }
        }
        
        if (targetTab) {
            targetTab.click();
        }
    }
    
    // View toggle (timeline/calendar)
    const viewToggleButtons = document.querySelectorAll('.timeline-header-right .btn-icon');
    if (viewToggleButtons.length > 0) {
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewToggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // In a real implementation, this would toggle between timeline and calendar views
                // For now, we'll just log the action
                const viewType = this.getAttribute('data-view');
                console.log(`Switched to ${viewType} view`);
                
                // Here you could show/hide different view containers based on the selected view
                if (viewType === 'calendar') {
                    alert('Calendar view will be available in the next update!');
                }
            });
        });
    }
    
    // Initialize the progress phases
    const progressTrack = document.querySelector('.phase-track');
    if (progressTrack) {
        const phases = [
            { name: 'Kickoff', percentage: 33, status: 'completed' },
            { name: 'Development', percentage: 32, status: 'active' },
            { name: 'Submission', percentage: 35, status: 'upcoming' }
        ];
        
        // Clear existing phases if any
        progressTrack.innerHTML = '';
        
        // Create phase elements
        phases.forEach(phase => {
            const phaseElement = document.createElement('div');
            phaseElement.className = `phase ${phase.status}`;
            phaseElement.style.width = `${phase.percentage}%`;
            progressTrack.appendChild(phaseElement);
        });
        
        // Create phase labels
        const phaseLabels = document.querySelector('.phase-labels');
        if (phaseLabels) {
            phaseLabels.innerHTML = '';
            phases.forEach(phase => {
                const label = document.createElement('span');
                label.textContent = phase.name;
                phaseLabels.appendChild(label);
            });
        }
    }
    
    // Position the "Today" marker based on current time relative to the schedule
    function positionTodayMarker() {
        const todayMarker = document.querySelector('.today-marker');
        if (!todayMarker) return;
        
        // In a real implementation, this would be calculated based on the current time
        // For this demo, we'll position it at a fixed location that makes sense for "Day 2"
        const activeSchedule = document.querySelector('.day-schedule.active');
        if (activeSchedule && activeSchedule.id === 'day2-schedule') {
            // Position it around 3:00 PM on Day 2 (between events)
            todayMarker.style.top = '380px'; // This value would be calculated dynamically in real app
        } else {
            // Hide the marker for other days
            todayMarker.style.display = 'none';
        }
    }
    
    // Call position today marker on load and when switching days
    positionTodayMarker();
    dayTabs.forEach(tab => {
        tab.addEventListener('click', positionTodayMarker);
    });
    
    // Update remaining time counters
    function updateTimeRemaining() {
        const timeElements = document.querySelectorAll('.time-remaining span');
        timeElements.forEach(el => {
            // In a real app, this would calculate actual remaining time
            // For this demo, we'll just decrement minutes on each update
            const timeText = el.textContent;
            if (timeText.includes('in')) {
                const timeParts = timeText.split('h ');
                const hours = parseInt(timeParts[0].replace('In ', ''));
                const minutes = parseInt(timeParts[1].replace('m', ''));
                
                let newMinutes = minutes - 1;
                let newHours = hours;
                
                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }
                
                if (newHours < 0) {
                    el.textContent = 'Starting now!';
                } else {
                    el.textContent = `In ${newHours}h ${newMinutes}m`;
                }
            } else if (timeText.includes('Ends')) {
                const timeParts = timeText.split('h ');
                const hours = parseInt(timeParts[0].replace('Ends in ', ''));
                const minutes = parseInt(timeParts[1].replace('m', ''));
                
                let newMinutes = minutes - 1;
                let newHours = hours;
                
                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }
                
                if (newHours < 0 && newMinutes < 0) {
                    el.textContent = 'Just ended!';
                } else {
                    el.textContent = `Ends in ${newHours}h ${newMinutes}m`;
                }
            }
        });
    }
    
    // Update time every minute
    setInterval(updateTimeRemaining, 60000);
    
    // Update progress percentage over time
    function updateProgress() {
        const progressPercentage = document.querySelector('.progress-percentage');
        if (progressPercentage) {
            const currentProgress = parseInt(progressPercentage.textContent);
            if (currentProgress < 100) {
                progressPercentage.textContent = `${currentProgress + 1}% Complete`;
                
                // Also update team progress bars
                const progressBars = document.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const currentWidth = parseInt(bar.style.width);
                    if (currentWidth < 100) {
                        const newWidth = Math.min(currentWidth + 1, 100);
                        bar.style.width = `${newWidth}%`;
                        
                        const valueDisplay = bar.parentElement.previousElementSibling.querySelector('.progress-value');
                        if (valueDisplay) {
                            valueDisplay.textContent = `${newWidth}%`;
                        }
                    }
                });
            }
        }
    }
    
    // Simulate progress update every 5 minutes
    setInterval(updateProgress, 300000);
    
    // Initialize timeline
    console.log('Timeline functionality initialized');
});

/**
 * Hackathon Workspace - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Timeline functionality
    initializeTimeline();
    
    // Sidebar toggle functionality
    initializeSidebar();
    
    // Tab navigation functionality
    initializeTabNavigation();
    
    // Resource management functionality
    initializeResourceManagement();
});

function initializeTimeline() {
    // Day tabs functionality
    const dayTabs = document.querySelectorAll('.day-tab');
    const daySchedules = document.querySelectorAll('.day-schedule');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // Update active tab
            dayTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding schedule
            daySchedules.forEach(schedule => {
                schedule.classList.remove('active');
                if (schedule.id === targetDay + '-schedule') {
                    schedule.classList.add('active');
                }
            });
        });
    });
    
    // Previous and Next buttons
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    
    if (prevDayBtn && nextDayBtn) {
        prevDayBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.day-tab.active');
            const prevTab = activeTab.previousElementSibling;
            
            if (prevTab && prevTab.classList.contains('day-tab')) {
                prevTab.click();
            }
        });
        
        nextDayBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.day-tab.active');
            const nextTab = activeTab.nextElementSibling;
            
            if (nextTab && nextTab.classList.contains('day-tab')) {
                nextTab.click();
            }
        });
    }
    
    // Timeline events expand/collapse functionality
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // Current time indicator
    updateCurrentTimeIndicator();
    // Update every minute
    setInterval(updateCurrentTimeIndicator, 60000);
}

function updateCurrentTimeIndicator() {
    const todayMarker = document.querySelector('.today-indicator');
    if (todayMarker) {
        // Get current time and position the marker accordingly
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // Calculate position based on time (8am-8pm range)
        const dayStart = 8; // 8am
        const dayEnd = 20; // 8pm
        const totalMinutes = (dayEnd - dayStart) * 60;
        const currentMinutes = (hours - dayStart) * 60 + minutes;
        const percentage = Math.max(0, Math.min(100, (currentMinutes / totalMinutes) * 100));
        
        // Animate the indicator
        todayMarker.style.animation = 'pulse 2s infinite';
    }
}

function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.dashboard-layout').classList.toggle('sidebar-collapsed');
        });
    }
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }
}

function initializeTabNavigation() {
    const workspaceTabs = document.querySelectorAll('.workspace-tab');
    workspaceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            workspaceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab + '-tab') {
                    content.classList.add('active');
                }
            });
        });
    });
}

function initializeResourceManagement() {
    // Resource upload button
    const uploadBtn = document.getElementById('uploadResourceBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const modal = document.getElementById('resourceUploadModal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Resource upload tabs
    const uploadTabs = document.querySelectorAll('.resource-upload-tab');
    uploadTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Update active tab
            uploadTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.resource-upload-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`${target}-upload-content`).style.display = 'block';
        });
    });
    
    // File drop zone
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropZone.classList.add('drop-zone--over');
        }
        
        function unhighlight() {
            dropZone.classList.remove('drop-zone--over');
        }
        
        dropZone.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const files = e.dataTransfer.files;
            // Handle the dropped files
            console.log('Files dropped:', files);
            // You would typically upload these files or process them
        }
    }
}
