(() => {
  'use strict';
  const triggers = [...document.querySelectorAll('[data-desk-panel]')];
  const panels = [...document.querySelectorAll('.desk-panel')];
  const facts = ["I am a writer.", "I study computer engineering.", "I study at Cape Peninsula University of Technology.", "I am learning HTML.", "I am learning CSS.", "My Circuit Desk project uses Java Swing.", "I built a student budget calculator in Python.", "My budget calculator works in South African rand.", "I started learning to code in high school.", "My Python maze game has three difficulty levels.", "I used to write code with pen and paper, then run it in my head.", "I built Rock Paper Scissors in C.", "My Rock Paper Scissors game is a first-to-three match.", "My Done app lets you add, edit and filter tasks.", "I sketch in my spare time.", "My Study Flow planner uses Python and SQLite.", "Study Flow tracks modules and deadlines.", "My Snake project uses C# and Windows Forms.", "My Sudoku Studio project uses C++.", "My Tic-Tac-Toe project uses a Minimax opponent.", "I led my group’s 1-bit NAND ALU project.", "My ALU design uses 24 NAND gates across six 74HC00 packages."];
  let seen;
  try { seen = JSON.parse(localStorage.getItem('nb-facts-v2') || '[]'); } catch { seen = []; }
  if (!Array.isArray(seen)) seen = [];
  seen = seen.filter(i => Number.isInteger(i) && i >= 0 && i < facts.length);
  function nextFact() {
    const previous = seen.at(-1);
    if (seen.length === facts.length) seen = [];
    const remaining = facts.map((_, i) => i).filter(i => !seen.includes(i) && i !== previous);
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    seen.push(next);
    try { localStorage.setItem('nb-facts-v2', JSON.stringify(seen)); } catch {}
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
  const missions = [
    {v:5, drop:2, low:8, high:10, name:'🌱 Wake the greenhouse · Give a tiny seedling its first glow'},
    {v:3.3, drop:2, low:3, high:5, name:'🔋 Save the battery · Keep a pocket light running on a tiny current'},
    {v:9, drop:2, low:6, high:8, name:'🛰️ Signal the satellite · Tame a 9 V supply for a gentle beacon'},
    {v:5, drop:3, low:5, high:7, name:'🌊 Rescue the blue LED · Light up an underwater rover'},
    {v:9, drop:3, low:17, high:19, name:'🎉 Power the party · Give the finale a brighter glow'}
  ];
  let mission = 0;
  const solved = new Set();
  const progress = document.getElementById('led-progress');
  const brief = document.getElementById('led-mission');
  function updateLED() {
    const m = missions[mission];
    const on = power.getAttribute('aria-pressed') === 'true';
    const r = Number(resistor.value);
    const forward = direction.value === 'forward';
    const current = r > 0 ? (m.v - m.drop) / r * 1000 : Infinity;
    const safe = r > 0 && current <= 20;
    const lit = on && safe && forward;
    const win = lit && current >= m.low && current <= m.high;
    if (win) solved.add(mission);
    brief.textContent = `${m.name} · ${m.v} V supply · assumed LED drop ${m.drop} V. Reach ${m.low}–${m.high} mA.`;
    progress.textContent = missions.map((_, i) => solved.has(i) ? '✅' : i === mission ? '🎯' : '⬜').join(' ') + ` · ${solved.size}/${missions.length} solved`;
    document.getElementById('desk-led').classList.toggle('lit', lit);
    document.getElementById('led-status').textContent = lit ? 'LED on' : 'LED off';
    document.getElementById('led-feedback').textContent = !on ? '🧰 Pick your parts, then close the switch. 💡 Hint: current = (supply − LED drop) ÷ resistance.' : !safe ? '⚠️ Too much current! This simulation blocks currents above 20 mA. Try a larger resistor.' : !forward ? '🔄 Flip the LED: its anode (+) should face the positive supply.' : win ? `✨ Mission complete! ${current.toFixed(1)} mA. Try another mission.` : `${current.toFixed(1)} mA: the LED glows, but misses the target. 🎯 Try a different resistor.`;
  }
  document.getElementById('led-next').addEventListener('click', () => {
    mission = (mission + 1) % missions.length;
    document.getElementById('led-reset').click();
  });
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
