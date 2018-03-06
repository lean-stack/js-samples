
function add(a,b) { return a+b };

// Call und Apply
console.log(add.call(null, 17,4));
console.log(add.apply(null, [18,4]));

// Bind
const addTo5 = add.bind(null, 5);

console.log(addTo5(24));

// Usage:

const obj = { length: 2, "0": "One", "1": "Three" };




