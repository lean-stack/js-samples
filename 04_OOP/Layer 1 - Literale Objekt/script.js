
// Ojekte in JavaScript: Key -> Value Maps
const k1 = {
    nr: 1001,
    stand: 0
}

// Methoden sind Properties deren Value eine Function ist
k1.einzahlen = function(betrag) { this.stand += betrag; };

const k2 = {
    nr: 1001,
    stand: 0,
    einzahlen: function(betrag) { this.stand += betrag; }
}

k1.einzahlen(1000);
k1["einzahlen"](2000);

function einzahlen(betrag) { this.stand += betrag; }



