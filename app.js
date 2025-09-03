// Массивы для хранения заявок
let travelers = [];
let senders = [];

// DOM элементы
const travelerForm = document.getElementById('travelerForm');
const senderForm = document.getElementById('senderForm');
const matchList = document.getElementById('matchList');
const noMatches = document.getElementById('noMatches');

// Обработка формы путешественника
travelerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(travelerForm);
  const from = data.get('0');
  const to = data.get('1');
  const weight = parseFloat(data.get('2'));
  const reward = parseInt(data.get('3'));

  travelers.push({ from, to, weight, reward });
  travelerForm.reset();
  findMatches();
});

// Обработка формы отправителя
senderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(senderForm);
  const from = data.get('0');
  const to = data.get('1');
  const weight = parseFloat(data.get('2'));
  const desc = data.get('3') || 'Без описания';

  senders.push({ from, to, weight, desc });
  senderForm.reset();
  findMatches();
});

// Поиск совпадений
function findMatches() {
  matchList.innerHTML = '';
  let hasMatches = false;

  for (const sender of senders) {
    for (const traveler of travelers) {
      if (
        sender.from.toLowerCase() === traveler.from.toLowerCase() &&
        sender.to.toLowerCase() === traveler.to.toLowerCase() &&
        sender.weight <= traveler.weight
      ) {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>Маршрут:</strong> ${sender.from} → ${sender.to}<br>
          <strong>Посылка:</strong> ${sender.weight} кг | 
          <strong>Вознаграждение:</strong> ${traveler.reward} ₽<br>
          <small>${sender.desc}</small>
        `;
        matchList.appendChild(li);
        hasMatches = true;
      }
    }
  }

  noMatches.style.display = hasMatches ? 'none' : 'block';
}