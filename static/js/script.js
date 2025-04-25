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
                        'Possuo experiências de trabalho com atendimento ao cliente, '+
                        'trabalho em equipe, cumprimento de prazos e até mesmo liderança.'+
                        'Também alguns trabalhos mais específicos como freelancer de design gráfico e suporte de T.I (remoto e presencial), tanto no hardware como software.'+
                        '<br>Abaixo minhas experiências:'+
                        '<br><br>Nuclep (2024 - Atual)<br>Estagiário em Assistência de transformação digital.<br>Manutenção de softwares internos, desenvolvimento de site em drupal e plone além de suporte ao usuário.' +
                        ' Testes de software, apoio a equipe e desenvolvimento de sistemas web em python, js, flask, html e css.<br><br>'+
                        'Nuclep (2023 - 2024)<br>Estagiário em Governança de T.I.<br>Elaboração de documentos, estudos para contratação, apoio na gestão de projetos (COBIT, ITIL e metodologias ágeis).'
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

        // Intersection Observer - seção Experiências 2
    const experiencias2Section = document.querySelector('#experiencias2');
    const observerExperiencias2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-experiencias2', {
                    strings: [
                        'Autônomo (2020 - Atual)<br>Suporte técnico para computadores<br>Montagem e manutenção de computadores, limpeza, formação e consultoria.<br><br>'+
                        'Autônomo (2021 - 2023)<br>Freelancer Design Gráfico.<br>Logotipo e identidade de marca, posts personalizados de redes sociais e divulgações de eventos como flyers.<br><br>'+
                        'ESPRO (Ensino Social Profissionalizante) (2018 - 2019)<br>Jovem Aprendiz<br>Atendimento ao cliente e trabalho em equipe.'
                    ],
                    typeSpeed: 10,
                    backSpeed: 20,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false,
                    contentType: 'html'
                });
    
                observerExperiencias2.unobserve(entry.target);
            }
        });
    }, {
            threshold: 0.5
    });
    
    if (experiencias2Section) {
        observerExperiencias2.observe(experiencias2Section);
    }

        // Intersection Observer - seção Educação
    const educacaoSection = document.querySelector('#educacao');
    const observerEducacao = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new Typed('#typed-educacao', {
                    strings: [
                        'Minha formação educacional:<br><br>' +
                        'Bacharel em Engenharia da Computação<br>Universidade Cândido Mendes (07/2021 - 07/2025).<br><br>' +
                        'Cursos complementares:<br>• Microsoft Security, Compliance, and Identity Fundamentals, Tecnologia da Informação (Microsoft).<br>'+
                        '• Fundamentos da Lei Geral de Proteção de Dados (Enap).<br>• Uso do Lean e Inception na Administração Pública (Enap).<br>'+
                        '• Scrum no Contexto do Serviço Público (Enap).<br>• Jira e Confluence (Canal Valor).<br>• Curso Design Gráfico Completo 10 Cursos do Zero ao Avançado (Udemy).'
                    ],
                    typeSpeed: 10,
                    backSpeed: 20,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false,
                    contentType: 'html'
                });

                observerEducacao.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (educacaoSection) {
        observerEducacao.observe(educacaoSection);
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
