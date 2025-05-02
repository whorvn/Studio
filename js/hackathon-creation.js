/**
 * Hackathon Creation JavaScript
 * Handles the functionality for the hackathon creation wizard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the evaluation rounds functionality
    initEvaluationRounds();
    
    // Initialize other hackathon creation functionality
    setupWizardNavigation();
});

/**
 * Initialize the evaluation rounds functionality
 */
function initEvaluationRounds() {
    const roundsCountInput = document.getElementById('evaluationRoundsCount');
    const roundsContainer = document.getElementById('evaluationRoundsContainer');
    
    if (roundsCountInput && roundsContainer) {
        // Set initial rounds based on default value
        const initialCount = parseInt(roundsCountInput.value) || 1;
        generateEvaluationRounds(initialCount, roundsContainer);
        
        // Update rounds when the count changes
        roundsCountInput.addEventListener('change', function() {
            const count = parseInt(this.value) || 1;
            generateEvaluationRounds(count, roundsContainer);
        });
    }
}

/**
 * Generate the evaluation rounds based on the specified count
 * @param {number} count - The number of rounds to generate
 * @param {HTMLElement} container - The container element for the rounds
 */
function generateEvaluationRounds(count, container) {
    // Clear the current rounds
    container.innerHTML = '';
    
    // Generate new rounds
    for (let i = 1; i <= count; i++) {
        const round = createEvaluationRound(i, count);
        container.appendChild(round);
        
        // Add separator between rounds
        if (i < count) {
            const separator = document.createElement('div');
            separator.className = 'round-separator';
            container.appendChild(separator);
        }
    }
    
    // Initialize date pickers for all rounds
    initDatePickers();
}

/**
 * Create a single evaluation round element
 * @param {number} index - The round number
 * @param {number} totalRounds - The total number of rounds
 * @returns {HTMLElement} The round element
 */
