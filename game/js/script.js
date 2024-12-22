let resources = 100;
let energy = 100;
let level = 1;
let grid = [];

const resourcesDisplay = document.getElementById('resources');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const messageDisplay = document.getElementById('message');
const gridDisplay = document.getElementById('grid');

const buildFarmBtn = document.getElementById('buildFarm');
const buildFactoryBtn = document.getElementById('buildFactory');
const upgradeLandBtn = document.getElementById('upgradeLand');

// Aktionen
buildFarmBtn.addEventListener('click', () => buildStructure('farm', 50));
buildFactoryBtn.addEventListener('click', () => buildStructure('factory', 100));
upgradeLandBtn.addEventListener('click', expandLand);

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
  energyDisplay.textContent = energy;
  levelDisplay.textContent = level;

  gridDisplay.innerHTML = '';
  grid.forEach((cell, index) => {
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

// Initialisierung
function init() {
  grid = Array(8).fill(null);
  updateUI();
}

init();
