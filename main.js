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
