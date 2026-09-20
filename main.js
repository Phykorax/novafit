// =========================================
// NOVAFIT - MAIN JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("NovaFit website loaded successfully.");


    // =========================================
    // SCROLL REVEAL ANIMATION
    // =========================================

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );
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
    }


    // =========================================
    // BACK TO TOP BUTTON
    // =========================================

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        const toggleBackToTop = () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }
        };


        window.addEventListener(
            "scroll",
            toggleBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        // Check initial position
        toggleBackToTop();
    }


    // =========================================
    // CONTACT FORM
    // =========================================

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        const submitButton =
            contactForm.querySelector(
                ".contact-submit"
            );

        const formError =
            contactForm.querySelector(
                ".form-error"
            );

        // Store the real original button content once
        const originalButtonContent =
            submitButton
                ? submitButton.innerHTML
                : "";

        let failureTimer = null;
        let successTimer = null;


        contactForm.addEventListener(
            "submit",
            async (event) => {

                // -----------------------------------------
                // NATIVE BROWSER VALIDATION
                // -----------------------------------------

                if (!contactForm.checkValidity()) {

                    event.preventDefault();

                    contactForm.reportValidity();

                    return;
                }


                event.preventDefault();


                if (!submitButton) {
                    return;
                }


                // -----------------------------------------
                // CANCEL OLD TIMERS
                // -----------------------------------------

                if (failureTimer) {

                    clearTimeout(failureTimer);

                    failureTimer = null;
                }

                if (successTimer) {

                    clearTimeout(successTimer);

                    successTimer = null;
                }


                // -----------------------------------------
                // CLEAR PREVIOUS ERROR
                // -----------------------------------------

                if (formError) {
                    formError.textContent = "";
                }


                // -----------------------------------------
                // SENDING
                // -----------------------------------------

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    Sending...
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;


                try {

                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",
                                body: new FormData(contactForm),
                                headers: {
                                    Accept: "application/json"
                                }
                            }
                        );


                    // -----------------------------------------
                    // RESPONSE FAILED
                    // -----------------------------------------

                    if (!response.ok) {

                        throw new Error(
                            "Form submission failed."
                        );
                    }


                    // -----------------------------------------
                    // SUCCESS
                    // -----------------------------------------

                    if (formError) {
                        formError.textContent = "";
                    }


                    submitButton.innerHTML = `
                        Message Sent
                        <i class="fa-solid fa-check"></i>
                    `;


                    contactForm.reset();

                    submitButton.disabled = true;


                    // -----------------------------------------
                    // RESET AFTER SUCCESS
                    // -----------------------------------------

                    successTimer = setTimeout(() => {

                        submitButton.innerHTML =
                            originalButtonContent;

                        submitButton.disabled = false;

                        successTimer = null;

                    }, 3000);


                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    // -----------------------------------------
                    // FORM SUBMISSION FAILED
                    // -----------------------------------------

                    if (formError) {

                        formError.textContent =
                            "Form submission failed. Please try again.";
                    }


                    submitButton.innerHTML = `
                        Form Submission Failed
                        <i class="fa-solid fa-circle-exclamation"></i>
                    `;

                    submitButton.disabled = false;


                    // -----------------------------------------
                    // SHOW TRY AGAIN
                    // -----------------------------------------

                    failureTimer = setTimeout(() => {

                        submitButton.innerHTML = `
                            Try Again
                            <i class="fa-solid fa-rotate-right"></i>
                        `;

                        failureTimer = null;

                    }, 2000);

                }

            }
        );
    }


    // =========================================
// CLOSE MOBILE NAVIGATION
// =========================================

const navMenu =
    document.querySelector("#mainNav");

const navLinks =
    document.querySelectorAll(
        "#mainNav .nav-link, #mainNav .btn"
    );


if (navMenu && navLinks.length) {

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (
                    navMenu.classList.contains("show") &&
                    typeof bootstrap !== "undefined"
                ) {

                    const collapse =
                        bootstrap.Collapse.getInstance(
                            navMenu
                        );

                    if (collapse) {

                        collapse.hide();

                    }

                }

            }
        );

    });


    // -----------------------------------------
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // -----------------------------------------

    document.addEventListener(
        "click",
        (event) => {

            if (!navMenu.classList.contains("show")) {
                return;
            }

            const navbar =
                document.querySelector(".navbar");

            if (
                navbar &&
                !navbar.contains(event.target)
            ) {

                const collapse =
                    bootstrap.Collapse.getInstance(
                        navMenu
                    );

                if (collapse) {
                    collapse.hide();
                }

            }

        }
    );

}


// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".navbar .nav-link");

if (navigationLinks.length) {

    const updateActiveNav = () => {

        // -----------------------------------------
        // GET CURRENT PAGE
        // -----------------------------------------

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        // -----------------------------------------
        // PROGRAMS PAGE
        // -----------------------------------------

        if (currentPage === "programs.html") {

            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const programsLink =
                document.querySelector(
                    '.navbar .nav-link[href="programs.html"]'
                );

            if (programsLink) {
                programsLink.classList.add("active");
            }

            return;
        }


        // -----------------------------------------
        // ABOUT PAGE
        // -----------------------------------------

        if (currentPage === "about.html") {

            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const aboutLink =
                document.querySelector(
                    '.navbar .nav-link[href="about.html"]'
                );

            if (aboutLink) {
                aboutLink.classList.add("active");
            }

            return;
        }


        // -----------------------------------------
        // HOMEPAGE
        // -----------------------------------------

        if (!sections.length) {
            return;
        }


        const scrollPosition =
            window.scrollY + 150;


        // -----------------------------------------
        // HOME ACTIVE AT TOP
        // -----------------------------------------

        if (window.scrollY < 100) {

            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const homeLink =
                document.querySelector(
                    '.navbar .nav-link[href="index.html#top"], .navbar .nav-link[href="#top"]'
                );

            if (homeLink) {
                homeLink.classList.add("active");
            }

            return;
        }


        // -----------------------------------------
        // FIND CURRENT HOMEPAGE SECTION
        // -----------------------------------------

        let currentSection = null;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {
                currentSection = section;
            }

        });


        if (!currentSection) {
            return;
        }


        const sectionId =
            currentSection.getAttribute("id");


        // -----------------------------------------
        // CLEAR ACTIVE STATES
        // -----------------------------------------

        navigationLinks.forEach((link) => {
            link.classList.remove("active");
        });


        // -----------------------------------------
        // ACTIVATE CORRESPONDING LINK
        // -----------------------------------------

        navigationLinks.forEach((link) => {

            const href =
                link.getAttribute("href");


            // Normal homepage section links
            if (
                href === `#${sectionId}` ||
                href === `index.html#${sectionId}`
            ) {
                link.classList.add("active");
            }


            // Programs section → programs.html
            if (
                sectionId === "programs" &&
                href === "programs.html"
            ) {
                link.classList.add("active");
            }


            // About section → about.html
            if (
                sectionId === "about" &&
                href === "about.html"
            ) {
                link.classList.add("active");
            }

        });

    };


    // -----------------------------------------
    // UPDATE WHILE SCROLLING
    // -----------------------------------------

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    // -----------------------------------------
    // INITIAL STATE
    // -----------------------------------------

    updateActiveNav();

}

    
});
