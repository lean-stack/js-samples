function _getStoreData() {
    return JSON.parse(localStorage['es6-todos'] || '{ "lastId": 0, "todos": [] }');
}

function _setStoreData(data) {
    localStorage['es6-todos'] = JSON.stringify(data);
}

export default class LocalStore {

    constructor(eventbus) {

        eventbus.subscribe('store.create', (txt) => {

            const data = _getStoreData();
            const todo = { id: ++data.lastId, txt, completed: false};
            data.todos.push( todo );
            _setStoreData(data);
            eventbus.publish('todo.created', todo);
        });

        eventbus.subscribe('store.delete', (id) => {

            const data = _getStoreData();
            const ix = data.todos.findIndex( t => t.id === id);
            const todo = data.todos.splice(ix,1)[0];
            _setStoreData(data);
            eventbus.publish('todo.deleted', todo);
        });

        eventbus.subscribe('store.update', (todo) => {

            const data = _getStoreData();
            const ix = data.todos.findIndex( t => t.id === todo.id);
            data.todos[ix] = todo;
            _setStoreData(data);
            eventbus.publish('todo.updated', todo);
        });
    }

    get() {
        return new Promise((resolve) => {
            resolve(_getStoreData().todos);
        });
    }
};
