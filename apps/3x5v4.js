$(document).ready(function () {
    let images = [];
    let currentIndex = 0;

    function loadImages() {
        let scrollPosition = $(window).scrollTop(); // Save current scroll position

        $.getJSON("https://lofinoir.github.io/themeset/apps/images.json", function (data) {
            images = data;
            shuffleArray(images);
            createImageElements();
            $(window).scrollTop(scrollPosition); // Restore scroll position
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createImageElements() {
        const imageGrid = $(".image-grid");

        // Ensure visibility
        imageGrid.css("display", "flex");

        let newContent = "";
        images.forEach((image, index) => {
            newContent += `<img src="${image}" class="image-item" data-index="${index}">`;
        });

        // Prevent unnecessary fade-out on first load
        if (imageGrid.children().length > 0) {
            imageGrid.fadeOut(200, function () {
                imageGrid.html(newContent).fadeIn(200);
            });
        } else {
            imageGrid.html(newContent);
        }

        // Re-attach click event for lightbox
        $(".image-item").off("click").on("click", function () {
            currentIndex = $(this).data("index");
            displayLightbox();
        });
    }

    function displayLightbox() {
        $("#lightbox-image").attr("src", images[currentIndex]);
        $("#lightbox").css("display", "block");
    }

    $("#lightbox .close").click(function () {
        $("#lightbox").css("display", "none");
    });

    $("#prev-button").click(function () {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        displayLightbox();
    });

    $("#next-button").click(function () {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        displayLightbox();
    });

    // Disable auto-refresh on mobile, only refresh on desktop
    if ($(window).width() > 768) {
        setInterval(createImageElements, 10000); // Refresh every 10s on desktop
    }

    loadImages();
});
