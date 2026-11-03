const byId = id => document.getElementById(id);
const board = byId("board"), controls = byId("controls"), options = byId("options");
function say(text) { byId("status").textContent = text; }
function button(parent, label, action) {
  const item = document.createElement("button");
  item.textContent = label;
  item.onclick = action;
  parent.append(item);
  return item;
}
function grid(size) {
  board.replaceChildren();
  board.className = "grid";
  board.style.setProperty("--n", size);
}
function tile(style, label = "") {
  const cell = document.createElement("span");
  cell.className = style;
  cell.textContent = label;
  board.append(cell);
}
const vectors = [[0,-1],[-1,0],[0,1],[1,0]];
function directions(move) {
  ["↑","←","↓","→"].forEach((symbol,i) => {
    button(controls,symbol,() => move(i)).setAttribute("aria-label",["Up","Left","Down","Right"][i]);
  });
  document.addEventListener("keydown", e => {
    if (e.target.tagName === "SELECT" || e.ctrlKey || e.metaKey || e.altKey) return;
    const i = ["arrowup","arrowleft","arrowdown","arrowright"].indexOf(e.key.toLowerCase());
    const dir = i < 0 ? ["w","a","s","d"].indexOf(e.key.toLowerCase()) : i;
    if (dir >= 0) { e.preventDefault(); move(dir); }
  });
}
