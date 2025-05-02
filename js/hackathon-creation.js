// Hackathon Creation Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle publication mode selection
    const publicationModeRadios = document.querySelectorAll('input[name="publicationMode"]');
    const iterationNotesSection = document.getElementById('iterationNotesSection');
    const phasePublishingOptions = document.getElementById('phasePublishingOptions');
    const publishButton = document.getElementById('publishHackathon');
    const iterateButton = document.getElementById('iterateHackathon');
    
    publicationModeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Show/hide appropriate sections based on publication mode
            if (this.value === 'iterate') {
                iterationNotesSection.style.display = 'block';
                phasePublishingOptions.style.display = 'none';
                publishButton.style.display = 'none';
                iterateButton.style.display = 'block';
            } else if (this.value === 'publish') {
                iterationNotesSection.style.display = 'none';
                phasePublishingOptions.style.display = 'block';
                publishButton.style.display = 'block';
                iterateButton.style.display = 'none';
            } else if (this.value === 'preview') {
                iterationNotesSection.style.display = 'none';
                phasePublishingOptions.style.display = 'none';
                publishButton.style.display = 'none';
                iterateButton.style.display = 'none';
                // Trigger preview functionality
                showPreviewModal();
            }
        });
    });
    
    // Handle "Continue Iterating" button click
    document.getElementById('iterateHackathon').addEventListener('click', function() {
        const notes = document.getElementById('iterationNotes').value;
        const deadline = document.getElementById('iterationDeadline').value;
        const assignee = document.getElementById('iterationAssignee').value;
        
        // Save iteration data
        saveHackathonIteration(notes, deadline, assignee);
        
        // Show success notification
        showNotification('Hackathon progress saved. You can continue editing later.', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    });
    
    // Handle "Publish Hackathon" button click
    document.getElementById('publishHackathon').addEventListener('click', function() {
        // Get selected phases
        const selectedPhases = [];
        document.querySelectorAll('input[name="publishPhases[]"]:checked').forEach(checkbox => {
            selectedPhases.push(checkbox.value);
        });
        
        if (validatePublishRequirements(selectedPhases)) {
            publishHackathon(selectedPhases);
            
            // Show success notification
            showNotification('Hackathon published successfully!', 'success');
            
            // Redirect to live hackathon page
            setTimeout(() => {
                window.location.href = '../hackathon-detail.html?id=123';
            }, 2000);
        } else {
            // Show error if validation fails
            showNotification('Please complete all required sections before publishing.', 'error');
        }
    });
    
    // Preview button click handler
    document.getElementById('previewHackathon').addEventListener('click', function() {
        showPreviewModal();
    });
    
    // Handle readiness checklist item clicks
    document.querySelectorAll('.goto-section').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const stepNumber = parseInt(this.getAttribute('data-step'));
            navigateToStep(stepNumber);
        });
    });
    
    // Custom IP ownership change handler
    document.getElementById('ipOwnership').addEventListener('change', function() {
        const customIpSection = document.getElementById('customIpSection');
        if (this.value === 'custom') {
            customIpSection.style.display = 'block';
        } else {
            customIpSection.style.display = 'none';
        }
    });
    
    // NDA requirement change handler
    document.querySelectorAll('input[name="ndaRequired"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const ndaSection = document.getElementById('ndaSection');
            if (this.value === 'yes') {
                ndaSection.style.display = 'block';
            } else {
                ndaSection.style.display = 'none';
            }
        });
    });
    
    // File upload button handler
    document.getElementById('ndaUpload').addEventListener('click', function() {
        document.getElementById('ndaFile').click();
    });
    
    document.getElementById('ndaFile').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'No file selected';
        document.getElementById('ndaUpload').textContent = fileName;
    });
    
    // Mentor invitation method toggle functionality
    if (document.querySelector('.wizard-step[data-step="10"]')) {
        const manualMethodRadio = document.querySelector('input[name="mentorAddMethod"][value="manual"]');
        const inviteMethodRadio = document.querySelector('input[name="mentorAddMethod"][value="invitation"]');
        const manualSection = document.getElementById('manualMentorSection');
        const invitationSection = document.getElementById('invitationMentorSection');

        // Initialize based on default selection
        if (manualMethodRadio && manualMethodRadio.checked) {
            manualSection.style.display = 'block';
            invitationSection.style.display = 'none';
        }

        // Add event listeners to radio buttons
        if (manualMethodRadio) {
            manualMethodRadio.addEventListener('change', function() {
                if (this.checked) {
                    manualSection.style.display = 'block';
                    invitationSection.style.display = 'none';
                }
            });
        }

        if (inviteMethodRadio) {
            inviteMethodRadio.addEventListener('change', function() {
                if (this.checked) {
                    manualSection.style.display = 'none';
                    invitationSection.style.display = 'block';
                }
            });
        }

        // Copy mentor registration link functionality
        const copyMentorLinkBtn = document.getElementById('copyMentorLinkBtn');
        if (copyMentorLinkBtn) {
            copyMentorLinkBtn.addEventListener('click', function() {
                const linkInput = document.getElementById('mentorRegistrationLink');
                linkInput.select();
                document.execCommand('copy');
                
                // Visual feedback for copy
                const originalText = copyMentorLinkBtn.innerHTML;
                copyMentorLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyMentorLinkBtn.innerHTML = originalText;
                }, 2000);
            });
        }

        // Send invitations functionality
        const sendInvitationsBtn = document.getElementById('sendMentorInvitationsBtn');
        if (sendInvitationsBtn) {
            sendInvitationsBtn.addEventListener('click', function() {
                const emails = document.getElementById('mentorEmailList').value.trim();
                if (!emails) {
                    alert('Please enter at least one email address.');
                    return;
                }
                
                // Here you would typically make an API call to send invitations
                // For demo purposes, just show a success message
                alert('Invitations sent successfully!');
                
                // Add the emails to the pending invitations table
                const emailList = emails.split('\n').filter(email => email.trim());
                const tbody = document.querySelector('.invited-mentors-table tbody');
                
                if (tbody) {
                    const today = new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                    
                    emailList.forEach(email => {
                        if (email.trim()) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${email.trim()}</td>
                                <td>${today}</td>
                                <td><span class="status-badge status-pending">Pending</span></td>
                                <td>
                                    <button type="button" class="btn-icon btn-small" title="Resend invitation">
                                        <i class="fas fa-redo"></i>
                                    </button>
                                    <button type="button" class="btn-icon btn-small" title="Cancel invitation">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            `;
                            tbody.appendChild(tr);
                        }
                    });
                    
                    // Clear the textarea
                    document.getElementById('mentorEmailList').value = '';
                }
            });
        }
    }

    // Prize preview and save functionality
    if (document.querySelector('.wizard-step[data-step="6"]')) {
        // Update prize preview as values change
        const prizeInputs = document.querySelectorAll('#prize1CashValue, #prize2CashValue, #prize3CashValue');
        prizeInputs.forEach(input => {
            input.addEventListener('input', updatePrizePreview);
        });

        // Update special prizes preview as values change
        const specialPrizeInputs = document.querySelectorAll('.special-prize-card input[type="text"]');
        specialPrizeInputs.forEach(input => {
            input.addEventListener('input', updateSpecialPrizesPreview);
        });

        // Toggle prize preview visibility
        const showPrizePreview = document.getElementById('showPrizePreview');
        if (showPrizePreview) {
            showPrizePreview.addEventListener('change', function() {
                document.getElementById('prizePreviewContainer').style.display = this.checked ? 'block' : 'none';
            });
        }

        // Save and preview button
        const btnSaveAndPreview = document.getElementById('btnSaveAndPreview');
        if (btnSaveAndPreview) {
            btnSaveAndPreview.addEventListener('click', function() {
                savePrizeConfiguration();
                showPrizePreviewPage();
            });
        }

        // Initial preview update
        updatePrizePreview();
        updateSpecialPrizesPreview();
    }

    // Handle "Continue to iterate?" selection
    const continueToIterate = document.getElementById('continueToIterate');
    if (continueToIterate) {
        continueToIterate.addEventListener('click', function() {
            document.getElementById('iterationOptions').style.display = 'block';
        });
    }

    // Add event listener for save and preview button
    const savePreviewButton = document.getElementById('btnSavePrizePreview');
    if (savePreviewButton) {
        savePreviewButton.addEventListener('click', openPrizePreview);
    }

    // Add event listener for adding new special prize
    const addSpecialPrizeButton = document.getElementById('btnAddSpecialPrize');
    if (addSpecialPrizeButton) {
        addSpecialPrizeButton.addEventListener('click', addSpecialPrize);
    }
    
    // Load any saved prize configuration
    loadSavedPrizeConfiguration();
});

// Helper Functions

function saveHackathonIteration(notes, deadline, assignee) {
    // This would typically send an AJAX request to save the data
    console.log('Saving iteration with notes:', notes);
    console.log('Deadline:', deadline);
    console.log('Assignee:', assignee);
    
    // For demonstration purposes, we're just logging to console
    // In a real app, this would call an API endpoint
}

function publishHackathon(phases) {
    // This would typically send an AJAX request to publish the hackathon
    console.log('Publishing hackathon with phases:', phases);
    
    // For demonstration purposes, we're just logging to console
    // In a real app, this would call an API endpoint
}

function validatePublishRequirements(phases) {
    // Basic validation logic - in a real app this would be more comprehensive
    
    // Check if any phases are selected
    if (phases.length === 0) {
        return false;
    }
    
    // Check if required fields are completed
    // For simplicity, we're just checking if terms and conditions are filled
    const termsConditions = document.getElementById('termsConditions').value;
    if (!termsConditions) {
        return false;
    }
    
    return true;
}

function showPreviewModal() {
    // This would typically open a modal with a preview of the hackathon
    console.log('Showing preview modal');
    
    // For demonstration purposes, we're just logging to console
    // In a real app, this would open a modal or redirect to a preview page
    
    // Example of a preview mechanism:
    const previewUrl = '../hackathon-detail.html?id=123&preview=true';
    window.open(previewUrl, '_blank');
}

function navigateToStep(stepNumber) {
    // This would navigate the form wizard to the specified step
    console.log('Navigating to step:', stepNumber);
    
    // For demonstration purposes, we're just logging to console
    // In a real app, this would trigger the wizard navigation
    
    // Example implementation for a wizard:
    const wizardSteps = document.querySelectorAll('.wizard-step');
    wizardSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    document.querySelector(`.wizard-step[data-step="${stepNumber}"]`).classList.add('active');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after delay
    setTimeout(() => {
        notification.classList.add('notification--fade');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', function() {
        document.body.removeChild(notification);
    });
}

function updatePrizePreview() {
    // Update the prize preview with the current values
    const first = document.getElementById('prize1CashValue').value || '0';
    const second = document.getElementById('prize2CashValue').value || '0';
    const third = document.getElementById('prize3CashValue').value || '0';
    
    document.getElementById('previewFirstPrize').textContent = first;
    document.getElementById('previewSecondPrize').textContent = second;
    document.getElementById('previewThirdPrize').textContent = third;
}

function updateSpecialPrizesPreview() {
    const previewList = document.getElementById('specialPrizesPreviewList');
    if (!previewList) return;
    
    // Clear current preview
    previewList.innerHTML = '';
    
    // Get all special prize cards
    const specialPrizes = document.querySelectorAll('.special-prize-card');
    
    specialPrizes.forEach(card => {
        const titleInput = card.querySelector('input[id^="specialPrize"][id$="Title"]');
        const valueInput = card.querySelector('input[id^="specialPrize"][id$="Value"]');
        const sponsorInput = card.querySelector('input[id^="specialPrize"][id$="Sponsor"]');
        
        if (titleInput && valueInput) {
            const title = titleInput.value || 'Special Prize';
            const value = valueInput.value || '';
            const sponsor = sponsorInput && sponsorInput.value ? `(Sponsored by ${sponsorInput.value})` : '';
            
            // Create preview item
            const prizeItem = document.createElement('div');
            prizeItem.className = 'special-prize-item';
            prizeItem.innerHTML = `
                <i class="fas fa-star"></i>
                <div class="special-prize-info">
                    <div class="special-prize-name">${title}</div>
                    <div class="special-prize-value">${value} ${sponsor}</div>
                </div>
            `;
            
            previewList.appendChild(prizeItem);
        }
    });
}

function savePrizeConfiguration() {
    // Collect all prize data
    const prizeData = {
        mainPrizes: [
            {
                title: document.getElementById('prize1Title').value,
                cashValue: document.getElementById('prize1CashValue').value,
                numRecipients: document.getElementById('prize1NumRecipients').value,
                description: document.getElementById('prize1Description').value
            },
            {
                title: document.getElementById('prize2Title').value,
                cashValue: document.getElementById('prize2CashValue').value,
                numRecipients: document.getElementById('prize2NumRecipients').value,
                description: document.getElementById('prize2Description').value
            },
            {
                title: document.getElementById('prize3Title').value,
                cashValue: document.getElementById('prize3CashValue').value,
                numRecipients: document.getElementById('prize3NumRecipients').value,
                description: document.getElementById('prize3Description').value
            }
        ],
        specialPrizes: [],
        distribution: {
            method: document.getElementById('prizeDistributionMethod').value,
            timeline: document.getElementById('prizeTimeline').value,
            notes: document.getElementById('prizeDistributionNotes').value
        }
    };
    
    // Collect special prizes
    document.querySelectorAll('.special-prize-card').forEach((card, index) => {
        const titleInput = card.querySelector(`input[id^="specialPrize"][id$="Title"]`);
        const valueInput = card.querySelector(`input[id^="specialPrize"][id$="Value"]`);
        const sponsorInput = card.querySelector(`input[id^="specialPrize"][id$="Sponsor"]`);
        
        if (titleInput && valueInput) {
            prizeData.specialPrizes.push({
                title: titleInput.value,
                value: valueInput.value,
                sponsor: sponsorInput ? sponsorInput.value : ''
            });
        }
    });
    
    // Save to localStorage for demo purposes
    // In a real application, this would be sent to a server
    localStorage.setItem('hackathon_prize_config', JSON.stringify(prizeData));
    
    // Show success notification
    showNotification('Prize configuration saved successfully!', 'success');
}

function showPrizePreviewPage() {
    // In a real application, this would navigate to a dedicated preview page
    // For now, we'll open a new tab with the preview URL
    const previewUrl = 'prize-preview.html';
    window.open(previewUrl, '_blank');
}

// Prize Configuration Management
function savePrizeConfiguration() {
    // Collect main prize data
    const mainPrizes = [
        {
            title: document.getElementById('firstPrizeTitle').value,
            cashValue: document.getElementById('firstPrizeCash').value,
            numRecipients: document.getElementById('firstPrizeRecipients').value,
            description: document.getElementById('firstPrizeDescription').value
        },
        {
            title: document.getElementById('secondPrizeTitle').value,
            cashValue: document.getElementById('secondPrizeCash').value,
            numRecipients: document.getElementById('secondPrizeRecipients').value,
            description: document.getElementById('secondPrizeDescription').value
        },
        {
            title: document.getElementById('thirdPrizeTitle').value,
            cashValue: document.getElementById('thirdPrizeCash').value,
            numRecipients: document.getElementById('thirdPrizeRecipients').value,
            description: document.getElementById('thirdPrizeDescription').value
        }
    ];
    
    // Collect special prize data
    const specialPrizeContainers = document.querySelectorAll('.special-prize-container');
    const specialPrizes = [];
    
    specialPrizeContainers.forEach(container => {
        specialPrizes.push({
            title: container.querySelector('.special-prize-title').value,
            value: container.querySelector('.special-prize-value').value,
            sponsor: container.querySelector('.special-prize-sponsor').value,
            description: container.querySelector('.special-prize-description').value
        });
    });
    
    // Collect distribution details
    const distribution = {
        method: document.getElementById('prizeDistributionMethod').value,
        timeline: document.getElementById('prizeDistributionTimeline').value,
        notes: document.getElementById('prizeDistributionNotes').value
    };
    
    // Save to localStorage
    const prizeConfig = {
        mainPrizes: mainPrizes,
        specialPrizes: specialPrizes,
        distribution: distribution,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('hackathon_prize_config', JSON.stringify(prizeConfig));
    return prizeConfig;
}

function openPrizePreview() {
    // First save the current configuration
    savePrizeConfiguration();
    
    // Open the preview in a new window
    const previewWindow = window.open('prize-preview.html', 'PrizePreview', 'width=1000,height=800');
    
    if (!previewWindow) {
        alert('Pop-up blocker may have prevented the preview window from opening. Please allow pop-ups for this site.');
    }
}

// Hook up event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ...existing event listeners...
    
    // Add event listener for save and preview button
    const savePreviewButton = document.getElementById('btnSavePrizePreview');
    if (savePreviewButton) {
        savePreviewButton.addEventListener('click', openPrizePreview);
    }

    // Add event listener for adding new special prize
    const addSpecialPrizeButton = document.getElementById('btnAddSpecialPrize');
    if (addSpecialPrizeButton) {
        addSpecialPrizeButton.addEventListener('click', addSpecialPrize);
    }
    
    // Load any saved prize configuration
    loadSavedPrizeConfiguration();
});

function loadSavedPrizeConfiguration() {
    const savedConfig = localStorage.getItem('hackathon_prize_config');
    if (!savedConfig) return;
    
    const config = JSON.parse(savedConfig);
    
    // Populate main prizes
    if (config.mainPrizes && config.mainPrizes.length >= 3) {
        document.getElementById('firstPrizeTitle').value = config.mainPrizes[0].title || '';
        document.getElementById('firstPrizeCash').value = config.mainPrizes[0].cashValue || '';
        document.getElementById('firstPrizeRecipients').value = config.mainPrizes[0].numRecipients || '1';
        document.getElementById('firstPrizeDescription').value = config.mainPrizes[0].description || '';
        
        document.getElementById('secondPrizeTitle').value = config.mainPrizes[1].title || '';
        document.getElementById('secondPrizeCash').value = config.mainPrizes[1].cashValue || '';
        document.getElementById('secondPrizeRecipients').value = config.mainPrizes[1].numRecipients || '1';
        document.getElementById('secondPrizeDescription').value = config.mainPrizes[1].description || '';
        
        document.getElementById('thirdPrizeTitle').value = config.mainPrizes[2].title || '';
        document.getElementById('thirdPrizeCash').value = config.mainPrizes[2].cashValue || '';
        document.getElementById('thirdPrizeRecipients').value = config.mainPrizes[2].numRecipients || '1';
        document.getElementById('thirdPrizeDescription').value = config.mainPrizes[2].description || '';
    }
    
    // Populate special prizes
    if (config.specialPrizes && config.specialPrizes.length > 0) {
        // Clear existing special prizes
        const specialPrizesContainer = document.getElementById('specialPrizesContainer');
        if (specialPrizesContainer) {
            while (specialPrizesContainer.firstChild) {
                specialPrizesContainer.removeChild(specialPrizesContainer.firstChild);
            }
            
            // Add special prizes from saved config
            config.specialPrizes.forEach(prize => {
                addSpecialPrize(prize);
            });
        }
    }
    
    // Populate distribution details
    if (config.distribution) {
        document.getElementById('prizeDistributionMethod').value = config.distribution.method || '';
        document.getElementById('prizeDistributionTimeline').value = config.distribution.timeline || '';
        document.getElementById('prizeDistributionNotes').value = config.distribution.notes || '';
    }
}

function addSpecialPrize(existingPrize = null) {
    const specialPrizesContainer = document.getElementById('specialPrizesContainer');
    if (!specialPrizesContainer) return;
    
    const specialPrizeContainer = document.createElement('div');
    specialPrizeContainer.className = 'special-prize-container';
    
    specialPrizeContainer.innerHTML = `
        <div class="card mb-4">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h5>Special Category Prize</h5>
                    <button type="button" class="btn btn-sm btn-danger remove-special-prize">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="form-row form-row-2">
                    <div class="form-group">
                        <label>Prize Title</label>
                        <input type="text" class="form-control special-prize-title" 
                            placeholder="e.g., Best UI/UX Design" 
                            value="${existingPrize ? existingPrize.title : ''}">
                    </div>
                    <div class="form-group">
                        <label>Cash Value ($)</label>
                        <input type="text" class="form-control special-prize-value" 
                            placeholder="e.g., 1000" 
                            value="${existingPrize ? existingPrize.value : ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Sponsor (Optional)</label>
                    <input type="text" class="form-control special-prize-sponsor" 
                        placeholder="e.g., Adobe" 
                        value="${existingPrize ? existingPrize.sponsor : ''}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control special-prize-description" rows="2" 
                        placeholder="Describe the criteria for this prize...">${existingPrize ? existingPrize.description : ''}</textarea>
                </div>
            </div>
        </div>
    `;
    
    specialPrizesContainer.appendChild(specialPrizeContainer);
    
    // Add event listener to the remove button
    const removeButton = specialPrizeContainer.querySelector('.remove-special-prize');
    removeButton.addEventListener('click', function() {
        specialPrizesContainer.removeChild(specialPrizeContainer);
    });
}