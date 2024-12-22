
let resources = 0;
let lamaUpgraded = false;

document.getElementById('collectBtn').addEventListener('click', collectResources);
document.getElementById('upgradeBtn').addEventListener('click', upgradeLama);

function collectResources() {
  resources++;
  document.getElementById('resources').innerText = resources;
  document.getElementById('message').innerText = 'Ressourcen gesammelt!';
}

function upgradeLama() {
  if (resources >= 5 && !lamaUpgraded) {
    resources -= 5;
    document.getElementById('resources').innerText = resources;
    document.getElementById('message').innerText = 'Lama verbessert!';
    lamaUpgraded = true;
    document.querySelector('.lama-head').style.background = 'linear-gradient(135deg, #00ffcc, #00cc99)';
    document.querySelector('.lama-body').style.background = 'linear-gradient(135deg, #00ffcc, #00cc99)';
  } else if (lamaUpgraded) {
    document.getElementById('message').innerText = 'Lama bereits verbessert!';
  } else {
    document.getElementById('message').innerText = 'Nicht genug Ressourcen!';
  }
}
