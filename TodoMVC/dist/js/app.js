
console.log(new Date().toLocaleString(), 'App starting ...');

import eventbus from './event/pubsub.js';
import state from './state.js';

import Store from './store/local.store.js';
import Controller from './controller.js';
import View from './view.js';

var store = new Store(eventbus);
var view = new View(eventbus);

var controller = new Controller(state);

state.initialize(store.get);