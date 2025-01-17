/*! algoliasearch-lite.umd.js | 4.24.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).algoliasearch = t());
})(this, function () {
  "use strict";
  function e(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  }
  function t(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t &&
        (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        r.push.apply(r, n);
    }
    return r;
  }
  function r(r) {
    for (var n = 1; n < arguments.length; n++) {
      var o = null != arguments[n] ? arguments[n] : {};
      n % 2
        ? t(Object(o), !0).forEach(function (t) {
            e(r, t, o[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o))
        : t(Object(o)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return r;
  }
  function n(e, t) {
    if (null == e) return {};
    var r,
      n,
      o = (function (e, t) {
        if (null == e) return {};
        var r,
          n,
          o = {},
          a = Object.keys(e);
        for (n = 0; n < a.length; n++)
          (r = a[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (n = 0; n < a.length; n++)
        (r = a[n]),
          t.indexOf(r) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
    }
    return o;
  }
  function o(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        if (
          !(
            Symbol.iterator in Object(e) ||
            "[object Arguments]" === Object.prototype.toString.call(e)
          )
        )
          return;
        var r = [],
          n = !0,
          o = !1,
          a = void 0;
        try {
          for (
            var u, i = e[Symbol.iterator]();
            !(n = (u = i.next()).done) &&
            (r.push(u.value), !t || r.length !== t);
            n = !0
          );
        } catch (e) {
          (o = !0), (a = e);
        } finally {
          try {
            n || null == i.return || i.return();
          } finally {
            if (o) throw a;
          }
        }
        return r;
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  function a(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) {
          for (var t = 0, r = new Array(e.length); t < e.length; t++)
            r[t] = e[t];
          return r;
        }
      })(e) ||
      (function (e) {
        if (
          Symbol.iterator in Object(e) ||
          "[object Arguments]" === Object.prototype.toString.call(e)
        )
          return Array.from(e);
      })(e) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  function u(e) {
    var t,
      r = "algoliasearch-client-js-".concat(e.key),
      n = function () {
        return void 0 === t && (t = e.localStorage || window.localStorage), t;
      },
      a = function () {
        return JSON.parse(n().getItem(r) || "{}");
      },
      u = function (e) {
        n().setItem(r, JSON.stringify(e));
      },
      i = function () {
        var t = e.timeToLive ? 1e3 * e.timeToLive : null,
          r = a(),
          n = Object.fromEntries(
            Object.entries(r).filter(function (e) {
              return void 0 !== o(e, 2)[1].timestamp;
            })
          );
        if ((u(n), t)) {
          var i = Object.fromEntries(
            Object.entries(n).filter(function (e) {
              var r = o(e, 2)[1],
                n = new Date().getTime();
              return !(r.timestamp + t < n);
            })
          );
          u(i);
        }
      };
    return {
      get: function (e, t) {
        var r =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : {
                miss: function () {
                  return Promise.resolve();
                },
              };
        return Promise.resolve()
          .then(function () {
            i();
            var t = JSON.stringify(e);
            return a()[t];
          })
          .then(function (e) {
            return Promise.all([e ? e.value : t(), void 0 !== e]);
          })
          .then(function (e) {
            var t = o(e, 2),
              n = t[0],
              a = t[1];
            return Promise.all([n, a || r.miss(n)]);
          })
          .then(function (e) {
            return o(e, 1)[0];
          });
      },
      set: function (e, t) {
        return Promise.resolve().then(function () {
          var o = a();
          return (
            (o[JSON.stringify(e)] = {
              timestamp: new Date().getTime(),
              value: t,
            }),
            n().setItem(r, JSON.stringify(o)),
            t
          );
        });
      },
      delete: function (e) {
        return Promise.resolve().then(function () {
          var t = a();
          delete t[JSON.stringify(e)], n().setItem(r, JSON.stringify(t));
        });
      },
      clear: function () {
        return Promise.resolve().then(function () {
          n().removeItem(r);
        });
      },
    };
  }
  function i(e) {
    var t = a(e.caches),
      r = t.shift();
    return void 0 === r
      ? {
          get: function (e, t) {
            var r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {
                      miss: function () {
                        return Promise.resolve();
                      },
                    },
              n = t();
            return n
              .then(function (e) {
                return Promise.all([e, r.miss(e)]);
              })
              .then(function (e) {
                return o(e, 1)[0];
              });
          },
          set: function (e, t) {
            return Promise.resolve(t);
          },
          delete: function (e) {
            return Promise.resolve();
          },
          clear: function () {
            return Promise.resolve();
          },
        }
      : {
          get: function (e, n) {
            var o =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {
                    miss: function () {
                      return Promise.resolve();
                    },
                  };
            return r.get(e, n, o).catch(function () {
              return i({ caches: t }).get(e, n, o);
            });
          },
          set: function (e, n) {
            return r.set(e, n).catch(function () {
              return i({ caches: t }).set(e, n);
            });
          },
          delete: function (e) {
            return r.delete(e).catch(function () {
              return i({ caches: t }).delete(e);
            });
          },
          clear: function () {
            return r.clear().catch(function () {
              return i({ caches: t }).clear();
            });
          },
        };
  }
  function s() {
    var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : { serializable: !0 },
      t = {};
    return {
      get: function (r, n) {
        var o =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : {
                  miss: function () {
                    return Promise.resolve();
                  },
                },
          a = JSON.stringify(r);
        if (a in t)
          return Promise.resolve(e.serializable ? JSON.parse(t[a]) : t[a]);
        var u = n(),
          i =
            (o && o.miss) ||
            function () {
              return Promise.resolve();
            };
        return u
          .then(function (e) {
            return i(e);
          })
          .then(function () {
            return u;
          });
      },
      set: function (r, n) {
        return (
          (t[JSON.stringify(r)] = e.serializable ? JSON.stringify(n) : n),
          Promise.resolve(n)
        );
      },
      delete: function (e) {
        return delete t[JSON.stringify(e)], Promise.resolve();
      },
      clear: function () {
        return (t = {}), Promise.resolve();
      },
    };
  }
  function c(e) {
    for (var t = e.length - 1; t > 0; t--) {
      var r = Math.floor(Math.random() * (t + 1)),
        n = e[t];
      (e[t] = e[r]), (e[r] = n);
    }
    return e;
  }
  function l(e, t) {
    return t
      ? (Object.keys(t).forEach(function (r) {
          e[r] = t[r](e);
        }),
        e)
      : e;
  }
  function f(e) {
    for (
      var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      r[n - 1] = arguments[n];
    var o = 0;
    return e.replace(/%s/g, function () {
      return encodeURIComponent(r[o++]);
    });
  }
  var h = { WithinQueryParameters: 0, WithinHeaders: 1 };
  function m(e, t) {
    var r = e || {},
      n = r.data || {};
    return (
      Object.keys(r).forEach(function (e) {
        -1 ===
          [
            "timeout",
            "headers",
            "queryParameters",
            "data",
            "cacheable",
          ].indexOf(e) && (n[e] = r[e]);
      }),
      {
        data: Object.entries(n).length > 0 ? n : void 0,
        timeout: r.timeout || t,
        headers: r.headers || {},
        queryParameters: r.queryParameters || {},
        cacheable: r.cacheable,
      }
    );
  }
  var d = { Read: 1, Write: 2, Any: 3 },
    p = 1,
    v = 2,
    g = 3;
  function y(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
    return r(r({}, e), {}, { status: t, lastUpdate: Date.now() });
  }
  function b(e) {
    return "string" == typeof e
      ? { protocol: "https", url: e, accept: d.Any }
      : {
          protocol: e.protocol || "https",
          url: e.url,
          accept: e.accept || d.Any,
        };
  }
  var O = "GET",
    P = "POST";
  function q(e, t) {
    return Promise.all(
      t.map(function (t) {
        return e.get(t, function () {
          return Promise.resolve(y(t));
        });
      })
    ).then(function (e) {
      var r = e.filter(function (e) {
          return (function (e) {
            return e.status === p || Date.now() - e.lastUpdate > 12e4;
          })(e);
        }),
        n = e.filter(function (e) {
          return (function (e) {
            return e.status === g && Date.now() - e.lastUpdate <= 12e4;
          })(e);
        }),
        o = [].concat(a(r), a(n));
      return {
        getTimeout: function (e, t) {
          return (0 === n.length && 0 === e ? 1 : n.length + 3 + e) * t;
        },
        statelessHosts:
          o.length > 0
            ? o.map(function (e) {
                return b(e);
              })
            : t,
      };
    });
  }
  function j(e, t, n, o) {
    var u = [],
      i = (function (e, t) {
        if (e.method === O || (void 0 === e.data && void 0 === t.data)) return;
        var n = Array.isArray(e.data) ? e.data : r(r({}, e.data), t.data);
        return JSON.stringify(n);
      })(n, o),
      s = (function (e, t) {
        var n = r(r({}, e.headers), t.headers),
          o = {};
        return (
          Object.keys(n).forEach(function (e) {
            var t = n[e];
            o[e.toLowerCase()] = t;
          }),
          o
        );
      })(e, o),
      c = n.method,
      l = n.method !== O ? {} : r(r({}, n.data), o.data),
      f = r(
        r(r({ "x-algolia-agent": e.userAgent.value }, e.queryParameters), l),
        o.queryParameters
      ),
      h = 0,
      m = function t(r, a) {
        var l = r.pop();
        if (void 0 === l)
          throw {
            name: "RetryError",
            message:
              "Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support .",
            transporterStackTrace: A(u),
          };
        var m = {
            data: i,
            headers: s,
            method: c,
            url: S(l, n.path, f),
            connectTimeout: a(h, e.timeouts.connect),
            responseTimeout: a(h, o.timeout),
          },
          d = function (e) {
            var t = { request: m, response: e, host: l, triesLeft: r.length };
            return u.push(t), t;
          },
          p = {
            onSuccess: function (e) {
              return (function (e) {
                try {
                  return JSON.parse(e.content);
                } catch (t) {
                  throw (function (e, t) {
                    return {
                      name: "DeserializationError",
                      message: e,
                      response: t,
                    };
                  })(t.message, e);
                }
              })(e);
            },
            onRetry: function (n) {
              var o = d(n);
              return (
                n.isTimedOut && h++,
                Promise.all([
                  e.logger.info("Retryable failure", x(o)),
                  e.hostsCache.set(l, y(l, n.isTimedOut ? g : v)),
                ]).then(function () {
                  return t(r, a);
                })
              );
            },
            onFail: function (e) {
              throw (
                (d(e),
                (function (e, t) {
                  var r = e.content,
                    n = e.status,
                    o = r;
                  try {
                    o = JSON.parse(r).message;
                  } catch (e) {}
                  return (function (e, t, r) {
                    return {
                      name: "ApiError",
                      message: e,
                      status: t,
                      transporterStackTrace: r,
                    };
                  })(o, n, t);
                })(e, A(u)))
              );
            },
          };
        return e.requester.send(m).then(function (e) {
          return (function (e, t) {
            return (function (e) {
              var t = e.status;
              return (
                e.isTimedOut ||
                (function (e) {
                  var t = e.isTimedOut,
                    r = e.status;
                  return !t && 0 == ~~r;
                })(e) ||
                (2 != ~~(t / 100) && 4 != ~~(t / 100))
              );
            })(e)
              ? t.onRetry(e)
              : 2 == ~~(e.status / 100)
              ? t.onSuccess(e)
              : t.onFail(e);
          })(e, p);
        });
      };
    return q(e.hostsCache, t).then(function (e) {
      return m(a(e.statelessHosts).reverse(), e.getTimeout);
    });
  }
  function w(e) {
    var t = {
      value: "Algolia for JavaScript (".concat(e, ")"),
      add: function (e) {
        var r = "; "
          .concat(e.segment)
          .concat(void 0 !== e.version ? " (".concat(e.version, ")") : "");
        return (
          -1 === t.value.indexOf(r) && (t.value = "".concat(t.value).concat(r)),
          t
        );
      },
    };
    return t;
  }
  function S(e, t, r) {
    var n = T(r),
      o = ""
        .concat(e.protocol, "://")
        .concat(e.url, "/")
        .concat("/" === t.charAt(0) ? t.substr(1) : t);
    return n.length && (o += "?".concat(n)), o;
  }
  function T(e) {
    return Object.keys(e)
      .map(function (t) {
        return f(
          "%s=%s",
          t,
          ((r = e[t]),
          "[object Object]" === Object.prototype.toString.call(r) ||
          "[object Array]" === Object.prototype.toString.call(r)
            ? JSON.stringify(e[t])
            : e[t])
        );
        var r;
      })
      .join("&");
  }
  function A(e) {
    return e.map(function (e) {
      return x(e);
    });
  }
  function x(e) {
    var t = e.request.headers["x-algolia-api-key"]
      ? { "x-algolia-api-key": "*****" }
      : {};
    return r(
      r({}, e),
      {},
      {
        request: r(
          r({}, e.request),
          {},
          { headers: r(r({}, e.request.headers), t) }
        ),
      }
    );
  }
  var N = function (e) {
      var t = e.appId,
        n = (function (e, t, r) {
          var n = { "x-algolia-api-key": r, "x-algolia-application-id": t };
          return {
            headers: function () {
              return e === h.WithinHeaders ? n : {};
            },
            queryParameters: function () {
              return e === h.WithinQueryParameters ? n : {};
            },
          };
        })(void 0 !== e.authMode ? e.authMode : h.WithinHeaders, t, e.apiKey),
        a = (function (e) {
          var t = e.hostsCache,
            r = e.logger,
            n = e.requester,
            a = e.requestsCache,
            u = e.responsesCache,
            i = e.timeouts,
            s = e.userAgent,
            c = e.hosts,
            l = e.queryParameters,
            f = {
              hostsCache: t,
              logger: r,
              requester: n,
              requestsCache: a,
              responsesCache: u,
              timeouts: i,
              userAgent: s,
              headers: e.headers,
              queryParameters: l,
              hosts: c.map(function (e) {
                return b(e);
              }),
              read: function (e, t) {
                var r = m(t, f.timeouts.read),
                  n = function () {
                    return j(
                      f,
                      f.hosts.filter(function (e) {
                        return 0 != (e.accept & d.Read);
                      }),
                      e,
                      r
                    );
                  };
                if (!0 !== (void 0 !== r.cacheable ? r.cacheable : e.cacheable))
                  return n();
                var a = {
                  request: e,
                  mappedRequestOptions: r,
                  transporter: {
                    queryParameters: f.queryParameters,
                    headers: f.headers,
                  },
                };
                return f.responsesCache.get(
                  a,
                  function () {
                    return f.requestsCache.get(a, function () {
                      return f.requestsCache
                        .set(a, n())
                        .then(
                          function (e) {
                            return Promise.all([f.requestsCache.delete(a), e]);
                          },
                          function (e) {
                            return Promise.all([
                              f.requestsCache.delete(a),
                              Promise.reject(e),
                            ]);
                          }
                        )
                        .then(function (e) {
                          var t = o(e, 2);
                          t[0];
                          return t[1];
                        });
                    });
                  },
                  {
                    miss: function (e) {
                      return f.responsesCache.set(a, e);
                    },
                  }
                );
              },
              write: function (e, t) {
                return j(
                  f,
                  f.hosts.filter(function (e) {
                    return 0 != (e.accept & d.Write);
                  }),
                  e,
                  m(t, f.timeouts.write)
                );
              },
            };
          return f;
        })(
          r(
            r(
              {
                hosts: [
                  { url: "".concat(t, "-dsn.algolia.net"), accept: d.Read },
                  { url: "".concat(t, ".algolia.net"), accept: d.Write },
                ].concat(
                  c([
                    { url: "".concat(t, "-1.algolianet.com") },
                    { url: "".concat(t, "-2.algolianet.com") },
                    { url: "".concat(t, "-3.algolianet.com") },
                  ])
                ),
              },
              e
            ),
            {},
            {
              headers: r(
                r(r({}, n.headers()), {
                  "content-type": "application/x-www-form-urlencoded",
                }),
                e.headers
              ),
              queryParameters: r(r({}, n.queryParameters()), e.queryParameters),
            }
          )
        );
      return l(
        {
          transporter: a,
          appId: t,
          addAlgoliaAgent: function (e, t) {
            a.userAgent.add({ segment: e, version: t });
          },
          clearCache: function () {
            return Promise.all([
              a.requestsCache.clear(),
              a.responsesCache.clear(),
            ]).then(function () {});
          },
        },
        e.methods
      );
    },
    C = function (e) {
      return function (t, r) {
        return t.method === O
          ? e.transporter.read(t, r)
          : e.transporter.write(t, r);
      };
    },
    E = function (e) {
      return function (t) {
        var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = { transporter: e.transporter, appId: e.appId, indexName: t };
        return l(n, r.methods);
      };
    },
    J = function (e) {
      return function (t, n) {
        var o = t.map(function (e) {
          return r(r({}, e), {}, { params: T(e.params || {}) });
        });
        return e.transporter.read(
          {
            method: P,
            path: "1/indexes/*/queries",
            data: { requests: o },
            cacheable: !0,
          },
          n
        );
      };
    },
    k = function (e) {
      return function (t, o) {
        return Promise.all(
          t.map(function (t) {
            var a = t.params,
              u = a.facetName,
              i = a.facetQuery,
              s = n(a, ["facetName", "facetQuery"]);
            return E(e)(t.indexName, {
              methods: { searchForFacetValues: F },
            }).searchForFacetValues(u, i, r(r({}, o), s));
          })
        );
      };
    },
    I = function (e) {
      return function (t, r, n) {
        return e.transporter.read(
          {
            method: P,
            path: f("1/answers/%s/prediction", e.indexName),
            data: { query: t, queryLanguages: r },
            cacheable: !0,
          },
          n
        );
      };
    },
    R = function (e) {
      return function (t, r) {
        return e.transporter.read(
          {
            method: P,
            path: f("1/indexes/%s/query", e.indexName),
            data: { query: t },
            cacheable: !0,
          },
          r
        );
      };
    },
    F = function (e) {
      return function (t, r, n) {
        return e.transporter.read(
          {
            method: P,
            path: f("1/indexes/%s/facets/%s/query", e.indexName, t),
            data: { facetQuery: r },
            cacheable: !0,
          },
          n
        );
      };
    },
    D = 1,
    W = 2,
    H = 3;
  var Q = function (e) {
    return function (t, n) {
      var o = t.map(function (e) {
        return r(r({}, e), {}, { threshold: e.threshold || 0 });
      });
      return e.transporter.read(
        {
          method: P,
          path: "1/indexes/*/recommendations",
          data: { requests: o },
          cacheable: !0,
        },
        n
      );
    };
  };
  function L(e, t, n) {
    var o,
      a = {
        appId: e,
        apiKey: t,
        timeouts: { connect: 1, read: 2, write: 30 },
        requester: {
          send: function (e) {
            return new Promise(function (t) {
              var r = new XMLHttpRequest();
              r.open(e.method, e.url, !0),
                Object.keys(e.headers).forEach(function (t) {
                  return r.setRequestHeader(t, e.headers[t]);
                });
              var n,
                o = function (e, n) {
                  return setTimeout(function () {
                    r.abort(), t({ status: 0, content: n, isTimedOut: !0 });
                  }, 1e3 * e);
                },
                a = o(e.connectTimeout, "Connection timeout");
              (r.onreadystatechange = function () {
                r.readyState > r.OPENED &&
                  void 0 === n &&
                  (clearTimeout(a),
                  (n = o(e.responseTimeout, "Socket timeout")));
              }),
                (r.onerror = function () {
                  0 === r.status &&
                    (clearTimeout(a),
                    clearTimeout(n),
                    t({
                      content: r.responseText || "Network request failed",
                      status: r.status,
                      isTimedOut: !1,
                    }));
                }),
                (r.onload = function () {
                  clearTimeout(a),
                    clearTimeout(n),
                    t({
                      content: r.responseText,
                      status: r.status,
                      isTimedOut: !1,
                    });
                }),
                r.send(e.data);
            });
          },
        },
        logger:
          ((o = H),
          {
            debug: function (e, t) {
              return D >= o && console.debug(e, t), Promise.resolve();
            },
            info: function (e, t) {
              return W >= o && console.info(e, t), Promise.resolve();
            },
            error: function (e, t) {
              return console.error(e, t), Promise.resolve();
            },
          }),
        responsesCache: s(),
        requestsCache: s({ serializable: !1 }),
        hostsCache: i({
          caches: [u({ key: "".concat("4.24.0", "-").concat(e) }), s()],
        }),
        userAgent: w("4.24.0").add({ segment: "Browser", version: "lite" }),
        authMode: h.WithinQueryParameters,
      };
    return N(
      r(
        r(r({}, a), n),
        {},
        {
          methods: {
            search: J,
            searchForFacetValues: k,
            multipleQueries: J,
            multipleSearchForFacetValues: k,
            customRequest: C,
            initIndex: function (e) {
              return function (t) {
                return E(e)(t, {
                  methods: {
                    search: R,
                    searchForFacetValues: F,
                    findAnswers: I,
                  },
                });
              };
            },
            getRecommendations: Q,
          },
        }
      )
    );
  }
  return (L.version = "4.24.0"), L;
});
