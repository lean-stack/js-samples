
// Regel für Variablen
// 1. const
// 2. let

let globalVar = 42;
let console = "Browser";

function outerGlobalFn() {
    let localVar = 17;

    if (localVar > 10) {
        let blockScope = 42;
    }

    // window.console.log(blockScope); // error
}

window.console.log(globalVar);
outerGlobalFn();

let zahl = 42;
const answer = 42;
const obj = { value: 42};
Object.freeze(obj);

// answer = 43; // error
obj.value = 43;


window.console.log(obj);


