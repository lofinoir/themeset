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
  }

  $("#lightbox .close").click(function () {
    $("#lightbox").css("display", "none");
  });

  $("#prev-button").click(function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = images.length - 1; // Loop to the last image
    }
    displayLightbox();
  });

  $("#next-button").click(function () {
    if (currentIndex < images.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop to the first image
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
