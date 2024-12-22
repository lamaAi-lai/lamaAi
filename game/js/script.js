let resources = 100;
let timer = 0;
let level = 1;
let grid = [];

// Elemente
const resourcesDisplay = document.getElementById('resources');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');
const messageDisplay = document.getElementById('message');
const gridDisplay = document.getElementById('grid');

// Aktionen
document.getElementById('buildFarm').addEventListener('click', () => buildStructure('farm', 50));
document.getElementById('buildFactory').addEventListener('click', () => buildStructure('factory', 100));
document.getElementById('expandLand').addEventListener('click', expandLand);

// Funktionen
function buildStructure(type, cost) {
  if (resources >= cost) {
    const emptySpot = grid.indexOf(null);
    if (emptySpot !== -1) {
      grid[emptySpot] = type;
      resources -= cost;
      updateUI();
      showMessage(`${type === 'farm' ? 'Farm' : 'Fabrik'} gebaut!`);
    } else {
      showMessage('Kein Platz mehr verfügbar!');
    }
  } else {
    showMessage('Nicht genug Ressourcen!');
  }
}

function expandLand() {
  if (resources >= 200) {
    grid.push(null, null, null, null);
    resources -= 200;
    updateUI();
    showMessage('Land erweitert!');
  } else {
    showMessage('Nicht genug Ressourcen!');
  }
}

function updateUI() {
  resourcesDisplay.textContent = resources;
  timerDisplay.textContent = timer;
  levelDisplay.textContent = level;

  gridDisplay.innerHTML = '';
  grid.forEach((cell) => {
    const div = document.createElement('div');
    div.className = cell || '';
    gridDisplay.appendChild(div);
  });
}

function showMessage(msg) {
  messageDisplay.textContent = msg;
  setTimeout(() => {
    messageDisplay.textContent = '';
  }, 3000);
}

// Timer für Ressourcen
setInterval(() => {
  timer++;
  resources += 5; // Bonus alle paar Sekunden
  if (timer % 30 === 0) {
    level++;
    resources += 50; // Level-Bonus
    showMessage('Level aufgestiegen!');
  }
  updateUI();
}, 1000);

// Initialisierung
function init() {
  grid = Array(8).fill(null);
  updateUI();
}

init();
