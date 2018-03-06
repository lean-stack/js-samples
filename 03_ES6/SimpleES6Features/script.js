
// Template Literals
const name = "Michael";
const age = (added) => 46 + added;

const descr = `Name: ${name}, Alter: ${age(10)}`;

const json = `{ "name": "${name}" }`;

const o = {
    name: 'Klaus',
    toString: function () { return `Name: ${this.name}`}
}
console.log(JSON.parse(json));

// Rest-Operator
function sum ( initial, ...args ) {
    console.log(args);
}
sum(17,4,5);

// Spread-Operator
const values = [ 'One', 'Tow', 'Three'];
const arr = [1,2, ...values];
const chars = [..."Michael"];

function add(a,b) {
    return a+b;
}

var summanden = [17,4];
console.log(add.apply(null, summanden));
console.log(add(...summanden));

