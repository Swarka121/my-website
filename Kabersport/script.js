/* Небольшой JavaScript: фильтр игроков и сообщение после отправки формы */

// Фильтр карточек игроков (страница players.html)
const filters = document.getElementById('filters');
if (filters) {
    const cards = document.querySelectorAll('.player');
    const empty = document.getElementById('empty');
    const apply = (key) => {
        let shown = 0;
        cards.forEach((c) => {
            const ok = key === 'all' || c.dataset.game === key;
            c.hidden = !ok;
            if (ok) shown++;
        });
        empty.hidden = shown !== 0;
        filters.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.filter === key));
    };
    filters.addEventListener('click', (e) => {
        if (e.target.matches('button')) apply(e.target.dataset.filter);
    });
    // Переход по ссылке вида players.html#moba сразу включает фильтр
    const hash = location.hash.slice(1);
    if (hash && filters.querySelector(`[data-filter="${hash}"]`)) apply(hash);
}

// Форма анкеты (страница join.html)
const form = document.getElementById('joinForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('formMsg').classList.add('show');
        form.reset();
    });
}

// Если Bootstrap не загрузился (нет интернета) — раскрываем все пункты FAQ
window.addEventListener('load', () => {
    if (!window.bootstrap) {
        document.querySelectorAll('.accordion-collapse').forEach((el) => el.classList.add('show'));
    }
});
