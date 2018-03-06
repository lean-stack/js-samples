
// Global Context
// Globale Variable wird Property des globalen Objektes (window)
var globalVar = 42;

function fn() {
    
    var localVar = 17;

    function innerFn() {

        localVar = 18;
        globalVar = 43;

        // Omitting var introduces new global var!
        neueVar = 'Global';
    }

    innerFn();
}

fn();

var console = "Browser";
