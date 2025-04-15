document.addEventListener('DOMContentLoaded', () => {
    // Efeito de digitação do header
    const typed = new Typed('#typed-text', {
        strings: [' print("Hello World") <br> Sejam bem vindos ao meu currículo e portfolio online.'],
        typeSpeed: 40,
        backSpeed: 50,
        showCursor: true,
        cursorChar: '|',
        loop: false,
        contentType: 'html'
    });

    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('menu-overlay');
    const sidebar = document.getElementById('sidebar');

    let menuOpen = false;

    let isTransitioning = false;

    menuToggle.addEventListener('click', () => {
        if (isTransitioning) return; // Impede cliques múltiplos durante a transição
    
        menuToggle.classList.toggle('active');
        isTransitioning = true;
    
        if (!menuOpen) {
            // Abre o menu
            overlay.classList.add('active');
    
            const onTransitionEnd = () => {
                sidebar.classList.add('open');
                overlay.removeEventListener('transitionend', onTransitionEnd);
                menuOpen = true;
                isTransitioning = false;
            };
    
            overlay.addEventListener('transitionend', onTransitionEnd);
    
        } else {
            // Fecha o menu
            sidebar.classList.remove('open');
    
            // Aguarda a animação da sidebar antes de fechar o overlay
            setTimeout(() => {
                overlay.classList.remove('active');
                menuOpen = false;
                isTransitioning = false;
            }, 300); // Esse valor deve ser igual à transição do CSS da sidebar
        }
    });
    

    // Intersection Observer - seção Sobre
    const sobreSection = document.querySelector('#sobre');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-sobre', {
                    strings: [
                        'Atualmente tenho 27 anos, resido em Nilópolis/RJ, estou no ultimo período do curso de engenharia da computação e estou\n\n' +
                        'buscando experiências novas no setor de T.I. Procuro vagas como Trainee ou analista, em áreas como desenvolvimento de sistemas,\n' +
                        'analise de dados, gestão de projetos, governança de T.I.'
                    ],
                    typeSpeed: 10,
                    backSpeed: 20,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (sobreSection) {
        observer.observe(sobreSection);
    }

    // Scroll snapping
    let isScrolling = false;
    const scrollDelay = 800;

    // Intersection Observer - seção Competências
    const competenciasSection = document.querySelector('#competencias');
    const observerCompetencias = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-competencias', {
                    strings: [`
    HTML       CSS        JavaScript     Python      SQL
    Git/GitHub Linux      Flask          Bootstrap   Scrum
                `],
                    typeSpeed: 20,
                    backSpeed: 10,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false,
                    contentType: 'html'
                });

                observerCompetencias.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (competenciasSection) {
        observerCompetencias.observe(competenciasSection);
    }


    document.addEventListener('wheel', (e) => {
        if (menuOpen || isScrolling) return;

        isScrolling = true;
        const delta = Math.sign(e.deltaY);
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;

        let targetScroll;
        if (delta > 0) {
            targetScroll = Math.floor(currentScroll / windowHeight) * windowHeight + windowHeight;
        } else {
            targetScroll = Math.max(0, Math.ceil(currentScroll / windowHeight) * windowHeight - windowHeight);
        }

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }, { passive: false });
    

    // Teclas de navegação
    document.addEventListener('keydown', (e) => {
        if (menuOpen || isScrolling) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            isScrolling = true;

            const delta = e.key === 'ArrowDown' ? 1 : -1;
            const currentScroll = window.scrollY;
            const windowHeight = window.innerHeight;

            let targetScroll;
            if (delta > 0) {
                targetScroll = Math.floor(currentScroll / windowHeight) * windowHeight + windowHeight;
            } else {
                targetScroll = Math.max(0, Math.ceil(currentScroll / windowHeight) * windowHeight - windowHeight);
            }

            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isScrolling = false;
            }, scrollDelay);
        }
    });

    // Âncoras suaves
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                isScrolling = true;
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(() => {
                    isScrolling = false;
                }, scrollDelay);
            }
        });
    });

    // Botão scroll down
    
});
