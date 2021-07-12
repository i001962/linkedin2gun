! function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function (t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 13)
}([function (e, t, r) {
    e.exports = r(7)
}, function (e, t) {
    function r(e, t, r, n, o, i, a) {
        try {
            var s = e[i](a),
                c = s.value
        } catch (e) {
            return void r(e)
        }
        s.done ? t(c) : Promise.resolve(c).then(n, o)
    }
    e.exports = function (e) {
        return function () {
            var t = this,
                n = arguments;
            return new Promise((function (o, i) {
                var a = e.apply(t, n);

                function s(e) {
                    r(a, o, i, s, c, "next", e)
                }

                function c(e) {
                    r(a, o, i, s, c, "throw", e)
                }
                s(void 0)
            }))
        }
    }
}, function (e, t) {
    function r(t) {
        return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = r = function (e) {
            return typeof e
        } : e.exports = r = function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r(t)
    }
    e.exports = r
}, function (e, t) {
    e.exports = function (e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }
}, function (e, t, r) {
    var n = r(8),
        o = r(9),
        i = r(10),
        a = r(11);
    e.exports = function (e) {
        return n(e) || o(e) || i(e) || a()
    }
}, function (e, t) {
    e.exports = function (e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function () {
        return {
            uid: "",
            birthday: "",
            cellPhone: "",
            pagerPhone: "",
            email: "",
            workEmail: "",
            firstName: "",
            formattedName: "",
            gender: "",
            homeAddress: {
                label: "",
                street: "",
                city: "",
                stateProvince: "",
                postalCode: "",
                countryRegion: ""
            },
            homePhone: "",
            homeFax: "",
            lastName: "",
            logo: {
                url: "",
                mediaType: "",
                base64: !1,
                attachFromUrl: function (e, t) {
                    this.url = e, this.mediaType = t, this.base64 = !1
                },
                embedFromString: function (e, t) {
                    this.mediaType = t, this.url = e, this.base64 = !0
                }
            },
            middleName: "",
            namePrefix: "",
            nameSuffix: "",
            nickname: "",
            note: "",
            organization: "",
            photo: {
                url: "",
                mediaType: "",
                base64: !1,
                attachFromUrl: function (e, t) {
                    this.url = e, this.mediaType = t, this.base64 = !1
                },
                embedFromString: function (e, t) {
                    this.mediaType = t, this.url = e, this.base64 = !0
                }
            },
            role: "",
            socialUrls: {
                facebook: "",
                linkedIn: "",
                twitter: "",
                flickr: ""
            },
            source: "",
            title: "",
            url: "",
            workUrl: "",
            workAddress: {
                label: "",
                street: "",
                city: "",
                stateProvince: "",
                postalCode: "",
                countryRegion: ""
            },
            workPhone: "",
            workFax: "",
            version: "3.0",
            getMajorVersion: function () {
                var e = this.version ? this.version.split(".")[0] : "4";
                return isNaN(e) ? 4 : parseInt(e)
            },
            getFormattedString: function () {
                return r(12).getFormattedString(this)
            }
        }
    }
}, function (e, t, r) {
    var n = function (e) {
        "use strict";
        var t = Object.prototype,
            r = t.hasOwnProperty,
            n = "function" == typeof Symbol ? Symbol : {},
            o = n.iterator || "@@iterator",
            i = n.asyncIterator || "@@asyncIterator",
            a = n.toStringTag || "@@toStringTag";

        function s(e, t, r) {
            return Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            s({}, "")
        } catch (e) {
            s = function (e, t, r) {
                return e[t] = r
            }
        }

        function c(e, t, r, n) {
            var o = t && t.prototype instanceof p ? t : p,
                i = Object.create(o.prototype),
                a = new E(n || []);
            return i._invoke = function (e, t, r) {
                var n = "suspendedStart";
                return function (o, i) {
                    if ("executing" === n) throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === o) throw i;
                        return A()
                    }
                    for (r.method = o, r.arg = i;;) {
                        var a = r.delegate;
                        if (a) {
                            var s = w(a, r);
                            if (s) {
                                if (s === u) continue;
                                return s
                            }
                        }
                        if ("next" === r.method) r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if ("suspendedStart" === n) throw n = "completed", r.arg;
                            r.dispatchException(r.arg)
                        } else "return" === r.method && r.abrupt("return", r.arg);
                        n = "executing";
                        var c = l(e, t, r);
                        if ("normal" === c.type) {
                            if (n = r.done ? "completed" : "suspendedYield", c.arg === u) continue;
                            return {
                                value: c.arg,
                                done: r.done
                            }
                        }
                        "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg)
                    }
                }
            }(e, r, a), i
        }

        function l(e, t, r) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, r)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = c;
        var u = {};

        function p() {}

        function f() {}

        function d() {}
        var h = {};
        h[o] = function () {
            return this
        };
        var y = Object.getPrototypeOf,
            m = y && y(y(P([])));
        m && m !== t && r.call(m, o) && (h = m);
        var g = d.prototype = p.prototype = Object.create(h);

        function v(e) {
            ["next", "throw", "return"].forEach((function (t) {
                s(e, t, (function (e) {
                    return this._invoke(t, e)
                }))
            }))
        }

        function b(e, t) {
            var n;
            this._invoke = function (o, i) {
                function a() {
                    return new t((function (n, a) {
                        ! function n(o, i, a, s) {
                            var c = l(e[o], e, i);
                            if ("throw" !== c.type) {
                                var u = c.arg,
                                    p = u.value;
                                return p && "object" == typeof p && r.call(p, "__await") ? t.resolve(p.__await).then((function (e) {
                                    n("next", e, a, s)
                                }), (function (e) {
                                    n("throw", e, a, s)
                                })) : t.resolve(p).then((function (e) {
                                    u.value = e, a(u)
                                }), (function (e) {
                                    return n("throw", e, a, s)
                                }))
                            }
                            s(c.arg)
                        }(o, i, n, a)
                    }))
                }
                return n = n ? n.then(a, a) : a()
            }
        }

        function w(e, t) {
            var r = e.iterator[t.method];
            if (void 0 === r) {
                if (t.delegate = null, "throw" === t.method) {
                    if (e.iterator.return && (t.method = "return", t.arg = void 0, w(e, t), "throw" === t.method)) return u;
                    t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return u
            }
            var n = l(r, e.iterator, t.arg);
            if ("throw" === n.type) return t.method = "throw", t.arg = n.arg, t.delegate = null, u;
            var o = n.arg;
            return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, u) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, u)
        }

        function x(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function k(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function E(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(x, this), this.reset(!0)
        }

        function P(e) {
            if (e) {
                var t = e[o];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var n = -1,
                        i = function t() {
                            for (; ++n < e.length;)
                                if (r.call(e, n)) return t.value = e[n], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                    return i.next = i
                }
            }
            return {
                next: A
            }
        }

        function A() {
            return {
                value: void 0,
                done: !0
            }
        }
        return f.prototype = g.constructor = d, d.constructor = f, f.displayName = s(d, a, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function (e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, s(e, a, "GeneratorFunction")), e.prototype = Object.create(g), e
        }, e.awrap = function (e) {
            return {
                __await: e
            }
        }, v(b.prototype), b.prototype[i] = function () {
            return this
        }, e.AsyncIterator = b, e.async = function (t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new b(c(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function (e) {
                return e.done ? e.value : a.next()
            }))
        }, v(g), s(g, a, "Generator"), g[o] = function () {
            return this
        }, g.toString = function () {
            return "[object Generator]"
        }, e.keys = function (e) {
            var t = [];
            for (var r in e) t.push(r);
            return t.reverse(),
                function r() {
                    for (; t.length;) {
                        var n = t.pop();
                        if (n in e) return r.value = n, r.done = !1, r
                    }
                    return r.done = !0, r
                }
        }, e.values = P, E.prototype = {
            constructor: E,
            reset: function (e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !e)
                    for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
            },
            stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;

                function n(r, n) {
                    return a.type = "throw", a.arg = e, t.next = r, n && (t.method = "next", t.arg = void 0), !!n
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        a = i.completion;
                    if ("root" === i.tryLoc) return n("end");
                    if (i.tryLoc <= this.prev) {
                        var s = r.call(i, "catchLoc"),
                            c = r.call(i, "finallyLoc");
                        if (s && c) {
                            if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                        } else if (s) {
                            if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                        } else {
                            if (!c) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n];
                    if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, u) : this.complete(a)
            },
            complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), u
            },
            finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), k(r), u
                }
            },
            catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.tryLoc === e) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            k(r)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function (e, t, r) {
                return this.delegate = {
                    iterator: P(e),
                    resultName: t,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), u
            }
        }, e
    }(e.exports);
    try {
        regeneratorRuntime = n
    } catch (e) {
        Function("r", "regeneratorRuntime = r")(n)
    }
}, function (e, t, r) {
    var n = r(5);
    e.exports = function (e) {
        if (Array.isArray(e)) return n(e)
    }
}, function (e, t) {
    e.exports = function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
    }
}, function (e, t, r) {
    var n = r(5);
    e.exports = function (e, t) {
        if (e) {
            if ("string" == typeof e) return n(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
        }
    }
}, function (e, t) {
    e.exports = function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
}, function (e, t, r) {
    "use strict";
    ! function () {
        var t = "3";

        function r(e) {
            return e ? ("string" != typeof e && (e = "" + e), e.replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;")) : ""
        }

        function n(e, n, o, i) {
            return e + (t >= 4 ? i ? ";ENCODING=b;MEDIATYPE=image/" : ";MEDIATYPE=image/" : 3 === t ? i ? ";ENCODING=b;TYPE=" : ";TYPE=" : i ? ";ENCODING=BASE64;" : ";") + o + ":" + r(n) + "\r\n"
        }

        function o(e) {
            return e.getFullYear() + ("0" + (e.getMonth() + 1)).slice(-2) + ("0" + e.getDate()).slice(-2)
        }
        e.exports = {
            getFormattedString: function (e) {
                t = e.getMajorVersion();
                var i = "";
                i += "BEGIN:VCARD\r\n", i += "VERSION:" + e.version + "\r\n";
                var a = t >= 4 ? "" : ";CHARSET=UTF-8",
                    s = e.formattedName;
                if (s || (s = "", [e.firstName, e.middleName, e.lastName].forEach((function (e) {
                        e && s && (s += " "), s += e
                    }))), i += "FN" + a + ":" + r(s) + "\r\n", i += "N" + a + ":" + r(e.lastName) + ";" + r(e.firstName) + ";" + r(e.middleName) + ";" + r(e.namePrefix) + ";" + r(e.nameSuffix) + "\r\n", e.nickname && t >= 3 && (i += "NICKNAME" + a + ":" + r(e.nickname) + "\r\n"), e.gender && (i += "GENDER:" + r(e.gender) + "\r\n"), e.uid && (i += "UID" + a + ":" + r(e.uid) + "\r\n"), e.birthday && (i += "BDAY:" + o(e.birthday) + "\r\n"), e.anniversary && (i += "ANNIVERSARY:" + o(e.anniversary) + "\r\n"), e.email && (Array.isArray(e.email) || (e.email = [e.email]), e.email.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=HOME:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=HOME,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";HOME;INTERNET:" + r(e) + "\r\n"
                    }))), e.workEmail && (Array.isArray(e.workEmail) || (e.workEmail = [e.workEmail]), e.workEmail.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=WORK:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=WORK,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";WORK;INTERNET:" + r(e) + "\r\n"
                    }))), e.otherEmail && (Array.isArray(e.otherEmail) || (e.otherEmail = [e.otherEmail]), e.otherEmail.forEach((function (e) {
                        i += t >= 4 ? "EMAIL" + a + ";type=OTHER:" + r(e) + "\r\n" : t >= 3 && t < 4 ? "EMAIL" + a + ";type=OTHER,INTERNET:" + r(e) + "\r\n" : "EMAIL" + a + ";OTHER;INTERNET:" + r(e) + "\r\n"
                    }))), e.logo.url && (i += n("LOGO", e.logo.url, e.logo.mediaType, e.logo.base64)), e.photo.url && (i += n("PHOTO", e.photo.url, e.photo.mediaType, e.photo.base64)), e.cellPhone && (Array.isArray(e.cellPhone) || (e.cellPhone = [e.cellPhone]), e.cellPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,cell":tel:' + r(e) + "\r\n" : "TEL;TYPE=CELL:" + r(e) + "\r\n"
                    }))), e.pagerPhone && (Array.isArray(e.pagerPhone) || (e.pagerPhone = [e.pagerPhone]), e.pagerPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="pager,cell":tel:' + r(e) + "\r\n" : "TEL;TYPE=PAGER:" + r(e) + "\r\n"
                    }))), e.homePhone && (Array.isArray(e.homePhone) || (e.homePhone = [e.homePhone]), e.homePhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,home":tel:' + r(e) + "\r\n" : "TEL;TYPE=HOME,VOICE:" + r(e) + "\r\n"
                    }))), e.workPhone && (Array.isArray(e.workPhone) || (e.workPhone = [e.workPhone]), e.workPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,work":tel:' + r(e) + "\r\n" : "TEL;TYPE=WORK,VOICE:" + r(e) + "\r\n"
                    }))), e.homeFax && (Array.isArray(e.homeFax) || (e.homeFax = [e.homeFax]), e.homeFax.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="fax,home":tel:' + r(e) + "\r\n" : "TEL;TYPE=HOME,FAX:" + r(e) + "\r\n"
                    }))), e.workFax && (Array.isArray(e.workFax) || (e.workFax = [e.workFax]), e.workFax.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="fax,work":tel:' + r(e) + "\r\n" : "TEL;TYPE=WORK,FAX:" + r(e) + "\r\n"
                    }))), e.otherPhone && (Array.isArray(e.otherPhone) || (e.otherPhone = [e.otherPhone]), e.otherPhone.forEach((function (e) {
                        i += t >= 4 ? 'TEL;VALUE=uri;TYPE="voice,other":tel:' + r(e) + "\r\n" : "TEL;TYPE=OTHER:" + r(e) + "\r\n"
                    }))), [{
                        details: e.homeAddress,
                        type: "HOME"
                    }, {
                        details: e.workAddress,
                        type: "WORK"
                    }].forEach((function (e) {
                        i += function (e, n) {
                            var o = "";
                            return (n.details.label || n.details.street || n.details.city || n.details.stateProvince || n.details.postalCode || n.details.countryRegion) && (t >= 4 ? o = "ADR" + e + ";TYPE=" + n.type + (n.details.label ? ';LABEL="' + r(n.details.label) + '"' : "") + ":;;" + r(n.details.street) + ";" + r(n.details.city) + ";" + r(n.details.stateProvince) + ";" + r(n.details.postalCode) + ";" + r(n.details.countryRegion) + "\r\n" : (n.details.label && (o = "LABEL" + e + ";TYPE=" + n.type + ":" + r(n.details.label) + "\r\n"), o += "ADR" + e + ";TYPE=" + n.type + ":;;" + r(n.details.street) + ";" + r(n.details.city) + ";" + r(n.details.stateProvince) + ";" + r(n.details.postalCode) + ";" + r(n.details.countryRegion) + "\r\n")), o
                        }(a, e)
                    })), e.title && (i += "TITLE" + a + ":" + r(e.title) + "\r\n"), e.role && (i += "ROLE" + a + ":" + r(e.role) + "\r\n"), e.organization && (i += "ORG" + a + ":" + r(e.organization) + "\r\n"), e.url && (i += "URL" + a + ":" + r(e.url) + "\r\n"), e.workUrl && (i += "URL;type=WORK" + a + ":" + r(e.workUrl) + "\r\n"), e.note && (i += "NOTE" + a + ":" + r(e.note) + "\r\n"), e.socialUrls)
                    for (var c in e.socialUrls) e.socialUrls.hasOwnProperty(c) && e.socialUrls[c] && (i += "X-SOCIALPROFILE;TYPE=" + c + ":" + r(e.socialUrls[c]) + "\r\n");
                return e.source && (i += "SOURCE" + a + ":" + r(e.source) + "\r\n"), i += "REV:" + (new Date).toISOString() + "\r\n", e.isOrganization && (i += "X-ABShowAs:COMPANY\r\n"), i += "END:VCARD\r\n"
            }
        }
    }()
}, function (e, t, r) {
    "use strict";
    r.r(t);
    var n = r(2),
        o = r.n(n),
        i = r(0),
        a = r.n(i),
        s = r(1),
        c = r.n(s),
        l = r(4),
        u = r.n(l),
        p = r(3),
        f = r.n(p),
        d = r(6),
        h = r.n(d),
        y = {
            basics: {
                name: "",
                label: "",
                picture: "",
                email: "",
                phone: "",
                website: "",
                summary: "",
                location: {
                    address: "",
                    postalCode: "",
                    city: "",
                    countryCode: "",
                    region: ""
                },
                profiles: []
            },
            work: [],
            volunteer: [],
            education: [],
            awards: [],
            publications: [],
            skills: [],
            languages: [],
            interests: [],
            references: []
        },
        m = {
            $schema: "https://json.schemastore.org/resume",
            basics: {
                name: "",
                label: "",
                image: "",
                email: "",
                phone: "",
                url: "",
                summary: "",
                location: {
                    address: "",
                    postalCode: "",
                    city: "",
                    countryCode: "",
                    region: ""
                },
                profiles: []
            },
            work: [],
            volunteer: [],
            education: [],
            awards: [],
            publications: [],
            skills: [],
            languages: [],
            interests: [],
            references: [],
            projects: [],
            meta: {
                version: "v0.1.3",
                canonical: "https://github.com/jsonresume/resume-schema/blob/v0.1.3/schema.json"
            }
        },
        g = {
            certificates: []
        },
        v = {
            profile: "*profile",
            certificates: "*certificationView",
            education: "*educationView",
            workPositions: "*positionView",
            workPositionGroups: "*positionGroupView",
            skills: "*skillView",
            projects: "*projectView",
            attachments: "*summaryTreasuryMedias",
            volunteerWork: "*volunteerExperienceView",
            awards: "*honorView",
            publications: "*publicationView"
        },
        b = {
            profile: {
                tocKeys: ["*profile"],
                types: ["com.linkedin.voyager.identity.profile.Profile", "com.linkedin.voyager.dash.identity.profile.Profile"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities"]
            },
            certificates: {
                tocKeys: ["*certificationView", "*profileCertifications"],
                types: ["com.linkedin.voyager.dash.identity.profile.Certification"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileCertification"]
            },
            education: {
                tocKeys: ["*educationView", "*profileEducations"],
                types: ["com.linkedin.voyager.identity.profile.Education", "com.linkedin.voyager.dash.identity.profile.Education"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileEducation"]
            },
            courses: {
                tocKeys: ["*courseView", "*profileCourses"],
                types: ["com.linkedin.voyager.identity.profile.Course", "com.linkedin.voyager.dash.identity.profile.Course"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileCourse"]
            },
            workPositions: {
                tocKeys: ["*positionView"],
                types: ["com.linkedin.voyager.identity.profile.Position", "com.linkedin.voyager.dash.identity.profile.Position"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePosition"]
            },
            workPositionGroups: {
                tocKeys: ["*positionGroupView", "*profilePositionGroups"],
                types: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroupsInjection"],
                recipes: ["com.linkedin.voyager.identity.profile.PositionGroupView", "com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup", "com.linkedin.restli.common.CollectionResponse"]
            },
            skills: {
                tocKeys: ["*skillView", "*profileSkills"],
                types: ["com.linkedin.voyager.identity.profile.Skill", "com.linkedin.voyager.dash.identity.profile.Skill"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileSkill"]
            },
            projects: {
                tocKeys: ["*projectView", "*profileProjects"],
                types: ["com.linkedin.voyager.identity.profile.Project", "com.linkedin.voyager.dash.identity.profile.Project"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileProject"]
            },
            attachments: {
                tocKeys: ["*summaryTreasuryMedias", "*profileTreasuryMediaPosition"],
                types: ["com.linkedin.voyager.identity.profile.Certification", "com.linkedin.voyager.dash.identity.profile.treasury.TreasuryMedia"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileTreasuryMedia"]
            },
            volunteerWork: {
                tocKeys: ["*volunteerExperienceView", "*profileVolunteerExperiences"],
                types: ["com.linkedin.voyager.dash.identity.profile.VolunteerExperience"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileVolunteerExperience"]
            },
            awards: {
                tocKeys: ["*honorView", "*profileHonors"],
                types: ["com.linkedin.voyager.identity.profile.Honor", "com.linkedin.voyager.dash.identity.profile.Honor"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfileHonor"]
            },
            publications: {
                tocKeys: ["*publicationView", "*profilePublications"],
                types: ["com.linkedin.voyager.identity.profile.Publication", "com.linkedin.voyager.dash.identity.profile.Publication"],
                recipes: ["com.linkedin.voyager.dash.deco.identity.profile.FullProfilePublication"]
            }
        };

    function w(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function x(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? w(Object(r), !0).forEach((function (t) {
                f()(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : w(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }
    var k = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };

    function E(e) {
        return e < 10 ? "0".concat(e) : e.toString()
    }

    function P(e) {
        return e && e.year ? "".concat(e.year, "-").concat((t = e.month, t ? E(t) : "12"), "-").concat(function (e, t) {
            return e ? E(e) : t ? k[t].toString() : "31"
        }(e.day, e.month)) : "";
        var t
    }

    function A(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "text/plain",
            n = document.createElement("a");
        n.style.display = "none", document.body.appendChild(n), n.href = window.URL.createObjectURL(new Blob([e], {
            type: r
        })), n.setAttribute("download", t), n.click(), window.URL.revokeObjectURL(n.href), document.body.removeChild(n)
    }

    function S(e) {
        var t = document.cookie.match("(^|;) ?".concat(e, "=([^;]*)(;|$)"));
        return t ? t[2] : null
    }

    function L(e) {
        return O.apply(this, arguments)
    }

    function O() {
        return (O = c()(a.a.mark((function e(t) {
            var r, n, o, i = arguments;
            return a.a.wrap((function (e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return r = i.length > 1 && void 0 !== i[1] && i[1], e.next = 3, fetch(t);
                    case 3:
                        return n = e.sent, e.next = 6, n.blob();
                    case 6:
                        return o = e.sent, e.abrupt("return", new Promise((function (e, t) {
                            var n = new FileReader;
                            n.onloadend = function () {
                                var t = /^data:([^;]+)[^,]+base64,/i,
                                    o = n.result,
                                    i = o.match(t)[1];
                                r && (o = o.replace(t, "")), e({
                                    dataStr: o,
                                    mimeStr: i
                                })
                            }, n.onerror = t, n.readAsDataURL(o)
                        })));
                    case 8:
                    case "end":
                        return e.stop()
                }
            }), e)
        })))).apply(this, arguments)
    }

    function I(e, t) {
        var r = new URL(e),
            n = {};
        return r.searchParams.forEach((function (e, t) {
            n[t] = e
        })), r.search = new URLSearchParams(x(x({}, n), t)).toString(), r.toString()
    }

    function T(e, t) {
        return null == e ? t || "" : e
    }

    function U(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            r = JSON.parse(JSON.stringify(e));
        return t.forEach((function (e) {
            return delete r[e]
        })), r
    }

    function C(e, t) {
        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        Array.isArray(e) ? e.forEach((function (e) {
            C(e, t, r)
        })) : Object.keys(e).forEach((function (n) {
            var i = e[n];
            if (i && "object" === o()(i))
                if (n.startsWith("multiLocale")) {
                    var a = i;
                    if (a.hasOwnProperty(t)) {
                        var s = n.replace(/multiLocale/i, ""),
                            c = s.charAt(0).toLocaleLowerCase() + s.substring(1);
                        e[c] = a[t]
                    }
                } else r && C(e[n], t, r)
        }))
    }

    function V(e, t) {
        if ("string" == typeof e) {
            var r = t.getElementByUrn(e);
            if (r && r.url) return r.url;
            var n = /urn.+Company:(\d+)/.exec(e);
            if (n) return "https://www.linkedin.com/company/".concat(n[1])
        }
        return ""
    }

    function N(e, t) {
        var r = t.timePeriod || t.dateRange;
        if (r) {
            var n = r.startDate || r.start,
                o = r.endDate || r.end;
            o && (e.endDate = P(o)), n && (e.startDate = P(n))
        }
    }

    function j(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), r.push.apply(r, n)
        }
        return r
    }

    function F(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? j(Object(r), !0).forEach((function (t) {
                f()(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : j(Object(r)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }
    /**
     * @preserve
     * @author Joshua Tzucker
     * @license MIT
     * WARNING: This tool is not affiliated with LinkedIn in any manner. Intended use is to export your own profile data, and you, as the user, are responsible for using it within the terms and services set out by LinkedIn. I am not resonsible for any misuse, or reprecussions of said misuse.
     */
    window.LinkedinToResumeJson = function () {
        var e = JSON.parse(JSON.stringify(y)),
            t = JSON.parse(JSON.stringify(m)),
            r = JSON.parse(JSON.stringify(g)),
            n = [],
            i = "en_US",
            s = {
                following: "/identity/profiles/{profileId}/following",
                followingCompanies: "/identity/profiles/{profileId}/following?count=10&entityType=COMPANY&q=followedEntities",
                contactInfo: "/identity/profiles/{profileId}/profileContactInfo",
                basicAboutMe: "/me",
                advancedAboutMe: "/identity/profiles/{profileId}",
                fullProfileView: "/identity/profiles/{profileId}/profileView",
                fullSkills: "/identity/profiles/{profileId}/skillCategory",
                recommendations: "/identity/profiles/{profileId}/recommendations",
                dash: {
                    profilePositionGroups: "/identity/dash/profilePositionGroups?q=viewee&profileUrn=urn:li:fsd_profile:{profileUrnId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfilePositionGroup-21",
                    fullProfile: "/identity/dash/profiles?q=memberIdentity&memberIdentity={profileId}&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-53"
                }
            },
            l = !1,
            p = "jtzLiToResumeJson";

        function f(e) {
            var t = {
                entitiesByUrn: {},
                entities: []
            };
            t.tableOfContents = e.data;
            for (var r = 0; r < e.included.length; r++) {
                var n = F({
                    key: e.included[r].entityUrn
                }, e.included[r]);
                t.entitiesByUrn[n.entityUrn] = n, t.entities.push(n)
            }
            return delete t.tableOfContents.included, t.getElementKeys = function () {
                for (var e = ["*elements", "elements"], r = 0; r < e.length; r++) {
                    var n = e[r],
                        o = t.tableOfContents[n];
                    if (Array.isArray(o)) return o
                }
                return []
            }, t.getElements = function () {
                return t.getElementKeys().map((function (e) {
                    return t.entitiesByUrn[e]
                }))
            }, t.getElementsByType = function (e) {
                var r = Array.isArray(e) ? e : [e];
                return t.entities.filter((function (e) {
                    return -1 !== r.indexOf(e.$type)
                }))
            }, t.getElementByUrn = function (e) {
                return t.entitiesByUrn[e]
            }, t.getElementsByUrns = function (e) {
                return "string" == typeof e && (e = [e]), Array.isArray(e) ? e.map((function (e) {
                    return t.entitiesByUrn[e]
                })) : []
            }, t.getValueByKey = function (e) {
                for (var r = Array.isArray(e) ? e : [e], n = 0; n < r.length; n++) {
                    var o = t.entitiesByUrn[t.tableOfContents[r[n]]];
                    if (o) return o
                }
            }, t.getValuesByKey = function (e, t) {
                var r, n = this,
                    o = [];
                if (Array.isArray(e)) return (r = []).concat.apply(r, u()(e.map((function (e) {
                    return n.getValuesByKey(e, t)
                }))));
                var i = this.tableOfContents[e];
                "function" == typeof t && (i = t(i));
                var a = [];
                if (Array.isArray(i)) a = i;
                else if (i) {
                    var s = this.entitiesByUrn[i];
                    s["*elements"] && Array.isArray(s["*elements"]) ? a = s["*elements"] : s.elements && Array.isArray(s.elements) ? a = s.elements : o.push(s)
                }
                for (var c = 0; c < a.length; c++) void 0 !== this.entitiesByUrn[a[c]] && o.push(this.entitiesByUrn[a[c]]);
                return o
            }, t
        }

        function d(e) {
            var t = "";
            if (e.included && Array.isArray(e.included))
                for (var r = 0; r < e.included.length; r++) {
                    var n = e.included[r];
                    "string" == typeof n.publicIdentifier && (t = n.publicIdentifier)
                }
            return t.toString()
        }

        function w(r) {
            if (-1 === e.skills.map((function (e) {
                    return e.name
                })).indexOf(r)) {
                var n = {
                    name: r,
                    level: "",
                    keywords: []
                };
                e.skills.push(n), t.skills.push(n)
            }
        }

        function x(r, n, o) {
            var i = o,
                a = r,
                s = {
                    institution: T(a.schoolName),
                    area: T(a.fieldOfStudy),
                    studyType: T(a.degreeName),
                    startDate: "",
                    endDate: "",
                    gpa: T(a.grade),
                    courses: []
                };
            N(s, a), Array.isArray(a.courses) ? a.courses.forEach((function (e) {
                var t = n.entitiesByUrn[e];
                t ? s.courses.push("".concat(t.number, " - ").concat(t.name)) : i.debugConsole.warn("could not find course:", e)
            })) : n.getElementsByType(b.courses.types).forEach((function (e) {
                e.occupationUnion && e.occupationUnion.profileEducation && e.occupationUnion.profileEducation === a.entityUrn && s.courses.push("".concat(e.number, " - ").concat(e.name))
            })), e.education.push(s), t.education.push(s)
        }

        function k(r, n) {
            var o = {
                company: r.companyName,
                endDate: "",
                highlights: [],
                position: r.title,
                startDate: "",
                summary: r.description,
                website: V(r.companyUrn, n)
            };
            N(o, r), r.company && r.company["*miniCompany"], e.work.push(o), t.work.push({
                name: o.company,
                position: o.position,
                startDate: o.startDate,
                endDate: o.endDate,
                highlights: o.highlights,
                summary: o.summary,
                url: o.website
            })
        }

        function E(e, t) {
            return O.apply(this, arguments)
        }

        function O() {
            return (O = c()(a.a.mark((function n(s, c) {
                var l, p, d, h, y, m, g, E, A, S, L, O, I, C, j, R, B, D, _, M, K, G, J, W = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            if (l = W.length > 2 && void 0 !== W[2] ? W[2] : "profileView", d = "dashFullProfileWithEntities" === l, h = !1, y = !1, m = {
                                    liResponse: c,
                                    profileSrc: l,
                                    pageUrl: null,
                                    parseSuccess: !1,
                                    sections: {
                                        basics: "fail",
                                        attachments: "fail",
                                        education: "fail",
                                        work: "fail",
                                        volunteer: "fail",
                                        certificates: "fail",
                                        skills: "fail",
                                        projects: "fail",
                                        awards: "fail",
                                        publications: "fail"
                                    }
                                }, (p = s).preferLocale && (m.localeStr = p.preferLocale), n.prev = 7, g = f(c), !d || c.data.hoisted) {
                                n.next = 16;
                                break
                            }
                            if ((E = g.getElementByUrn(g.tableOfContents["*elements"][0])) && E.firstName) {
                                n.next = 13;
                                break
                            }
                            throw new Error("Could not extract nested profile object from Dash endpoint");
                        case 13:
                            A = {
                                data: F(F(F({}, c.data), E), {}, {
                                    hoisted: !0
                                }),
                                included: c.included
                            }, m.liResponse = A, g = f(A);
                        case 16:
                            S = !1, L = d ? [g.getElementByUrn(g.tableOfContents["*elements"][0])] : g.getValuesByKey(v.profile), s.debugConsole.log({
                                profileObjs: L
                            }), L.forEach((function (r) {
                                if (!S) {
                                    S = !0, m.profileInfoObj = r;
                                    var n = d ? r.primaryLocale : r.defaultLocale,
                                        o = {
                                            name: "".concat(r.firstName, " ").concat(r.lastName),
                                            summary: T(r.summary),
                                            label: T(r.headline),
                                            location: {
                                                countryCode: n.country
                                            }
                                        };
                                    r.address ? o.location.address = T(r.address) : r.locationName && (o.location.address = T(r.locationName)), e.basics = F(F({}, e.basics), o), t.basics = F(F({}, t.basics), o);
                                    var a = {
                                        language: n.language,
                                        fluency: "Native Speaker"
                                    };
                                    e.languages.push(a), t.languages.push(a), m.sections.basics = "success";
                                    var s = "".concat(n.language, "_").concat(n.country);
                                    i = s, m.localeStr = s
                                }
                            })), (O = g.getValuesByKey(b.attachments.tocKeys)).forEach((function (r) {
                                var n = !1,
                                    o = r.data.url || r.data.Url;
                                if ("GitHub" === r.providerName || /github\.com/gim.test(o)) {
                                    var i = /github\.com\/([^\/\?]+)[^\/]+$/gim.exec(o);
                                    if (i && !h) {
                                        h = !0, n = !0;
                                        var a = {
                                            network: "GitHub",
                                            username: i[1],
                                            url: o
                                        };
                                        e.basics.profiles.push(a), t.basics.profiles.push(a)
                                    }
                                }
                                n || y || (n = !0, e.basics.website = o, t.basics.url = o), n || (n = !0, t.projects = t.projects || [], t.projects.push({
                                    name: r.title || r.mediaTitle,
                                    startDate: "",
                                    endDate: "",
                                    description: r.description || r.mediaDescription,
                                    url: o
                                }))
                            })), m.sections.attachments = O.length ? "success" : "empty", I = !0, (C = g.getValueByKey(b.education.tocKeys)).paging && (j = C.paging, I = j.start + j.count >= j.total), I ? (g.getValuesByKey(b.education.tocKeys).forEach((function (e) {
                                x(e, g, p)
                            })), p.debugConsole.log("All education positions captured directly from profile result."), m.sections.education = "success") : (p.debugConsole.warn("Education positions in profile are truncated."), m.sections.education = "incomplete"), R = !0, (B = g.getValueByKey([].concat(u()(b.workPositionGroups.tocKeys), u()(b.workPositions.tocKeys)))).paging && (D = B.paging, R = D.start + D.count >= D.total), R ? (p.getWorkPositions(g).forEach((function (e) {
                                k(e, g)
                            })), p.debugConsole.log("All work positions captured directly from profile result."), m.sections.work = "success") : (p.debugConsole.warn("Work positions in profile are truncated."), m.sections.work = "incomplete"), (_ = g.getValuesByKey(b.volunteerWork.tocKeys)).forEach((function (r) {
                                var n = {
                                    organization: r.companyName,
                                    position: r.role,
                                    website: V(r.companyUrn, g),
                                    startDate: "",
                                    endDate: "",
                                    summary: r.description,
                                    highlights: []
                                };
                                N(n, r), e.volunteer.push(n), t.volunteer.push(F(F({}, U(n, ["website"])), {}, {
                                    url: n.website
                                }))
                            })), m.sections.volunteer = _.length ? "success" : "empty", M = [], g.getValuesByKey(b.certificates.tocKeys).forEach((function (e) {
                                var t = {
                                    title: e.name,
                                    issuer: e.authority
                                };
                                N(t, e), "string" == typeof e.url && e.url && (t.url = e.url), M.push(t)
                            })), m.sections.certificates = M.length ? "success" : "empty", r.certificates = M, K = [], g.getValuesByKey(b.skills.tocKeys).forEach((function (e) {
                                K.push(e.name)
                            })), document.querySelectorAll('span[class*="skill-category-entity"][class*="name"]').forEach((function (e) {
                                var t = e.innerText;
                                K.includes(t) || K.push(t)
                            })), K.forEach((function (e) {
                                w(e)
                            })), m.sections.skills = K.length ? "success" : "empty", t.projects = t.projects || [], g.getValuesByKey(b.projects.tocKeys).forEach((function (e) {
                                var r = {
                                    name: e.title,
                                    startDate: "",
                                    summary: e.description,
                                    url: e.url
                                };
                                N(r, e), t.projects.push(r)
                            })), m.sections.projects = t.projects.length ? "success" : "empty", (G = g.getValuesByKey(b.awards.tocKeys)).forEach((function (r) {
                                var n = {
                                        title: r.title,
                                        date: "",
                                        awarder: r.issuer,
                                        summary: T(r.description)
                                    },
                                    i = r.issueDate || r.issuedOn;
                                i && "object" === o()(i) && (n.date = P(i)), e.awards.push(n), t.awards.push(n)
                            })), m.sections.awards = G.length ? "success" : "empty", (J = g.getValuesByKey(b.publications.tocKeys)).forEach((function (r) {
                                var n = {
                                        name: r.name,
                                        publisher: r.publisher,
                                        releaseDate: "",
                                        website: T(r.url),
                                        summary: T(r.description)
                                    },
                                    i = r.date || r.publishedOn;
                                i && "object" === o()(i) && void 0 !== i.year && (n.releaseDate = P(i)), e.publications.push(n), t.publications.push(F(F({}, U(n, ["website"])), {}, {
                                    url: n.website
                                }))
                            })), m.sections.publications = J.length ? "success" : "empty", p.debug && (console.group("parseProfileSchemaJSON complete: ".concat(document.location.pathname)), console.log({
                                db: g,
                                _outputJsonStable: e,
                                _outputJsonLatest: t,
                                resultSummary: m
                            }), console.groupEnd()), p.parseSuccess = !0, m.parseSuccess = !0, m.pageUrl = p.getUrlWithoutQuery(), n.next = 62;
                            break;
                        case 58:
                            n.prev = 58, n.t0 = n.catch(7), p.debug && (console.group("Error parsing profile schema"), console.log(n.t0), console.log("Instance"), console.log(p), console.groupEnd()), m.parseSuccess = !1;
                        case 62:
                            return n.abrupt("return", m);
                        case 63:
                        case "end":
                            return n.stop()
                    }
                }), n, null, [
                    [7, 58]
                ])
            })))).apply(this, arguments)
        }

        function j(n, o, a) {
            var c = this;
            this.profileId = this.getProfileId(), this.profileUrnId = null, this.profileParseSummary = null, this.lastScannedLocale = null, this.preferLocale = null, i = this.getViewersLocalLang(), this.scannedPageUrl = "", this.parseSuccess = !1, this.getFullSkills = "boolean" != typeof a || a, this.preferApi = "boolean" != typeof o || o, this.debug = "boolean" == typeof n && n, this.preferDash = this.debug && /forceDashEndpoint=true/i.test(document.location.href), this.debug && (console.warn("LinkedinToResumeJson - DEBUG mode is ON"), this.internals = {
                buildDbFromLiSchema: f,
                parseProfileSchemaJSON: E,
                _defaultLocale: i,
                _liSchemaKeys: v,
                _liTypeMappings: b,
                _voyagerEndpoints: s,
                output: {
                    _outputJsonStable: e,
                    _outputJsonLatest: t,
                    _outputJsonBetaPartial: r
                }
            }), this.debugConsole = {
                log: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.log.apply(null, t)
                    }
                },
                warn: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.warn.apply(null, t)
                    }
                },
                error: function () {
                    if (c.debug) {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        console.error.apply(null, t)
                    }
                }
            }
        }
        return j.prototype.parseEmbeddedLiSchema = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, s, c, l, u, p;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            t = this, r = !1, n = !1, o = document.querySelectorAll('code[id^="bpr-guid-"]'), i = 0;
                        case 5:
                            if (!(i < o.length)) {
                                e.next = 36;
                                break
                            }
                            if (s = o[i], !/educationView/.test(s.innerHTML) || !/positionView/.test(s.innerHTML)) {
                                e.next = 30;
                                break
                            }
                            if (e.prev = 8, c = JSON.parse(s.innerHTML), l = t.getProfileId(), (u = d(c)) !== l) {
                                e.next = 22;
                                break
                            }
                            return r = !0, n = !0, e.next = 17, E(t, c);
                        case 17:
                            p = e.sent, t.debugConsole.log("Parse from embedded schema, success = ".concat(p.parseSuccess)), p.parseSuccess && (this.profileParseSummary = p), e.next = 23;
                            break;
                        case 22:
                            t.debugConsole.log('Valid schema found, but schema profile id of "'.concat(u, '" does not match desired profile ID of "').concat(l, '".'));
                        case 23:
                            e.next = 30;
                            break;
                        case 25:
                            if (e.prev = 25, e.t0 = e.catch(8), !t.debug) {
                                e.next = 29;
                                break
                            }
                            throw e.t0;
                        case 29:
                            t.debugConsole.warn("Could not parse embedded schema!", e.t0);
                        case 30:
                            if (!r) {
                                e.next = 33;
                                break
                            }
                            return t.parseSuccess = !0, e.abrupt("break", 36);
                        case 33:
                            i++, e.next = 5;
                            break;
                        case 36:
                            n || t.debugConsole.warn("Failed to find any embedded schema blocks!");
                        case 37:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [8, 25]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseBasics = function () {
            this.profileId = this.getProfileId();
            var r = {
                network: "LinkedIn",
                username: this.profileId,
                url: "https://www.linkedin.com/in/".concat(this.profileId, "/")
            };
            e.basics.profiles.push(r), t.basics.profiles.push(r)
        }, j.prototype.parseViaInternalApiFullProfile = function () {
            var r = c()(a.a.mark((function r() {
                var n, o, i = arguments;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return n = !(i.length > 0 && void 0 !== i[0]) || i[0], r.prev = 1, r.next = 4, this.getParsedProfile(n);
                        case 4:
                            if ("incomplete" !== (o = r.sent).sections.work) {
                                r.next = 10;
                                break
                            }
                            return e.work = [], t.work = [], r.next = 10, this.parseViaInternalApiWork();
                        case 10:
                            if ("incomplete" !== o.sections.education) {
                                r.next = 15;
                                break
                            }
                            return e.education = [], t.education = [], r.next = 15, this.parseViaInternalApiEducation();
                        case 15:
                            return this.debugConsole.log({
                                _outputJsonStable: e,
                                _outputJsonLatest: t
                            }), r.abrupt("return", !0);
                        case 19:
                            r.prev = 19, r.t0 = r.catch(1), this.debugConsole.warn("Error parsing using internal API (Voyager) - FullProfile", r.t0);
                        case 22:
                            return r.abrupt("return", !1);
                        case 23:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [1, 19]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiFullSkills = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetch(s.fullSkills);
                        case 3:
                            if (!(t = e.sent) || "object" !== o()(t.data)) {
                                e.next = 7;
                                break
                            }
                            if (Array.isArray(t.included))
                                for (r = 0; r < t.included.length; r++) "string" == typeof (n = t.included[r]).name && w(n.name);
                            return e.abrupt("return", !0);
                        case 7:
                            e.next = 12;
                            break;
                        case 9:
                            e.prev = 9, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - FullSkills", e.t0);
                        case 12:
                            return e.abrupt("return", !1);
                        case 13:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiContactInfo = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c, l, u, p, f, d;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.contactInfo);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 15;
                                break
                            }
                            if (i = n.data, c = i.websites, l = i.twitterHandles, u = i.phoneNumbers, p = i.emailAddress, (f = {
                                    location: e.basics.location
                                }).location.address = T(n.data.address, e.basics.location.address), f.email = T(p, e.basics.email), u && u.length && (f.phone = T(u[0].number)), e.basics = F(F({}, e.basics), f), t.basics = F(F({}, t.basics), f), Array.isArray(c))
                                for (d = 0; d < c.length; d++) /portfolio/i.test(c[d].type.category) && (e.basics.website = c[d].url, t.basics.url = c[d].url);
                            return Array.isArray(l) && l.forEach((function (r) {
                                var n = r.name,
                                    o = {
                                        network: "Twitter",
                                        username: n,
                                        url: "https://twitter.com/".concat(n)
                                    };
                                e.basics.profiles.push(o), t.basics.profiles.push(o)
                            })), r.abrupt("return", !0);
                        case 15:
                            r.next = 20;
                            break;
                        case 17:
                            r.prev = 17, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Contact Info", r.t0);
                        case 20:
                            return r.abrupt("return", !1);
                        case 21:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 17]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiBasicAboutMe = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.basicAboutMe);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 7;
                                break
                            }
                            return Array.isArray(n.included) && n.included.length > 0 && (i = n.included[0], c = {
                                name: "".concat(i.firstName, " ").concat(i.LastName),
                                label: i.occupation
                            }, e.basics = F(F({}, e.basics), c), t.basics = F(F({}, t.basics), c)), r.abrupt("return", !0);
                        case 7:
                            r.next = 12;
                            break;
                        case 9:
                            r.prev = 9, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Basic About Me", r.t0);
                        case 12:
                            return r.abrupt("return", !1);
                        case 13:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiAdvancedAboutMe = function () {
            var r = c()(a.a.mark((function r() {
                var n, i, c;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch(s.advancedAboutMe);
                        case 3:
                            if (!(n = r.sent) || "object" !== o()(n.data)) {
                                r.next = 10;
                                break
                            }
                            return i = n.data, c = {
                                name: "".concat(i.firstName, " ").concat(i.lastName),
                                label: i.headline,
                                summary: i.summary
                            }, e.basics = F(F({}, e.basics), c), t.basics = F(F({}, t.basics), c), r.abrupt("return", !0);
                        case 10:
                            r.next = 15;
                            break;
                        case 12:
                            r.prev = 12, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - AdvancedAboutMe", r.t0);
                        case 15:
                            return r.abrupt("return", !1);
                        case 16:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 12]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiRecommendations = function () {
            var r = c()(a.a.mark((function r() {
                var n, o;
                return a.a.wrap((function (r) {
                    for (;;) switch (r.prev = r.next) {
                        case 0:
                            return r.prev = 0, r.next = 3, this.voyagerFetch("".concat(s.recommendations, "?q=received&recommendationStatuses=List(VISIBLE)"));
                        case 3:
                            n = r.sent, (o = f(n)).getElementKeys().forEach((function (r) {
                                var n = o.entitiesByUrn[r];
                                if (n && "recommendationText" in n) {
                                    var i = o.entitiesByUrn[n["*recommender"]],
                                        a = {
                                            name: "".concat(i.firstName, " ").concat(i.lastName),
                                            reference: n.recommendationText
                                        };
                                    e.references.push(a), t.references.push(a)
                                }
                            })), r.next = 11;
                            break;
                        case 8:
                            r.prev = 8, r.t0 = r.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Recommendations", r.t0);
                        case 11:
                            return r.abrupt("return", !1);
                        case 12:
                        case "end":
                            return r.stop()
                    }
                }), r, this, [
                    [0, 8]
                ])
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }(), j.prototype.getWorkPositions = function (e) {
            var t = e.getElements() || [],
                r = [],
                n = e.getValuesByKey("*profilePositionGroups");
            return !n.length && t.length && "com.linkedin.voyager.dash.identity.profile.PositionGroup" === t[0].$type && (n = t), n.forEach((function (t) {
                var n = t["*profilePositionInPositionGroup"];
                n && e.getElementsByUrns(n).forEach((function (t) {
                    r = r.concat(e.getElementsByUrns(t["*elements"] || []))
                }))
            })), r.length || e.getValuesByKey("*positionGroupView").forEach((function (t) {
                r = r.concat(e.getElementsByUrns(t["*positions"] || []))
            })), r.length || (r = e.getValuesByKey(b.workPositions.tocKeys)), r.length || (r = e.getElementsByType(b.workPositions.types)), r
        }, j.prototype.parseViaInternalApiWork = function () {
            var e = c()(a.a.mark((function e() {
                var t = this;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetchAutoPaginate(s.dash.profilePositionGroups);
                        case 3:
                            e.sent.forEach((function (e) {
                                var r = f(e);
                                t.getWorkPositions(r).forEach((function (e) {
                                    k(e, r)
                                }))
                            })), e.next = 10;
                            break;
                        case 7:
                            e.prev = 7, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Work", e.t0);
                        case 10:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 7]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApiEducation = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n = this;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, this.voyagerFetch(s.dash.fullProfile);
                        case 3:
                            t = e.sent, r = f(t), r.getElementsByType("com.linkedin.voyager.dash.identity.profile.Education").forEach((function (e) {
                                x(e, r, n)
                            })), e.next = 12;
                            break;
                        case 9:
                            e.prev = 9, e.t0 = e.catch(0), this.debugConsole.warn("Error parsing using internal API (Voyager) - Education", e.t0);
                        case 12:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [0, 9]
                ])
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.parseViaInternalApi = function () {
            var n = c()(a.a.mark((function n() {
                var o, i, s, c = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return o = !(c.length > 0 && void 0 !== c[0]) || c[0], n.prev = 1, i = 0, s = !1, n.next = 6, this.parseViaInternalApiFullProfile(o);
                        case 6:
                            if ((s = n.sent) && i++, n.t0 = this.getFullSkills, !n.t0) {
                                n.next = 13;
                                break
                            }
                            return n.next = 12, this.parseViaInternalApiFullSkills();
                        case 12:
                            n.t0 = n.sent;
                        case 13:
                            if (!n.t0) {
                                n.next = 15;
                                break
                            }
                            i++;
                        case 15:
                            return n.next = 17, this.parseViaInternalApiContactInfo();
                        case 17:
                            if (!n.sent) {
                                n.next = 19;
                                break
                            }
                            i++;
                        case 19:
                            return n.next = 21, this.parseViaInternalApiRecommendations();
                        case 21:
                            if (!n.sent) {
                                n.next = 23;
                                break
                            }
                            i++;
                        case 23:
                            if (s) {
                                n.next = 32;
                                break
                            }
                            return n.next = 26, this.parseViaInternalApiBasicAboutMe();
                        case 26:
                            if (!n.sent) {
                                n.next = 28;
                                break
                            }
                            i++;
                        case 28:
                            return n.next = 30, this.parseViaInternalApiAdvancedAboutMe();
                        case 30:
                            if (!n.sent) {
                                n.next = 32;
                                break
                            }
                            i++;
                        case 32:
                            this.debugConsole.log({
                                _outputJsonStable: e,
                                _outputJsonLatest: t,
                                _outputJsonBetaPartial: r
                            }), i > 0 ? this.parseSuccess = !0 : this.debugConsole.error("Using internal API (Voyager) failed completely!"), n.next = 39;
                            break;
                        case 36:
                            n.prev = 36, n.t1 = n.catch(1), this.debugConsole.warn("Error parsing using internal API (Voyager)", n.t1);
                        case 39:
                        case "end":
                            return n.stop()
                    }
                }), n, this, [
                    [1, 36]
                ])
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), j.prototype.triggerAjaxLoadByScrolling = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = o.length > 0 && void 0 !== o[0] && o[0], l = !t && l) {
                                e.next = 8;
                                break
                            }
                            return r = window.scrollY, (n = function () {
                                var e = document.body.scrollHeight;
                                window.scrollTo(0, e)
                            })(), e.next = 8, new Promise((function (e) {
                                setTimeout((function () {
                                    n(), window.scrollTo(0, r), l = !0, e()
                                }), 400)
                            }));
                        case 8:
                            return e.abrupt("return", !0);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.forceReParse = function () {
            var e = c()(a.a.mark((function e(t) {
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return l = !1, this.parseSuccess = !1, e.next = 4, this.tryParse(t);
                        case 4:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getHasChangedSinceLastParse = function (e) {
            var t = !(e || this.preferLocale) || e === this.lastScannedLocale,
                r = this.scannedPageUrl === this.getUrlWithoutQuery();
            return t && r
        }, j.prototype.getParsedProfile = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, c, l, u, p, f, d, h, y, m, g = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = !(g.length > 0 && void 0 !== g[0]) || g[0], r = g.length > 1 ? g[1] : void 0, n = r || this.preferLocale, o = !n || n === i, !this.profileParseSummary || !t) {
                                e.next = 11;
                                break
                            }
                            if (c = this.profileParseSummary, l = c.pageUrl, u = c.localeStr, p = c.parseSuccess, f = l !== this.getUrlWithoutQuery(), d = !!n && n !== u, !p || f || d) {
                                e.next = 11;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used Cache"), e.abrupt("return", this.profileParseSummary);
                        case 11:
                            if (!1 !== this.preferApi || !o) {
                                e.next = 19;
                                break
                            }
                            return e.next = 14, this.triggerAjaxLoadByScrolling(!0);
                        case 14:
                            return e.next = 16, this.parseEmbeddedLiSchema();
                        case 16:
                            if (!this.parseSuccess) {
                                e.next = 19;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used embedded schema. Success."), e.abrupt("return", this.profileParseSummary);
                        case 19:
                            if (h = "profileView", o && !0 !== this.preferDash) {
                                e.next = 27;
                                break
                            }
                            return h = "dashFullProfileWithEntities", e.next = 24, this.voyagerFetch(s.dash.fullProfile);
                        case 24:
                            y = e.sent, e.next = 30;
                            break;
                        case 27:
                            return e.next = 29, this.voyagerFetch(s.fullProfileView);
                        case 29:
                            y = e.sent;
                        case 30:
                            return e.next = 32, E(this, y, h);
                        case 32:
                            if (!(m = e.sent).parseSuccess) {
                                e.next = 37;
                                break
                            }
                            return this.debugConsole.log("getProfileResponse - Used API. Sucess", {
                                profileResponse: y,
                                endpointType: h,
                                profileParserResult: m
                            }), this.profileParseSummary = m, e.abrupt("return", this.profileParseSummary);
                        case 37:
                            throw new Error("Could not get profile response object");
                        case 38:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.tryParse = function () {
            var n = c()(a.a.mark((function n(o) {
                var i, s, l, u;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return i = this, s = o || i.preferLocale, l = !s || s === i.lastScannedLocale, u = !s || s === i.getViewersLocalLang(), i.preferLocale = s || null, n.abrupt("return", new Promise(function () {
                                var n = c()(a.a.mark((function n(o) {
                                    return a.a.wrap((function (n) {
                                        for (;;) switch (n.prev = n.next) {
                                            case 0:
                                                if (!i.parseSuccess) {
                                                    n.next = 12;
                                                    break
                                                }
                                                if (i.scannedPageUrl !== i.getUrlWithoutQuery() || !l) {
                                                    n.next = 6;
                                                    break
                                                }
                                                i.debugConsole.log("Skipped re-parse; page has not changed"), o(!0), n.next = 10;
                                                break;
                                            case 6:
                                                return i.debugConsole.warn("Re-parsing for new results; page has changed between scans"), n.next = 9, i.forceReParse(s);
                                            case 9:
                                                o(!0);
                                            case 10:
                                                n.next = 35;
                                                break;
                                            case 12:
                                                return e = JSON.parse(JSON.stringify(y)), t = JSON.parse(JSON.stringify(m)), r = JSON.parse(JSON.stringify(g)), n.next = 17, i.triggerAjaxLoadByScrolling();
                                            case 17:
                                                if (i.parseBasics(), !1 !== i.preferApi || !u) {
                                                    n.next = 26;
                                                    break
                                                }
                                                return n.next = 21, i.parseEmbeddedLiSchema();
                                            case 21:
                                                if (i.parseSuccess) {
                                                    n.next = 24;
                                                    break
                                                }
                                                return n.next = 24, i.parseViaInternalApi(!1);
                                            case 24:
                                                n.next = 31;
                                                break;
                                            case 26:
                                                return n.next = 28, i.parseViaInternalApi(!1);
                                            case 28:
                                                if (i.parseSuccess) {
                                                    n.next = 31;
                                                    break
                                                }
                                                return n.next = 31, i.parseEmbeddedLiSchema();
                                            case 31:
                                                i.scannedPageUrl = i.getUrlWithoutQuery(), i.lastScannedLocale = s, i.debugConsole.log(i), o(!0);
                                            case 35:
                                            case "end":
                                                return n.stop()
                                        }
                                    }), n)
                                })));
                                return function (e) {
                                    return n.apply(this, arguments)
                                }
                            }()));
                        case 6:
                        case "end":
                            return n.stop()
                    }
                }), n, this)
            })));
            return function (e) {
                return n.apply(this, arguments)
            }
        }(), j.prototype.parseAndGetRawJson = function () {
            var n = c()(a.a.mark((function n() {
                var o, i, s = arguments;
                return a.a.wrap((function (n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            return o = s.length > 0 && void 0 !== s[0] ? s[0] : "stable", n.next = 3, this.tryParse();
                        case 3:
                            return i = "stable" === o ? e : t, "beta" === o && (i = F(F({}, i), r)), n.abrupt("return", i);
                        case 6:
                        case "end":
                            return n.stop()
                    }
                }), n, this)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), j.prototype.parseAndDownload = function () {
            var t = c()(a.a.mark((function t() {
                var r, n, o, i, s = arguments;
                return a.a.wrap((function (t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return r = s.length > 0 && void 0 !== s[0] ? s[0] : "stable", t.next = 3, this.parseAndGetRawJson(r);
                        case 3:
                            n = t.sent, o = "".concat(e.basics.name.replace(/\s/g, "_"), ".resume.json"), i = JSON.stringify(n, null, 2), this.debugConsole.log(i), A(i, o, "application/json");
                        case 8:
                        case "end":
                            return t.stop()
                    }
                }), t, this)
            })));
            return function () {
                return t.apply(this, arguments)
            }
        }(), j.prototype.parseAndShowOutput = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return t = o.length > 0 && void 0 !== o[0] ? o[0] : "stable", e.next = 3, this.parseAndGetRawJson(t);
                        case 3:
                            r = e.sent, n = {
                                raw: r,
                                stringified: JSON.stringify(r, null, 2)
                    //        }, console.log(n), this.parseSuccess ? this.showModal(n.raw) : alert("Could not extract JSON from current page. Make sure you are on a profile page that you have access to");
                }, console.log(n); var gun = Gun('https://gun-manhattan.herokuapp.com/gun');   
                    case 7:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.closeModal = function () {
            var e = "".concat(p, "_modalWrapper"),
                t = document.getElementById(e);
            t && (t.style.display = "none")
        }, j.prototype.showModal = function (e) {
            var t = this,
                r = "".concat(p, "_modalWrapper"),
                n = document.getElementById(r);
            if (n) n.style.display = "block";
            else {
                t.injectStyles(), (n = document.createElement("div")).id = r, n.innerHTML = '<div class="'.concat(p, '_modal">\n                <div class="').concat(p, '_topBar">\n                    <div class="').concat(p, '_titleText">Profile Export:</div>\n                    <div class="').concat(p, '_closeButton">X</div>\n                </div>\n                <div class="').concat(p, '_modalBody">\n                    <textarea id="').concat(p, '_exportTextField">Export will appear here...</textarea>\n                </div>\n            </div>'), document.body.appendChild(n), n.addEventListener("click", (function (e) {
                    e.target.id === r && t.closeModal()
                })), n.querySelector(".".concat(p, "_closeButton")).addEventListener("click", (function () {
                    t.closeModal()
                }));
                var o = n.querySelector("#".concat(p, "_exportTextField"));
                o.addEventListener("click", (function () {
                    o.select()
                }))
            }
            n.querySelector("#".concat(p, "_exportTextField")).value = JSON.stringify(e, null, 2)
        }, j.prototype.injectStyles = function () {
            var e = document.createElement("style");
            e.innerText = "#".concat(p, "_modalWrapper {\n                width: 100%;\n                height: 100%;\n                position: fixed;\n                top: 0;\n                left: 0;\n                background-color: rgba(0, 0, 0, 0.8);\n                z-index: 99999999999999999999999999999999\n            }\n            .").concat(p, "_modal {\n                width: 80%;\n                margin-top: 10%;\n                margin-left: 10%;\n                background-color: white;\n                padding: 20px;\n                border-radius: 13px;\n            }\n            .").concat(p, "_topBar {\n                width: 100%;\n                position: relative;\n            }\n            .").concat(p, "_titleText {\n                text-align: center;\n                font-size: x-large;\n                width: 100%;\n                padding-top: 8px;\n            }\n            .").concat(p, "_closeButton {\n                position: absolute;\n                top: 0px;\n                right: 0px;\n                padding: 0px 8px;\n                margin: 3px;\n                border: 4px double black;\n                border-radius: 10px;\n                font-size: x-large;\n            }\n            .").concat(p, "_modalBody {\n                width: 90%;\n                margin-left: 5%;\n                margin-top: 20px;\n                padding-top: 8px;\n            }\n            #").concat(p, "_exportTextField {\n                width: 100%;\n                min-height: 300px;\n            }"), document.body.appendChild(e)
        }, j.prototype.getUrlWithoutQuery = function () {
            return document.location.origin + document.location.pathname
        }, j.prototype.getProfileId = function () {
            var e = "",
                t = /linkedin.com\/in\/([^\/?#]+)[\/?#]?.*$/im,
                r = /voyager\/api\/.*\/profiles\/([^\/]+)\/.*/im;
            return t.test(document.location.href) && (e = t.exec(document.location.href)[1]), !e && r.test(document.body.innerHTML) && (e = r.exec(document.body.innerHTML)[1]), decodeURI(e)
        }, j.prototype.getViewersLocalLang = function () {
            var e = document.querySelector('meta[name="i18nDefaultLocale"]'),
                t = document.querySelector("select#globalfooter-select_language");
            return e ? e.getAttribute("content") : t ? t.value : "en_US"
        }, j.prototype.getSupportedLocales = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, o, i;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (n.length) {
                                e.next = 8;
                                break
                            }
                            return e.next = 3, this.getParsedProfile(!0, null);
                        case 3:
                            t = e.sent, r = t.liResponse, o = f(r), (i = o.getValuesByKey(v.profile)[0]) && Array.isArray(i.supportedLocales) && (n = i.supportedLocales.map((function (e) {
                                return "".concat(e.language, "_").concat(e.country)
                            })));
                        case 8:
                            return e.abrupt("return", n);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getProfileUrnId = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, c, l, u, p = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = !(p.length > 0 && void 0 !== p[0]) || p[0], r = /urn:li:fs_profileView:(.+)$/i, !this.profileUrnId || this.scannedPageUrl !== this.getUrlWithoutQuery()) {
                                e.next = 4;
                                break
                            }
                            return e.abrupt("return", this.profileUrnId);
                        case 4:
                            if (!this.profileParseSummary || !this.profileParseSummary.parseSuccess) {
                                e.next = 8;
                                break
                            }
                            return n = f(this.profileParseSummary.liResponse), this.profileUrnId = n.tableOfContents.entityUrn.match(r)[1], e.abrupt("return", this.profileUrnId);
                        case 8:
                            if (o = s.fullProfileView, !t || o.includes("{profileUrnId}")) {
                                e.next = 16;
                                break
                            }
                            return e.next = 12, this.voyagerFetch(o);
                        case 12:
                            return i = e.sent, c = f(i), this.profileUrnId = c.tableOfContents.entityUrn.match(r)[1], e.abrupt("return", this.profileUrnId);
                        case 16:
                            if (this.debugConsole.warn("Could not scrape profileUrnId from cache, but fetch is disallowed. Might be using a stale ID!"), l = /miniprofiles\/([A-Za-z0-9-_]+)/g, !((u = document.body.innerHTML.match(l)) && u.length > 1)) {
                                e.next = 22;
                                break
                            }
                            return this.profileUrnId = l.exec(u[u.length - 1])[1], e.abrupt("return", this.profileUrnId);
                        case 22:
                            return e.abrupt("return", this.profileUrnId);
                        case 23:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.getDisplayPhoto = function () {
            var e = c()(a.a.mark((function e() {
                var t, r, n, o, i, s, c, l, u, p;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = "", !(r = document.querySelector('[class*="profile"] img[class*="profile-photo"]'))) {
                                e.next = 6;
                                break
                            }
                            t = r.src, e.next = 16;
                            break;
                        case 6:
                            return e.next = 8, this.getParsedProfile();
                        case 8:
                            n = e.sent, o = n.liResponse, i = n.profileSrc, s = n.profileInfoObj, c = f(o), "profileView" === i ? (u = c.getElementByUrn(s["*miniProfile"])) && u.picture && (l = u.picture) : l = s.profilePicture.displayImageReference.vectorImage, p = l.artifacts.sort((function (e, t) {
                                return e.width - t.width
                            }))[0], t = "".concat(l.rootUrl).concat(p.fileIdentifyingUrlPathSegment);
                        case 16:
                            return e.abrupt("return", t);
                        case 17:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.generateVCard = function () {
            var e = c()(a.a.mark((function e() {
                var t, r;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2, this.getParsedProfile();
                        case 2:
                            return t = e.sent, e.next = 5, this.voyagerFetch(s.contactInfo);
                        case 5:
                            r = e.sent, this.exportVCard(t, r);
                        case 7:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function () {
                return e.apply(this, arguments)
            }
        }(), j.prototype.exportVCard = function () {
            var e = c()(a.a.mark((function e(t, r) {
                var n, o, i, s, c, l, u, p, d, y, m;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return n = h()(), o = f(t.liResponse), i = f(r), s = i.tableOfContents, c = t.profileInfoObj, n.formattedName = "".concat(c.firstName, " ").concat(c.lastName), n.firstName = c.firstName, n.lastName = c.lastName, "postalCode" in c.geoLocation && (n.homeAddress.postalCode = c.geoLocation.postalCode), n.email = s.emailAddress, s.twitterHandles.length && (n.socialUrls.twitter = "https://twitter.com/".concat(s.twitterHandles[0].name)), s.phoneNumbers && s.phoneNumbers.forEach((function (e) {
                                "MOBILE" === e.type ? n.cellPhone = e.number : "WORK" === e.type ? n.workPhone = e.number : n.homePhone = e.number
                            })), c.birthDate && "day" in c.birthDate && "month" in c.birthDate && ((l = c.birthDate).year ? n.birthday = new Date("".concat(P(l), " 00:00")) : console.warn('Warning: User has a "partial" birthdate (year is omitted). This is not supported in vCard version 3 or under.')), (u = this.getWorkPositions(o)).length && (n.organization = u[0].companyName, n.title = u[0].title), n.workUrl = this.getUrlWithoutQuery(), n.note = c.headline, e.prev = 17, e.next = 20, this.getDisplayPhoto();
                        case 20:
                            p = e.sent, e.next = 26;
                            break;
                        case 23:
                            e.prev = 23, e.t0 = e.catch(17), this.debugConsole.warn("Could not extract profile picture.", e.t0);
                        case 26:
                            if (!p) {
                                e.next = 37;
                                break
                            }
                            return e.prev = 27, e.next = 30, L(p, !0);
                        case 30:
                            d = e.sent, n.photo.embedFromString(d.dataStr, d.mimeStr), e.next = 37;
                            break;
                        case 34:
                            e.prev = 34, e.t1 = e.catch(27), this.debugConsole.error("Failed to convert LI image to base64", e.t1);
                        case 37:
                            return y = "".concat(c.firstName, "_").concat(c.lastName, ".vcf"), m = n.getFormattedString(), this.debugConsole.log("vCard generated", m), A(m, y, "text/vcard"), e.abrupt("return", n);
                        case 42:
                        case "end":
                            return e.stop()
                    }
                }), e, this, [
                    [17, 23],
                    [27, 34]
                ])
            })));
            return function (t, r) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.voyagerFetchAutoPaginate = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n, i, s, l, u, p, f, d, h, y, m, g, v, b = this,
                    w = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return r = w.length > 1 && void 0 !== w[1] ? w[1] : {}, n = w.length > 2 && void 0 !== w[2] ? w[2] : 0, i = w.length > 3 && void 0 !== w[3] ? w[3] : 20, s = w.length > 4 && void 0 !== w[4] ? w[4] : 100, l = w.length > 5 && void 0 !== w[5] ? w[5] : 100, u = [], e.next = 8, this.formatVoyagerUrl(t);
                        case 8:
                            return p = e.sent, f = !1, d = n, h = 0, g = function (e) {
                                e && "object" === o()(e) && "total" in e ? (d = e.start + e.count, f = d >= e.total) : f = !0
                            }, v = function () {
                                var e = c()(a.a.mark((function e(t) {
                                    var n;
                                    return a.a.wrap((function (e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                if (h++, u.push(t), g(t.data.paging), f || !(h < s)) {
                                                    e.next = 20;
                                                    break
                                                }
                                                return e.next = 6, new Promise((function (e) {
                                                    setTimeout((function () {
                                                        e()
                                                    }), l)
                                                }));
                                            case 6:
                                                return p = I(p, {
                                                    start: d,
                                                    count: i
                                                }), e.prev = 7, e.next = 10, b.voyagerFetch(p, r);
                                            case 10:
                                                n = e.sent, v(n), e.next = 18;
                                                break;
                                            case 14:
                                                e.prev = 14, e.t0 = e.catch(7), f = !0, b.debugConsole.warn("Bailing out of auto-fetch, request failed.", e.t0);
                                            case 18:
                                                e.next = 21;
                                                break;
                                            case 20:
                                                f = !0;
                                            case 21:
                                                f && (u.length ? y(u) : m(new Error("Failed to make any requests")));
                                            case 22:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e, null, [
                                        [7, 14]
                                    ])
                                })));
                                return function (t) {
                                    return e.apply(this, arguments)
                                }
                            }(), this.voyagerFetch(I(p, {
                                start: d,
                                count: i
                            })).then(v), e.abrupt("return", new Promise((function (e, t) {
                                y = e, m = t
                            })));
                        case 16:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.formatVoyagerUrl = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if ((r = t).includes("{profileId}") && (r = t.replace(/{profileId}/g, this.getProfileId())), !r.includes("{profileUrnId}")) {
                                e.next = 7;
                                break
                            }
                            return e.next = 5, this.getProfileUrnId();
                        case 5:
                            n = e.sent, r = r.replace(/{profileUrnId}/g, n);
                        case 7:
                            return r.startsWith("https") || (r = "https://www.linkedin.com/voyager/api" + r), e.abrupt("return", r);
                        case 9:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j.prototype.voyagerFetch = function () {
            var e = c()(a.a.mark((function e(t) {
                var r, n, o, s, c = this,
                    l = arguments;
                return a.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return r = l.length > 1 && void 0 !== l[1] ? l[1] : {}, n = this, e.next = 4, n.formatVoyagerUrl(t);
                        case 4:
                            return o = e.sent, s = {}, n.preferLocale && (s = {
                                "x-li-lang": n.preferLocale
                            }), e.abrupt("return", new Promise((function (e, t) {
                                var a = S("JSESSIONID").replace(/"/g, "");
                                if (a) {
                                    var l = {
                                        credentials: "include",
                                        headers: F(F(F({}, s), r), {}, {
                                            accept: "application/vnd.linkedin.normalized+json+2.1",
                                            "csrf-token": a,
                                            "sec-fetch-mode": "cors",
                                            "sec-fetch-site": "same-origin"
                                        }),
                                        referrer: document.location.href,
                                        body: null,
                                        method: "GET",
                                        mode: "cors"
                                    };
                                    fetch(o, l).then((function (r) {
                                        if (200 !== r.status) {
                                            var o = "Error fetching internal API endpoint";
                                            t(new Error(o)), console.warn(o, r)
                                        } else r.text().then((function (o) {
                                            try {
                                                var a = JSON.parse(o);
                                                n.preferLocale && n.preferLocale !== i && (n.debugConsole.log("Checking for locale mapping and remapping if found."), C(a.included, c.preferLocale, !0)), e(a)
                                            } catch (e) {
                                                console.warn("Error parsing internal API response", r, e), t(e)
                                            }
                                        }))
                                    }))
                                } else t(new Error("Could not find valid LI cookie"))
                            })));
                        case 8:
                        case "end":
                            return e.stop()
                    }
                }), e, this)
            })));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(), j
    }()
}]);