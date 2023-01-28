// Modal Image Gallery
function onClick(element) {
  const listElement = element.parentNode.parentNode;
  images = [...listElement.querySelectorAll("img")];
  const currentImageIndex = images.findIndex(function (image) {
    return element.src === image.src;
  });
  openModal(currentImageIndex);
}

// Function to open modal
function openModal(index) {
  modal.classList.add("open");
  modal.dataset.index = index;
  modalImg.src = images[index].src;
  captionText.innerHTML = images[index].alt;
}

function setClass(els, className, fnName) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
  }
}

// create references to the modal...
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const dropdown = document.getElementsByClassName("dropdown-btn");
let images;

document.addEventListener("DOMContentLoaded", function (event) {
  var acc = document.getElementsByClassName("accordion");
  var panel = document.getElementsByClassName("panel");

  for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      var setClasses = !this.classList.contains("active");
      setClass(acc, "active", "remove");
      setClass(panel, "show", "remove");

      if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
      }
    };
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  const acc = document.getElementsByClassName("accordionsub");
  const panel = document.getElementsByClassName("panelsub");

  for (let i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      const setClasses = !this.classList.contains("active");
      setClass(acc, "active", "remove");
      setClass(panel, "show", "remove");

      if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
      }
    };
  }
});

document.querySelector(".prev").addEventListener("click", (event) => {
  const index =
    modal.dataset.index === "0" ? images.length - 1 : +modal.dataset.index - 1;
  openModal(index);
});

document.querySelector(".next").addEventListener("click", (event) => {
  openModal((+modal.dataset.index + 1) % images.length);
});

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    Array.from(document.querySelectorAll(".dropdown-container")).forEach(
      (el) => {
        if (el !== dropdownContent) el.style.display = "none";
      }
    );

    //show the div that the user selected
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;

    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
