// JavaScript para interligar com HTML e CSS

// Adicionar campo de telefone dinamicamente ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario');
    const nomeInput = document.querySelector('.campo-form[placeholder="nome"]');
    const mensagemTextarea = document.querySelector('.campo-form[placeholder="Digite sua Mensagem"]');

    // Criar input para telefone
    const telefoneDiv = document.createElement('div');
    telefoneDiv.className = 'grupo-form';
    const telefoneInput = document.createElement('input');
    telefoneInput.type = 'tel';
    telefoneInput.id = 'telefone';
    telefoneInput.placeholder = 'Telefone (com DDD)';
    telefoneInput.className = 'campo-form';
    telefoneInput.required = true;
    telefoneDiv.appendChild(telefoneInput);

    // Inserir após o nome
    nomeInput.parentNode.insertAdjacentElement('afterend', telefoneDiv);

    // Adicionar IDs aos campos existentes
    nomeInput.id = 'nome';
    mensagemTextarea.id = 'mensagem';

    // Manipular envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome && telefone && mensagem) {
            // Construir URL do WhatsApp
            const texto = `Olá, meu nome é ${nome}. ${mensagem}`;
            const url = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`;

            // Abrir WhatsApp
            window.open(url, '_blank');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Adicionar animações de fade-in ao rolar
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar fade-in às seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Menu ativo ao rolar
    const menuLinks = document.querySelectorAll('.menu-link');
    const sectionsArray = Array.from(sections);

    window.addEventListener('scroll', function() {
        let current = '';

        sectionsArray.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Adicionar classe active ao CSS para menu
    const style = document.createElement('style');
    style.textContent = `
        .menu-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
