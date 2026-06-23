(function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;
        const fields = {
            nom: document.getElementById('nom'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };

        const errors = {
            nom: document.getElementById('nom-error'),
            email: document.getElementById('email-error'),
            message: document.getElementById('message-error')
        };

        if (!fields.nom.value.trim()) {
            errors.nom.textContent = 'Le nom est requis.';
            isValid = false;
        } else {
            errors.nom.textContent = '';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.email.value.trim() || !emailPattern.test(fields.email.value.trim())) {
            errors.email.textContent = 'Veuillez saisir une adresse email valide.';
            isValid = false;
        } else {
            errors.email.textContent = '';
        }

        if (!fields.message.value.trim()) {
            errors.message.textContent = 'Le message est requis.';
            isValid = false;
        } else {
            errors.message.textContent = '';
        }

        if (isValid) {
            successMessage.hidden = false;
            form.reset();
            setTimeout(function() {
                successMessage.hidden = true;
            }, 5000);
        }
    });
})();