// Patient management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Edit profile button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            const editableFields = document.querySelectorAll('.patient-profile [contenteditable="false"]');
            editableFields.forEach(field => {
                field.setAttribute('contenteditable', 'true');
                field.style.backgroundColor = '#fff9e6';
                field.style.padding = '2px 5px';
                field.style.borderRadius = '3px';
            });
            
            this.textContent = 'Save Changes';
            this.classList.remove('primary');
            this.classList.add('secondary');
            
            // Change the click handler to save
            this.onclick = function() {
                editableFields.forEach(field => {
                    field.setAttribute('contenteditable', 'false');
                    field.style.backgroundColor = 'transparent';
                    field.style.padding = '0';
                });
                
                this.textContent = 'Edit Profile';
                this.classList.remove('secondary');
                this.classList.add('primary');
                
                // In a real app, you would save changes to the server here
                alert('Changes saved successfully!');
                
                // Restore original click handler
                this.onclick = arguments.callee;
            };
        });
    }
    
    // New patient button
    // const newPatientBtn = document.getElementById('new-patient-btn');
    // if (newPatientBtn) {
    //     newPatientBtn.addEventListener('click', function() {
    //         // In a real app, this would open a modal or redirect to a new patient form
    //         alert('Redirecting to new patient registration form...');
    //         // window.location.href = 'new-patient.html';
    //     });
    // }
    
    // Sample data for medical reports
    if (document.getElementById('reports-tab')) {
        const reports = [
            { id: 'R-1001', date: '2023-11-10', type: 'Blood Test', summary: 'Complete blood count' },
            { id: 'R-1002', date: '2023-10-22', type: 'X-Ray', summary: 'Chest X-ray - normal' },
            { id: 'R-1003', date: '2023-09-15', type: 'MRI', summary: 'Brain MRI - no abnormalities' }
        ];
        
        const reportsGrid = document.querySelector('.reports-grid');
        reports.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';
            reportCard.innerHTML = `
                <h5>${report.type} (${report.date})</h5>
                <p>${report.summary}</p>
                <button class="btn small">View Full Report</button>
            `;
            reportsGrid.appendChild(reportCard);
        });
    }
});