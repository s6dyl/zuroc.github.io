!function(e,t,o,n){"use strict";e.fn.sticky=function(o){var i,s=e(this),r=s.selector||"",c=(new Date).getTime(),a=[],l=arguments[0],f="string"==typeof l,m=[].slice.call(arguments,1);return s.each(function(){var s,u,d,h=e.isPlainObject(o)?e.extend(!0,{},e.fn.sticky.settings,o):e.extend({},e.fn.sticky.settings),b=h.className,g=h.namespace,p=h.error,v="."+g,x="module-"+g,C=e(this),k=e(t),y=C.offsetParent(),S=e(h.scrollContext),w=(C.selector||"",C.data(x)),T=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},P=this;d={initialize:function(){d.determineContext(),d.verbose("Initializing sticky",h,y),d.save.positions(),d.checkErrors(),d.bind.events(),h.observeChanges&&d.observeChanges(),d.instantiate()},instantiate:function(){d.verbose("Storing instance of module",d),w=d,C.data(x,d)},destroy:function(){d.verbose("Destroying previous module"),d.reset(),u&&u.disconnect(),k.off("resize"+v,d.event.resize),S.off("scroll"+v,d.event.scroll),C.removeData(x)},observeChanges:function(){var e=s[0];"MutationObserver"in t&&(u=new MutationObserver(function(){clearTimeout(d.timer),d.timer=setTimeout(function(){d.verbose("DOM tree modified, updating sticky menu"),d.refresh()},20)}),u.observe(P,{childList:!0,subtree:!0}),u.observe(e,{childList:!0,subtree:!0}),d.debug("Setting up mutation observer",u))},determineContext:function(){return s=h.context?e(h.context):y,0===s.length?void d.error(p.invalidContext,h.context,C):void 0},checkErrors:function(){return d.is.hidden()&&d.error(p.visible,C),d.cache.element.height>d.cache.context.height?(d.reset(),void d.error(p.elementSize,C)):void 0},bind:{events:function(){k.on("resize"+v,d.event.resize),S.on("scroll"+v,d.event.scroll)}},event:{resize:function(){T(function(){d.refresh(),d.stick()})},scroll:function(){T(function(){d.stick(),h.onScroll.call(P)})}},refresh:function(e){d.reset(),e&&(y=C.offsetParent()),d.save.positions(),d.stick(),h.onReposition.call(P)},supports:{sticky:function(){{var t=e("<div/>");t.get()}return t.addClass(b.supported),t.css("position").match("sticky")}},save:{scroll:function(e){d.lastScroll=e},positions:function(){var e={height:k.height()},t={margin:{top:parseInt(C.css("margin-top"),10),bottom:parseInt(C.css("margin-bottom"),10)},offset:C.offset(),width:C.outerWidth(),height:C.outerHeight()},o={offset:s.offset(),height:s.outerHeight(),bottomPadding:parseInt(s.css("padding-bottom"),10)};d.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:o.offset.top,height:o.height,bottomPadding:o.bottomPadding,bottom:o.offset.top+o.height-o.bottomPadding}},d.set.containerSize(),d.set.size(),d.stick(),d.debug("Caching element positions",d.cache)}},get:{direction:function(e){var t="down";return e=e||S.scrollTop(),d.lastScroll!==n&&(d.lastScroll<e?t="down":d.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||S.scrollTop(),d.lastScroll?e-d.lastScroll:0},currentElementScroll:function(){return d.is.top()?Math.abs(parseInt(C.css("top"),10))||0:Math.abs(parseInt(C.css("bottom"),10))||0},elementScroll:function(e){e=e||S.scrollTop();var t,o=d.cache.element,n=d.cache.window,i=d.get.scrollChange(e),s=o.height-n.height+h.offset,r=d.get.currentElementScroll(),c=r+i;return t=d.cache.fits||0>c?0:c>s?s:c}},remove:{offset:function(){C.css("margin-top","")}},set:{offset:function(){d.verbose("Setting offset on element",h.offset),C.css("margin-top",h.offset)},containerSize:function(){var e=y.get(0).tagName;"HTML"===e||"body"==e?y=C.offsetParent():(d.debug("Settings container size",d.cache.context.height),Math.abs(y.height()-d.cache.context.height)>5&&y.css({height:d.cache.context.height}))},scroll:function(e){d.debug("Setting scroll on element",e),d.is.top()&&C.css("bottom","").css("top",-e),d.is.bottom()&&C.css("top","").css("bottom",e)},size:function(){0!==d.cache.element.height&&0!==d.cache.element.width&&C.css({width:d.cache.element.width,height:d.cache.element.height})}},is:{top:function(){return C.hasClass(b.top)},bottom:function(){return C.hasClass(b.bottom)},initialPosition:function(){return!d.is.fixed()&&!d.is.bound()},hidden:function(){return!C.is(":visible")},bound:function(){return C.hasClass(b.bound)},fixed:function(){return C.hasClass(b.fixed)}},stick:function(){var e=d.cache,t=e.fits,o=e.element,n=e.window,i=e.context,s=d.is.bottom()&&h.pushing?h.bottomOffset:h.offset,r={top:S.scrollTop()+s,bottom:S.scrollTop()+s+n.height},c=(d.get.direction(r.top),d.get.elementScroll(r.top)),a=!t,l=0!==o.height;d.save.scroll(r.top),l&&(d.is.initialPosition()?r.top>=i.bottom?(d.debug("Element bottom of container"),d.bindBottom()):r.top>=o.top&&(d.debug("Element passed, fixing element to page"),d.fixTop()):d.is.fixed()?d.is.top()?r.top<o.top?(d.debug("Fixed element reached top of container"),d.setInitialPosition()):o.height+r.top-c>i.bottom?(d.debug("Fixed element reached bottom of container"),d.bindBottom()):a&&d.set.scroll(c):d.is.bottom()&&(r.bottom-o.height<o.top?(d.debug("Bottom fixed rail has reached top of container"),d.setInitialPosition()):r.bottom>i.bottom?(d.debug("Bottom fixed rail has reached bottom of container"),d.bindBottom()):a&&d.set.scroll(c)):d.is.bottom()&&(h.pushing?d.is.bound()&&r.bottom<i.bottom&&(d.debug("Fixing bottom attached element to bottom of browser."),d.fixBottom()):d.is.bound()&&r.top<i.bottom-o.height&&(d.debug("Fixing bottom attached element to top of browser."),d.fixTop())))},bindTop:function(){d.debug("Binding element to top of parent container"),d.remove.offset(),C.css("left","").css("top","").css("margin-bottom","").removeClass(b.fixed).removeClass(b.bottom).addClass(b.bound).addClass(b.top),h.onTop.call(P),h.onUnstick.call(P)},bindBottom:function(){d.debug("Binding element to bottom of parent container"),d.remove.offset(),C.css("left","").css("top","").css("margin-bottom",d.cache.context.bottomPadding).removeClass(b.fixed).removeClass(b.top).addClass(b.bound).addClass(b.bottom),h.onBottom.call(P),h.onUnstick.call(P)},setInitialPosition:function(){d.unfix(),d.unbind()},fixTop:function(){d.debug("Fixing element to top of page"),d.set.offset(),C.css("left",d.cache.element.left).css("bottom","").removeClass(b.bound).removeClass(b.bottom).addClass(b.fixed).addClass(b.top),h.onStick.call(P)},fixBottom:function(){d.debug("Sticking element to bottom of page"),d.set.offset(),C.css("left",d.cache.element.left).css("bottom","").removeClass(b.bound).removeClass(b.top).addClass(b.fixed).addClass(b.bottom),h.onStick.call(P)},unbind:function(){d.debug("Removing absolute position on element"),d.remove.offset(),C.removeClass(b.bound).removeClass(b.top).removeClass(b.bottom)},unfix:function(){d.debug("Removing fixed position on element"),d.remove.offset(),C.removeClass(b.fixed).removeClass(b.top).removeClass(b.bottom),h.onUnstick.call(P)},reset:function(){d.debug("Reseting elements position"),d.unbind(),d.unfix(),d.resetCSS()},resetCSS:function(){C.css({top:"",bottom:"",width:"",height:""}),y.css({height:""})},setting:function(t,o){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(o===n)return h[t];h[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(o===n)return d[t];d[t]=o}},debug:function(){h.debug&&(h.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,h.name+":"),d.debug.apply(console,arguments)))},verbose:function(){h.verbose&&h.debug&&(h.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),d.verbose.apply(console,arguments)))},error:function(){d.error=Function.prototype.bind.call(console.error,console,h.name+":"),d.error.apply(console,arguments)},performance:{log:function(e){var t,o,n;h.performance&&(t=(new Date).getTime(),n=c||t,o=t-n,c=t,a.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":o})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,0)},display:function(){var t=h.name+":",o=0;c=!1,clearTimeout(d.performance.timer),e.each(a,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==n||console.table!==n)&&a.length>0&&(console.table||e.each(a,function(){}),console.groupEnd()),a=[]}},invoke:function(t,o,s){var r,c,a,l=w;return o=o||m,s=P||s,"string"==typeof t&&l!==n&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(o,i){var s=o!=r?i+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(l[s])&&o!=r)l=l[s];else{if(l[s]!==n)return c=l[s],!1;if(!e.isPlainObject(l[i])||o==r)return l[i]!==n?(c=l[i],!1):!1;l=l[i]}})),e.isFunction(c)?a=c.apply(s,o):c!==n&&(a=c),e.isArray(i)?i.push(a):i!==n?i=[i,a]:a!==n&&(i=a),c}},f?(w===n&&d.initialize(),d.invoke(l)):(w!==n&&w.invoke("destroy"),d.initialize())}),i!==n?i:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!1,performance:!1,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,observeChanges:!0,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document);