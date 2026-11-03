(() => {
  'use strict';
  const cards = [...document.querySelectorAll('#project-results .card')];
  const categories = ['engineering apps', 'apps', 'games', 'games', 'apps', 'apps', 'games', 'games', 'games', 'engineering'];
  const symbols = ['Ω', 'R', '⌘', '✂', '✓', '▦', '↳', '▦', '× ○', '&'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  cards.forEach((card, index) => {
    card.dataset.category = categories[index];
    const art = document.createElement('div');
    art.className = `project-art art-${index % 4}`;
    art.setAttribute('aria-hidden', 'true');
    const symbol = document.createElement('span');
    symbol.textContent = symbols[index];
    art.append(symbol);
    if (!card.querySelector('img')) card.prepend(art);
    card.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
    });
  });
  const search = document.querySelector('.project-search input');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('.result-count');
  let selected = 'all';
  function filterProjects() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = (selected === 'all' || card.dataset.category.split(' ').includes(selected)) && card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    count.textContent = visible ? `${visible} of ${cards.length} projects · Pick one to explore` : 'No projects found. Try another search or category.';
  }
  filters.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterProjects();
  }));
  search.addEventListener('input', filterProjects);
  document.querySelector('.project-tools').hidden = false;
  count.hidden = false;
  filterProjects();
  const inputs = [...document.querySelectorAll('[data-input]')];
  const output = document.querySelector('.gate-output');
  inputs.forEach(button => button.addEventListener('click', () => {
    const enabled = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(enabled));
    button.querySelector('span').textContent = enabled ? '1' : '0';
    const value = inputs.every(item => item.getAttribute('aria-pressed') === 'true') ? 0 : 1;
    output.querySelector('strong').textContent = String(value);
    output.classList.toggle('off', value === 0);
  }));
  document.querySelector('.logic-lab').hidden = false;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(card => observer.observe(card));
  }
})();
