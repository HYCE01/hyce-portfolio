(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  // Mobile navigation
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute(
      'aria-label',
      open ? 'Close navigation' : 'Open navigation'
    );
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll progress indicator
  const progress = document.getElementById('progress');

  const updateProgress = () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    if (progress) {
      progress.style.width =
        `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    }
  };

  window.addEventListener('scroll', updateProgress, {
    passive: true
  });

  updateProgress();

  // Scroll reveal animations
  const revealItems = document.querySelectorAll('.reveal');

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay =
        `${Math.min(index % 4, 3) * 80}ms`;

      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => {
      item.classList.add('visible');
    });
  }

  // Automatic copyright year
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
