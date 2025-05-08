console.log('Carregou o script do carrossel');

// Verificação inicial do Typed.js
if (typeof Typed === 'undefined') {
    console.error('Atenção: Typed.js não foi carregado corretamente!');
}

document.addEventListener('DOMContentLoaded', () => {
    // Efeito de digitação do header (portfolio.html)
    if (document.querySelector('#typed-portfolio-header')) {
        try {
            new Typed('#typed-portfolio-header', {
                strings: ['Portfólio de Cayo Pereira<br>Confira meus principais projetos e trabalhos.'],
                typeSpeed: 20,
                backSpeed: 30,
                startDelay: 300,
                showCursor: true,
                cursorChar: '|',
                loop: false,
                contentType: 'html',
                onBegin: (self) => self.el.innerHTML = '',
                preStringTyped: (pos, self) => self.el.innerHTML = ''
            });
        } catch (e) {
            console.error('Erro no Typed.js (header):', e);
            document.querySelector('#typed-portfolio-header').innerHTML = 
                'Portfólio de Cayo Pereira<br>Confira meus principais projetos e trabalhos.';
        }
    }
    if (document.querySelector('#typed-text')) {
        try {
            new Typed('#typed-text', {
                strings: [' print("Hello World") <br> Sejam bem vindos ao meu currículo e portfolio web.'],
                typeSpeed: 30,
                backSpeed: 40,
                startDelay: 300,
                showCursor: true,
                cursorChar: '|',
                loop: false,
                contentType: 'html',
                onBegin: (self) => self.el.innerHTML = '',
                preStringTyped: (pos, self) => self.el.innerHTML = ''
            });
        } catch (e) {
            console.error('Erro no Typed.js (header index):', e);
            document.querySelector('#typed-text').innerHTML = 
                ' print("Hello World") <br> Sejam bem vindos ao meu currículo e portfolio web.';
        }
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
        }

        menuToggle.removeAttribute('onclick');
        menuToggle.addEventListener('click', toggleMenu);

        document.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });
    }
    setupMenu();
    
    // Configuração do Carrossel
    function setupCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const dots = document.querySelectorAll('.dot');
        const infoText = document.getElementById('carousel-info-text');
        const prevBtn = document.querySelector('.carousel-arrow.prev');
        const nextBtn = document.querySelector('.carousel-arrow.next');
        
        if (!items.length || !dots.length) return;

        let currentIndex = 0;
        const infoTexts = [
            'Página de administração do sistema de agendamento de consultas.',
            'Página inicial, para o usuário realizar o agendamento da sua consulta. O campo de horário atualiza conforme os horarios disponiveis no dia selecionado.',
            'Página de sugestões do sistema de filmes. A página usa uma API de filmes que busca algumas informações para ajudar o usuário a escolher um filme para indicar.',
            'Pagina de administração do sistema de filmes. Mostra todas as indicações de gênero e filme com a possibilidade de excluir caso tenha indicações erradas, assim como opções para sortear, definir quantidade de pessoas e resetar todo o sistema.',
            'Página de indicações e resultados. Possui botão para indicar gênero ou filme, assim como mostra os resultados dos sorteios.'
        ];

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
            dots[index].classList.add('active');
            infoText.textContent = infoTexts[index];
            
            currentIndex = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
            if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
        });

        showSlide(0);
    }
    setupCarousel();

    // Função auxiliar para os efeitos de digitação
    function setupSectionObserver(sectionId, typedElementId, strings, options = {}) {
        const section = document.querySelector(sectionId);
        const typedElement = document.querySelector(typedElementId);
        
        if (!section || !typedElement) return;

        // Fallback se Typed.js não estiver disponível
        if (typeof Typed === 'undefined') {
            typedElement.innerHTML = Array.isArray(strings) ? strings[0] : strings;
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    try {
                        // Destrói instância anterior se existir
                        if (typedElement._typed) {
                            typedElement._typed.destroy();
                        }
                        
                        typedElement._typed = new Typed(typedElement, {
                            strings: Array.isArray(strings) ? strings : [strings],
                            typeSpeed: options.typeSpeed || 5,
                            backSpeed: options.backSpeed || 10,
                            startDelay: 300,
                            showCursor: options.showCursor !== false,
                            cursorChar: '|',
                            loop: false,
                            contentType: 'html',
                            onBegin: (self) => self.el.innerHTML = '',
                            preStringTyped: (pos, self) => self.el.innerHTML = '',
                            ...options
                        });
                    } catch (e) {
                        console.error(`Erro no Typed.js (${typedElementId}):`, e);
                        typedElement.innerHTML = Array.isArray(strings) ? strings[0] : strings;
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(section);
    }

    // Seções com efeito de digitação
    setupSectionObserver('#sobre', '#typed-sobre', [
        'Atualmente tenho 27 anos, resido em Nilópolis/RJ, estou no ultimo período do curso de engenharia da computação e estou\n\n' +
        'buscando experiências novas no setor de T.I. Procuro vagas como Trainee ou analista, em áreas como desenvolvimento de sistemas,\n' +
        'analise de dados, gestão de projetos, governança de T.I.'
    ]);

    setupSectionObserver('#competencias', '#typed-competencias', [`
        <div class="competencias-grid">
            <div>• Pacote Office<br>• Pacote Adobe<br>• Inglês<br>• Scrum<br>• COBIT<br>• ITIL</div>
            <div>• HTML<br>• CSS<br>• Plone<br>• Drupal<br>• Gestão de projetos<br>• Python</div>
            <div>• Power BI<br>• Benner<br>• JIRA<br>• Lógica<br>• Resolução de problemas<br>• Organização</div>
            <div>• Comunicação<br>• Trabalho em equipe<br>• Planejamento<br>• Resiliência<br>• Atendimento ao cliente</div>
        </div>
    `], { showCursor: false });

    setupSectionObserver('#experiencias', '#typed-experiencias', [
        'Possuo experiências de trabalho com atendimento ao cliente, '+
        'trabalho em equipe, cumprimento de prazos e até mesmo liderança.'+
        'Também trabalhos como freelancer de design gráfico e suporte de T.I (remoto e presencial), tanto no hardware como software.'+
        '<br>Abaixo minhas experiências:'+
        '<br><br>Nuclep (02/2025 - Atual)<br>Estagiário em Assistência de transformação digital.<br>Manutenção de softwares internos, desenvolvimento de site em drupal e plone além de suporte ao usuário.' +
        ' Testes de software, apoio a equipe e desenvolvimento de sistemas web em python, js, flask, html e css.<br><br>'+
        'Nuclep (2023 - 2024)<br>Estagiário em Governança de T.I.<br>Elaboração de documentos, estudos para contratação, apoio na gestão de projetos (COBIT, ITIL e metodologias ágeis).'
    ]);

    setupSectionObserver('#experiencias2', '#typed-experiencias2', [
        'Autônomo (2020 - Atual)<br>Suporte técnico para computadores<br>Montagem e manutenção de computadores, limpeza, formação e consultoria.<br><br>'+
        'Autônomo (2021 - 2023)<br>Freelancer Design Gráfico.<br>Logotipo e identidade de marca, posts personalizados de redes sociais e divulgações de eventos como flyers.<br><br>'+
        'ESPRO (Ensino Social Profissionalizante) (2018 - 2019)<br>Jovem Aprendiz<br>Atendimento ao cliente e trabalho em equipe.'
    ]);

    setupSectionObserver('#educacao', '#typed-educacao', [
        'Minha formação educacional:<br><br>' +
        'Bacharel em Engenharia da Computação<br>Universidade Cândido Mendes (07/2021 - 07/2025).<br><br>' +
        'Cursos complementares:<br>• Microsoft Security, Compliance, and Identity Fundamentals, Tecnologia da Informação (Microsoft).<br>'+
        '• Fundamentos da Lei Geral de Proteção de Dados (Enap).<br>• Uso do Lean e Inception na Administração Pública (Enap).<br>'+
        '• Scrum no Contexto do Serviço Público (Enap).<br>• Jira e Confluence (Canal Valor).<br>• Curso Design Gráfico Completo 10 Cursos do Zero ao Avançado (Udemy).'+
        '<br><br>Clique no menu lateral para acessar meu portfólio ou entrar em contato.'
    ]);

    // Seções do portfolio.html
    setupSectionObserver('#portfolio-sobre', '#typed-portsobre', [
        'Aqui estão alguns dos projetos que desenvolvi com dedicação e criatividade. Eles representam minha jornada, aprendizado e habilidades práticas em design, desenvolvimento de scripts em IA e desenvolvimento web, incluindo:<br><br>' +
        '• Aplicações Flask com banco de dados e APIs externas.<br>' +
        '• Sistemas de marcação com controle administrativo.<br>' +
        '• Layouts modernos, responsivos e acessíveis.'+
        '<br><br>Também já trabalhei em projetos internos de T.I na equipe de gestão de projetos, atualizando catalogo de serviços, estruturando projetos e auxiliando na elaboração do planejamento estratégico do setor.'
    ]);

    setupSectionObserver('#portfolio-sobre2', '#typed-portsobre2', [
        'Nos projetos você vai encontrar:<br><br>'+
        '• O site atual, feito para ser o meu curriculo web.<br>'+
        '• Um projeto de desenvolvimento do site institucional da empresa que fui estágiario, desenvolvido em drupal e seguindo as normas vigentes. Esse projeto me ensinou muito sobre trabalho em equipe e atenção aos detalhes.'+
        '<br>  (Uma observação importante é que eu também participei do desenvolvimento do antigo site em drupal, porém o site não existe mais.)'+
        '<br>• Um projeto de indicação de gêneros, títulos de filmes e sorteio utilizando a API do TMDB para uma página de sugestões.'+
        '<br>• Um projeto de agendamento de consultas que utiliza um banco de dados local com uma pagina adm para controle que inclui exclusão das consultas, login e filtro.'+
        '<br><br>Gostarei muito de explicar com mais detalhes via e-mail, reunião ou qualquer outro meio de contato pessoal que estão presentes no menu lateral, aguardo seu contato.'
    ]);

    // Scroll snapping
    function setupScrollSnapping() {
        let isScrolling = false;
        const scrollDelay = 800;

        document.addEventListener('wheel', (e) => {
            if (document.getElementById('sidebar')?.classList.contains('open') || isScrolling) return;

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

        document.addEventListener('keydown', (e) => {
            if (document.getElementById('sidebar')?.classList.contains('open') || isScrolling) return;

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
    }
    setupScrollSnapping();

    // Âncoras suaves
    function setupSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const sidebar = document.getElementById('sidebar');
                if (sidebar?.classList.contains('open')) {
                    document.getElementById('menu-toggle').classList.remove('active');
                    document.getElementById('menu-overlay').classList.remove('active');
                    sidebar.classList.remove('open');
                }

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    let isScrolling = true;
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    setTimeout(() => {
                        isScrolling = false;
                    }, 800);
                }
            });
        });
    }
    setupSmoothAnchors();
});

