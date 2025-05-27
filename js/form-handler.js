// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        fetch('https://formsubmit.co/ajax/biluyb338@gmail.com', {
            method: 'POST',
            body: formData
          })
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        btnText.textContent = 'Message Sent!';
        btnIcon.innerHTML = '<i class="fas fa-check"></i>';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#10b981';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            this.reset();
            btnText.textContent = 'Send Message';
            btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}
