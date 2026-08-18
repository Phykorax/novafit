// =========================================
// NOVAFIT - MAIN JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("NovaFit website loaded successfully.");

    // Contact form
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");
        const originalButtonContent = submitButton.innerHTML;

        submitButton.innerHTML = `
            Sending...
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;

        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                submitButton.innerHTML = `
                    Message Sent
                    <i class="fa-solid fa-check"></i>
                `;

                contactForm.reset();

                setTimeout(() => {
                    submitButton.innerHTML = originalButtonContent;
                    submitButton.disabled = false;
                }, 2500);

            } else {
                throw new Error("Form submission failed.");
            }

        } catch (error) {

            submitButton.innerHTML = `
                Try Again
                <i class="fa-solid fa-rotate-right"></i>
            `;

            submitButton.disabled = false;

            console.error("Form submission error:", error);
        }
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