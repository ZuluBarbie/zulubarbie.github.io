byId("instructions").textContent = "Select a blank square, then choose a digit or type 1–9. Each row, column and outlined box needs each digit once.";
// Relabel and reflect a uniquely solvable seed to make a fresh puzzle.
const seed = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
const solved = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
let puzzle, answer, values, notes, history, selected, pencil;
function draw() {
  grid(9); board.classList.add("sudoku");
  values.forEach((v,i) => {
    const cell = button(board,v || notes[i],()=>{ selected=i; draw(); board.children[i].focus(); });
    cell.classList.toggle("given",!!puzzle[i]);
    cell.classList.toggle("chosen",selected === i);
    cell.classList.toggle("notes",!v && !!notes[i]);
    cell.setAttribute("aria-label","Row "+(Math.floor(i/9)+1)+", column "+(i%9+1)+": "+(v || "blank"));
  });
}
function reset() {
  const digits = [1,2,3,4,5,6,7,8,9];
  for (let i=8;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [digits[i],digits[j]]=[digits[j],digits[i]]; }
  const flip = Math.random()<.5;
  function map(s) { return [...(flip ? [...s].reverse().join("") : s)].map(c=>digits[Number(c)-1] || 0); }
  puzzle=map(seed); answer=map(solved); values=[...puzzle]; notes=Array(81).fill("");
  history=[]; selected=puzzle.indexOf(0); pencil=false; noteButton.setAttribute("aria-pressed","false");
  say("New puzzle"); draw();
}
function enter(digit,hint=false) {
  if (puzzle[selected] || values.every((v,i)=>v===answer[i])) return;
  history.push([selected,values[selected],notes[selected]]);
  if (pencil && digit && !hint) {
    values[selected]=0;
    const n=String(digit), old=notes[selected];
    notes[selected]=old.includes(n) ? old.replace(n,"") : [...old,n].sort().join("");
  } else { values[selected]=digit; notes[selected]=""; }
  draw();
  if(values.every((v,i)=>v===answer[i])) say("Puzzle solved!");
  else if(values.every(Boolean)) say("Board filled. Check your entries.");
  else say(hint ? "Hint filled." : pencil ? "Pencil mode" : "Digit mode");
}
for(let n=1;n<=9;n++) button(controls,String(n),()=>enter(n));
button(controls,"Erase",()=>enter(0));
const noteButton=button(options,"Pencil",()=>{pencil=!pencil;noteButton.setAttribute("aria-pressed",String(pencil));say(pencil?"Pencil mode":"Digit mode");});
button(options,"Hint",()=>enter(answer[selected],true));
button(options,"Undo",()=>{
  if (!history.length) return;
  const [i,v,n]=history.pop(); selected=i; values[i]=v; notes[i]=n; draw(); say("Move undone.");
});
button(options,"New puzzle",reset);
document.addEventListener("keydown",e=>{
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  if(/^[1-9]$/.test(e.key)) enter(Number(e.key));
  if(["Backspace","Delete"].includes(e.key)) { e.preventDefault(); enter(0); }
});
reset();
