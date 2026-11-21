document.addEventListener("DOMContentLoaded", function() {
    const openingScenes = document.querySelectorAll('.opening-scene');
    let sceneUpdateScheduled = false;

    // Oppdatert funksjon for jevn og rask fading av bakgrunnsbilder
    const updateSceneBackgrounds = () => {
        const viewportHeight = window.innerHeight;

        openingScenes.forEach((scene) => {
            const rect = scene.getBoundingClientRect();
            
            let fadeIn;

            if (scene.classList.contains('moving-football-scene')) {
                const sceneHeading = scene.querySelector('h2');
                const followingBlock = scene.nextElementSibling;
                const headingTop = sceneHeading.getBoundingClientRect().top;
                const followingBlockTop = followingBlock.getBoundingClientRect().top;
                const fadeInProgress = (
                    viewportHeight - headingTop
                ) / (viewportHeight * 0.65);
                const fadeOutProgress = (
                    followingBlockTop - viewportHeight * 0.2
                ) / (viewportHeight * 0.65);

                fadeIn = Math.min(
                    0.55,
                    Math.max(0, fadeInProgress * 0.55),
                    Math.max(0, Math.min(1, fadeOutProgress)) * 0.55
                );
            } else if (
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
            
            if (scene.classList.contains('fourth-scene')) {
                const footerDetails = document.querySelector('.footer-details');
                const footerBrand = document.querySelector('.footer-brand');
                const footerDetailsTop = footerDetails.getBoundingClientRect().top;
                const footerBrandTop = footerBrand.getBoundingClientRect().top;
                const footerFadeDistance = footerBrandTop - footerDetailsTop;
                const footerFadeProgress = (
                    viewportHeight - footerDetailsTop
                ) / footerFadeDistance;

                fadeOut = 1 - footerFadeProgress;
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

    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let lockedScrollPosition = 0;
    const galleryItemPositions = new Map();

    galleryItems.forEach((item) => {
        galleryItemPositions.set(item, {
            gallery: item.parentElement,
            nextSibling: item.nextElementSibling
        });
    });

    const restoreGalleryItem = (item) => {
        const position = galleryItemPositions.get(item);
        item.classList.remove('is-zoomed');
        position.gallery.insertBefore(
            item,
            position.nextSibling && position.nextSibling.parentElement === position.gallery
                ? position.nextSibling
                : null
        );
    };

    const showZoomedItem = (item) => {
        const gallery = galleryItemPositions.get(item).gallery;
        const galleryTextBlock = gallery.closest('.text-block');
        const currentItem = galleryItems.find((galleryItem) =>
            galleryItem.classList.contains('is-zoomed')
        );

        if (currentItem && currentItem !== item) {
            restoreGalleryItem(currentItem);
        }

        document.body.appendChild(item);
        item.classList.add('is-zoomed');
        gallery.classList.add('has-zoomed');
        galleryTextBlock.classList.add('gallery-open');
        document.documentElement.classList.add('gallery-zoomed');
        document.body.classList.add('gallery-zoomed');

        if (!currentItem) {
            lockedScrollPosition = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${lockedScrollPosition}px`;
            document.body.style.width = '100%';
        }
    };

    const closeZoom = (item) => {
        const position = galleryItemPositions.get(item);
        const galleryTextBlock = position.gallery.closest('.text-block');
        restoreGalleryItem(item);
        position.gallery.classList.remove('has-zoomed');
        galleryTextBlock.classList.remove('gallery-open');
        document.documentElement.classList.remove('gallery-zoomed');
        document.body.classList.remove('gallery-zoomed');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, lockedScrollPosition);
    };

    galleryItems.forEach((item) => {
        const toggleZoom = () => {
            if (item.classList.contains('is-zoomed')) {
                closeZoom(item);
            } else {
                showZoomedItem(item);
            }
        };

        item.addEventListener('click', toggleZoom);
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleZoom();
            }
        });

        const gallery = galleryItemPositions.get(item).gallery;
        const galleryItemsInGroup = galleryItems.filter(
            (galleryItem) => galleryItemPositions.get(galleryItem).gallery === gallery
        );
        const index = galleryItemsInGroup.indexOf(item);

        const previousButton = item.querySelector('.gallery-nav-previous');
        if (previousButton) {
            previousButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (index > 0) {
                    showZoomedItem(galleryItemsInGroup[index - 1]);
                }
            });
        }

        const nextButton = item.querySelector('.gallery-nav-next');
        if (nextButton) {
            nextButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (index < galleryItemsInGroup.length - 1) {
                    showZoomedItem(galleryItemsInGroup[index + 1]);
                }
            });
        }
    });

    document.addEventListener('keydown', (event) => {
        const zoomedItem = document.querySelector('.gallery-item.is-zoomed');

        if ((event.key === 'Escape' || event.key === 'Enter') && zoomedItem) {
            event.preventDefault();
            closeZoom(zoomedItem);
            return;
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            if (!zoomedItem) {
                return;
            }

            event.preventDefault();
            const gallery = galleryItemPositions.get(zoomedItem).gallery;
            const group = galleryItems.filter(
                (galleryItem) => galleryItemPositions.get(galleryItem).gallery === gallery
            );
            const index = group.indexOf(zoomedItem);
            const nextIndex = event.key === 'ArrowRight'
                ? Math.min(index + 1, group.length - 1)
                : Math.max(index - 1, 0);
            showZoomedItem(group[nextIndex]);
        }
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
                ? 'Trykk på meg for å se forskjell på Halden Stadium – Bilde fra 2026-tallet'
                : 'Trykk på meg for å se forskjell på Halden Stadium – Bilde fra 1930-tallet Bildet er hentet fra Nasjonalbibliotekets bildesamling Halden,Halden stadion, Halden, Østfold';
        });
    }
});