const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        navItems.forEach((link) => link.classList.remove("active"));
        item.classList.add("active");
    });
});


/* =========================
   Certificate Viewer
========================= */

const certificateImages = document.querySelectorAll(
    ".certificate-preview"
);

const certificateViewer = document.getElementById(
    "certificateViewer"
);

const certificateViewerImage = document.getElementById(
    "certificateViewerImage"
);

const certificateClose = document.getElementById(
    "certificateClose"
);

const certificatePrev = document.getElementById(
    "certificatePrev"
);

const certificateNext = document.getElementById(
    "certificateNext"
);

let currentCertificate = 0;


/* Open Certificate */

function openCertificate(index) {

    currentCertificate = index;

    certificateViewerImage.src =
        certificateImages[currentCertificate].src;

    certificateViewerImage.alt =
        certificateImages[currentCertificate].alt;

    certificateViewer.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* Close Certificate */

function closeCertificate() {

    certificateViewer.classList.remove("active");

    document.body.style.overflow = "";
}


/* Previous Certificate */

function showPreviousCertificate() {

    currentCertificate--;

    if (currentCertificate < 0) {
        currentCertificate = certificateImages.length - 1;
    }

    certificateViewerImage.src =
        certificateImages[currentCertificate].src;

    certificateViewerImage.alt =
        certificateImages[currentCertificate].alt;
}


/* Next Certificate */

function showNextCertificate() {

    currentCertificate++;

    if (currentCertificate >= certificateImages.length) {
        currentCertificate = 0;
    }

    certificateViewerImage.src =
        certificateImages[currentCertificate].src;

    certificateViewerImage.alt =
        certificateImages[currentCertificate].alt;
}


/* Click Certificate */

certificateImages.forEach((image, index) => {

    image.addEventListener("click", () => {
        openCertificate(index);
    });

});


/* Buttons */

certificateClose.addEventListener(
    "click",
    closeCertificate
);

certificatePrev.addEventListener(
    "click",
    showPreviousCertificate
);

certificateNext.addEventListener(
    "click",
    showNextCertificate
);


/* Keyboard Navigation */

document.addEventListener("keydown", (event) => {

    if (!certificateViewer.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeCertificate();
    }

    if (event.key === "ArrowLeft") {
        showPreviousCertificate();
    }

    if (event.key === "ArrowRight") {
        showNextCertificate();
    }

});


/* Click Outside Image */

certificateViewer.addEventListener("click", (event) => {

    if (event.target === certificateViewer) {
        closeCertificate();
    }

});