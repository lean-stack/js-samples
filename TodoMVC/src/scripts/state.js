
import eventbus from './event/pubsub.js';

const factory = (eventbus) => { 
    
    var state = {
        todos: [],
        get remainingCount () { 
            return this.todos.reduce( (sum,t) => !t.completed ? ++sum : sum, 0);
        },
        get hasCompleted() { return this.todos.length !== this.remainingCount; },
        get allCompleted() { return this.remainingCount == 0; }
    };

    eventbus.subscribe('todo.created', (todo) => {
        state.todos.push(todo);
        eventbus.publish('state.change', state);
    });

    eventbus.subscribe('todo.updated', (todo) => {
        const ix = state.todos.findIndex( (t) => t.id === todo.id);
        state.todos[ix] = todo;
        eventbus.publish('state.change', state);
    });

    eventbus.subscribe('todo.deleted', (todo) => {
        const ix = state.todos.findIndex( (t) => t.id === todo.id);
        state.todos.splice(ix,1);
        eventbus.publish('state.change', state);
    });

    return {

        createTodo,
        updateTodo,
        deleteTodo,
        initialize

    }; 

    function createTodo(txt) {
        eventbus.publish('store.create', txt);
    }

    function updateTodo(id, changedProps) {
        const ix = state.todos.findIndex( (t) => t.id === id);
        const todo = Object.assign({}, state.todos[ix], changedProps);
        eventbus.publish('store.update', todo);
    }

    function deleteTodo(id) {
        eventbus.publish('store.delete', id);
    }

    function initialize(storeGetter) {
        storeGetter().then( (todos) => {
            state.todos = todos;
            eventbus.publish('state.change', state);
        })   
    }
};

export default factory(eventbus);
