
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

// ES 6
const k3 = {
    nr: 1003,
    stand: 100,
    __proto__: kontoPrototyp
}
