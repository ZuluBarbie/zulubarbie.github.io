byId("instructions").textContent = "Collect the stars. Steer with the arrow keys, WASD or the buttons. Avoid the walls and your tail.";
const size = 16;
let snake, heading, next, food, timer, ended;
function placeFood() {
  const free = Array.from({length:size*size},(_,i)=>i).filter(i=>!snake.includes(i));
  food = free[Math.floor(Math.random()*free.length)];
}
function draw() {
  grid(size);
  for (let i=0;i<size*size;i++) {
    if (i === snake[0]) tile("head","●");
    else if (i === food) tile("food","★");
    else tile(snake.includes(i) ? "body" : "");
  }
}
function stop() { clearTimeout(timer); timer = null; }
function tick() {
  heading = next;
  const [dx,dy] = vectors[heading];
  const x = snake[0]%size+dx, y = Math.floor(snake[0]/size)+dy;
  const head = y*size+x, eating = head === food;
  if (x<0 || x>=size || y<0 || y>=size || (eating ? snake : snake.slice(0,-1)).includes(head)) {
    stop(); ended = true; say("Game over · Score "+(snake.length-3)); return;
  }
  if (!eating) snake.pop();
  snake.unshift(head);
  if (eating) { placeFood(); say("Score "+(snake.length-3)); }
  draw();
  if (food === undefined) { ended = true; stop(); say("Board cleared!"); return; }
  timer = setTimeout(tick,Math.max(85,240-(snake.length-3)*9));
}
function toggle() {
  if (ended) return;
  if (timer) { stop(); say("Paused · Score "+(snake.length-3)); }
  else { say("Score "+(snake.length-3)); timer = setTimeout(tick,240); }
}
function reset() {
  stop(); snake = [136,135,134]; heading = next = 3; ended = false;
  placeFood(); draw(); say("Ready · Choose Start or a direction.");
}
directions(i => { if (!ended && (i+2)%4 !== heading) { next = i; if (!timer) toggle(); } });
button(options,"Start / pause",toggle); button(options,"Restart",reset);
document.addEventListener("visibilitychange",()=>{ if(document.hidden && timer) toggle(); });
reset();