// Funções do Modal
function openModal(index) {
    const images = [
        "{{ url_for('static', filename='img/agen-consu-adm.png') }}",
        "{{ url_for('static', filename='img/agen-consu-home.png') }}",
        "{{ url_for('static', filename='img/port-1.png') }}",
        "{{ url_for('static', filename='img/port-home-film.png') }}",
        "{{ url_for('static', filename='img/port-sort-film.png') }}",
        "{{ url_for('static', filename='img/port-sugestoes-film.png') }}",
        "{{ url_for('static', filename='img/port-admin-filmes.png') }}",
    ];
    
    currentImageIndex = index;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    
    modal.style.display = 'flex';
    modalImg.src = images[currentImageIndex];
    
    setTimeout(() => {
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    }, 10);
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

function navigateImage(direction) {
    const images = [
        "{{ url_for('static', filename='img/agen-consu-adm.png') }}",
        "{{ url_for('static', filename='img/agen-consu-home.png') }}",
        "{{ url_for('static', filename='img/port-1.png') }}",
        "{{ url_for('static', filename='img/port-home-film.png') }}",
        "{{ url_for('static', filename='img/port-sort-film.png') }}",
        "{{ url_for('static', filename='img/port-sugestoes-film.png') }}",
        "{{ url_for('static', filename='img/port-admin-filmes.png') }}",
    ];
    
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    document.getElementById('modal-image').src = images[currentImageIndex];
}

window.addEventListener('resize', function() {
    if (document.getElementById('image-modal')?.style.display === 'flex') {
        const modal = document.getElementById('image-modal');
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    }
});

