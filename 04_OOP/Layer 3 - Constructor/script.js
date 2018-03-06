
// Konstruktor
function Konto(nr) {
    if (this === window ) throw new Error("Illegal use of constructor function");
    this.nr = nr;
    this.stand = 0;
}
Konto.prototype.einzahlen = function(betrag) { this.stand += betrag; };

var k1 = new Konto(1001);

console.log(k1 instanceof Konto);


/*
const kontoPrototyp = {
    einzahlen: function(betrag) { this.stand += betrag; }
}

// ES 5
const k1 = Object.create(kontoPrototyp);
k1.nr = 1001;
k1.stand = 0;

function createKonto(nr) {
    const k1 = Object.create(kontoPrototyp);
    k1.nr = nr;
    k1.stand = 0;
    return k1;
}

const k2 = createKonto(1002);

k1.einzahlen(1000);
k1["einzahlen"](2000);

*/
