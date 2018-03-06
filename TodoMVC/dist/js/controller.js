function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $newTodo = document.querySelector('.new-todo');
var $todoList = document.querySelector('.todo-list');

var Controller = function Controller(state) {
    _classCallCheck(this, Controller);

    $newTodo.addEventListener('change', function () {
        var txt = $newTodo.value.trim();
        if (txt) {
            state.createTodo(txt);
            $newTodo.value = '';
        }
    });

    $todoList.addEventListener('click', function (ev) {
        var $li = ev.target.closest('[data-id]');

        if (ev.target.classList.contains('destroy')) {
            state.deleteTodo($li.getAttribute('data-id'));
        }
    });

    $todoList.addEventListener('change', function (ev) {
        var $li = ev.target.closest('[data-id]');

        if (ev.target.classList.contains('toggle')) {
            state.updateTodo($li.getAttribute('data-id'), { completed: ev.target.checked });
        }
    });
};

export default Controller;