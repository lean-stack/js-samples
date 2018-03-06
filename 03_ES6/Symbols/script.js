
const vorname = Symbol('vorname');
const firstname = Symbol('vorname');

const person = {
    vorname: "Klaus",
    [vorname]: 'Gerd',
    [firstname]: 'Thomas'
};

// Globale Symbols
const s1 = Symbol.for('app.backendApi');
const s2 = Symbol.for('app.backendApi');
