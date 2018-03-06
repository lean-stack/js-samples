
(function (window, ns) {

    var globalVar = "No";
    function noGlobalFn() {}


    var exports = {
        version: "0.1"
    }

    
    ns.moduleA = exports;

    window.ARITHNEA = ns;
})(window, window.ARITHNEA || {})
