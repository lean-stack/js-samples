
class Konto {

    constructor(nr) {

        this.nr = nr;
        this._stand = 0;

    }

    einzahlen(betrag) {
        this._stand += betrag;
    }

    auszahlen(betrag) {
        if(betrag > this._stand) return false;
        this._stand -= betrag; 
        return true;
    }

    get balance() {
        return this._stand;
    }

}

class GiroKonto extends Konto {

    constructor(nr) {
        super(nr);
        this.dispo = 1000;
    }

    auszahlen(betrag) {
        
        if(betrag > this.stand + this.dispo) return false;
        this.stand -= betrag; 
        return true;
    }
}

const k1 = new Konto(1001);
const k2 = new GiroKonto(1002);