(() => {
  'use strict';
  const triggers = [...document.querySelectorAll('[data-desk-panel]')];
  const panels = [...document.querySelectorAll('.desk-panel')];
  const facts = [
    'I am a writer as well as a computer engineering student.',
    'I study at Cape Peninsula University of Technology.',
    'My projects explore Java, Python, C and web technologies.',
    'I led a group project building a 1-bit NAND ALU.',
    'I am learning HTML and CSS to build for the web.'
  ];
  let lastFact = -1;
  function nextFact() {
    let next = Math.floor(Math.random() * (facts.length - 1));
    if (next >= lastFact) next++;
    if (lastFact === -1) next = Math.floor(Math.random() * facts.length);
    lastFact = next;
    document.getElementById('desk-fact').textContent = facts[next];
  }
  triggers.forEach(button => button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.deskPanel);
    const open = panel.hidden;
    panels.forEach(item => { item.hidden = true; });
    triggers.forEach(item => item.setAttribute('aria-expanded', 'false'));
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open && panel.id === 'desk-coffee') nextFact();
    if (open) panel.querySelector('h3').focus();
  }));
  function closePanel(panel) {
    panel.hidden = true;
    const trigger = triggers.find(item => item.dataset.deskPanel === panel.id);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }
  panels.forEach(panel => {
    panel.querySelector('.desk-close').addEventListener('click', () => closePanel(panel));
    panel.addEventListener('keydown', event => {
      if (event.key === 'Escape') closePanel(panel);
    });
  });
  document.getElementById('desk-another-fact').addEventListener('click', nextFact);
  const power = document.getElementById('led-power');
  const resistor = document.getElementById('led-resistor');
  const direction = document.getElementById('led-direction');
  function updateLED() {
    const on = power.getAttribute('aria-pressed') === 'true';
    const safe = resistor.value === '330';
    const forward = direction.value === 'forward';
    const lit = on && safe && forward;
    document.getElementById('desk-led').classList.toggle('lit', lit);
    document.getElementById('led-status').textContent = lit ? 'LED on' : 'LED off';
    document.getElementById('led-feedback').textContent = !on
      ? 'The circuit is open. Choose a resistor and LED direction, then close the switch.'
      : !safe ? 'A resistor limits current. Choose 330 Ω before powering the LED; this simulation keeps it off without one.'
      : !forward ? 'The LED is reversed. Connect its anode (+) towards the positive supply.'
      : 'You lit the LED! With a 5 V supply and an assumed 2 V LED drop, the 330 Ω resistor limits current to about 9 mA.';
  }
  power.addEventListener('click', () => {
    const on = power.getAttribute('aria-pressed') !== 'true';
    power.setAttribute('aria-pressed', String(on));
    power.textContent = on ? 'Switch: closed' : 'Switch: open';
    updateLED();
  });
  resistor.addEventListener('change', updateLED);
  direction.addEventListener('change', updateLED);
  document.getElementById('led-reset').addEventListener('click', () => {
    power.setAttribute('aria-pressed', 'false'); power.textContent = 'Switch: open';
    resistor.value = 'none'; direction.value = 'reverse'; updateLED();
  });
  updateLED();
  document.getElementById('engineer-desk').hidden = false;
})();
