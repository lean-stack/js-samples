
var globaleVar = 17;

function fn() {
    //var globaleVar;

    helper();
    // feHelper(); // error
    console.log(globaleVar);
    console.log(scopedVal); // error

    var globaleVar = 42;
    // globaleVar = 42;

    function helper() {}
    var feHelper = function() {};

    let scopedVal = 111;
}

fn();
