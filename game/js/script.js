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

// Funktion zum Bau von Farmen
let resources = 100;
document.getElementById('buildFarm').addEventListener('click', () => {
  if (resources >= 50) {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x28a745 });
    const building = new THREE.Mesh(geometry, material);

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    building.position.set(randomTile.position.x, 0.5, randomTile.position.z);

    scene.add(building);
    resources -= 50;
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
    updateUI();
  }
});

// Funktion zur Erweiterung der Karte
document.getElementById('expandMap').addEventListener('click', () => {
  for (let x = gridSize; x < gridSize + 5; x++) {
    for (let z = gridSize; z < gridSize + 5; z++) {
      const geometry = new THREE.BoxGeometry(tileSize, 0.2, tileSize);
      const material = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.3 });
      const tile = new THREE.Mesh(geometry, material);
      tile.position.set(x * tileSize - (gridSize * tileSize) / 2, 0, z * tileSize - (gridSize * tileSize) / 2);
      scene.add(tile);
      tiles.push(tile);
    }
  }
  gridSize += 5;
  updateUI();
});

// Update der UI mit den aktuellen Ressourcen
function updateUI() {
  document.getElementById('resources').textContent = resources;
}

// Animationsloop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
