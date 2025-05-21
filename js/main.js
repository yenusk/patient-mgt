// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and content
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Sample data for dashboard
    if (document.getElementById('recent-patients')) {
        const patients = [
            { id: 'P-100245', name: 'Sarah Johnson', age: 38, condition: 'Hypertension', status: 'In Treatment' },
            { id: 'P-100246', name: 'Michael Brown', age: 45, condition: 'Diabetes', status: 'Waiting' },
            { id: 'P-100247', name: 'Emily Davis', age: 29, condition: 'Migraine', status: 'Consultation' },
            { id: 'P-100248', name: 'Robert Wilson', age: 62, condition: 'Arthritis', status: 'Treatment' },
            { id: 'P-100249', name: 'Jennifer Lee', age: 34, condition: 'Allergy', status: 'Discharged' }
        ];
        
        const tableBody = document.getElementById('recent-patients');
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.condition}</td>
                <td><span class="status-badge ${patient.status.toLowerCase().replace(' ', '-')}">${patient.status}</span></td>
                <td><a href="patient-profile.html" class="btn small">View</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Sample queue data
    const queueData = {
        checkin: [
            { id: 'P-100250', name: 'David Miller', condition: 'Fever' },
            { id: 'P-100251', name: 'Lisa Taylor', condition: 'Back Pain' }
        ],
        triage: [
            { id: 'P-100252', name: 'James Anderson', condition: 'Chest Pain', priority: 'high' },
            { id: 'P-100253', name: 'Maria Garcia', condition: 'Rash', priority: 'low' }
        ],
        consultation: [
            { id: 'P-100246', name: 'Michael Brown', condition: 'Diabetes' }
        ],
        treatment: [
            { id: 'P-100248', name: 'Robert Wilson', condition: 'Arthritis' }
        ]
    };
    
    // Fill queue lists
    for (const [stage, patients] of Object.entries(queueData)) {
        const queueList = document.getElementById(`${stage}-queue`);
        if (queueList) {
            patients.forEach(patient => {
                const patientCard = document.createElement('div');
                patientCard.className = 'patient-card';
                patientCard.setAttribute('draggable', 'true');
                patientCard.innerHTML = `
                    <strong>${patient.name}</strong>
                    <p>${patient.condition}</p>
                    <small>${patient.id}</small>
                `;
                if (patient.priority === 'high') {
                    patientCard.style.borderLeft = '4px solid var(--danger-color)';
                }
                queueList.appendChild(patientCard);
            });
        }
    }
    
    // Drag and drop for queues
    const queueLists = document.querySelectorAll('.queue-list');
    queueLists.forEach(list => {
        list.addEventListener('dragover', function(e) {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                const afterElement = getDragAfterElement(this, e.clientY);
                if (afterElement) {
                    this.insertBefore(dragging, afterElement);
                } else {
                    this.appendChild(dragging);
                }
            }
        });
    });
    
    const patientCards = document.querySelectorAll('.patient-card');
    patientCards.forEach(card => {
        card.addEventListener('dragstart', function() {
            this.classList.add('dragging');
        });
        
        card.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.patient-card:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});