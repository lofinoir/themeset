$(document).ready(function () {
  let images = [];
  let currentIndex = 0;

  function loadImages() {
    let scrollPosition = $(window).scrollTop(); // Save scroll position
    
    $.getJSON(
      "https://lofinoir.github.io/themeset/apps/images.json",
      function (data) {
        images = data;
        shuffleArray(images);
        createImageElements();
        
        $(window).scrollTop(scrollPosition); // Restore scroll position
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
    
    // Prevent container collapse without forcing height
    imageGrid.css("min-height", imageGrid.height() + "px");

    imageGrid.fadeOut(200, function () {
        imageGrid.empty();
        images.forEach((image, index) => {
            const imgElement = $("<img>").attr("src", image).addClass("image-item");
            imgElement.click(function () {
                currentIndex = index;
                displayLightbox();
            });
            imageGrid.append(imgElement);
        });

        imageGrid.fadeIn(200, function () {
            imageGrid.css("min-height", "auto"); // Allow normal behavior after update
        });
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
