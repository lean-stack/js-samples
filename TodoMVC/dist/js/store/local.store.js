var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _getStoreData() {
    return JSON.parse(localStorage['es6-todos'] || '{ "lastId": 0, "todos": [] }');
}

function _setStoreData(data) {
    localStorage['es6-todos'] = JSON.stringify(data);
}

var LocalStore = function () {
    function LocalStore(eventbus) {
        _classCallCheck(this, LocalStore);

        eventbus.subscribe('store.create', function (txt) {

            var data = _getStoreData();
            var todo = { id: ++data.lastId, txt: txt, completed: false };
            data.todos.push(todo);
            _setStoreData(data);
            eventbus.publish('todo.created', todo);
        });

        eventbus.subscribe('store.delete', function (id) {

            var data = _getStoreData();
            var ix = data.todos.findIndex(function (t) {
                return t.id === id;
            });
            var todo = data.todos.splice(ix, 1)[0];
            _setStoreData(data);
            eventbus.publish('todo.deleted', todo);
        });

        eventbus.subscribe('store.update', function (todo) {

            var data = _getStoreData();
            var ix = data.todos.findIndex(function (t) {
                return t.id === todo.id;
            });
            data.todos[ix] = todo;
            _setStoreData(data);
            eventbus.publish('todo.updated', todo);
        });
    }

    _createClass(LocalStore, [{
        key: 'get',
        value: function get() {
            return new Promise(function (resolve) {
                resolve(_getStoreData().todos);
            });
        }
    }]);

    return LocalStore;
}();

export default LocalStore;
;