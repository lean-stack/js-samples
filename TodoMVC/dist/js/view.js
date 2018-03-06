var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $todoCount = document.querySelector('.todo-count');
var $todoList = document.querySelector('.todo-list');
var $main = document.querySelector('.main');
var $footer = document.querySelector('.footer');
var $clearCompleted = document.querySelector('.clear-completed');
var $toggleAll = document.querySelector('.toggle-all');

var View = function () {
    function View(eventbus) {
        _classCallCheck(this, View);

        eventbus.subscribe('state.change', this.renderUI);
    }

    _createClass(View, [{
        key: 'renderUI',
        value: function renderUI(state) {

            // Render list
            var listHtml = state.todos.reduce(function (html, todo) {

                html += '\n                <!-- These are here just to show the structure of the list items -->\n                <!-- List items should get the class \'editing\' when editing and \'completed\' when marked as completed -->\n                <li data-id="' + todo.id + '" class="' + (todo.completed ? 'completed' : '') + '">\n                    <div class="view">\n                        <input class="toggle" type="checkbox" ' + (todo.completed ? 'checked' : '') + '>\n                        <label>' + todo.txt + '</label>\n                        <button class="destroy"></button>\n                    </div>\n                    <input class="edit" value="' + todo.txt + '">\n                </li>\n            ';

                return html;
            }, '');
            $todoList.innerHTML = listHtml;

            $todoCount.innerHTML = '\n            <strong>' + state.remainingCount + '</strong>\n            item' + (state.remainingCount !== 1 ? 's' : '') + ' left    \n        ';

            if (state.todos.length == 0) {
                $main.classList.add('hidden');
                $footer.classList.add('hidden');
            } else {
                $main.classList.remove('hidden');
                $footer.classList.remove('hidden');
            }

            if (state.hasCompleted) {
                $clearCompleted.classList.remove('hidden');
            } else {
                $clearCompleted.classList.add('hidden');
            }

            $toggleAll.checked = state.allCompleted;
        }
    }]);

    return View;
}();

export default View;
;