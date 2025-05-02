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