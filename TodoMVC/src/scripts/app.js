
console.log(new Date().toLocaleString(), 'App starting ...');

import eventbus from './event/pubsub.js';
import state from './state.js';

import Store from './store/local.store.js';
import Controller from './controller.js';
import View from './view.js';

const store = new Store(eventbus);
const view = new View(eventbus);

const controller = new Controller(state);

state.initialize(store.get);
