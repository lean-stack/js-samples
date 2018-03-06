
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');

export default class Controller {

    constructor(state) {

        $newTodo.addEventListener('change', () => {
            const txt = $newTodo.value.trim();
            if (txt) {
                state.createTodo(txt);
                $newTodo.value = '';
            }
        });
        
        $todoList.addEventListener('click', (ev) => {
            const $li = ev.target.closest('[data-id]');

            if (ev.target.classList.contains('destroy')) {
                state.deleteTodo(parseInt($li.getAttribute('data-id')));
            }
        });

        $todoList.addEventListener('change', (ev) => {
            const $li = ev.target.closest('[data-id]');

            if (ev.target.classList.contains('toggle')) {
                state.updateTodo(parseInt($li.getAttribute('data-id')),
                    { completed: ev.target.checked });
            }
        });
    }

}