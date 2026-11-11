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
  const rounds = [{target:0, a:null}, {target:1,a:true}, {target:1,a:false}, {target:0,a:null}, {target:1,a:null}];
  let round = 0, score = 0, checked = false;
  const missionText = document.getElementById('logic-mission');
  function describeRound() {
    const task = rounds[round];
    missionText.textContent = `Round ${round + 1}/5: make output ${task.target}` + (task.a === null ? '.' : ` with A set to ${Number(task.a)}.`) + ` Score: ${score}.`;
  }
  document.getElementById('logic-check').addEventListener('click', () => {
    if (checked) return;
    const task = rounds[round];
    const a = inputs[0].getAttribute('aria-pressed') === 'true';
    const b = inputs[1].getAttribute('aria-pressed') === 'true';
    const correct = Number(!(a && b)) === task.target && (task.a === null || a === task.a);
    if (correct) { score++; checked = true; }
    missionText.textContent = correct ? `Code cracked! Score ${score}/5. ` + (round === 4 ? 'Game complete — play again?' : 'Ready for the next round?') : 'Try again! NAND outputs 0 only when both inputs are 1. Check any extra input condition too.';
  });
  document.getElementById('logic-next').addEventListener('click', () => {
    if (!checked) { missionText.textContent = 'Solve this round first. Flip A and B, then check your answer.'; return; }
    round++;
    if (round === rounds.length) { round = 0; score = 0; }
    checked = false;
    inputs.forEach(item => { item.setAttribute('aria-pressed', 'false'); item.querySelector('span').textContent = '0'; });
    output.querySelector('strong').textContent = '1'; output.classList.remove('off');
    describeRound();
  });
  describeRound();
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
