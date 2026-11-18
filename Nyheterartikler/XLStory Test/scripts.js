document.addEventListener("DOMContentLoaded", () => {
    const openingScenes = document.querySelectorAll('.opening-scene');
    let sceneUpdateScheduled = false;

    const updateSceneBackgrounds = () => {
        const viewportHeight = window.innerHeight;

        openingScenes.forEach((scene) => {
            const rect = scene.getBoundingClientRect();
            const fadeIn = (viewportHeight - rect.top) / (viewportHeight * 0.4);
            const fadeOut = (rect.bottom - viewportHeight * 0.2) / (viewportHeight * 0.4);
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

    window.addEventListener('scroll', scheduleSceneUpdate, { passive: true });
    window.addEventListener('resize', scheduleSceneUpdate);
    updateSceneBackgrounds();
    
    /* =========================================
       1. FADE IN PÅ SCROLL (Intersection Observer)
    ========================================= */
    const faders = document.querySelectorAll('.fade-in-section, .story-image');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================
       2. BILDEGALLERI MED ZOOM
    ========================================= */
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
        const position = galleryItemPositions.get(item);
        const galleryTextBlock = position.gallery.closest('.text-block');
        const currentItem = galleryItems.find((galleryItem) =>
            galleryItem.classList.contains('is-zoomed')
        );

        if (currentItem && currentItem !== item) {
            restoreGalleryItem(currentItem);
        }

        document.body.appendChild(item);
        item.classList.add('is-zoomed');
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
        galleryTextBlock.classList.remove('gallery-open');
        document.documentElement.classList.remove('gallery-zoomed');
        document.body.classList.remove('gallery-zoomed');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, lockedScrollPosition);
    };

    galleryItems.forEach((item, index) => {
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

        const previousButton = item.querySelector('.gallery-nav-previous');
        if (previousButton) {
            previousButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (index > 0) {
                    showZoomedItem(galleryItems[index - 1]);
                }
            });
        }

        const nextButton = item.querySelector('.gallery-nav-next');
        if (nextButton) {
            nextButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (index < galleryItems.length - 1) {
                    showZoomedItem(galleryItems[index + 1]);
                }
            });
        }
    });

    /* =========================================
       3. BILDE-TOGGLE (Halden Stadium)
    ========================================= */
    const imageToggleBtn = document.querySelector('.image-toggle');
    const stadiumImage = document.getElementById('stadiumImage');
    const stadiumCaption = document.getElementById('stadiumCaption');

    if (imageToggleBtn && stadiumImage && stadiumCaption) {
        imageToggleBtn.addEventListener('click', () => {
            if (stadiumImage.src.includes('images_1.jpg')) {
                stadiumImage.src = 'Bilder/images_2.jpg'; 
                stadiumCaption.innerText = "Trykk på meg for å se forskjell på Halden Stadium – Bilde fra i dag";
            } else {
                stadiumImage.src = 'Bilder/images_1.jpg';
                stadiumCaption.innerText = "Trykk på meg for å se forskjell på Halden Stadium – Bilde fra 1930-tallet";
            }
        });
    }

    /* =========================================
       4. MANUELL KNAPP SOM FADER UT VED TEKST
    ========================================= */
    const audioStreet = document.getElementById('audio-street');
    const audioBtn = document.getElementById('audio-toggle-btn');
    const stopTrigger = document.getElementById('grusbane-stop-trigger');

    if (audioStreet && audioBtn && stopTrigger) {
        let userWantsAudio = false; // Husker om leseren har valgt å skru PÅ lyden

        // Klikk på knappen
        audioBtn.addEventListener('click', () => {
            if (audioStreet.paused) {
                audioStreet.play();
                userWantsAudio = true;
                audioBtn.innerHTML = '<span class="icon">🔊</span> Lyd på';
            } else {
                audioStreet.pause();
                userWantsAudio = false;
                audioBtn.innerHTML = '<span class="icon">🔇</span> Lyd av';
            }
        });

        // Lytter på scroll for å fade ut lyd og skjule knapp
        window.addEventListener('scroll', () => {
            const triggerPos = stopTrigger.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Regner ut glidende volum (0.0 til 1.0) basert på hvor trigger-seksjonen er
            let newVolume = (triggerPos - (windowHeight * 0.3)) / (windowHeight * 0.5);
            newVolume = Math.max(0, Math.min(1, newVolume));
            
            audioStreet.volume = newVolume;

            // Hvis vi nærmer oss triggeren og volumet går mot null
            if (newVolume <= 0.05) {
                audioBtn.classList.add('hidden'); // Gjem knappen
                
                if (!audioStreet.paused) {
                    audioStreet.pause(); // Sett på pause for å spare ressurser
                }
                userWantsAudio = false;
                audioBtn.innerHTML = '<span class="icon">🔇</span> Lyd av';
            } else {
                audioBtn.classList.remove('hidden'); // Vis knappen igjen
            }
        });
    }
});