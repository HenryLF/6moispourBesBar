(function(g,f){if(typeof define=="function"&&define.amd){define(f)}else if(typeof exports=="object" && typeof module<"u"){module.exports=f()}else{var m=f();for(var i in m) g[i]=m[i]}}(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : this,function(){var exports={};var __exports=exports;var module={exports};
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/sister/src/sister.js
var require_sister = __commonJS({
  "node_modules/sister/src/sister.js"(exports, module2) {
    "use strict";
    var Sister;
    Sister = function() {
      var sister = {}, events = {};
      sister.on = function(name, handler) {
        var listener = { name, handler };
        events[name] = events[name] || [];
        events[name].unshift(listener);
        return listener;
      };
      sister.off = function(listener) {
        var index = events[listener.name].indexOf(listener);
        if (index !== -1) {
          events[listener.name].splice(index, 1);
        }
      };
      sister.trigger = function(name, data) {
        var listeners = events[name], i;
        if (listeners) {
          i = listeners.length;
          while (i--) {
            listeners[i].handler(data);
          }
        }
      };
      return sister;
    };
    module2.exports = Sister;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/youtube-player/dist/constants/PlayerStates.js
var require_PlayerStates = __commonJS({
  "node_modules/youtube-player/dist/constants/PlayerStates.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      BUFFERING: 3,
      ENDED: 0,
      PAUSED: 2,
      PLAYING: 1,
      UNSTARTED: -1,
      VIDEO_CUED: 5
    };
    module2.exports = exports["default"];
  }
});

// node_modules/youtube-player/dist/FunctionStateMap.js
var require_FunctionStateMap = __commonJS({
  "node_modules/youtube-player/dist/FunctionStateMap.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _PlayerStates = require_PlayerStates();
    var _PlayerStates2 = _interopRequireDefault(_PlayerStates);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = {
      pauseVideo: {
        acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PAUSED],
        stateChangeRequired: false
      },
      playVideo: {
        acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PLAYING],
        stateChangeRequired: false
      },
      seekTo: {
        acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PLAYING, _PlayerStates2.default.PAUSED],
        stateChangeRequired: true,
        // TRICKY: `seekTo` may not cause a state change if no buffering is
        // required.
        // eslint-disable-next-line unicorn/numeric-separators-style
        timeout: 3e3
      }
    };
    module2.exports = exports["default"];
  }
});

// node_modules/youtube-player/dist/eventNames.js
var require_eventNames = __commonJS({
  "node_modules/youtube-player/dist/eventNames.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = ["ready", "stateChange", "playbackQualityChange", "playbackRateChange", "error", "apiChange", "volumeChange"];
    module2.exports = exports["default"];
  }
});

// node_modules/youtube-player/dist/functionNames.js
var require_functionNames = __commonJS({
  "node_modules/youtube-player/dist/functionNames.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = ["cueVideoById", "loadVideoById", "cueVideoByUrl", "loadVideoByUrl", "playVideo", "pauseVideo", "stopVideo", "getVideoLoadedFraction", "cuePlaylist", "loadPlaylist", "nextVideo", "previousVideo", "playVideoAt", "setShuffle", "setLoop", "getPlaylist", "getPlaylistIndex", "setOption", "mute", "unMute", "isMuted", "setVolume", "getVolume", "seekTo", "getPlayerState", "getPlaybackRate", "setPlaybackRate", "getAvailablePlaybackRates", "getPlaybackQuality", "setPlaybackQuality", "getAvailableQualityLevels", "getCurrentTime", "getDuration", "removeEventListener", "getVideoUrl", "getVideoEmbedCode", "getOptions", "getOption", "addEventListener", "destroy", "setSize", "getIframe", "getSphericalProperties", "setSphericalProperties"];
    module2.exports = exports["default"];
  }
});

