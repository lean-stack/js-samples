
import eventbus from './event/pubsub.js';

var factory = function factory(eventbus) {

    var state = {
        todos: [],
        get remainingCount() {
            return this.todos.reduce(function (sum, t) {
                return !t.completed ? ++sum : sum;
            }, 0);
        },
        get hasCompleted() {
            return this.todos.length !== this.remainingCount;
        },
        get allCompleted() {
            return this.remainingCount == 0;
        }
    };

    eventbus.subscribe('todo.created', function (todo) {
        state.todos.push(todo);
        eventbus.publish('state.change', state);
    });

    eventbus.subscribe('todo.updated', function (todo) {
        var ix = state.todos.findIndex(function (t) {
            return t.id === todo.id;
        });
        state.todos[ix] = todo;
        eventbus.publish('state.change', state);
    });

    eventbus.subscribe('todo.deleted', function (todo) {
        var ix = state.todos.findIndex(function (t) {
            return t.id === todo.id;
        });
        state.todos.splice(ix, 1);
        eventbus.publish('state.change', state);
    });

    return {

        createTodo: createTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        initialize: initialize

    };

    function createTodo(txt) {
        eventbus.publish('store.create', txt);
    }

    function updateTodo(id, changedProps) {
        var ix = state.todos.findIndex(function (t) {
            return t.id === id;
        });
        var todo = Object.assign({}, state.todos[ix], changedProps);
        eventbus.publish('store.update', todo);
    }

    function deleteTodo(id) {
        eventbus.publish('store.delete', id);
    }

    function initialize(storeGetter) {
        storeGetter().then(function (todos) {
            state.todos = todos;
            eventbus.publish('state.change', state);
        });
    }
};

export default factory(eventbus);