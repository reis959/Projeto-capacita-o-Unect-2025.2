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
  const perPage = 3;
  const list = [...document.querySelectorAll('#avaliacoes .avaliacao')];
  const prev = document.getElementById('prev-page-btn');
  const next = document.getElementById('next-page-btn');
  const num = document.getElementById('current-page-number');
  const totalPages = Math.ceil(list.length / perPage);
  if (!list.length || !prev || !next || !num) return;

  let page = 1;
  const render = () => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    list.forEach((el, idx) => el.classList.toggle('review-hidden', idx < start || idx >= end));
    num.textContent = page;
    prev.disabled = page === 1;
    next.disabled = page === totalPages;
  };

  prev.addEventListener('click', () => { if (page > 1) { page--; render(); } });
  next.addEventListener('click', () => { if (page < totalPages) { page++; render(); } });
  render();
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