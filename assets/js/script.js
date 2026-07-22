/* ======================================================
   Moto旅 - Premium Motorcycle Magazine
   script.js Part 1
   Navigation & UI
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       SELECTORS
    ================================================== */

    const header = document.querySelector("header");
    const navToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");
    const backToTop = document.querySelector(".back-to-top");

    /* ==================================================
       MOBILE MENU
    ================================================== */

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                navToggle.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }

    /* ==================================================
       STICKY HEADER
    ================================================== */

    function stickyHeader() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);

    /* ==================================================
       ACTIVE NAVIGATION
    ================================================== */

    const sections = document.querySelectorAll("section[id]");

    function activeNavigation() {

        const scrollY = window.pageYOffset;

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

    activeNavigation();

    window.addEventListener("scroll", activeNavigation);

    /* ==================================================
       SMOOTH SCROLL
    ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

        });

    });

    /* ==================================================
       BACK TO TOP
    ================================================== */

    function toggleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    toggleBackToTop();

    window.addEventListener("scroll", toggleBackToTop);

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

});
/* ======================================================
   Moto旅 - Premium Motorcycle Magazine
   script.js Part 2
   Scroll Reveal • Lazy Loading • Animations
====================================================== */

(() => {

    "use strict";

    /* ==================================================
       REVEAL ELEMENTS
    ================================================== */

    const revealElements = document.querySelectorAll(
        ".fade-up, .section-title, .article-card, .bike-card, .brand-card, .review-card, .tour-card, .tip-card, .testimonial-card, .gallery-grid img, .stat-box"
    );

    if (revealElements.length) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));

    }

    /* ==================================================
       STAGGER ANIMATION
    ================================================== */

    document.querySelectorAll(
        ".articles-grid, .review-grid, .tips-grid, .gallery-grid, .testimonial-grid, .tour-grid"
    ).forEach(grid => {

        [...grid.children].forEach((item, index) => {

            item.style.transitionDelay = `${index * 120}ms`;

        });

    });

    /* ==================================================
       LAZY LOAD IMAGES
    ================================================== */

    const lazyImages = document.querySelectorAll("img.lazy");

    if (lazyImages.length) {

        const imageObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                const source = img.dataset.src;

                if (source) {

                    img.src = source;

                }

                img.onload = () => {

                    img.classList.add("loaded");

                };

                observer.unobserve(img);

            });

        }, {
            threshold: 0.2
        });

        lazyImages.forEach(img => imageObserver.observe(img));

    }

    /* ==================================================
       PARALLAX HERO
    ================================================== */

    const heroImage = document.querySelector(".hero-image img");

    function heroParallax() {

        if (!heroImage) return;

        const offset = window.pageYOffset * 0.18;

        heroImage.style.transform = `translateY(${offset}px) scale(1.03)`;

    }

    window.addEventListener("scroll", heroParallax, {
        passive: true
    });

    /* ==================================================
       IMAGE HOVER GLOW
    ================================================== */

    document.querySelectorAll(
        ".bike-card img, .article-card img, .review-card img, .gallery-grid img"
    ).forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.filter =
                "brightness(1.08) contrast(1.05) saturate(1.08)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.filter = "";

        });

    });

    /* ==================================================
       AUTO HIGHLIGHT CURRENT SECTION
    ================================================== */

    const allSections = document.querySelectorAll("section[id]");

    const navItems = document.querySelectorAll(".nav-links a");

    if (allSections.length && navItems.length) {

        const sectionObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navItems.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + entry.target.id) {

                        link.classList.add("active");

                    }

                });

            });

        }, {

            threshold: 0.55

        });

        allSections.forEach(section => sectionObserver.observe(section));

    }

    /* ==================================================
       REDUCE MOTION SUPPORT
    ================================================== */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        document.documentElement.style.scrollBehavior = "auto";

        document.querySelectorAll("*").forEach(el => {

            el.style.animation = "none";
            el.style.transition = "none";

        });

    }

})();
/* ======================================================
   Moto旅 - Premium Motorcycle Magazine
   script.js Part 3
   Counter • Gallery Lightbox • Newsletter • Ripple
====================================================== */

