// Reload the images with a different set of random images at a set interval of 30 seconds
setInterval(function () {
  // Shuffle the image URLs
  var shuffledImages = data.sort(() => Math.random() - 0.5);

  // Display the images in the grid
  $(".grid-item").each(function (index) {
    $(this).css("background-image", "url(" + shuffledImages[index] + ")");
  });
}, 30000);
