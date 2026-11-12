// JavaScript for å lage "fade-in"-effekten når du scroller (Intersection Observer)
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (
                entry.target.classList.contains('opening-scene') ||
                entry.target.classList.contains('story-image')
            ) {
                entry.target.classList.toggle('visible', entry.isIntersecting);
            } else if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15 // Starter animasjonen når 15% av elementet er synlig
    });

    const hiddenSections = document.querySelectorAll('.fade-in-section, .opening-scene');
    hiddenSections.forEach((el) => observer.observe(el));

    const stadiumImage = document.querySelector('#stadiumImage');
    const stadiumCaption = document.querySelector('#stadiumCaption');
    const stadiumToggle = document.querySelector('.image-toggle');
    let showingCurrentStadium = false;

    stadiumToggle.addEventListener('click', function() {
        showingCurrentStadium = !showingCurrentStadium;
        stadiumImage.src = showingCurrentStadium
            ? 'Bilder/images_2.jpg'
            : 'Bilder/images_1.jpg';
        stadiumImage.alt = showingCurrentStadium
            ? 'Halden Stadium nå'
            : 'Halden Stadium før';
        stadiumCaption.textContent = showingCurrentStadium
            ? 'Trykk på meg for å se forskjell på Halden Stadium – Får nå tekst satt inn ferdig'
            : 'Trykk på meg for å se forskjell på Halden Stadium – Sett inn tekst for nå';
    });
});