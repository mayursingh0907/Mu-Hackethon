// Add this to your index.js file

// Update the navigation link click handler
document.addEventListener('DOMContentLoaded', function() {
    // Update contact links to open modal
    const contactLinks = document.querySelectorAll('a[href="contact.html"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Update contact buttons to open modal
    const contactButtons = document.querySelectorAll('.btn-primary');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
});

function openModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
    document.getElementById('contactForm').reset();
    document.querySelector('.success-message').style.display = 'none';
    document.querySelector('.contact-form').style.display = 'flex';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeModal();
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Here you would typically send the form data to your server
    // For this example, we'll just show the success message
    document.querySelector('.contact-form').style.display = 'none';
    document.querySelector('.success-message').style.display = 'block';
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}