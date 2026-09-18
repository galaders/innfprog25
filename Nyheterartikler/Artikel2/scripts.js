/* =========================
   ELEMENTS
========================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const mainNavLinks = document.querySelectorAll("#mainNav a");

const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const footerLinks = document.querySelectorAll(".footer-link");
const newsCards = document.querySelectorAll(".news-card");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    mainNav.classList.toggle("active");

});


/* =========================
   HEADER LINKS
========================= */

mainNavLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();
        alert("Dette er en placeholder");

    });

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
        alert("Skriv inn noe du vil men dette er en Placeholder.");
        return;
    }

    alert("Dette er en placeholder");

});


/* =========================
   FOOTER LINKS
========================= */

footerLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();
        alert("Dette er en placeholder");

    });

});


/* =========================
   RELATED NEWS
========================= */

newsCards.forEach((card) => {

    card.addEventListener("click", () => {

        window.location.href = card.dataset.page;

    });

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