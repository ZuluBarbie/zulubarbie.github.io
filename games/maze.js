const layouts = [
  [
    "#######",
    "#P  # #",
    "### # #",
    "#     #",
    "# ### #",
    "#   #E#",
    "#######"
  ],
  [
    "#########",
    "#P #    #",
    "#  # ## #",
    "##   #  #",
    "# ## # ##",
    "#    #  #",
    "# ####  #",
    "#      E#",
    "#########"
  ],
  [
    "###########",
    "#P  #     #",
    "### # ### #",
    "#   # #   #",
    "# ### # ###",
    "#     #   #",
    "# ##### # #",
    "# #     # #",
    "# # ##### #",
    "#      #E #",
    "###########"
  ]
];
byId("instructions").textContent = "Reach the star using the arrow keys, WASD or the buttons below.";
const level = document.createElement("select");
level.setAttribute("aria-label","Maze difficulty");
["Easy","Medium","Hard"].forEach(name => level.add(new Option(name)));
options.append(level);
let rows, x, y, moves, won, best;
function draw() {
  grid(rows.length);
  rows.forEach((row,j) => [...row].forEach((c,i) => {
    if (i === x && j === y) tile("player","●");
    else if (c === "E") tile("exit","★");
    else tile(c === "#" ? "wall" : "");
  }));
  say((won ? "Exit reached! " : "") + "Moves: " + moves + (best ? " · Best: " + best : ""));
}
function reset() {
  rows = layouts[level.selectedIndex];
  y = rows.findIndex(row => row.includes("P")); x = rows[y].indexOf("P");
  moves = 0; won = false; best = 0;
  try { best = Number(localStorage.getItem("maze-best-"+level.selectedIndex)); } catch {}
  draw();
}
directions(i => {
  const [dx,dy] = vectors[i];
  if (won || rows[y+dy][x+dx] === "#") return;
  x += dx; y += dy; moves++;
  won = rows[y][x] === "E";
  if (won && (!best || moves < best)) {
    best = moves;
    try { localStorage.setItem("maze-best-"+level.selectedIndex,best); } catch {}
  }
  draw();
});
level.onchange = reset; button(options,"Restart",reset); reset();
