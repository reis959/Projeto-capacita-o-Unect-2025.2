// Espera o documento HTML carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona todos os elementos necessários
    const slides = document.querySelectorAll('.vacina-campanha, .adocao-campanha, .banho-tosa-campanha');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    // 2. Define o slide inicial
    let currentSlide = 0;

    // 3. Função para mostrar o slide
    function showSlide(index) {
        // Garante que o índice "dê a volta" (loop)
        if (index >= slides.length) {
            index = 0; // Se passou do último, volta ao primeiro
        }
        if (index < 0) {
            index = slides.length - 1; // Se voltou antes do primeiro, vai para o último
        }

        // 4. Esconde TODOS os slides e desativa TODOS os pontos
        slides.forEach(slide => {
            slide.style.display = 'none'; // Esconde o slide
        });
        dots.forEach(dot => {
            dot.classList.remove('active'); // Remove a classe 'active' do ponto
        });

        // 5. Mostra o slide correto e ativa o ponto correto
        slides[index].style.display = 'flex'; // Mostra o slide atual (usando 'flex' como no seu CSS)
        dots[index].classList.add('active'); // Adiciona 'active' no ponto atual

        // 6. Atualiza o índice do slide atual
        currentSlide = index;
    }

    // 7. Adiciona os "escutadores" de clique nos botões
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1); // Vai para o próximo slide
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1); // Vai para o slide anterior
    });

    // 8. Adiciona "escutadores" de clique nos pontos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index); // Vai para o slide clicado
        });
    });

    // 9. Mostra o primeiro slide (índice 0) assim que a página carrega
    showSlide(0);
});
