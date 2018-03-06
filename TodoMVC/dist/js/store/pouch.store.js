var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PouchStore = function () {
    function PouchStore(eventbus) {
        var _this = this;

        _classCallCheck(this, PouchStore);

        this.db = new PouchDB('todos');

        eventbus.subscribe('store.create', function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(txt) {
                var todo, response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                todo = { txt: txt, completed: false };
                                _context.next = 3;
                                return _this.db.post(todo);

                            case 3:
                                response = _context.sent;


                                todo.id = response.id;
                                eventbus.publish('todo.created', todo);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());

        eventbus.subscribe('store.delete', function (id) {

            // const data = _getStoreData();
            // const ix = data.todos.findIndex( t => t.id === parseInt(id));
            // const todo = data.todos.splice(ix,1)[0];
            // _setStoreData(data);
            // eventbus.publish('todo.deleted', todo);
        });

        eventbus.subscribe('store.update', function (todo) {
            var docProps = Object.assign({}, todo);
            delete docProps.id;

            _this.db.get(todo.id).then(function (updatingItem) {
                Object.assign(updatingItem, docProps);
                _this.db.put(updatingItem).then(function () {
                    eventbus.publish('todo.updated', todo);
                });
            });

            // const data = _getStoreData();
            // const ix = data.todos.findIndex( t => t.id === todo.id);
            // data.todos[ix] = todo;
            // _setStoreData(data);
            // eventbus.publish('todo.updated', todo);
        });
    }

    _createClass(PouchStore, [{
        key: 'get',
        value: function get() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.db.allDocs({ include_docs: true }).then(function (db) {
                    resolve(db.rows.map(function (row) {

                        return Object.assign(row.doc, { id: row.doc._id });
                    }));
                });
            });
        }
    }]);

    return PouchStore;
}();

export default PouchStore;
;