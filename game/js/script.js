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

// Insel Welt erstellen
const gridSize = 10;
const tileSize = 3;
const tiles = [];

for (let x = 0; x < gridSize; x++) {
  for (let z = 0; z < gridSize; z++) {
    const geometry = new THREE.BoxGeometry(tileSize, 0.5, tileSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x2f4f4f });
    const tile = new THREE.Mesh(geometry, material);
    tile.position.set(x * tileSize - (gridSize * tileSize) / 2, 0, z * tileSize - (gridSize * tileSize) / 2);
    scene.add(tile);
    tiles.push(tile);
  }
}

// Kamera-Position
camera.position.set(15, 20, 15);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Spielmechanik
let resources = 100;
let energy = 50;
let buildings = 0;
let level = 1;
let lamaCount = 0;
let resourceRate = 1;

// Timer für automatische Ressourcenproduktion
setInterval(() => {
  resources += resourceRate;
  updateUI();
}, 5000);

// Erweiterung der Karte
let mapSize = gridSize;

document.getElementById('expandMap').addEventListener('click', () => {
  mapSize += 5;
  for (let x = gridSize; x < mapSize; x++) {
    for (let z = gridSize; z < mapSize; z++) {
      const geometry = new THREE.BoxGeometry(tileSize, 0.5, tileSize);
      const material = new THREE.MeshStandardMaterial({ color: 0x2f4f4f });
      const tile = new THREE.Mesh(geometry, material);
      tile.position.set(x * tileSize - (mapSize * tileSize) / 2, 0, z * tileSize - (mapSize * tileSize) / 2);
      scene.add(tile);
      tiles.push(tile);
    }
  }
  updateUI();
  gridSize = mapSize;
});

// Funktion zum Bauen
document.getElementById('buildFarm').addEventListener('click', () => {
  if (resources >= 50) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x28a745 });
    const building = new THREE.Mesh(geometry, material);
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    building.position.set(randomTile.position.x, 1, randomTile.position.z);
    scene.add(building);
    resources -= 50;
    buildings++;
    updateUI();
  }
});

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

document.getElementById('buildLama').addEventListener('click', () => {
  if (resources >= 200) {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const lama = new THREE.Mesh(geometry, material);
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    lama.position.set(randomTile.position.x, 1, randomTile.position.z);
    scene.add(lama);
    resources -= 200;
    lamaCount++;
    updateUI();
  }
});

// UI Update
function updateUI() {
  document.getElementById('resources').textContent = resources;
  document.getElementById('buildings').textContent = buildings;
  document.getElementById('level').textContent = level;
}

// Animation und Rendering
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
