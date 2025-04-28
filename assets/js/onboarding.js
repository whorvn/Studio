document.addEventListener('DOMContentLoaded', function() {
    // Popular skills list
    const popularSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 
        'TypeScript', 'SQL', 'Java', 'C++', 'AWS', 'Git', 'Docker', 
        'Express', 'MongoDB', 'UI/UX Design', 'Flutter', 'Swift', 
        'Go', 'GraphQL', 'TensorFlow', 'Data Science'
    ];
    
    // Cache DOM elements
    const skillSearch = document.getElementById('skillSearch');
    const addCustomSkill = document.getElementById('addCustomSkill');
    const suggestedSkills = document.getElementById('suggestedSkills');
    const selectedSkills = document.getElementById('selectedSkills');
    const emptySkillsState = document.getElementById('emptySkillsState');
    const skillCount = document.getElementById('skillCount');
    const skillProficiency = document.getElementById('skillProficiency');
    
    // State 
    let userSkills = [];
    
    // Initialize skills
    function initializeSkills() {
        // Populate suggested skills
        suggestedSkills.innerHTML = '';
        popularSkills.forEach(skill => {
            suggestedSkills.appendChild(createSkillChip(skill));
        });
        
        // Update UI elements
        updateEmptyState();
        updateSkillCount();
    }
    
    // Create a skill chip element
    function createSkillChip(skill, isSelected = false) {
        const isUserSkill = userSkills.includes(skill);
        
        const chipDiv = document.createElement('div');
        chipDiv.className = `skill-chip${isUserSkill ? ' selected' : ''}`;
        chipDiv.dataset.skill = skill;
        
        chipDiv.innerHTML = `
            ${skill}
            <i class="fas ${isUserSkill ? 'fa-xmark' : 'fa-plus'}"></i>
        `;
        
        chipDiv.addEventListener('click', () => toggleSkill(skill));
        
        return chipDiv;
    }
    
    // Toggle skill selection
    function toggleSkill(skill) {
        const index = userSkills.indexOf(skill);
        
        if (index === -1) {
            // Add skill
            userSkills.push(skill);
            
            // Create and add to selected skills
            const newChip = createSkillChip(skill, true);
            newChip.classList.add('new', 'selected');
            selectedSkills.appendChild(newChip);
            
            // Update suggested skills
            const existingChip = suggestedSkills.querySelector(`.skill-chip[data-skill="${skill}"]`);
            if (existingChip) {
                existingChip.classList.add('selected');
                existingChip.querySelector('i').className = 'fas fa-xmark';
            }
            
            // Add to proficiency if needed
            if (userSkills.length <= 5) {
                addSkillToProficiency(skill);
            }
        } else {
            // Remove skill
            userSkills.splice(index, 1);
            
            // Remove from selected skills
            const selectedChip = selectedSkills.querySelector(`.skill-chip[data-skill="${skill}"]`);
            if (selectedChip) {
                selectedChip.remove();
            }
            
            // Update suggested skills
            const suggestedChip = suggestedSkills.querySelector(`.skill-chip[data-skill="${skill}"]`);
            if (suggestedChip) {
                suggestedChip.classList.remove('selected');
                suggestedChip.querySelector('i').className = 'fas fa-plus';
            }
            
            // Remove from proficiency
            const proficiencyItem = skillProficiency.querySelector(`.proficiency-item[data-skill="${skill}"]`);
            if (proficiencyItem) {
                proficiencyItem.remove();
            }
            
            // Fill proficiency with another skill if needed
            if (userSkills.length < 5 && userSkills.length > 0) {
                const proficiencySkills = Array.from(skillProficiency.querySelectorAll('.proficiency-item')).map(
                    item => item.dataset.skill
                );
                
                for (const s of userSkills) {
                    if (!proficiencySkills.includes(s)) {
                        addSkillToProficiency(s);
                        break;
                    }
                }
            }
        }
        
        // Update UI
        updateEmptyState();
        updateSkillCount();
    }
    
    // Add skill to proficiency section
    function addSkillToProficiency(skill) {
        // Remove empty state if it exists
        const emptyState = skillProficiency.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        const item = document.createElement('div');
        item.className = 'proficiency-item';
        item.dataset.skill = skill;
        
        const profId = `prof-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        item.innerHTML = `
            <div class="proficiency-name">${skill}</div>
            <div class="proficiency-levels levels-4">
                <div class="proficiency-level">
                    <input type="radio" id="${profId}-beginner" name="${profId}" value="beginner">
                    <label for="${profId}-beginner">Beginner</label>
                </div>
                <div class="proficiency-level">
                    <input type="radio" id="${profId}-intermediate" name="${profId}" value="intermediate" checked>
                    <label for="${profId}-intermediate">Intermediate</label>
                </div>
                <div class="proficiency-level">
                    <input type="radio" id="${profId}-advanced" name="${profId}" value="advanced">
                    <label for="${profId}-advanced">Advanced</label>
                </div>
                <div class="proficiency-level">
                    <input type="radio" id="${profId}-expert" name="${profId}" value="expert">
                    <label for="${profId}-expert">Expert</label>
                </div>
            </div>
        `;
        
        skillProficiency.appendChild(item);
    }
    
    // Update empty state visibility
    function updateEmptyState() {
        if (userSkills.length > 0) {
            emptySkillsState.style.display = 'none';
        } else {
            emptySkillsState.style.display = 'flex';
        }
        
        if (userSkills.length === 0) {
            skillProficiency.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-bar"></i>
                    <p>Add skills above to rate your proficiency level.</p>
                </div>
            `;
        }
    }
    
    // Update skill count display
    function updateSkillCount() {
        skillCount.textContent = `(${userSkills.length})`;
    }
    
    // Handle skill search
    skillSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query) {
            // Filter popular skills
            const matches = popularSkills.filter(skill => 
                skill.toLowerCase().includes(query)
            );
            
            // Update suggested skills
            suggestedSkills.innerHTML = '';
            
            if (matches.length) {
                matches.forEach(skill => {
                    suggestedSkills.appendChild(createSkillChip(skill));
                });
            } else {
                suggestedSkills.innerHTML = `
                    <div class="no-results">
                        <p>No matches found. Click "Add" to create a custom skill.</p>
                    </div>
                `;
            }
        } else {
            // Reset to popular skills
            initializeSkills();
        }
    });
    
    // Add custom skill
    addCustomSkill.addEventListener('click', function() {
        const skill = skillSearch.value.trim();
        
        if (skill && !userSkills.includes(skill)) {
            userSkills.push(skill);
            
            // Create new chip
            const newChip = createSkillChip(skill, true);
            newChip.classList.add('new', 'selected');
            selectedSkills.appendChild(newChip);
            
            // Add to proficiency if needed
            if (userSkills.length <= 5) {
                addSkillToProficiency(skill);
            }
            
            // Update UI
            updateEmptyState();
            updateSkillCount();
            
            // Clear search
            skillSearch.value = '';
            initializeSkills();
        }
    });
    
    // Initialize
    initializeSkills();
    
    // Handle enter key in search field
    skillSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomSkill.click();
        }
    });
});
