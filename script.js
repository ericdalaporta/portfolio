document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector('.navbar');
    const smoothScrollLinks = document.querySelectorAll('.nav-links a, .logo a, a.button[href^="#"]');
    const body = document.body;

    const themeToggle = document.getElementById('theme-checkbox');
    const languageToggle = document.getElementById('language-checkbox');
    const themeToggleMobile = document.getElementById('theme-checkbox-mobile');
    const languageToggleMobile = document.getElementById('language-checkbox-mobile');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navMenuLinks = document.querySelectorAll('.nav-links > li > a');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');

    function openMenu() {
        hamburger.classList.add('active');
        navLinksContainer.classList.add('active');
        menuBackdrop.classList.add('active');
        body.classList.add('menu-is-open');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        menuBackdrop.classList.remove('active');
        body.classList.remove('menu-is-open');
    }

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.contains('active') ? closeMenu() : openMenu();
    });

    if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) closeMenu();
        });
    });

    const animateFrom = (elem) => {
        let x = 0;
        if (window.innerWidth > 992) {
            if (elem.classList.contains("animate-left")) { x = -200; }
            else if (elem.classList.contains("animate-right")) { x = 200; }
        }
        elem.style.transform = `translate(${x}px, 0px)`;
        elem.style.opacity = "0";
        gsap.fromTo(elem, { x: x, y: 0, autoAlpha: 0 }, {
            duration: 1.75, x: 0, y: 0, autoAlpha: 1, ease: "expo", overwrite: "auto"
        });
    };

    const hide = (elem) => { gsap.set(elem, { autoAlpha: 0 }); };

    gsap.utils.toArray(".animate-left, .animate-right").forEach(elem => {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem, onEnter: () => animateFrom(elem), onEnterBack: () => animateFrom(elem, -1), onLeave: () => hide(elem)
        });
    });

    const translations = {
        'pt-br': {
            about: 'Sobre', education: 'Formação', projects: 'Projetos', technologies: 'Tecnologias', contact: 'Contato', helloWorld: 'Olá mundo,', webDeveloper: 'Eu sou um Dev<br>Full Stack', welcomeMessage: 'bem-vindo ao meu website de portfólio', moreAboutMe: 'Ver projetos', aboutLabel: 'Sobre', aboutMeTitle: 'Sobre mim', educationTitle: 'Formação', aboutBioText: 'Meu nome é Eric da Silva Dala Porta, tenho 21 anos e estudo programação há cerca de dois anos. Concluí o curso Técnico em Informática para Internet pelo Colégio Politécnico da UFSM, onde tive contato prático com tecnologias amplamente utilizadas no mercado, como Angular, Flutter, Django, Java e C. Durante esse período, também desenvolvi experiência com trabalho em equipe utilizando ferramentas como Git e Docker.<br><br>Paralelamente à formação técnica, me preparei para o vestibular de Sistemas de Informação da UFSM, no qual obtive uma boa classificação e fui aprovado em primeira chamada. Atualmente curso Sistemas de Informação na universidade e me dedico integralmente à graduação, com interesse especial nas áreas de backend e inteligência artificial.<br><br>Ainda não possuo experiência formal consolidada no mercado de tecnologia, mas já realizei alguns projetos como freelancer. Além disso, tive uma experiência profissional na área de atendimento e suporte de TI na Santino, uma gelataria, onde pude desenvolver habilidades de comunicação, resolução de problemas e suporte técnico em ambiente real de trabalho.<br><br>Busco complementar minha formação com cursos online voltados ao mercado de tecnologia e também estudo inglês com o objetivo de alcançar fluência completa. Atualmente possuo nível avançado e pretendo realizar um intercâmbio no futuro para fortalecer minha segurança na comunicação.', downloadCV: 'Baixar Currículo', edu1Title: 'Técnico em Informática para Internet', edu1Period: 'Politécnico UFSM — 2024 – 2026', edu1Desc: 'Foco em desenvolvimento frontend e boas práticas do mercado. Aprendi a trabalhar em equipe com Git e Docker, utilizando tecnologias como Angular, Django, Java e C em projetos práticos.', edu2Title: 'Sistemas de Informação', edu2Period: 'UFSM — 2026 – 2030', edu2Desc: 'Em andamento. Aprofundando conhecimentos em backend e regras de negócio, além de fortalecer o networking na área de TI.', edu3Title: 'Inglês Avançado', edu3Period: 'Beway — Em progresso', edu3Desc: 'Nível avançado, quase fluente. Estudo pela Beway com o objetivo de alcançar fluência total e realizar um intercâmbio para ter segurança 100% na conversação.', aboutMeText: 'Desenvolvedor Full Stack com formação concluída em Técnico em Informática para Internet pela UFSM e atualmente cursando Sistemas de Informação. Tenho experiência prática como freelancer no desenvolvimento de aplicações web responsivas e modernas, com foco em qualidade de código e na experiência do usuário. Valorizo o trabalho em equipe e estou em constante evolução profissional.', cardFormacaoTitle: 'Formação', cardFormacaoText: 'Técnico em Informática para Internet (concluído) e Sistemas de Informação em andamento — UFSM', cardExpTitle: 'Experiência', cardExpText: 'Desenvolvedor web freelancer com foco em aplicações responsivas, modernas e de alta qualidade', cardColabTitle: 'Colaboração', cardColabText: 'Trabalho em equipe e aprendizado contínuo de novas tecnologias e boas práticas', projectsTitle: 'Meus Projetos', projectsHint: 'Passe o mouse sobre as imagens para visualizar o preview', project1Title: 'Portal de Agendamento', project1Description: 'Sistema Web para agendamento e gerenciamento de ambientes universitários, focando em salas e laboratórios para otimizar a utilização de recursos acadêmicos.', project2Title: 'PresiData-BR', project2Description: 'Plataforma interativa para comparar dados de mandatos presidenciais brasileiros. Um projeto que une tecnologia e um profundo estudo histórico para maior clareza política.', project3Title: 'Bookshelf', project3Description: 'Uma biblioteca virtual com design original e intuitivo, criada com o intuito de democratizar a leitura, disponibilizando ebooks clássicos e acadêmicos de forma gratuita.', project4Title: 'LavaCar', project4Description: 'Aplicação Angular 19 para gerenciamento de lava-rápidos. Recursos de agendamentos inteligentes, controle de clientes, funcionários, serviços, produtos e fornecedores. Com suporte offline e sincronização automática via IndexedDB.', project5Title: 'Pixel Plush', project5Description: 'Marketplace de amigurumis com temática geek desenvolvido em Angular. Autenticação com Firebase, upload de imagens no Cloudinary, carrinho de compras e gerenciamento de produtos. Perfeito para artesãos e colecionadores.', project6Title: 'Task List', project6Description: 'Aplicação intuitiva para gerenciamento de tarefas do dia a dia. Permita criar, editar, deletar e marcar tarefas como concluídas, com interface amigável e responsiva.', project7Title: 'Transcrição Universal', project7Description: 'Transcreva vídeos do YouTube, TikTok, Instagram ou Twitter/X em segundos. Cole o link e o áudio é transcrito automaticamente com Whisper. Plano gratuito com limite diário e Premium ilimitado via PIX.', previewLink: 'Demonstração', codeLink: 'Código', technologiesTitle: 'Minhas Tecnologias', contactTitle: 'Contato', contactText: 'Quer bater um papo ou trabalhar junto? Me encontre por aqui.', footerText: 'Desenvolvido por Eric Dala Porta &copy; YEAR'
        },
        'en': {
            about: 'About', education: 'Education', projects: 'Projects', technologies: 'Technologies', contact: 'Contact', helloWorld: 'Hello World,', webDeveloper: 'I\'m a Dev<br>Full Stack', welcomeMessage: 'welcome to my portfolio website', moreAboutMe: 'See projects', aboutLabel: 'About', aboutMeTitle: 'About me', educationTitle: 'Education', aboutBioText: 'My name is Eric da Silva Dala Porta, I am 21 years old and have been studying programming for about two years. I completed a Technical Degree in IT for the Internet at the Colégio Politécnico UFSM, where I gained hands-on experience with industry technologies such as Angular, Flutter, Django, Java and C. During this period I also developed teamwork skills using tools like Git and Docker.<br><br>While completing the technical degree, I prepared for the university entrance exam in Information Systems at UFSM, where I ranked well and was admitted on the first call. I am currently fully dedicated to my Bachelor\'s in Information Systems, with a particular interest in backend development and artificial intelligence.<br><br>I do not yet have consolidated formal experience in the tech market, but I have completed some freelance projects. I also had a professional experience in customer service and IT support at Santino, a gelato shop, where I developed communication, problem-solving and hands-on technical support skills in a real work environment.<br><br>I complement my education with online courses focused on the technology market and study English with the goal of reaching full fluency. I am currently at an advanced level and plan to do an exchange program in the future to strengthen my confidence in spoken English.', downloadCV: 'Download CV', edu1Title: 'Technical Degree in IT for the Internet', edu1Period: 'Politécnico UFSM — 2024 – 2026', edu1Desc: 'Focus on frontend development and industry best practices. Learned to work in teams using Git and Docker, applying technologies such as Angular, Django, Java and C in practical projects.', edu2Title: 'Information Systems', edu2Period: 'UFSM — 2026 – 2030', edu2Desc: 'In progress. Deepening knowledge in backend development and business logic, while actively building a network in the IT industry.', edu3Title: 'Advanced English', edu3Period: 'Beway — In progress', edu3Desc: 'Advanced level, near fluent. Studying at Beway with the goal of reaching full fluency and doing an exchange program to gain complete confidence in spoken English.', aboutMeText: 'Full Stack developer with a completed Technical Degree in IT for the Internet from UFSM, currently pursuing a Bachelor\'s in Information Systems. I have hands-on experience as a freelancer building responsive and modern web applications, with a consistent focus on code quality and user experience. I value collaborative work and am in continuous professional development.', cardFormacaoTitle: 'Education', cardFormacaoText: 'Technical Degree in IT for the Internet (completed) and Information Systems in progress — UFSM', cardExpTitle: 'Experience', cardExpText: 'Freelance web developer focused on responsive, modern, and high-quality applications', cardColabTitle: 'Collaboration', cardColabText: 'Teamwork and continuous learning of new technologies and best practices', projectsTitle: 'My Projects', projectsHint: 'Hover over the images to preview each project', project1Title: 'Scheduling Portal', project1Description: 'A web system for scheduling and managing university environments, focusing on rooms and laboratories to optimize academic resource utilization.', project2Title: 'PresiData-BR', project2Description: 'An interactive platform to compare data from Brazilian presidential terms. A project that combines technology and deep historical study for greater political clarity.', project3Title: 'Bookshelf', project3Description: 'A virtual library with an original and intuitive design, created to democratize reading by providing free access to classic and academic ebooks.', project4Title: 'LavaCar', project4Description: 'Angular 19 application for car wash management. Features intelligent scheduling, customer and employee management, services, products, and supplier integration. Offline support with automatic IndexedDB synchronization.', project5Title: 'Pixel Plush', project5Description: 'Geek-themed amigurumi marketplace built with Angular. Firebase authentication, Cloudinary image upload, shopping cart and product management. Perfect for artisans and collectors.', project6Title: 'Task List', project6Description: 'An intuitive task management application for everyday tasks. Create, edit, delete, and mark tasks as completed with a user-friendly and responsive interface.', project7Title: 'Universal Transcription', project7Description: 'Transcribe videos from YouTube, TikTok, Instagram or Twitter/X in seconds. Paste the link and the audio is automatically transcribed with Whisper. Free plan with daily limit and unlimited Premium via PIX.', previewLink: 'Preview', codeLink: 'Code', technologiesTitle: 'My Technologies', contactTitle: 'Contact', contactText: 'Want to chat or work together? Find me here.', footerText: 'Developed by Eric Dala Porta &copy; YEAR'
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                let text = translations[lang][key];
                if (key === 'footerText') { text = text.replace('YEAR', new Date().getFullYear()); }
                element.innerHTML = text;
            }
        });
        const isEnglish = (lang === 'en');
        languageToggle.checked = isEnglish;
        if (languageToggleMobile) languageToggleMobile.checked = isEnglish;
    }

    function applyTheme(isDarkMode) {
        if (isDarkMode) { body.classList.add('dark-mode'); }
        else { body.classList.remove('dark-mode'); }
        themeToggle.checked = isDarkMode;
        if (themeToggleMobile) themeToggleMobile.checked = isDarkMode;
    }

    function handleLanguageChange(event) {
        const newLang = event.target.checked ? 'en' : 'pt-br';
        document.body.classList.add('fade-zoom-out');
        setTimeout(() => {
            setLanguage(newLang);
            document.body.classList.remove('fade-zoom-out');
            document.body.classList.add('fade-zoom-in');
            setTimeout(() => { document.body.classList.remove('fade-zoom-in'); }, 350);
        }, 350);
    }

    function handleThemeChange(event) {
        const isDarkMode = event.target.checked;
        document.body.classList.add('fade-zoom-out');
        setTimeout(() => {
            localStorage.setItem('dark-mode', isDarkMode);
            applyTheme(isDarkMode);
            document.body.classList.remove('fade-zoom-out');
            document.body.classList.add('fade-zoom-in');
            setTimeout(() => { document.body.classList.remove('fade-zoom-in'); }, 350);
        }, 350);
    }

    languageToggle.addEventListener('change', handleLanguageChange);
    if (languageToggleMobile) languageToggleMobile.addEventListener('change', handleLanguageChange);
    themeToggle.addEventListener('change', handleThemeChange);
    if (themeToggleMobile) themeToggleMobile.addEventListener('change', handleThemeChange);

    function initialize() {
        const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
        applyTheme(savedDarkMode);
        const savedLang = localStorage.getItem('lang') || 'pt-br';
        setLanguage(savedLang);
    }
    initialize();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { navbar.classList.add('scrolled'); }
        else { navbar.classList.remove('scrolled'); }
        let current = '';
        const sections = document.querySelectorAll('main > section');
        const navLinks = document.querySelectorAll('.nav-links a');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - (window.innerHeight * 0.4);
            if (scrollY >= sectionTop) { current = section.getAttribute('id'); }
        });
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { current = 'contato'; }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) { link.classList.add('active'); }
        });
    });

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.closest('.toggle')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Project image preview overlay
    const projectHeaders = document.querySelectorAll('.project-item__header');
    let overlayEl = null;
    let backdropEl = null;
    let activeHeader = null;

    function getOrCreateElements() {
        if (!backdropEl) {
            backdropEl = document.createElement('div');
            backdropEl.className = 'project-img-backdrop';
            document.body.appendChild(backdropEl);
        }
        if (!overlayEl) {
            overlayEl = document.createElement('div');
            overlayEl.className = 'project-img-overlay';
            const imgEl = document.createElement('img');
            overlayEl.appendChild(imgEl);
            document.body.appendChild(overlayEl);
        }
        return { overlay: overlayEl, backdrop: backdropEl };
    }

    projectHeaders.forEach(header => {
        const img = header.querySelector('.project-item__img');
        if (!img) return;

        // Close preview when moving to link buttons area
        const linksEl = header.querySelector('.project-item__links');
        if (linksEl) {
            linksEl.addEventListener('mouseenter', () => {
                if (overlayEl) { overlayEl.style.opacity = '0'; }
                if (backdropEl) { backdropEl.style.opacity = '0'; }
                activeHeader = null;
            });
        }

        img.addEventListener('mouseenter', (e) => {
            // Don't open preview when hovering near link buttons (top-right corner)
            if (linksEl) {
                const lr = linksEl.getBoundingClientRect();
                if (e.clientX >= lr.left - 18 && e.clientY <= lr.bottom + 18) return;
            }
            const { overlay, backdrop } = getOrCreateElements();
            const overlayImg = overlay.querySelector('img');
            overlayImg.src = img.src;
            overlayImg.alt = img.alt;

            const rect = img.getBoundingClientRect();
            // Snap to card position instantly
            overlay.style.transition = 'none';
            overlay.style.top = rect.top + 'px';
            overlay.style.left = rect.left + 'px';
            overlay.style.width = rect.width + 'px';
            overlay.style.height = rect.height + 'px';
            overlay.style.borderRadius = '10px';
            overlay.style.opacity = '0';
            activeHeader = header;

            // Compute preview size matching natural image ratio — no zoom, no crop
            const natW = img.naturalWidth || 1280;
            const natH = img.naturalHeight || 720;
            const ratio = natW / natH;
            const maxW = window.innerWidth * 0.82;
            const maxH = window.innerHeight * 0.82;
            let previewW = maxW;
            let previewH = previewW / ratio;
            if (previewH > maxH) {
                previewH = maxH;
                previewW = previewH * ratio;
            }
            const previewTop = (window.innerHeight - previewH) / 2;
            const previewLeft = (window.innerWidth - previewW) / 2;

            overlay.getBoundingClientRect();
            overlay.style.transition = '';
            overlay.style.opacity = '1';
            overlay.style.top = previewTop + 'px';
            overlay.style.left = previewLeft + 'px';
            overlay.style.width = previewW + 'px';
            overlay.style.height = previewH + 'px';
            overlay.style.borderRadius = '12px';

            backdrop.style.opacity = '1';
        });

        img.addEventListener('mouseleave', () => {
            if (!overlayEl || activeHeader !== header) return;
            const rect = img.getBoundingClientRect();
            overlayEl.style.top = rect.top + 'px';
            overlayEl.style.left = rect.left + 'px';
            overlayEl.style.width = rect.width + 'px';
            overlayEl.style.height = rect.height + 'px';
            overlayEl.style.borderRadius = '10px';
            overlayEl.style.opacity = '0';
            backdropEl.style.opacity = '0';
            activeHeader = null;
        });
    });

    // ── Project detail modal ──
    const projectModal = document.getElementById('projectModal');
    const projectModalBackdrop = document.getElementById('projectModalBackdrop');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectModalImg = document.getElementById('projectModalImg');
    const projectModalLabel = document.getElementById('projectModalLabel');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalDesc = document.getElementById('projectModalDesc');
    const projectModalTechs = document.getElementById('projectModalTechs');
    const projectModalLinks = document.getElementById('projectModalLinks');

    function openProjectModal(card) {
        const img = card.querySelector('.project-item__img');
        const titleEl = card.querySelector('.project-item__title');
        const descEl = card.querySelector('.project-item__desc');
        const techTags = card.querySelectorAll('.project-item__hover-panel .project-item__tech-tag');
        const links = card.querySelectorAll('.project-item__links a');

        projectModalImg.src = img ? img.src : '';
        projectModalImg.alt = img ? img.alt : '';
        projectModalTitle.innerHTML = titleEl ? titleEl.innerHTML : '';
        projectModalDesc.innerHTML = descEl ? descEl.innerHTML : '';

        const lang = localStorage.getItem('lang') || 'pt-br';
        projectModalLabel.textContent = lang === 'en' ? 'Project' : 'Projeto';

        projectModalTechs.innerHTML = '';
        techTags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-modal__tech-tag';
            span.textContent = tag.textContent;
            projectModalTechs.appendChild(span);
        });

        projectModalLinks.innerHTML = '';
        links.forEach((link) => {
            const a = document.createElement('a');
            a.href = link.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            const isGitHub = link.href.includes('github.com');
            if (isGitHub) {
                a.className = 'project-modal__link project-modal__link--github';
                a.innerHTML = '<i class="fab fa-github"></i> GitHub';
            } else {
                a.className = 'project-modal__link project-modal__link--demo';
                a.innerHTML = '<i class="fas fa-external-link-alt"></i> Demo';
            }
            projectModalLinks.appendChild(a);
        });

        projectModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    projectModalClose.addEventListener('click', closeProjectModal);
    projectModalBackdrop.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
            closeProjectModal();
        }
    });

    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-item__links')) return;
            if (window.innerWidth <= 992) return;
            card.style.cursor = 'pointer';
            openProjectModal(card);
        });
    });
});
