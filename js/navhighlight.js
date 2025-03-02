document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");
    const currentURL = window.location.href; // Get full URL

    links.forEach((link) => {
        if (link.href === currentURL) {
            link.classList.add("active");
        }
    });
});
