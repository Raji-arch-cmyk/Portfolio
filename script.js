/* ========================================
   3D PROFILE CARD
======================================== */

const profileCard = document.getElementById("profileCard");

if (profileCard) {

    profileCard.addEventListener("mousemove", function (event) {

        const rect = profileCard.getBoundingClientRect();

        // Mouse position inside the card
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Convert position to percentage
        const xPercent = mouseX / rect.width;
        const yPercent = mouseY / rect.height;

        // Center mouse position around 0
        const x = xPercent - 0.5;
        const y = yPercent - 0.5;

        // Maximum rotation
        const rotateY = x * 18;
        const rotateX = y * -18;

        // Sideways movement
        const moveX = x * 12;
        const moveY = y * 8;

        // Apply 3D movement
        profileCard.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateX(${moveX}px)
            translateY(${moveY}px)
            scale(1.03)
        `;

        // Move the light to the mouse
        profileCard.style.setProperty(
            "--mouse-x",
            `${mouseX}px`
        );

        profileCard.style.setProperty(
            "--mouse-y",
            `${mouseY}px`
        );
    });


    // When mouse leaves the card
    profileCard.addEventListener("mouseleave", function () {

        profileCard.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateX(0)
            translateY(0)
            scale(1)
        `;

        profileCard.style.setProperty(
            "--mouse-x",
            "50%"
        );

        profileCard.style.setProperty(
            "--mouse-y",
            "50%"
        );
    });
}