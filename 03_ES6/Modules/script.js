
import Customer from './customer/index.js';

import Konto from './konto.js';
import { blz as Bankleitzahl, add } from './konto.js';
//import  Konto, * as lib from './konto.js';

//import { blz, add, default as K } from './konto.js';
//import Konto, { blz, add} from './konto.js';

const k1 = new Konto(1001);
//const k2 = new K(45);
//const k3 = new lib.default(1002);

console.log(k1.nr);
console.log(k1.blz);

console.log(Bankleitzahl);

//console.log(k2);
//console.log(k3);
//console.log(lib);

window.Konto = Konto;
window.k1 = k1;
