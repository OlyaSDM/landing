document.querySelectorAll('.faq_question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq_item');
        item.classList.toggle('hidden');
    });
});