// node_modules/youtube-player/dist/YouTubePlayer.js
var require_YouTubePlayer = __commonJS({
  "node_modules/youtube-player/dist/YouTubePlayer.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _debug = require_browser();
    var _debug2 = _interopRequireDefault(_debug);
    var _FunctionStateMap = require_FunctionStateMap();
    var _FunctionStateMap2 = _interopRequireDefault(_FunctionStateMap);
    var _eventNames = require_eventNames();
    var _eventNames2 = _interopRequireDefault(_eventNames);
    var _functionNames = require_functionNames();
    var _functionNames2 = _interopRequireDefault(_functionNames);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var debug = (0, _debug2.default)("youtube-player");
    var YouTubePlayer2 = {};
    YouTubePlayer2.proxyEvents = (emitter) => {
      const events = {};
      for (const eventName of _eventNames2.default) {
        const onEventName = "on" + eventName.slice(0, 1).toUpperCase() + eventName.slice(1);
        events[onEventName] = (event) => {
          debug('event "%s"', onEventName, event);
          emitter.trigger(eventName, event);
        };
      }
      return events;
    };
    YouTubePlayer2.promisifyPlayer = (playerAPIReady, strictState = false) => {
      const functions = {};
      for (const functionName of _functionNames2.default) {
        if (strictState && _FunctionStateMap2.default[functionName]) {
          functions[functionName] = (...args) => {
            return playerAPIReady.then((player) => {
              const stateInfo = _FunctionStateMap2.default[functionName];
              const playerState = player.getPlayerState();
              const value = player[functionName].apply(player, args);
              if (stateInfo.stateChangeRequired || // eslint-disable-next-line no-extra-parens
              Array.isArray(stateInfo.acceptableStates) && !stateInfo.acceptableStates.includes(playerState)) {
                return new Promise((resolve) => {
                  const onPlayerStateChange = () => {
                    const playerStateAfterChange = player.getPlayerState();
                    let timeout;
                    if (typeof stateInfo.timeout === "number") {
                      timeout = setTimeout(() => {
                        player.removeEventListener("onStateChange", onPlayerStateChange);
                        resolve();
                      }, stateInfo.timeout);
                    }
                    if (Array.isArray(stateInfo.acceptableStates) && stateInfo.acceptableStates.includes(playerStateAfterChange)) {
                      player.removeEventListener("onStateChange", onPlayerStateChange);
                      clearTimeout(timeout);
                      resolve();
                    }
                  };
                  player.addEventListener("onStateChange", onPlayerStateChange);
                }).then(() => {
                  return value;
                });
              }
              return value;
            });
          };
        } else {
          functions[functionName] = (...args) => {
            return playerAPIReady.then((player) => {
              return player[functionName].apply(player, args);
            });
          };
        }
      }
      return functions;
    };
    exports.default = YouTubePlayer2;
    module2.exports = exports["default"];
  }
});

// node_modules/load-script/index.js
var require_load_script = __commonJS({
  "node_modules/load-script/index.js"(exports, module2) {
    module2.exports = function load(src, opts, cb) {
      var head = document.head || document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      cb = cb || function() {
      };
      script.type = opts.type || "text/javascript";
      script.charset = opts.charset || "utf8";
      script.async = "async" in opts ? !!opts.async : true;
      script.src = src;
      if (opts.attrs) {
        setAttributes(script, opts.attrs);
      }
      if (opts.text) {
        script.text = "" + opts.text;
      }
      var onend = "onload" in script ? stdOnEnd : ieOnEnd;
      onend(script, cb);
      if (!script.onload) {
        stdOnEnd(script, cb);
      }
      head.appendChild(script);
    };
    function setAttributes(script, attrs) {
      for (var attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
    }
    function stdOnEnd(script, cb) {
      script.onload = function() {
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function() {
        this.onerror = this.onload = null;
        cb(new Error("Failed to load " + this.src), script);
      };
    }
    function ieOnEnd(script, cb) {
      script.onreadystatechange = function() {
        if (this.readyState != "complete" && this.readyState != "loaded") return;
        this.onreadystatechange = null;
        cb(null, script);
      };
    }
  }
});

// node_modules/youtube-player/dist/loadYouTubeIframeApi.js
var require_loadYouTubeIframeApi = __commonJS({
  "node_modules/youtube-player/dist/loadYouTubeIframeApi.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _loadScript = require_load_script();
    var _loadScript2 = _interopRequireDefault(_loadScript);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = (emitter) => {
      const iframeAPIReady = new Promise((resolve) => {
        if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
          resolve(window.YT);
          return;
        } else {
          const protocol = window.location.protocol === "http:" ? "http:" : "https:";
          (0, _loadScript2.default)(protocol + "//www.youtube.com/iframe_api", (error) => {
            if (error) {
              emitter.trigger("error", error);
            }
          });
        }
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (previous) {
            previous();
          }
          resolve(window.YT);
        };
      });
      return iframeAPIReady;
    };
    module2.exports = exports["default"];
  }
});

