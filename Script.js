// Espera o documento HTML carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- CAROUSEL BANNER ---
    const slides = document.querySelectorAll('.vacina-campanha, .adocao-campanha, .banho-tosa-campanha');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn) { // Verifica se os elementos do carrossel existem
        let currentSlide = 0;

        function showSlide(index) {
            // Garante que o índice "dê a volta" (loop)
            if (index >= slides.length) {
                index = 0; // Se passou do último, volta ao primeiro
            }
            if (index < 0) {
                index = slides.length - 1; // Se voltou antes do primeiro, vai para o último
            }

            // Esconde TODOS os slides e desativa TODOS os pontos
            slides.forEach(slide => {
                slide.style.display = 'none'; // Esconde o slide
            });
            dots.forEach(dot => {
                dot.classList.remove('active'); // Remove a classe 'active' do ponto
            });

            // Mostra o slide correto e ativa o ponto correto
            slides[index].style.display = 'flex'; // Mostra o slide atual (usando 'flex' como no seu CSS)
            dots[index].classList.add('active'); // Adiciona 'active' no ponto atual

            // Atualiza o índice do slide atual
            currentSlide = index;
        }

        // Adiciona os "escutadores" de clique nos botões
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1); // Vai para o próximo slide
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1); // Vai para o slide anterior
        });

        // Adiciona "escutadores" de clique nos pontos
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index); // Vai para o slide clicado
            });
        });

        // Mostra o primeiro slide (índice 0) assim que a página carrega
        showSlide(0);
    } else {
        console.warn("Elementos do carrossel não encontrados. O carrossel não será inicializado.");
    }


    // --- PAGINAÇÃO DE AVALIAÇÕES ---
    const reviewsPerPage = 3; // Quantas avaliações mostrar por página
    let currentPage = 1;

    const allReviews = document.querySelectorAll('#avaliacoes .avaliacao'); // Pega todas as divs de avaliação
    const prevButtonPagination = document.getElementById('prev-page-btn');
    const nextButtonPagination = document.getElementById('next-page-btn');
    const pageNumberDisplay = document.getElementById('current-page-number');
    const paginationContainer = document.querySelector('.pagination'); // Seleciona o container da paginação

    if (allReviews.length > 0 && prevButtonPagination && nextButtonPagination && pageNumberDisplay && paginationContainer) { // Verifica se os elementos da paginação existem
        const totalReviews = allReviews.length;
        const totalPages = Math.ceil(totalReviews / reviewsPerPage);

        function showPage(page) {
            // Calcula o índice inicial e final das avaliações para a página atual
            const startIndex = (page - 1) * reviewsPerPage;
            const endIndex = startIndex + reviewsPerPage;

            // Esconde TODAS as avaliações primeiro
            allReviews.forEach(review => {
                review.classList.add('review-hidden');
            });

            // Mostra apenas as avaliações da página atual
            for (let i = startIndex; i < endIndex && i < totalReviews; i++) {
                if (allReviews[i]) { // Verifica se a avaliação existe
                    allReviews[i].classList.remove('review-hidden');
                }
            }

            // Atualiza o número da página exibido
            pageNumberDisplay.textContent = page;

            prevButtonPagination.disabled = (page === 1);
            nextButtonPagination.disabled = (page === totalPages);
        }

       
        nextButtonPagination.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });

        prevButtonPagination.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

       
        if (totalReviews > 0) {
            showPage(1); 
        } else {
       
            paginationContainer.style.display = 'none';
        }
    } else {
         console.warn("Elementos da paginação não encontrados ou não há avaliações. A paginação não será inicializada.");
         
         if (paginationContainer) {
            paginationContainer.style.display = 'none';
         }
    }

}); 