byId("instructions").textContent = "Make a line of three. Play against the original C Minimax engine or share the board with a friend.";
async function start() {
  const response = await fetch("game.wasm");
  if (!response.ok) throw Error("Engine unavailable");
  const {instance} = await WebAssembly.instantiate(await response.arrayBuffer());
  const engine = instance.exports, ptr = Number(engine.__heap_base);
  if (ptr+9 > engine.memory.buffer.byteLength) engine.memory.grow(1);
  const cells = new Uint8Array(engine.memory.buffer,ptr,9);
  const mode = document.createElement("select");
  mode.setAttribute("aria-label","Opponent");
  mode.add(new Option("Computer")); mode.add(new Option("Two players")); options.append(mode);
  let player, finished, scores;
  function draw() {
    grid(3);
    cells.forEach((code,i)=>{
      const mark = code===88 || code===79 ? String.fromCharCode(code) : "";
      const cell=button(board,mark,()=>play(i));
      cell.disabled=!!mark || finished;
      cell.setAttribute("aria-label","Square "+(i+1)+": "+(mark || "empty"));
    });
  }
  function nextTurn() {
    const win=engine.checkWinner(ptr);
    finished=!!win || !!engine.isFull(ptr);
    player=player===88 ? 79 : 88;
    if(finished) scores[win]++;
    const result=finished ? ["Draw.","X wins!","O wins!"][win] : String.fromCharCode(player)+" to play.";
    say(result+" · X "+scores[1]+" / O "+scores[2]+" / Draws "+scores[0]);
  }
  function play(i) {
    if(finished || !engine.makeMove(ptr,i,player)) return;
    nextTurn();
    if(!finished && mode.selectedIndex===0) {
      engine.makeMove(ptr,engine.bestMove(ptr,player),player); nextTurn();
    }
    draw();
  }
  function reset() { engine.resetBoard(ptr); player=88; finished=false; say("X to play."); draw(); }
  mode.onchange=()=>{ scores=[0,0,0]; reset(); };
  button(options,"New round",reset); mode.onchange();
}
start().catch(()=>say("The game engine could not load. Reload the page to try again."));
