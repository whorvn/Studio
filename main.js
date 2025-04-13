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
});
