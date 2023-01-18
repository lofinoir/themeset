// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");

  captionText.innerHTML = element.alt;
}

// create references to the modal...
const modal = document.getElementById("myModal");
// to all images -- note I'm using a class!
const images = document.getElementsByClassName("myImages");
// the image in the modal
const modalImg = document.getElementById("img01");
// and the caption in the modal
const captionText = document.getElementById("caption");

// Go through all of the images with our custom class
for (let i = 0; i < images.length; i++) {
  let img = images[i];
  // and attach our click listener for this image.
  img.addEventListener("click", (event) => {
    openModal(i);
  });
}

// Function to open modal
function openModal(index) {
  console.log("index", index);
  modal.dataset.index = index;
  modal.classList.add("open");
  modalImg.src = images[index].src;
  captionText.innerHTML = images[index].alt;
}

document.querySelector(".prev").addEventListener("click", (event) => {
  const index =
    modal.dataset.index === "0" ? images.length - 1 : +modal.dataset.index - 1;
  openModal(index);
});
document.querySelector(".next").addEventListener("click", (event) => {
  openModal((+modal.dataset.index + 1) % images.length);
});