function createEvaluationRound(index, totalRounds) {
    const round = document.createElement('div');
    round.className = 'evaluation-round';
    round.dataset.roundIndex = index;
    
    // Determine round type based on position
    let roundType = 'Evaluation Round';
    if (index === 1 && totalRounds > 1) {
        roundType = 'Initial Evaluation';
    } else if (index === totalRounds && totalRounds > 1) {
        roundType = 'Final Evaluation';
    } else if (totalRounds > 1) {
        roundType = `Semi-final ${index - 1}`;
    }
    
    round.innerHTML = `
        <div class="round-title">
            <div class="round-number">${index}</div>
            ${roundType}
        </div>
        
        <div class="form-row form-row-2">
            <div class="form-group">
                <label for="round${index}Name">Round Name</label>
                <div class="input-wrapper">
                    <input type="text" id="round${index}Name" name="rounds[${index - 1}][name]" 
                           value="${roundType}" class="form-control" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="round${index}Weight">Round Weight</label>
                <div class="input-suffix-wrapper">
                    <input type="number" id="round${index}Weight" name="rounds[${index - 1}][weight]" 
                           value="${index === totalRounds ? '50' : (100 / totalRounds).toFixed(0)}" 
                           min="1" max="100" class="form-control" required>
                    <span class="input-suffix">%</span>
                </div>
                <small class="input-hint">Weight in final score calculation</small>
            </div>
        </div>
        
        <div class="form-row form-row-2">
            <div class="form-group">
                <label for="round${index}StartDate">Start Date & Time</label>
                <div class="input-wrapper">
                    <input type="datetime-local" id="round${index}StartDate" 
                           name="rounds[${index - 1}][startDate]" class="form-control datepicker" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="round${index}EndDate">End Date & Time</label>
                <div class="input-wrapper">
                    <input type="datetime-local" id="round${index}EndDate" 
                           name="rounds[${index - 1}][endDate]" class="form-control datepicker" required>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="round${index}Criteria">Evaluation Criteria</label>
            <div class="input-wrapper">
                <textarea id="round${index}Criteria" name="rounds[${index - 1}][criteria]" 
                          rows="3" class="form-control" 
                          placeholder="Enter the criteria judges will use to evaluate projects in this round..."
                          required></textarea>
            </div>
        </div>
        
        <div class="form-group">
            <label>Evaluation Scale</label>
            <div class="radio-group">
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][scale]" value="1-5" checked>
                    <span>1-5 Scale</span>
                </label>
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][scale]" value="1-10">
                    <span>1-10 Scale</span>
                </label>
            </div>
            
            <div class="evaluation-scale-option">
                <div class="scale-row">
                    <div class="scale-label">Poor</div>
                    <div class="scale-bar"></div>
                    <div class="scale-label text-right">Excellent</div>
                </div>
                <div class="scale-row">
                    <div class="scale-value">1</div>
                    <div class="scale-value">2</div>
                    <div class="scale-value">3</div>
                    <div class="scale-value">4</div>
                    <div class="scale-value">5</div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Projects Move Forward</label>
            <div class="radio-group">
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][advancement]" 
                           value="percentage" ${index < totalRounds ? 'checked' : ''} 
                           ${index === totalRounds ? 'disabled' : ''}>
                    <span>Top Percentage</span>
                </label>
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][advancement]" 
                           value="count" ${index === totalRounds ? 'disabled' : ''}>
                    <span>Top Count</span>
                </label>
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][advancement]" 
                           value="threshold" ${index === totalRounds ? 'disabled' : ''}>
                    <span>Score Threshold</span>
                </label>
                <label class="radio">
                    <input type="radio" name="rounds[${index - 1}][advancement]" 
                           value="all" ${index === totalRounds ? 'checked' : ''}>
                    <span>All Projects (Final Round)</span>
                </label>
            </div>
            
            <div id="round${index}AdvancementValue" class="form-group" 
                 ${index === totalRounds ? 'style="display: none;"' : ''}>
                <div class="input-suffix-wrapper" style="max-width: 150px; margin-top: 10px;">
                    <input type="number" name="rounds[${index - 1}][advancementValue]" 
                           value="${index < totalRounds ? '50' : ''}" 
                           min="1" max="100" class="form-control" 
                           ${index === totalRounds ? 'disabled' : ''}>
                    <span class="input-suffix">%</span>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for the advancement type radio buttons
    setTimeout(() => {
        const advancementRadios = round.querySelectorAll('input[name="rounds[' + (index - 1) + '][advancement]"]');
        const advancementValueDiv = document.getElementById(`round${index}AdvancementValue`);
        
        advancementRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const suffix = this.value === 'percentage' ? '%' : 
                               this.value === 'count' ? '' : 
                               this.value === 'threshold' ? '/5' : '';
                
                if (this.value === 'all') {
                    advancementValueDiv.style.display = 'none';
                } else {
                    advancementValueDiv.style.display = 'block';
                    const input = advancementValueDiv.querySelector('input');
                    const suffixSpan = advancementValueDiv.querySelector('.input-suffix');
                    if (suffixSpan) suffixSpan.textContent = suffix;
                    
                    // Set default values based on advancement type
                    if (input) {
                        if (this.value === 'percentage') {
                            input.value = '50';
                            input.max = '100';
                        } else if (this.value === 'count') {
                            input.value = '10';
                            input.max = '1000';
                        } else if (this.value === 'threshold') {
                            input.value = '3.5';
                            input.max = '5';
                            input.step = '0.1';
                        }
                    }
                }
            });
        });
    }, 0);
    
    return round;
}

/**
 * Initialize date pickers for the evaluation rounds
 */
function initDatePickers() {
    // This function would initialize any date picker libraries if needed
    // For the native datetime-local inputs, we can set default dates
    
    const now = new Date();
    const roundDateInputs = document.querySelectorAll('.evaluation-round input[type="datetime-local"]');
    
    roundDateInputs.forEach((input, index) => {
        // Set default dates with appropriate offsets based on index
        const isStartDate = input.id.includes('StartDate');
        const roundIndex = parseInt(input.closest('.evaluation-round').dataset.roundIndex) || 1;
        
        // Calculate offset: 7 days per round, plus 1 day between start and end dates
        const daysOffset = isStartDate ? (roundIndex - 1) * 7 : (roundIndex - 1) * 7 + 1;
        
        const date = new Date(now);
        date.setDate(date.getDate() + daysOffset);
        
        // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
        const formattedDate = formatDateForInput(date);
        input.value = formattedDate;
    });
}

/**
 * Format a Date object for datetime-local input
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string (YYYY-MM-DDTHH:MM)
 */
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Set up the wizard navigation
 */
function setupWizardNavigation() {
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step, .progress-tab');
    
    if (nextButtons.length && steps.length) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the current step
                const currentStep = document.querySelector('.wizard-step.active');
                const currentIndex = Array.from(steps).indexOf(currentStep);
                
                // Validate the current step if needed
                if (validateStep(currentIndex)) {
                    // Move to the next step
                    if (currentIndex < steps.length - 1) {
                        steps.forEach(step => step.classList.remove('active'));
                        steps[currentIndex + 1].classList.add('active');
                        
                        // Update progress indicators
                        updateProgress(currentIndex + 1, progressSteps);
                        
                        // Scroll to top of the step
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the current step
                const currentStep = document.querySelector('.wizard-step.active');
                const currentIndex = Array.from(steps).indexOf(currentStep);
                
                // Move to the previous step
                if (currentIndex > 0) {
                    steps.forEach(step => step.classList.remove('active'));
                    steps[currentIndex - 1].classList.add('active');
                    
                    // Update progress indicators
                    updateProgress(currentIndex - 1, progressSteps);
                    
                    // Scroll to top of the step
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}

/**
 * Update the progress indicators based on current step
 * @param {number} currentIndex - The index of the current step
 * @param {NodeList} progressSteps - The progress indicators
 */
function updateProgress(currentIndex, progressSteps) {
    progressSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (index < currentIndex) {
            step.classList.add('completed');
        } else if (index === currentIndex) {
            step.classList.add('active');
        }
    });
}

/**
 * Validate the current step
 * @param {number} stepIndex - The index of the step to validate
 * @returns {boolean} Whether the step is valid
 */
function validateStep(stepIndex) {
    // This function would implement validation logic for each step
    // For now, return true to allow navigation
    return true;
}