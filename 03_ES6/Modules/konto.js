
var _blz = 12345678;

class Konto {
    constructor (nr) {
        this.nr = nr;
        this.stand = 0;
    }
    
    get blz() {
        return _blz;
    }
}
export default Konto;
export const blz = _blz;
export function add() {};


