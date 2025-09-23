document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector('.navbar');
    const smoothScrollLinks = document.querySelectorAll('.nav-links a, .logo a, a.button[href^="#"]');
    const themeToggle = document.getElementById('theme-checkbox');
    const languageToggle = document.getElementById('language-checkbox');
    const body = document.body;

    const animateFrom = (elem) => {
        let x = 0, y = 0;
        if (elem.classList.contains("animate-left")) {
            x = -200; y = 0;
        } else if (elem.classList.contains("animate-right")) {
            x = 200; y = 0;
        }
        elem.style.transform = `translate(${x}px, ${y}px)`;
        elem.style.opacity = "0";
        gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
            duration: 1.75,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto"
        });
    };

    const hide = (elem) => {
        gsap.set(elem, { autoAlpha: 0 });
    };

    gsap.utils.toArray(".animate-left, .animate-right").forEach(elem => {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            onEnter: () => animateFrom(elem),
            onEnterBack: () => animateFrom(elem, -1),
            onLeave: () => hide(elem)
        });
    });

    const translations = {
        'pt-br': {
            about: 'Sobre',
            projects: 'Projetos',
            technologies: 'Tecnologias',
            contact: 'Contato',
            helloWorld: 'Olá, mundo,',
            webDeveloper: 'Eu sou um Desenvolvedor<br>Full Stack',
            welcomeMessage: 'bem-vindo ao meu website de portfólio',
            moreAboutMe: 'Mais sobre mim',
            aboutMeTitle: 'Sobre Mim',
            aboutMeText: 'Sou um estudante de Computação de 21 anos, amo programar e ganhar dinheiro. Atualmente, sacrifico minha sanidade mental estudando para duas graduações ao mesmo tempo na UFSM: Técnico em Informática para Internet e Engenharia de Computação. Tenho experiência em desenvolvimento web como freelancer, criando sistemas responsivos e com personalidade. Gosto de trabalhar em equipe e estou sempre aprendendo tecnologias novas para aumentar minha competência.',
            projectsTitle: 'Meus Projetos',
            project1Title: 'Portal de Agendamento',
            project1Description: 'Sistema Web para agendamento e gerenciamento de ambientes universitários, focando em salas e laboratórios para otimizar a utilização de recursos acadêmicos.',
            project2Title: 'PresiData-BR',
            project2Description: 'Plataforma interativa para comparar dados de mandatos presidenciais brasileiros. Um projeto que une tecnologia e um profundo estudo histórico para maior clareza política.',
            project3Title: 'Bookshelf',
            project3Description: 'Uma biblioteca virtual com design original e intuitivo, criada com o intuito de democratizar a leitura, disponibilizando ebooks clássicos e acadêmicos de forma gratuita.',
            previewLink: 'Demonstração',
            codeLink: 'Código',
            technologiesTitle: 'Minhas Tecnologias',
            contactTitle: 'Contato',
            contactText: 'Gostou do que viu? Vamos criar algo juntos, fale comigo por algum desses contatos que o Kenny está apontando, será uma honra ajudá-lo.',
            footerText: 'Desenvolvido com amor por Eric Dala Porta &copy; YEAR'
        },
        'en': {
            about: 'About',
            projects: 'Projects',
            technologies: 'Technologies',
            contact: 'Contact',
            helloWorld: 'Hello World,',
            webDeveloper: 'I am a Full Stack<br>Developer',
            welcomeMessage: 'welcome to my portfolio website',
            moreAboutMe: 'More about me',
            aboutMeTitle: 'About Me',
            aboutMeText: 'I am a 21-year-old Computer Science student; I love to code and make money. Currently, I sacrifice my mental sanity studying for two degrees at the same time at UFSM: a Technical Degree in IT for the Internet and a Bachelor\'s in Computer Engineering. I have experience in web development as a freelancer, creating responsive systems with personality. I enjoy working in a team and am always learning new technologies to increase my competence.',
            projectsTitle: 'My Projects',
            project1Title: 'Scheduling Portal',
            project1Description: 'A web system for scheduling and managing university environments, focusing on rooms and laboratories to optimize academic resource utilization.',
            project2Title: 'PresiData-BR',
            project2Description: 'An interactive platform to compare data from Brazilian presidential terms. A project that combines technology and deep historical study for greater political clarity.',
            project3Title: 'Bookshelf',
            project3Description: 'A virtual library with an original and intuitive design, created to democratize reading by providing free access to classic and academic ebooks.',
            previewLink: 'Preview',
            codeLink: 'Code',
            technologiesTitle: 'My Technologies',
            contactTitle: 'Contact',
            contactText: 'Like what you see? Let\'s create something together. Talk to me through one of these contacts Kenny is pointing to; it will be an honor to help you.',
            footerText: 'Crafted with love by Eric Dala Porta &copy; YEAR'
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                 let text = translations[lang][key];
                 if (key === 'footerText') {
                    text = text.replace('YEAR', new Date().getFullYear());
                 }
                 element.innerHTML = text;
            }
        });
        languageToggle.checked = (lang === 'en');
    }

    languageToggle.addEventListener('change', () => {
        body.classList.add('fade-zoom-out');
        setTimeout(() => {
            const newLang = languageToggle.checked ? 'en' : 'pt-br';
            setLanguage(newLang);
            body.classList.remove('fade-zoom-out');
            body.classList.add('fade-zoom-in');
            setTimeout(() => {
                body.classList.remove('fade-zoom-in');
            }, 400);
        }, 400);
    });

    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }

    themeToggle.addEventListener('change', () => {
        body.classList.add('fade-zoom-out');
        setTimeout(() => {
            const isDarkMode = themeToggle.checked;
            localStorage.setItem('dark-mode', isDarkMode);
            applyTheme(isDarkMode);
            body.classList.remove('fade-zoom-out');
            body.classList.add('fade-zoom-in');
            setTimeout(() => {
                body.classList.remove('fade-zoom-in');
            }, 400);
        }, 400);
    });

    function initialize() {
        applyTheme(false);
        const savedLang = localStorage.getItem('lang') || 'pt-br';
        setLanguage(savedLang);
    }
    initialize();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        let current = '';
        const sections = document.querySelectorAll('main > section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - (window.innerHeight * 0.4);
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contato';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                 const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
});