var __bbb={};!function(s) {
    "use strict";
    (function(i, c) {
        var a = __bbb, l = a[c];
        return l !== s ? l instanceof Promise ? l : Promise.resolve(l) : (l = new Promise(function(o, e) {
            var n = document.createElement("script"), r = setTimeout(t, 12e4);
            function t() {
                n.onload = n.onerror = s, clearTimeout(r), a[c] === l ? (a[c] = s, e(Error("Fail to load " + i))) : o(a[c]);
            }
            n.charset = "utf-8", n.onload = n.onerror = t, n.src = i, document.head.appendChild(n);
        }), a[c] = l);
    })("lib.js", "a").then(function(o) {
        console.log(o.hello());
    });
}();