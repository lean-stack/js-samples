
// Konstruktor
function Konto(nr) {
    if (this === window ) throw new Error("Illegal use of constructor function");
    this.nr = nr;
    this.stand = 0;
}
Konto.prototype.einzahlen = function(betrag) { this.stand += betrag; };
Konto.prototype.auszahlen = function(betrag) { 
    if(betrag > this.stand) return false;
     this.stand -= betrag; 
    return true;
    };
Object.defineProperty(Konto.prototype, "balance", {
    enumerable: true,
    configurable: false,
    get: function( ) { return this.stand; }
});

var k1 = new Konto(1001);

console.log(k1 instanceof Konto);

function GiroKonto(nr) {
    // 1. Erben der Member
    Konto.apply(this, arguments);
    // 2. Neuer Member
    this.dispo = 1000;
}

// 3. Erben der Methoden
GiroKonto.prototype = Object.create(Konto.prototype);
// 4. Überschrdeiben
GiroKonto.prototype.auszahlen = function(betrag) { 
    if(betrag > this.stand + this.dispo) return false;
     this.stand -= betrag; 
    return true;
    };
GiroKonto.prototype.constructor = GiroKonto;  // Kosmetik

var k2 = new GiroKonto(1002);

console.log(k2 instanceof Konto);
console.log(k2 instanceof GiroKonto);

k1.auszahlen(500);
k2.auszahlen(500);

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
