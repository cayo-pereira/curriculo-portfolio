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
                        '• Scrum no Contexto do Serviço Público (Enap).<br>• Jira e Confluence (Canal Valor).<br>• Curso Design Gráfico Completo 10 Cursos do Zero ao Avançado (Udemy).'+
                        '<br><br>Clique no menu lateral para acessar meu portfólio ou entrar em contato.'
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

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.project-gallery');

  gallery.addEventListener('mouseenter', () => {
    gallery.classList.add('spread');
  });

  gallery.addEventListener('mouseleave', () => {
    gallery.classList.remove('spread');
  });


// restante do seu código de modal (openModal, closeModal, navigateImage…)

    // Efeito de dispersão quando o mouse entra na galeria
    gallery.addEventListener('mouseenter', () => {
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                const offsetX = (index - 3) * 30;  // Dispersão mais leve
                const offsetRotation = (index - 3) * 10; // Ainda um pouco mais aberto

                item.style.transform = `translateX(${offsetX}px) rotate(${offsetRotation}deg)`;
                item.style.zIndex = index === 3 ? 10 : Math.abs(index - 3); // Central fica por cima
            }, index * 50);
        });
    });

    gallery.addEventListener('mouseleave', () => {
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                const offsetX = (index - 3) * 15; // Volta à posição inicial
                const offsetRotation = (index - 3) * 3;
                item.style.transform = `translateX(${offsetX}px) rotate(${offsetRotation}deg)`;
                item.style.zIndex = index === 3 ? 10 : Math.abs(index - 3);
            }, index * 30);
        });
    });

    // Efeito hover individual - destaca a imagem
    projectItems.forEach((item) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(0) rotate(0deg) scale(1.2)';
            this.style.zIndex = 20;
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 127, 0.7)';
        });
        
        item.addEventListener('mouseleave', function() {
            const index = Array.from(projectItems).indexOf(this);
            const offsetX = (index - 3) * (gallery.matches(':hover') ? 60 : 15);
            const offsetRotation = (index - 3) * (gallery.matches(':hover') ? 10 : 3);
            this.style.transform = `translateX(${offsetX}px) rotate(${offsetRotation}deg) scale(1)`;
            this.style.zIndex = index === 3 ? 10 : Math.abs(index - 3);
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });
});

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    
    modal.style.display = 'flex'; // Mudado para flex
    modalImg.src = images[currentImageIndex];
    
    // Forçar recálculo do layout
    setTimeout(() => {
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
    }, 10);
}

function centerModalImage() {
    const modalContent = document.querySelector('.modal-content');
    const modalImg = document.getElementById('modal-image');
    
    // Centraliza verticalmente
    modalContent.style.display = 'flex';
    modalContent.style.alignItems = 'center';
    modalContent.style.justifyContent = 'center';
}

// Adicione este evento para redimensionamento na janela
window.addEventListener('resize', function() {
    if (document.getElementById('image-modal').style.display === 'flex') {
        centerModalImage();
    }
});



    // Botão scroll down (pode ser ativado no futuro se desejar)
});

const portSobreSection = document.querySelector('#portfolio-sobre');
const observerPortSobre = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            new Typed('#typed-portsobre', {
                strings: [
                    'Aqui estão alguns dos projetos que desenvolvi com dedicação e criatividade. Eles representam minha jornada, aprendizado e habilidades práticas em design, desenvolvimento de scripts em IA e desenvolvimento web, incluindo:<br><br>' +
                    '• Aplicações Flask com banco de dados e APIs externas.<br>' +
                    '• Sistemas de marcação com controle administrativo.<br>' +
                    '• Layouts modernos, responsivos e acessíveis.'+
                    '<br><br>Também já trabalhei em projetos internos de T.I na equipe de gestão e controle, atualizando catalogo de serviços, estruturando projetos e auxiliando na elaboração do planejamento estratégico do setor.'
                ],
                typeSpeed: 10,
                backSpeed: 20,
                showCursor: true,
                cursorChar: '|',
                loop: false,
                contentType: 'html'
            });

            observerPortSobre.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

if (portSobreSection) {
    observerPortSobre.observe(portSobreSection);
}

const portSobre2Section = document.querySelector('#portfolio-sobre2');
const observerPortSobre2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            new Typed('#typed-portsobre2', {
                strings: [
                    'Nos projetos você vai encontrar:<br><br>• Um projeto de desenvolvimento do site institucional da empresa, desenvolvido em drupal e seguindo as normas vigentes. Esse projeto me ensinou muito sobre trabalho em equipe e atenção aos detalhes. link: https://www.nuclep.gov.br'+
                    '<br>  (Uma observação importante é que eu também participei do desenvolvimento do antigo site em drupal, porém o site não existe mais.)'+
                    '<br>• Um projeto de indicação de gêneros, títulos de filmes e sorteio utilizando a API do TMDB para uma página de sugestões.'+
                    '<br>• Um projeto de agendamento de consultas que utiliza um banco de dados local com uma pagina adm para controle que inclui exclusão das consultas, login e filtro.'+
                    '<br>• O site atual, feito para ser o meu curriculo web.'+
                    '<br><br>Gostarei muito de explicar com mais detalhes via e-mail, reunião ou qualquer outro meio de contato presente no menu lateral, aguardo seu contato.'
                ],
                typeSpeed: 10,
                backSpeed: 20,
                showCursor: true,
                cursorChar: '|',
                loop: false,
                contentType: 'html'
            });

            observerPortSobre2.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

if (portSobre2Section) {
    observerPortSobre2.observe(portSobre2Section);
}