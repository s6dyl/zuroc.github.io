/**
 * file: mod.js
 * ver: 1.0.9
 * update: 2015/01/12
 *
 * //github.com/fex-team/mod
 */
var require, define;

(function(global) {
    var head = document.getElementsByTagName('head')[0],
        loadingMap = {},
        factoryMap = {},
        modulesMap = {},
        scriptsMap = {},
        resMap = {},
        pkgMap = {};



    function createScript(url, onerror) {
        if (url in scriptsMap) return;
        scriptsMap[url] = true;

        var script = document.createElement('script');
        if (onerror) {
            var tid = setTimeout(onerror, require.timeout);

            script.onerror = function() {
                clearTimeout(tid);
                onerror();
            };

            function onload() {
                clearTimeout(tid);
            }

            if ('onload' in script) {
                script.onload = onload;
            }
            else {
                script.onreadystatechange = function() {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        onload();
                    }
                }
            }
        }
        script.type = 'text/javascript';
        if(url.indexOf('/')==0){
            src=url
        }
        else{
            src="/modules/"+url
        }
        script.src =  "/static"+src+".js";
        head.appendChild(script);
        return script;
    }

    function loadScript(id, callback, onerror) {
        var queue = loadingMap[id] || (loadingMap[id] = []);
        queue.push(callback);

        //
        // resource map query
        //
        var res = resMap[id] || {};
        var pkg = res.pkg;
        var url;

        if (pkg) {
            url = pkgMap[pkg].url;
        } else {
            url = res.url || id;
        }

        createScript(url, onerror && function() {
            onerror(id);
        });
    }

    define = function(id, factory) {
        factoryMap[id] = factory;

        var queue = loadingMap[id];
        if (queue) {
            for(var i = 0, n = queue.length; i < n; i++) {
                queue[i]();
            }
            delete loadingMap[id];
        }
    };

    require = function(id) {

        // compatible with require([dep, dep2...]) syntax.
        if (id && id.splice) {
            return require.async.apply(this, arguments);
        }

        id = require.alias(id);

        var mod = modulesMap[id];
        if (mod) {
            return mod.exports;
        }

        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            throw '[ModJS] Cannot find module `' + id + '`';
        }

        mod = modulesMap[id] = {
            exports: {}
        };

        //
        // factory: function OR value
        //
        var ret = (typeof factory == 'function')
                ? factory.apply(mod, [require, mod.exports, mod])
                : factory;

        if (ret) {
            mod.exports = ret;
        }
        return mod.exports;
    };

    require.async = function(names, onload, onerror) {
        if (typeof names == 'string') {
            names = [names];
        }

        for(var i = 0, n = names.length; i < n; i++) {
            names[i] = require.alias(names[i]);
        }

        var needMap = {};
        var needNum = 0;

        function findNeed(depArr) {
            for(var i = 0, n = depArr.length; i < n; i++) {
                //
                // skip loading or loaded
                //
                var dep = depArr[i];

                if (dep in factoryMap){
                    // check whether loaded resource's deps is loaded or not
                    var child = resMap[dep];
                    if (child && 'deps' in child) {
                        findNeed(child.deps);
                    }
                    continue;
                }

                if (dep in needMap) {
                    continue;
                }

                needMap[dep] = true;
                needNum++;
                loadScript(dep, updateNeed, onerror);

                var child = resMap[dep];
                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
            }
        }

        function updateNeed() {
            if (0 == needNum--) {
                var args = [];
                for(var i = 0, n = names.length; i < n; i++) {
                    args[i] = require(names[i]);
                }

                onload && onload.apply(global, args);
            }
        }

        findNeed(names);
        updateNeed();
    };

    require.resourceMap = function(obj) {
        var k, col;

        // merge `res` & `pkg` fields
        col = obj.res;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                resMap[k] = col[k];
            }
        }

        col = obj.pkg;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                pkgMap[k] = col[k];
            }
        }
    };

    require.loadJs = function(url) {
        createScript(url);
    };

    require.css = function(cfg, fn, scope) {
        
          var head = document.getElementsByTagName( 'head' )[0], // reference to document.head for appending/ removing link nodes
               link = document.createElement( 'link' ),
                path = "/static/css/"+cfg+".css";
                ;           // create the link node
           link.setAttribute( 'href', path );
           link.setAttribute( 'rel', 'stylesheet' );
           link.setAttribute( 'type', 'text/css' );

           var sheet, cssRules;
           // get the correct properties to check for depending on the browser
           if ( 'sheet' in link ) {
              sheet = 'sheet'; cssRules = 'cssRules';
           }
           else {
              sheet = 'styleSheet'; cssRules = 'rules';
           }

           var interval_id = setInterval( function() {                    // start checking whether the style sheet has successfully loaded
                  try {
                     if ( link[sheet] && link[sheet][cssRules].length ) { // SUCCESS! our style sheet has loaded
                        clearInterval( interval_id );                     // clear the counters
                        clearTimeout( timeout_id );
                        fn.call( scope || window, true, link );           // fire the callback with success == true
                     }
                  } catch( e ) {} finally {}
               }, 10 ),                                                   // how often to check if the stylesheet is loaded
               timeout_id = setTimeout( function() {       // start counting down till fail
                  clearInterval( interval_id );            // clear the counters
                  clearTimeout( timeout_id );
                  head.removeChild( link );                // since the style sheet didn't load, remove the link node from the DOM
                  fn.call( scope || window, false, link ); // fire the callback with success == false
               }, 15000 );                                 // how long to wait before failing

           head.appendChild( link );  // insert the link node into the DOM and start loading the style sheet

    };


    require.alias = function(id) {return id};

    require.timeout = 5000;

    window.require_async = require.async

})(this);
