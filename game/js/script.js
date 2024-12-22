// Initialisierung der Szene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lichtquelle
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Isometrische 3D-Welt mit Kacheln
const gridSize = 10;
const tileSize = 2;
const tiles = [];

for (let x = 0; x < gridSize; x++) {
  for (let z = 0; z < gridSize; z++) {
    const geometry = new THREE.BoxGeometry(tileSize, 0.2, tileSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.3 });
    const tile = new THREE.Mesh(geometry, material);
    tile.position.set(x * tileSize - (gridSize * tileSize) / 2, 0, z * tileSize - (gridSize * tileSize) / 2);
    scene.add(tile);
    tiles.push(tile);
  }
}

// Kamera für Isometrische Perspektive
camera.position.set(10, 15, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Ressourcen-Mechanik
let resources = 100;
let energy = 50;
let buildings = 0;
let level = 1;
let bonusAvailable = true;
let lamaCount = 0;
let resourceRate = 1; // Ressourcen pro 10 Sekunden

// Timer für automatische Ressourcenproduktion
setInterval(() => {
  resources += resourceRate;
  updateUI();
}, 10000); // alle 10 Sekunden Ressourcen hinzufügen

// Bonus-Material (jedes 30 Sekunden)
setInterval(() => {
  if (bonusAvailable) {
    resources += 50;
    alert('Bonus-Material erhalten!');
    bonusAvailable = false; // Bonus nur einmal verfügbar
    updateUI();
  }
}, 30000);

// Funktion zum Bau von Farmen
document.getElementById('buildFarm').addEventListener('click', () => {
  if (resources >= 50) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x28a745 });
    const building = new THREE.Mesh(geometry, material);

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    building.position.set(randomTile.position.x, 0.5, randomTile.position.z);

    scene.add(building);
    resources -= 50;
    buildings++;
    updateUI();
  }
});

// Funktion zum Bau von Fabriken
document.getElementById('buildFactory').addEventListener('click', () => {
  if (resources >= 100) {
    const geometry = new THREE.BoxGeometry(2, 3, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const building = new THREE.Mesh(geometry, material);

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    building.position.set(randomTile.position.x, 1.5, randomTile.position.z);

    scene.add(building);
    resources -= 100;
    buildings++;
    updateUI();
  }
});

// Funktion zum Bau von Lamas
document.getElementById('buildLama').addEventListener('click', () => {
  if (resources >= 200) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const lama = new THREE.Mesh(geometry, material);

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    lama.position.set(randomTile.position.x, 0.5, randomTile.position.z);

    scene.add(lama);
    resources -= 200;
    lamaCount++;
    updateUI();
  }
});

// Funktion zur Erweiterung der Karte
document.getElementById('expandMap').addEventListener('click', () => {
  const newGridSize = gridSize + 5;
  const newTiles = [];
  for (let x = gridSize; x < newGridSize; x++) {
    for (let z = gridSize; z < newGridSize; z++) {
      const geometry = new THREE.BoxGeometry(tileSize, 0.2, tileSize);
      const material = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.3 });
      const tile = new THREE.Mesh(geometry, material);
      tile.position.set(x * tileSize - (newGridSize * tileSize) / 2, 0, z * tileSize - (newGridSize * tileSize) / 2);
      scene.add(tile);
      newTiles.push(tile);
    }
  }
  tiles.push(...newTiles);
  updateUI();
});

// Funktion zur Anzeige von Ressourcen, Level, und Lama-Zähler
function updateUI() {
  document.getElementById('resources').textContent = resources;
  document.getElementById('energy').textContent = energy;
  document.getElementById('buildings').textContent = buildings;
  document.getElementById('level').textContent = level;
  document.getElementById('level').textContent = level;
}

// Animations-Loop
function animate() {
  requestAnimationFrame(animate);

  // Kamera Drehung für bessere Sicht
  camera.position.x += 0.01;
  camera.position.z += 0.01;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);
}

animate();
