


/* ========================================
   CERTIFICATE VIEWER (LIGHTBOX)
======================================== */

const certificatePreviews = Array.from(
    document.querySelectorAll(".certificate-preview")
);

const certificateViewer = document.getElementById("certificateViewer");
const certificateViewerImage = document.getElementById("certificateViewerImage");
const certificateClose = document.getElementById("certificateClose");
const certificatePrev = document.getElementById("certificatePrev");
const certificateNext = document.getElementById("certificateNext");

if (certificateViewer && certificatePreviews.length) {

    let certificateIndex = 0;

    function showCertificate(index) {

        certificateIndex = (index + certificatePreviews.length) % certificatePreviews.length;

        const preview = certificatePreviews[certificateIndex];

        certificateViewerImage.src = preview.src;
        certificateViewerImage.alt = preview.alt;
    }

    function openCertificateViewer(index) {

        showCertificate(index);

        certificateViewer.classList.add("active");

        document.body.style.overflow = "hidden";
    }

    function closeCertificateViewer() {

        certificateViewer.classList.remove("active");

        document.body.style.overflow = "";
    }

    const certificateCards = Array.from(
        document.querySelectorAll(".certificate-card")
    );

    certificateCards.forEach(function (card, index) {

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", function () {
            openCertificateViewer(index);
        });

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openCertificateViewer(index);
            }
        });
    });

    certificateClose.addEventListener("click", closeCertificateViewer);

    certificatePrev.addEventListener("click", function () {
        showCertificate(certificateIndex - 1);
    });

    certificateNext.addEventListener("click", function () {
        showCertificate(certificateIndex + 1);
    });

    certificateViewer.addEventListener("click", function (event) {

        if (event.target === certificateViewer) {
            closeCertificateViewer();
        }
    });

    document.addEventListener("keydown", function (event) {

        if (!certificateViewer.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeCertificateViewer();
        }

        if (event.key === "ArrowLeft") {
            showCertificate(certificateIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showCertificate(certificateIndex + 1);
        }
    });
}

/* ========================================
   SCROLL PROGRESS + NAVBAR STATE
======================================== */

const scrollProgressBar = document.getElementById("scrollProgressBar");
const header = document.querySelector(".header");

function updateScrollUI() {

    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    if (scrollProgressBar) {
        scrollProgressBar.style.transform = `scaleX(${progress})`;
    }

    if (header) {
        header.classList.toggle("scrolled", scrollTop > 24);
    }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();


/* ========================================
   SCROLLSPY (Bootstrap)
======================================== */

if (document.getElementById("nav-links") && window.bootstrap) {

    new bootstrap.ScrollSpy(document.documentElement, {
        target: "#nav-links",
        rootMargin: "0px 0px -45%",
        smoothScroll: true
    });
}


/* ========================================
   PROJECT MODAL (Bootstrap)
======================================== */

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const projectModalElement = document.getElementById("projectModal");

if (projectModalElement && projectCards.length && window.bootstrap) {

    const projectModal = new bootstrap.Modal(projectModalElement);

    const projectModalMedia = document.getElementById("projectModalMedia");
    const projectModalIndex = document.getElementById("projectModalIndex");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalDesc = document.getElementById("projectModalDesc");
    const projectModalStack = document.getElementById("projectModalStack");
    const projectModalStatus = document.getElementById("projectModalStatus");
    const projectModalLink = document.getElementById("projectModalLink");

    function openProjectModal(card) {

        const data = card.dataset;
        const number = card.querySelector(".project-number");
        const visual = card.querySelector(".project-visual");

        projectModalIndex.textContent = number ? number.textContent.trim() : "";
        projectModalTitle.textContent = data.title || "";
        projectModalDesc.textContent = data.description || "";
        projectModalStack.textContent = data.stack || "";
        projectModalStatus.textContent = data.status || "";

        if (data.link) {
            projectModalLink.href = data.link;
            projectModalLink.hidden = false;
        } else {
            projectModalLink.hidden = true;
        }

        projectModalMedia.innerHTML = "";

        if (visual) {
            projectModalMedia.appendChild(visual.cloneNode(true));
        }

        projectModal.show();
    }

    projectCards.forEach(function (card) {

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", function (event) {

            if (event.target.closest("a")) {
                return;
            }

            openProjectModal(card);
        });

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openProjectModal(card);
            }
        });
    });
}


/* ========================================
   CONTACT FORM VALIDATION + TOAST
======================================== */

const contactForm = document.getElementById("contact-form");
const formToastElement = document.getElementById("formToast");
const formStatus = document.getElementById("form-status");

if (contactForm && window.bootstrap) {

    const formToast = formToastElement
        ? new bootstrap.Toast(formToastElement, { delay: 4500 })
        : null;

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        contactForm.classList.add("was-validated");

        if (!contactForm.checkValidity()) {
            return;
        }

        if (formToast) {
            formToast.show();
        }

        if (formStatus) {
            formStatus.textContent = "Message sent. Thanks for reaching out!";
        }

        contactForm.reset();
        contactForm.classList.remove("was-validated");
    });
}
