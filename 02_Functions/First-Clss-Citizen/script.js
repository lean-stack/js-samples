
// Assignable to vars
const fn1 = function() {};

// Usable in function args
const fn2 = function (a, b, cb) {
    cb(a+b);
}

// Usable as return value, here a closure
const fn3 = function(startValue) {
    const nextValue = startValue +1;
    return function () {
        debugger;
        return ++startValue;
    }
}

// Not recommended closure
const elt = document.querySelector('h1');
elt.addEventListener('click', function(ev, obj) {
    debugger;
    this.innerHTML = "Clicked";
});


// Creatable at Runtime
var fn4 = new Function('a','b','debugger; return a+b;');

// Identity
const fn5 = fn1;
fn5.name = "New Name";

console.log(fn1.name);
console.log(fn5.name);
console.log(fn1 === fn5);

// Functions are objects