(() => {

    "use strict";

    /* ==================================================
       ANIMATED COUNTERS
    ================================================== */

    const counters = document.querySelectorAll(".stat-box h2");

    if (counters.length) {

        const counterObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = parseInt(counter.dataset.count || counter.textContent.replace(/\D/g, ""), 10);

                if (isNaN(target)) return;

                let current = 0;
                const duration = 1800;
                const increment = target / (duration / 16);

                function updateCounter() {

                    current += increment;

                    if (current < target) {

                        counter.textContent = Math.floor(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        const suffix = counter.dataset.suffix || "+";

                        counter.textContent = target + suffix;

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            });

        }, {
            threshold: 0.4
        });

        counters.forEach(counter => {

            counter.dataset.count = counter.textContent.replace(/\D/g, "");

            counterObserver.observe(counter);

        });

    }

    /* ==================================================
       GALLERY LIGHTBOX
    ================================================== */

    const galleryImages = document.querySelectorAll(".gallery-grid img");

    if (galleryImages.length) {

        const overlay = document.createElement("div");

        overlay.className = "gallery-lightbox";

        overlay.innerHTML = `
            <span class="gallery-close">&times;</span>
            <img src="" alt="Gallery Image">
        `;

        document.body.appendChild(overlay);

        const overlayImage = overlay.querySelector("img");

        galleryImages.forEach(image => {

            image.addEventListener("click", () => {

                overlayImage.src = image.src;

                overlay.classList.add("show");

                document.body.style.overflow = "hidden";

            });

        });

        overlay.addEventListener("click", e => {

            if (
                e.target === overlay ||
                e.target.classList.contains("gallery-close")
            ) {

                overlay.classList.remove("show");

                document.body.style.overflow = "";

            }

        });

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") {

                overlay.classList.remove("show");

                document.body.style.overflow = "";

            }

        });

    }

    /* ==================================================
       NEWSLETTER VALIDATION
    ================================================== */

    const newsletter = document.querySelector(".newsletter form");

    if (newsletter) {

        newsletter.addEventListener("submit", e => {

            e.preventDefault();

            const input = newsletter.querySelector("input");

            const email = input.value.trim();

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(email)) {

                alert("Please enter a valid email address.");

                input.focus();

                return;

            }

            alert("🎉 Thank you for subscribing!");

            newsletter.reset();

        });

    }

    /* ==================================================
       RIPPLE EFFECT
    ================================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(e){

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";

            ripple.style.left = e.clientX - rect.left - size / 2 + "px";

            ripple.style.top = e.clientY - rect.top - size / 2 + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==================================================
       KEYBOARD ACCESSIBILITY
    ================================================== */

    document.querySelectorAll("button,a").forEach(item => {

        item.addEventListener("keyup", e => {

            if (e.key === "Enter") {

                item.click();

            }

        });

    });

})();
/* ======================================================
   Moto旅 - Premium Motorcycle Magazine
   script.js Part 4 (Final)
   Loading • Progress • Theme • Performance
====================================================== */

(() => {

    "use strict";

    /* ==================================================
       LOADING SCREEN
    ================================================== */

    window.addEventListener("load", () => {

        const loader = document.querySelector(".loader");

        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 600);

    });

    /* ==================================================
       READING PROGRESS BAR
    ================================================== */

    const progressBar = document.querySelector(".reading-progress");

    function updateReadingProgress() {

        if (!progressBar) return;

        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    updateReadingProgress();

    window.addEventListener("scroll", updateReadingProgress, {
        passive: true
    });

    /* ==================================================
       OPTIONAL THEME TOGGLE
    ================================================== */

    const themeButton = document.querySelector(".theme-toggle");

    if (themeButton) {

        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "light") {

            document.body.classList.add("light-theme");

        }

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const currentTheme =
                document.body.classList.contains("light-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem("theme", currentTheme);

        });

    }

    /* ==================================================
       PAGE VISIBILITY
    ================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            document.title = "👋 Come back to Moto旅";

        } else {

            document.title = "Moto旅 | Premium Motorcycle Magazine";

        }

    });

    /* ==================================================
       EXTERNAL LINKS
    ================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });

    /* ==================================================
       COPY EMAIL BUTTON (Optional)
    ================================================== */

    document.querySelectorAll("[data-copy]").forEach(button => {

        button.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(button.dataset.copy);

                button.classList.add("copied");

                setTimeout(() => {

                    button.classList.remove("copied");

                }, 1500);

            } catch (err) {

                console.error(err);

            }

        });

    });

    /* ==================================================
       PERFORMANCE
    ================================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            window.dispatchEvent(new Event("optimizedResize"));

        }, 200);

    });

    /* ==================================================
       YEAR
    ================================================== */

    const year = document.querySelector(".current-year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    /* ==================================================
       PREVENT DOUBLE FORM SUBMIT
    ================================================== */

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", () => {

            const submit = form.querySelector(
                'button[type="submit"]'
            );

            if (!submit) return;

            submit.disabled = true;

            setTimeout(() => {

                submit.disabled = false;

            }, 2000);

        });

    });

    /* ==================================================
       INITIALIZATION
    ================================================== */

    console.log(
        "%cMoto旅 Loaded Successfully 🚀",
        "color:#ff3d00;font-size:16px;font-weight:bold;"
    );

})();
