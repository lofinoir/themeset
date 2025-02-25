$(document).ready(function () {
  let images = [];
  let currentIndex = 0;

  // function loadImages() {
  //   let scrollPosition = $(window).scrollTop(); // Save scroll position
    
  //   $.getJSON(
  //     "https://lofinoir.github.io/themeset/apps/images.json",
  //     function (data) {
  //       images = data;
  //       shuffleArray(images);
  //       createImageElements();
        
  //       $(window).scrollTop(scrollPosition); // Restore scroll position
  //     }
  //   );
  // }

function loadImages() {
    let scrollPosition = $(window).scrollTop();

    $.getJSON("https://lofinoir.github.io/themeset/apps/images.json", function (data) {
        images = data;
        shuffleArray(images);
        createImageElements();
        $(window).scrollTop(scrollPosition);
    });
}

// Auto-refresh **only on desktop** to prevent mobile refresh issues
if ($(window).width() > 768) {
    setInterval(createImageElements, 10000);
} else {
    loadImages(); // Mobile loads images once only
}


  // function createImageElements() {
  //   const imageGrid = $(".image-grid");
  //   let currentHeight = imageGrid.height(); // Preserve height
    
  //   imageGrid.fadeOut(200, function () {
  //     imageGrid.empty();
  //     images.forEach((image, index) => {
  //       const imgElement = $("<img>").attr("src", image).addClass("image-item");
  //       imgElement.click(function () {
  //         currentIndex = index;
  //         displayLightbox();
  //       });
  //       imageGrid.append(imgElement);
  //     });
      
  //     imageGrid.css("height", currentHeight + "px"); // Maintain height
  //     imageGrid.fadeIn(200);
  //   });
  // }


function createImageElements() {
    const imageGrid = $(".image-grid");

    // Ensure the container is always visible
    imageGrid.css("display", "block");
    
    // Store existing height to prevent shifting
    let currentHeight = imageGrid.outerHeight();
    imageGrid.css("min-height", currentHeight + "px");

    // Update images with minimal DOM changes
    let newContent = "";
    images.forEach((image, index) => {
        newContent += `<img src="${image}" class="image-item" data-index="${index}">`;
    });

    imageGrid.fadeOut(200, function () {
        imageGrid.html(newContent); // Replace content all at once
        imageGrid.fadeIn(200, function () {
            imageGrid.css("min-height", "auto"); // Reset height after load
        });
    });

    // Re-attach click event
    $(".image-item").off("click").on("click", function () {
        currentIndex = $(this).data("index");
        displayLightbox();
    });
}
  
  function displayLightbox() {
    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightbox-image");
    lightboxImage.attr("src", images[currentIndex]);
    lightbox.css("display", "block");
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

  if ($(window).width() > 768) { // Run only on desktop
      setInterval(createImageElements, 10000); // Refresh images every 10s
  }
  
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

const modalOverlay = document.querySelector(".modal-overlay");
modalOverlay.addEventListener("click", () => {
  modalOverlay.classList.remove("is-active");
  modalContent.classList.remove("is-active");
});

function preventScrolling() {
  document.body.style.overflowY = "hidden";
}

function allowScrolling() {
  document.body.style.overflowY = "auto";
}
