byId("instructions").textContent = "Choose a hand. First to three points wins the match.";
const hands = ["Rock","Paper","Scissors"];
let human, cpu;
function reset() { human = cpu = 0; say("You 0 · Computer 0"); }
hands.forEach((hand,i) => button(board,hand,() => {
  if (human === 3 || cpu === 3) return;
  const j = Math.floor(Math.random()*3);
  const outcome = (i-j+3)%3;
  if (outcome === 1) human++;
  if (outcome === 2) cpu++;
  const result = ["Tie.","You win the round.","Computer wins the round."][outcome];
  say(hand+" vs "+hands[j]+". "+result+" You "+human+" · Computer "+cpu+
    (human === 3 ? " — You win the match!" : cpu === 3 ? " — Computer wins the match." : ""));
}));
button(controls,"New match",reset); reset();
