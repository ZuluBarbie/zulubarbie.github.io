const hands = ["Rock", "Paper", "Scissors"];
const icons = ["✊", "✋", "✌️"];
const winsWith = ["Rock crushes scissors.", "Paper covers rock.", "Scissors cut paper."];
let human, cpu, round;

function showThrow(side, pick, score) {
  const hand = byId(side + "-hand");
  hand.textContent = icons[pick] || "❔";
  byId(side + "-pick").textContent = hands[pick] || "Ready";
  byId(side + "-score").textContent = score + " / 3";
  if (pick !== null && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hand.animate([{transform:"scale(.75) rotate(-12deg)"}, {transform:"scale(1)"}], {duration:240});
  }
}

function play(pick) {
  if (human === 3 || cpu === 3) return;
  const rival = Math.floor(Math.random() * hands.length);
  const result = (pick - rival + 3) % 3;
  round++;
  let verdict = "Matching hands! Throw again.";
  if (result === 1) {
    human++;
    verdict = winsWith[pick] + " Your point!";
  } else if (result === 2) {
    cpu++;
    verdict = winsWith[rival] + " Computer scores.";
  }
  showThrow("your", pick, human);
  showThrow("cpu", rival, cpu);
  let headline = "Round " + round + ".";
  if (human === 3 || cpu === 3) {
    headline = human === 3 ? "🏆 You win the match!" : "🤖 Computer wins the match!";
    choices.forEach(choice => choice.disabled = true);
    rematch.focus();
  }
  say(headline + " " + verdict + " You played " + hands[pick] + ", computer played " + hands[rival] + ". Score " + human + "–" + cpu + ".");
}

const choices = hands.map((name, i) => {
  const choice = button(board, name, () => play(i));
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = icons[i];
  choice.prepend(icon);
  return choice;
});

function reset() {
  human = cpu = round = 0;
  showThrow("your", null, human);
  showThrow("cpu", null, cpu);
  choices.forEach(choice => choice.disabled = false);
  say("Your move!");
}

const rematch = button(controls, "New match", () => { reset(); choices[0].focus(); });
reset();
