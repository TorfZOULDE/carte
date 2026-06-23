/* =============================================
   APP.JS – Site de présentation des stagiaires
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------
       VALIDATION DU FORMULAIRE DE CONTACT
    ------------------------------------------- */
    const form = document.getElementById('form-contact');
    if (form) {
        const fields = {
            nom:     { el: form.querySelector('#nom'),     errorEl: form.querySelector('#nom-error'),     msg: 'Veuillez saisir votre nom.' },
            email:   { el: form.querySelector('#email'),   errorEl: form.querySelector('#email-error'),   msg: 'Veuillez saisir une adresse email valide.' },
            message: { el: form.querySelector('#message'), errorEl: form.querySelector('#message-error'), msg: 'Veuillez saisir un message.' },
        };
        const successBanner = form.querySelector('#form-success');
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        /** Valide un champ et affiche/cache son message d'erreur. */
        function validateField(key) {
            const { el, errorEl, msg } = fields[key];
            const value = el.value.trim();
            let error = '';

            if (key === 'email' && value && !EMAIL_RE.test(value)) {
                error = msg;
            } else if (!value) {
                error = msg;
            }

            errorEl.textContent = error;
            el.classList.toggle('invalid', !!error);
            el.setAttribute('aria-invalid', !!error);
            return !error;
        }

        /** Validation en temps réel à la sortie d'un champ. */
        Object.keys(fields).forEach(key => {
            fields[key].el.addEventListener('blur', () => validateField(key));
            fields[key].el.addEventListener('input', () => {
                if (fields[key].el.classList.contains('invalid')) validateField(key);
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();

            const allValid = Object.keys(fields)
                .map(key => validateField(key))
                .every(Boolean);

            if (!allValid) {
                // Mettre le focus sur le premier champ invalide
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Simuler l'envoi (remplacez par fetch/API si besoin)
            submitForm();
        });

        form.addEventListener('reset', () => {
            Object.values(fields).forEach(({ el, errorEl }) => {
                errorEl.textContent = '';
                el.classList.remove('invalid');
                el.removeAttribute('aria-invalid');
            });
            if (successBanner) successBanner.hidden = true;
        });

        function submitForm() {
            const submitBtn = form.querySelector('[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi…';

            // Simulation réseau — remplacez par votre vraie logique d'envoi
            setTimeout(() => {
                form.reset();
                if (successBanner) {
                    successBanner.hidden = false;
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }, 800);
        }
    }


    /* -------------------------------------------
       MISE EN ÉVIDENCE DU LIEN DE NAV ACTIF
    ------------------------------------------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');

    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        const active = link.getAttribute('href') === `#${entry.target.id}`;
                        link.classList.toggle('nav-active', active);
                        link.setAttribute('aria-current', active ? 'true' : 'false');
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(section => observer.observe(section));
    }

});