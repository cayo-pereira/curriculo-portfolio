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
        if (isTransitioning) return;

        menuToggle.classList.toggle('active');
        isTransitioning = true;

        if (!menuOpen) {
            overlay.classList.add('active');

            const onTransitionEnd = () => {
                sidebar.classList.add('open');
                overlay.removeEventListener('transitionend', onTransitionEnd);
                menuOpen = true;
                isTransitioning = false;
            };

            overlay.addEventListener('transitionend', onTransitionEnd);
        } else {
            sidebar.classList.remove('open');
            setTimeout(() => {
                overlay.classList.remove('active');
                menuOpen = false;
                isTransitioning = false;
            }, 300);
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

    // Intersection Observer - seção Competências
    const competenciasSection = document.querySelector('#competencias');
    const observerCompetencias = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-competencias', {
                    strings: [`
                        <div class="competencias-grid">
                            <div>• Pacote Office<br>• Pacote Adobe<br>• Inglês<br>• Scrum<br>• COBIT<br>• ITIL</div>
                            <div>• HTML<br>• CSS<br>• Plone<br>• Drupal<br>• Gestão de projetos<br>• Python</div>
                            <div>• Power BI<br>• Benner<br>• JIRA<br>• Lógica<br>• Resolução de problemas<br>• Organização</div>
                            <div>• Comunicação<br>• Trabalho em equipe<br>• Planejamento<br>• Resiliência<br>• Atendimento ao cliente</div>
                        </div>
                    `],
                    
                    typeSpeed: 20,
                    backSpeed: 10,
                    showCursor: false,
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

    // Intersection Observer - seção Experiências
    const experienciasSection = document.querySelector('#experiencias');
    const observerExperiencias = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-experiencias', {
                    strings: [
                        'Empresa XYZ (2022 - Atual)<br>Desenvolvedor Júnior - Desenvolvimento de aplicações web com Flask, manutenção de sistemas legados.<br><br>' +
                        'Empresa ABC (2021 - 2022)<br>Estagiário em TI - Apoio à equipe de desenvolvimento, documentação de sistemas, testes de software.'
                    ],
                    typeSpeed: 10,
                    backSpeed: 20,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false,
                    contentType: 'html'
                });

                observerExperiencias.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (experienciasSection) {
        observerExperiencias.observe(experienciasSection);
    }

    // Scroll snapping
    let isScrolling = false;
    const scrollDelay = 800;

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

            // Fecha o menu quando clicar em um link
            if (menuOpen) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                menuToggle.classList.remove('active');
                menuOpen = false;
                isTransitioning = false;
            }

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

    // Botão scroll down (pode ser ativado no futuro se desejar)
});
