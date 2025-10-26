// Espera o documento HTML carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initReviewsPagination();
  initSmoothScroll();
});

function initCarousel() {
  const slides = document.querySelectorAll('.vacina-campanha, .adocao-campanha, .banho-tosa-campanha');
  const dots = document.querySelectorAll('.dot');
  const prev = document.querySelector('.carousel-control.prev');
  const next = document.querySelector('.carousel-control.next');
  if (!slides.length || !dots.length || !prev || !next) return;

  let current = 0;
  const show = (i) => {
    if (i >= slides.length) i = 0;
    if (i < 0) i = slides.length - 1;
    slides.forEach(s => (s.style.display = 'none'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].style.display = 'flex';
    dots[i].classList.add('active');
    current = i;
  };

  next.addEventListener('click', () => show(current + 1));
  prev.addEventListener('click', () => show(current - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  show(0);
}

function initReviewsPagination() {
  const reviews = Array.from(document.querySelectorAll('.avaliacao'));
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pageNumber = document.getElementById('current-page-number');
  if (!reviews.length || !prevBtn || !nextBtn || !pageNumber) return;

  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  let currentPage = 0;

  const renderPage = () => {
    const start = currentPage * perPage;
    const end = start + perPage;

    reviews.forEach((review, index) => {
      review.classList.toggle('is-visible', index >= start && index < end);
    });

    pageNumber.textContent = currentPage + 1;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;
  };

  prevBtn.addEventListener('click', () => {
    if (currentPage === 0) return;
    currentPage -= 1;
    renderPage();
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage >= totalPages - 1) return;
    currentPage += 1;
    renderPage();
  });

  renderPage();
}

function initSmoothScroll() {
  const headerOffset = 100;
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
          history.pushState(null, '', id);
        }
      }
    });
  });
}