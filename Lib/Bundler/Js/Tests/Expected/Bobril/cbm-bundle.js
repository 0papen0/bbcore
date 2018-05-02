!function(O) {
    "use strict";
    var w = Array.isArray, x = {};
    function k(e) {
        return document.createTextNode(e);
    }
    function C(e) {
        return document.createElement(e);
    }
    function l(e) {
        return null === e ? O : e;
    }
    function D(e) {
        return "number" == typeof e;
    }
    function E(e) {
        return "string" == typeof e;
    }
    function M(e) {
        return "function" == typeof e;
    }
    function a(e) {
        return "object" == typeof e;
    }
    null == Object.assign && (Object.assign = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (null == e) throw new TypeError("Target in assign cannot be undefined or null");
        for (var r = arguments.length, i = 1; i < r; i++) {
            var o = arguments[i];
            if (null != o) for (var a = Object.keys(o), l = a.length, u = 0; u < l; u++) {
                var c = a[u];
                e[c] = o[c];
            }
        }
        return e;
    });
    var T = Object.assign;
    var X = !1, P = !1, r = [], i = [], s = function(e, t, n, r) {
        n !== r && (e[Mt] = n);
    };
    function e(e) {
        var t = s;
        return s = e, t;
    }
    function Y() {
        return Object.create(null);
    }
    var c = [ "Webkit", "Moz", "ms", "O" ], t = document.createElement("div").style;
    function f(e) {
        return E(t[e]);
    }
    var d = Y(), v = {
        boxFlex: !0,
        boxFlexGroup: !0,
        columnCount: !0,
        flex: !0,
        flexGrow: !0,
        flexNegative: !0,
        flexPositive: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        strokeDashoffset: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
    };
    function h(r) {
        return function(e, t, n) {
            e[r] = t, e[n] = O;
        };
    }
    function p(r) {
        return function(e, t, n) {
            D(t) ? e[r] = t + "px" : e[r] = t, e[n] = O;
        };
    }
    function g(e, t, n) {
        D(t) && (e[n] = t + "px");
    }
    function o() {
        return document.documentMode;
    }
    function S(e) {
        for (var t = Object.keys(e), n = 0, r = t.length; n < r; n++) {
            var i = t[n], o = d[i], a = e[i];
            if (a !== O) {
                if (o === O) {
                    if (f(i)) o = !0 === v[i] ? null : g; else {
                        for (var l = i.replace(/^\w/, function(e) {
                            return e.toUpperCase();
                        }), u = 0; u < c.length; u++) if (f(c[u] + l)) {
                            o = (!0 === v[i] ? h : p)(c[u] + l);
                            break;
                        }
                        o === O && (o = !0 === v[i] ? null : g);
                    }
                    d[i] = o;
                }
                null !== o && o(e, a, i);
            }
        }
    }
    function u(e, t) {
        e[t] = "";
    }
    function m(e, t, n) {
        if (E(n)) {
            var r = n.length;
            if (11 < r && " !important" === n.substr(r - 11, 11)) return void e.setProperty(t, n.substr(0, r - 11), "important");
        }
        e[t] = n;
    }
    function N(e, t, n) {
        var r, i = e.style;
        if (a(t)) if (S(t), a(n)) {
            for (r in n) r in t || u(i, r);
            for (r in t) {
                (o = t[r]) !== O ? n[r] !== o && m(i, r, o) : u(i, r);
            }
        } else for (r in n && (i.cssText = ""), t) {
            var o;
            (o = t[r]) !== O && m(i, r, o);
        } else if (t) i.cssText = t; else if (a(n)) for (r in n) u(i, r); else n && (i.cssText = "");
    }
    function j(e, t) {
        X ? e.setAttribute("class", t) : e.className = t;
    }
    var y = /^input$|^select$|^textarea$|^button$/, b = "tabindex";
    function I(e, t, n, r, i) {
        var o, a, l, u, c, f = !1;
        if (null != n) for (o in n) {
            if (a = n[o], l = r[o], i && o === b) a = -1, f = !0; else if (o === Mt && !X) {
                M(a) && (a = (r[Ct] = a)()), u = l, c = a, r[o] = a;
                continue;
            }
            l !== a && (r[o] = a, X ? "href" === o ? t.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : t.setAttribute(o, a) : o in t && "list" !== o && "form" !== o ? t[o] = a : t.setAttribute(o, a));
        }
        if (i && !f && e.tag && y.test(e.tag) && (t.setAttribute(b, "-1"), r[b] = -1), null == n) {
            for (o in r) if (r[o] !== O) {
                if (i && o === b) continue;
                if (o === Ct) continue;
                r[o] = O, t.removeAttribute(o);
            }
        } else for (o in r) if (r[o] !== O && !(o in n)) {
            if (i && o === b) continue;
            if (o === Ct) continue;
            r[o] = O, t.removeAttribute(o);
        }
        return c !== O && s(t, e, c, u), r;
    }
    function K(e) {
        var t = e.component;
        if (t) {
            var n = t.postInitDom;
            n && (r.push(n), i.push(e));
        }
    }
    function A(e) {
        var t = e.component;
        if (t) {
            var n = t.postUpdateDom;
            n && (r.push(n), i.push(e)), (n = t.postUpdateDomEverytime) && (r.push(n), i.push(e));
        }
    }
    function F(e) {
        var t = e.component;
        if (t) {
            var n = t.postUpdateDomEverytime;
            n && (r.push(n), i.push(e));
        }
    }
    function U(e) {
        for (var t; e && (t = e.cfg) === O; ) {
            if (e.ctx) {
                t = e.ctx.cfg;
                break;
            }
            e = e.parent;
        }
        return t;
    }
    function B(e, t) {
        if (null != e) if (M(e)) e(t); else {
            var n = e[0], r = n.refs;
            null == r && (r = Y(), n.refs = r), r[e[1]] = t;
        }
    }
    var L, R = [], $ = null;
    function z(e, t, n, r) {
        var i, o, a = {
            tag: e.tag,
            key: e.key,
            ref: e.ref,
            className: e.className,
            style: e.style,
            attrs: e.attrs,
            children: e.children,
            component: e.component,
            data: e.data,
            cfg: O,
            parent: t,
            element: O,
            ctx: O,
            orig: e
        }, l = X, u = P, c = a.component;
        (B(a.ref, a), c) && (c.ctxClass ? ((o = new c.ctxClass(a.data || {}, a)).data === O && (o.data = a.data || {}), 
        o.me === O && (o.me = a)) : o = {
            data: a.data || {},
            me: a,
            cfg: O
        }, o.cfg = e.cfg === O ? U(t) : e.cfg, a.ctx = o, L = o, c.init && c.init(o, a), 
        je !== Ne && je(e, 0), c.render && c.render(o, a), L = O);
        var f = a.tag;
        if ("-" === f) return a.tag = O, a.children = O, a;
        var s = a.children, d = !1;
        if (D(s) && (s = "" + s, a.children = s), f === O) return E(s) ? (i = k(s), a.element = i, 
        n.insertBefore(i, r)) : H(a, n, r), c && (c.postRender && c.postRender(a.ctx, a), 
        K(a)), a;
        if ("/" === f) {
            var v = s;
            if ("" === v) ; else if (null == r) {
                var h = n.lastChild;
                for (n.insertAdjacentHTML("beforeend", v), a.element = [], h = h ? h.nextSibling : n.firstChild; h; ) a.element.push(h), 
                h = h.nextSibling;
            } else {
                var p = (i = r).previousSibling, g = !1, m = n;
                i.insertAdjacentHTML || (i = m.insertBefore(C("i"), i), g = !0), i.insertAdjacentHTML("beforebegin", v), 
                p = p ? p.nextSibling : m.firstChild;
                for (var y = []; p !== i; ) y.push(p), p = p.nextSibling;
                a.element = y, g && m.removeChild(i);
            }
            return c && (c.postRender && c.postRender(a.ctx, a), K(a)), a;
        }
        X || "svg" === f ? (i = document.createElementNS("http://www.w3.org/2000/svg", f), 
        X = !(d = "foreignObject" === f)) : i = C(f), n.insertBefore(i, r), a.element = i, 
        H(a, i, null), c && c.postRender && c.postRender(a.ctx, a), P && $ === a && (P = !1), 
        d && (X = !0), (a.attrs || P) && (a.attrs = I(a, i, a.attrs, {}, P)), a.style && N(i, a.style, O);
        var b = a.className;
        return b && j(i, b), X = l, P = u, K(a), a;
    }
    function V(e) {
        return !1 === e || !0 === e || null === e ? O : E(e) ? {
            children: e
        } : D(e) ? {
            children: "" + e
        } : e;
    }
    function H(e, t, n) {
        var r = e.children;
        if (r) {
            if (!w(r)) {
                if (E(r)) return void (t.textContent = r);
                r = [ r ];
            }
            for (var i = 0, o = (r = r.slice(0)).length; i < o; ) {
                var a = r[i];
                w(a) ? (r.splice.apply(r, [ i, 1 ].concat(a)), o = r.length) : null != (a = V(a)) ? (r[i] = z(a, e, t, n), 
                i++) : (r.splice(i, 1), o--);
            }
            e.children = r;
        }
    }
    function W(e) {
        B(e.ref, null);
        var t = e.children;
        if (w(t)) for (var n = 0, r = t.length; n < r; n++) W(t[n]);
        var i = e.component;
        if (i) {
            var o = e.ctx;
            L = o, je !== Ne && je(e, 3), i.destroy && i.destroy(o, e, e.element);
            var a = o.disposables;
            if (w(a)) for (var l = a.length; 0 < l--; ) {
                var u = a[l];
                M(u) ? u(o) : u.dispose();
            }
        }
    }
    function G(e) {
        var t = e.element;
        if (w(t)) {
            var n = t[0].parentNode;
            if (n) for (var r = 0; r < t.length; r++) n.removeChild(t[r]);
        } else if (null != t) {
            var i = t.parentNode;
            i && i.removeChild(t);
        } else {
            var o = e.children;
            if (w(o)) for (var a = 0, l = o.length; a < l; a++) G(o[a]);
        }
    }
    function q(e) {
        W(e), G(e);
    }
    var J = Y();
    function Z(e, t, n, r) {
        var i = e.element, o = e.children;
        if (w(i)) {
            for (var a = 0; a < i.length; a++) if (i[a] === t) return r.push(e), w(o) ? o : null;
        } else if (null == i) {
            if (w(o)) for (var l = 0; l < o.length; l++) {
                var u = Z(o[l], t, n, r);
                if (u !== O) return r.splice(n, 0, e), u;
            }
        } else if (i === t) return r.push(e), w(o) ? o : null;
        return O;
    }
    function Q(e) {
        var t = [];
        if (null == e) return t;
        var n = Object.keys(J), r = n.map(function(e) {
            return J[e].e || document.body;
        }), i = [];
        e: for (;e; ) {
            for (var o = 0; o < r.length; o++) if (e === r[o]) break e;
            i.push(e), e = e.parentNode;
        }
        if (!e || 0 === i.length) return t;
        var a = null, l = i.pop();
        for (o = 0; o < r.length; o++) if (e === r[o]) {
            var u = J[n[o]].n;
            if (u === O) continue;
            if ((s = Z(u, l, t.length, t)) !== O) {
                a = s;
                break;
            }
        }
        e: for (;i.length; ) {
            if (l = i.pop(), a && a.length) for (var c = 0, f = a.length; c < f; c++) {
                var s;
                if ((s = Z(a[c], l, t.length, t)) !== O) {
                    a = s;
                    continue e;
                }
            }
            t.push(null);
            break;
        }
        return t;
    }
    function _(e) {
        for (var t = Q(e), n = null; null === n; ) n = t.pop();
        return n;
    }
    function ee(e, t, n) {
        n && n.postRender && (L = t.ctx, n.postRender(L, e, t), L = O), t.data = e.data, 
        A(t);
    }
    function te(e, t, n) {
        if (L = O, w(e.children)) {
            var r = X, i = P;
            "svg" === e.tag ? X = !0 : X && "foreignObject" === e.tag && (X = !1), P && $ === e && (P = !1), 
            Se(e.children, e.element || t, null != e.element ? null : n), X = r, P = i;
        }
        F(e);
    }
    function ne(e, t, n, r, i, o) {
        var a = e.component, l = !1, u = t.ctx;
        if (null != a && null != u) {
            var c = !1;
            if (u[ye] === De && (i = Math.max(i, u[be]), c = !0), a.id !== t.component.id) l = !0; else {
                if (L = u, e.cfg !== O ? u.cfg = e.cfg : u.cfg = U(t.parent), a.shouldChange && !a.shouldChange(u, e, t) && !Ge && !c) return te(t, n, r), 
                t;
                u.data = e.data || {}, t.component = a, je !== Ne && je(e, o ? 2 : 1), a.render && (t.orig = e, 
                e = T({}, e), t.cfg = O, e.cfg !== O && (e.cfg = O), a.render(u, e, t), e.cfg !== O && (t.cfg === O ? t.cfg = e.cfg : T(t.cfg, e.cfg))), 
                L = O;
            }
        } else {
            if (t.orig === e) return t;
            t.orig = e;
        }
        var f = e.children, s = t.children, d = e.tag;
        if ("-" === d) return te(t, n, r), t;
        var v = X, h = P;
        if (D(f) && (f = "" + f), l || null != a && null == u || null == a && null != u && u.me.component !== x) ; else if ("/" === d) {
            if ("/" === t.tag && s === f) return ee(e, t, a), t;
        } else if (d === t.tag) {
            if (d === O) {
                if (E(f) && E(s)) {
                    if (f !== s) (g = t.element).textContent = f, t.children = f;
                } else P && $ === t && (P = !1), i <= 0 ? w(s) && Se(t.children, n, r) : t.children = fe(n, f, s, t, r, i - 1), 
                X = v, P = h;
                return ee(e, t, a), t;
            }
            var p = !1;
            "svg" === d ? X = !0 : X && "foreignObject" === d && (X = !(p = !0)), P && $ === t && (P = !1);
            var g = t.element;
            E(f) && !w(s) ? f !== s && (s = g.textContent = f) : i <= 0 ? w(s) && Se(t.children, g, r) : s = fe(g, f, s, t, null, i - 1), 
            t.children = s, p && (X = !0), ee(e, t, a), (t.attrs || e.attrs || P) && (t.attrs = I(t, g, e.attrs, t.attrs || {}, P)), 
            N(g, e.style, t.style), t.style = e.style;
            var m = e.className;
            return m !== t.className && (j(g, m || ""), t.className = m), X = v, P = h, t;
        }
        var y = t.element;
        w(y) && (y = y[0]), y = null == y ? n : y.parentNode;
        var b = z(e, t.parent, y, re(t));
        return q(t), b;
    }
    function re(e) {
        if (e === O) return null;
        var t = e.element;
        if (null != t) return w(t) ? t[0] : t;
        var n = e.children;
        if (!w(n)) return null;
        for (var r = 0; r < n.length; r++) if (t = re(n[r])) return t;
        return null;
    }
    function ie(e, t, n, r) {
        for (;++t < n; ) {
            var i = e[t];
            if (null != i) {
                var o = re(i);
                if (null != o) return o;
            }
        }
        return r;
    }
    function oe() {
        for (var e = i.length, t = 0; t < e; t++) {
            var n = i[t];
            L = n.ctx, r[t].call(n.component, L, n, n.element);
        }
        L = O, r = [], i = [];
    }
    function ae(e, t, n, r, i, o, a) {
        t[n] = ne(e, t[n], o, ie(t, n, r, i), a);
    }
    function le(e, t, n) {
        var r = e.element;
        if (null == r) {
            var i = e.children;
            if (w(i)) for (o = 0; o < i.length; o++) le(i[o], t, n);
        } else if (w(r)) for (var o = 0; o < r.length; o++) t.insertBefore(r[o], n); else t.insertBefore(r, n);
    }
    function ue(e, t, n, r, i) {
        var o = ie(e, t, n, r), a = e[t], l = re(a);
        null != l && l !== o && le(a, i, o);
    }
    function ce(e, t, n, r, i, o, a) {
        var l = ie(t, n, r, i), u = t[n], c = re(u);
        null != c && c !== l && le(u, o, l), t[n] = ne(e, u, o, l, a);
    }
    function fe(e, t, n, r, i, o) {
        null == t && (t = []), w(t) || (t = [ t ]), null == n && (n = []), w(n) || (e.firstChild && e.removeChild(e.firstChild), 
        n = []);
        var a, l = t, u = (l = l.slice(0)).length;
        for (a = 0; a < u; ) {
            var c = l[a];
            w(c) ? (l.splice.apply(l, [ a, 1 ].concat(c)), u = l.length) : null != (c = V(c)) ? (l[a] = c, 
            a++) : (l.splice(a, 1), u--);
        }
        return se(e, l, n, r, i, o);
    }
    function se(e, t, n, r, i, o) {
        for (var a = t.length, l = n.length, u = l, c = 0, f = 0; c < a && f < u; ) {
            if (t[c].key !== n[f].key) {
                for (;t[a - 1].key === n[u - 1].key && (u--, ae(t[--a], n, u, l, i, e, o), c < a && f < u); ) ;
                if (c < a && f < u) {
                    if (t[c].key === n[u - 1].key) {
                        n.splice(f, 0, n[u - 1]), n.splice(u, 1), ce(t[c], n, f, l, i, e, o), c++, f++;
                        continue;
                    }
                    if (t[a - 1].key === n[f].key) {
                        n.splice(u, 0, n[f]), n.splice(f, 1), u--, ce(t[--a], n, u, l, i, e, o);
                        continue;
                    }
                }
                break;
            }
            ae(t[c], n, f, l, i, e, o), c++, f++;
        }
        if (f === u) {
            if (c === a) return n;
            for (;c < a; ) n.splice(f, 0, z(t[c], r, e, ie(n, f - 1, l, i))), f++, u++, l++, 
            c++;
            return n;
        }
        if (c === a) {
            for (;f < u; ) q(n[--u]), n.splice(u, 1);
            return n;
        }
        for (var s, d = Y(), v = Y(), h = c, p = f, g = 0; f < u; f++) null != (s = n[f].key) ? d[s] = f : g--;
        for (var m = -g - g; c < a; c++) null != (s = t[c].key) ? v[s] = c : g++;
        m += g;
        var y, b = 0;
        for (c = h, f = p; f < u && c < a; ) if (null !== n[f]) if (null != (y = n[f].key)) {
            if (null == (s = t[c].key)) {
                for (c++; c < a && null == (s = t[c].key); ) c++;
                if (null == s) break;
            }
            var w = d[s];
            w !== O ? y in v ? f === w + b ? (ae(t[c], n, f, l, i, e, o), c++, f++) : (n.splice(f, 0, n[w + b]), 
            n[w + ++b] = null, ce(t[c], n, f, l, i, e, o), f++, u++, l++, c++) : (q(n[f]), n.splice(f, 1), 
            b--, u--, l--) : (n.splice(f, 0, z(t[c], r, e, ie(n, f - 1, l, i))), b++, c++, f++, 
            u++, l++);
        } else f++; else n.splice(f, 1), u--, l--, b--;
        for (;f < u; ) null !== n[f] ? null == n[f].key ? f++ : (q(n[f]), n.splice(f, 1), 
        u--, l--) : (n.splice(f, 1), u--, l--);
        for (;c < a; ) null != (s = t[c].key) && (n.splice(f, 0, z(t[c], r, e, ie(n, f - 1, l, i))), 
        u++, l++, b++, f++), c++;
        if (!m) return n;
        for (m = m - Math.abs(g) >> 1, c = h, f = p; c < a; ) if (f < u && null != (y = n[f].key)) f++; else if (s = t[c].key, 
        c < u && s === n[c].key) {
            if (null != s) {
                c++;
                continue;
            }
            ae(t[c], n, c, l, i, e, o), m--, f = ++c;
        } else if (null == s) f < u ? (n.splice(c, 0, n[f]), n.splice(f + 1, 1), ce(t[c], n, c, l, i, e, o), 
        m--) : (n.splice(c, 0, z(t[c], r, e, ie(n, c - 1, l, i))), u++, l++), c++, f++; else {
            if (0 === m && g < 0) {
                for (;q(n[f]), n.splice(f, 1), u--, l--, g++, null == n[f].key; ) ;
                continue;
            }
            for (;null == n[f].key; ) f++;
            n[f].key, n.splice(c, 0, n[f]), n.splice(f + 1, 1), ue(n, c, l, i, e), f = ++c;
        }
        for (;c < u; ) q(n[--u]), n.splice(u, 1);
        return n;
    }
    var n = !1, de = window.requestAnimationFrame;
    de && de(function(e) {
        e === +e && (n = !0);
    });
    var ve = Date.now || function() {
        return new Date().getTime();
    }, he = ve(), pe = 0;
    function ge(e) {
        if (n) de(e); else {
            var t = 50 / 3 + pe - ve();
            t < 0 && (t = 0), window.setTimeout(function() {
                pe = ve(), e(pe - he);
            }, t);
        }
    }
    var me, ye = "$invalidated", be = "$deepness", we = !0, xe = !1, ke = !0, Ce = 0, De = 0, Ee = 0, Me = {};
    function Te(e, t, n) {
        null == me && (me = {});
        var r = me[e] || [];
        r.push({
            priority: t,
            callback: n
        }), me[e] = r;
    }
    function Oe(e, t, n, r) {
        var i = Me[e];
        if (i) for (var o = 0; o < i.length; o++) if (i[o](t, n, r)) return !0;
        return !1;
    }
    var Xe = 0;
    function Pe(n, r) {
        if ("!" != r[0]) {
            var e = "^" == r[0], t = r;
            "@" == r[0] && (t = r.slice(1), n = document), e && (t = r.slice(1)), "on" + t in window && (n = window), 
            n.addEventListener(t, i, e);
        }
        function i(e) {
            var t = (e = e || window.event).target || e.srcElement || n;
            Xe++, Oe(r, e, t, _(t)), 0 == --Xe && Re && $e();
        }
    }
    function Ye() {
        if (me !== O) {
            for (var e = Object.keys(me), t = 0; t < e.length; t++) {
                var n = e[t], r = me[n];
                r = r.sort(function(e, t) {
                    return e.priority - t.priority;
                }), Me[n] = r.map(function(e) {
                    return e.callback;
                });
            }
            me = O;
            for (var i = document.body, o = 0; o < e.length; o++) Pe(i, e[o]);
        }
    }
    function Se(e, t, n) {
        for (var r = e.length, i = 0; i < r; i++) {
            var o = e[i], a = o.ctx;
            if (null != a && a[ye] === De) e[i] = ne(o.orig, o, t, n, a[be], !0); else if (w(o.children)) {
                var l = X, u = P;
                P && $ === o && (P = !1), "svg" === o.tag ? X = !0 : X && "foreignObject" === o.tag && (X = !1), 
                Se(o.children, o.element || t, ie(e, i, r, n)), F(o), X = l, P = u;
            }
        }
    }
    var Ne = function() {}, je = Ne, Ie = function() {}, Ke = function() {}, Ae = function() {};
    function Fe(e) {
        var t = Ie;
        return Ie = e, t;
    }
    function Ue(e) {
        var t = Ae;
        return Ae = e, t;
    }
    function Be(e, t, n) {
        for (;null != t; ) {
            if (e === t) return !0;
            var r = t.parent;
            if (null == r) for (var i = 0; i < n.length; i++) {
                var o = J[n[i]];
                if (o && o.n === t) {
                    r = o.p;
                    break;
                }
            }
            t = r;
        }
        return !1;
    }
    var Le, Re = !1;
    function $e() {
        Re = !1, He(ve() - he);
    }
    function ze(e) {
        xe = !1, He(e);
    }
    var Ve = Qr({
        render: function(e, t) {
            var n = e.data, r = n.f(n);
            r === O ? t.tag = "-" : t.children = r;
        }
    });
    function He(e) {
        Ee = ve(), Ye(), Ke(), De++, Ge = We, We = !1, Ce = e, Ie(), $ = 0 === R.length ? null : R[R.length - 1];
        var t = P = !1;
        we && (t = !(we = !1)), Le = Object.keys(J);
        for (var n = 0; n < Le.length; n++) {
            var r = J[Le[n]];
            if (r) {
                for (var i = r.n, o = null, a = n + 1; a < Le.length; a++) {
                    var l = J[Le[a]];
                    if (l !== O && null != (o = re(l.n))) break;
                }
                if ($ && (P = !Be($, r.p, Le)), r.e === O && (r.e = document.body), i) if (t || i.ctx[ye] === De) ne(Ve(r), i, r.e, o, t ? 1e6 : i.ctx[be]); else w(r.c) && Se(r.c, r.e, o); else i = z(Ve(r), O, r.e, o), 
                r.n = i;
                r.c = i.children;
            }
        }
        Le = O, oe();
        var u = J[0];
        Ae(u ? u.c : null), ve() - Ee;
    }
    var We = !1, Ge = !1;
    function qe() {
        We = !0, Ze();
    }
    function Je(e) {
        var t = Ze;
        return Ze = e, t;
    }
    var Ze = function(e, t) {
        null != e ? (t == O && (t = 1e6), e[ye] !== De + 1 ? (e[ye] = De + 1, e[be] = t) : t > e[be] && (e[be] = t)) : we = !0, 
        xe || ke || (xe = !0, ge(ze));
    }, Qe = 0;
    function _e(e, t, n) {
        var r = "" + ++Qe;
        return J[r] = {
            f: e,
            e: t,
            c: [],
            p: n,
            n: O
        }, null != Le ? Le.push(r) : it(), r;
    }
    function et(e) {
        var t = J[e];
        t && (t.n && q(t.n), delete J[e]);
    }
    function tt() {
        return J;
    }
    function nt() {
        ke = !1, Ze();
    }
    var rt = nt;
    function it() {
        ke = !0, rt(), rt = nt;
    }
    function ot(e, t) {
        et("0"), J[0] = {
            f: e,
            e: t,
            c: [],
            p: O,
            n: O
        }, it();
    }
    function at(e) {
        var t = rt;
        rt = function() {
            e(t);
        };
    }
    function lt(e, t, n) {
        for (;e; ) {
            var r = e.component;
            if (r) {
                var i = e.ctx, o = r[t];
                if (o && o.call(r, i, n)) return i;
                if ((o = r.shouldStopBubble) && o.call(r, i, t, n)) break;
            }
            e = e.parent;
        }
        return O;
    }
    function ut(e, t, n) {
        if (!e) return O;
        var r = e.component;
        if (r) {
            var i = e.ctx, o = r[t];
            if (o && o.call(r, i, n)) return i;
            if ((o = r.shouldStopBroadcast) && o.call(r, i, t, n)) return O;
        }
        var a = e.children;
        if (w(a)) for (var l = 0; l < a.length; l++) {
            var u = ut(a[l], t, n);
            if (null != u) return u;
        }
        return O;
    }
    function ct(e, t) {
        for (var n = Object.keys(J), r = 0; r < n.length; r++) {
            var i = J[n[r]].n;
            if (null != i) {
                var o = ut(i, e, t);
                if (null != o) return o;
            }
        }
        return O;
    }
    function ft(e) {
        var t = e.preventDefault;
        t ? t.call(e) : e.returnValue = !1;
    }
    function st(e, t) {
        d[e] = t;
    }
    var dt = null, vt = [ [ 414, 800, 900 ], [ 736, 1280, 1440 ] ];
    function ht() {
        return dt = null, Ze(), !1;
    }
    for (var pt = [ "resize", "orientationchange" ], gt = 0; gt < pt.length; gt++) Te(pt[gt], 10, ht);
    var mt, yt = window.document.documentElement, bt = /Android/i.test(navigator.userAgent);
    function wt() {
        if (null == dt) {
            var e = yt.clientWidth, t = yt.clientHeight, n = window.orientation, r = e <= t;
            if (null == n && (n = r ? 0 : 90), bt) {
                var i = Math.abs(n) % 180 == 90;
                null == mt ? mt = i === r : r = i === mt;
            }
            for (var o = 0; e > vt[+!r][o]; ) o++;
            dt = {
                width: e,
                height: t,
                orientation: n,
                deviceCategory: o,
                portrait: r
            };
        }
        return dt;
    }
    var xt, kt = function() {
        var r = [];
        function t() {
            var e = r;
            r = [];
            for (var t = 0, n = e.length; t < n; t++) e[t]();
        }
        var n, i = "onreadystatechange";
        if (window.MutationObserver) {
            var o = document.createElement("div");
            return new MutationObserver(t).observe(o, {
                attributes: !0
            }), function(e) {
                r.length || o.setAttribute("yes", "no"), r.push(e);
            };
        }
        if (!window.setImmediate && window.postMessage && window.addEventListener) {
            var a = "basap" + Math.random(), l = !1, e = function(e) {
                e.source === window && e.data === a && (l = !1, t());
            };
            return window.addEventListener("message", e, !1), function(e) {
                r.push(e), l || (l = !0, window.postMessage(a, "*"));
            };
        }
        if (!window.setImmediate && i in document.createElement("script")) return function(e) {
            r.push(e), n || ((n = document.createElement("script"))[i] = function() {
                n[i] = null, n.parentNode.removeChild(n), n = null, t();
            }, document.body.appendChild(n));
        };
        var u, c = window.setImmediate || setTimeout;
        return function(e) {
            r.push(e), u || (u = c(function() {
                u = O, t();
            }, 0));
        };
    }();
    window.Promise || function() {
        function n(e, t) {
            return function() {
                e.apply(t, arguments);
            };
        }
        function o(n) {
            var r = this;
            null !== this.s ? kt(function() {
                var e = r.s ? n[0] : n[1];
                if (null != e) {
                    var t;
                    try {
                        t = e(r.v);
                    } catch (e) {
                        return void n[3](e);
                    }
                    n[2](t);
                } else (r.s ? n[2] : n[3])(r.v);
            }) : this.d.push(n);
        }
        function r() {
            for (var e = 0, t = this.d.length; e < t; e++) o.call(this, this.d[e]);
            this.d = null;
        }
        function i(e) {
            this.s = !1, this.v = e, r.call(this);
        }
        function a(e, t, n) {
            var r = !1;
            try {
                e(function(e) {
                    r || (r = !0, t(e));
                }, function(e) {
                    r || (r = !0, n(e));
                });
            } catch (e) {
                if (r) return;
                r = !0, n(e);
            }
        }
        function l(e) {
            try {
                if (e === this) throw new TypeError("Promise self resolve");
                if (Object(e) === e) {
                    var t = e.then;
                    if ("function" == typeof t) return void a(n(t, e), n(l, this), n(i, this));
                }
                this.s = !0, this.v = e, r.call(this);
            } catch (e) {
                i.call(this, e);
            }
        }
        function e(e) {
            this.s = null, this.v = null, this.d = [], a(e, n(l, this), n(i, this));
        }
        e.prototype.then = function(n, r) {
            var i = this;
            return new e(function(e, t) {
                o.call(i, [ n, r, e, t ]);
            });
        }, e.prototype.catch = function(e) {
            return this.then(O, e);
        }, e.all = function() {
            var l = [].slice.call(1 === arguments.length && w(arguments[0]) ? arguments[0] : arguments);
            return new e(function(r, i) {
                if (0 !== l.length) for (var o = l.length, e = 0; e < l.length; e++) a(e, l[e]); else r(l);
                function a(t, e) {
                    try {
                        if (e && ("object" == typeof e || "function" == typeof e)) {
                            var n = e.then;
                            if ("function" == typeof n) return void n.call(e, function(e) {
                                a(t, e);
                            }, i);
                        }
                        l[t] = e, 0 == --o && r(l);
                    } catch (e) {
                        i(e);
                    }
                }
            });
        }, e.resolve = function(t) {
            return t && "object" == typeof t && t.constructor === e ? t : new e(function(e) {
                e(t);
            });
        }, e.reject = function(n) {
            return new e(function(e, t) {
                t(n);
            });
        }, e.race = function(i) {
            return new e(function(e, t) {
                for (var n = 0, r = i.length; n < r; n++) i[n].then(e, t);
            });
        }, window.Promise = e;
    }(), 9 === o() ? function() {
        function u(e, t) {
            null == e.zoom && (e.zoom = "1");
            var n = e.filter;
            e.filter = null == n ? t : n + " " + t;
        }
        var c = /^linear\-gradient\(to (.+?),(.+?),(.+?)\)/gi;
        st("background", function(e, t, n) {
            var r = c.exec(t);
            if (null != r) {
                var i, o = r[1], a = r[2], l = r[3];
                switch (o) {
                  case "top":
                    o = "0", i = a, a = l, l = i;
                    break;

                  case "bottom":
                    o = "0";
                    break;

                  case "left":
                    o = "1", i = a, a = l, l = i;
                    break;

                  case "right":
                    o = "1";
                    break;

                  default:
                    return;
                }
                e[n] = "none", u(e, "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + a + "',endColorstr='" + l + "', gradientType='" + o + "')");
            }
        });
    }() : ((xt = document.createElement("div").style).cssText = "background:-webkit-linear-gradient(top,red,red)", 
    0 < xt.background.length && function() {
        var a = /^(?:repeating\-)?(?:linear|radial)\-gradient/gi, l = {
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left"
        };
        function e(e, t, n) {
            if (a.test(t)) {
                var r = t.indexOf("(to ");
                if (0 < r) {
                    r += 4;
                    var i = t.indexOf(",", r), o = t.slice(r, i);
                    o = o.split(" ").map(function(e) {
                        return l[e] || e;
                    }).join(" "), t = t.slice(0, r - 3) + o + t.slice(i);
                }
                t = "-webkit-" + t;
            }
            e[n] = t;
        }
        st("background", e);
    }());
    var Ct = "b$value", Dt = "b$selStart", Et = "b$selEnd", Mt = "value";
    function Tt(e) {
        var t = e.type;
        return "checkbox" === t || "radio" === t;
    }
    function Ot(e, t) {
        var n = e.length;
        if (n !== t.length) return !1;
        for (var r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
        return !0;
    }
    function Xt(e, t) {
        for (var n = 0; n < e.length; n++) if (e[n] === t) return !0;
        return !1;
    }
    function Pt(e) {
        for (var t = [], n = 0; n < e.length; n++) e[n].selected && t.push(e[n].value);
        return t;
    }
    var Yt = e(function(e, t, n, r) {
        var i = e.tagName, o = "SELECT" === i, a = "INPUT" === i || "TEXTAREA" === i;
        if (a || o) {
            t.ctx === O && (t.ctx = {
                me: t
            }, t.component = x), r === O && (t.ctx[Ct] = n);
            var l = !1;
            if (o && e.multiple) {
                var u = e.options, c = Pt(u);
                if (!Ot(n, c)) if (r === O || Ot(c, r) || !Ot(n, t.ctx[Ct])) {
                    for (var f = 0; f < u.length; f++) u[f].selected = Xt(n, u[f].value);
                    Ot(c = Pt(u), n) && (l = !0);
                } else l = !0;
            } else if (a || o) if (a && Tt(e)) {
                var s = e.checked;
                n !== s && (r === O || s === r || n !== t.ctx[Ct] ? e.checked = n : l = !0);
            } else {
                var d = o && e.size < 2, v = e[Mt];
                n !== v && (r === O || v === r || n !== t.ctx[Ct] ? o ? ("" === n ? e.selectedIndex = d ? 0 : -1 : e[Mt] = n, 
                ("" !== n || d) && n !== (v = e[Mt]) && (l = !0)) : e[Mt] = n : l = !0);
            }
            l ? St(O, e, t) : t.ctx[Ct] = n;
        } else Yt(e, t, n, r);
    });
    function St(e, t, n) {
        if (t && "OPTION" === t.nodeName && (t = document.activeElement, n = _(t)), !n) return !1;
        var r = n.component, i = n.attrs && n.attrs[Ct], o = r && null != r.onChange, a = i || o, l = r && null != r.onSelectionChange;
        if (!a && !l) return !1;
        var u = n.ctx, c = "SELECT" === t.tagName && t.multiple;
        if (a && c) {
            var f = Pt(t.options);
            Ot(u[Ct], f) || (u[Ct] = f, i && i(f), o && r.onChange(u, f));
        } else if (a && Tt(t)) {
            if (e && "change" === e.type) return setTimeout(function() {
                St(O, t, n);
            }, 10), !1;
            if ("radio" === t.type) for (var s = document.getElementsByName(t.name), d = 0; d < s.length; d++) {
                var v = s[d], h = _(v);
                if (h) {
                    var p = n.attrs[Ct], g = h.component, m = g && null != g.onChange;
                    if (p || m) {
                        var y = h.ctx, b = v.checked;
                        y[Ct] !== b && (y[Ct] = b, p && p(b), m && g.onChange(y, b));
                    }
                }
            } else {
                var w = t.checked;
                u[Ct] !== w && (u[Ct] = w, i && i(w), o && r.onChange(u, w));
            }
        } else {
            if (a) {
                var x = t.value;
                u[Ct] !== x && (u[Ct] = x, i && i(x), o && r.onChange(u, x));
            }
            if (l) {
                var k = t.selectionStart, C = t.selectionEnd, D = t.selectionDirection, E = !1, M = u[Dt];
                if (null == D ? C === M && (E = !0) : "backward" === D && (E = !0), E) {
                    var T = k;
                    k = C, C = T;
                }
                Nt(n, k, C);
            }
        }
        return !1;
    }
    function Nt(e, t, n) {
        var r = e.component, i = e.ctx;
        !r || i[Dt] === t && i[Et] === n || (i[Dt] = t, i[Et] = n, r.onSelectionChange && r.onSelectionChange(i, {
            startPosition: t,
            endPosition: n
        }));
    }
    function jt(e, t, n) {
        var r = Hn();
        return r && St(e, r.element, r), !1;
    }
    for (pt = [ "input", "cut", "paste", "keydown", "keypress", "keyup", "click", "change" ], 
    gt = 0; gt < pt.length; gt++) Te(pt[gt], 10, St);
    var It = [ "!PointerDown", "!PointerMove", "!PointerUp", "!PointerCancel" ];
    for (gt = 0; gt < It.length; gt++) Te(It[gt], 2, jt);
    function Kt(e) {
        return {
            shift: e.shiftKey,
            ctrl: e.ctrlKey,
            alt: e.altKey,
            meta: e.metaKey || !1,
            which: e.which || e.keyCode
        };
    }
    function At(e, t, n) {
        return !!n && (!!lt(n, "onKeyDown", Kt(e)) && (ft(e), !0));
    }
    function Ft(e, t, n) {
        return !!n && (!!lt(n, "onKeyUp", Kt(e)) && (ft(e), !0));
    }
    function Ut(e, t, n) {
        return !!n && (0 !== e.which && (!!lt(n, "onKeyPress", {
            charCode: e.which || e.keyCode
        }) && (ft(e), !0)));
    }
    Te("keydown", 50, At), Te("keyup", 50, Ft), Te("keypress", 50, Ut);
    var Bt = 13, Lt = 750, Rt = 500, $t = 800, zt = 50, Vt = null, Ht = "onClick", Wt = "onDoubleClick";
    function Gt(e, t) {
        if (null == Vt) return !1;
        var n = Vt.me.component[e];
        if (!n) return !1;
        !0;
        var r = n(Vt, t);
        return !1, r;
    }
    function qt(e) {
        for (;e; ) {
            var t = e.style;
            if (t) {
                var n = t.pointerEvents;
                if (n !== O) return "none" === n;
            }
            e = e.parent;
        }
        return !1;
    }
    function Jt(e) {
        return qt(_(e));
    }
    function Zt(e) {
        if (e.length) {
            for (var t = e.length - 1; 0 <= t; --t) e[t].t.style.visibility = e[t].p;
            return !0;
        }
        return !1;
    }
    function Qt(e, t) {
        e.push({
            t: t,
            p: t.style.visibility
        }), t.style.visibility = "hidden";
    }
    function _t(e, t, n) {
        for (var r = [], i = t; Jt(i); ) Qt(r, i), i = document.elementFromPoint(e.x, e.y);
        if (Zt(r)) {
            try {
                i.dispatchEvent(e);
            } catch (e) {
                return !1;
            }
            return ft(e), !0;
        }
        return !1;
    }
    function en(e, t) {
        Te(e, 5, t);
    }
    var tn = [ "PointerDown", "PointerMove", "PointerUp", "PointerCancel" ];
    if (o() && o() < 11) {
        It = [ "click", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "scroll", "wheel" ];
        for (gt = 0; gt < It.length; ++gt) Te(It[gt], 1, _t);
    }
    function nn(e) {
        return "mouse" === e || 4 === e ? 0 : "pen" === e || 3 === e ? 2 : 1;
    }
    function rn(e, t, n, r) {
        for (var i = [], o = n; qt(r); ) Qt(i, o), r = _(o = document.elementFromPoint(e, t));
        return Zt(i), [ o, r ];
    }
    function on(u) {
        return function(e, t, n) {
            if (qt(n)) {
                var r = rn(e.clientX, e.clientY, t, n);
                t = r[0], n = r[1];
            }
            var i = e.button + 1, o = nn(e.pointerType), a = e.buttons;
            if (0 === i && 0 === o && a) for (i = 1; !(1 & a); ) a >>= 1, i++;
            var l = {
                id: e.pointerId,
                type: o,
                x: e.clientX,
                y: e.clientY,
                button: i,
                shift: e.shiftKey,
                ctrl: e.ctrlKey,
                alt: e.altKey,
                meta: e.metaKey || !1,
                count: e.detail
            };
            return !!Oe("!" + u, l, t, n) && (ft(e), !0);
        };
    }
    function an(l) {
        return function(e, t, n) {
            for (var r = !1, i = 0; i < e.changedTouches.length; i++) {
                var o = e.changedTouches[i];
                n = _(t = document.elementFromPoint(o.clientX, o.clientY));
                var a = {
                    id: o.identifier + 2,
                    type: 1,
                    x: o.clientX,
                    y: o.clientY,
                    button: 1,
                    shift: e.shiftKey,
                    ctrl: e.ctrlKey,
                    alt: e.altKey,
                    meta: e.metaKey || !1,
                    count: e.detail
                };
                Oe("!" + l, a, t, n) && (r = !0);
            }
            return !!r && (ft(e), !0);
        };
    }
    function ln(o) {
        return function(e, t, n) {
            if (qt(n = _(t = document.elementFromPoint(e.clientX, e.clientY)))) {
                var r = rn(e.clientX, e.clientY, t, n);
                t = r[0], n = r[1];
            }
            var i = {
                id: 1,
                type: 0,
                x: e.clientX,
                y: e.clientY,
                button: jn(e),
                shift: e.shiftKey,
                ctrl: e.ctrlKey,
                alt: e.altKey,
                meta: e.metaKey || !1,
                count: e.detail
            };
            return !!Oe("!" + o, i, t, n) && (ft(e), !0);
        };
    }
    function un() {
        en("mousedown", ln(tn[0])), en("mousemove", ln(tn[1])), en("mouseup", ln(tn[2]));
    }
    if (window.ontouchstart !== O) en("touchstart", an(tn[0])), en("touchmove", an(tn[1])), 
    en("touchend", an(tn[2])), en("touchcancel", an(tn[3])), un(); else if (window.onpointerdown !== O) for (gt = 0; gt < 4; gt++) {
        en((cn = tn[gt]).toLowerCase(), on(cn));
    } else if (window.onmspointerdown !== O) for (gt = 0; gt < 4; gt++) {
        var cn;
        en("@MS" + (cn = tn[gt]), on(cn));
    } else un();
    for (var fn = 0; fn < 4; fn++) !function(e) {
        var r = "on" + e;
        Te("!" + e, 50, function(e, t, n) {
            return Gt(r, e) || null != lt(n, r, e);
        });
    }(tn[fn]);
    var sn = Y(), dn = [], vn = -1, hn = 0, pn = 0, gn = 0, mn = !1;
    function yn(e, t, n) {
        return Math.abs(e - t) < n;
    }
    var bn = [];
    function wn(e) {
        e;
        var t = document.elementFromPoint(e.x, e.y), n = Q(t), r = 0 == n.length ? O : n[n.length - 1];
        qt(r) && (n = Q(t = rn(e.x, e.y, t, null == r ? O : r)[0]));
        lt(r, "onMouseOver", e);
        for (var i, o, a = 0; a < bn.length && a < n.length && bn[a] === n[a]; ) a++;
        var l = bn.length;
        for (0 < l && (i = bn[l - 1]) && (o = i.component) && o.onMouseOut && o.onMouseOut(i.ctx, e); a < l; ) (i = bn[--l]) && (o = i.component) && o.onMouseLeave && o.onMouseLeave(i.ctx, e);
        for (;l < n.length; ) (i = n[l]) && (o = i.component) && o.onMouseEnter && o.onMouseEnter(i.ctx, e), 
        l++;
        return bn = n, 0 < l && (i = bn[l - 1]) && (o = i.component) && o.onMouseIn && o.onMouseIn(i.ctx, e), 
        !1;
    }
    function xn() {
        return 0 === Object.keys(sn).length;
    }
    function kn(e, t, n) {
        return -1 === vn && xn() && (vn = e.id, hn = ve(), pn = e.x, gn = e.y, mn = !1, 
        wn(e)), sn[e.id] = e.type, vn !== e.id && (mn = !0), !1;
    }
    function Cn(e, t, n) {
        return 0 === e.type && 0 === e.button && null != sn[e.id] && (e.button = 1, Oe("!PointerUp", e, t, n), 
        e.button = 0), vn === e.id ? (wn(e), yn(pn, e.x, Bt) && yn(gn, e.y, Bt) || (mn = !0)) : xn() && wn(e), 
        !1;
    }
    var Dn = 0, En = 0;
    function Mn(e) {
        if (0 == En) return !1;
        var t = ve();
        return t < Dn + 1e3 && En <= e ? (Dn = t, En = e, !0) : (En = 0, !1);
    }
    function Tn(e, t, n) {
        if (delete sn[e.id], vn == e.id && (wn(e), vn = -1, 1 == e.type && !mn && ve() - hn < Lt)) {
            Oe("!PointerCancel", e, t, n), Mn(1);
            var r = Gt(Ht, e) || null != lt(n, Ht, e), i = o() ? $t : Rt;
            return dn.push([ e.x, e.y, ve() + i, r ? 1 : 0 ]), r;
        }
        return !1;
    }
    function On(e, t, n) {
        return delete sn[e.id], vn == e.id && (vn = -1), !1;
    }
    function Xn(e, t, n) {
        for (var r = ve(), i = 0; i < dn.length; i++) {
            var o = dn[i];
            if (o[2] < r) dn.splice(i, 1), i--; else if (yn(o[0], e.clientX, zt) && yn(o[1], e.clientY, zt)) return dn.splice(i, 1), 
            o[3] && ft(e), !0;
        }
        return !1;
    }
    var Pn = [ "!PointerDown", "!PointerMove", "!PointerUp", "!PointerCancel", "^click" ], Yn = [ kn, Cn, Tn, On, Xn ];
    for (gt = 0; gt < 5; gt++) Te(Pn[gt], 3, Yn[gt]);
    function Sn(r) {
        return function(e, t, n) {
            return !(vn != e.id && !xn()) && !(!Gt(r, e) && !lt(n, r, e));
        };
    }
    var Nn = [ "Down", "Move", "Up", "Up" ];
    for (gt = 0; gt < 4; gt++) Te(Pn[gt], 80, Sn("onMouse" + Nn[gt]));
    function jn(e) {
        return e.which || e.button;
    }
    function In(a, l) {
        return function(e, t, n) {
            if (1 == Xe && ("INPUT" != t.nodeName || 0 != e.clientX || 0 != e.clientY) && qt(n = _(t = document.elementFromPoint(e.clientX, e.clientY)))) {
                var r = rn(e.clientX, e.clientY, t, n);
                t = r[0], n = r[1];
            }
            var i = jn(e) || 1;
            if (!l && 1 !== i) return !1;
            var o = {
                x: e.clientX,
                y: e.clientY,
                button: i,
                shift: e.shiftKey,
                ctrl: e.ctrlKey,
                alt: e.altKey,
                meta: e.metaKey || !1,
                count: e.detail || 1
            };
            return a == Wt && (o.count = 2), !!(Mn(o.count) || Gt(a, o) || lt(n, a, o)) && (ft(e), 
            !0);
        };
    }
    function Kn(e, t) {
        var n = document.elementFromPoint(e, t), r = _(n);
        qt(r) && (r = rn(e, t, n, r)[1]);
        return r;
    }
    function An(e, t, n) {
        for (;n; ) {
            var r = n.style;
            if (r) {
                var i = r.userSelect;
                if ("none" === i) return ft(e), !0;
                if (i) break;
            }
            n = n.parent;
        }
        return !1;
    }
    en("selectstart", An), en("^click", In(Ht)), en("^dblclick", In(Wt)), en("contextmenu", In("onContextMenu", !0));
    var Fn = ("onwheel" in document.createElement("div") ? "" : "mouse") + "wheel";
    function Un(e, t, n) {
        if (qt(n)) {
            var r = rn(e.x, e.y, t, n);
            t = r[0], n = r[1];
        }
        var i = e.button + 1, o = e.buttons;
        if (0 === i && o) for (i = 1; !(1 & o); ) o >>= 1, i++;
        var a, l = 0;
        "mousewheel" == Fn ? (a = -.025 * e.wheelDelta, e.wheelDeltaX && (l = -.025 * e.wheelDeltaX)) : (l = e.deltaX, 
        a = e.deltaY);
        var u = {
            dx: l,
            dy: a,
            x: e.clientX,
            y: e.clientY,
            button: i,
            shift: e.shiftKey,
            ctrl: e.ctrlKey,
            alt: e.altKey,
            meta: e.metaKey || !1,
            count: e.detail
        };
        return !(!Gt("onMouseWheel", u) && !lt(n, "onMouseWheel", u)) && (ft(e), !0);
    }
    en(Fn, Un);
    var Bn = function(e, t) {
        var n = o() ? $t : Rt;
        dn.push([ e, t, ve() + n, 1 ]);
    }, Ln = O, Rn = O, $n = [];
    function zn(e) {
        var t = document.hasFocus() || e ? document.activeElement : O;
        if (t !== Ln) {
            for (var n = Q(Ln = t), r = 0; r < $n.length && r < n.length && $n[r] === n[r]; ) r++;
            var i, o, a = $n.length - 1;
            for (r <= a && ((i = $n[a]) && (o = i.component) && o.onBlur && o.onBlur(i.ctx), 
            a--); r <= a; ) (i = $n[a]) && (o = i.component) && o.onFocusOut && o.onFocusOut(i.ctx), 
            a--;
            for (a = r; a + 1 < n.length; ) (i = n[a]) && (o = i.component) && o.onFocusIn && o.onFocusIn(i.ctx), 
            a++;
            a < n.length && ((i = n[a]) && (o = i.component) && o.onFocus && o.onFocus(i.ctx), 
            a++), Rn = 0 == ($n = n).length ? O : l($n[$n.length - 1]);
        }
        return !1;
    }
    function Vn() {
        return setTimeout(function() {
            return zn(!1);
        }, 10), !1;
    }
    function Hn() {
        return Rn;
    }
    Te("^focus", 50, function() {
        return zn(!0);
    }), Te("^blur", 50, Vn);
    var Wn = [];
    function Gn(e, t, n) {
        for (var r = {
            node: n
        }, i = 0; i < Wn.length; i++) Wn[i](r);
        return !1;
    }
    Te("^scroll", 10, Gn);
    var qn, Jn, Zn = 0, Qn = [], _n = null, er = null, tr = {
        userSelect: ""
    };
    S(tr);
    var nr = Object.keys(tr), rr = nr[nr.length - 1], ir = function(e) {
        this.id = ++Zn, this.pointerid = e, this.enabledOperations = 7, this.operation = 0, 
        this.started = !1, this.beforeDrag = !0, this.local = !0, this.system = !1, this.ended = !1, 
        this.cursor = null, this.overNode = O, this.targetCtx = null, this.dragView = O, 
        this.startX = 0, this.startY = 0, this.distanceToStart = 10, this.x = 0, this.y = 0, 
        this.deltaX = 0, this.deltaY = 0, this.totalX = 0, this.totalY = 0, this.lastX = 0, 
        this.lastY = 0, this.shift = !1, this.ctrl = !1, this.alt = !1, this.meta = !1, 
        this.data = Y(), 0 <= e && (sr[e] = this), Qn.push(this);
    };
    function or() {
        if (null == er) {
            var e = document.body.style;
            qn = e.cursor, Jn = e[rr], e[rr] = "none", er = _e(cr);
        }
    }
    var ar = {
        render: function(e, t) {
            var n = e.data;
            t.tag = "div", t.style = {
                position: "absolute",
                left: n.x,
                top: n.y
            }, t.children = n.dragView(n);
        }
    };
    function lr() {
        var e = "no-drop";
        if (0 !== Qn.length) {
            var t = Qn[0];
            if (t.beforeDrag) return "";
            if (null != t.cursor) return t.cursor;
            if (t.system) return "";
            switch (t.operation) {
              case 3:
                e = "move";
                break;

              case 1:
                e = "alias";
                break;

              case 2:
                e = "copy";
            }
        }
        return e;
    }
    var ur = {
        render: function(e, t) {
            for (var n = [], r = 0; r < Qn.length; r++) {
                var i = Qn[r];
                i.beforeDrag || (null == i.dragView || 0 == i.x && 0 == i.y || n.push({
                    key: "" + i.id,
                    data: i,
                    component: ar
                }));
            }
            t.tag = "div", t.style = {
                position: "fixed",
                pointerEvents: "none",
                userSelect: "none",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            var o = document.body.style, a = lr();
            a && o.cursor !== a && (o.cursor = a), t.children = n;
        },
        onDrag: function(e) {
            return Ze(e), !1;
        }
    };
    function cr() {
        return {
            component: ur
        };
    }
    var fr = ir.prototype;
    fr.setOperation = function(e) {
        this.operation = e;
    }, fr.setDragNodeView = function(e) {
        this.dragView = e;
    }, fr.addData = function(e, t) {
        return this.data[e] = t, !0;
    }, fr.listData = function() {
        return Object.keys(this.data);
    }, fr.hasData = function(e) {
        return this.data[e] !== O;
    }, fr.getData = function(e) {
        return this.data[e];
    }, fr.setEnabledOps = function(e) {
        this.enabledOperations = e;
    }, fr.cancelDnd = function() {
        vr(O, this), this.destroy();
    }, fr.destroy = function() {
        this.ended = !0, this.started && ct("onDragEnd", this), delete sr[this.pointerid];
        for (var e = 0; e < Qn.length; e++) if (Qn[e] === this) {
            Qn.splice(e, 1);
            break;
        }
        if (_n === this && (_n = null), 0 === Qn.length && null != er) {
            et(er), er = null;
            var t = document.body.style;
            t.cursor = qn, t[rr] = Jn;
        }
    };
    var sr = Y();
    function dr(e, t, n) {
        var r = sr[e.id];
        if (r && r.cancelDnd(), e.button <= 1) {
            (r = new ir(e.id)).startX = e.x, r.startY = e.y, r.lastX = e.x, r.lastY = e.y, r.overNode = n, 
            hr(r, e);
            var i = lt(n, "onDragStart", r);
            if (i) {
                var o = re(i.me);
                if (null == o) return r.destroy(), !1;
                r.started = !0;
                var a = o.getBoundingClientRect;
                if (a) {
                    var l = a.call(o);
                    r.deltaX = l.left - e.x, r.deltaY = l.top - e.y;
                }
                r.distanceToStart <= 0 && (r.beforeDrag = !1, vr(n, r)), or();
            } else r.destroy();
        }
        return !1;
    }
    function vr(e, t) {
        t.overNode = e, t.targetCtx = lt(e, "onDragOver", t), null == t.targetCtx && (t.operation = 0), 
        ct("onDrag", t);
    }
    function hr(e, t) {
        e.shift = t.shift, e.ctrl = t.ctrl, e.alt = t.alt, e.meta = t.meta, e.x = t.x, e.y = t.y;
    }
    function pr(e, t, n) {
        var r = sr[e.id];
        if (!r) return !1;
        if (r.totalX += Math.abs(e.x - r.lastX), r.totalY += Math.abs(e.y - r.lastY), r.beforeDrag) {
            if (r.totalX + r.totalY <= r.distanceToStart) return r.lastX = e.x, r.lastY = e.y, 
            !1;
            r.beforeDrag = !1;
        }
        return hr(r, e), vr(n, r), r.lastX = e.x, r.lastY = e.y, !0;
    }
    function gr(e, t, n) {
        var r = sr[e.id];
        if (!r) return !1;
        if (!r.beforeDrag) {
            hr(r, e), vr(n, r);
            var i = r.targetCtx;
            return i && lt(i.me, "onDrop", r) ? r.destroy() : r.cancelDnd(), Bn(e.x, e.y), !0;
        }
        return r.destroy(), !1;
    }
    function mr(e, t, n) {
        var r = sr[e.id];
        return r && (r.system || (r.beforeDrag ? r.destroy() : r.cancelDnd())), !1;
    }
    function yr(e, t) {
        e.shift = t.shiftKey, e.ctrl = t.ctrlKey, e.alt = t.altKey, e.meta = t.metaKey, 
        e.x = t.clientX, e.y = t.clientY, e.totalX += Math.abs(e.x - e.lastX), e.totalY += Math.abs(e.y - e.lastY), 
        vr(Kn(e.x, e.y), e), e.lastX = e.x, e.lastY = e.y;
    }
    var br = [ "none", "link", "copy", "copyLink", "move", "linkMove", "copyMove", "all" ];
    function wr(e, t, n) {
        var r = _n;
        null != r && r.destroy();
        var i = Object.keys(sr);
        if (0 < i.length) (r = sr[i[0]]).system = !0, _n = r; else {
            var o = e.clientX, a = e.clientY;
            (r = new ir(-1)).system = !0, (_n = r).x = o, r.y = a, r.lastX = o, r.lastY = a, 
            r.startX = o, r.startY = a;
            var l = lt(n, "onDragStart", r);
            if (!l) return r.destroy(), !1;
            var u = re(l.me);
            if (null == u) return r.destroy(), !1;
            r.started = !0;
            var c = u.getBoundingClientRect;
            if (c) {
                var f = c.call(u);
                r.deltaX = f.left - o, r.deltaY = f.top - a;
            }
            or();
        }
        r.beforeDrag = !1;
        var s = br[r.enabledOperations], d = e.dataTransfer;
        if (d.effectAllowed = s, d.setDragImage) {
            var v = document.createElement("div");
            v.style.pointerEvents = "none", d.setDragImage(v, 0, 0);
        } else {
            var h = e.target.style, p = h.opacity, g = h.width, m = h.height, y = h.padding;
            h.opacity = "0", h.width = "0", h.height = "0", h.padding = "0", window.setTimeout(function() {
                h.opacity = p, h.width = g, h.height = m, h.padding = y;
            }, 0);
        }
        for (var b = r.data, w = Object.keys(b), x = 0; x < w.length; x++) try {
            var k = w[x], C = b[k];
            E(C) || (C = JSON.stringify(C)), e.dataTransfer.setData(k, C);
        } catch (e) {
            0;
        }
        return yr(r, e), !1;
    }
    function xr(e, t) {
        e.dataTransfer.dropEffect = [ "none", "link", "copy", "move" ][t];
    }
    function kr(e, t, n) {
        var r = _n;
        if (null == r) {
            (r = new ir(-1)).system = !0, (_n = r).x = e.clientX, r.y = e.clientY, r.startX = r.x, 
            r.startY = r.y, r.local = !1;
            var i = e.dataTransfer, o = 0, a = O;
            try {
                a = i.effectAllowed;
            } catch (e) {}
            for (;o < 7 && br[o] !== a; o++) ;
            r.enabledOperations = o;
            var l = i.types;
            if (l) for (var u = 0; u < l.length; u++) {
                var c = l[u];
                "text/plain" === c ? c = "Text" : "text/uri-list" === c && (c = "Url"), r.data[c] = null;
            } else i.getData("Text") !== O && (r.data.Text = null);
        }
        return yr(r, e), xr(e, r.operation), 0 != r.operation && (ft(e), !0);
    }
    function Cr(e, t, n) {
        var r = e.clientX, i = e.clientY, o = wt();
        return null != _n && (0 === r && 0 === i || r < 0 || i < 0 || r >= o.width || i >= o.height) && (_n.x = 0, 
        _n.y = 0, _n.operation = 0, ct("onDrag", _n)), !1;
    }
    function Dr(e, t, n) {
        return null != _n && _n.destroy(), !1;
    }
    function Er(e, t, n) {
        var r = _n;
        if (null == r) return !1;
        if (r.x = e.clientX, r.y = e.clientY, !r.local) for (var i = Object.keys(r.data), o = e.dataTransfer, a = 0; a < i.length; a++) {
            var l, u = i[a];
            l = "Files" === u ? [].slice.call(o.files, 0) : o.getData(u), r.data[u] = l;
        }
        yr(r, e);
        var c = r.targetCtx;
        return c && lt(c.me, "onDrop", r) ? (xr(e, r.operation), r.destroy(), ft(e)) : r.cancelDnd(), 
        !0;
    }
    function Mr(e, t, n) {
        return ft(e), !0;
    }
    function Tr(e, t, n) {
        return 0 !== Qn.length && (ft(e), !0);
    }
    Te("!PointerDown", 4, dr), Te("!PointerMove", 4, pr), Te("!PointerUp", 4, gr), Te("!PointerCancel", 4, mr), 
    Te("selectstart", 4, Tr), Te("dragstart", 5, wr), Te("dragover", 5, kr), Te("dragend", 5, Dr), 
    Te("drag", 5, Cr), Te("drop", 5, Er), Te("dragenter", 5, Mr), Te("dragleave", 5, Mr);
    var Or = function() {
        return Qn;
    }, Xr = -1;
    function Pr() {
        return 0 <= Xr && clearTimeout(Xr), Xr = -1, Ze(), !1;
    }
    Te("hashchange", 10, Pr);
    Y();
    var Yr = Y(), Sr = (Y(), Y(), []), Nr = Y(), jr = "", Ir = !1, Kr = null, Ar = 9 === o(), Fr = Fe(zr), Ur = /\:|\ |\>/;
    function Br(e) {
        var t = Ur.exec(e);
        if (!t) return Yr[e].name;
        var n = t.index;
        return Yr[e.substring(0, n)].name + e.substring(n);
    }
    function Lr(e, t) {
        var n = "";
        if (e) if (w(e)) for (var r = 0; r < e.length; r++) 0 < r && (n += ","), n += "." + Br(e[r]) + "." + t; else n = "." + Br(e) + "." + t; else n = "." + t;
        return n;
    }
    function Rr(e, t, n, r) {
        if (E(n)) {
            var i = Yr[n];
            if (i === O) throw Error("Unknown style " + n);
            Rr(e, t, i.style, i.pseudo);
        } else if (M(n)) n(e, t); else if (w(n)) for (var o = 0; o < n.length; o++) Rr(e, t, n[o], O); else if ("object" == typeof n) for (var a in n) if (Object.prototype.hasOwnProperty.call(n, a)) {
            var l = n[a];
            M(l) && (l = l(e, a)), e[a] = l;
        }
        if (null != r && null != t) for (var u in r) {
            var c = t[u];
            c === O && (c = Y(), t[u] = c), Rr(c, O, r[u], O);
        }
    }
    var $r = !1;
    function zr() {
        var e, t = document.body.style;
        if ($r && 150 <= Ce && (t.opacity = "1", $r = !1), Ir) {
            1 === De && "webkitAnimation" in t && ($r = !0, t.opacity = "0", setTimeout(Ze, 200));
            for (var n = 0; n < Sr.length; n++) {
                var r = Sr[n], i = Nr[r.url];
                if (null != i) {
                    var o = r.color();
                    if (o !== r.lastColor) {
                        r.lastColor = o, null == r.width && (r.width = i.width), null == r.height && (r.height = i.height);
                        var a = Zr(i, o, r.width, r.height, r.left, r.top);
                        Yr[r.styleId].style = {
                            backgroundImage: "url(" + a + ")",
                            width: r.width,
                            height: r.height,
                            backgroundPosition: 0
                        };
                    }
                }
            }
            var l = jr;
            for (var u in Yr) {
                var c = Yr[u], f = c.parent, s = c.name, d = c.pseudo, v = c.style;
                if (M(v) && 0 === v.length && (v = (e = v())[0], d = e[1]), E(v) && null == d) c.realName = v; else {
                    c.realName = s;
                    var h = Y(), p = Y();
                    Rr(O, p, O, d), Rr(h, p, v, O);
                    var g = null;
                    h.pointerEvents && ((g = Y()).pointerEvents = h.pointerEvents), Ar && h.userSelect && (null == g && (g = Y()), 
                    g.userSelect = h.userSelect, delete h.userSelect), c.inlStyle = g, S(h);
                    var m = Gr(h);
                    for (var y in 0 < m.length && (l += (null == s ? f : Lr(f, s)) + " {" + m + "}\n"), 
                    p) {
                        var b = p[y];
                        S(b), l += (null == s ? f + ":" + y : Lr(f, s + ":" + y)) + " {" + Gr(b) + "}\n";
                    }
                }
            }
            var w = document.createElement("style");
            w.type = "text/css", w.styleSheet ? w.styleSheet.cssText = l : w.appendChild(document.createTextNode(l));
            var x = document.head || document.getElementsByTagName("head")[0];
            null != Kr ? x.replaceChild(w, Kr) : x.appendChild(w), Kr = w, Ir = !1;
        }
        Fr();
    }
    var Vr = /([A-Z])/g, Hr = /^ms-/;
    function Wr(e) {
        return "cssFloat" === e ? "float" : e.replace(Vr, "-$1").toLowerCase().replace(Hr, "-ms-");
    }
    function Gr(e) {
        var t = "";
        for (var n in e) {
            var r = e[n];
            r !== O && (t += Wr(n) + ":" + ("" === r ? '""' : r) + ";");
        }
        return t = t.slice(0, -1);
    }
    function qr() {
        Ir = !0, Ze();
    }
    var Jr = /\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+|\d*\.\d+)\s*\)\s*/;
    function Zr(e, t, n, r, i, o) {
        var a = document.createElement("canvas");
        a.width = n, a.height = r;
        var l = a.getContext("2d");
        l.drawImage(e, -i, -o);
        var u, c, f, s, d = l.getImageData(0, 0, n, r), v = d.data, h = Jr.exec(t);
        if (h ? (u = parseInt(h[1], 10), c = parseInt(h[2], 10), f = parseInt(h[3], 10), 
        s = Math.round(255 * parseFloat(h[4]))) : (u = parseInt(t.substr(1, 2), 16), c = parseInt(t.substr(3, 2), 16), 
        f = parseInt(t.substr(5, 2), 16), s = parseInt(t.substr(7, 2), 16) || 255), 255 === s) for (var p = 0; p < v.length; p += 4) {
            (g = v[p]) === v[p + 1] && g === v[p + 2] && (128 === g || v[p + 3] < 255 && 112 < g) && (v[p] = u, 
            v[p + 1] = c, v[p + 2] = f);
        } else for (p = 0; p < v.length; p += 4) {
            var g = v[p], m = v[p + 3];
            g === v[p + 1] && g === v[p + 2] && (128 === g || m < 255 && 112 < g) && (255 === m ? (v[p] = u, 
            v[p + 1] = c, v[p + 2] = f, v[p + 3] = s) : (m *= 1 / 255, v[p] = Math.round(u * m), 
            v[p + 1] = Math.round(c * m), v[p + 2] = Math.round(f * m), v[p + 3] = Math.round(s * m)));
        }
        return l.putImageData(d, 0, 0), a.toDataURL();
    }
    window.bobrilBPath;
    function Qr(n) {
        return function(e, t) {
            return t !== O && (null == e && (e = {}), e.children = t), {
                data: e,
                component: n
            };
        };
    }
    window.b || (window.b = {
        deref: _,
        getRoots: tt,
        setInvalidate: Je,
        invalidateStyles: qr,
        ignoreShouldChange: qe,
        setAfterFrame: Ue,
        setBeforeFrame: Fe,
        getDnds: Or,
        setBeforeInit: at
    });
    ot(function() {
        return "hello";
    });
}();