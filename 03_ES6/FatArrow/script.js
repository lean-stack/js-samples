
function add(a,b) { return a+b; }

const add1 = function (a,b) { return a+b; };
const add2 = (a,b) => {return a+b; };  // Statement Body
const add3 = (a,b) => a+b;             // Expression Body

//var elt = ...
//elt.addEventListener('click', () => {});

const showThis = () => {
    console.log(this);
    console.log(this === window);
};

// Global Scope -> globale Object, also window
showThis();

// Object literals, Constructor, Prototype Method -> instance
var obj = { value: 17,  showThis: showThis };
obj.showThis();
