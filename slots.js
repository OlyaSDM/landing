document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.slot_item');
    const btn = document.querySelector('.slots_more_btn');

    if (!btn) return;

    let expanded = false;

    // скрываем всё после 12
    items.forEach((item, index) => {
        if (index >= 12) {
            item.classList.add('hidden');
        }
    });

    btn.addEventListener('click', () => {
        expanded = !expanded;

        items.forEach((item, index) => {
            if (index >= 12) {
                item.classList.toggle('hidden', !expanded);
            }
        });

        btn.textContent = expanded ? 'Скрыть' : 'Показать ещё';
    });
});