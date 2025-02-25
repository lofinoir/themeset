$(document).ready(function () {
    let images = [];
    let currentIndex = 0;

    function loadImages() {
        $.getJSON(
            "https://lofinoir.github.io/themeset/apps/images.json",
            function (data) {
                images = data;
                shuffleArray(images);
                createImageElements();
            }
        );
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getRandomInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createImageElements() {
        const imageGrid = $(".image-grid");
        imageGrid.empty();
        images.forEach((image, index) => {
            const imgElement = $("<img>").attr("src", image).addClass("image-item");
            imgElement.click(function () {
                currentIndex = index;
                displayLightbox();
            });
            imageGrid.append(imgElement);
        });
    }

    function displayLightbox() {
        const lightbox = $("#lightbox");
        const lightboxImage = $("#lightbox-image");
        lightboxImage.attr("src", images[currentIndex]);
        lightbox.css("display", "block");
        preventScrolling(); // Prevent scrolling when lightbox is open
    }

    $("#lightbox .close").click(function () {
        $("#lightbox").css("display", "none");
        allowScrolling(); // Allow scrolling when lightbox is closed
    });

    $("#prev-button").click(function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        displayLightbox();
    });

    $("#next-button").click(function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        displayLightbox();
    });

    loadImages();
});

$(document).keydown(function (e) {
    if ($("#lightbox").css("display") === "block") {
        if (e.key === "ArrowLeft") {
            $("#prev-button").click();
        } else if (e.key === "ArrowRight") {
            $("#next-button").click();
        } else if (e.key === "Escape") {
            $("#lightbox .close").click();
        }
    }
});

function preventScrolling() {
    document.body.style.overflow = "hidden"; // Use overflow: hidden; instead of overflowY
}

function allowScrolling() {
    document.body.style.overflow = ""; // Reset overflow to default
}
