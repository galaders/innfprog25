/* =========================
   ELEMENTS
========================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    mainNav.classList.toggle("active");

});


/* =========================
   SEARCH
========================= */

searchButton.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


/* =========================
   SEARCH FORM
========================= */

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
        alert("Skriv inn noe du vil søke etter.");
        return;
    }

    /*
        Her kan du senere koble til en database/API.

        Eksempel:
        window.location.href =
            "/sok.html?q=" + encodeURIComponent(query);
    */

    alert("Du søkte etter: " + query);

});
/* =========================
   CLOSE MENU WHEN CLICKING
   OUTSIDE
========================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        mainNav.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        mainNav.classList.contains("active")
    ) {
        mainNav.classList.remove("active");
    }

});


/*   =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        mainNav.classList.remove("active");
        searchBox.classList.remove("active");

    }

});