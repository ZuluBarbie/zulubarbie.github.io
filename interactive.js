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
  const inputs = [...document.querySelectorAll('.gate-inputs button')];
  const output = document.querySelector('.gate-output');
  const rounds = [
    {title:'🔐 Unlock the workshop', clue:'The lock opens on a low signal. Send output 0.', rule:'NAND is low only when both inputs are high.', gate:'NAND', evaluate:(a,b) => !(a && b), target:0},
    {title:'🤖 Wake the robot', clue:'Its two power cells must work together. Send output 1.', rule:'AND is high only when both inputs are high.', gate:'AND', evaluate:(a,b) => a && b, target:1},
    {title:'📡 Send a distress signal', clue:'Battery A is dead. Keep A at 0 and send output 1.', rule:'OR is high when at least one input is high.', gate:'OR', evaluate:(a,b) => a || b, target:1, lockedA:false},
    {title:'🚦 Route the rover', clue:'Exactly one route should be active. Keep route A active and send output 1.', rule:'XOR is high when its inputs differ.', gate:'XOR', evaluate:(a,b) => a !== b, target:1, lockedA:true},
    {title:'🌙 Put the lab to sleep', clue:'The lights shut off on output 1. Both switches start on.', rule:'NOR is high only when both inputs are low.', gate:'NOR', evaluate:(a,b) => !(a || b), target:1, startOn:true}
  ];
  const title = document.getElementById('logic-title');
  const clue = document.getElementById('logic-mission');
  const feedback = document.getElementById('logic-feedback');
  const progress = document.getElementById('logic-progress');
  const check = document.getElementById('logic-check');
  const next = document.getElementById('logic-next');
  let round = 0, score = 0, attempts = 0;

  function setInput(button, on) {
    button.setAttribute('aria-pressed', String(on));
    button.querySelector('span').textContent = Number(on);
  }
  function readInputs() {
    return inputs.map(button => button.getAttribute('aria-pressed') === 'true');
  }
  function refreshOutput() {
    const value = Number(rounds[round].evaluate(...readInputs()));
    output.querySelector('strong').textContent = value;
    output.classList.toggle('off', value === 0);
    return value;
  }
  function showRound() {
    const task = rounds[round];
    title.textContent = task.title;
    clue.textContent = task.clue;
    document.querySelector('.gate-label').textContent = task.gate + ' / LIVE LOGIC';
    document.querySelector('.gate-explanation').textContent = '💡 ' + task.rule;
    progress.textContent = 'Mission ' + (round + 1) + ' of 5 · ⭐ ' + score + '/5 first-try stars';
    feedback.textContent = '';
    attempts = 0;
    check.disabled = false;
    next.hidden = true;
    inputs.forEach((button, i) => {
      button.disabled = i === 0 && task.lockedA !== undefined;
      setInput(button, button.disabled ? task.lockedA : !!task.startOn || (task.gate === 'XOR' && i === 1));
    });
    refreshOutput();
  }
  inputs.forEach(button => button.addEventListener('click', () => {
    setInput(button, button.getAttribute('aria-pressed') !== 'true');
    refreshOutput();
  }));
  check.addEventListener('click', () => {
    attempts++;
    if (refreshOutput() !== rounds[round].target) {
      feedback.textContent = '🔧 Signal mismatch. Use the hint, flip a switch, and try again.';
      return;
    }
    if (attempts === 1) score++;
    progress.textContent = 'Mission ' + (round + 1) + ' of 5 · ⭐ ' + score + '/5 first-try stars';
    const finished = round === rounds.length - 1;
    feedback.textContent = finished ? '🎉 Workshop restored! Final score: ' + score + '/5 stars.' : '✅ Gadget ready!' + (attempts === 1 ? ' You earned a star.' : '');
    check.disabled = true;
    inputs.forEach(button => { button.disabled = true; });
    next.textContent = finished ? '🔁 Play again' : '➡️ Next gadget';
    next.hidden = false;
    next.focus();
  });
  next.addEventListener('click', () => {
    round = (round + 1) % rounds.length;
    if (round === 0) score = 0;
    showRound();
    title.focus();
  });
  showRound();
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
