!function(e,t,n,r){"use strict";e.fn.progress=function(t){var a,o=e(this),i=o.selector||"",s=(new Date).getTime(),c=[],l=arguments[0],u="string"==typeof l,v=[].slice.call(arguments,1);return o.each(function(){var o,g,d=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),p=d.className,m=d.metadata,b=d.namespace,f=d.selector,h=d.error,w="."+b,x="module-"+b,y=e(this),C=e(this).find(f.bar),T=e(this).find(f.progress),A=e(this).find(f.label),S=this,E=y.data(x),I=!1;g={initialize:function(){g.debug("Initializing progress bar",d),o=g.get.transitionEnd(),g.read.metadata(),g.set.duration(),g.set.initials(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of progress",g),E=g,y.data(x,g)},destroy:function(){g.verbose("Destroying previous progress for",y),clearInterval(E.interval),g.remove.state(),y.removeData(x),E=r},reset:function(){g.set.percent(0)},complete:function(){(g.percent===r||g.percent<100)&&g.set.percent(100)},read:{metadata:function(){y.data(m.percent)&&(g.verbose("Current percent value set from metadata"),g.percent=y.data(m.percent)),y.data(m.total)&&(g.verbose("Total value set from metadata"),g.total=y.data(m.total)),y.data(m.value)&&(g.verbose("Current value set from metadata"),g.value=y.data(m.value))},currentValue:function(){return g.value!==r?g.value:!1}},increment:function(e){var t,n,r,a=g.total||!1;a?(n=g.value||0,e=e||1,r=n+e,t=g.total,g.debug("Incrementing value by",e,n,t),r>t&&(g.debug("Value cannot increment above total",t),r=t),g.set.progress(r)):(n=g.percent||0,e=e||g.get.randomValue(),r=n+e,t=100,g.debug("Incrementing percentage by",e,n),r>t&&(g.debug("Value cannot increment above 100 percent"),r=t),g.set.progress(r))},decrement:function(e){var t,n,r=g.total||!1,a=0;r?(t=g.value||0,e=e||1,n=t-e,g.debug("Decrementing value by",e,t)):(t=g.percent||0,e=e||g.get.randomValue(),n=t-e,g.debug("Decrementing percentage by",e,t)),a>n&&(g.debug("Value cannot decrement below 0"),n=0),g.set.progress(n)},get:{text:function(e){var t=g.value||0,n=g.total||0,r=g.is.visible()&&I?g.get.displayPercent():g.percent||0,a=g.total>0?n-t:100-r;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",a).replace("{percent}",r),g.debug("Adding variables to progress bar text",e),e},randomValue:function(){return g.debug("Generating random increment percentage"),Math.floor(Math.random()*d.random.max+d.random.min)},transitionEnd:function(){var e,t=n.createElement("element"),a={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in a)if(t.style[e]!==r)return a[e]},displayPercent:function(){var e=C.width(),t=y.width(),n=parseInt(C.css("min-width"),10),r=e>n?e/t*100:g.percent;return Math.round(0===d.precision?r:10*r*d.precision/(10*d.precision))},percent:function(){return g.percent||0},value:function(){return g.value||!1},total:function(){return g.total||!1}},is:{success:function(){return y.hasClass(p.success)},warning:function(){return y.hasClass(p.warning)},error:function(){return y.hasClass(p.error)},active:function(){return y.hasClass(p.active)},visible:function(){return y.is(":visible")}},remove:{state:function(){g.verbose("Removing stored state"),delete g.total,delete g.percent,delete g.value},active:function(){g.verbose("Removing active state"),y.removeClass(p.active)},success:function(){g.verbose("Removing success state"),y.removeClass(p.success)},warning:function(){g.verbose("Removing warning state"),y.removeClass(p.warning)},error:function(){g.verbose("Removing error state"),y.removeClass(p.error)}},set:{barWidth:function(e){e>100?g.error(h.tooHigh,e):0>e?g.error(h.tooLow,e):(C.css("width",e+"%"),y.attr("data-percent",parseInt(e,10)))},duration:function(e){e=e||d.duration,e="number"==typeof e?e+"ms":e,g.verbose("Setting progress bar transition duration",e),C.css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},initials:function(){d.total!==!1&&(g.verbose("Current total set in settings",d.total),g.total=d.total),d.value!==!1&&(g.verbose("Current value set in settings",d.value),g.value=d.value),d.percent!==!1&&(g.verbose("Current percent set in settings",d.percent),g.percent=d.percent),g.percent!==r?g.set.percent(g.percent):g.value!==r&&g.set.progress(g.value)},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e>0&&1>e&&(g.verbose("Module percentage passed as decimal, converting"),e=100*e),e=Math.round(0===d.precision?e:10*e*d.precision/(10*d.precision)),g.percent=e,g.total?g.value=Math.round(e/100*g.total):d.limitValues&&(g.value=g.value>100?100:g.value<0?0:g.value),g.set.barWidth(e),g.is.visible()&&g.set.labelInterval(),g.set.labels(),d.onChange.call(S,e,g.value,g.total)},labelInterval:function(){var e=function(){g.verbose("Bar finished animating, removing continuous label updates"),clearInterval(g.interval),I=!1,g.set.labels()};clearInterval(g.interval),C.one(o+w,e),g.timer=setTimeout(e,d.duration+100),I=!0,g.interval=setInterval(g.set.labels,d.framerate)},labels:function(){g.verbose("Setting both bar progress and outer label text"),g.set.barLabel(),g.set.state()},label:function(e){e=e||"",e&&(e=g.get.text(e),g.debug("Setting label to text",e),A.text(e))},state:function(e){e=e!==r?e:g.percent,100===e?!d.autoSuccess||g.is.warning()||g.is.error()?(g.verbose("Reached 100% removing active state"),g.remove.active()):(g.set.success(),g.debug("Automatically triggering success at 100%")):e>0?(g.verbose("Adjusting active progress bar label",e),g.set.active()):(g.remove.active(),g.set.label(d.text.active))},barLabel:function(e){e!==r?T.text(g.get.text(e)):"ratio"==d.label&&g.total?(g.debug("Adding ratio to bar label"),T.text(g.get.text(d.text.ratio))):"percent"==d.label&&(g.debug("Adding percentage to bar label"),T.text(g.get.text(d.text.percent)))},active:function(e){e=e||d.text.active,g.debug("Setting active state"),d.showActivity&&!g.is.active()&&y.addClass(p.active),g.remove.warning(),g.remove.error(),g.remove.success(),e&&g.set.label(e),d.onActive.call(S,g.value,g.total)},success:function(e){e=e||d.text.success,g.debug("Setting success state"),y.addClass(p.success),g.remove.active(),g.remove.warning(),g.remove.error(),g.complete(),e&&g.set.label(e),d.onSuccess.call(S,g.total)},warning:function(e){e=e||d.text.warning,g.debug("Setting warning state"),y.addClass(p.warning),g.remove.active(),g.remove.success(),g.remove.error(),g.complete(),e&&g.set.label(e),d.onWarning.call(S,g.value,g.total)},error:function(e){e=e||d.text.error,g.debug("Setting error state"),y.addClass(p.error),g.remove.active(),g.remove.success(),g.remove.warning(),g.complete(),e&&g.set.label(e),d.onError.call(S,g.value,g.total)},total:function(e){g.total=e},progress:function(e){var t,n="string"==typeof e?""!==e.replace(/[^\d.]/g,"")?+e.replace(/[^\d.]/g,""):!1:e;n===!1&&g.error(h.nonNumeric,e),g.total?(g.value=n,t=n/g.total*100,g.debug("Calculating percent complete from total",t),g.set.percent(t)):(t=n,g.debug("Setting value to exact percentage value",t),g.set.percent(t))}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,d,t);else{if(n===r)return d[t];d[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===r)return g[t];g[t]=n}},debug:function(){d.debug&&(d.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,d.name+":"),g.debug.apply(console,arguments)))},verbose:function(){d.verbose&&d.debug&&(d.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,d.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n,r;d.performance&&(t=(new Date).getTime(),r=s||t,n=t-r,s=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,100)},display:function(){var t=d.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",i&&(t+=" '"+i+"'"),(console.group!==r||console.table!==r)&&c.length>0&&(console.table||e.each(c,function(){}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var i,s,c,l=E;return n=n||v,o=S||o,"string"==typeof t&&l!==r&&(t=t.split(/[\. ]/),i=t.length-1,e.each(t,function(n,a){var o=n!=i?a+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=i)l=l[o];else{if(l[o]!==r)return s=l[o],!1;if(!e.isPlainObject(l[a])||n==i)return l[a]!==r?(s=l[a],!1):(g.error(h.method,t),!1);l=l[a]}})),e.isFunction(s)?c=s.apply(o,n):s!==r&&(c=s),e.isArray(a)?a.push(c):a!==r?a=[a,c]:c!==r&&(a=c),s}},u?(E===r&&g.initialize(),g.invoke(l)):(E!==r&&E.invoke("destroy"),g.initialize())}),a!==r?a:this},e.fn.progress.settings={name:"Progress",namespace:"progress",debug:!1,verbose:!0,performance:!0,random:{min:2,max:5},duration:300,autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:1,framerate:1e3/30,percent:!1,total:!1,value:!1,onChange:function(){},onSuccess:function(){},onActive:function(){},onError:function(){},onWarning:function(){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document);