/* =============================================
   SAMSON.JS – Page profil Samson KPODAMAKOU
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------
       ANIMATION DES BARRES DE COMPÉTENCES
       Déclenche le remplissage au scroll
    ------------------------------------------- */
    const skillBars = document.querySelectorAll('.skill-fill');

    if (skillBars.length) {
        const resetBars = () => {
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
        };

        const animateBars = () => {
            skillBars.forEach(bar => {
                const target = bar.style.getPropertyValue('--level');
                bar.style.width = target;
            });
        };

        // Réinitialiser pour pouvoir animer à l'entrée
        resetBars();

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBars();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('competences');
        if (skillsSection) observer.observe(skillsSection);
    }


    /* -------------------------------------------
       VALIDATION FORMULAIRE DE CONTACT
    ------------------------------------------- */
    const form = document.getElementById('contact-form');
    if (form) {
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const fields = {
            nom:     { el: form.querySelector('#nom'),     errorEl: form.querySelector('#nom-error'),     msg: 'Veuillez saisir votre nom.' },
            email:   { el: form.querySelector('#email'),   errorEl: form.querySelector('#email-error'),   msg: 'Veuillez saisir une adresse email valide.' },
            message: { el: form.querySelector('#message'), errorEl: form.querySelector('#message-error'), msg: 'Veuillez saisir un message.' },
        };

        const successBanner = form.querySelector('#form-success');

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
            el.setAttribute('aria-invalid', String(!!error));
            return !error;
        }

        // Validation en temps réel
        Object.keys(fields).forEach(key => {
            fields[key].el.addEventListener('blur', () => validateField(key));
            fields[key].el.addEventListener('input', () => {
                if (fields[key].el.classList.contains('invalid')) validateField(key);
            });
        });

        // Soumission
        form.addEventListener('submit', e => {
            e.preventDefault();

            const allValid = Object.keys(fields)
                .map(key => validateField(key))
                .every(Boolean);

            if (!allValid) {
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            const submitBtn = form.querySelector('[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi…';

            // Simulation envoi (remplacer par fetch() vers une vraie API)
            setTimeout(() => {
                form.reset();
                if (successBanner) {
                    successBanner.hidden = false;
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }, 800);
        });

        // Reset
        form.addEventListener('reset', () => {
            Object.values(fields).forEach(({ el, errorEl }) => {
                errorEl.textContent = '';
                el.classList.remove('invalid');
                el.removeAttribute('aria-invalid');
            });
            if (successBanner) successBanner.hidden = true;
        });
    }


    /* -------------------------------------------
       MISE EN ÉVIDENCE DE LA SECTION ACTIVE
       dans un éventuel menu sticky future
    ------------------------------------------- */
    const sections = document.querySelectorAll('.profile-section[id]');

    if (sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.social-links a').forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(s => observer.observe(s));
    }

});