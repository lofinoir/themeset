/* FILE: 3X5v3.js (Complete and Revised) */
/*
  This file loads images from a JSON file, shuffles them, and populates a responsive grid.
  It is a direct replacement for your existing file.
*/

$(document).ready(function() {
    let images = [];
    let currentIndex = 0;

    // Helper function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to load images from the JSON file
    function loadImages() {
        $.getJSON("https://lofinoir.github.io/themeset/apps/images.json", function(data) {
            images = data;
            createImageElements(); // Create the grid for the first time
        });
    }

    // Function to create and display the image grid elements
    function createImageElements() {
        const imageGrid = $(".image-grid");

        // Shuffle images every time this function is called
        shuffleArray(images);

        // Build the new grid content as an HTML string for better performance
        let newContent = "";
        
        // We will display the first 15 images to create the 5x3 or 3x5 grid
        const imagesToDisplay = images.slice(0, 15);

        imagesToDisplay.forEach((imageSrc, index) => {
            // THE FIX: We wrap each image in a <div class="grid-item">
            // This is necessary for the CSS to work correctly.
            newContent += `
                <div class="grid-item" data-index="${index}">
                    <img src="${imageSrc}" alt="Commissioned work sample ${index + 1}">
                </div>
            `;
        });

        // Use a fade effect for a smooth transition on refresh
        imageGrid.fadeOut(200, function() {
            // Replace the entire content of the grid
            imageGrid.html(newContent);

            // Re-attach the click event to the newly created .grid-item elements
            $(".grid-item").off("click").on("click", function() {
                currentIndex = $(this).data("index");
                displayLightbox(imagesToDisplay); // Pass the currently displayed set of images
            });

            // Fade the new grid back in
            imageGrid.fadeIn(200);
        });
    }

    // Function to open the lightbox and display the selected image
    function displayLightbox(currentGridImages) {
        const lightbox = $("#lightbox");
        const lightboxImage = $("#lightbox-image");
        lightboxImage.attr("src", currentGridImages[currentIndex]);
        lightbox.css("display", "block");
        $("body").css("overflow", "hidden"); // Prevent background scrolling
    }
    
    // === EVENT LISTENERS ===

    // Close button for the modal
    $("#close-modal").click(function() {
        $("#lightbox").css("display", "none");
        $("body").css("overflow", "auto"); // Re-enable scrolling
    });

    // Previous button
    $("#prev-button").click(function() {
        const currentGridImages = images.slice(0, 15);
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGridImages.length - 1;
        displayLightbox(currentGridImages);
    });

    // Next button
    $("#next-button").click(function() {
        const currentGridImages = images.slice(0, 15);
        currentIndex = (currentIndex < currentGridImages.length - 1) ? currentIndex + 1 : 0;
        displayLightbox(currentGridImages);
    });

    // Keyboard navigation for the lightbox
    $(document).keydown(function(e) {
        if ($("#lightbox").css("display") === "block") {
            if (e.key === "ArrowLeft") {
                $("#prev-button").click();
            } else if (e.key === "ArrowRight") {
                $("#next-button").click();
            } else if (e.key === "Escape") {
                $("#close-modal").click();
            }
        }
    });

    // === INITIALIZATION ===

    // Auto-refresh the grid every 10 seconds, but ONLY on desktop screens
    if ($(window).width() > 768) {
        setInterval(createImageElements, 10000);
    }
    
    // Load the images when the page is ready
    loadImages();
});
