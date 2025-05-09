const tg = window.Telegram.WebApp;
const contentEl = document.getElementById('content');
const userInfoEl = document.getElementById('user-info');

// Инициализация
tg.expand();
tg.MainButton.setText("Готово").show();

// Показываем информацию о пользователе
userInfoEl.innerHTML = `
    <p>👤 ${tg.initDataUnsafe.user.first_name || 'Ученик'}</p>
    <p>🏫 Класс: ${getUserClass()}</p>
`;

// Загрузка материалов
loadMaterials();

function getUserClass() {
    return localStorage.getItem('userClass') || 'не указан';
}

async function loadMaterials() {
    try {
        const response = await fetch('https://history-ruby-rho.vercel.app//materials');
        const materials = await response.json();
        displayMaterials(materials);
    } catch (error) {
        contentEl.innerHTML = `<p>Ошибка загрузки: ${error.message}</p>`;
    }
}

function displayMaterials(materials) {
    contentEl.innerHTML = materials.map(m => `
        <article>
            <h3>${m.title}</h3>
            <p>${m.content}</p>
        </article>
    `).join('');
}