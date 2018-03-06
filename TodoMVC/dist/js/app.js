
console.log(new Date().toLocaleString(), 'App starting ...');

import eventbus from './event/pubsub.js';
import state from './state.js';

import LocalStore from './store/local.store.js';
import PouchStore from './store/pouch.store.js';
import Controller from './controller.js';
import View from './view.js';

var store = new PouchStore(eventbus);
//const store = new LocalStore(eventbus);

var view = new View(eventbus);

var controller = new Controller(state);

state.initialize(store.get.bind(store));

window.evbus = eventbus;