!function(n) {
    "use strict";
    function t(n, t) {
        return n + t;
    }
    function o(n, t) {
        return n - t;
    }
    var r = .5 < Math.random() ? {
        fn: t
    } : {
        fn: o
    };
    console.log(r.fn(1, 2));
}();