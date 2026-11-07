(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(opened));
    menu.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  const progress = document.getElementById('scrollProgress');
  const backTop = document.getElementById('backTop');
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    backTop?.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', updateScrollUI, {passive:true});
  updateScrollUI();
  backTop?.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), {threshold:.12, rootMargin:'0px 0px -35px 0px'});
    items.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 3) * 90}ms`;
      observer.observe(item);
    });
  } else items.forEach(item => item.classList.add('visible'));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();