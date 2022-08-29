/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
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

//  <!-- MENU SECTIONS==============

//       ASSIGNMENTS
//       people
//       places
//       stories
//       things

//       PERSONAL PROJECTS
//       une étude dans le chaos
//       toujours en mouvement
//       plusieurs cadres liminaux
//       en bas en haut
//       silhouette de ballet
//       problème

//       ABOUT
//       CONTACT
//       BLOG
