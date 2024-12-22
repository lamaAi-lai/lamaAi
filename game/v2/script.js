
let resources = 0;
let techLevel = 1;
let researchInProgress = false;
let buildingInProgress = false;
let lamaUpgraded = false;

document.getElementById('collectBtn').addEventListener('click', collectResources);
document.getElementById('upgradeBtn').addEventListener('click', upgradeLama);
document.getElementById('researchBtn').addEventListener('click', startResearch);
document.getElementById('buildBtn').addEventListener('click', buildTechStructure);

function collectResources() {
  let collected = 1 * techLevel;
  resources += collected;
  document.getElementById('resources').innerText = resources;
  document.getElementById('message').innerText = `Ressourcen gesammelt: ${collected}`;
}

function upgradeLama() {
  if (resources >= 5 && !lamaUpgraded) {
    resources -= 5;
    techLevel++;
    document.getElementById('resources').innerText = resources;
    document.getElementById('techLevel').innerText = techLevel;
    document.getElementById('message').innerText = 'Lama verbessert! Tech-Level gestiegen!';
    lamaUpgraded = true;
    document.querySelector('.lama-head').style.background = 'linear-gradient(135deg, #00ffcc, #00cc99)';
    document.querySelector('.lama-body').style.background = 'linear-gradient(135deg, #00ffcc, #00cc99)';
  } else if (lamaUpgraded) {
    document.getElementById('message').innerText = 'Lama bereits verbessert!';
  } else {
    document.getElementById('message').innerText = 'Nicht genug Ressourcen für Upgrade!';
  }
}

function startResearch() {
  if (resources >= 10 && !researchInProgress) {
    resources -= 10;
    document.getElementById('resources').innerText = resources;
    researchInProgress = true;
    document.getElementById('message').innerText = 'Forschung gestartet! Verbesserungen werden freigeschaltet.';
    setTimeout(() => {
      researchInProgress = false;
      techLevel++;
      document.getElementById('techLevel').innerText = techLevel;
      document.getElementById('message').innerText = 'Forschung abgeschlossen! Tech-Level gestiegen!';
    }, 5000);
  } else if (researchInProgress) {
    document.getElementById('message').innerText = 'Forschung läuft noch!';
  } else {
    document.getElementById('message').innerText = 'Nicht genug Ressourcen für Forschung!';
  }
}

function buildTechStructure() {
  if (resources >= 20 && !buildingInProgress) {
    resources -= 20;
    document.getElementById('resources').innerText = resources;
    buildingInProgress = true;
    document.getElementById('message').innerText = 'Bau einer Tech-Struktur gestartet!';
    setTimeout(() => {
      buildingInProgress = false;
      techLevel++;
      document.getElementById('techLevel').innerText = techLevel;
      document.getElementById('message').innerText = 'Tech-Struktur gebaut! Tech-Level gestiegen!';
    }, 7000);
  } else if (buildingInProgress) {
    document.getElementById('message').innerText = 'Bau läuft noch!';
  } else {
    document.getElementById('message').innerText = 'Nicht genug Ressourcen für Tech-Struktur!';
  }
}
