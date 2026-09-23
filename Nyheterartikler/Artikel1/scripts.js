/* =========================
   DOM ELEMENTS
   Henter alle HTML-elementene som brukes for meny, søk og nyhetskort.
========================= */

// Henter de viktigste elementene i HTML-en som skal styres av JavaScript.
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
   HEADER NAVIGATION
   Hvis brukeren klikker på en hovedmeny-lenke, stoppes standard oppførsel.
   Dette er en enkel placeholder-oppførsel fordi menylinkene ikke peker til faktiske sider.
========================= */

// Hvis brukeren klikker på en menylink, stoppes vanlig lenkeoppførsel.
// Dette er bare en demo-oppførsel fordi sidene ikke faktisk er koblet sammen.
mainNavLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();
        alert("Dette er en placeholder");

    });

});


/* =========================
   SEARCH TOGGLE
   Knappen åpner eller lukker søkfeltet. Hvis feltet åpnes, fokuseres input-feltet med en gang.
========================= */

// Søknappen viser eller skjuler søkfeltet.
// Når søkfeltet åpnes, går fokus direkte til input-feltet.
searchButton.addEventListener("click", (event) => {

    event.stopPropagation();
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


/* =========================
   SEARCH FORM SUBMIT
   Hindrer sideomlasting og håndterer "tom søk"-tilfellet uten å sende brukeren videre.
========================= */

// Når formen sendes inn, stoppes vanlig sideoppdatering.
// Hvis brukeren ikke har skrevet noe, får de en melding og feltet får fokus.
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
   Lenker i footeren er også satt opp som placeholders og skal ikke navigere i dette demo-oppsettet.
========================= */

footerLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();
        alert("Dette er en placeholder");

    });

});


/* =========================
   RELATED NEWS CARDS
   Hvert nyhetskort peker til en annen artikkel via data-page-attributten.
   Klikk går direkte til riktig side uten å laste inn en ny HTML-fil manuelt.
========================= */

// Hvert nyhetskort har en data-page som peker til en annen artikkel.
// Når brukeren klikker, sendes de direkte til riktig side.
newsCards.forEach((card) => {

    card.addEventListener("click", () => {

        window.location.href = card.dataset.page;

    });

});

/* =========================
   CLOSE DROPDOWNS ON OUTSIDE CLICK
   Hvis brukeren klikker utenfor menyen eller søket, lukkes dem automatisk.
========================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu = mainNav.contains(event.target); 
    const clickedMenuButton = menuButton.contains(event.target);
    const clickedInsideSearch = searchBox.contains(event.target);
    const clickedSearchButton = searchButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton && mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
    }

    if (!clickedInsideSearch && !clickedSearchButton && searchBox.classList.contains("active")) {
        searchBox.classList.remove("active");
    }

});

/*   =========================
   ESCAPE KEY
   Trykk på Esc lukker både menyen og søkfeltet for bedre brukeropplevelse.
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        mainNav.classList.remove("active");
        searchBox.classList.remove("active");

    }

});