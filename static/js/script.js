console.log('Carregou o script.js modificado');

if (typeof Typed === 'undefined') {
    console.error('Atenção: Typed.js não foi carregado corretamente!');
}

document.addEventListener('DOMContentLoaded', () => {
    function initTyped(elementSelector, sourceObject, key, options = {}) {
        const element = document.querySelector(elementSelector);
        if (!element) return;

        let stringsToType = [];
        if (sourceObject && sourceObject[key]) {
            stringsToType = Array.isArray(sourceObject[key]) ? sourceObject[key] : [sourceObject[key]];
        } else {
            const dataText = element.getAttribute('data-text');
            if (dataText) {
                stringsToType = [dataText];
            } else {
                console.warn(`Nenhuma string encontrada para ${elementSelector} em ${sourceObject ? 'sourceObject' : 'data-text'}`);
                element.innerHTML = element.getAttribute('data-text') || "";
                return;
            }
        }

        if (typeof Typed === 'undefined') {
            element.innerHTML = stringsToType.join('<br>');
            return;
        }

        try {
            new Typed(elementSelector, {
                strings: stringsToType,
                typeSpeed: options.typeSpeed || 30,
                backSpeed: options.backSpeed || 30,
                startDelay: 300,
                showCursor: options.showCursor !== false,
                cursorChar: '|',
                loop: false,
                contentType: options.contentType || 'html',
                onBegin: (self) => self.el.innerHTML = '',
                preStringTyped: (pos, self) => self.el.innerHTML = '',
                ...options
            });
        } catch (e) {
            console.error(`Erro no Typed.js (${elementSelector}):`, e);
            element.innerHTML = stringsToType.join('<br>');
        }
    }

    if (document.querySelector('#typed-text') && window.typedTexts) {
        initTyped('#typed-text', window.typedTexts, 'typed-text', { typeSpeed: 30, backSpeed: 40 });
    }

    if (document.querySelector('#typed-portfolio-header') && window.typedPortfolioTexts) {
        initTyped('#typed-portfolio-header', window.typedPortfolioTexts, 'typed-portfolio-header', { typeSpeed: 20, backSpeed: 30 });
    }

    // Configuração do Menu
    function setupMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const overlay = document.getElementById('menu-overlay');
        const sidebar = document.getElementById('sidebar');

        if (!menuToggle || !overlay || !sidebar) return;

        let menuOpen = false;
        let isTransitioning = false;

        function toggleMenu() {
            if (isTransitioning) return;

            menuToggle.classList.toggle('active');
            isTransitioning = true;

            if (!menuOpen) {
                overlay.classList.add('active');
                const onOverlayTransitionEnd = () => {
                    sidebar.classList.add('open');
                    overlay.removeEventListener('transitionend', onOverlayTransitionEnd);
                    menuOpen = true;
                    isTransitioning = false;
                };
                overlay.addEventListener('transitionend', onOverlayTransitionEnd);

            } else {
                sidebar.classList.remove('open');
                setTimeout(() => {
                    overlay.classList.remove('active');
                    menuOpen = false;
                    isTransitioning = false;
                }, 300);
            }
        }

        menuToggle.removeAttribute('onclick');
        menuToggle.addEventListener('click', toggleMenu);

        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) {
                    toggleMenu();
                }
            });
        });
    }
    setupMenu();

    // MODAL DE IMAGEM EXPANDIDA
    const imageModalOverlay = document.getElementById('image-modal-overlay');
    const expandedImage = document.getElementById('expanded-image-src');
    const modalCaption = document.getElementById('image-modal-caption');
    const closeModalButton = document.querySelector('.image-modal-close');

    function openImageModal(src, caption) {
        if (!imageModalOverlay || !expandedImage || !modalCaption) return;
        expandedImage.src = src;
        modalCaption.innerHTML = caption;
        imageModalOverlay.classList.add('visible');
        document.body.classList.add('modal-open');
    }

    function closeImageModal() {
        if (!imageModalOverlay) return;
        imageModalOverlay.classList.remove('visible');
        document.body.classList.remove('modal-open');
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeImageModal);
    }
    if (imageModalOverlay) {
        imageModalOverlay.addEventListener('click', (event) => {
            if (event.target === imageModalOverlay) {
                closeImageModal();
            }
        });
    }
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModalOverlay && imageModalOverlay.classList.contains('visible')) {
            closeImageModal();
        }
    });

    function setupCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const items = carousel.querySelectorAll('.carousel-item');
        const dotsContainer = document.querySelector('.carousel-dots');
        const infoTextElement = document.getElementById('carousel-info-text-display');
        const prevBtn = document.querySelector('.carousel-arrow.prev');
        const nextBtn = document.querySelector('.carousel-arrow.next');

        if (!items.length || !dotsContainer || !infoTextElement) return;

        const dots = dotsContainer.querySelectorAll('.dot');
        let currentIndex = 0;
        const imageInfos = window.galleryImageInfos || [];

        function showSlide(index) {
            if (index >= items.length) index = 0;
            if (index < 0) index = items.length - 1;

            items.forEach(item => {
                item.style.opacity = '0';
                item.classList.remove('active');
            });
            dots.forEach(dot => dot.classList.remove('active'));

            items[index].style.opacity = '1';
            items[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');

            if (imageInfos[index] !== undefined) {
                infoTextElement.innerHTML = imageInfos[index];
            } else {
                const currentItemInfo = items[index] ? items[index].dataset.info : 'Informações não disponíveis.';
                infoTextElement.innerHTML = currentItemInfo.replace(/\r\n|\n|\r/g, '<br>');
            }

            currentIndex = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const imgSrc = item.src;

                const imgInfo = (imageInfos[index] !== undefined)
                    ? imageInfos[index]
                    : (item.dataset.info || 'Informação não disponível.');

                openImageModal(imgSrc, imgInfo.replace(/\r\n|\n|\r/g, '<br>'));
            });
        });


        document.addEventListener('keydown', (e) => {
            const galeriaSection = document.getElementById('portfolio-galeria');
            // Não interfere se o modal de imagem estiver aberto
            if (imageModalOverlay && imageModalOverlay.classList.contains('visible')) return;

            if (galeriaSection && window.getComputedStyle(galeriaSection).display !== 'none') {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    showSlide(currentIndex + 1);
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    showSlide(currentIndex - 1);
                }
            }
        });

        if (items.length > 0) {
            showSlide(0);
        }
    }
    setupCarousel();

    function setupSectionObserver(sectionId, typedElementId, options = {}) {
        const section = document.querySelector(sectionId);
        const typedElement = document.querySelector(typedElementId);

        if (!section || !typedElement) return;

        let textSource = null;
        if (window.typedTexts && window.typedTexts[typedElementId] !== undefined) {
            textSource = window.typedTexts;
        } else if (window.typedPortfolioTexts && window.typedPortfolioTexts[typedElementId] !== undefined) {
            textSource = window.typedPortfolioTexts;
        }

        let stringsToType = textSource ? (Array.isArray(textSource[typedElementId]) ? textSource[typedElementId] : [textSource[typedElementId]]) : null;

        if (!stringsToType && typedElement.dataset.text) {
            stringsToType = [typedElement.dataset.text];
        }

        if (!stringsToType || stringsToType.length === 0 || stringsToType[0].trim() === "") {
            return;
        }

        if (typeof Typed === 'undefined') {
            typedElement.innerHTML = stringsToType.join('<br>');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    try {
                        if (typedElement._typed) {
                            typedElement._typed.destroy();
                        }

                        let finalContentType = options.contentType || 'html';
                        if (typedElementId === 'typed-competencias') {
                            finalContentType = 'html';
                        }

                        typedElement._typed = new Typed(typedElement, {
                            strings: stringsToType,
                            typeSpeed: options.typeSpeed || 5,
                            backSpeed: options.backSpeed || 10,
                            startDelay: options.startDelay || 300,
                            showCursor: options.showCursor !== false,
                            cursorChar: '|',
                            loop: false,
                            contentType: finalContentType,
                            onBegin: (self) => self.el.innerHTML = '',
                            preStringTyped: (pos, self) => self.el.innerHTML = '',
                            ...options
                        });
                    } catch (e) {
                        console.error(`Erro no Typed.js (${typedElementId}):`, e);
                        typedElement.innerHTML = stringsToType.join('<br>');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: options.threshold || 0.5 });

        observer.observe(section);
    }

    // index.html
    setupSectionObserver('#sobre', '#typed-sobre');
    setupSectionObserver('#competencias', '#typed-competencias', { showCursor: false });
    setupSectionObserver('#experiencias', '#typed-experiencias');
    setupSectionObserver('#experiencias2', '#typed-experiencias2');
    setupSectionObserver('#educacao', '#typed-educacao');

    // portfolio.html
    setupSectionObserver('#portfolio-sobre', '#typed-portsobre');
    setupSectionObserver('#portfolio-sobre2', '#typed-portsobre2');

    function setupScrollSnapping() {
        let isScrolling = false;
        const scrollDelay = 800;

        document.addEventListener('wheel', (e) => {
            if (document.getElementById('sidebar')?.classList.contains('open') ||
                (imageModalOverlay && imageModalOverlay.classList.contains('visible')) ||
                isScrolling) return;


            const delta = Math.sign(e.deltaY);
            const currentScroll = window.scrollY;
            const windowHeight = window.innerHeight;
            let targetScroll;

            if (delta > 0) {
                targetScroll = Math.floor(currentScroll / windowHeight) * windowHeight + windowHeight;
            } else {
                targetScroll = Math.max(0, Math.ceil(currentScroll / windowHeight) * windowHeight - windowHeight);
            }

            const maxScroll = document.documentElement.scrollHeight - windowHeight;
            targetScroll = Math.min(targetScroll, maxScroll);

            if (Math.abs(currentScroll - targetScroll) > 1) {
                e.preventDefault();
                isScrolling = true;
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }

            setTimeout(() => {
                isScrolling = false;
            }, scrollDelay);
        }, { passive: false });

        document.addEventListener('keydown', (e) => {
            if (document.getElementById('sidebar')?.classList.contains('open') ||
                (imageModalOverlay && imageModalOverlay.classList.contains('visible')) ||
                isScrolling) return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End') {

                let preventDefault = true;
                if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                    preventDefault = false;
                }
                if (preventDefault) e.preventDefault(); else return;

                isScrolling = true;

                const currentScroll = window.scrollY;
                const windowHeight = window.innerHeight;
                let targetScroll;

                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                    targetScroll = Math.floor(currentScroll / windowHeight) * windowHeight + windowHeight;
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    targetScroll = Math.max(0, Math.ceil(currentScroll / windowHeight) * windowHeight - windowHeight);
                } else if (e.key === 'Home') {
                    targetScroll = 0;
                } else if (e.key === 'End') {
                    targetScroll = document.documentElement.scrollHeight - windowHeight;
                }

                const maxScroll = document.documentElement.scrollHeight - windowHeight;
                targetScroll = Math.min(targetScroll, maxScroll);
                targetScroll = Math.max(0, targetScroll);


                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isScrolling = false;
                }, scrollDelay);
            }
        });
    }
    setupScrollSnapping();

    function setupSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    e.preventDefault();
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const sidebar = document.getElementById('sidebar');
                    if (sidebar?.classList.contains('open')) {
                        const menuToggle = document.getElementById('menu-toggle');
                        const overlay = document.getElementById('menu-overlay');
                        if (menuToggle) menuToggle.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                        sidebar.classList.remove('open');
                    }

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    setupSmoothAnchors();
});