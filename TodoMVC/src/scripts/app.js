
console.log(new Date().toLocaleString(), 'App starting ...');

import eventbus from './event/pubsub.js';
import state from './state.js';

import LocalStore from './store/local.store.js';
import PouchStore from './store/pouch.store.js';
import Controller from './controller.js';
import View from './view.js';

//const store = new PouchStore(eventbus);
const store = new LocalStore(eventbus);

const view = new View(eventbus);

const controller = new Controller(state);

state.initialize(store.get.bind(store));


window.evbus = eventbus;