
// this Keyword


function showThis() {
    console.log(this);
    console.log(this === window);
}

// Global Scope -> globale Object, also window
showThis();

// Object literals, Constructor, Prototype Method -> instance
var obj = { value: 17,  showThis: showThis };
obj.showThis();

// Event-Handler -> emittende Objekt
(function() {

    const txt = 'To Insert';
    var elt = document.body;
    document.querySelector('h1').addEventListener('click', showThis);
    document.querySelector('h1').addEventListener('click', function() {

        var oldValue = this.innerHTML;
        this.innerHTML = txt;
        /*
        document.querySelector('h2').addEventListener('click', (function() {
            this.innerHTML = oldValue;

        }).bind(this));
        */
       /*
       var that = this;

       document.querySelector('h2').addEventListener('click', function() {
            that.innerHTML = oldValue;
        });
        */
       document.querySelector('h2').addEventListener('click', () => {
            this.innerHTML = oldValue + "FatArrow";
        });
    });
})();

