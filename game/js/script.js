// Initialisierung der Szene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Licht
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Boden (Tile-Based)
const gridSize = 10;
const tileSize = 1;
const tiles = [];

for (let x = 0; x < gridSize; x++) {
  for (let z = 0; z < gridSize; z++) {
    const geometry = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x2f4f4f });
    const tile = new THREE.Mesh(geometry, material);

    tile.position.set(x - gridSize / 2, 0, z - gridSize / 2);
    scene.add(tile);
    tiles.push(tile);
  }
}

// Kamera Position
camera.position.set(5, 10, 10);
camera.lookAt(0, 0, 0);

// Gebäude hinzufügen
let resources = 100;

document.getElementById('buildFarm').addEventListener('click', () => {
  if (resources >= 50) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const building = new THREE.Mesh(geometry, material);

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    building.position.set(randomTile.position.x, 0.5, randomTile.position.z);

    scene.add(building);
    resources -= 50;
    document.getElementById('resources').textContent = resources;
  }
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
