document.addEventListener("DOMContentLoaded", function() {
    const openingScenes = document.querySelectorAll('.opening-scene');
    let sceneUpdateScheduled = false;

    // Oppdatert funksjon for jevn og rask fading av bakgrunnsbilder
    const updateSceneBackgrounds = () => {
        const viewportHeight = window.innerHeight;

        openingScenes.forEach((scene) => {
            const rect = scene.getBoundingClientRect();
            
            let fadeIn;

            if (
                scene.classList.contains('opening-scene') &&
                !scene.classList.contains('second-scene') &&
                !scene.classList.contains('fourth-scene')
            ) {
                const firstQuote = scene.querySelector('.xl-quote');
                const followingQuote = scene.nextElementSibling;
                const quoteTop = firstQuote.getBoundingClientRect().top;
                const quoteProgress = (viewportHeight - quoteTop) / (viewportHeight * 0.4);
                const followingQuoteTop = followingQuote.getBoundingClientRect().top;
                const fadeOut = (
                    followingQuoteTop - viewportHeight * 0.2
                ) / (viewportHeight * 0.8);

                fadeIn = Math.min(
                    0.55,
                    Math.max(0, quoteProgress * 0.55),
                    Math.max(0, Math.min(1, fadeOut)) * 0.55
                );
            } else if (scene.classList.contains('second-scene')) {
                const sceneQuote = scene.querySelector('.xl-quote');
                const quoteTop = sceneQuote.getBoundingClientRect().top;
                const quoteProgress = (viewportHeight - quoteTop) / (viewportHeight * 0.4);

                fadeIn = Math.min(0.55, Math.max(0, quoteProgress * 0.55));
            } else if (scene.classList.contains('fourth-scene')) {
                const fadeStartHeading = scene.querySelector('.text-block:last-child h2');
                const finalParagraph = scene.querySelector('.text-block:last-child p:last-of-type');
                const fadeStartTop = fadeStartHeading.getBoundingClientRect().top;
                const finalParagraphTop = finalParagraph.getBoundingClientRect().top;
                const fadeDistance = finalParagraphTop - fadeStartTop;

                fadeIn = (
                    viewportHeight - fadeStartTop
                ) / (viewportHeight * 0.15 + fadeDistance);
            } else {
                // Fader inn når toppen av seksjonen kommer inn fra bunnen av skjermen
                fadeIn = (viewportHeight - rect.top) / (viewportHeight * 0.4);
            }
            
            // Fader ut raskere ved å starte ut-fadingen litt før 
            let fadeOut = (rect.bottom - viewportHeight * 0.2) / (viewportHeight * 0.4);
            
            // NY KODE: Hindre at scene 4 fader ut på slutten av siden
            if (scene.classList.contains('fourth-scene')) {
                fadeOut = 1; // Holder verdien på maks, slik at den aldri forsvinner i bunnen
            }
            
            // Beregner opacity slik at den blir maksimalt 1, og aldri under 0
            const opacity = Math.max(0, Math.min(1, fadeIn, fadeOut));
            
            scene.style.setProperty('--scene-background-opacity', opacity.toFixed(3));
        });

        sceneUpdateScheduled = false;
    };

    const scheduleSceneUpdate = () => {
        if (sceneUpdateScheduled) {
            return;
        }
        sceneUpdateScheduled = true;
        window.requestAnimationFrame(updateSceneBackgrounds);
    };

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

    const hiddenSections = document.querySelectorAll('.fade-in-section, .opening-scene, .story-image');
    hiddenSections.forEach((el) => observer.observe(el));
    
    // Lyttere for scrolling og endring av vindusstørrelse
    window.addEventListener('scroll', scheduleSceneUpdate, { passive: true });
    window.addEventListener('resize', scheduleSceneUpdate);
    updateSceneBackgrounds(); // Kjør en gang ved oppstart for å sette riktig opacity umiddelbart

    const galleryItems = document.querySelectorAll('.gallery-item');
    let lockedScrollPosition = 0;
    const galleryItemPositions = new Map();

    galleryItems.forEach((item) => {
        galleryItemPositions.set(item, {
            gallery: item.parentElement,
            nextSibling: item.nextElementSibling
        });
    });

    galleryItems.forEach((item) => {
        const toggleZoom = () => {
            const itemPosition = galleryItemPositions.get(item);
            const gallery = itemPosition.gallery;
            const galleryTextBlock = gallery.closest('.text-block');
            const wasZoomed = gallery.classList.contains('has-zoomed');
            const shouldZoom = !item.classList.contains('is-zoomed');

            if (shouldZoom) {
                galleryItems.forEach((galleryItem) => {
                    if (!galleryItem.classList.contains('is-zoomed')) {
                        return;
                    }

                    galleryItem.classList.remove('is-zoomed');
                    const position = galleryItemPositions.get(galleryItem);
                    const nextSibling = position.nextSibling;
                    position.gallery.insertBefore(
                        galleryItem,
                        nextSibling && nextSibling.parentElement === position.gallery
                            ? nextSibling
                            : null
                    );
                });

                document.body.appendChild(item);
            } else {
                gallery.insertBefore(
                    item,
                    itemPosition.nextSibling && itemPosition.nextSibling.parentElement === gallery
                        ? itemPosition.nextSibling
                        : null
                );
            }

            gallery.classList.toggle('has-zoomed', shouldZoom);
            galleryTextBlock.classList.toggle('gallery-open', shouldZoom);
            document.documentElement.classList.toggle('gallery-zoomed', shouldZoom);
            document.body.classList.toggle('gallery-zoomed', shouldZoom);

            if (shouldZoom && !wasZoomed) {
                lockedScrollPosition = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${lockedScrollPosition}px`;
                document.body.style.width = '100%';
            } else if (!shouldZoom) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, lockedScrollPosition);
            }

            item.classList.toggle('is-zoomed', shouldZoom);
        };

        item.addEventListener('click', toggleZoom);
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleZoom();
            }
        });
    });

    // Funksjon for "før og nå" klikkbilde (stadium)
    const stadiumImage = document.querySelector('#stadiumImage');
    const stadiumCaption = document.querySelector('#stadiumCaption');
    const stadiumToggle = document.querySelector('.image-toggle');
    let showingCurrentStadium = false;

    if (stadiumToggle) {
        stadiumToggle.addEventListener('click', function() {
            showingCurrentStadium = !showingCurrentStadium;
            stadiumImage.src = showingCurrentStadium
                ? 'Bilder/IMG_6712.jpg'
                : 'Bilder/images_1.jpg';
            stadiumImage.alt = showingCurrentStadium
                ? 'Halden Stadium nå'
                : 'Halden Stadium før';
            stadiumCaption.textContent = showingCurrentStadium
                ? 'Trykk på meg for å se forskjell på Halden Stadium – Får nå tekst satt inn ferdig'
                : 'Trykk på meg for å se forskjell på Halden Stadium – Sett inn tekst for nå';
        });
    }
});