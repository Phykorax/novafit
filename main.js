// =========================================
// NOVAFIT - MAIN JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("NovaFit website loaded successfully.");

    // Contact form
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector(".contact-submit");

            submitButton.innerHTML = `
                Message Sent
                <i class="fa-solid fa-check"></i>
            `;

            submitButton.disabled = true;

            setTimeout(() => {
                contactForm.reset();

                submitButton.innerHTML = `
                    Send Message
                    <i class="fa-solid fa-arrow-right"></i>
                `;

                submitButton.disabled = false;
            }, 2500);
        });
    }

    // Close mobile navigation after clicking a link
    const navMenu = document.querySelector("#mainNav");
    const navLinks = document.querySelectorAll("#mainNav .nav-link, #mainNav .btn");

    if (navMenu && navLinks.length) {
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("show")) {
                    const collapse = bootstrap.Collapse.getInstance(navMenu);
                    if (collapse) {
                        collapse.hide();
                    }
                }
            });
        });
    }

});

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});