// node_modules/youtube-player/dist/index.js
var require_dist = __commonJS({
  "node_modules/youtube-player/dist/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _sister = require_sister();
    var _sister2 = _interopRequireDefault(_sister);
    var _YouTubePlayer = require_YouTubePlayer();
    var _YouTubePlayer2 = _interopRequireDefault(_YouTubePlayer);
    var _loadYouTubeIframeApi = require_loadYouTubeIframeApi();
    var _loadYouTubeIframeApi2 = _interopRequireDefault(_loadYouTubeIframeApi);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var youtubeIframeAPI;
    exports.default = (maybeElementId, options = {}, strictState = false) => {
      const emitter = (0, _sister2.default)();
      if (!youtubeIframeAPI) {
        youtubeIframeAPI = (0, _loadYouTubeIframeApi2.default)(emitter);
      }
      if (options.events) {
        throw new Error("Event handlers cannot be overwritten.");
      }
      if (typeof maybeElementId === "string" && !document.getElementById(maybeElementId)) {
        throw new Error('Element "' + maybeElementId + '" does not exist.');
      }
      options.events = _YouTubePlayer2.default.proxyEvents(emitter);
      const playerAPIReady = new Promise((resolve) => {
        if (typeof maybeElementId === "object" && maybeElementId.playVideo instanceof Function) {
          const player = maybeElementId;
          resolve(player);
        } else {
          youtubeIframeAPI.then((YT) => {
            const player = new YT.Player(maybeElementId, options);
            emitter.on("ready", () => {
              resolve(player);
            });
            return null;
          });
        }
      });
      const playerApi = _YouTubePlayer2.default.promisifyPlayer(playerAPIReady, strictState);
      playerApi.on = emitter.on;
      playerApi.off = emitter.off;
      return playerApi;
    };
    module2.exports = exports["default"];
  }
});

// src/public/player/iFrame.ts
var iFrame_exports = {};
__export(iFrame_exports, {
  initPlayer: () => initPlayer
});
module.exports = __toCommonJS(iFrame_exports);
var import_youtube_player = __toESM(require_dist());
function initPlayer(el, videoId) {
  var _a;
  const player = (0, import_youtube_player.default)(el, {
    videoId,
    playerVars: {
      modestbranding: 1,
      autoplay: 0
    }
  });
  const parent = (_a = document.getElementById(el.id)) == null ? void 0 : _a.parentElement;
  player.on("ready", () => {
    player.mute();
    parent == null ? void 0 : parent.dispatchEvent(
      new CustomEvent("player-ready", {
        detail: {
          play: player.playVideo,
          pause: player.pauseVideo
        }
      })
    );
  });
  player.on("error", () => {
    parent == null ? void 0 : parent.dispatchEvent(
      new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
    );
    player.destroy();
  });
  player.on("stateChange", ({ data }) => {
    switch (data) {
      case 0:
        parent == null ? void 0 : parent.dispatchEvent(
          new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
        );
        break;
    }
  });
}
/*! Bundled license information:

sister/src/sister.js:
  (**
  * @link https://github.com/gajus/sister for the canonical source repository
  * @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
  *)
*/

if(__exports != exports)module.exports = exports;return module.exports}));
//# sourceMappingURL=iFrame.js.map
