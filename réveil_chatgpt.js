// Mise à jour de l'heure actuelle
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').innerText = `${hours}:${minutes}`;
}

// Affiche l'heure en temps réel
setInterval(updateTime, 1000);

// Gestion des alarmes
let alarmTime = null;
let alarms = [];
let alarmTimeout = null;

// Affichage de l'interface de création d'alarme
document.getElementById('create-alarm-btn').addEventListener('click', () => {
    document.querySelector('.main-container').style.display = 'none';
    document.getElementById('alarm-container').style.display = 'block';
});

// Fonction pour définir l'alarme
document.getElementById('set-alarm').addEventListener('click', () => {
    const alarmInput = document.getElementById('alarm-time').value;
    if (alarmInput) {
        alarmTime = alarmInput;
        alarms.push(alarmTime);
        document.getElementById('status-message').innerText = `Alarme réglée à ${alarmTime}.`;
        updateAlarmList();
        checkAlarm();
    }
});

// Fonction pour effacer l'alarme
document.getElementById('clear-alarm').addEventListener('click', () => {
    clearTimeout(alarmTimeout);
    alarmTime = null;
    document.getElementById('status-message').innerText = 'Aucune alarme définie.';
});

// Vérification de l'alarme
function checkAlarm() {
    clearTimeout(alarmTimeout);
    alarmTimeout = setInterval(() => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        if (currentTime === alarmTime) {
            alert("Réveil ! C'est l'heure !");
            clearTimeout(alarmTimeout);
            document.getElementById('status-message').innerText = 'Aucune alarme définie.';
        }
    }, 1000);
}

// Met à jour la liste des alarmes
function updateAlarmList() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';
    alarms.forEach((alarm) => {
        const li = document.createElement('li');
        li.textContent = alarm;
        alarmList.appendChild(li);
    });
}

// Retour à l'interface principale
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('alarm-container').style.display = 'none';
    document.querySelector('.main-container').style.display = 'block';
});
