
export default class PouchStore {

    constructor(eventbus) {

        this.db = new PouchDB('todos');

        eventbus.subscribe('store.create', async (txt) => {
            const todo = { txt, completed: false};

            const response = await this.db.post(todo);
            
            todo.id = response.id;
            eventbus.publish('todo.created', todo);
            
        });

        eventbus.subscribe('store.delete', (id) => {

            // const data = _getStoreData();
            // const ix = data.todos.findIndex( t => t.id === parseInt(id));
            // const todo = data.todos.splice(ix,1)[0];
            // _setStoreData(data);
            // eventbus.publish('todo.deleted', todo);
        });

        eventbus.subscribe('store.update', (todo) => {
            const docProps = Object.assign({}, todo);
            delete docProps.id;

            const itemToUpdate = await this.db.get(todo.id);
            Object.assign(updatingItem, docProps);
            
            await this.db.put(updatingItem);
            eventbus.publish('todo.updated', todo);
           
            // const data = _getStoreData();
            // const ix = data.todos.findIndex( t => t.id === todo.id);
            // data.todos[ix] = todo;
            // _setStoreData(data);
            // eventbus.publish('todo.updated', todo);
        });
    }

    get() {
        return new Promise( (resolve) => {
            this.db.allDocs({ include_docs: true })
            .then(db => {
                resolve( db.rows.map(row => {
                    
                    return Object.assign(row.doc, { id: row.doc._id});
                }));
            });
        });
        
    }
};
