/**
 * Created by Norbert on 2017-06-08.
 */
if (window.$conpeek) {
    alert('Only one plugin allowed');
    throw new Error("Only one plugin allowed'");
} else {
    (function (window) {
        var c = window.$conpeek = (function () {
            var c = (function () {
                function c() {
                    var method = arguments[0];
                    for (var n = arguments.length, k = Array(), o = 1; o < n; o++) k[o - 1] = arguments[o];

                    if (!method) {
                        throw new Error("Method is required");
                    }
                    var m = c.api.methods[method];
                    if (!m || {}.toString.call(m) !== '[object Function]') {
                        return console.error("Method " + method + " not implemented. Check the version of plugin.");
                    }
                    try {
                        return c.api.methods[method].apply(null, k);
                    } catch (e) {
                        console.error(e)
                    }
                }

                return c;
            }());
            return c;
        }());

        c.plugin_url = null;
        c.plugin_uuid = null;
        c.params = {
            //self configuration
            token: null,
            wss_uri: null,
            https_uri: null,
            audio_permission: false,
            video_permission: false,
            reconnected: false,
            reconnected_target: null,
            domain: null,
            //process configuration
            context: null,

            // current target
            target: null,
            color: null,
            default_language: null,
            audio_enabled: false,
            video_enabled: false,
            chat_enabled: false,
            webmessage_enabled: false,
            callme_days_range: [],
            connect_enabled: false,
            callme_enabled: false,
            geolocation_enabled: false,
            // inv
            invitation_link_enabled: 0,
            invitation_link_show_mode: 'MODAL',
            invitation_link: false,
            // snapshot
            snapshot_frame_enabled: false,
            snapshot_frames: [],
            // media tag
            media_tag: null,
            // if audio and audio tag
            audio_media_tag: null,
            // if video and video tag
            video_media_tag: null
        };
        c.message_queue = [];
        c.available_media = [];
        c.network_connection_status = false;

        c.__setNetworkConnectionStatus = function (status) {
            c.network_connection_status = status;
        };

        c.getNetworkConnectionStatus = function () {
            return c.network_connection_status;
        };


        c.checkInvitationLink = function (callback) {
            var invitation_key = c.getInvitationLinkKey();
            if (c.params.invitation_link_enabled === 1 && invitation_key) {
                var data = {
                    'invitation_key': invitation_key
                };
                $.ajax({
                    async: true,
                    method: "POST",
                    url: window.conpeek_config.plugin_url + '/invitation_link',
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        'Authorization': c.params.token
                    },
                    data: JSON.stringify(data),
                    success: function (body) {
                        callback(true, body);
                    },
                    error: function () {
                        console.error("Wrong invitation link");
                    }
                });
            } else {
                return callback(false);
            }
        };

        c.getInvitationLinkKey = function () {
            var getParams = document.URL.split("?"),
                params = c.util.__fromQueryString(getParams[getParams.length - 1]);
            if (params['cp_il_key']) {
                return params['cp_il_key'];
            }
            return null;
        };

        c.setInvitationLink = function (value) {
            c.params.invitation_link = value;
        };

        c.setMediaTag = function (tag) {
            c.params.media_tag = tag;
        };

        c.setAudioMediaTag = function (tag) {
            c.params.audio_media_tag = tag;
        };

        c.setVideoMediaTag = function (tag) {
            c.params.video_media_tag = tag;
        };

        c.ready = function (callback) {
            return c.jquery(callback);
        };

    }(window));
}/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});
window.$conpeek.jquery = window.jQuery.noConflict(true);/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return String(o);}
if(type==='string'){return $.quoteString(o);}
if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
return'['+pairs.join(',')+']';}
if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';};}(window.$conpeek.jquery));(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.adapter = f()
    }
})(function () {
    var define, module, exports;
    return (function () {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = n[i] = {exports: {}};
                    e[i][0].call(p.exports, function (r) {
                        var n = e[i][1][r];
                        return o(n || r)
                    }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }

            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }

        return r
    })()({
        1: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */

            'use strict';

            var _adapter_factory = require('./adapter_factory.js');

            var adapter = (0, _adapter_factory.adapterFactory)({window: window});
            module.exports = adapter; // this is the difference from adapter_core.

        }, {"./adapter_factory.js": 2}], 2: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.adapterFactory = adapterFactory;

            var _utils = require('./utils');

            var utils = _interopRequireWildcard(_utils);

            var _chrome_shim = require('./chrome/chrome_shim');

            var chromeShim = _interopRequireWildcard(_chrome_shim);

            var _edge_shim = require('./edge/edge_shim');

            var edgeShim = _interopRequireWildcard(_edge_shim);

            var _firefox_shim = require('./firefox/firefox_shim');

            var firefoxShim = _interopRequireWildcard(_firefox_shim);

            var _safari_shim = require('./safari/safari_shim');

            var safariShim = _interopRequireWildcard(_safari_shim);

            var _common_shim = require('./common_shim');

            var commonShim = _interopRequireWildcard(_common_shim);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

// Shimming starts here.
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            function adapterFactory() {
                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    window = _ref.window;

                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                    shimChrome: true,
                    shimFirefox: true,
                    shimEdge: true,
                    shimSafari: true
                };

                // Utils.
                var logging = utils.log;
                var browserDetails = utils.detectBrowser(window);

                var adapter = {
                    browserDetails: browserDetails,
                    commonShim: commonShim,
                    extractVersion: utils.extractVersion,
                    disableLog: utils.disableLog,
                    disableWarnings: utils.disableWarnings
                };

                // Shim browser if found.
                switch (browserDetails.browser) {
                    case 'chrome':
                        if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                            logging('Chrome shim is not included in this adapter release.');
                            return adapter;
                        }
                        if (browserDetails.version === null) {
                            logging('Chrome shim can not determine version, not shimming.');
                            return adapter;
                        }
                        logging('adapter.js shimming chrome.');
                        // Export to the adapter global object visible in the browser.
                        adapter.browserShim = chromeShim;

                        chromeShim.shimGetUserMedia(window);
                        chromeShim.shimMediaStream(window);
                        chromeShim.shimPeerConnection(window);
                        chromeShim.shimOnTrack(window);
                        chromeShim.shimAddTrackRemoveTrack(window);
                        chromeShim.shimGetSendersWithDtmf(window);
                        chromeShim.shimGetStats(window);
                        chromeShim.shimSenderReceiverGetStats(window);
                        chromeShim.fixNegotiationNeeded(window);

                        commonShim.shimRTCIceCandidate(window);
                        commonShim.shimConnectionState(window);
                        commonShim.shimMaxMessageSize(window);
                        commonShim.shimSendThrowTypeError(window);
                        commonShim.removeAllowExtmapMixed(window);
                        break;
                    case 'firefox':
                        if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                            logging('Firefox shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming firefox.');
                        // Export to the adapter global object visible in the browser.
                        adapter.browserShim = firefoxShim;

                        firefoxShim.shimGetUserMedia(window);
                        firefoxShim.shimPeerConnection(window);
                        firefoxShim.shimOnTrack(window);
                        firefoxShim.shimRemoveStream(window);
                        firefoxShim.shimSenderGetStats(window);
                        firefoxShim.shimReceiverGetStats(window);
                        firefoxShim.shimRTCDataChannel(window);
                        firefoxShim.shimAddTransceiver(window);
                        firefoxShim.shimGetParameters(window);
                        firefoxShim.shimCreateOffer(window);
                        firefoxShim.shimCreateAnswer(window);

                        commonShim.shimRTCIceCandidate(window);
                        commonShim.shimConnectionState(window);
                        commonShim.shimMaxMessageSize(window);
                        commonShim.shimSendThrowTypeError(window);
                        break;
                    case 'edge':
                        if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                            logging('MS edge shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming edge.');
                        // Export to the adapter global object visible in the browser.
                        adapter.browserShim = edgeShim;

                        edgeShim.shimGetUserMedia(window);
                        edgeShim.shimGetDisplayMedia(window);
                        edgeShim.shimPeerConnection(window);
                        edgeShim.shimReplaceTrack(window);

                        // the edge shim implements the full RTCIceCandidate object.

                        commonShim.shimMaxMessageSize(window);
                        commonShim.shimSendThrowTypeError(window);
                        break;
                    case 'safari':
                        if (!safariShim || !options.shimSafari) {
                            logging('Safari shim is not included in this adapter release.');
                            return adapter;
                        }
                        logging('adapter.js shimming safari.');
                        // Export to the adapter global object visible in the browser.
                        adapter.browserShim = safariShim;

                        safariShim.shimRTCIceServerUrls(window);
                        safariShim.shimCreateOfferLegacy(window);
                        safariShim.shimCallbacksAPI(window);
                        safariShim.shimLocalStreamsAPI(window);
                        safariShim.shimRemoteStreamsAPI(window);
                        safariShim.shimTrackEventTransceiver(window);
                        safariShim.shimGetUserMedia(window);
                        safariShim.shimAudioContext(window);

                        commonShim.shimRTCIceCandidate(window);
                        commonShim.shimMaxMessageSize(window);
                        commonShim.shimSendThrowTypeError(window);
                        commonShim.removeAllowExtmapMixed(window);
                        break;
                    default:
                        logging('Unsupported browser!');
                        break;
                }

                return adapter;
            }

// Browser shims.

        }, {"./chrome/chrome_shim": 3, "./common_shim": 6, "./edge/edge_shim": 7, "./firefox/firefox_shim": 11, "./safari/safari_shim": 14, "./utils": 15}], 3: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _getusermedia = require('./getusermedia');

            Object.defineProperty(exports, 'shimGetUserMedia', {
                enumerable: true,
                get: function get() {
                    return _getusermedia.shimGetUserMedia;
                }
            });

            var _getdisplaymedia = require('./getdisplaymedia');

            Object.defineProperty(exports, 'shimGetDisplayMedia', {
                enumerable: true,
                get: function get() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            exports.shimMediaStream = shimMediaStream;
            exports.shimOnTrack = shimOnTrack;
            exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
            exports.shimGetStats = shimGetStats;
            exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
            exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
            exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.fixNegotiationNeeded = fixNegotiationNeeded;

            var _utils = require('../utils.js');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
                } else {
                    obj[key] = value;
                }
                return obj;
            }

            function shimMediaStream(window) {
                window.MediaStream = window.MediaStream || window.webkitMediaStream;
            }

            function shimOnTrack(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
                        get: function get() {
                            return this._ontrack;
                        },
                        set: function set(f) {
                            if (this._ontrack) {
                                this.removeEventListener('track', this._ontrack);
                            }
                            this.addEventListener('track', this._ontrack = f);
                        },

                        enumerable: true,
                        configurable: true
                    });
                    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                        var _this = this;

                        if (!this._ontrackpoly) {
                            this._ontrackpoly = function (e) {
                                // onaddstream does not fire when a track is added to an existing
                                // stream. But stream.onaddtrack is implemented so we use that.
                                e.stream.addEventListener('addtrack', function (te) {
                                    var receiver = void 0;
                                    if (window.RTCPeerConnection.prototype.getReceivers) {
                                        receiver = _this.getReceivers().find(function (r) {
                                            return r.track && r.track.id === te.track.id;
                                        });
                                    } else {
                                        receiver = {track: te.track};
                                    }

                                    var event = new Event('track');
                                    event.track = te.track;
                                    event.receiver = receiver;
                                    event.transceiver = {receiver: receiver};
                                    event.streams = [e.stream];
                                    _this.dispatchEvent(event);
                                });
                                e.stream.getTracks().forEach(function (track) {
                                    var receiver = void 0;
                                    if (window.RTCPeerConnection.prototype.getReceivers) {
                                        receiver = _this.getReceivers().find(function (r) {
                                            return r.track && r.track.id === track.id;
                                        });
                                    } else {
                                        receiver = {track: track};
                                    }
                                    var event = new Event('track');
                                    event.track = track;
                                    event.receiver = receiver;
                                    event.transceiver = {receiver: receiver};
                                    event.streams = [e.stream];
                                    _this.dispatchEvent(event);
                                });
                            };
                            this.addEventListener('addstream', this._ontrackpoly);
                        }
                        return origSetRemoteDescription.apply(this, arguments);
                    };
                } else {
                    // even if RTCRtpTransceiver is in window, it is only used and
                    // emitted in unified-plan. Unfortunately this means we need
                    // to unconditionally wrap the event.
                    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
                        if (!e.transceiver) {
                            Object.defineProperty(e, 'transceiver', {value: {receiver: e.receiver}});
                        }
                        return e;
                    });
                }
            }

            function shimGetSendersWithDtmf(window) {
                // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
                    var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
                        return {
                            track: track,
                            get dtmf() {
                                if (this._dtmf === undefined) {
                                    if (track.kind === 'audio') {
                                        this._dtmf = pc.createDTMFSender(track);
                                    } else {
                                        this._dtmf = null;
                                    }
                                }
                                return this._dtmf;
                            },
                            _pc: pc
                        };
                    };

                    // augment addTrack when getSenders is not available.
                    if (!window.RTCPeerConnection.prototype.getSenders) {
                        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                            this._senders = this._senders || [];
                            return this._senders.slice(); // return a copy of the internal state.
                        };
                        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                            var sender = origAddTrack.apply(this, arguments);
                            if (!sender) {
                                sender = shimSenderWithDtmf(this, track);
                                this._senders.push(sender);
                            }
                            return sender;
                        };

                        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                            origRemoveTrack.apply(this, arguments);
                            var idx = this._senders.indexOf(sender);
                            if (idx !== -1) {
                                this._senders.splice(idx, 1);
                            }
                        };
                    }
                    var origAddStream = window.RTCPeerConnection.prototype.addStream;
                    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                        var _this2 = this;

                        this._senders = this._senders || [];
                        origAddStream.apply(this, [stream]);
                        stream.getTracks().forEach(function (track) {
                            _this2._senders.push(shimSenderWithDtmf(_this2, track));
                        });
                    };

                    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                        var _this3 = this;

                        this._senders = this._senders || [];
                        origRemoveStream.apply(this, [stream]);

                        stream.getTracks().forEach(function (track) {
                            var sender = _this3._senders.find(function (s) {
                                return s.track === track;
                            });
                            if (sender) {
                                // remove sender
                                _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                            }
                        });
                    };
                } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                        var _this4 = this;

                        var senders = origGetSenders.apply(this, []);
                        senders.forEach(function (sender) {
                            return sender._pc = _this4;
                        });
                        return senders;
                    };

                    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                        get: function get() {
                            if (this._dtmf === undefined) {
                                if (this.track.kind === 'audio') {
                                    this._dtmf = this._pc.createDTMFSender(this.track);
                                } else {
                                    this._dtmf = null;
                                }
                            }
                            return this._dtmf;
                        }
                    });
                }
            }

            function shimGetStats(window) {
                if (!window.RTCPeerConnection) {
                    return;
                }

                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    var _this5 = this;

                    var _arguments = Array.prototype.slice.call(arguments),
                        selector = _arguments[0],
                        onSucc = _arguments[1],
                        onErr = _arguments[2];

                    // If selector is a function then we are in the old style stats so just
                    // pass back the original getStats format to avoid breaking old users.


                    if (arguments.length > 0 && typeof selector === 'function') {
                        return origGetStats.apply(this, arguments);
                    }

                    // When spec-style getStats is supported, return those when called with
                    // either no arguments or the selector argument is null.
                    if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
                        return origGetStats.apply(this, []);
                    }

                    var fixChromeStats_ = function fixChromeStats_(response) {
                        var standardReport = {};
                        var reports = response.result();
                        reports.forEach(function (report) {
                            var standardStats = {
                                id: report.id,
                                timestamp: report.timestamp,
                                type: {
                                    localcandidate: 'local-candidate',
                                    remotecandidate: 'remote-candidate'
                                }[report.type] || report.type
                            };
                            report.names().forEach(function (name) {
                                standardStats[name] = report.stat(name);
                            });
                            standardReport[standardStats.id] = standardStats;
                        });

                        return standardReport;
                    };

                    // shim getStats with maplike support
                    var makeMapStats = function makeMapStats(stats) {
                        return new Map(Object.keys(stats).map(function (key) {
                            return [key, stats[key]];
                        }));
                    };

                    if (arguments.length >= 2) {
                        var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                            onSucc(makeMapStats(fixChromeStats_(response)));
                        };

                        return origGetStats.apply(this, [successCallbackWrapper_, selector]);
                    }

                    // promise-support
                    return new Promise(function (resolve, reject) {
                        origGetStats.apply(_this5, [function (response) {
                            resolve(makeMapStats(fixChromeStats_(response)));
                        }, reject]);
                    }).then(onSucc, onErr);
                };
            }

            function shimSenderReceiverGetStats(window) {
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
                    return;
                }

                // shim sender stats.
                if (!('getStats' in window.RTCRtpSender.prototype)) {
                    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                    if (origGetSenders) {
                        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                            var _this6 = this;

                            var senders = origGetSenders.apply(this, []);
                            senders.forEach(function (sender) {
                                return sender._pc = _this6;
                            });
                            return senders;
                        };
                    }

                    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                    if (origAddTrack) {
                        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                            var sender = origAddTrack.apply(this, arguments);
                            sender._pc = this;
                            return sender;
                        };
                    }
                    window.RTCRtpSender.prototype.getStats = function getStats() {
                        var sender = this;
                        return this._pc.getStats().then(function (result) {
                            return (
                                /* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */
                                utils.filterStats(result, sender.track, true)
                            );
                        });
                    };
                }

                // shim receiver stats.
                if (!('getStats' in window.RTCRtpReceiver.prototype)) {
                    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                    if (origGetReceivers) {
                        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                            var _this7 = this;

                            var receivers = origGetReceivers.apply(this, []);
                            receivers.forEach(function (receiver) {
                                return receiver._pc = _this7;
                            });
                            return receivers;
                        };
                    }
                    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
                        e.receiver._pc = e.srcElement;
                        return e;
                    });
                    window.RTCRtpReceiver.prototype.getStats = function getStats() {
                        var receiver = this;
                        return this._pc.getStats().then(function (result) {
                            return utils.filterStats(result, receiver.track, false);
                        });
                    };
                }

                if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
                    return;
                }

                // shim RTCPeerConnection.getStats(track).
                var origGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
                        var track = arguments[0];
                        var sender = void 0;
                        var receiver = void 0;
                        var err = void 0;
                        this.getSenders().forEach(function (s) {
                            if (s.track === track) {
                                if (sender) {
                                    err = true;
                                } else {
                                    sender = s;
                                }
                            }
                        });
                        this.getReceivers().forEach(function (r) {
                            if (r.track === track) {
                                if (receiver) {
                                    err = true;
                                } else {
                                    receiver = r;
                                }
                            }
                            return r.track === track;
                        });
                        if (err || sender && receiver) {
                            return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
                        } else if (sender) {
                            return sender.getStats();
                        } else if (receiver) {
                            return receiver.getStats();
                        }
                        return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
                    }
                    return origGetStats.apply(this, arguments);
                };
            }

            function shimAddTrackRemoveTrackWithNative(window) {
                // shim addTrack/removeTrack with native variants in order to make
                // the interactions with legacy getLocalStreams behave as in other browsers.
                // Keeps a mapping stream.id => [stream, rtpsenders...]
                window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                    var _this8 = this;

                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
                        return _this8._shimmedLocalStreams[streamId][0];
                    });
                };

                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                    if (!stream) {
                        return origAddTrack.apply(this, arguments);
                    }
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                    var sender = origAddTrack.apply(this, arguments);
                    if (!this._shimmedLocalStreams[stream.id]) {
                        this._shimmedLocalStreams[stream.id] = [stream, sender];
                    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
                        this._shimmedLocalStreams[stream.id].push(sender);
                    }
                    return sender;
                };

                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                    var _this9 = this;

                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

                    stream.getTracks().forEach(function (track) {
                        var alreadyExists = _this9.getSenders().find(function (s) {
                            return s.track === track;
                        });
                        if (alreadyExists) {
                            throw new DOMException('Track already exists.', 'InvalidAccessError');
                        }
                    });
                    var existingSenders = this.getSenders();
                    origAddStream.apply(this, arguments);
                    var newSenders = this.getSenders().filter(function (newSender) {
                        return existingSenders.indexOf(newSender) === -1;
                    });
                    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
                };

                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    delete this._shimmedLocalStreams[stream.id];
                    return origRemoveStream.apply(this, arguments);
                };

                var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                    var _this10 = this;

                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                    if (sender) {
                        Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
                            var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
                            if (idx !== -1) {
                                _this10._shimmedLocalStreams[streamId].splice(idx, 1);
                            }
                            if (_this10._shimmedLocalStreams[streamId].length === 1) {
                                delete _this10._shimmedLocalStreams[streamId];
                            }
                        });
                    }
                    return origRemoveTrack.apply(this, arguments);
                };
            }

            function shimAddTrackRemoveTrack(window) {
                if (!window.RTCPeerConnection) {
                    return;
                }
                var browserDetails = utils.detectBrowser(window);
                // shim addTrack and removeTrack.
                if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
                    return shimAddTrackRemoveTrackWithNative(window);
                }

                // also shim pc.getLocalStreams when addTrack is shimmed
                // to return the original streams.
                var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
                window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                    var _this11 = this;

                    var nativeStreams = origGetLocalStreams.apply(this);
                    this._reverseStreams = this._reverseStreams || {};
                    return nativeStreams.map(function (stream) {
                        return _this11._reverseStreams[stream.id];
                    });
                };

                var origAddStream = window.RTCPeerConnection.prototype.addStream;
                window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                    var _this12 = this;

                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};

                    stream.getTracks().forEach(function (track) {
                        var alreadyExists = _this12.getSenders().find(function (s) {
                            return s.track === track;
                        });
                        if (alreadyExists) {
                            throw new DOMException('Track already exists.', 'InvalidAccessError');
                        }
                    });
                    // Add identity mapping for consistency with addTrack.
                    // Unless this is being used with a stream from addTrack.
                    if (!this._reverseStreams[stream.id]) {
                        var newStream = new window.MediaStream(stream.getTracks());
                        this._streams[stream.id] = newStream;
                        this._reverseStreams[newStream.id] = stream;
                        stream = newStream;
                    }
                    origAddStream.apply(this, [stream]);
                };

                var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};

                    origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
                    delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
                    delete this._streams[stream.id];
                };

                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                    var _this13 = this;

                    if (this.signalingState === 'closed') {
                        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                    }
                    var streams = [].slice.call(arguments, 1);
                    if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
                        return t === track;
                    })) {
                        // this is not fully correct but all we can manage without
                        // [[associated MediaStreams]] internal slot.
                        throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
                    }

                    var alreadyExists = this.getSenders().find(function (s) {
                        return s.track === track;
                    });
                    if (alreadyExists) {
                        throw new DOMException('Track already exists.', 'InvalidAccessError');
                    }

                    this._streams = this._streams || {};
                    this._reverseStreams = this._reverseStreams || {};
                    var oldStream = this._streams[stream.id];
                    if (oldStream) {
                        // this is using odd Chrome behaviour, use with caution:
                        // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
                        // Note: we rely on the high-level addTrack/dtmf shim to
                        // create the sender with a dtmf sender.
                        oldStream.addTrack(track);

                        // Trigger ONN async.
                        Promise.resolve().then(function () {
                            _this13.dispatchEvent(new Event('negotiationneeded'));
                        });
                    } else {
                        var newStream = new window.MediaStream([track]);
                        this._streams[stream.id] = newStream;
                        this._reverseStreams[newStream.id] = stream;
                        this.addStream(newStream);
                    }
                    return this.getSenders().find(function (s) {
                        return s.track === track;
                    });
                };

                // replace the internal stream id with the external one and
                // vice versa.
                function replaceInternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }

                function replaceExternalStreamId(pc, description) {
                    var sdp = description.sdp;
                    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
                        var externalStream = pc._reverseStreams[internalId];
                        var internalStream = pc._streams[externalStream.id];
                        sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
                    });
                    return new RTCSessionDescription({
                        type: description.type,
                        sdp: sdp
                    });
                }

                ['createOffer', 'createAnswer'].forEach(function (method) {
                    var nativeMethod = window.RTCPeerConnection.prototype[method];
                    var methodObj = _defineProperty({}, method, function () {
                        var _this14 = this;

                        var args = arguments;
                        var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
                        if (isLegacyCall) {
                            return nativeMethod.apply(this, [function (description) {
                                var desc = replaceInternalStreamId(_this14, description);
                                args[0].apply(null, [desc]);
                            }, function (err) {
                                if (args[1]) {
                                    args[1].apply(null, err);
                                }
                            }, arguments[2]]);
                        }
                        return nativeMethod.apply(this, arguments).then(function (description) {
                            return replaceInternalStreamId(_this14, description);
                        });
                    });
                    window.RTCPeerConnection.prototype[method] = methodObj[method];
                });

                var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
                window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
                    if (!arguments.length || !arguments[0].type) {
                        return origSetLocalDescription.apply(this, arguments);
                    }
                    arguments[0] = replaceExternalStreamId(this, arguments[0]);
                    return origSetLocalDescription.apply(this, arguments);
                };

                // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

                var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
                Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
                    get: function get() {
                        var description = origLocalDescription.get.apply(this);
                        if (description.type === '') {
                            return description;
                        }
                        return replaceInternalStreamId(this, description);
                    }
                });

                window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                    var _this15 = this;

                    if (this.signalingState === 'closed') {
                        throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
                    }
                    // We can not yet check for sender instanceof RTCRtpSender
                    // since we shim RTPSender. So we check if sender._pc is set.
                    if (!sender._pc) {
                        throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
                    }
                    var isLocal = sender._pc === this;
                    if (!isLocal) {
                        throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
                    }

                    // Search for the native stream the senders track belongs to.
                    this._streams = this._streams || {};
                    var stream = void 0;
                    Object.keys(this._streams).forEach(function (streamid) {
                        var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
                            return sender.track === track;
                        });
                        if (hasTrack) {
                            stream = _this15._streams[streamid];
                        }
                    });

                    if (stream) {
                        if (stream.getTracks().length === 1) {
                            // if this is the last track of the stream, remove the stream. This
                            // takes care of any shimmed _senders.
                            this.removeStream(this._reverseStreams[stream.id]);
                        } else {
                            // relying on the same odd chrome behaviour as above.
                            stream.removeTrack(sender.track);
                        }
                        this.dispatchEvent(new Event('negotiationneeded'));
                    }
                };
            }

            function shimPeerConnection(window) {
                var browserDetails = utils.detectBrowser(window);

                if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
                    // very basic support for old versions.
                    window.RTCPeerConnection = window.webkitRTCPeerConnection;
                }
                if (!window.RTCPeerConnection) {
                    return;
                }

                var addIceCandidateNullSupported = window.RTCPeerConnection.prototype.addIceCandidate.length === 0;

                // shim implicit creation of RTCSessionDescription/RTCIceCandidate
                if (browserDetails.version < 53) {
                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
                        var nativeMethod = window.RTCPeerConnection.prototype[method];
                        var methodObj = _defineProperty({}, method, function () {
                            arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                            return nativeMethod.apply(this, arguments);
                        });
                        window.RTCPeerConnection.prototype[method] = methodObj[method];
                    });
                }

                // support for addIceCandidate(null or undefined)
                var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
                window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                    if (!addIceCandidateNullSupported && !arguments[0]) {
                        if (arguments[1]) {
                            arguments[1].apply(null);
                        }
                        return Promise.resolve();
                    }
                    // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                    // in older versions. Native support planned for Chrome M77.
                    if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === '') {
                        return Promise.resolve();
                    }
                    return nativeAddIceCandidate.apply(this, arguments);
                };
            }

// Attempt to fix ONN in plan-b mode.
            function fixNegotiationNeeded(window) {
                var browserDetails = utils.detectBrowser(window);
                utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
                    var pc = e.target;
                    if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
                        if (pc.signalingState !== 'stable') {
                            return;
                        }
                    }
                    return e;
                });
            }

        }, {"../utils.js": 15, "./getdisplaymedia": 4, "./getusermedia": 5}], 4: [function (require, module, exports) {
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;

            function shimGetDisplayMedia(window, getSourceId) {
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
                    return;
                }
                if (!window.navigator.mediaDevices) {
                    return;
                }
                // getSourceId is a function that returns a promise resolving with
                // the sourceId of the screen/window/tab to be shared.
                if (typeof getSourceId !== 'function') {
                    console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
                    return;
                }
                window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                    return getSourceId(constraints).then(function (sourceId) {
                        var widthSpecified = constraints.video && constraints.video.width;
                        var heightSpecified = constraints.video && constraints.video.height;
                        var frameRateSpecified = constraints.video && constraints.video.frameRate;
                        constraints.video = {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: sourceId,
                                maxFrameRate: frameRateSpecified || 3
                            }
                        };
                        if (widthSpecified) {
                            constraints.video.mandatory.maxWidth = widthSpecified;
                        }
                        if (heightSpecified) {
                            constraints.video.mandatory.maxHeight = heightSpecified;
                        }
                        return window.navigator.mediaDevices.getUserMedia(constraints);
                    });
                };
            }

        }, {}], 5: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            exports.shimGetUserMedia = shimGetUserMedia;

            var _utils = require('../utils.js');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            var logging = utils.log;

            function shimGetUserMedia(window) {
                var navigator = window && window.navigator;

                if (!navigator.mediaDevices) {
                    return;
                }

                var browserDetails = utils.detectBrowser(window);

                var constraintsToChrome_ = function constraintsToChrome_(c) {
                    if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
                        return c;
                    }
                    var cc = {};
                    Object.keys(c).forEach(function (key) {
                        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                            return;
                        }
                        var r = _typeof(c[key]) === 'object' ? c[key] : {ideal: c[key]};
                        if (r.exact !== undefined && typeof r.exact === 'number') {
                            r.min = r.max = r.exact;
                        }
                        var oldname_ = function oldname_(prefix, name) {
                            if (prefix) {
                                return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                            }
                            return name === 'deviceId' ? 'sourceId' : name;
                        };
                        if (r.ideal !== undefined) {
                            cc.optional = cc.optional || [];
                            var oc = {};
                            if (typeof r.ideal === 'number') {
                                oc[oldname_('min', key)] = r.ideal;
                                cc.optional.push(oc);
                                oc = {};
                                oc[oldname_('max', key)] = r.ideal;
                                cc.optional.push(oc);
                            } else {
                                oc[oldname_('', key)] = r.ideal;
                                cc.optional.push(oc);
                            }
                        }
                        if (r.exact !== undefined && typeof r.exact !== 'number') {
                            cc.mandatory = cc.mandatory || {};
                            cc.mandatory[oldname_('', key)] = r.exact;
                        } else {
                            ['min', 'max'].forEach(function (mix) {
                                if (r[mix] !== undefined) {
                                    cc.mandatory = cc.mandatory || {};
                                    cc.mandatory[oldname_(mix, key)] = r[mix];
                                }
                            });
                        }
                    });
                    if (c.advanced) {
                        cc.optional = (cc.optional || []).concat(c.advanced);
                    }
                    return cc;
                };

                var shimConstraints_ = function shimConstraints_(constraints, func) {
                    if (browserDetails.version >= 61) {
                        return func(constraints);
                    }
                    constraints = JSON.parse(JSON.stringify(constraints));
                    if (constraints && _typeof(constraints.audio) === 'object') {
                        var remap = function remap(obj, a, b) {
                            if (a in obj && !(b in obj)) {
                                obj[b] = obj[a];
                                delete obj[a];
                            }
                        };
                        constraints = JSON.parse(JSON.stringify(constraints));
                        remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
                        remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
                        constraints.audio = constraintsToChrome_(constraints.audio);
                    }
                    if (constraints && _typeof(constraints.video) === 'object') {
                        // Shim facingMode for mobile & surface pro.
                        var face = constraints.video.facingMode;
                        face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : {ideal: face});
                        var getSupportedFacingModeLies = browserDetails.version < 66;

                        if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                            delete constraints.video.facingMode;
                            var matches = void 0;
                            if (face.exact === 'environment' || face.ideal === 'environment') {
                                matches = ['back', 'rear'];
                            } else if (face.exact === 'user' || face.ideal === 'user') {
                                matches = ['front'];
                            }
                            if (matches) {
                                // Look for matches in label, or use last cam for back (typical).
                                return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                                    devices = devices.filter(function (d) {
                                        return d.kind === 'videoinput';
                                    });
                                    var dev = devices.find(function (d) {
                                        return matches.some(function (match) {
                                            return d.label.toLowerCase().includes(match);
                                        });
                                    });
                                    if (!dev && devices.length && matches.includes('back')) {
                                        dev = devices[devices.length - 1]; // more likely the back cam
                                    }
                                    if (dev) {
                                        constraints.video.deviceId = face.exact ? {exact: dev.deviceId} : {ideal: dev.deviceId};
                                    }
                                    constraints.video = constraintsToChrome_(constraints.video);
                                    logging('chrome: ' + JSON.stringify(constraints));
                                    return func(constraints);
                                });
                            }
                        }
                        constraints.video = constraintsToChrome_(constraints.video);
                    }
                    logging('chrome: ' + JSON.stringify(constraints));
                    return func(constraints);
                };

                var shimError_ = function shimError_(e) {
                    if (browserDetails.version >= 64) {
                        return e;
                    }
                    return {
                        name: {
                            PermissionDeniedError: 'NotAllowedError',
                            PermissionDismissedError: 'NotAllowedError',
                            InvalidStateError: 'NotAllowedError',
                            DevicesNotFoundError: 'NotFoundError',
                            ConstraintNotSatisfiedError: 'OverconstrainedError',
                            TrackStartError: 'NotReadableError',
                            MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                            MediaDeviceKillSwitchOn: 'NotAllowedError',
                            TabCaptureError: 'AbortError',
                            ScreenCaptureError: 'AbortError',
                            DeviceCaptureError: 'AbortError'
                        }[e.name] || e.name,
                        message: e.message,
                        constraint: e.constraint || e.constraintName,
                        toString: function toString() {
                            return this.name + (this.message && ': ') + this.message;
                        }
                    };
                };

                var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
                    shimConstraints_(constraints, function (c) {
                        navigator.webkitGetUserMedia(c, onSuccess, function (e) {
                            if (onError) {
                                onError(shimError_(e));
                            }
                        });
                    });
                };
                navigator.getUserMedia = getUserMedia_.bind(navigator);

                // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
                // function which returns a Promise, it does not accept spec-style
                // constraints.
                if (navigator.mediaDevices.getUserMedia) {
                    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function (cs) {
                        return shimConstraints_(cs, function (c) {
                            return origGetUserMedia(c).then(function (stream) {
                                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                                    stream.getTracks().forEach(function (track) {
                                        track.stop();
                                    });
                                    throw new DOMException('', 'NotFoundError');
                                }
                                return stream;
                            }, function (e) {
                                return Promise.reject(shimError_(e));
                            });
                        });
                    };
                }
            }

        }, {"../utils.js": 15}], 6: [function (require, module, exports) {
            /*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            exports.shimRTCIceCandidate = shimRTCIceCandidate;
            exports.shimMaxMessageSize = shimMaxMessageSize;
            exports.shimSendThrowTypeError = shimSendThrowTypeError;
            exports.shimConnectionState = shimConnectionState;
            exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

            var _sdp = require('sdp');

            var _sdp2 = _interopRequireDefault(_sdp);

            var _utils = require('./utils');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function shimRTCIceCandidate(window) {
                // foundation is arbitrarily chosen as an indicator for full support for
                // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
                if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
                    return;
                }

                var NativeRTCIceCandidate = window.RTCIceCandidate;
                window.RTCIceCandidate = function RTCIceCandidate(args) {
                    // Remove the a= which shouldn't be part of the candidate string.
                    if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
                        args = JSON.parse(JSON.stringify(args));
                        args.candidate = args.candidate.substr(2);
                    }

                    if (args.candidate && args.candidate.length) {
                        // Augment the native candidate with the parsed fields.
                        var nativeCandidate = new NativeRTCIceCandidate(args);
                        var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
                        var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

                        // Add a serializer that does not serialize the extra attributes.
                        augmentedCandidate.toJSON = function toJSON() {
                            return {
                                candidate: augmentedCandidate.candidate,
                                sdpMid: augmentedCandidate.sdpMid,
                                sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                                usernameFragment: augmentedCandidate.usernameFragment
                            };
                        };
                        return augmentedCandidate;
                    }
                    return new NativeRTCIceCandidate(args);
                };
                window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

                // Hook up the augmented candidate in onicecandidate and
                // addEventListener('icecandidate', ...)
                utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
                    if (e.candidate) {
                        Object.defineProperty(e, 'candidate', {
                            value: new window.RTCIceCandidate(e.candidate),
                            writable: 'false'
                        });
                    }
                    return e;
                });
            }

            function shimMaxMessageSize(window) {
                if (!window.RTCPeerConnection) {
                    return;
                }
                var browserDetails = utils.detectBrowser(window);

                if (!('sctp' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
                        get: function get() {
                            return typeof this._sctp === 'undefined' ? null : this._sctp;
                        }
                    });
                }

                var sctpInDescription = function sctpInDescription(description) {
                    if (!description || !description.sdp) {
                        return false;
                    }
                    var sections = _sdp2.default.splitSections(description.sdp);
                    sections.shift();
                    return sections.some(function (mediaSection) {
                        var mLine = _sdp2.default.parseMLine(mediaSection);
                        return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
                    });
                };

                var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
                    // TODO: Is there a better solution for detecting Firefox?
                    var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                    if (match === null || match.length < 2) {
                        return -1;
                    }
                    var version = parseInt(match[1], 10);
                    // Test for NaN (yes, this is ugly)
                    return version !== version ? -1 : version;
                };

                var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
                    // Every implementation we know can send at least 64 KiB.
                    // Note: Although Chrome is technically able to send up to 256 KiB, the
                    //       data does not reach the other peer reliably.
                    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
                    var canSendMaxMessageSize = 65536;
                    if (browserDetails.browser === 'firefox') {
                        if (browserDetails.version < 57) {
                            if (remoteIsFirefox === -1) {
                                // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                                // fragmentation.
                                canSendMaxMessageSize = 16384;
                            } else {
                                // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                                // messages. Thus, supporting ~2 GiB when sending.
                                canSendMaxMessageSize = 2147483637;
                            }
                        } else if (browserDetails.version < 60) {
                            // Currently, all FF >= 57 will reset the remote maximum message size
                            // to the default value when a data channel is created at a later
                            // stage. :(
                            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                            canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
                        } else {
                            // FF >= 60 supports sending ~2 GiB
                            canSendMaxMessageSize = 2147483637;
                        }
                    }
                    return canSendMaxMessageSize;
                };

                var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
                    // Note: 65536 bytes is the default value from the SDP spec. Also,
                    //       every implementation we know supports receiving 65536 bytes.
                    var maxMessageSize = 65536;

                    // FF 57 has a slightly incorrect default remote max message size, so
                    // we need to adjust it here to avoid a failure when sending.
                    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
                    if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
                        maxMessageSize = 65535;
                    }

                    var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
                    if (match.length > 0) {
                        maxMessageSize = parseInt(match[0].substr(19), 10);
                    } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
                        // If the maximum message size is not present in the remote SDP and
                        // both local and remote are Firefox, the remote peer can receive
                        // ~2 GiB.
                        maxMessageSize = 2147483637;
                    }
                    return maxMessageSize;
                };

                var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                    this._sctp = null;
                    // Chrome decided to not expose .sctp in plan-b mode.
                    // As usual, adapter.js has to do an 'ugly worakaround'
                    // to cover up the mess.
                    if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
                        var _getConfiguration = this.getConfiguration(),
                            sdpSemantics = _getConfiguration.sdpSemantics;

                        if (sdpSemantics === 'plan-b') {
                            Object.defineProperty(this, 'sctp', {
                                get: function get() {
                                    return typeof this._sctp === 'undefined' ? null : this._sctp;
                                },

                                enumerable: true,
                                configurable: true
                            });
                        }
                    }

                    if (sctpInDescription(arguments[0])) {
                        // Check if the remote is FF.
                        var isFirefox = getRemoteFirefoxVersion(arguments[0]);

                        // Get the maximum message size the local peer is capable of sending
                        var canSendMMS = getCanSendMaxMessageSize(isFirefox);

                        // Get the maximum message size of the remote peer.
                        var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

                        // Determine final maximum message size
                        var maxMessageSize = void 0;
                        if (canSendMMS === 0 && remoteMMS === 0) {
                            maxMessageSize = Number.POSITIVE_INFINITY;
                        } else if (canSendMMS === 0 || remoteMMS === 0) {
                            maxMessageSize = Math.max(canSendMMS, remoteMMS);
                        } else {
                            maxMessageSize = Math.min(canSendMMS, remoteMMS);
                        }

                        // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
                        // attribute.
                        var sctp = {};
                        Object.defineProperty(sctp, 'maxMessageSize', {
                            get: function get() {
                                return maxMessageSize;
                            }
                        });
                        this._sctp = sctp;
                    }

                    return origSetRemoteDescription.apply(this, arguments);
                };
            }

            function shimSendThrowTypeError(window) {
                if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
                    return;
                }

                // Note: Although Firefox >= 57 has a native implementation, the maximum
                //       message size can be reset for all data channels at a later stage.
                //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

                function wrapDcSend(dc, pc) {
                    var origDataChannelSend = dc.send;
                    dc.send = function send() {
                        var data = arguments[0];
                        var length = data.length || data.size || data.byteLength;
                        if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
                            throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
                        }
                        return origDataChannelSend.apply(dc, arguments);
                    };
                }

                var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
                window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
                    var dataChannel = origCreateDataChannel.apply(this, arguments);
                    wrapDcSend(dataChannel, this);
                    return dataChannel;
                };
                utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
                    wrapDcSend(e.channel, e.target);
                    return e;
                });
            }

            /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */
            function shimConnectionState(window) {
                if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
                    return;
                }
                var proto = window.RTCPeerConnection.prototype;
                Object.defineProperty(proto, 'connectionState', {
                    get: function get() {
                        return {
                            completed: 'connected',
                            checking: 'connecting'
                        }[this.iceConnectionState] || this.iceConnectionState;
                    },

                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(proto, 'onconnectionstatechange', {
                    get: function get() {
                        return this._onconnectionstatechange || null;
                    },
                    set: function set(cb) {
                        if (this._onconnectionstatechange) {
                            this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
                            delete this._onconnectionstatechange;
                        }
                        if (cb) {
                            this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
                        }
                    },

                    enumerable: true,
                    configurable: true
                });

                ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
                    var origMethod = proto[method];
                    proto[method] = function () {
                        if (!this._connectionstatechangepoly) {
                            this._connectionstatechangepoly = function (e) {
                                var pc = e.target;
                                if (pc._lastConnectionState !== pc.connectionState) {
                                    pc._lastConnectionState = pc.connectionState;
                                    var newEvent = new Event('connectionstatechange', e);
                                    pc.dispatchEvent(newEvent);
                                }
                                return e;
                            };
                            this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
                        }
                        return origMethod.apply(this, arguments);
                    };
                });
            }

            function removeAllowExtmapMixed(window) {
                /* remove a=extmap-allow-mixed for webrtc.org < M71 */
                if (!window.RTCPeerConnection) {
                    return;
                }
                var browserDetails = utils.detectBrowser(window);
                if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
                    return;
                }
                if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
                    return;
                }
                var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
                window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
                    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
                        desc.sdp = desc.sdp.split('\n').filter(function (line) {
                            return line.trim() !== 'a=extmap-allow-mixed';
                        }).join('\n');
                    }
                    return nativeSRD.apply(this, arguments);
                };
            }

        }, {"./utils": 15, "sdp": 17}], 7: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _getusermedia = require('./getusermedia');

            Object.defineProperty(exports, 'shimGetUserMedia', {
                enumerable: true,
                get: function get() {
                    return _getusermedia.shimGetUserMedia;
                }
            });

            var _getdisplaymedia = require('./getdisplaymedia');

            Object.defineProperty(exports, 'shimGetDisplayMedia', {
                enumerable: true,
                get: function get() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimReplaceTrack = shimReplaceTrack;

            var _utils = require('../utils');

            var utils = _interopRequireWildcard(_utils);

            var _filtericeservers = require('./filtericeservers');

            var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');

            var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function shimPeerConnection(window) {
                var browserDetails = utils.detectBrowser(window);

                if (window.RTCIceGatherer) {
                    if (!window.RTCIceCandidate) {
                        window.RTCIceCandidate = function RTCIceCandidate(args) {
                            return args;
                        };
                    }
                    if (!window.RTCSessionDescription) {
                        window.RTCSessionDescription = function RTCSessionDescription(args) {
                            return args;
                        };
                    }
                    // this adds an additional event listener to MediaStrackTrack that signals
                    // when a tracks enabled property was changed. Workaround for a bug in
                    // addStream, see below. No longer required in 15025+
                    if (browserDetails.version < 15025) {
                        var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
                        Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                            set: function set(value) {
                                origMSTEnabled.set.call(this, value);
                                var ev = new Event('enabled');
                                ev.enabled = value;
                                this.dispatchEvent(ev);
                            }
                        });
                    }
                }

                // ORTC defines the DTMF sender a bit different.
                // https://github.com/w3c/ortc/issues/714
                if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
                    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
                        get: function get() {
                            if (this._dtmf === undefined) {
                                if (this.track.kind === 'audio') {
                                    this._dtmf = new window.RTCDtmfSender(this);
                                } else if (this.track.kind === 'video') {
                                    this._dtmf = null;
                                }
                            }
                            return this._dtmf;
                        }
                    });
                }
                // Edge currently only implements the RTCDtmfSender, not the
                // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
                if (window.RTCDtmfSender && !window.RTCDTMFSender) {
                    window.RTCDTMFSender = window.RTCDtmfSender;
                }

                var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
                window.RTCPeerConnection = function RTCPeerConnection(config) {
                    if (config && config.iceServers) {
                        config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
                        utils.log('ICE servers after filtering:', config.iceServers);
                    }
                    return new RTCPeerConnectionShim(config);
                };
                window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
            }

            function shimReplaceTrack(window) {
                // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
                if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
                    window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
                }
            }

        }, {"../utils": 15, "./filtericeservers": 8, "./getdisplaymedia": 9, "./getusermedia": 10, "rtcpeerconnection-shim": 16}], 8: [function (require, module, exports) {
            /*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.filterIceServers = filterIceServers;

            var _utils = require('../utils');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
                var hasTurn = false;
                iceServers = JSON.parse(JSON.stringify(iceServers));
                return iceServers.filter(function (server) {
                    if (server && (server.urls || server.url)) {
                        var urls = server.urls || server.url;
                        if (server.url && !server.urls) {
                            utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                        }
                        var isString = typeof urls === 'string';
                        if (isString) {
                            urls = [urls];
                        }
                        urls = urls.filter(function (url) {
                            // filter STUN unconditionally.
                            if (url.indexOf('stun:') === 0) {
                                return false;
                            }

                            var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
                            if (validTurn && !hasTurn) {
                                hasTurn = true;
                                return true;
                            }
                            return validTurn && !hasTurn;
                        });

                        delete server.url;
                        server.urls = isString ? urls[0] : urls;
                        return !!urls.length;
                    }
                });
            }

        }, {"../utils": 15}], 9: [function (require, module, exports) {
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;

            function shimGetDisplayMedia(window) {
                if (!('getDisplayMedia' in window.navigator)) {
                    return;
                }
                if (!window.navigator.mediaDevices) {
                    return;
                }
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
                    return;
                }
                window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
            }

        }, {}], 10: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetUserMedia = shimGetUserMedia;

            function shimGetUserMedia(window) {
                var navigator = window && window.navigator;

                var shimError_ = function shimError_(e) {
                    return {
                        name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
                        message: e.message,
                        constraint: e.constraint,
                        toString: function toString() {
                            return this.name;
                        }
                    };
                };

                // getUserMedia error shim.
                var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function (c) {
                    return origGetUserMedia(c).catch(function (e) {
                        return Promise.reject(shimError_(e));
                    });
                };
            }

        }, {}], 11: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var _getusermedia = require('./getusermedia');

            Object.defineProperty(exports, 'shimGetUserMedia', {
                enumerable: true,
                get: function get() {
                    return _getusermedia.shimGetUserMedia;
                }
            });

            var _getdisplaymedia = require('./getdisplaymedia');

            Object.defineProperty(exports, 'shimGetDisplayMedia', {
                enumerable: true,
                get: function get() {
                    return _getdisplaymedia.shimGetDisplayMedia;
                }
            });
            exports.shimOnTrack = shimOnTrack;
            exports.shimPeerConnection = shimPeerConnection;
            exports.shimSenderGetStats = shimSenderGetStats;
            exports.shimReceiverGetStats = shimReceiverGetStats;
            exports.shimRemoveStream = shimRemoveStream;
            exports.shimRTCDataChannel = shimRTCDataChannel;
            exports.shimAddTransceiver = shimAddTransceiver;
            exports.shimGetParameters = shimGetParameters;
            exports.shimCreateOffer = shimCreateOffer;
            exports.shimCreateAnswer = shimCreateAnswer;

            var _utils = require('../utils');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
                } else {
                    obj[key] = value;
                }
                return obj;
            }

            function shimOnTrack(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
                    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                        get: function get() {
                            return {receiver: this.receiver};
                        }
                    });
                }
            }

            function shimPeerConnection(window) {
                var browserDetails = utils.detectBrowser(window);

                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
                    return; // probably media.peerconnection.enabled=false in about:config
                }
                if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
                    // very basic support for old versions.
                    window.RTCPeerConnection = window.mozRTCPeerConnection;
                }

                if (browserDetails.version < 53) {
                    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
                        var nativeMethod = window.RTCPeerConnection.prototype[method];
                        var methodObj = _defineProperty({}, method, function () {
                            arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                            return nativeMethod.apply(this, arguments);
                        });
                        window.RTCPeerConnection.prototype[method] = methodObj[method];
                    });
                }

                // support for addIceCandidate(null or undefined)
                // as well as ignoring {sdpMid, candidate: ""}
                if (browserDetails.version < 68) {
                    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
                    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                        if (!arguments[0]) {
                            if (arguments[1]) {
                                arguments[1].apply(null);
                            }
                            return Promise.resolve();
                        }
                        // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                        // in older versions.
                        if (arguments[0] && arguments[0].candidate === '') {
                            return Promise.resolve();
                        }
                        return nativeAddIceCandidate.apply(this, arguments);
                    };
                }

                var modernStatsTypes = {
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                };

                var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
                window.RTCPeerConnection.prototype.getStats = function getStats() {
                    var _arguments = Array.prototype.slice.call(arguments),
                        selector = _arguments[0],
                        onSucc = _arguments[1],
                        onErr = _arguments[2];

                    return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
                        if (browserDetails.version < 53 && !onSucc) {
                            // Shim only promise getStats with spec-hyphens in type names
                            // Leave callback version alone; misc old uses of forEach before Map
                            try {
                                stats.forEach(function (stat) {
                                    stat.type = modernStatsTypes[stat.type] || stat.type;
                                });
                            } catch (e) {
                                if (e.name !== 'TypeError') {
                                    throw e;
                                }
                                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                                stats.forEach(function (stat, i) {
                                    stats.set(i, Object.assign({}, stat, {
                                        type: modernStatsTypes[stat.type] || stat.type
                                    }));
                                });
                            }
                        }
                        return stats;
                    }).then(onSucc, onErr);
                };
            }

            function shimSenderGetStats(window) {
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
                    return;
                }
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
                    return;
                }
                var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
                if (origGetSenders) {
                    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                        var _this = this;

                        var senders = origGetSenders.apply(this, []);
                        senders.forEach(function (sender) {
                            return sender._pc = _this;
                        });
                        return senders;
                    };
                }

                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                if (origAddTrack) {
                    window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                        var sender = origAddTrack.apply(this, arguments);
                        sender._pc = this;
                        return sender;
                    };
                }
                window.RTCRtpSender.prototype.getStats = function getStats() {
                    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
                };
            }

            function shimReceiverGetStats(window) {
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
                    return;
                }
                if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
                    return;
                }
                var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
                if (origGetReceivers) {
                    window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                        var _this2 = this;

                        var receivers = origGetReceivers.apply(this, []);
                        receivers.forEach(function (receiver) {
                            return receiver._pc = _this2;
                        });
                        return receivers;
                    };
                }
                utils.wrapPeerConnectionEvent(window, 'track', function (e) {
                    e.receiver._pc = e.srcElement;
                    return e;
                });
                window.RTCRtpReceiver.prototype.getStats = function getStats() {
                    return this._pc.getStats(this.track);
                };
            }

            function shimRemoveStream(window) {
                if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
                    return;
                }
                window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                    var _this3 = this;

                    utils.deprecated('removeStream', 'removeTrack');
                    this.getSenders().forEach(function (sender) {
                        if (sender.track && stream.getTracks().includes(sender.track)) {
                            _this3.removeTrack(sender);
                        }
                    });
                };
            }

            function shimRTCDataChannel(window) {
                // rename DataChannel to RTCDataChannel (native fix in FF60):
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
                if (window.DataChannel && !window.RTCDataChannel) {
                    window.RTCDataChannel = window.DataChannel;
                }
            }

            function shimAddTransceiver(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
                    return;
                }
                var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
                if (origAddTransceiver) {
                    window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
                        this.setParametersPromises = [];
                        var initParameters = arguments[1];
                        var shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
                        if (shouldPerformCheck) {
                            // If sendEncodings params are provided, validate grammar
                            initParameters.sendEncodings.forEach(function (encodingParam) {
                                if ('rid' in encodingParam) {
                                    var ridRegex = /^[a-z0-9]{0,16}$/i;
                                    if (!ridRegex.test(encodingParam.rid)) {
                                        throw new TypeError('Invalid RID value provided.');
                                    }
                                }
                                if ('scaleResolutionDownBy' in encodingParam) {
                                    if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                                        throw new RangeError('scale_resolution_down_by must be >= 1.0');
                                    }
                                }
                                if ('maxFramerate' in encodingParam) {
                                    if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                                        throw new RangeError('max_framerate must be >= 0.0');
                                    }
                                }
                            });
                        }
                        var transceiver = origAddTransceiver.apply(this, arguments);
                        if (shouldPerformCheck) {
                            // Check if the init options were applied. If not we do this in an
                            // asynchronous way and save the promise reference in a global object.
                            // This is an ugly hack, but at the same time is way more robust than
                            // checking the sender parameters before and after the createOffer
                            // Also note that after the createoffer we are not 100% sure that
                            // the params were asynchronously applied so we might miss the
                            // opportunity to recreate offer.
                            var sender = transceiver.sender;

                            var params = sender.getParameters();
                            if (!('encodings' in params)) {
                                params.encodings = initParameters.sendEncodings;
                                sender.sendEncodings = initParameters.sendEncodings;
                                this.setParametersPromises.push(sender.setParameters(params).then(function () {
                                    delete sender.sendEncodings;
                                }).catch(function () {
                                    delete sender.sendEncodings;
                                }));
                            }
                        }
                        return transceiver;
                    };
                }
            }

            function shimGetParameters(window) {
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCRtpSender)) {
                    return;
                }
                var origGetParameters = window.RTCRtpSender.prototype.getParameters;
                if (origGetParameters) {
                    window.RTCRtpSender.prototype.getParameters = function getParameters() {
                        var params = origGetParameters.apply(this, arguments);
                        if (!('sendEncodings' in this)) {
                            return params;
                        }
                        return Object.assign({}, {encodings: this.sendEncodings}, params);
                    };
                }
            }

            function shimCreateOffer(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
                    return;
                }
                var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
                window.RTCPeerConnection.prototype.createOffer = function createOffer() {
                    var _this4 = this,
                        _arguments2 = arguments;

                    if (this.setParametersPromises && this.setParametersPromises.length) {
                        return Promise.all(this.setParametersPromises).then(function () {
                            return origCreateOffer.apply(_this4, _arguments2);
                        }).finally(function () {
                            _this4.setParametersPromises = [];
                        });
                    }
                    return origCreateOffer.apply(this, arguments);
                };
            }

            function shimCreateAnswer(window) {
                // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
                // Firefox ignores the init sendEncodings options passed to addTransceiver
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
                if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
                    return;
                }
                var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
                window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
                    var _this5 = this,
                        _arguments3 = arguments;

                    if (this.setParametersPromises && this.setParametersPromises.length) {
                        return Promise.all(this.setParametersPromises).then(function () {
                            return origCreateAnswer.apply(_this5, _arguments3);
                        }).finally(function () {
                            _this5.setParametersPromises = [];
                        });
                    }
                    return origCreateAnswer.apply(this, arguments);
                };
            }

        }, {"../utils": 15, "./getdisplaymedia": 12, "./getusermedia": 13}], 12: [function (require, module, exports) {
            /*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.shimGetDisplayMedia = shimGetDisplayMedia;

            function shimGetDisplayMedia(window, preferredMediaSource) {
                if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
                    return;
                }
                if (!window.navigator.mediaDevices) {
                    return;
                }
                window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
                    if (!(constraints && constraints.video)) {
                        var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
                        err.name = 'NotFoundError';
                        // from https://heycam.github.io/webidl/#idl-DOMException-error-names
                        err.code = 8;
                        return Promise.reject(err);
                    }
                    if (constraints.video === true) {
                        constraints.video = {mediaSource: preferredMediaSource};
                    } else {
                        constraints.video.mediaSource = preferredMediaSource;
                    }
                    return window.navigator.mediaDevices.getUserMedia(constraints);
                };
            }

        }, {}], 13: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            exports.shimGetUserMedia = shimGetUserMedia;

            var _utils = require('../utils');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function shimGetUserMedia(window) {
                var browserDetails = utils.detectBrowser(window);
                var navigator = window && window.navigator;
                var MediaStreamTrack = window && window.MediaStreamTrack;

                navigator.getUserMedia = function (constraints, onSuccess, onError) {
                    // Replace Firefox 44+'s deprecation warning with unprefixed version.
                    utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
                    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
                };

                if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
                    var remap = function remap(obj, a, b) {
                        if (a in obj && !(b in obj)) {
                            obj[b] = obj[a];
                            delete obj[a];
                        }
                    };

                    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                    navigator.mediaDevices.getUserMedia = function (c) {
                        if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
                            c = JSON.parse(JSON.stringify(c));
                            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
                            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
                        }
                        return nativeGetUserMedia(c);
                    };

                    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                        var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                        MediaStreamTrack.prototype.getSettings = function () {
                            var obj = nativeGetSettings.apply(this, arguments);
                            remap(obj, 'mozAutoGainControl', 'autoGainControl');
                            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
                            return obj;
                        };
                    }

                    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                        var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                        MediaStreamTrack.prototype.applyConstraints = function (c) {
                            if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
                                c = JSON.parse(JSON.stringify(c));
                                remap(c, 'autoGainControl', 'mozAutoGainControl');
                                remap(c, 'noiseSuppression', 'mozNoiseSuppression');
                            }
                            return nativeApplyConstraints.apply(this, [c]);
                        };
                    }
                }
            }

        }, {"../utils": 15}], 14: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
            exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
            exports.shimCallbacksAPI = shimCallbacksAPI;
            exports.shimGetUserMedia = shimGetUserMedia;
            exports.shimConstraints = shimConstraints;
            exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
            exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
            exports.shimCreateOfferLegacy = shimCreateOfferLegacy;
            exports.shimAudioContext = shimAudioContext;

            var _utils = require('../utils');

            var utils = _interopRequireWildcard(_utils);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function shimLocalStreamsAPI(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        return this._localStreams;
                    };
                }
                if (!('addStream' in window.RTCPeerConnection.prototype)) {
                    var _addTrack = window.RTCPeerConnection.prototype.addTrack;
                    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                        var _this = this;

                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        if (!this._localStreams.includes(stream)) {
                            this._localStreams.push(stream);
                        }
                        // Try to emulate Chrome's behaviour of adding in audio-video order.
                        // Safari orders by track id.
                        stream.getAudioTracks().forEach(function (track) {
                            return _addTrack.call(_this, track, stream);
                        });
                        stream.getVideoTracks().forEach(function (track) {
                            return _addTrack.call(_this, track, stream);
                        });
                    };

                    window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
                        var _this2 = this;

                        for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            streams[_key - 1] = arguments[_key];
                        }

                        if (streams) {
                            streams.forEach(function (stream) {
                                if (!_this2._localStreams) {
                                    _this2._localStreams = [stream];
                                } else if (!_this2._localStreams.includes(stream)) {
                                    _this2._localStreams.push(stream);
                                }
                            });
                        }
                        return _addTrack.apply(this, arguments);
                    };
                }
                if (!('removeStream' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                        var _this3 = this;

                        if (!this._localStreams) {
                            this._localStreams = [];
                        }
                        var index = this._localStreams.indexOf(stream);
                        if (index === -1) {
                            return;
                        }
                        this._localStreams.splice(index, 1);
                        var tracks = stream.getTracks();
                        this.getSenders().forEach(function (sender) {
                            if (tracks.includes(sender.track)) {
                                _this3.removeTrack(sender);
                            }
                        });
                    };
                }
            }

            function shimRemoteStreamsAPI(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
                    window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
                        return this._remoteStreams ? this._remoteStreams : [];
                    };
                }
                if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
                    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
                        get: function get() {
                            return this._onaddstream;
                        },
                        set: function set(f) {
                            var _this4 = this;

                            if (this._onaddstream) {
                                this.removeEventListener('addstream', this._onaddstream);
                                this.removeEventListener('track', this._onaddstreampoly);
                            }
                            this.addEventListener('addstream', this._onaddstream = f);
                            this.addEventListener('track', this._onaddstreampoly = function (e) {
                                e.streams.forEach(function (stream) {
                                    if (!_this4._remoteStreams) {
                                        _this4._remoteStreams = [];
                                    }
                                    if (_this4._remoteStreams.includes(stream)) {
                                        return;
                                    }
                                    _this4._remoteStreams.push(stream);
                                    var event = new Event('addstream');
                                    event.stream = stream;
                                    _this4.dispatchEvent(event);
                                });
                            });
                        }
                    });
                    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
                    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                        var pc = this;
                        if (!this._onaddstreampoly) {
                            this.addEventListener('track', this._onaddstreampoly = function (e) {
                                e.streams.forEach(function (stream) {
                                    if (!pc._remoteStreams) {
                                        pc._remoteStreams = [];
                                    }
                                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                                        return;
                                    }
                                    pc._remoteStreams.push(stream);
                                    var event = new Event('addstream');
                                    event.stream = stream;
                                    pc.dispatchEvent(event);
                                });
                            });
                        }
                        return origSetRemoteDescription.apply(pc, arguments);
                    };
                }
            }

            function shimCallbacksAPI(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
                    return;
                }
                var prototype = window.RTCPeerConnection.prototype;
                var origCreateOffer = prototype.createOffer;
                var origCreateAnswer = prototype.createAnswer;
                var setLocalDescription = prototype.setLocalDescription;
                var setRemoteDescription = prototype.setRemoteDescription;
                var addIceCandidate = prototype.addIceCandidate;

                prototype.createOffer = function createOffer(successCallback, failureCallback) {
                    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                    var promise = origCreateOffer.apply(this, [options]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };

                prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
                    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
                    var promise = origCreateAnswer.apply(this, [options]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };

                var withCallback = function withCallback(description, successCallback, failureCallback) {
                    var promise = setLocalDescription.apply(this, [description]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setLocalDescription = withCallback;

                withCallback = function withCallback(description, successCallback, failureCallback) {
                    var promise = setRemoteDescription.apply(this, [description]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.setRemoteDescription = withCallback;

                withCallback = function withCallback(candidate, successCallback, failureCallback) {
                    var promise = addIceCandidate.apply(this, [candidate]);
                    if (!failureCallback) {
                        return promise;
                    }
                    promise.then(successCallback, failureCallback);
                    return Promise.resolve();
                };
                prototype.addIceCandidate = withCallback;
            }

            function shimGetUserMedia(window) {
                var navigator = window && window.navigator;

                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // shim not needed in Safari 12.1
                    var mediaDevices = navigator.mediaDevices;
                    var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
                    navigator.mediaDevices.getUserMedia = function (constraints) {
                        return _getUserMedia(shimConstraints(constraints));
                    };
                }

                if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
                        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
                    }.bind(navigator);
                }
            }

            function shimConstraints(constraints) {
                if (constraints && constraints.video !== undefined) {
                    return Object.assign({}, constraints, {video: utils.compactObject(constraints.video)});
                }

                return constraints;
            }

            function shimRTCIceServerUrls(window) {
                if (!window.RTCPeerConnection) {
                    return;
                }
                // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
                var OrigPeerConnection = window.RTCPeerConnection;
                window.RTCPeerConnection = function (pcConfig, pcConstraints) {
                    const configCopy = {};
                    Object.getOwnPropertyNames(pcConfig).forEach(function (name) {
                        configCopy[name] = pcConfig[name];
                    });
                    if (configCopy && configCopy.iceServers) {
                        var newIceServers = [];
                        for (var i = 0; i < configCopy.iceServers.length; i++) {
                            var server = configCopy.iceServers[i];
                            if (!server.hasOwnProperty('urls') &&
                                server.hasOwnProperty('url')) {
                                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                                server = JSON.parse(JSON.stringify(server));
                                server.urls = server.url;
                                delete server.url;
                                newIceServers.push(server);
                            } else {
                                newIceServers.push(configCopy.iceServers[i]);
                            }
                        }
                        configCopy.iceServers = newIceServers;
                    }

                    return new OrigPeerConnection(configCopy, pcConstraints);
                };
                window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
                // wrap static methods. Currently just generateCertificate.
                if ('generateCertificate' in OrigPeerConnection) {
                    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                        get: function get() {
                            return OrigPeerConnection.generateCertificate;
                        }
                    });
                }
            }

            function shimTrackEventTransceiver(window) {
                // Add event.transceiver member over deprecated event.receiver
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
                    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
                        get: function get() {
                            return {receiver: this.receiver};
                        }
                    });
                }
            }

            function shimCreateOfferLegacy(window) {
                var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
                window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
                    if (offerOptions) {
                        if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                            // support bit values
                            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
                        }
                        var audioTransceiver = this.getTransceivers().find(function (transceiver) {
                            return transceiver.receiver.track.kind === 'audio';
                        });
                        if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                            if (audioTransceiver.direction === 'sendrecv') {
                                if (audioTransceiver.setDirection) {
                                    audioTransceiver.setDirection('sendonly');
                                } else {
                                    audioTransceiver.direction = 'sendonly';
                                }
                            } else if (audioTransceiver.direction === 'recvonly') {
                                if (audioTransceiver.setDirection) {
                                    audioTransceiver.setDirection('inactive');
                                } else {
                                    audioTransceiver.direction = 'inactive';
                                }
                            }
                        } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                            this.addTransceiver('audio');
                        }

                        if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
                            // support bit values
                            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
                        }
                        var videoTransceiver = this.getTransceivers().find(function (transceiver) {
                            return transceiver.receiver.track.kind === 'video';
                        });
                        if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                            if (videoTransceiver.direction === 'sendrecv') {
                                if (videoTransceiver.setDirection) {
                                    videoTransceiver.setDirection('sendonly');
                                } else {
                                    videoTransceiver.direction = 'sendonly';
                                }
                            } else if (videoTransceiver.direction === 'recvonly') {
                                if (videoTransceiver.setDirection) {
                                    videoTransceiver.setDirection('inactive');
                                } else {
                                    videoTransceiver.direction = 'inactive';
                                }
                            }
                        } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                            this.addTransceiver('video');
                        }
                    }
                    return origCreateOffer.apply(this, arguments);
                };
            }

            function shimAudioContext(window) {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || window.AudioContext) {
                    return;
                }
                window.AudioContext = window.webkitAudioContext;
            }

        }, {"../utils": 15}], 15: [function (require, module, exports) {
            /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            exports.extractVersion = extractVersion;
            exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
            exports.disableLog = disableLog;
            exports.disableWarnings = disableWarnings;
            exports.log = log;
            exports.deprecated = deprecated;
            exports.detectBrowser = detectBrowser;
            exports.compactObject = compactObject;
            exports.walkStats = walkStats;
            exports.filterStats = filterStats;

            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
                } else {
                    obj[key] = value;
                }
                return obj;
            }

            var logDisabled_ = true;
            var deprecationWarnings_ = true;

            /**
             * Extract browser version out of the provided user agent string.
             *
             * @param {!string} uastring userAgent string.
             * @param {!string} expr Regular expression used as match criteria.
             * @param {!number} pos position in the version string to be returned.
             * @return {!number} browser version.
             */
            function extractVersion(uastring, expr, pos) {
                var match = uastring.match(expr);
                return match && match.length >= pos && parseInt(match[pos], 10);
            }

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).
            function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
                if (!window.RTCPeerConnection) {
                    return;
                }
                var proto = window.RTCPeerConnection.prototype;
                var nativeAddEventListener = proto.addEventListener;
                proto.addEventListener = function (nativeEventName, cb) {
                    if (nativeEventName !== eventNameToWrap) {
                        return nativeAddEventListener.apply(this, arguments);
                    }
                    var wrappedCallback = function wrappedCallback(e) {
                        var modifiedEvent = wrapper(e);
                        if (modifiedEvent) {
                            if (cb.handleEvent) {
                                cb.handleEvent(modifiedEvent);
                            } else {
                                cb(modifiedEvent);
                            }
                        }
                    };
                    this._eventMap = this._eventMap || {};
                    if (!this._eventMap[eventNameToWrap]) {
                        this._eventMap[eventNameToWrap] = new Map();
                    }
                    this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
                    return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
                };

                var nativeRemoveEventListener = proto.removeEventListener;
                proto.removeEventListener = function (nativeEventName, cb) {
                    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
                        return nativeRemoveEventListener.apply(this, arguments);
                    }
                    if (!this._eventMap[eventNameToWrap].has(cb)) {
                        return nativeRemoveEventListener.apply(this, arguments);
                    }
                    var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
                    this._eventMap[eventNameToWrap].delete(cb);
                    if (this._eventMap[eventNameToWrap].size === 0) {
                        delete this._eventMap[eventNameToWrap];
                    }
                    if (Object.keys(this._eventMap).length === 0) {
                        delete this._eventMap;
                    }
                    return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
                };

                Object.defineProperty(proto, 'on' + eventNameToWrap, {
                    get: function get() {
                        return this['_on' + eventNameToWrap];
                    },
                    set: function set(cb) {
                        if (this['_on' + eventNameToWrap]) {
                            this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
                            delete this['_on' + eventNameToWrap];
                        }
                        if (cb) {
                            this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
                        }
                    },

                    enumerable: true,
                    configurable: true
                });
            }

            function disableLog(bool) {
                if (typeof bool !== 'boolean') {
                    return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
                }
                logDisabled_ = bool;
                return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
            }

            /**
             * Disable or enable deprecation warnings
             * @param {!boolean} bool set to true to disable warnings.
             */
            function disableWarnings(bool) {
                if (typeof bool !== 'boolean') {
                    return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
                }
                deprecationWarnings_ = !bool;
                return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
            }

            function log() {
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
                    if (logDisabled_) {
                        return;
                    }
                    if (typeof console !== 'undefined' && typeof console.log === 'function') {
                        console.log.apply(console, arguments);
                    }
                }
            }

            /**
             * Shows a deprecation warning suggesting the modern and spec-compatible API.
             */
            function deprecated(oldMethod, newMethod) {
                if (!deprecationWarnings_) {
                    return;
                }
                console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
            }

            /**
             * Browser detector.
             *
             * @return {object} result containing browser and version
             *     properties.
             */
            function detectBrowser(window) {
                var navigator = window.navigator;

                // Returned result object.

                var result = {browser: null, version: null};

                // Fail early if it's not a browser
                if (typeof window === 'undefined' || !window.navigator) {
                    result.browser = 'Not a browser.';
                    return result;
                }

                if (navigator.mozGetUserMedia) {
                    // Firefox.
                    result.browser = 'firefox';
                    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
                } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
                    // Chrome, Chromium, Webview, Opera.
                    // Version matches Chrome/WebRTC version.
                    // Chrome 74 removed webkitGetUserMedia on http as well so we need the
                    // more complicated fallback to webkitRTCPeerConnection.
                    result.browser = 'chrome';
                    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
                    // Edge.
                    result.browser = 'edge';
                    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
                    // Safari.
                    result.browser = 'safari';
                    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
                    result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
                } else {
                    // Default fallthrough: not supported.
                    result.browser = 'Not a supported browser.';
                    return result;
                }

                return result;
            }

            /**
             * Checks if something is an object.
             *
             * @param {*} val The something you want to check.
             * @return true if val is an object, false otherwise.
             */
            function isObject(val) {
                return Object.prototype.toString.call(val) === '[object Object]';
            }

            /**
             * Remove all empty objects and undefined values
             * from a nested object -- an enhanced and vanilla version
             * of Lodash's `compact`.
             */
            function compactObject(data) {
                if (!isObject(data)) {
                    return data;
                }

                return Object.keys(data).reduce(function (accumulator, key) {
                    var isObj = isObject(data[key]);
                    var value = isObj ? compactObject(data[key]) : data[key];
                    var isEmptyObject = isObj && !Object.keys(value).length;
                    if (value === undefined || isEmptyObject) {
                        return accumulator;
                    }
                    return Object.assign(accumulator, _defineProperty({}, key, value));
                }, {});
            }

            /* iterates the stats graph recursively. */
            function walkStats(stats, base, resultSet) {
                if (!base || resultSet.has(base.id)) {
                    return;
                }
                resultSet.set(base.id, base);
                Object.keys(base).forEach(function (name) {
                    if (name.endsWith('Id')) {
                        walkStats(stats, stats.get(base[name]), resultSet);
                    } else if (name.endsWith('Ids')) {
                        base[name].forEach(function (id) {
                            walkStats(stats, stats.get(id), resultSet);
                        });
                    }
                });
            }

            /* filter getStats for a sender/receiver track. */
            function filterStats(result, track, outbound) {
                var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
                var filteredResult = new Map();
                if (track === null) {
                    return filteredResult;
                }
                var trackStats = [];
                result.forEach(function (value) {
                    if (value.type === 'track' && value.trackIdentifier === track.id) {
                        trackStats.push(value);
                    }
                });
                trackStats.forEach(function (trackStat) {
                    result.forEach(function (stats) {
                        if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                            walkStats(result, stats, filteredResult);
                        }
                    });
                });
                return filteredResult;
            }

        }, {}], 16: [function (require, module, exports) {
            /*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
            /* eslint-env node */
            'use strict';

            var SDPUtils = require('sdp');

            function fixStatsType(stat) {
                return {
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                }[stat.type] || stat.type;
            }

            function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
                var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

                // Map ICE parameters (ufrag, pwd) to SDP.
                sdp += SDPUtils.writeIceParameters(
                    transceiver.iceGatherer.getLocalParameters());

                // Map DTLS parameters to SDP.
                sdp += SDPUtils.writeDtlsParameters(
                    transceiver.dtlsTransport.getLocalParameters(),
                    type === 'offer' ? 'actpass' : dtlsRole || 'active');

                sdp += 'a=mid:' + transceiver.mid + '\r\n';

                if (transceiver.rtpSender && transceiver.rtpReceiver) {
                    sdp += 'a=sendrecv\r\n';
                } else if (transceiver.rtpSender) {
                    sdp += 'a=sendonly\r\n';
                } else if (transceiver.rtpReceiver) {
                    sdp += 'a=recvonly\r\n';
                } else {
                    sdp += 'a=inactive\r\n';
                }

                if (transceiver.rtpSender) {
                    var trackId = transceiver.rtpSender._initialTrackId ||
                        transceiver.rtpSender.track.id;
                    transceiver.rtpSender._initialTrackId = trackId;
                    // spec.
                    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
                        trackId + '\r\n';
                    sdp += 'a=' + msid;
                    // for Chrome. Legacy should no longer be required.
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                        ' ' + msid;

                    // RTX
                    if (transceiver.sendEncodingParameters[0].rtx) {
                        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                            ' ' + msid;
                        sdp += 'a=ssrc-group:FID ' +
                            transceiver.sendEncodingParameters[0].ssrc + ' ' +
                            transceiver.sendEncodingParameters[0].rtx.ssrc +
                            '\r\n';
                    }
                }
                // FIXME: this should be written by writeRtpDescription.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                    ' cname:' + SDPUtils.localCName + '\r\n';
                if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                        ' cname:' + SDPUtils.localCName + '\r\n';
                }
                return sdp;
            }

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
            function filterIceServers(iceServers, edgeVersion) {
                var hasTurn = false;
                iceServers = JSON.parse(JSON.stringify(iceServers));
                return iceServers.filter(function (server) {
                    if (server && (server.urls || server.url)) {
                        var urls = server.urls || server.url;
                        if (server.url && !server.urls) {
                            console.warn('RTCIceServer.url is deprecated! Use urls instead.');
                        }
                        var isString = typeof urls === 'string';
                        if (isString) {
                            urls = [urls];
                        }
                        urls = urls.filter(function (url) {
                            var validTurn = url.indexOf('turn:') === 0 &&
                                url.indexOf('transport=udp') !== -1 &&
                                url.indexOf('turn:[') === -1 &&
                                !hasTurn;

                            if (validTurn) {
                                hasTurn = true;
                                return true;
                            }
                            return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
                                url.indexOf('?transport=udp') === -1;
                        });

                        delete server.url;
                        server.urls = isString ? urls[0] : urls;
                        return !!urls.length;
                    }
                });
            }

// Determines the intersection of local and remote capabilities.
            function getCommonCapabilities(localCapabilities, remoteCapabilities) {
                var commonCapabilities = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: []
                };

                var findCodecByPayloadType = function (pt, codecs) {
                    pt = parseInt(pt, 10);
                    for (var i = 0; i < codecs.length; i++) {
                        if (codecs[i].payloadType === pt ||
                            codecs[i].preferredPayloadType === pt) {
                            return codecs[i];
                        }
                    }
                };

                var rtxCapabilityMatches = function (lRtx, rRtx, lCodecs, rCodecs) {
                    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
                    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
                    return lCodec && rCodec &&
                        lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
                };

                localCapabilities.codecs.forEach(function (lCodec) {
                    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
                        var rCodec = remoteCapabilities.codecs[i];
                        if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
                            lCodec.clockRate === rCodec.clockRate) {
                            if (lCodec.name.toLowerCase() === 'rtx' &&
                                lCodec.parameters && rCodec.parameters.apt) {
                                // for RTX we need to find the local rtx that has a apt
                                // which points to the same local codec as the remote one.
                                if (!rtxCapabilityMatches(lCodec, rCodec,
                                    localCapabilities.codecs, remoteCapabilities.codecs)) {
                                    continue;
                                }
                            }
                            rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
                            // number of channels is the highest common number of channels
                            rCodec.numChannels = Math.min(lCodec.numChannels,
                                rCodec.numChannels);
                            // push rCodec so we reply with offerer payload type
                            commonCapabilities.codecs.push(rCodec);

                            // determine common feedback mechanisms
                            rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
                                for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                                    if (lCodec.rtcpFeedback[j].type === fb.type &&
                                        lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                                        return true;
                                    }
                                }
                                return false;
                            });
                            // FIXME: also need to determine .parameters
                            //  see https://github.com/openpeer/ortc/issues/569
                            break;
                        }
                    }
                });

                localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
                    for (var i = 0; i < remoteCapabilities.headerExtensions.length;
                         i++) {
                        var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                        if (lHeaderExtension.uri === rHeaderExtension.uri) {
                            commonCapabilities.headerExtensions.push(rHeaderExtension);
                            break;
                        }
                    }
                });

                // FIXME: fecMechanisms
                return commonCapabilities;
            }

// is action=setLocalDescription with type allowed in signalingState
            function isActionAllowedInSignalingState(action, type, signalingState) {
                return {
                    offer: {
                        setLocalDescription: ['stable', 'have-local-offer'],
                        setRemoteDescription: ['stable', 'have-remote-offer']
                    },
                    answer: {
                        setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                        setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
                    }
                }[type][action].indexOf(signalingState) !== -1;
            }

            function maybeAddCandidate(iceTransport, candidate) {
                // Edge's internal representation adds some fields therefore
                // not all fieldѕ are taken into account.
                var alreadyAdded = iceTransport.getRemoteCandidates()
                    .find(function (remoteCandidate) {
                        return candidate.foundation === remoteCandidate.foundation &&
                            candidate.ip === remoteCandidate.ip &&
                            candidate.port === remoteCandidate.port &&
                            candidate.priority === remoteCandidate.priority &&
                            candidate.protocol === remoteCandidate.protocol &&
                            candidate.type === remoteCandidate.type;
                    });
                if (!alreadyAdded) {
                    iceTransport.addRemoteCandidate(candidate);
                }
                return !alreadyAdded;
            }


            function makeError(name, description) {
                var e = new Error(description);
                e.name = name;
                // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
                e.code = {
                    NotSupportedError: 9,
                    InvalidStateError: 11,
                    InvalidAccessError: 15,
                    TypeError: undefined,
                    OperationError: undefined
                }[name];
                return e;
            }

            module.exports = function (window, edgeVersion) {
                // https://w3c.github.io/mediacapture-main/#mediastream
                // Helper function to add the track to the stream and
                // dispatch the event ourselves.
                function addTrackToStreamAndFireEvent(track, stream) {
                    stream.addTrack(track);
                    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
                        {track: track}));
                }

                function removeTrackFromStreamAndFireEvent(track, stream) {
                    stream.removeTrack(track);
                    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
                        {track: track}));
                }

                function fireAddTrack(pc, track, receiver, streams) {
                    var trackEvent = new Event('track');
                    trackEvent.track = track;
                    trackEvent.receiver = receiver;
                    trackEvent.transceiver = {receiver: receiver};
                    trackEvent.streams = streams;
                    window.setTimeout(function () {
                        pc._dispatchEvent('track', trackEvent);
                    });
                }

                var RTCPeerConnection = function (config) {
                    var pc = this;

                    var _eventTarget = document.createDocumentFragment();
                    ['addEventListener', 'removeEventListener', 'dispatchEvent']
                        .forEach(function (method) {
                            pc[method] = _eventTarget[method].bind(_eventTarget);
                        });

                    this.canTrickleIceCandidates = null;

                    this.needNegotiation = false;

                    this.localStreams = [];
                    this.remoteStreams = [];

                    this._localDescription = null;
                    this._remoteDescription = null;

                    this.signalingState = 'stable';
                    this.iceConnectionState = 'new';
                    this.connectionState = 'new';
                    this.iceGatheringState = 'new';

                    config = JSON.parse(JSON.stringify(config || {}));

                    this.usingBundle = config.bundlePolicy === 'max-bundle';
                    if (config.rtcpMuxPolicy === 'negotiate') {
                        throw(makeError('NotSupportedError',
                            'rtcpMuxPolicy \'negotiate\' is not supported'));
                    } else if (!config.rtcpMuxPolicy) {
                        config.rtcpMuxPolicy = 'require';
                    }

                    switch (config.iceTransportPolicy) {
                        case 'all':
                        case 'relay':
                            break;
                        default:
                            config.iceTransportPolicy = 'all';
                            break;
                    }

                    switch (config.bundlePolicy) {
                        case 'balanced':
                        case 'max-compat':
                        case 'max-bundle':
                            break;
                        default:
                            config.bundlePolicy = 'balanced';
                            break;
                    }

                    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

                    this._iceGatherers = [];
                    if (config.iceCandidatePoolSize) {
                        for (var i = config.iceCandidatePoolSize; i > 0; i--) {
                            this._iceGatherers.push(new window.RTCIceGatherer({
                                iceServers: config.iceServers,
                                gatherPolicy: config.iceTransportPolicy
                            }));
                        }
                    } else {
                        config.iceCandidatePoolSize = 0;
                    }

                    this._config = config;

                    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
                    // everything that is needed to describe a SDP m-line.
                    this.transceivers = [];

                    this._sdpSessionId = SDPUtils.generateSessionId();
                    this._sdpSessionVersion = 0;

                    this._dtlsRole = undefined; // role for a=setup to use in answers.

                    this._isClosed = false;
                };

                Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
                    configurable: true,
                    get: function () {
                        return this._localDescription;
                    }
                });
                Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
                    configurable: true,
                    get: function () {
                        return this._remoteDescription;
                    }
                });

                // set up event handlers on prototype
                RTCPeerConnection.prototype.onicecandidate = null;
                RTCPeerConnection.prototype.onaddstream = null;
                RTCPeerConnection.prototype.ontrack = null;
                RTCPeerConnection.prototype.onremovestream = null;
                RTCPeerConnection.prototype.onsignalingstatechange = null;
                RTCPeerConnection.prototype.oniceconnectionstatechange = null;
                RTCPeerConnection.prototype.onconnectionstatechange = null;
                RTCPeerConnection.prototype.onicegatheringstatechange = null;
                RTCPeerConnection.prototype.onnegotiationneeded = null;
                RTCPeerConnection.prototype.ondatachannel = null;

                RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
                    if (this._isClosed) {
                        return;
                    }
                    this.dispatchEvent(event);
                    if (typeof this['on' + name] === 'function') {
                        this['on' + name](event);
                    }
                };

                RTCPeerConnection.prototype._emitGatheringStateChange = function () {
                    var event = new Event('icegatheringstatechange');
                    this._dispatchEvent('icegatheringstatechange', event);
                };

                RTCPeerConnection.prototype.getConfiguration = function () {
                    return this._config;
                };

                RTCPeerConnection.prototype.getLocalStreams = function () {
                    return this.localStreams;
                };

                RTCPeerConnection.prototype.getRemoteStreams = function () {
                    return this.remoteStreams;
                };

                // internal helper to create a transceiver object.
                // (which is not yet the same as the WebRTC 1.0 transceiver)
                RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
                    var hasBundleTransport = this.transceivers.length > 0;
                    var transceiver = {
                        track: null,
                        iceGatherer: null,
                        iceTransport: null,
                        dtlsTransport: null,
                        localCapabilities: null,
                        remoteCapabilities: null,
                        rtpSender: null,
                        rtpReceiver: null,
                        kind: kind,
                        mid: null,
                        sendEncodingParameters: null,
                        recvEncodingParameters: null,
                        stream: null,
                        associatedRemoteMediaStreams: [],
                        wantReceive: true
                    };
                    if (this.usingBundle && hasBundleTransport) {
                        transceiver.iceTransport = this.transceivers[0].iceTransport;
                        transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
                    } else {
                        var transports = this._createIceAndDtlsTransports();
                        transceiver.iceTransport = transports.iceTransport;
                        transceiver.dtlsTransport = transports.dtlsTransport;
                    }
                    if (!doNotAdd) {
                        this.transceivers.push(transceiver);
                    }
                    return transceiver;
                };

                RTCPeerConnection.prototype.addTrack = function (track, stream) {
                    if (this._isClosed) {
                        throw makeError('InvalidStateError',
                            'Attempted to call addTrack on a closed peerconnection.');
                    }

                    var alreadyExists = this.transceivers.find(function (s) {
                        return s.track === track;
                    });

                    if (alreadyExists) {
                        throw makeError('InvalidAccessError', 'Track already exists.');
                    }

                    var transceiver;
                    for (var i = 0; i < this.transceivers.length; i++) {
                        if (!this.transceivers[i].track &&
                            this.transceivers[i].kind === track.kind) {
                            transceiver = this.transceivers[i];
                        }
                    }
                    if (!transceiver) {
                        transceiver = this._createTransceiver(track.kind);
                    }

                    this._maybeFireNegotiationNeeded();

                    if (this.localStreams.indexOf(stream) === -1) {
                        this.localStreams.push(stream);
                    }

                    transceiver.track = track;
                    transceiver.stream = stream;
                    transceiver.rtpSender = new window.RTCRtpSender(track,
                        transceiver.dtlsTransport);
                    return transceiver.rtpSender;
                };

                RTCPeerConnection.prototype.addStream = function (stream) {
                    var pc = this;
                    if (edgeVersion >= 15025) {
                        stream.getTracks().forEach(function (track) {
                            pc.addTrack(track, stream);
                        });
                    } else {
                        // Clone is necessary for local demos mostly, attaching directly
                        // to two different senders does not work (build 10547).
                        // Fixed in 15025 (or earlier)
                        var clonedStream = stream.clone();
                        stream.getTracks().forEach(function (track, idx) {
                            var clonedTrack = clonedStream.getTracks()[idx];
                            track.addEventListener('enabled', function (event) {
                                clonedTrack.enabled = event.enabled;
                            });
                        });
                        clonedStream.getTracks().forEach(function (track) {
                            pc.addTrack(track, clonedStream);
                        });
                    }
                };

                RTCPeerConnection.prototype.removeTrack = function (sender) {
                    if (this._isClosed) {
                        throw makeError('InvalidStateError',
                            'Attempted to call removeTrack on a closed peerconnection.');
                    }

                    if (!(sender instanceof window.RTCRtpSender)) {
                        throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
                            'does not implement interface RTCRtpSender.');
                    }

                    var transceiver = this.transceivers.find(function (t) {
                        return t.rtpSender === sender;
                    });

                    if (!transceiver) {
                        throw makeError('InvalidAccessError',
                            'Sender was not created by this connection.');
                    }
                    var stream = transceiver.stream;

                    transceiver.rtpSender.stop();
                    transceiver.rtpSender = null;
                    transceiver.track = null;
                    transceiver.stream = null;

                    // remove the stream from the set of local streams
                    var localStreams = this.transceivers.map(function (t) {
                        return t.stream;
                    });
                    if (localStreams.indexOf(stream) === -1 &&
                        this.localStreams.indexOf(stream) > -1) {
                        this.localStreams.splice(this.localStreams.indexOf(stream), 1);
                    }

                    this._maybeFireNegotiationNeeded();
                };

                RTCPeerConnection.prototype.removeStream = function (stream) {
                    var pc = this;
                    stream.getTracks().forEach(function (track) {
                        var sender = pc.getSenders().find(function (s) {
                            return s.track === track;
                        });
                        if (sender) {
                            pc.removeTrack(sender);
                        }
                    });
                };

                RTCPeerConnection.prototype.getSenders = function () {
                    return this.transceivers.filter(function (transceiver) {
                        return !!transceiver.rtpSender;
                    })
                        .map(function (transceiver) {
                            return transceiver.rtpSender;
                        });
                };

                RTCPeerConnection.prototype.getReceivers = function () {
                    return this.transceivers.filter(function (transceiver) {
                        return !!transceiver.rtpReceiver;
                    })
                        .map(function (transceiver) {
                            return transceiver.rtpReceiver;
                        });
                };


                RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex,
                                                                           usingBundle) {
                    var pc = this;
                    if (usingBundle && sdpMLineIndex > 0) {
                        return this.transceivers[0].iceGatherer;
                    } else if (this._iceGatherers.length) {
                        return this._iceGatherers.shift();
                    }
                    var iceGatherer = new window.RTCIceGatherer({
                        iceServers: this._config.iceServers,
                        gatherPolicy: this._config.iceTransportPolicy
                    });
                    Object.defineProperty(iceGatherer, 'state',
                        {value: 'new', writable: true}
                    );

                    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
                    this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
                        var end = !event.candidate || Object.keys(event.candidate).length === 0;
                        // polyfill since RTCIceGatherer.state is not implemented in
                        // Edge 10547 yet.
                        iceGatherer.state = end ? 'completed' : 'gathering';
                        if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
                            pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
                        }
                    };
                    iceGatherer.addEventListener('localcandidate',
                        this.transceivers[sdpMLineIndex].bufferCandidates);
                    return iceGatherer;
                };

                // start gathering from an RTCIceGatherer.
                RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
                    var pc = this;
                    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                    if (iceGatherer.onlocalcandidate) {
                        return;
                    }
                    var bufferedCandidateEvents =
                        this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
                    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
                    iceGatherer.removeEventListener('localcandidate',
                        this.transceivers[sdpMLineIndex].bufferCandidates);
                    iceGatherer.onlocalcandidate = function (evt) {
                        if (pc.usingBundle && sdpMLineIndex > 0) {
                            // if we know that we use bundle we can drop candidates with
                            // ѕdpMLineIndex > 0. If we don't do this then our state gets
                            // confused since we dispose the extra ice gatherer.
                            return;
                        }
                        var event = new Event('icecandidate');
                        event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

                        var cand = evt.candidate;
                        // Edge emits an empty object for RTCIceCandidateComplete‥
                        var end = !cand || Object.keys(cand).length === 0;
                        if (end) {
                            // polyfill since RTCIceGatherer.state is not implemented in
                            // Edge 10547 yet.
                            if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                                iceGatherer.state = 'completed';
                            }
                        } else {
                            if (iceGatherer.state === 'new') {
                                iceGatherer.state = 'gathering';
                            }
                            // RTCIceCandidate doesn't have a component, needs to be added
                            cand.component = 1;
                            // also the usernameFragment. TODO: update SDP to take both variants.
                            cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

                            var serializedCandidate = SDPUtils.writeCandidate(cand);
                            event.candidate = Object.assign(event.candidate,
                                SDPUtils.parseCandidate(serializedCandidate));

                            event.candidate.candidate = serializedCandidate;
                            event.candidate.toJSON = function () {
                                return {
                                    candidate: event.candidate.candidate,
                                    sdpMid: event.candidate.sdpMid,
                                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                                    usernameFragment: event.candidate.usernameFragment
                                };
                            };
                        }

                        // update local description.
                        var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
                        if (!end) {
                            sections[event.candidate.sdpMLineIndex] +=
                                'a=' + event.candidate.candidate + '\r\n';
                        } else {
                            sections[event.candidate.sdpMLineIndex] +=
                                'a=end-of-candidates\r\n';
                        }
                        pc._localDescription.sdp =
                            SDPUtils.getDescription(pc._localDescription.sdp) +
                            sections.join('');
                        var complete = pc.transceivers.every(function (transceiver) {
                            return transceiver.iceGatherer &&
                                transceiver.iceGatherer.state === 'completed';
                        });

                        if (pc.iceGatheringState !== 'gathering') {
                            pc.iceGatheringState = 'gathering';
                            pc._emitGatheringStateChange();
                        }

                        // Emit candidate. Also emit null candidate when all gatherers are
                        // complete.
                        if (!end) {
                            pc._dispatchEvent('icecandidate', event);
                        }
                        if (complete) {
                            pc._dispatchEvent('icecandidate', new Event('icecandidate'));
                            pc.iceGatheringState = 'complete';
                            pc._emitGatheringStateChange();
                        }
                    };

                    // emit already gathered candidates.
                    window.setTimeout(function () {
                        bufferedCandidateEvents.forEach(function (e) {
                            iceGatherer.onlocalcandidate(e);
                        });
                    }, 0);
                };

                // Create ICE transport and DTLS transport.
                RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
                    var pc = this;
                    var iceTransport = new window.RTCIceTransport(null);
                    iceTransport.onicestatechange = function () {
                        pc._updateIceConnectionState();
                        pc._updateConnectionState();
                    };

                    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
                    dtlsTransport.ondtlsstatechange = function () {
                        pc._updateConnectionState();
                    };
                    dtlsTransport.onerror = function () {
                        // onerror does not set state to failed by itself.
                        Object.defineProperty(dtlsTransport, 'state',
                            {value: 'failed', writable: true});
                        pc._updateConnectionState();
                    };

                    return {
                        iceTransport: iceTransport,
                        dtlsTransport: dtlsTransport
                    };
                };

                // Destroy ICE gatherer, ICE transport and DTLS transport.
                // Without triggering the callbacks.
                RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (
                    sdpMLineIndex) {
                    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
                    if (iceGatherer) {
                        delete iceGatherer.onlocalcandidate;
                        delete this.transceivers[sdpMLineIndex].iceGatherer;
                    }
                    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
                    if (iceTransport) {
                        delete iceTransport.onicestatechange;
                        delete this.transceivers[sdpMLineIndex].iceTransport;
                    }
                    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
                    if (dtlsTransport) {
                        delete dtlsTransport.ondtlsstatechange;
                        delete dtlsTransport.onerror;
                        delete this.transceivers[sdpMLineIndex].dtlsTransport;
                    }
                };

                // Start the RTP Sender and Receiver for a transceiver.
                RTCPeerConnection.prototype._transceive = function (transceiver,
                                                                    send, recv) {
                    var params = getCommonCapabilities(transceiver.localCapabilities,
                        transceiver.remoteCapabilities);
                    if (send && transceiver.rtpSender) {
                        params.encodings = transceiver.sendEncodingParameters;
                        params.rtcp = {
                            cname: SDPUtils.localCName,
                            compound: transceiver.rtcpParameters.compound
                        };
                        if (transceiver.recvEncodingParameters.length) {
                            params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
                        }
                        transceiver.rtpSender.send(params);
                    }
                    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
                        // remove RTX field in Edge 14942
                        if (transceiver.kind === 'video'
                            && transceiver.recvEncodingParameters
                            && edgeVersion < 15019) {
                            transceiver.recvEncodingParameters.forEach(function (p) {
                                delete p.rtx;
                            });
                        }
                        if (transceiver.recvEncodingParameters.length) {
                            params.encodings = transceiver.recvEncodingParameters;
                        } else {
                            params.encodings = [{}];
                        }
                        params.rtcp = {
                            compound: transceiver.rtcpParameters.compound
                        };
                        if (transceiver.rtcpParameters.cname) {
                            params.rtcp.cname = transceiver.rtcpParameters.cname;
                        }
                        if (transceiver.sendEncodingParameters.length) {
                            params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
                        }
                        transceiver.rtpReceiver.receive(params);
                    }
                };

                RTCPeerConnection.prototype.setLocalDescription = function (description) {
                    var pc = this;

                    // Note: pranswer is not supported.
                    if (['offer', 'answer'].indexOf(description.type) === -1) {
                        return Promise.reject(makeError('TypeError',
                            'Unsupported type "' + description.type + '"'));
                    }

                    if (!isActionAllowedInSignalingState('setLocalDescription',
                        description.type, pc.signalingState) || pc._isClosed) {
                        return Promise.reject(makeError('InvalidStateError',
                            'Can not set local ' + description.type +
                            ' in state ' + pc.signalingState));
                    }

                    var sections;
                    var sessionpart;
                    if (description.type === 'offer') {
                        // VERY limited support for SDP munging. Limited to:
                        // * changing the order of codecs
                        sections = SDPUtils.splitSections(description.sdp);
                        sessionpart = sections.shift();
                        sections.forEach(function (mediaSection, sdpMLineIndex) {
                            var caps = SDPUtils.parseRtpParameters(mediaSection);
                            pc.transceivers[sdpMLineIndex].localCapabilities = caps;
                        });

                        pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                            pc._gather(transceiver.mid, sdpMLineIndex);
                        });
                    } else if (description.type === 'answer') {
                        sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
                        sessionpart = sections.shift();
                        var isIceLite = SDPUtils.matchPrefix(sessionpart,
                            'a=ice-lite').length > 0;
                        sections.forEach(function (mediaSection, sdpMLineIndex) {
                            var transceiver = pc.transceivers[sdpMLineIndex];
                            var iceGatherer = transceiver.iceGatherer;
                            var iceTransport = transceiver.iceTransport;
                            var dtlsTransport = transceiver.dtlsTransport;
                            var localCapabilities = transceiver.localCapabilities;
                            var remoteCapabilities = transceiver.remoteCapabilities;

                            // treat bundle-only as not-rejected.
                            var rejected = SDPUtils.isRejected(mediaSection) &&
                                SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

                            if (!rejected && !transceiver.rejected) {
                                var remoteIceParameters = SDPUtils.getIceParameters(
                                    mediaSection, sessionpart);
                                var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                                    mediaSection, sessionpart);
                                if (isIceLite) {
                                    remoteDtlsParameters.role = 'server';
                                }

                                if (!pc.usingBundle || sdpMLineIndex === 0) {
                                    pc._gather(transceiver.mid, sdpMLineIndex);
                                    if (iceTransport.state === 'new') {
                                        iceTransport.start(iceGatherer, remoteIceParameters,
                                            isIceLite ? 'controlling' : 'controlled');
                                    }
                                    if (dtlsTransport.state === 'new') {
                                        dtlsTransport.start(remoteDtlsParameters);
                                    }
                                }

                                // Calculate intersection of capabilities.
                                var params = getCommonCapabilities(localCapabilities,
                                    remoteCapabilities);

                                // Start the RTCRtpSender. The RTCRtpReceiver for this
                                // transceiver has already been started in setRemoteDescription.
                                pc._transceive(transceiver,
                                    params.codecs.length > 0,
                                    false);
                            }
                        });
                    }

                    pc._localDescription = {
                        type: description.type,
                        sdp: description.sdp
                    };
                    if (description.type === 'offer') {
                        pc._updateSignalingState('have-local-offer');
                    } else {
                        pc._updateSignalingState('stable');
                    }

                    return Promise.resolve();
                };

                RTCPeerConnection.prototype.setRemoteDescription = function (description) {
                    var pc = this;

                    // Note: pranswer is not supported.
                    if (['offer', 'answer'].indexOf(description.type) === -1) {
                        return Promise.reject(makeError('TypeError',
                            'Unsupported type "' + description.type + '"'));
                    }

                    if (!isActionAllowedInSignalingState('setRemoteDescription',
                        description.type, pc.signalingState) || pc._isClosed) {
                        return Promise.reject(makeError('InvalidStateError',
                            'Can not set remote ' + description.type +
                            ' in state ' + pc.signalingState));
                    }

                    var streams = {};
                    pc.remoteStreams.forEach(function (stream) {
                        streams[stream.id] = stream;
                    });
                    var receiverList = [];
                    var sections = SDPUtils.splitSections(description.sdp);
                    var sessionpart = sections.shift();
                    var isIceLite = SDPUtils.matchPrefix(sessionpart,
                        'a=ice-lite').length > 0;
                    var usingBundle = SDPUtils.matchPrefix(sessionpart,
                        'a=group:BUNDLE ').length > 0;
                    pc.usingBundle = usingBundle;
                    var iceOptions = SDPUtils.matchPrefix(sessionpart,
                        'a=ice-options:')[0];
                    if (iceOptions) {
                        pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
                            .indexOf('trickle') >= 0;
                    } else {
                        pc.canTrickleIceCandidates = false;
                    }

                    sections.forEach(function (mediaSection, sdpMLineIndex) {
                        var lines = SDPUtils.splitLines(mediaSection);
                        var kind = SDPUtils.getKind(mediaSection);
                        // treat bundle-only as not-rejected.
                        var rejected = SDPUtils.isRejected(mediaSection) &&
                            SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
                        var protocol = lines[0].substr(2).split(' ')[2];

                        var direction = SDPUtils.getDirection(mediaSection, sessionpart);
                        var remoteMsid = SDPUtils.parseMsid(mediaSection);

                        var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

                        // Reject datachannels which are not implemented yet.
                        if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
                            protocol === 'UDP/DTLS/SCTP'))) {
                            // TODO: this is dangerous in the case where a non-rejected m-line
                            //     becomes rejected.
                            pc.transceivers[sdpMLineIndex] = {
                                mid: mid,
                                kind: kind,
                                protocol: protocol,
                                rejected: true
                            };
                            return;
                        }

                        if (!rejected && pc.transceivers[sdpMLineIndex] &&
                            pc.transceivers[sdpMLineIndex].rejected) {
                            // recycle a rejected transceiver.
                            pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
                        }

                        var transceiver;
                        var iceGatherer;
                        var iceTransport;
                        var dtlsTransport;
                        var rtpReceiver;
                        var sendEncodingParameters;
                        var recvEncodingParameters;
                        var localCapabilities;

                        var track;
                        // FIXME: ensure the mediaSection has rtcp-mux set.
                        var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
                        var remoteIceParameters;
                        var remoteDtlsParameters;
                        if (!rejected) {
                            remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
                                sessionpart);
                            remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
                                sessionpart);
                            remoteDtlsParameters.role = 'client';
                        }
                        recvEncodingParameters =
                            SDPUtils.parseRtpEncodingParameters(mediaSection);

                        var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

                        var isComplete = SDPUtils.matchPrefix(mediaSection,
                            'a=end-of-candidates', sessionpart).length > 0;
                        var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
                            .map(function (cand) {
                                return SDPUtils.parseCandidate(cand);
                            })
                            .filter(function (cand) {
                                return cand.component === 1;
                            });

                        // Check if we can use BUNDLE and dispose transports.
                        if ((description.type === 'offer' || description.type === 'answer') &&
                            !rejected && usingBundle && sdpMLineIndex > 0 &&
                            pc.transceivers[sdpMLineIndex]) {
                            pc._disposeIceAndDtlsTransports(sdpMLineIndex);
                            pc.transceivers[sdpMLineIndex].iceGatherer =
                                pc.transceivers[0].iceGatherer;
                            pc.transceivers[sdpMLineIndex].iceTransport =
                                pc.transceivers[0].iceTransport;
                            pc.transceivers[sdpMLineIndex].dtlsTransport =
                                pc.transceivers[0].dtlsTransport;
                            if (pc.transceivers[sdpMLineIndex].rtpSender) {
                                pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                                    pc.transceivers[0].dtlsTransport);
                            }
                            if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                                pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                                    pc.transceivers[0].dtlsTransport);
                            }
                        }
                        if (description.type === 'offer' && !rejected) {
                            transceiver = pc.transceivers[sdpMLineIndex] ||
                                pc._createTransceiver(kind);
                            transceiver.mid = mid;

                            if (!transceiver.iceGatherer) {
                                transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                                    usingBundle);
                            }

                            if (cands.length && transceiver.iceTransport.state === 'new') {
                                if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                                    transceiver.iceTransport.setRemoteCandidates(cands);
                                } else {
                                    cands.forEach(function (candidate) {
                                        maybeAddCandidate(transceiver.iceTransport, candidate);
                                    });
                                }
                            }

                            localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

                            // filter RTX until additional stuff needed for RTX is implemented
                            // in adapter.js
                            if (edgeVersion < 15019) {
                                localCapabilities.codecs = localCapabilities.codecs.filter(
                                    function (codec) {
                                        return codec.name !== 'rtx';
                                    });
                            }

                            sendEncodingParameters = transceiver.sendEncodingParameters || [{
                                ssrc: (2 * sdpMLineIndex + 2) * 1001
                            }];

                            // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                            var isNewTrack = false;
                            if (direction === 'sendrecv' || direction === 'sendonly') {
                                isNewTrack = !transceiver.rtpReceiver;
                                rtpReceiver = transceiver.rtpReceiver ||
                                    new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                                if (isNewTrack) {
                                    var stream;
                                    track = rtpReceiver.track;
                                    // FIXME: does not work with Plan B.
                                    if (remoteMsid && remoteMsid.stream === '-') {
                                        // no-op. a stream id of '-' means: no associated stream.
                                    } else if (remoteMsid) {
                                        if (!streams[remoteMsid.stream]) {
                                            streams[remoteMsid.stream] = new window.MediaStream();
                                            Object.defineProperty(streams[remoteMsid.stream], 'id', {
                                                get: function () {
                                                    return remoteMsid.stream;
                                                }
                                            });
                                        }
                                        Object.defineProperty(track, 'id', {
                                            get: function () {
                                                return remoteMsid.track;
                                            }
                                        });
                                        stream = streams[remoteMsid.stream];
                                    } else {
                                        if (!streams.default) {
                                            streams.default = new window.MediaStream();
                                        }
                                        stream = streams.default;
                                    }
                                    if (stream) {
                                        addTrackToStreamAndFireEvent(track, stream);
                                        transceiver.associatedRemoteMediaStreams.push(stream);
                                    }
                                    receiverList.push([track, rtpReceiver, stream]);
                                }
                            } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                                transceiver.associatedRemoteMediaStreams.forEach(function (s) {
                                    var nativeTrack = s.getTracks().find(function (t) {
                                        return t.id === transceiver.rtpReceiver.track.id;
                                    });
                                    if (nativeTrack) {
                                        removeTrackFromStreamAndFireEvent(nativeTrack, s);
                                    }
                                });
                                transceiver.associatedRemoteMediaStreams = [];
                            }

                            transceiver.localCapabilities = localCapabilities;
                            transceiver.remoteCapabilities = remoteCapabilities;
                            transceiver.rtpReceiver = rtpReceiver;
                            transceiver.rtcpParameters = rtcpParameters;
                            transceiver.sendEncodingParameters = sendEncodingParameters;
                            transceiver.recvEncodingParameters = recvEncodingParameters;

                            // Start the RTCRtpReceiver now. The RTPSender is started in
                            // setLocalDescription.
                            pc._transceive(pc.transceivers[sdpMLineIndex],
                                false,
                                isNewTrack);
                        } else if (description.type === 'answer' && !rejected) {
                            transceiver = pc.transceivers[sdpMLineIndex];
                            iceGatherer = transceiver.iceGatherer;
                            iceTransport = transceiver.iceTransport;
                            dtlsTransport = transceiver.dtlsTransport;
                            rtpReceiver = transceiver.rtpReceiver;
                            sendEncodingParameters = transceiver.sendEncodingParameters;
                            localCapabilities = transceiver.localCapabilities;

                            pc.transceivers[sdpMLineIndex].recvEncodingParameters =
                                recvEncodingParameters;
                            pc.transceivers[sdpMLineIndex].remoteCapabilities =
                                remoteCapabilities;
                            pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

                            if (cands.length && iceTransport.state === 'new') {
                                if ((isIceLite || isComplete) &&
                                    (!usingBundle || sdpMLineIndex === 0)) {
                                    iceTransport.setRemoteCandidates(cands);
                                } else {
                                    cands.forEach(function (candidate) {
                                        maybeAddCandidate(transceiver.iceTransport, candidate);
                                    });
                                }
                            }

                            if (!usingBundle || sdpMLineIndex === 0) {
                                if (iceTransport.state === 'new') {
                                    iceTransport.start(iceGatherer, remoteIceParameters,
                                        'controlling');
                                }
                                if (dtlsTransport.state === 'new') {
                                    dtlsTransport.start(remoteDtlsParameters);
                                }
                            }

                            // If the offer contained RTX but the answer did not,
                            // remove RTX from sendEncodingParameters.
                            var commonCapabilities = getCommonCapabilities(
                                transceiver.localCapabilities,
                                transceiver.remoteCapabilities);

                            var hasRtx = commonCapabilities.codecs.filter(function (c) {
                                return c.name.toLowerCase() === 'rtx';
                            }).length;
                            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                                delete transceiver.sendEncodingParameters[0].rtx;
                            }

                            pc._transceive(transceiver,
                                direction === 'sendrecv' || direction === 'recvonly',
                                direction === 'sendrecv' || direction === 'sendonly');

                            // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
                            if (rtpReceiver &&
                                (direction === 'sendrecv' || direction === 'sendonly')) {
                                track = rtpReceiver.track;
                                if (remoteMsid) {
                                    if (!streams[remoteMsid.stream]) {
                                        streams[remoteMsid.stream] = new window.MediaStream();
                                    }
                                    addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                                    receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                                } else {
                                    if (!streams.default) {
                                        streams.default = new window.MediaStream();
                                    }
                                    addTrackToStreamAndFireEvent(track, streams.default);
                                    receiverList.push([track, rtpReceiver, streams.default]);
                                }
                            } else {
                                // FIXME: actually the receiver should be created later.
                                delete transceiver.rtpReceiver;
                            }
                        }
                    });

                    if (pc._dtlsRole === undefined) {
                        pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
                    }

                    pc._remoteDescription = {
                        type: description.type,
                        sdp: description.sdp
                    };
                    if (description.type === 'offer') {
                        pc._updateSignalingState('have-remote-offer');
                    } else {
                        pc._updateSignalingState('stable');
                    }
                    Object.keys(streams).forEach(function (sid) {
                        var stream = streams[sid];
                        if (stream.getTracks().length) {
                            if (pc.remoteStreams.indexOf(stream) === -1) {
                                pc.remoteStreams.push(stream);
                                var event = new Event('addstream');
                                event.stream = stream;
                                window.setTimeout(function () {
                                    pc._dispatchEvent('addstream', event);
                                });
                            }

                            receiverList.forEach(function (item) {
                                var track = item[0];
                                var receiver = item[1];
                                if (stream.id !== item[2].id) {
                                    return;
                                }
                                fireAddTrack(pc, track, receiver, [stream]);
                            });
                        }
                    });
                    receiverList.forEach(function (item) {
                        if (item[2]) {
                            return;
                        }
                        fireAddTrack(pc, item[0], item[1], []);
                    });

                    // check whether addIceCandidate({}) was called within four seconds after
                    // setRemoteDescription.
                    window.setTimeout(function () {
                        if (!(pc && pc.transceivers)) {
                            return;
                        }
                        pc.transceivers.forEach(function (transceiver) {
                            if (transceiver.iceTransport &&
                                transceiver.iceTransport.state === 'new' &&
                                transceiver.iceTransport.getRemoteCandidates().length > 0) {
                                console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                                    'an end-of-candidates notification');
                                transceiver.iceTransport.addRemoteCandidate({});
                            }
                        });
                    }, 4000);

                    return Promise.resolve();
                };

                RTCPeerConnection.prototype.close = function () {
                    this.transceivers.forEach(function (transceiver) {
                        /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
                        if (transceiver.iceTransport) {
                            transceiver.iceTransport.stop();
                        }
                        if (transceiver.dtlsTransport) {
                            transceiver.dtlsTransport.stop();
                        }
                        if (transceiver.rtpSender) {
                            transceiver.rtpSender.stop();
                        }
                        if (transceiver.rtpReceiver) {
                            transceiver.rtpReceiver.stop();
                        }
                    });
                    // FIXME: clean up tracks, local streams, remote streams, etc
                    this._isClosed = true;
                    this._updateSignalingState('closed');
                };

                // Update the signaling state.
                RTCPeerConnection.prototype._updateSignalingState = function (newState) {
                    this.signalingState = newState;
                    var event = new Event('signalingstatechange');
                    this._dispatchEvent('signalingstatechange', event);
                };

                // Determine whether to fire the negotiationneeded event.
                RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
                    var pc = this;
                    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
                        return;
                    }
                    this.needNegotiation = true;
                    window.setTimeout(function () {
                        if (pc.needNegotiation) {
                            pc.needNegotiation = false;
                            var event = new Event('negotiationneeded');
                            pc._dispatchEvent('negotiationneeded', event);
                        }
                    }, 0);
                };

                // Update the ice connection state.
                RTCPeerConnection.prototype._updateIceConnectionState = function () {
                    var newState;
                    var states = {
                        'new': 0,
                        closed: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    this.transceivers.forEach(function (transceiver) {
                        if (transceiver.iceTransport && !transceiver.rejected) {
                            states[transceiver.iceTransport.state]++;
                        }
                    });

                    newState = 'new';
                    if (states.failed > 0) {
                        newState = 'failed';
                    } else if (states.checking > 0) {
                        newState = 'checking';
                    } else if (states.disconnected > 0) {
                        newState = 'disconnected';
                    } else if (states.new > 0) {
                        newState = 'new';
                    } else if (states.connected > 0) {
                        newState = 'connected';
                    } else if (states.completed > 0) {
                        newState = 'completed';
                    }

                    if (newState !== this.iceConnectionState) {
                        this.iceConnectionState = newState;
                        var event = new Event('iceconnectionstatechange');
                        this._dispatchEvent('iceconnectionstatechange', event);
                    }
                };

                // Update the connection state.
                RTCPeerConnection.prototype._updateConnectionState = function () {
                    var newState;
                    var states = {
                        'new': 0,
                        closed: 0,
                        connecting: 0,
                        connected: 0,
                        completed: 0,
                        disconnected: 0,
                        failed: 0
                    };
                    this.transceivers.forEach(function (transceiver) {
                        if (transceiver.iceTransport && transceiver.dtlsTransport &&
                            !transceiver.rejected) {
                            states[transceiver.iceTransport.state]++;
                            states[transceiver.dtlsTransport.state]++;
                        }
                    });
                    // ICETransport.completed and connected are the same for this purpose.
                    states.connected += states.completed;

                    newState = 'new';
                    if (states.failed > 0) {
                        newState = 'failed';
                    } else if (states.connecting > 0) {
                        newState = 'connecting';
                    } else if (states.disconnected > 0) {
                        newState = 'disconnected';
                    } else if (states.new > 0) {
                        newState = 'new';
                    } else if (states.connected > 0) {
                        newState = 'connected';
                    }

                    if (newState !== this.connectionState) {
                        this.connectionState = newState;
                        var event = new Event('connectionstatechange');
                        this._dispatchEvent('connectionstatechange', event);
                    }
                };

                RTCPeerConnection.prototype.createOffer = function () {
                    var pc = this;

                    if (pc._isClosed) {
                        return Promise.reject(makeError('InvalidStateError',
                            'Can not call createOffer after close'));
                    }

                    var numAudioTracks = pc.transceivers.filter(function (t) {
                        return t.kind === 'audio';
                    }).length;
                    var numVideoTracks = pc.transceivers.filter(function (t) {
                        return t.kind === 'video';
                    }).length;

                    // Determine number of audio and video tracks we need to send/recv.
                    var offerOptions = arguments[0];
                    if (offerOptions) {
                        // Reject Chrome legacy constraints.
                        if (offerOptions.mandatory || offerOptions.optional) {
                            throw new TypeError(
                                'Legacy mandatory/optional constraints not supported.');
                        }
                        if (offerOptions.offerToReceiveAudio !== undefined) {
                            if (offerOptions.offerToReceiveAudio === true) {
                                numAudioTracks = 1;
                            } else if (offerOptions.offerToReceiveAudio === false) {
                                numAudioTracks = 0;
                            } else {
                                numAudioTracks = offerOptions.offerToReceiveAudio;
                            }
                        }
                        if (offerOptions.offerToReceiveVideo !== undefined) {
                            if (offerOptions.offerToReceiveVideo === true) {
                                numVideoTracks = 1;
                            } else if (offerOptions.offerToReceiveVideo === false) {
                                numVideoTracks = 0;
                            } else {
                                numVideoTracks = offerOptions.offerToReceiveVideo;
                            }
                        }
                    }

                    pc.transceivers.forEach(function (transceiver) {
                        if (transceiver.kind === 'audio') {
                            numAudioTracks--;
                            if (numAudioTracks < 0) {
                                transceiver.wantReceive = false;
                            }
                        } else if (transceiver.kind === 'video') {
                            numVideoTracks--;
                            if (numVideoTracks < 0) {
                                transceiver.wantReceive = false;
                            }
                        }
                    });

                    // Create M-lines for recvonly streams.
                    while (numAudioTracks > 0 || numVideoTracks > 0) {
                        if (numAudioTracks > 0) {
                            pc._createTransceiver('audio');
                            numAudioTracks--;
                        }
                        if (numVideoTracks > 0) {
                            pc._createTransceiver('video');
                            numVideoTracks--;
                        }
                    }

                    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
                        pc._sdpSessionVersion++);
                    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                        // For each track, create an ice gatherer, ice transport,
                        // dtls transport, potentially rtpsender and rtpreceiver.
                        var track = transceiver.track;
                        var kind = transceiver.kind;
                        var mid = transceiver.mid || SDPUtils.generateIdentifier();
                        transceiver.mid = mid;

                        if (!transceiver.iceGatherer) {
                            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                                pc.usingBundle);
                        }

                        var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
                        // filter RTX until additional stuff needed for RTX is implemented
                        // in adapter.js
                        if (edgeVersion < 15019) {
                            localCapabilities.codecs = localCapabilities.codecs.filter(
                                function (codec) {
                                    return codec.name !== 'rtx';
                                });
                        }
                        localCapabilities.codecs.forEach(function (codec) {
                            // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
                            // by adding level-asymmetry-allowed=1
                            if (codec.name === 'H264' &&
                                codec.parameters['level-asymmetry-allowed'] === undefined) {
                                codec.parameters['level-asymmetry-allowed'] = '1';
                            }

                            // for subsequent offers, we might have to re-use the payload
                            // type of the last offer.
                            if (transceiver.remoteCapabilities &&
                                transceiver.remoteCapabilities.codecs) {
                                transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
                                    if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                                        codec.clockRate === remoteCodec.clockRate) {
                                        codec.preferredPayloadType = remoteCodec.payloadType;
                                    }
                                });
                            }
                        });
                        localCapabilities.headerExtensions.forEach(function (hdrExt) {
                            var remoteExtensions = transceiver.remoteCapabilities &&
                                transceiver.remoteCapabilities.headerExtensions || [];
                            remoteExtensions.forEach(function (rHdrExt) {
                                if (hdrExt.uri === rHdrExt.uri) {
                                    hdrExt.id = rHdrExt.id;
                                }
                            });
                        });

                        // generate an ssrc now, to be used later in rtpSender.send
                        var sendEncodingParameters = transceiver.sendEncodingParameters || [{
                            ssrc: (2 * sdpMLineIndex + 1) * 1001
                        }];
                        if (track) {
                            // add RTX
                            if (edgeVersion >= 15019 && kind === 'video' &&
                                !sendEncodingParameters[0].rtx) {
                                sendEncodingParameters[0].rtx = {
                                    ssrc: sendEncodingParameters[0].ssrc + 1
                                };
                            }
                        }

                        if (transceiver.wantReceive) {
                            transceiver.rtpReceiver = new window.RTCRtpReceiver(
                                transceiver.dtlsTransport, kind);
                        }

                        transceiver.localCapabilities = localCapabilities;
                        transceiver.sendEncodingParameters = sendEncodingParameters;
                    });

                    // always offer BUNDLE and dispose on return if not supported.
                    if (pc._config.bundlePolicy !== 'max-compat') {
                        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                            return t.mid;
                        }).join(' ') + '\r\n';
                    }
                    sdp += 'a=ice-options:trickle\r\n';

                    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                        sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
                            'offer', transceiver.stream, pc._dtlsRole);
                        sdp += 'a=rtcp-rsize\r\n';

                        if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
                            (sdpMLineIndex === 0 || !pc.usingBundle)) {
                            transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
                                cand.component = 1;
                                sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
                            });

                            if (transceiver.iceGatherer.state === 'completed') {
                                sdp += 'a=end-of-candidates\r\n';
                            }
                        }
                    });

                    var desc = new window.RTCSessionDescription({
                        type: 'offer',
                        sdp: sdp
                    });
                    return Promise.resolve(desc);
                };

                RTCPeerConnection.prototype.createAnswer = function () {
                    var pc = this;

                    if (pc._isClosed) {
                        return Promise.reject(makeError('InvalidStateError',
                            'Can not call createAnswer after close'));
                    }

                    if (!(pc.signalingState === 'have-remote-offer' ||
                        pc.signalingState === 'have-local-pranswer')) {
                        return Promise.reject(makeError('InvalidStateError',
                            'Can not call createAnswer in signalingState ' + pc.signalingState));
                    }

                    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
                        pc._sdpSessionVersion++);
                    if (pc.usingBundle) {
                        sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
                            return t.mid;
                        }).join(' ') + '\r\n';
                    }
                    sdp += 'a=ice-options:trickle\r\n';

                    var mediaSectionsInOffer = SDPUtils.getMediaSections(
                        pc._remoteDescription.sdp).length;
                    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
                        if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
                            return;
                        }
                        if (transceiver.rejected) {
                            if (transceiver.kind === 'application') {
                                if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
                                    sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                                } else {
                                    sdp += 'm=application 0 ' + transceiver.protocol +
                                        ' webrtc-datachannel\r\n';
                                }
                            } else if (transceiver.kind === 'audio') {
                                sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                                    'a=rtpmap:0 PCMU/8000\r\n';
                            } else if (transceiver.kind === 'video') {
                                sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                                    'a=rtpmap:120 VP8/90000\r\n';
                            }
                            sdp += 'c=IN IP4 0.0.0.0\r\n' +
                                'a=inactive\r\n' +
                                'a=mid:' + transceiver.mid + '\r\n';
                            return;
                        }

                        // FIXME: look at direction.
                        if (transceiver.stream) {
                            var localTrack;
                            if (transceiver.kind === 'audio') {
                                localTrack = transceiver.stream.getAudioTracks()[0];
                            } else if (transceiver.kind === 'video') {
                                localTrack = transceiver.stream.getVideoTracks()[0];
                            }
                            if (localTrack) {
                                // add RTX
                                if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                                    !transceiver.sendEncodingParameters[0].rtx) {
                                    transceiver.sendEncodingParameters[0].rtx = {
                                        ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                                    };
                                }
                            }
                        }

                        // Calculate intersection of capabilities.
                        var commonCapabilities = getCommonCapabilities(
                            transceiver.localCapabilities,
                            transceiver.remoteCapabilities);

                        var hasRtx = commonCapabilities.codecs.filter(function (c) {
                            return c.name.toLowerCase() === 'rtx';
                        }).length;
                        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                            delete transceiver.sendEncodingParameters[0].rtx;
                        }

                        sdp += writeMediaSection(transceiver, commonCapabilities,
                            'answer', transceiver.stream, pc._dtlsRole);
                        if (transceiver.rtcpParameters &&
                            transceiver.rtcpParameters.reducedSize) {
                            sdp += 'a=rtcp-rsize\r\n';
                        }
                    });

                    var desc = new window.RTCSessionDescription({
                        type: 'answer',
                        sdp: sdp
                    });
                    return Promise.resolve(desc);
                };

                RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
                    var pc = this;
                    var sections;
                    if (candidate && !(candidate.sdpMLineIndex !== undefined ||
                        candidate.sdpMid)) {
                        return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
                    }

                    // TODO: needs to go into ops queue.
                    return new Promise(function (resolve, reject) {
                        if (!pc._remoteDescription) {
                            return reject(makeError('InvalidStateError',
                                'Can not add ICE candidate without a remote description'));
                        } else if (!candidate || candidate.candidate === '') {
                            for (var j = 0; j < pc.transceivers.length; j++) {
                                if (pc.transceivers[j].rejected) {
                                    continue;
                                }
                                pc.transceivers[j].iceTransport.addRemoteCandidate({});
                                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                                sections[j] += 'a=end-of-candidates\r\n';
                                pc._remoteDescription.sdp =
                                    SDPUtils.getDescription(pc._remoteDescription.sdp) +
                                    sections.join('');
                                if (pc.usingBundle) {
                                    break;
                                }
                            }
                        } else {
                            var sdpMLineIndex = candidate.sdpMLineIndex;
                            if (candidate.sdpMid) {
                                for (var i = 0; i < pc.transceivers.length; i++) {
                                    if (pc.transceivers[i].mid === candidate.sdpMid) {
                                        sdpMLineIndex = i;
                                        break;
                                    }
                                }
                            }
                            var transceiver = pc.transceivers[sdpMLineIndex];
                            if (transceiver) {
                                if (transceiver.rejected) {
                                    return resolve();
                                }
                                var cand = Object.keys(candidate.candidate).length > 0 ?
                                    SDPUtils.parseCandidate(candidate.candidate) : {};
                                // Ignore Chrome's invalid candidates since Edge does not like them.
                                if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                                    return resolve();
                                }
                                // Ignore RTCP candidates, we assume RTCP-MUX.
                                if (cand.component && cand.component !== 1) {
                                    return resolve();
                                }
                                // when using bundle, avoid adding candidates to the wrong
                                // ice transport. And avoid adding candidates added in the SDP.
                                if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                                    transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
                                    if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                                        return reject(makeError('OperationError',
                                            'Can not add ICE candidate'));
                                    }
                                }

                                // update the remoteDescription.
                                var candidateString = candidate.candidate.trim();
                                if (candidateString.indexOf('a=') === 0) {
                                    candidateString = candidateString.substr(2);
                                }
                                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                                sections[sdpMLineIndex] += 'a=' +
                                    (cand.type ? candidateString : 'end-of-candidates')
                                    + '\r\n';
                                pc._remoteDescription.sdp =
                                    SDPUtils.getDescription(pc._remoteDescription.sdp) +
                                    sections.join('');
                            } else {
                                return reject(makeError('OperationError',
                                    'Can not add ICE candidate'));
                            }
                        }
                        resolve();
                    });
                };

                RTCPeerConnection.prototype.getStats = function (selector) {
                    if (selector && selector instanceof window.MediaStreamTrack) {
                        var senderOrReceiver = null;
                        this.transceivers.forEach(function (transceiver) {
                            if (transceiver.rtpSender &&
                                transceiver.rtpSender.track === selector) {
                                senderOrReceiver = transceiver.rtpSender;
                            } else if (transceiver.rtpReceiver &&
                                transceiver.rtpReceiver.track === selector) {
                                senderOrReceiver = transceiver.rtpReceiver;
                            }
                        });
                        if (!senderOrReceiver) {
                            throw makeError('InvalidAccessError', 'Invalid selector.');
                        }
                        return senderOrReceiver.getStats();
                    }

                    var promises = [];
                    this.transceivers.forEach(function (transceiver) {
                        ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
                            'dtlsTransport'].forEach(function (method) {
                            if (transceiver[method]) {
                                promises.push(transceiver[method].getStats());
                            }
                        });
                    });
                    return Promise.all(promises).then(function (allStats) {
                        var results = new Map();
                        allStats.forEach(function (stats) {
                            stats.forEach(function (stat) {
                                results.set(stat.id, stat);
                            });
                        });
                        return results;
                    });
                };

                // fix low-level stat names and return Map instead of object.
                var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
                    'RTCIceTransport', 'RTCDtlsTransport'];
                ortcObjects.forEach(function (ortcObjectName) {
                    var obj = window[ortcObjectName];
                    if (obj && obj.prototype && obj.prototype.getStats) {
                        var nativeGetstats = obj.prototype.getStats;
                        obj.prototype.getStats = function () {
                            return nativeGetstats.apply(this)
                                .then(function (nativeStats) {
                                    var mapStats = new Map();
                                    Object.keys(nativeStats).forEach(function (id) {
                                        nativeStats[id].type = fixStatsType(nativeStats[id]);
                                        mapStats.set(id, nativeStats[id]);
                                    });
                                    return mapStats;
                                });
                        };
                    }
                });

                // legacy callback shims. Should be moved to adapter.js some days.
                var methods = ['createOffer', 'createAnswer'];
                methods.forEach(function (method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function () {
                        var args = arguments;
                        if (typeof args[0] === 'function' ||
                            typeof args[1] === 'function') { // legacy
                            return nativeMethod.apply(this, [arguments[2]])
                                .then(function (description) {
                                    if (typeof args[0] === 'function') {
                                        args[0].apply(null, [description]);
                                    }
                                }, function (error) {
                                    if (typeof args[1] === 'function') {
                                        args[1].apply(null, [error]);
                                    }
                                });
                        }
                        return nativeMethod.apply(this, arguments);
                    };
                });

                methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
                methods.forEach(function (method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function () {
                        var args = arguments;
                        if (typeof args[1] === 'function' ||
                            typeof args[2] === 'function') { // legacy
                            return nativeMethod.apply(this, arguments)
                                .then(function () {
                                    if (typeof args[1] === 'function') {
                                        args[1].apply(null);
                                    }
                                }, function (error) {
                                    if (typeof args[2] === 'function') {
                                        args[2].apply(null, [error]);
                                    }
                                });
                        }
                        return nativeMethod.apply(this, arguments);
                    };
                });

                // getStats is special. It doesn't have a spec legacy method yet we support
                // getStats(something, cb) without error callbacks.
                ['getStats'].forEach(function (method) {
                    var nativeMethod = RTCPeerConnection.prototype[method];
                    RTCPeerConnection.prototype[method] = function () {
                        var args = arguments;
                        if (typeof args[1] === 'function') {
                            return nativeMethod.apply(this, arguments)
                                .then(function () {
                                    if (typeof args[1] === 'function') {
                                        args[1].apply(null);
                                    }
                                });
                        }
                        return nativeMethod.apply(this, arguments);
                    };
                });

                return RTCPeerConnection;
            };

        }, {"sdp": 17}], 17: [function (require, module, exports) {
            /* eslint-env node */
            'use strict';

// SDP helpers.
            var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
            SDPUtils.generateIdentifier = function () {
                return Math.random().toString(36).substr(2, 10);
            };

// The RTCP CNAME used by all peerconnections from the same JS.
            SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
            SDPUtils.splitLines = function (blob) {
                return blob.trim().split('\n').map(function (line) {
                    return line.trim();
                });
            };
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
            SDPUtils.splitSections = function (blob) {
                var parts = blob.split('\nm=');
                return parts.map(function (part, index) {
                    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
                });
            };

// returns the session description.
            SDPUtils.getDescription = function (blob) {
                var sections = SDPUtils.splitSections(blob);
                return sections && sections[0];
            };

// returns the individual media sections.
            SDPUtils.getMediaSections = function (blob) {
                var sections = SDPUtils.splitSections(blob);
                sections.shift();
                return sections;
            };

// Returns lines that start with a certain prefix.
            SDPUtils.matchPrefix = function (blob, prefix) {
                return SDPUtils.splitLines(blob).filter(function (line) {
                    return line.indexOf(prefix) === 0;
                });
            };

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
            SDPUtils.parseCandidate = function (line) {
                var parts;
                // Parse both variants.
                if (line.indexOf('a=candidate:') === 0) {
                    parts = line.substring(12).split(' ');
                } else {
                    parts = line.substring(10).split(' ');
                }

                var candidate = {
                    foundation: parts[0],
                    component: parseInt(parts[1], 10),
                    protocol: parts[2].toLowerCase(),
                    priority: parseInt(parts[3], 10),
                    ip: parts[4],
                    address: parts[4], // address is an alias for ip.
                    port: parseInt(parts[5], 10),
                    // skip parts[6] == 'typ'
                    type: parts[7]
                };

                for (var i = 8; i < parts.length; i += 2) {
                    switch (parts[i]) {
                        case 'raddr':
                            candidate.relatedAddress = parts[i + 1];
                            break;
                        case 'rport':
                            candidate.relatedPort = parseInt(parts[i + 1], 10);
                            break;
                        case 'tcptype':
                            candidate.tcpType = parts[i + 1];
                            break;
                        case 'ufrag':
                            candidate.ufrag = parts[i + 1]; // for backward compability.
                            candidate.usernameFragment = parts[i + 1];
                            break;
                        default: // extension handling, in particular ufrag
                            candidate[parts[i]] = parts[i + 1];
                            break;
                    }
                }
                return candidate;
            };

// Translates a candidate object into SDP candidate attribute.
            SDPUtils.writeCandidate = function (candidate) {
                var sdp = [];
                sdp.push(candidate.foundation);
                sdp.push(candidate.component);
                sdp.push(candidate.protocol.toUpperCase());
                sdp.push(candidate.priority);
                sdp.push(candidate.address || candidate.ip);
                sdp.push(candidate.port);

                var type = candidate.type;
                sdp.push('typ');
                sdp.push(type);
                if (type !== 'host' && candidate.relatedAddress &&
                    candidate.relatedPort) {
                    sdp.push('raddr');
                    sdp.push(candidate.relatedAddress);
                    sdp.push('rport');
                    sdp.push(candidate.relatedPort);
                }
                if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
                    sdp.push('tcptype');
                    sdp.push(candidate.tcpType);
                }
                if (candidate.usernameFragment || candidate.ufrag) {
                    sdp.push('ufrag');
                    sdp.push(candidate.usernameFragment || candidate.ufrag);
                }
                return 'candidate:' + sdp.join(' ');
            };

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
            SDPUtils.parseIceOptions = function (line) {
                return line.substr(14).split(' ');
            };

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
            SDPUtils.parseRtpMap = function (line) {
                var parts = line.substr(9).split(' ');
                var parsed = {
                    payloadType: parseInt(parts.shift(), 10) // was: id
                };

                parts = parts[0].split('/');

                parsed.name = parts[0];
                parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
                parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
                // legacy alias, got renamed back to channels in ORTC.
                parsed.numChannels = parsed.channels;
                return parsed;
            };

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
            SDPUtils.writeRtpMap = function (codec) {
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) {
                    pt = codec.preferredPayloadType;
                }
                var channels = codec.channels || codec.numChannels || 1;
                return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
                    (channels !== 1 ? '/' + channels : '') + '\r\n';
            };

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
            SDPUtils.parseExtmap = function (line) {
                var parts = line.substr(9).split(' ');
                return {
                    id: parseInt(parts[0], 10),
                    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
                    uri: parts[1]
                };
            };

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
            SDPUtils.writeExtmap = function (headerExtension) {
                return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
                    (headerExtension.direction && headerExtension.direction !== 'sendrecv'
                        ? '/' + headerExtension.direction
                        : '') +
                    ' ' + headerExtension.uri + '\r\n';
            };

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
            SDPUtils.parseFmtp = function (line) {
                var parsed = {};
                var kv;
                var parts = line.substr(line.indexOf(' ') + 1).split(';');
                for (var j = 0; j < parts.length; j++) {
                    kv = parts[j].trim().split('=');
                    parsed[kv[0].trim()] = kv[1];
                }
                return parsed;
            };

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeFmtp = function (codec) {
                var line = '';
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) {
                    pt = codec.preferredPayloadType;
                }
                if (codec.parameters && Object.keys(codec.parameters).length) {
                    var params = [];
                    Object.keys(codec.parameters).forEach(function (param) {
                        if (codec.parameters[param]) {
                            params.push(param + '=' + codec.parameters[param]);
                        } else {
                            params.push(param);
                        }
                    });
                    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
                }
                return line;
            };

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
            SDPUtils.parseRtcpFb = function (line) {
                var parts = line.substr(line.indexOf(' ') + 1).split(' ');
                return {
                    type: parts.shift(),
                    parameter: parts.join(' ')
                };
            };
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
            SDPUtils.writeRtcpFb = function (codec) {
                var lines = '';
                var pt = codec.payloadType;
                if (codec.preferredPayloadType !== undefined) {
                    pt = codec.preferredPayloadType;
                }
                if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
                    // FIXME: special handling for trr-int?
                    codec.rtcpFeedback.forEach(function (fb) {
                        lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
                            (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
                            '\r\n';
                    });
                }
                return lines;
            };

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
            SDPUtils.parseSsrcMedia = function (line) {
                var sp = line.indexOf(' ');
                var parts = {
                    ssrc: parseInt(line.substr(7, sp - 7), 10)
                };
                var colon = line.indexOf(':', sp);
                if (colon > -1) {
                    parts.attribute = line.substr(sp + 1, colon - sp - 1);
                    parts.value = line.substr(colon + 1);
                } else {
                    parts.attribute = line.substr(sp + 1);
                }
                return parts;
            };

            SDPUtils.parseSsrcGroup = function (line) {
                var parts = line.substr(13).split(' ');
                return {
                    semantics: parts.shift(),
                    ssrcs: parts.map(function (ssrc) {
                        return parseInt(ssrc, 10);
                    })
                };
            };

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
            SDPUtils.getMid = function (mediaSection) {
                var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
                if (mid) {
                    return mid.substr(6);
                }
            };

            SDPUtils.parseFingerprint = function (line) {
                var parts = line.substr(14).split(' ');
                return {
                    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
                    value: parts[1]
                };
            };

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
            SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
                var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
                    'a=fingerprint:');
                // Note: a=setup line is ignored since we use the 'auto' role.
                // Note2: 'algorithm' is not case sensitive except in Edge.
                return {
                    role: 'auto',
                    fingerprints: lines.map(SDPUtils.parseFingerprint)
                };
            };

// Serializes DTLS parameters to SDP.
            SDPUtils.writeDtlsParameters = function (params, setupType) {
                var sdp = 'a=setup:' + setupType + '\r\n';
                params.fingerprints.forEach(function (fp) {
                    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
                });
                return sdp;
            };

// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
            SDPUtils.parseCryptoLine = function (line) {
                var parts = line.substr(9).split(' ');
                return {
                    tag: parseInt(parts[0], 10),
                    cryptoSuite: parts[1],
                    keyParams: parts[2],
                    sessionParams: parts.slice(3),
                };
            };

            SDPUtils.writeCryptoLine = function (parameters) {
                return 'a=crypto:' + parameters.tag + ' ' +
                    parameters.cryptoSuite + ' ' +
                    (typeof parameters.keyParams === 'object'
                        ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
                        : parameters.keyParams) +
                    (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
                    '\r\n';
            };

// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
            SDPUtils.parseCryptoKeyParams = function (keyParams) {
                if (keyParams.indexOf('inline:') !== 0) {
                    return null;
                }
                var parts = keyParams.substr(7).split('|');
                return {
                    keyMethod: 'inline',
                    keySalt: parts[0],
                    lifeTime: parts[1],
                    mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
                    mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
                };
            };

            SDPUtils.writeCryptoKeyParams = function (keyParams) {
                return keyParams.keyMethod + ':'
                    + keyParams.keySalt +
                    (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
                    (keyParams.mkiValue && keyParams.mkiLength
                        ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
                        : '');
            };

// Extracts all SDES paramters.
            SDPUtils.getCryptoParameters = function (mediaSection, sessionpart) {
                var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
                    'a=crypto:');
                return lines.map(SDPUtils.parseCryptoLine);
            };

// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
            SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
                var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
                    'a=ice-ufrag:')[0];
                var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
                    'a=ice-pwd:')[0];
                if (!(ufrag && pwd)) {
                    return null;
                }
                return {
                    usernameFragment: ufrag.substr(12),
                    password: pwd.substr(10),
                };
            };

// Serializes ICE parameters to SDP.
            SDPUtils.writeIceParameters = function (params) {
                return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
                    'a=ice-pwd:' + params.password + '\r\n';
            };

// Parses the SDP media section and returns RTCRtpParameters.
            SDPUtils.parseRtpParameters = function (mediaSection) {
                var description = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: [],
                    rtcp: []
                };
                var lines = SDPUtils.splitLines(mediaSection);
                var mline = lines[0].split(' ');
                for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
                    var pt = mline[i];
                    var rtpmapline = SDPUtils.matchPrefix(
                        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
                    if (rtpmapline) {
                        var codec = SDPUtils.parseRtpMap(rtpmapline);
                        var fmtps = SDPUtils.matchPrefix(
                            mediaSection, 'a=fmtp:' + pt + ' ');
                        // Only the first a=fmtp:<pt> is considered.
                        codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
                        codec.rtcpFeedback = SDPUtils.matchPrefix(
                            mediaSection, 'a=rtcp-fb:' + pt + ' ')
                            .map(SDPUtils.parseRtcpFb);
                        description.codecs.push(codec);
                        // parse FEC mechanisms from rtpmap lines.
                        switch (codec.name.toUpperCase()) {
                            case 'RED':
                            case 'ULPFEC':
                                description.fecMechanisms.push(codec.name.toUpperCase());
                                break;
                            default: // only RED and ULPFEC are recognized as FEC mechanisms.
                                break;
                        }
                    }
                }
                SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
                    description.headerExtensions.push(SDPUtils.parseExtmap(line));
                });
                // FIXME: parse rtcp.
                return description;
            };

// Generates parts of the SDP media section describing the capabilities /
// parameters.
            SDPUtils.writeRtpDescription = function (kind, caps) {
                var sdp = '';

                // Build the mline.
                sdp += 'm=' + kind + ' ';
                sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
                sdp += ' UDP/TLS/RTP/SAVPF ';
                sdp += caps.codecs.map(function (codec) {
                    if (codec.preferredPayloadType !== undefined) {
                        return codec.preferredPayloadType;
                    }
                    return codec.payloadType;
                }).join(' ') + '\r\n';

                sdp += 'c=IN IP4 0.0.0.0\r\n';
                sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

                // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
                caps.codecs.forEach(function (codec) {
                    sdp += SDPUtils.writeRtpMap(codec);
                    sdp += SDPUtils.writeFmtp(codec);
                    sdp += SDPUtils.writeRtcpFb(codec);
                });
                var maxptime = 0;
                caps.codecs.forEach(function (codec) {
                    if (codec.maxptime > maxptime) {
                        maxptime = codec.maxptime;
                    }
                });
                if (maxptime > 0) {
                    sdp += 'a=maxptime:' + maxptime + '\r\n';
                }
                sdp += 'a=rtcp-mux\r\n';

                if (caps.headerExtensions) {
                    caps.headerExtensions.forEach(function (extension) {
                        sdp += SDPUtils.writeExtmap(extension);
                    });
                }
                // FIXME: write fecMechanisms.
                return sdp;
            };

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
            SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
                var encodingParameters = [];
                var description = SDPUtils.parseRtpParameters(mediaSection);
                var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
                var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

                // filter a=ssrc:... cname:, ignore PlanB-msid
                var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                    .map(function (line) {
                        return SDPUtils.parseSsrcMedia(line);
                    })
                    .filter(function (parts) {
                        return parts.attribute === 'cname';
                    });
                var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
                var secondarySsrc;

                var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
                    .map(function (line) {
                        var parts = line.substr(17).split(' ');
                        return parts.map(function (part) {
                            return parseInt(part, 10);
                        });
                    });
                if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
                    secondarySsrc = flows[0][1];
                }

                description.codecs.forEach(function (codec) {
                    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
                        var encParam = {
                            ssrc: primarySsrc,
                            codecPayloadType: parseInt(codec.parameters.apt, 10)
                        };
                        if (primarySsrc && secondarySsrc) {
                            encParam.rtx = {ssrc: secondarySsrc};
                        }
                        encodingParameters.push(encParam);
                        if (hasRed) {
                            encParam = JSON.parse(JSON.stringify(encParam));
                            encParam.fec = {
                                ssrc: primarySsrc,
                                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
                            };
                            encodingParameters.push(encParam);
                        }
                    }
                });
                if (encodingParameters.length === 0 && primarySsrc) {
                    encodingParameters.push({
                        ssrc: primarySsrc
                    });
                }

                // we support both b=AS and b=TIAS but interpret AS as TIAS.
                var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
                if (bandwidth.length) {
                    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
                        bandwidth = parseInt(bandwidth[0].substr(7), 10);
                    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
                        // use formula from JSEP to convert b=AS to TIAS value.
                        bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
                            - (50 * 40 * 8);
                    } else {
                        bandwidth = undefined;
                    }
                    encodingParameters.forEach(function (params) {
                        params.maxBitrate = bandwidth;
                    });
                }
                return encodingParameters;
            };

// parses http://draft.ortc.org/#rtcrtcpparameters*
            SDPUtils.parseRtcpParameters = function (mediaSection) {
                var rtcpParameters = {};

                // Gets the first SSRC. Note tha with RTX there might be multiple
                // SSRCs.
                var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                    .map(function (line) {
                        return SDPUtils.parseSsrcMedia(line);
                    })
                    .filter(function (obj) {
                        return obj.attribute === 'cname';
                    })[0];
                if (remoteSsrc) {
                    rtcpParameters.cname = remoteSsrc.value;
                    rtcpParameters.ssrc = remoteSsrc.ssrc;
                }

                // Edge uses the compound attribute instead of reducedSize
                // compound is !reducedSize
                var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
                rtcpParameters.reducedSize = rsize.length > 0;
                rtcpParameters.compound = rsize.length === 0;

                // parses the rtcp-mux attrіbute.
                // Note that Edge does not support unmuxed RTCP.
                var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
                rtcpParameters.mux = mux.length > 0;

                return rtcpParameters;
            };

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
            SDPUtils.parseMsid = function (mediaSection) {
                var parts;
                var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
                if (spec.length === 1) {
                    parts = spec[0].substr(7).split(' ');
                    return {stream: parts[0], track: parts[1]};
                }
                var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                    .map(function (line) {
                        return SDPUtils.parseSsrcMedia(line);
                    })
                    .filter(function (msidParts) {
                        return msidParts.attribute === 'msid';
                    });
                if (planB.length > 0) {
                    parts = planB[0].value.split(' ');
                    return {stream: parts[0], track: parts[1]};
                }
            };

// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
            SDPUtils.parseSctpDescription = function (mediaSection) {
                var mline = SDPUtils.parseMLine(mediaSection);
                var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
                var maxMessageSize;
                if (maxSizeLine.length > 0) {
                    maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
                }
                if (isNaN(maxMessageSize)) {
                    maxMessageSize = 65536;
                }
                var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
                if (sctpPort.length > 0) {
                    return {
                        port: parseInt(sctpPort[0].substr(12), 10),
                        protocol: mline.fmt,
                        maxMessageSize: maxMessageSize
                    };
                }
                var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
                if (sctpMapLines.length > 0) {
                    var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
                        .substr(10)
                        .split(' ');
                    return {
                        port: parseInt(parts[0], 10),
                        protocol: parts[1],
                        maxMessageSize: maxMessageSize
                    };
                }
            };

// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
            SDPUtils.writeSctpDescription = function (media, sctp) {
                var output = [];
                if (media.protocol !== 'DTLS/SCTP') {
                    output = [
                        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
                        'c=IN IP4 0.0.0.0\r\n',
                        'a=sctp-port:' + sctp.port + '\r\n'
                    ];
                } else {
                    output = [
                        'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
                        'c=IN IP4 0.0.0.0\r\n',
                        'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
                    ];
                }
                if (sctp.maxMessageSize !== undefined) {
                    output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
                }
                return output.join('');
            };

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
            SDPUtils.generateSessionId = function () {
                return Math.random().toString().substr(2, 21);
            };

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
            SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
                var sessionId;
                var version = sessVer !== undefined ? sessVer : 2;
                if (sessId) {
                    sessionId = sessId;
                } else {
                    sessionId = SDPUtils.generateSessionId();
                }
                var user = sessUser || 'thisisadapterortc';
                // FIXME: sess-id should be an NTP timestamp.
                return 'v=0\r\n' +
                    'o=' + user + ' ' + sessionId + ' ' + version +
                    ' IN IP4 127.0.0.1\r\n' +
                    's=-\r\n' +
                    't=0 0\r\n';
            };

            SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
                var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

                // Map ICE parameters (ufrag, pwd) to SDP.
                sdp += SDPUtils.writeIceParameters(
                    transceiver.iceGatherer.getLocalParameters());

                // Map DTLS parameters to SDP.
                sdp += SDPUtils.writeDtlsParameters(
                    transceiver.dtlsTransport.getLocalParameters(),
                    type === 'offer' ? 'actpass' : 'active');

                sdp += 'a=mid:' + transceiver.mid + '\r\n';

                if (transceiver.direction) {
                    sdp += 'a=' + transceiver.direction + '\r\n';
                } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
                    sdp += 'a=sendrecv\r\n';
                } else if (transceiver.rtpSender) {
                    sdp += 'a=sendonly\r\n';
                } else if (transceiver.rtpReceiver) {
                    sdp += 'a=recvonly\r\n';
                } else {
                    sdp += 'a=inactive\r\n';
                }

                if (transceiver.rtpSender) {
                    // spec.
                    var msid = 'msid:' + stream.id + ' ' +
                        transceiver.rtpSender.track.id + '\r\n';
                    sdp += 'a=' + msid;

                    // for Chrome.
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                        ' ' + msid;
                    if (transceiver.sendEncodingParameters[0].rtx) {
                        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                            ' ' + msid;
                        sdp += 'a=ssrc-group:FID ' +
                            transceiver.sendEncodingParameters[0].ssrc + ' ' +
                            transceiver.sendEncodingParameters[0].rtx.ssrc +
                            '\r\n';
                    }
                }
                // FIXME: this should be written by writeRtpDescription.
                sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
                    ' cname:' + SDPUtils.localCName + '\r\n';
                if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
                    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                        ' cname:' + SDPUtils.localCName + '\r\n';
                }
                return sdp;
            };

// Gets the direction from the mediaSection or the sessionpart.
            SDPUtils.getDirection = function (mediaSection, sessionpart) {
                // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
                var lines = SDPUtils.splitLines(mediaSection);
                for (var i = 0; i < lines.length; i++) {
                    switch (lines[i]) {
                        case 'a=sendrecv':
                        case 'a=sendonly':
                        case 'a=recvonly':
                        case 'a=inactive':
                            return lines[i].substr(2);
                        default:
                        // FIXME: What should happen here?
                    }
                }
                if (sessionpart) {
                    return SDPUtils.getDirection(sessionpart);
                }
                return 'sendrecv';
            };

            SDPUtils.getKind = function (mediaSection) {
                var lines = SDPUtils.splitLines(mediaSection);
                var mline = lines[0].split(' ');
                return mline[0].substr(2);
            };

            SDPUtils.isRejected = function (mediaSection) {
                return mediaSection.split(' ', 2)[1] === '0';
            };

            SDPUtils.parseMLine = function (mediaSection) {
                var lines = SDPUtils.splitLines(mediaSection);
                var parts = lines[0].substr(2).split(' ');
                return {
                    kind: parts[0],
                    port: parseInt(parts[1], 10),
                    protocol: parts[2],
                    fmt: parts.slice(3).join(' ')
                };
            };

            SDPUtils.parseOLine = function (mediaSection) {
                var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
                var parts = line.substr(2).split(' ');
                return {
                    username: parts[0],
                    sessionId: parts[1],
                    sessionVersion: parseInt(parts[2], 10),
                    netType: parts[3],
                    addressType: parts[4],
                    address: parts[5]
                };
            };

// a very naive interpretation of a valid SDP.
            SDPUtils.isValidSDP = function (blob) {
                if (typeof blob !== 'string' || blob.length === 0) {
                    return false;
                }
                var lines = SDPUtils.splitLines(blob);
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
                        return false;
                    }
                    // TODO: check the modifier a bit more.
                }
                return true;
            };

// Expose public methods.
            if (typeof module === 'object') {
                module.exports = SDPUtils;
            }

        }, {}]
    }, {}, [1])(1)
});/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return String(o);}
if(type==='string'){return $.quoteString(o);}
if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
return'['+pairs.join(',')+']';}
if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';};}(window.$conpeek.jquery));/*
 * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 *
 * The Initial Developer of the Original Code is
 * Anthony Minessale II <anthm@freeswitch.org>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Anthony Minessale II <anthm@freeswitch.org>
 *
 * jquery.FSRTC.js - WebRTC Glue code
 *
 */

(function ($) {

    // Find the line in sdpLines that starts with |prefix|, and, if specified,
    // contains |substr| (case-insensitive search).
    function findLine(sdpLines, prefix, substr) {
        return findLineInRange(sdpLines, 0, -1, prefix, substr);
    }

    // Find the line in sdpLines[startLine...endLine - 1] that starts with |prefix|
    // and, if specified, contains |substr| (case-insensitive search).
    function findLineInRange(sdpLines, startLine, endLine, prefix, substr) {
        var realEndLine = (endLine != -1) ? endLine : sdpLines.length;
        for (var i = startLine; i < realEndLine; ++i) {
            if (sdpLines[i].indexOf(prefix) === 0) {
                if (!substr || sdpLines[i].toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
                    return i;
                }
            }
        }
        return null;
    }

    // Gets the codec payload type from an a=rtpmap:X line.
    function getCodecPayloadType(sdpLine) {
        var pattern = new RegExp('a=rtpmap:(\\d+) \\w+\\/\\d+');
        var result = sdpLine.match(pattern);
        return (result && result.length == 2) ? result[1] : null;
    }

    // Returns a new m= line with the specified codec as the first one.
    function setDefaultCodec(mLine, payload) {
        var elements = mLine.split(' ');
        var newLine = [];
        var index = 0;
        for (var i = 0; i < elements.length; i++) {
            if (index === 3) { // Format of media starts from the fourth.
                newLine[index++] = payload; // Put target payload to the first.
            }
            if (elements[i] !== payload) newLine[index++] = elements[i];
        }
        return newLine.join(' ');
    }

    $.FSRTC = function (options) {
        this.options = $.extend({
            useVideo: null,
            useStereo: false,
            userData: null,
            localVideo: null,
            screenShare: false,
            useCamera: "any",
            iceServers: false,
            videoParams: {},
            audioParams: {},
            callbacks: {
                onICEComplete: function () {
                },
                onICE: function () {
                },
                onOfferSDP: function () {
                }
            },
            useStream: null,
            onlyVideoPreview: false,
        }, options);

        this.audioEnabled = true;
        this.videoEnabled = true;


        this.mediaData = {
            SDP: null,
            profile: {},
            candidateList: []
        };

        this.constraints = {
            offerToReceiveAudio: this.options.useSpeak === "none" ? false : true,
            offerToReceiveVideo: this.options.useVideo ? true : false,
        };

        if (self.options.useVideo) {
            self.options.useVideo.style.display = 'none';
        }

        setCompat();
        checkCompat();
    };

    $.FSRTC.validRes = [];

    $.FSRTC.prototype.useVideo = function (obj, local) {
        var self = this;

        if (obj) {
            self.options.useVideo = obj;
            self.options.localVideo = local;
            self.constraints.offerToReceiveVideo = true;
        } else {
            self.options.useVideo = null;
            self.options.localVideo = null;
            self.constraints.offerToReceiveVideo = false;
        }

        if (self.options.useVideo) {
            self.options.useVideo.style.display = 'none';
        }
    };

    $.FSRTC.prototype.useStereo = function (on) {
        var self = this;
        self.options.useStereo = on;
    };

    // Sets Opus in stereo if stereo is enabled, by adding the stereo=1 fmtp param.
    $.FSRTC.prototype.stereoHack = function (sdp) {
        var self = this;

        if (!self.options.useStereo) {
            return sdp;
        }

        var sdpLines = sdp.split('\r\n');

        // Find opus payload.
        var opusIndex = findLine(sdpLines, 'a=rtpmap', 'opus/48000'), opusPayload;

        if (!opusIndex) {
            return sdp;
        } else {
            opusPayload = getCodecPayloadType(sdpLines[opusIndex]);
        }

        // Find the payload in fmtp line.
        var fmtpLineIndex = findLine(sdpLines, 'a=fmtp:' + opusPayload.toString());

        if (fmtpLineIndex === null) {
            // create an fmtp line
            sdpLines[opusIndex] = sdpLines[opusIndex] + '\r\na=fmtp:' + opusPayload.toString() + " stereo=1; sprop-stereo=1"
        } else {
            // Append stereo=1 to fmtp line.
            sdpLines[fmtpLineIndex] = sdpLines[fmtpLineIndex].concat('; stereo=1; sprop-stereo=1');
        }

        sdp = sdpLines.join('\r\n');
        return sdp;
    };

    function setCompat() {
    }

    function checkCompat() {
        return true;
    }

    function onStreamError(self, e) {
        console.log('There has been a problem retrieving the streams - did you allow access? Check Device Resolution', e);
        doCallback(self, "onError", e);
    }

    function onStreamSuccess(self, stream) {
        console.log("Stream Success");
        doCallback(self, "onStream", stream);
    }

    function onRemoteStreamSuccess(self, stream) {
        console.log("Remote Stream Success");
        doCallback(self, "onRemoteStream", stream);
    }

    function onICE(self, candidate) {
        self.mediaData.candidate = candidate;
        self.mediaData.candidateList.push(self.mediaData.candidate);

        doCallback(self, "onICE");
    }

    function doCallback(self, func, arg) {
        if (func in self.options.callbacks) {
            self.options.callbacks[func](self, arg);
        }
    }

    function onICEComplete(self, candidate) {
        console.log("ICE Complete");
        doCallback(self, "onICEComplete");
    }

    function onChannelError(self, e) {
        console.error("Channel Error", e);
        doCallback(self, "onError", e);
    }

    function onICESDP(self, sdp) {
        self.mediaData.SDP = self.stereoHack(sdp.sdp);
        console.log("ICE SDP");
        doCallback(self, "onICESDP");
    }

    function onAnswerSDP(self, sdp) {
        self.answer.SDP = self.stereoHack(sdp.sdp);
        console.log("ICE ANSWER SDP");
        doCallback(self, "onAnswerSDP", self.answer.SDP);
    }

    function onMessage(self, msg) {
        console.log("Message");
        doCallback(self, "onICESDP", msg);
    }

    FSRTCattachMediaStream = function (element, stream) {
        if (typeof element.srcObject !== 'undefined') {
            element.srcObject = stream;
        } else {
            console.error('Error attaching stream to element.');
        }
    }

    function onRemoteStream(self, stream) {
        if (self.options.useVideo) {
            self.options.useVideo.style.display = 'block';

            // Hacks for Mobile Safari
            var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;

            if (iOS) {
                self.options.useVideo.setAttribute("playsinline", true);
            }
        }

        var element = self.options.useAudio;
        console.log("REMOTE STREAM", stream, element);

        FSRTCattachMediaStream(element, stream);


        //self.options.useAudio.play();
        self.remoteStream = stream;
        onRemoteStreamSuccess(self, stream);
    }

    function onOfferSDP(self, sdp) {
        self.mediaData.SDP = self.stereoHack(sdp.sdp);
        console.log("Offer SDP");
        doCallback(self, "onOfferSDP");
    }

    $.FSRTC.prototype.answer = function (sdp, onSuccess, onError) {
        this.peer.addAnswerSDP({
                type: "answer",
                sdp: sdp
            },
            onSuccess, onError);
    };

    $.FSRTC.prototype.stopPeer = function () {
        if (self.peer) {
            console.log("stopping peer");
            self.peer.stop();
        }
    }

    $.FSRTC.prototype.stop = function () {
        var self = this;

        if (self.options.useVideo) {
            self.options.useVideo.style.display = 'none';
            self.options.useVideo['src'] = '';
        }

        if (self.localStream && !self.options.useStream) {
            if (typeof self.localStream.stop == 'function') {
                self.localStream.stop();
            } else {
                if (self.localStream.active) {
                    var tracks = self.localStream.getTracks();
                    console.log(tracks);
                    tracks.forEach(function (track, index) {
                        console.log(track);
                        track.stop();
                    })
                }
            }
            self.localStream = null;
        }

        if (self.options.localVideo) {
            deactivateLocalVideo(self.options.localVideo);
        }

        if (self.options.localVideoStream && !self.options.useStream) {
            if (typeof self.options.localVideoStream.stop == 'function') {
                self.options.localVideoStream.stop();
            } else {
                if (self.options.localVideoStream.active) {
                    var tracks = self.options.localVideoStream.getTracks();
                    console.log(tracks);
                    tracks.forEach(function (track, index) {
                        console.log(track);
                        track.stop();
                    })
                }
            }
        }

        if (self.peer) {
            console.log("stopping peer");
            self.peer.stop();
        }
    };

    $.FSRTC.prototype.getMute = function () {
        var self = this;
        return self.audioEnabled;
    }

    $.FSRTC.prototype.setMute = function (what) {
        var self = this;
        if (!self.localStream) {
            return false;
        }
        var audioTracks = self.localStream.getAudioTracks();

        for (var i = 0, len = audioTracks.length; i < len; i++) {
            switch (what) {
                case "on":
                    audioTracks[i].enabled = true;
                    break;
                case "off":
                    audioTracks[i].enabled = false;
                    break;
                case "toggle":
                    audioTracks[i].enabled = !audioTracks[i].enabled;
                default:
                    break;
            }

            self.audioEnabled = audioTracks[i].enabled;
        }

        return !self.audioEnabled;
    }

    $.FSRTC.prototype.getVideoMute = function () {
        var self = this;
        return self.videoEnabled;
    }

    $.FSRTC.prototype.setVideoMute = function (what) {
        var self = this;
        if (!self.localStream) {
            return false;
        }
        var videoTracks = self.localStream.getVideoTracks();

        for (var i = 0, len = videoTracks.length; i < len; i++) {
            switch (what) {
                case "on":
                    videoTracks[i].enabled = true;
                    break;
                case "off":
                    videoTracks[i].enabled = false;
                    break;
                case "toggle":
                    videoTracks[i].enabled = !videoTracks[i].enabled;
                default:
                    break;
            }

            self.videoEnabled = videoTracks[i].enabled;
        }

        return !self.videoEnabled;
    }

    $.FSRTC.prototype.createAnswer = function (params) {
        var self = this;
        self.type = "answer";
        self.remoteSDP = params.sdp;
        console.debug("inbound sdp: ", params.sdp);

        function onSuccess(stream) {
            self.localStream = stream;

            self.peer = FSRTCPeerConnection({
                type: self.type,
                attachStream: self.localStream,
                onICE: function (candidate) {
                    return onICE(self, candidate);
                },
                onICEComplete: function () {
                    return onICEComplete(self);
                },
                onRemoteStream: function (stream) {
                    return onRemoteStream(self, stream);
                },
                onICESDP: function (sdp) {
                    return onICESDP(self, sdp);
                },
                onChannelError: function (e) {
                    return onChannelError(self, e);
                },
                constraints: self.constraints,
                iceServers: self.options.iceServers,
                offerSDP: {
                    type: "offer",
                    sdp: self.remoteSDP
                },
                turnServer: self.options.turnServer
            });

            onStreamSuccess(self, stream);
        }

        function onError(e) {
            onStreamError(self, e);
        }

        var mediaParams = getMediaParams(self);

        console.log("Audio constraints", mediaParams.audio);
        console.log("Video constraints", mediaParams.video);

        if (self.options.useVideo && self.options.localVideo && !self.options.useStream) {
            getUserMedia({
                constraints: {
                    audio: false,
                    video: {deviceId: params.useCamera},
                },
                localVideo: self.options.localVideo,
                onsuccess: function (e) {
                    self.options.localVideoStream = e;
                    console.log("local video ready");
                },
                onerror: function (e) {
                    console.error("local video error!");
                }
            });
        }

        if (self.options.useStream) {
            if (self.options.useVideo) {
                self.options.localVideoStream = self.options.useStream;
                if (self.options.localVideo) {
                    activateLocalVideo(self.options.localVideo, self.options.useStream);
                }
            }
            onSuccess(self.options.useStream);
        }
        else {
            getUserMedia({
                constraints: {
                    audio: mediaParams.audio,
                    video: mediaParams.video
                },
                video: mediaParams.useVideo,
                onsuccess: onSuccess,
                onerror: onError
            });
        }

    };

    function getMediaParams(obj) {

        var audio;

        if (obj.options.useMic && obj.options.useMic === "none") {
            console.log("Microphone Disabled");
            audio = false;
        } else if (obj.options.videoParams && obj.options.screenShare) {//obj.options.videoParams.chromeMediaSource == 'desktop') {
            console.error("SCREEN SHARE", obj.options.videoParams);
            audio = false;
        } else {
            audio = {};

            if (obj.options.audioParams) {
                audio = obj.options.audioParams;
            }

            if (obj.options.useMic !== "any") {
                //audio.optional = [{sourceId: obj.options.useMic}];
                audio.deviceId = {exact: obj.options.useMic};
            }
        }

        if (obj.options.useVideo && obj.options.localVideo && !obj.options.useStream && !obj.options.onlyVideoPreview) {
            getUserMedia({
                constraints: {
                    audio: false,
                    video: {deviceId: obj.options.useCamera},
                },
                localVideo: obj.options.localVideo,
                onsuccess: function (e) {
                    obj.options.localVideoStream = e;
                    console.log("local video ready");
                },
                onerror: function (e) {
                    console.error("local video error!");
                }
            });
        }

        var video = {};
        var bestFrameRate = obj.options.videoParams.vertoBestFrameRate;
        var minFrameRate = obj.options.videoParams.minFrameRate || 15;
        delete obj.options.videoParams.vertoBestFrameRate;

        if (obj.options.screenShare) {
            if (!obj.options.useCamera && !!navigator.mozGetUserMedia) {
                //This is an issue, only FireFox needs to ask this additional question if its screen or window we need a better way
                var dowin = window.confirm("Do you want to share an application window?  If not you can share an entire screen.");

                video = {
                    width: {min: obj.options.videoParams.minWidth, max: obj.options.videoParams.maxWidth},
                    height: {min: obj.options.videoParams.minHeight, max: obj.options.videoParams.maxHeight},
                    mediaSource: dowin ? "window" : "screen"
                }
            } else {
                var opt = [];
                if (obj.options.useCamera) {
                    opt.push({sourceId: obj.options.useCamera});
                }

                if (bestFrameRate) {
                    opt.push({minFrameRate: bestFrameRate});
                    opt.push({maxFrameRate: bestFrameRate});
                }

                video = {
                    mandatory: obj.options.videoParams,
                    optional: opt
                };
                // NOTE: This is a workaround for
                // https://bugs.chromium.org/p/chromium/issues/detail?id=862325
                if (!!navigator.userAgent.match(/Android/i)) {
                    delete video.frameRate.min;
                }
            }
        } else {

            video = {
                //mandatory: obj.options.videoParams,
                width: {min: obj.options.videoParams.minWidth, max: obj.options.videoParams.maxWidth, ideal: obj.options.videoParams.idealWidth},
                height: {min: obj.options.videoParams.minHeight, max: obj.options.videoParams.maxHeight, ideal: obj.options.videoParams.idealHeight}
            };


            var useVideo = obj.options.useVideo;

            if (useVideo && obj.options.useCamera && obj.options.useCamera !== "none" && !obj.options.onlyVideoPreview) {
                //if (!video.optional) {
                //video.optional = [];
                //}


                if (obj.options.useCamera !== "any") {
                    //video.optional.push({sourceId: obj.options.useCamera});
                    video.deviceId = {
                        exact: obj.options.useCamera,
                    };
                }

                if (bestFrameRate) {
                    //video.optional.push({minFrameRate: bestFrameRate});
                    //video.optional.push({maxFrameRate: bestFrameRate});
                    video.frameRate = {ideal: bestFrameRate, min: minFrameRate, max: 30};
                }

                if (obj.options.isMobile && obj.options.facingMode && ["user", "environment"].indexOf(obj.options.facingMode) > -1) {
                    video.facingMode = obj.options.facingMode
                }
            } else {
                console.log("Camera Disabled");
                video = false;
                useVideo = false;
            }
        }

        return {audio: audio, video: video, useVideo: useVideo};
    }

    $.FSRTC.prototype.call = function (profile) {
        checkCompat();

        var self = this;
        var screen = false;

        self.type = "offer";

        if (self.options.videoParams && self.options.screenShare) { //self.options.videoParams.chromeMediaSource == 'desktop') {
            screen = true;
        }

        function onSuccess(stream) {
            self.localStream = stream;

            if (screen) {
                self.constraints.offerToReceiveVideo = false;
                self.constraints.offerToReceiveAudio = false;
                self.constraints.offerToSendAudio = false;
            }

            if (self.options.onlyVideoPreview) {
                self.constraints.offerToReceiveVideo = true;
                self.constraints.offerToReceiveAudio = true;
                self.constraints.offerToSendVideo = false;
                self.constraints.offerToSendAudio = true;

                if (self.options.useMic === "none") {
                    self.constraints.offerToSendAudio = false;
                }
            }

            self.peer = FSRTCPeerConnection({
                type: self.type,
                attachStream: self.localStream,
                onICE: function (candidate) {
                    return onICE(self, candidate);
                },
                onICEComplete: function () {
                    return onICEComplete(self);
                },
                onRemoteStream: screen ? function (stream) {
                } : function (stream) {
                    return onRemoteStream(self, stream);
                },
                onOfferSDP: function (sdp) {
                    return onOfferSDP(self, sdp);
                },
                onICESDP: function (sdp) {
                    return onICESDP(self, sdp);
                },
                onChannelError: function (e) {
                    return onChannelError(self, e);
                },
                constraints: self.constraints,
                iceServers: self.options.iceServers,
                turnServer: self.options.turnServer
            });

            onStreamSuccess(self, stream);
        }

        function onError(e) {
            onStreamError(self, e);
        }

        var mediaParams = getMediaParams(self);

        console.log("Audio constraints", mediaParams.audio);
        console.log("Video constraints", mediaParams.video);

        if (self.options.useStream) {
            if (self.options.useVideo) {
                self.options.localVideoStream = self.options.useStream;
                if (self.options.localVideo) {
                    activateLocalVideo(self.options.localVideo, self.options.useStream);
                }
            }
            onSuccess(self.options.useStream);
        }
        else if (mediaParams.audio || mediaParams.video) {

            getUserMedia({
                constraints: {
                    audio: mediaParams.audio,
                    video: mediaParams.video
                },
                video: mediaParams.useVideo,
                onsuccess: onSuccess,
                onerror: onError
            });

        } else {
            onSuccess(null);
        }


        /*
        navigator.getUserMedia({
            video: self.options.useVideo,
            audio: true
        }, onSuccess, onError);
        */

    };

    // DERIVED from RTCPeerConnection-v1.5
    // 2013, @muazkh - github.com/muaz-khan
    // MIT License - https://www.webrtc-experiment.com/licence/
    // Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCPeerConnection

    function FSRTCPeerConnection(options) {
        var gathering = false, done = false;
        var config = {};
        var default_ice = [{urls: ['stun:stun.l.google.com:19302']}];

        if (self.options.turnServer) {
            default_ice.push(self.options.turnServer)
        }

        if (options.iceServers) {
            if (typeof(options.iceServers) === "boolean") {
                config.iceServers = default_ice;
            } else {
                config.iceServers = options.iceServers;
            }
        }

        config.bundlePolicy = "max-compat";

        var peer = new window.RTCPeerConnection(config);

        openOffererChannel();
        var x = 0;

        function ice_handler() {

            done = true;
            gathering = null;

            if (options.onICEComplete) {
                options.onICEComplete();
            }

            if (options.type == "offer") {
                options.onICESDP(peer.localDescription);
            } else {
                if (!x && options.onICESDP) {
                    options.onICESDP(peer.localDescription);
                }
            }
        }

        peer.onicecandidate = function (event) {

            if (done) {
                return;
            }

            if (!gathering) {
                gathering = setTimeout(ice_handler, 1000);
            }

            if (event) {
                if (event.candidate) {
                    options.onICE(event.candidate);
                }
            } else {
                done = true;

                if (gathering) {
                    clearTimeout(gathering);
                    gathering = null;
                }

                ice_handler();
            }
        };

        // attachStream = MediaStream;
        if (options.attachStream) peer.addStream(options.attachStream);

        // attachStreams[0] = audio-stream;
        // attachStreams[1] = video-stream;
        // attachStreams[2] = screen-capturing-stream;
        if (options.attachStreams && options.attachStream.length) {
            var streams = options.attachStreams;
            for (var i = 0; i < streams.length; i++) {
                peer.addStream(streams[i]);
            }
        }

        peer.onaddstream = function (event) {
            var remoteMediaStream = event.stream;

            // onRemoteStreamEnded(MediaStream)
            remoteMediaStream.oninactive = function () {
                if (options.onRemoteStreamEnded) options.onRemoteStreamEnded(remoteMediaStream);
            };

            // onRemoteStream(MediaStream)
            if (options.onRemoteStream) options.onRemoteStream(remoteMediaStream);

            //console.debug('on:add:stream', remoteMediaStream);
        };

        //var constraints = options.constraints || {
        //  offerToReceiveAudio: true,
        //offerToReceiveVideo: true
        //};

        // onOfferSDP(RTCSessionDescription)
        function createOffer() {
            if (!options.onOfferSDP) return;

            peer.createOffer(function (sessionDescription) {
                    sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                    peer.setLocalDescription(sessionDescription);
                    options.onOfferSDP(sessionDescription);
                },
                onSdpError, options.constraints);
        }

        // onAnswerSDP(RTCSessionDescription)
        function createAnswer() {
            if (options.type != "answer") return;

            //options.offerSDP.sdp = addStereo(options.offerSDP.sdp);
            peer.setRemoteDescription(new window.RTCSessionDescription(options.offerSDP), onSdpSuccess, onSdpError);
            peer.createAnswer(function (sessionDescription) {
                    sessionDescription.sdp = serializeSdp(sessionDescription.sdp);
                    peer.setLocalDescription(sessionDescription);
                    if (options.onAnswerSDP) {
                        options.onAnswerSDP(sessionDescription);
                    }
                },
                onSdpError);
        }


        if ((options.onChannelMessage) || !options.onChannelMessage) {
            createOffer();
            createAnswer();
        }

        // DataChannel Bandwidth
        function setBandwidth(sdp) {
            // remove existing bandwidth lines
            sdp = sdp.replace(/b=AS([^\r\n]+\r\n)/g, '');
            sdp = sdp.replace(/a=mid:data\r\n/g, 'a=mid:data\r\nb=AS:1638400\r\n');

            return sdp;
        }

        // old: FF<>Chrome interoperability management
        function getInteropSDP(sdp) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
                extractedChars = '';

            function getChars() {
                extractedChars += chars[parseInt(Math.random() * 40)] || '';
                if (extractedChars.length < 40) getChars();

                return extractedChars;
            }

            // usually audio-only streaming failure occurs out of audio-specific crypto line
            // a=crypto:1 AES_CM_128_HMAC_SHA1_32 --------- kAttributeCryptoVoice
            if (options.onAnswerSDP) sdp = sdp.replace(/(a=crypto:0 AES_CM_128_HMAC_SHA1_32)(.*?)(\r\n)/g, '');

            // video-specific crypto line i.e. SHA1_80
            // a=crypto:1 AES_CM_128_HMAC_SHA1_80 --------- kAttributeCryptoVideo
            var inline = getChars() + '\r\n' + (extractedChars = '');
            sdp = sdp.indexOf('a=crypto') == -1 ? sdp.replace(/c=IN/g, 'a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:' + inline + 'c=IN') : sdp;

            return sdp;
        }

        function serializeSdp(sdp) {
            return sdp;
        }

        // DataChannel management
        var channel;

        function openOffererChannel() {
            if (!options.onChannelMessage) return;

            _openOffererChannel();

            return;
        }

        function _openOffererChannel() {
            channel = peer.createDataChannel(options.channel || 'RTCDataChannel', {
                reliable: false
            });

            setChannelEvents();
        }

        function setChannelEvents() {
            channel.onmessage = function (event) {
                if (options.onChannelMessage) options.onChannelMessage(event);
            };

            channel.onopen = function () {
                if (options.onChannelOpened) options.onChannelOpened(channel);
            };
            channel.onclose = function (event) {
                if (options.onChannelClosed) options.onChannelClosed(event);

                console.warn('WebRTC DataChannel closed', event);
            };
            channel.onerror = function (event) {
                if (options.onChannelError) options.onChannelError(event);

                console.error('WebRTC DataChannel error', event);
            };
        }

        function openAnswererChannel() {
            peer.ondatachannel = function (event) {
                channel = event.channel;
                channel.binaryType = 'blob';
                setChannelEvents();
            };

            return;
        }

        // fake:true is also available on chrome under a flag!
        function useless() {
            log('Error in fake:true');
        }

        function onSdpSuccess() {
        }

        function onSdpError(e) {
            if (options.onChannelError) {
                options.onChannelError(e);
            }
            console.error('sdp error:', e);
        }

        return {
            addAnswerSDP: function (sdp, cbSuccess, cbError) {

                peer.setRemoteDescription(new window.RTCSessionDescription(sdp), cbSuccess ? cbSuccess : onSdpSuccess, cbError ? cbError : onSdpError);
            },
            addICE: function (candidate) {
                peer.addIceCandidate(new window.RTCIceCandidate({
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    candidate: candidate.candidate
                }));
            },

            peer: peer,
            channel: channel,
            sendData: function (message) {
                if (channel) {
                    channel.send(message);
                }
            },

            stop: function () {
                peer.close();
                if (options.attachStream) {
                    if (typeof options.attachStream.stop == 'function') {
                        options.attachStream.stop();
                    } else {
                        options.attachStream.active = false;
                    }
                }
            }

        };
    }

    // getUserMedia
    var video_constraints = {
        //mandatory: {},
        //optional: []
    };

    function activateLocalVideo(el, stream) {
        el.srcObject = stream;
        el.style.display = 'block';
    }

    function deactivateLocalVideo(el) {
        el.srcObject = null;
        el.style.display = 'none';
    }

    function getUserMedia(options) {
        var n = navigator,
            media;
        n.getMedia = n.getUserMedia;
        n.getMedia(options.constraints || {
            audio: true,
            video: video_constraints
        },
            streaming, options.onerror ||
            function (e) {
                console.error(e);
            });

        function streaming(stream) {
            if (options.localVideo) {
                activateLocalVideo(options.localVideo, stream);
            }

            if (options.onsuccess) {
                options.onsuccess(stream);
            }

            media = stream;
        }

        return media;
    }

    $.FSRTC.resSupported = function (w, h) {
        for (var i in $.FSRTC.validRes) {
            if ($.FSRTC.validRes[i][0] == w && $.FSRTC.validRes[i][1] == h) {
                return true;
            }
        }

        return false;
    }

    $.FSRTC.bestResSupported = function () {
        var w = 0, h = 0;

        for (var i in $.FSRTC.validRes) {
            if ($.FSRTC.validRes[i][0] >= w && $.FSRTC.validRes[i][1] >= h) {
                w = $.FSRTC.validRes[i][0];
                h = $.FSRTC.validRes[i][1];
            }
        }

        return [w, h];
    }

    var resList = [[160, 120], [320, 180], [320, 240], [640, 360], [640, 480], [1280, 720], [1920, 1080]];
    var resI = 0;
    var ttl = 0;

    var checkRes = function (cam, func) {

        if (resI >= resList.length) {
            var res = {
                'validRes': $.FSRTC.validRes,
                'bestResSupported': $.FSRTC.bestResSupported()
            };

            localStorage.setItem("res_" + cam, $.toJSON(res));

            if (func) return func(res);
            return;
        }

        w = resList[resI][0];
        h = resList[resI][1];
        resI++;

        var video = {
            width: {exact: w},
            height: {exact: h}
        };

        if (cam !== "any") {
            video.deviceId = {
                exact: cam,
            };
        }

        getUserMedia({
            constraints: {
                audio: ttl++ == 0,
                video: video
            },
            onsuccess: function (e) {
                e.getTracks().forEach(function (track) {
                    track.stop();
                });
                console.info(w + "x" + h + " supported.");
                $.FSRTC.validRes.push([w, h]);
                checkRes(cam, func);
            },
            onerror: function (e) {
                console.warn(w + "x" + h + " not supported.");
                checkRes(cam, func);
            }
        });
    }


    $.FSRTC.getValidRes = function (cam, func) {
        var used = [];
        var cached = localStorage.getItem("res_" + cam);

        if (cached) {
            var cache = $.parseJSON(cached);

            if (cache) {
                $.FSRTC.validRes = cache.validRes;
                console.log("CACHED RES FOR CAM " + cam, cache);
            } else {
                console.error("INVALID CACHE");
            }
            return func ? func(cache) : null;
        }


        $.FSRTC.validRes = [];
        resI = 0;

        checkRes(cam, func);
    }

    $.FSRTC.checkPerms = function (runtime, check_audio, check_video) {
        getUserMedia({
            constraints: {
                audio: check_audio,
                video: check_video,
            },
            onsuccess: function (e) {

                e.getTracks().forEach(function (track) {
                    track.stop();
                });

                console.info("media perm init complete");
                if (runtime) {
                    setTimeout(runtime, 100, true);
                }
            },
            onerror: function (e) {
                if (check_video && check_audio) {
                    console.error("error, retesting with audio params only");
                    return $.FSRTC.checkPerms(runtime, check_audio, false);
                }

                console.error("media perm init error");

                if (runtime) {
                    runtime(false)
                }
            }
        });
    }

})(window.$conpeek.jquery);
/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return String(o);}
if(type==='string'){return $.quoteString(o);}
if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
return'['+pairs.join(',')+']';}
if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';};}(window.$conpeek.jquery));/*
 * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is jquery.jsonrpclient.js modified for Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 *
 * The Initial Developer of the Original Code is
 * Textalk AB http://textalk.se/
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Anthony Minessale II <anthm@freeswitch.org>
 *
 * jquery.jsonrpclient.js - JSON RPC client code
 *
 */
/**
 * This plugin requires jquery.json.js to be available, or at least the methods $.toJSON and
 * $.parseJSON.
 *
 * The plan is to make use of websockets if they are available, but work just as well with only
 * http if not.
 *
 * Usage example:
 *
 *   var foo = new $.JsonRpcClient({ ajaxUrl: '/backend/jsonrpc' });
 *   foo.call(
 *     'bar', [ 'A parameter', 'B parameter' ],
 *     function(result) { alert('Foo bar answered: ' + result.my_answer); },
 *     function(error)  { console.log('There was an error', error); }
 *   );
 *
 * More examples are available in README.md
 */
(function ($) {
    /**
     * @fn new
     * @memberof $.JsonRpcClient
     *
     * @param options An object stating the backends:
     *                ajaxUrl    A url (relative or absolute) to a http(s) backend.
     *                socketUrl  A url (relative of absolute) to a ws(s) backend.
     *                onmessage  A socket message handler for other messages (non-responses).
     *                getSocket  A function returning a WebSocket or null.
     *                           It must take an onmessage_cb and bind it to the onmessage event
     *                           (or chain it before/after some other onmessage handler).
     *                           Or, it could return null if no socket is available.
     *                           The returned instance must have readyState <= 1, and if less than 1,
     *                           react to onopen binding.
     */
    $.JsonRpcClient = function (options) {
        var self = this;
        this.options = $.extend({
            ajaxUrl: null,
            socketUrl: null, ///< The ws-url for default getSocket.
            onmessage: null, ///< Other onmessage-handler.
            login: null, /// auth login
            passwd: null, /// auth passwd
            sessid: null,
            loginParams: null,
            userVariables: null,
            getSocket: function (onmessage_cb) {
                return self._getSocket(onmessage_cb);
            }
        }, options);

        self.ws_cnt = 0;

        // Declare an instance version of the onmessage callback to wrap 'this'.
        this.wsOnMessage = function (event) {
            self._wsOnMessage(event);
        };
    };

    /// Holding the WebSocket on default getsocket.
    $.JsonRpcClient.prototype._ws_socket = null;

    /// Object <id>: { success_cb: cb, error_cb: cb }
    $.JsonRpcClient.prototype._ws_callbacks = {};

    /// The next JSON-RPC request id.
    $.JsonRpcClient.prototype._current_id = 1;


    $.JsonRpcClient.prototype.speedTest = function (bytes, cb) {
        var socket = this.options.getSocket(this.wsOnMessage);
        if (socket !== null) {
            this.speedCB = cb;
            this.speedBytes = bytes;
            socket.send("#SPU " + bytes);

            var loops = bytes / 1024;
            var rem = bytes % 1024;
            var i;
            var data = new Array(1024).join(".");
            for (i = 0; i < loops; i++) {
                socket.send("#SPB " + data);
            }

            if (rem) {
                socket.send("#SPB " + data);
            }

            socket.send("#SPE");
        }
    };


    /**
     * @fn call
     * @memberof $.JsonRpcClient
     *
     * @param method     The method to run on JSON-RPC server.
     * @param params     The params; an array or object.
     * @param success_cb A callback for successful request.
     * @param error_cb   A callback for error.
     */
    $.JsonRpcClient.prototype.call = function (method, params, success_cb, error_cb) {
        // Construct the JSON-RPC 2.0 request.

        if (!params) {
            params = {};
        }

        if (this.options.sessid) {
            params.sessid = this.options.sessid;
        }

        var request = {
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: this._current_id++  // Increase the id counter to match request/response
        };

        if (!success_cb) {
            success_cb = function (e) {
                console.log("Success: ", e);
            };
        }

        if (!error_cb) {
            error_cb = function (e) {
                console.log("Error: ", e);
            };
        }

        // Try making a WebSocket call.
        var socket = this.options.getSocket(this.wsOnMessage);
        if (socket !== null) {
            this._wsCall(socket, request, success_cb, error_cb);
            return;
        }

        // No WebSocket, and no HTTP backend?  This won't work.
        if (this.options.ajaxUrl === null) {
            throw "$.JsonRpcClient.call used with no websocket and no http endpoint.";
        }

        $.ajax({
            type: 'POST',
            url: this.options.ajaxUrl,
            data: $.toJSON(request),
            dataType: 'json',
            cache: false,

            success: function (data) {
                if ('error' in data) error_cb(data.error, this);
                success_cb(data.result, this);
            },

            // JSON-RPC Server could return non-200 on error
            error: function (jqXHR, textStatus, errorThrown) {
                try {
                    var response = $.parseJSON(jqXHR.responseText);

                    if ('console' in window) console.log(response);

                    error_cb(response.error, this);
                } catch (err) {
                    // Perhaps the responseText wasn't really a jsonrpc-error.
                    error_cb({error: jqXHR.responseText}, this);
                }
            }
        });
    };

    /**
     * Notify sends a command to the server that won't need a response.  In http, there is probably
     * an empty response - that will be dropped, but in ws there should be no response at all.
     *
     * This is very similar to call, but has no id and no handling of callbacks.
     *
     * @fn notify
     * @memberof $.JsonRpcClient
     *
     * @param method     The method to run on JSON-RPC server.
     * @param params     The params; an array or object.
     */
    $.JsonRpcClient.prototype.notify = function (method, params) {
        // Construct the JSON-RPC 2.0 request.

        if (this.options.sessid) {
            params.sessid = this.options.sessid;
        }

        var request = {
            jsonrpc: '2.0',
            method: method,
            params: params
        };

        // Try making a WebSocket call.
        var socket = this.options.getSocket(this.wsOnMessage);
        if (socket !== null) {
            this._wsCall(socket, request);
            return;
        }

        // No WebSocket, and no HTTP backend?  This won't work.
        if (this.options.ajaxUrl === null) {
            throw "$.JsonRpcClient.notify used with no websocket and no http endpoint.";
        }

        $.ajax({
            type: 'POST',
            url: this.options.ajaxUrl,
            data: $.toJSON(request),
            dataType: 'json',
            cache: false
        });
    };

    /**
     * Make a batch-call by using a callback.
     *
     * The callback will get an object "batch" as only argument.  On batch, you can call the methods
     * "call" and "notify" just as if it was a normal $.JsonRpcClient object, and all calls will be
     * sent as a batch call then the callback is done.
     *
     * @fn batch
     * @memberof $.JsonRpcClient
     *
     * @param callback    The main function which will get a batch handler to run call and notify on.
     * @param all_done_cb A callback function to call after all results have been handled.
     * @param error_cb    A callback function to call if there is an error from the server.
     *                    Note, that batch calls should always get an overall success, and the
     *                    only error
     */
    $.JsonRpcClient.prototype.batch = function (callback, all_done_cb, error_cb) {
        var batch = new $.JsonRpcClient._batchObject(this, all_done_cb, error_cb);
        callback(batch);
        batch._execute();
    };

    /**
     * The default getSocket handler.
     *
     * @param onmessage_cb The callback to be bound to onmessage events on the socket.
     *
     * @fn _getSocket
     * @memberof $.JsonRpcClient
     */

    $.JsonRpcClient.prototype.socketReady = function () {
        if (this._ws_socket === null || this._ws_socket.readyState > 1) {
            return false;
        }

        return true;
    };

    $.JsonRpcClient.prototype.closeSocket = function () {
        var self = this;
        if (self.socketReady()) {
            self._ws_socket.onclose = function (w) {
                console.log("Closing Socket");
            };
            self._ws_socket.close();
        }
    };

    $.JsonRpcClient.prototype.loginData = function (params) {
        var self = this;
        self.options.login = params.login;
        self.options.passwd = params.passwd;
        self.options.loginParams = params.loginParams;
        self.options.userVariables = params.userVariables;
    };

    $.JsonRpcClient.prototype.connectSocket = function (onmessage_cb) {
        var self = this;

        if (self.to) {
            clearTimeout(self.to);
        }

        if (!self.socketReady()) {
            self.authing = false;

            if (self._ws_socket) {
                delete self._ws_socket;
            }

            // No socket, or dying socket, let's get a new one.
            self._ws_socket = new WebSocket(self.options.socketUrl);

            if (self._ws_socket) {
                // Set up onmessage handler.
                self._ws_socket.onmessage = onmessage_cb;
                self._ws_socket.onclose = function (w) {
                    if (!self.ws_sleep) {
                        self.ws_sleep = 1000;
                    }

                    if (self.options.onWSClose) {
                        self.options.onWSClose(self);
                    }

                    if (self.ws_cnt > 10 && self.options.wsFallbackURL) {
                        self.options.socketUrl = self.options.wsFallbackURL;
                    }

                    console.error("Websocket Lost " + self.ws_cnt + " sleep: " + self.ws_sleep + "msec");

                    self.to = setTimeout(function () {
                        console.log("Attempting Reconnection....");
                        self.connectSocket(onmessage_cb);
                    }, self.ws_sleep);

                    self.ws_cnt++;

                    if (self.ws_sleep < 3000 && (self.ws_cnt % 10) === 0) {
                        self.ws_sleep += 1000;
                    }
                };

                // Set up sending of message for when the socket is open.
                self._ws_socket.onopen = function () {
                    if (self.to) {
                        clearTimeout(self.to);
                    }
                    self.ws_sleep = 1000;
                    self.ws_cnt = 0;
                    if (self.options.onWSConnect) {
                        self.options.onWSConnect(self);
                    }

                    var req;
                    // Send the requests.
                    while ((req = $.JsonRpcClient.q.pop())) {
                        self._ws_socket.send(req);
                    }
                };
            }
        }

        return self._ws_socket ? true : false;
    };

    $.JsonRpcClient.prototype.stopRetrying = function () {
        if (self.to)
            clearTimeout(self.to);
    }

    $.JsonRpcClient.prototype._getSocket = function (onmessage_cb) {
        // If there is no ws url set, we don't have a socket.
        // Likewise, if there is no window.WebSocket.
        if (this.options.socketUrl === null || !("WebSocket" in window)) return null;

        this.connectSocket(onmessage_cb);

        return this._ws_socket;
    };

    /**
     * Queue to save messages delivered when websocket is not ready
     */
    $.JsonRpcClient.q = [];

    /**
     * Internal handler to dispatch a JRON-RPC request through a websocket.
     *
     * @fn _wsCall
     * @memberof $.JsonRpcClient
     */
    $.JsonRpcClient.prototype._wsCall = function (socket, request, success_cb, error_cb) {
        var request_json = $.toJSON(request);

        if (socket.readyState < 1) {
            // The websocket is not open yet; we have to set sending of the message in onopen.
            self = this; // In closure below, this is set to the WebSocket.  Use self instead.
            $.JsonRpcClient.q.push(request_json);
        } else {
            // We have a socket and it should be ready to send on.
            socket.send(request_json);
        }

        // Setup callbacks.  If there is an id, this is a call and not a notify.
        if ('id' in request && typeof success_cb !== 'undefined') {
            this._ws_callbacks[request.id] = {request: request_json, request_obj: request, success_cb: success_cb, error_cb: error_cb};
        }
    };

    /**
     * Internal handler for the websocket messages.  It determines if the message is a JSON-RPC
     * response, and if so, tries to couple it with a given callback.  Otherwise, it falls back to
     * given external onmessage-handler, if any.
     *
     * @param event The websocket onmessage-event.
     */
    $.JsonRpcClient.prototype._wsOnMessage = function (event) {
        // Check if this could be a JSON RPC message.
        var response;

        // Special sub proto
        if (event.data[0] == "#" && event.data[1] == "S" && event.data[2] == "P") {
            if (event.data[3] == "U") {
                this.up_dur = parseInt(event.data.substring(4));
            } else if (this.speedCB && event.data[3] == "D") {
                this.down_dur = parseInt(event.data.substring(4));

                var up_kps = (((this.speedBytes * 8) / (this.up_dur / 1000)) / 1024).toFixed(0);
                var down_kps = (((this.speedBytes * 8) / (this.down_dur / 1000)) / 1024).toFixed(0);

                console.info("Speed Test: Up: " + up_kps + " Down: " + down_kps);
                var cb = this.speedCB;
                this.speedCB = null;
                cb(event, {
                    upDur: this.up_dur,
                    downDur: this.down_dur,
                    upKPS: up_kps,
                    downKPS: down_kps
                });
            }

            return;
        }


        try {
            response = $.parseJSON(event.data);

            /// @todo Make using the jsonrcp 2.0 check optional, to use this on JSON-RPC 1 backends.

            if (typeof response === 'object' &&
                'jsonrpc' in response &&
                response.jsonrpc === '2.0') {

                /// @todo Handle bad response (without id).

                // If this is an object with result, it is a response.
                if ('result' in response && this._ws_callbacks[response.id]) {
                    // Get the success callback.
                    var success_cb = this._ws_callbacks[response.id].success_cb;

                    /*
                                    // set the sessid if present
                                    if ('sessid' in response.result && !this.options.sessid || (this.options.sessid != response.result.sessid)) {
                                        this.options.sessid = response.result.sessid;
                                        if (this.options.sessid) {
                                            console.log("setting session UUID to: " + this.options.sessid);
                                        }
                                    }
                    */
                    // Delete the callback from the storage.
                    delete this._ws_callbacks[response.id];

                    // Run callback with result as parameter.
                    success_cb(response.result, this);
                    return;
                } else if ('error' in response && this._ws_callbacks[response.id]) {
                    // If this is an object with error, it is an error response.

                    // Get the error callback.
                    var error_cb = this._ws_callbacks[response.id].error_cb;
                    var orig_req = this._ws_callbacks[response.id].request;

                    // if this is an auth request, send the credentials and resend the failed request
                    if (!self.authing && response.error.code == -32000 && self.options.login && self.options.passwd) {
                        self.authing = true;

                        this.call("login", {
                                login: self.options.login, passwd: self.options.passwd, loginParams: self.options.loginParams,
                                userVariables: self.options.userVariables
                            },
                            this._ws_callbacks[response.id].request_obj.method == "login" ?
                                function (e) {
                                    self.authing = false;
                                    console.log("logged in");
                                    delete self._ws_callbacks[response.id];

                                    if (self.options.onWSLogin) {
                                        self.options.onWSLogin(true, self);
                                    }
                                }

                                :

                                function (e) {
                                    self.authing = false;
                                    console.log("logged in, resending request id: " + response.id);
                                    var socket = self.options.getSocket(self.wsOnMessage);
                                    if (socket !== null) {
                                        socket.send(orig_req);
                                    }
                                    if (self.options.onWSLogin) {
                                        self.options.onWSLogin(true, self);
                                    }
                                },

                            function (e) {
                                console.log("error logging in, request id:", response.id);
                                delete self._ws_callbacks[response.id];
                                error_cb(response.error, this);
                                if (self.options.onWSLogin) {
                                    self.options.onWSLogin(false, self);
                                }
                            });
                        return;
                    }

                    // Delete the callback from the storage.
                    delete this._ws_callbacks[response.id];

                    // Run callback with the error object as parameter.
                    error_cb(response.error, this);
                    return;
                }
            }
        } catch (err) {
            // Probably an error while parsing a non json-string as json.  All real JSON-RPC cases are
            // handled above, and the fallback method is called below.
            console.log("ERROR: " + err);
            return;
        }

        // This is not a JSON-RPC response.  Call the fallback message handler, if given.
        if (typeof this.options.onmessage === 'function') {
            event.eventData = response;
            if (!event.eventData) {
                event.eventData = {};
            }

            var reply = this.options.onmessage(event);

            if (reply && typeof reply === "object" && event.eventData.id) {
                var msg = {
                    jsonrpc: "2.0",
                    id: event.eventData.id,
                    result: reply
                };

                var socket = self.options.getSocket(self.wsOnMessage);
                if (socket !== null) {
                    socket.send($.toJSON(msg));
                }
            }
        }
    };


    /************************************************************************************************
     * Batch object with methods
     ************************************************************************************************/

    /**
     * Handling object for batch calls.
     */
    $.JsonRpcClient._batchObject = function (jsonrpcclient, all_done_cb, error_cb) {
        // Array of objects to hold the call and notify requests.  Each objects will have the request
        // object, and unless it is a notify, success_cb and error_cb.
        this._requests = [];

        this.jsonrpcclient = jsonrpcclient;
        this.all_done_cb = all_done_cb;
        this.error_cb = typeof error_cb === 'function' ? error_cb : function () {
        };

    };

    /**
     * @sa $.JsonRpcClient.prototype.call
     */
    $.JsonRpcClient._batchObject.prototype.call = function (method, params, success_cb, error_cb) {

        if (!params) {
            params = {};
        }

        if (this.options.sessid) {
            params.sessid = this.options.sessid;
        }

        if (!success_cb) {
            success_cb = function (e) {
                console.log("Success: ", e);
            };
        }

        if (!error_cb) {
            error_cb = function (e) {
                console.log("Error: ", e);
            };
        }

        this._requests.push({
            request: {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: this.jsonrpcclient._current_id++  // Use the client's id series.
            },
            success_cb: success_cb,
            error_cb: error_cb
        });
    };

    /**
     * @sa $.JsonRpcClient.prototype.notify
     */
    $.JsonRpcClient._batchObject.prototype.notify = function (method, params) {
        if (this.options.sessid) {
            params.sessid = this.options.sessid;
        }

        this._requests.push({
            request: {
                jsonrpc: '2.0',
                method: method,
                params: params
            }
        });
    };

    /**
     * Executes the batched up calls.
     */
    $.JsonRpcClient._batchObject.prototype._execute = function () {
        var self = this;

        if (this._requests.length === 0) return; // All done :P

        // Collect all request data and sort handlers by request id.
        var batch_request = [];
        var handlers = {};
        var i = 0;
        var call;
        var success_cb;
        var error_cb;

        // If we have a WebSocket, just send the requests individually like normal calls.
        var socket = self.jsonrpcclient.options.getSocket(self.jsonrpcclient.wsOnMessage);
        if (socket !== null) {
            for (i = 0; i < this._requests.length; i++) {
                call = this._requests[i];
                success_cb = ('success_cb' in call) ? call.success_cb : undefined;
                error_cb = ('error_cb' in call) ? call.error_cb : undefined;
                self.jsonrpcclient._wsCall(socket, call.request, success_cb, error_cb);
            }

            if (typeof all_done_cb === 'function') all_done_cb(result);
            return;
        }

        for (i = 0; i < this._requests.length; i++) {
            call = this._requests[i];
            batch_request.push(call.request);

            // If the request has an id, it should handle returns (otherwise it's a notify).
            if ('id' in call.request) {
                handlers[call.request.id] = {
                    success_cb: call.success_cb,
                    error_cb: call.error_cb
                };
            }
        }

        success_cb = function (data) {
            self._batchCb(data, handlers, self.all_done_cb);
        };

        // No WebSocket, and no HTTP backend?  This won't work.
        if (self.jsonrpcclient.options.ajaxUrl === null) {
            throw "$.JsonRpcClient.batch used with no websocket and no http endpoint.";
        }

        // Send request
        $.ajax({
            url: self.jsonrpcclient.options.ajaxUrl,
            data: $.toJSON(batch_request),
            dataType: 'json',
            cache: false,
            type: 'POST',

            // Batch-requests should always return 200
            error: function (jqXHR, textStatus, errorThrown) {
                self.error_cb(jqXHR, textStatus, errorThrown);
            },
            success: success_cb
        });
    };

    /**
     * Internal helper to match the result array from a batch call to their respective callbacks.
     *
     * @fn _batchCb
     * @memberof $.JsonRpcClient
     */
    $.JsonRpcClient._batchObject.prototype._batchCb = function (result, handlers, all_done_cb) {
        for (var i = 0; i < result.length; i++) {
            var response = result[i];

            // Handle error
            if ('error' in response) {
                if (response.id === null || !(response.id in handlers)) {
                    // An error on a notify?  Just log it to the console.
                    if ('console' in window) console.log(response);
                } else {
                    handlers[response.id].error_cb(response.error, this);
                }
            } else {
                // Here we should always have a correct id and no error.
                if (!(response.id in handlers) && 'console' in window) {
                    console.log(response);
                } else {
                    handlers[response.id].success_cb(response.result, this);
                }
            }
        }

        if (typeof all_done_cb === 'function') all_done_cb(result);
    };

})(window.$conpeek.jquery);
/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return String(o);}
if(type==='string'){return $.quoteString(o);}
if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
return'['+pairs.join(',')+']';}
if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+str+'"';};}(window.$conpeek.jquery));/*
 * Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 * Copyright (C) 2005-2014, Anthony Minessale II <anthm@freeswitch.org>
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Verto HTML5/Javascript Telephony Signaling and Control Protocol Stack for FreeSWITCH
 *
 * The Initial Developer of the Original Code is
 * Anthony Minessale II <anthm@freeswitch.org>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Anthony Minessale II <anthm@freeswitch.org>
 *
 * jquery.verto.js - Main interface
 *
 */

(function ($) {
    var sources = [];

    var generateGUID = (typeof(window.crypto) !== 'undefined' && typeof(window.crypto.getRandomValues) !== 'undefined') ?
        function () {
            // If we have a cryptographically secure PRNG, use that
            // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            var S4 = function (num) {
                var ret = num.toString(16);
                while (ret.length < 4) {
                    ret = "0" + ret;
                }
                return ret;
            };
            return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
        }

        :

        function () {
            // Otherwise, just use Math.random
            // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

    /// MASTER OBJ
    $.verto = function (options, callbacks) {
        var verto = this;

        $.verto.saved.push(verto);

        verto.options = $.extend({
            login: null,
            passwd: null,
            socketUrl: null,
            tag: null,
            localTag: null,
            videoParams: {},
            audioParams: {},
            loginParams: {},
            deviceParams: {onResCheck: null},
            userVariables: {},
            iceServers: false,
            ringSleep: 6000,
            sessid: null,
            useStream: null
        }, options);

        if (verto.options.deviceParams.useCamera) {
            $.FSRTC.getValidRes(verto.options.deviceParams.useCamera, verto.options.deviceParams.onResCheck);
        }

        if (!verto.options.deviceParams.useMic) {
            verto.options.deviceParams.useMic = "any";
        }

        if (!verto.options.deviceParams.useSpeak) {
            verto.options.deviceParams.useSpeak = "any";
        }

        if (verto.options.sessid) {
            verto.sessid = verto.options.sessid;
        } else {
            verto.sessid = generateGUID();
        }

        verto.dialogs = {};
        verto.callbacks = callbacks || {};
        verto.eventSUBS = {};

        verto.rpcClient = new $.JsonRpcClient({
            login: verto.options.login,
            passwd: verto.options.passwd,
            socketUrl: verto.options.socketUrl,
            wsFallbackURL: verto.options.wsFallbackURL,
            turnServer: verto.options.turnServer,
            loginParams: verto.options.loginParams,
            userVariables: verto.options.userVariables,
            sessid: verto.sessid,
            onmessage: function (e) {
                return verto.handleMessage(e.eventData);
            },
            onWSConnect: function (o) {
                o.call('login', {});
            },
            onWSLogin: function (success) {
                if (verto.callbacks.onWSLogin) {
                    verto.callbacks.onWSLogin(verto, success);
                }
            },
            onWSClose: function (success) {
                if (verto.callbacks.onWSClose) {
                    verto.callbacks.onWSClose(verto, success);
                }
                verto.purge();
            }
        });

        var tag = verto.options.tag;
        if (typeof(tag) === "function") {
            tag = tag();
        }

        if (verto.options.ringFile && verto.options.tag) {
            verto.ringer = $("#" + tag);
        }

        verto.rpcClient.call('login', {});

    };


    $.verto.prototype.deviceParams = function (obj) {
        var verto = this;

        for (var i in obj) {
            verto.options.deviceParams[i] = obj[i];
        }

        if (obj.useCamera) {
            $.FSRTC.getValidRes(verto.options.deviceParams.useCamera, obj ? obj.onResCheck : undefined);
        }
    };

    $.verto.prototype.videoParams = function (obj) {
        var verto = this;

        for (var i in obj) {
            verto.options.videoParams[i] = obj[i];
        }
    };

    $.verto.prototype.iceServers = function (obj) {
        var verto = this;
        verto.options.iceServers = obj;
    };

    $.verto.prototype.loginData = function (params) {
        var verto = this;
        verto.options.login = params.login;
        verto.options.passwd = params.passwd;
        verto.rpcClient.loginData(params);
    };

    $.verto.prototype.logout = function (msg) {
        var verto = this;
        verto.rpcClient.closeSocket();
        if (verto.callbacks.onWSClose) {
            verto.callbacks.onWSClose(verto, false);
        }
        verto.purge();
    };

    $.verto.prototype.login = function (msg) {
        var verto = this;
        verto.logout();
        verto.rpcClient.call('login', {});
    };

    $.verto.prototype.message = function (msg) {
        var verto = this;
        var err = 0;

        if (!msg.to) {
            console.error("Missing To");
            err++;
        }

        if (!msg.body) {
            console.error("Missing Body");
            err++;
        }

        if (err) {
            return false;
        }

        verto.sendMethod("verto.info", {
            msg: msg
        });

        return true;
    };

    $.verto.prototype.processReply = function (method, success, e) {
        var verto = this;
        var i;

        //console.log("Response: " + method, success, e);

        switch (method) {
            case "verto.subscribe":
                for (i in e.unauthorizedChannels) {
                    drop_bad(verto, e.unauthorizedChannels[i]);
                }
                for (i in e.subscribedChannels) {
                    mark_ready(verto, e.subscribedChannels[i]);
                }

                break;
            case "verto.unsubscribe":
                //console.error(e);
                break;
        }
    };

    $.verto.prototype.sendMethod = function (method, params) {
        var verto = this;

        verto.rpcClient.call(method, params,

            function (e) {
                /* Success */
                verto.processReply(method, true, e);
            },

            function (e) {
                /* Error */
                verto.processReply(method, false, e);
            });
    };

    function do_sub(verto, channel, obj) {

    }

    function drop_bad(verto, channel) {
        console.error("drop unauthorized channel: " + channel);
        delete verto.eventSUBS[channel];
    }

    function mark_ready(verto, channel) {
        for (var j in verto.eventSUBS[channel]) {
            verto.eventSUBS[channel][j].ready = true;
            console.log("subscribed to channel: " + channel);
            if (verto.eventSUBS[channel][j].readyHandler) {
                verto.eventSUBS[channel][j].readyHandler(verto, channel);
            }
        }
    }

    var SERNO = 1;

    function do_subscribe(verto, channel, subChannels, sparams) {
        var params = sparams || {};

        var local = params.local;

        var obj = {
            eventChannel: channel,
            userData: params.userData,
            handler: params.handler,
            ready: false,
            readyHandler: params.readyHandler,
            serno: SERNO++
        };

        var isnew = false;

        if (!verto.eventSUBS[channel]) {
            verto.eventSUBS[channel] = [];
            subChannels.push(channel);
            isnew = true;
        }

        verto.eventSUBS[channel].push(obj);

        if (local) {
            obj.ready = true;
            obj.local = true;
        }

        if (!isnew && verto.eventSUBS[channel][0].ready) {
            obj.ready = true;
            if (obj.readyHandler) {
                obj.readyHandler(verto, channel);
            }
        }

        return {
            serno: obj.serno,
            eventChannel: channel
        };

    }

    $.verto.prototype.subscribe = function (channel, sparams) {
        var verto = this;
        var r = [];
        var subChannels = [];
        var params = sparams || {};

        if (typeof(channel) === "string") {
            r.push(do_subscribe(verto, channel, subChannels, params));
        } else {
            for (var i in channel) {
                r.push(do_subscribe(verto, channel, subChannels, params));
            }
        }

        if (subChannels.length) {
            verto.sendMethod("verto.subscribe", {
                eventChannel: subChannels.length == 1 ? subChannels[0] : subChannels,
                subParams: params.subParams
            });
        }

        return r;
    };

    $.verto.prototype.unsubscribe = function (handle) {
        var verto = this;
        var i;

        if (!handle) {
            for (i in verto.eventSUBS) {
                if (verto.eventSUBS[i]) {
                    verto.unsubscribe(verto.eventSUBS[i]);
                }
            }
        } else {
            var unsubChannels = {};
            var sendChannels = [];
            var channel;

            if (typeof(handle) == "string") {
                delete verto.eventSUBS[handle];
                unsubChannels[handle]++;
            } else {
                for (i in handle) {
                    if (typeof(handle[i]) == "string") {
                        channel = handle[i];
                        delete verto.eventSUBS[channel];
                        unsubChannels[channel]++;
                    } else {
                        var repl = [];
                        channel = handle[i].eventChannel;

                        for (var j in verto.eventSUBS[channel]) {
                            if (verto.eventSUBS[channel][j].serno == handle[i].serno) {
                            } else {
                                repl.push(verto.eventSUBS[channel][j]);
                            }
                        }

                        verto.eventSUBS[channel] = repl;

                        if (verto.eventSUBS[channel].length === 0) {
                            delete verto.eventSUBS[channel];
                            unsubChannels[channel]++;
                        }
                    }
                }
            }

            for (var u in unsubChannels) {
                console.log("Sending Unsubscribe for: ", u);
                sendChannels.push(u);
            }

            if (sendChannels.length) {
                verto.sendMethod("verto.unsubscribe", {
                    eventChannel: sendChannels.length == 1 ? sendChannels[0] : sendChannels
                });
            }
        }
    };

    $.verto.prototype.broadcast = function (channel, params) {
        var verto = this;
        var msg = {
            eventChannel: channel,
            data: {}
        };
        for (var i in params) {
            msg.data[i] = params[i];
        }
        verto.sendMethod("verto.broadcast", msg);
    };

    $.verto.prototype.purge = function (callID) {
        var verto = this;
        var x = 0;
        var i;

        for (i in verto.dialogs) {
            if (!x) {
                console.log("purging dialogs");
            }
            x++;
            verto.dialogs[i].setState($.verto.enum.state.purge);
        }

        for (i in verto.eventSUBS) {
            if (verto.eventSUBS[i]) {
                console.log("purging subscription: " + i);
                delete verto.eventSUBS[i];
            }
        }
    };

    $.verto.prototype.hangup = function (callID) {
        var verto = this;
        if (callID) {
            var dialog = verto.dialogs[callID];

            if (dialog) {
                dialog.hangup();
            }
        } else {
            for (var i in verto.dialogs) {
                verto.dialogs[i].hangup();
            }
        }
    };

    $.verto.prototype.newCall = function (args, callbacks) {
        var verto = this;

        if (!verto.rpcClient.socketReady()) {
            console.error("Not Connected...");
            return;
        }

        if (args["useCamera"]) {
            verto.options.deviceParams["useCamera"] = args["useCamera"];
        }

        var dialog = new $.verto.dialog($.verto.enum.direction.outbound, this, args);

        if (callbacks) {
            dialog.callbacks = callbacks;
        }

        dialog.invite();

        return dialog;
    };

    $.verto.prototype.handleMessage = function (data) {
        var verto = this;

        if (!(data && data.method)) {
            console.error("Invalid Data", data);
            return;
        }

        if (data.params.callID) {
            var dialog = verto.dialogs[data.params.callID];

            if (data.method === "verto.attach" && dialog) {
                delete dialog.verto.dialogs[dialog.callID];
                dialog.rtc.stop();
                dialog = null;
            }

            if (dialog) {

                switch (data.method) {
                    case 'verto.bye':
                        dialog.hangup(data.params);
                        break;
                    case 'verto.answer':
                        dialog.handleAnswer(data.params);
                        break;
                    case 'verto.media':
                        dialog.handleMedia(data.params);
                        break;
                    case 'verto.display':
                        dialog.handleDisplay(data.params);
                        break;
                    case 'verto.info':
                        dialog.handleInfo(data.params);
                        break;
                    default:
                        console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED", dialog, data.method);
                        break;
                }
            } else {

                switch (data.method) {
                    case 'verto.attach':
                        data.params.attach = true;

                        if (data.params.sdp && data.params.sdp.indexOf("m=video") > 0) {
                            data.params.useVideo = true;
                        }

                        if (data.params.sdp && data.params.sdp.indexOf("stereo=1") > 0) {
                            data.params.useStereo = true;
                        }

                        dialog = new $.verto.dialog($.verto.enum.direction.inbound, verto, data.params);
                        dialog.setState($.verto.enum.state.recovering);

                        break;
                    case 'verto.invite':

                        if (data.params.sdp && data.params.sdp.indexOf("m=video") > 0) {
                            data.params.wantVideo = true;
                        }

                        if (data.params.sdp && data.params.sdp.indexOf("stereo=1") > 0) {
                            data.params.useStereo = true;
                        }

                        dialog = new $.verto.dialog($.verto.enum.direction.inbound, verto, data.params);
                        break;
                    default:
                        console.debug("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED");
                        break;
                }
            }

            return {
                method: data.method
            };
        } else {
            switch (data.method) {
                case 'verto.punt':
                    verto.purge();
                    verto.logout();
                    break;
                case 'verto.event':
                    var list = null;
                    var key = null;

                    if (data.params) {
                        key = data.params.eventChannel;
                    }

                    if (key) {
                        list = verto.eventSUBS[key];

                        if (!list) {
                            list = verto.eventSUBS[key.split(".")[0]];
                        }
                    }

                    if (!list && key && key === verto.sessid) {
                        if (verto.callbacks.onMessage) {
                            verto.callbacks.onMessage(verto, null, $.verto.enum.message.pvtEvent, data.params);
                        }
                    } else if (!list && key && verto.dialogs[key]) {
                        verto.dialogs[key].sendMessage($.verto.enum.message.pvtEvent, data.params);
                    } else if (!list) {
                        if (!key) {
                            key = "UNDEFINED";
                        }
                        console.error("UNSUBBED or invalid EVENT " + key + " IGNORED");
                    } else {
                        for (var i in list) {
                            var sub = list[i];

                            if (!sub || !sub.ready) {
                                console.error("invalid EVENT for " + key + " IGNORED");
                            } else if (sub.handler) {
                                sub.handler(verto, data.params, sub.userData);
                            } else if (verto.callbacks.onEvent) {
                                verto.callbacks.onEvent(verto, data.params, sub.userData);
                            } else {
                                console.log("EVENT:", data.params);
                            }
                        }
                    }

                    break;

                case "verto.info":
                    if (verto.callbacks.onMessage) {
                        verto.callbacks.onMessage(verto, null, $.verto.enum.message.info, data.params.msg);
                    }
                    //console.error(data);
                    console.debug("MESSAGE from: " + data.params.msg.from, data.params.msg.body);

                    break;

                case 'verto.clientReady':
                    if (verto.callbacks.onMessage) {
                        verto.callbacks.onMessage(verto, null, $.verto.enum.message.clientReady, data.params);
                    }
                    console.debug("CLIENT READY", data.params);
                    break;

                default:
                    console.error("INVALID METHOD OR NON-EXISTANT CALL REFERENCE IGNORED", data.method);
                    break;
            }
        }
    };

    var del_array = function (array, name) {
        var r = [];
        var len = array.length;

        for (var i = 0; i < len; i++) {
            if (array[i] != name) {
                r.push(array[i]);
            }
        }

        return r;
    };

    var hashArray = function () {
        var vha = this;

        var hash = {};
        var array = [];

        vha.reorder = function (a) {
            array = a;
            var h = hash;
            hash = {};

            var len = array.length;

            for (var i = 0; i < len; i++) {
                var key = array[i];
                if (h[key]) {
                    hash[key] = h[key];
                    delete h[key];
                }
            }
            h = undefined;
        };

        vha.clear = function () {
            hash = undefined;
            array = undefined;
            hash = {};
            array = [];
        };

        vha.add = function (name, val, insertAt) {
            var redraw = false;

            if (!hash[name]) {
                if (insertAt === undefined || insertAt < 0 || insertAt >= array.length) {
                    array.push(name);
                } else {
                    var x = 0;
                    var n = [];
                    var len = array.length;

                    for (var i = 0; i < len; i++) {
                        if (x++ == insertAt) {
                            n.push(name);
                        }
                        n.push(array[i]);
                    }

                    array = undefined;
                    array = n;
                    n = undefined;
                    redraw = true;
                }
            }

            hash[name] = val;

            return redraw;
        };

        vha.del = function (name) {
            var r = false;

            if (hash[name]) {
                array = del_array(array, name);
                delete hash[name];
                r = true;
            } else {
                console.error("can't del nonexistant key " + name);
            }

            return r;
        };

        vha.get = function (name) {
            return hash[name];
        };

        vha.order = function () {
            return array;
        };

        vha.hash = function () {
            return hash;
        };

        vha.indexOf = function (name) {
            var len = array.length;

            for (var i = 0; i < len; i++) {
                if (array[i] == name) {
                    return i;
                }
            }
        };

        vha.arrayLen = function () {
            return array.length;
        };

        vha.asArray = function () {
            var r = [];

            var len = array.length;

            for (var i = 0; i < len; i++) {
                var key = array[i];
                r.push(hash[key]);
            }

            return r;
        };

        vha.each = function (cb) {
            var len = array.length;

            for (var i = 0; i < len; i++) {
                cb(array[i], hash[array[i]]);
            }
        };

        vha.dump = function (html) {
            var str = "";

            vha.each(function (name, val) {
                str += "name: " + name + " val: " + JSON.stringify(val) + (html ? "<br>" : "\n");
            });

            return str;
        };

    };

    $.verto.liveArray = function (verto, context, name, config) {
        var la = this;
        var lastSerno = 0;
        var binding = null;
        var user_obj = config.userObj;
        var local = false;

        // Inherit methods of hashArray
        hashArray.call(la);

        // Save the hashArray add, del, reorder, clear methods so we can make our own.
        la._add = la.add;
        la._del = la.del;
        la._reorder = la.reorder;
        la._clear = la.clear;

        la.context = context;
        la.name = name;
        la.user_obj = user_obj;

        la.verto = verto;
        la.broadcast = function (channel, obj) {
            verto.broadcast(channel, obj);
        };
        la.errs = 0;

        la.clear = function () {
            la._clear();
            lastSerno = 0;

            if (la.onChange) {
                la.onChange(la, {
                    action: "clear"
                });
            }
        };

        la.checkSerno = function (serno) {
            if (serno < 0) {
                return true;
            }

            if (lastSerno > 0 && serno != (lastSerno + 1)) {
                if (la.onErr) {
                    la.onErr(la, {
                        lastSerno: lastSerno,
                        serno: serno
                    });
                }
                la.errs++;
                console.debug(la.errs);
                if (la.errs < 3) {
                    la.bootstrap(la.user_obj);
                }
                return false;
            } else {
                lastSerno = serno;
                return true;
            }
        };

        la.reorder = function (serno, a) {
            if (la.checkSerno(serno)) {
                la._reorder(a);
                if (la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "reorder"
                    });
                }
            }
        };

        la.init = function (serno, val, key, index) {
            if (key === null || key === undefined) {
                key = serno;
            }
            if (la.checkSerno(serno)) {
                if (la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "init",
                        index: index,
                        key: key,
                        data: val
                    });
                }
            }
        };

        la.bootObj = function (serno, val) {
            if (la.checkSerno(serno)) {

                //la.clear();
                for (var i in val) {
                    la._add(val[i][0], val[i][1]);
                }

                if (la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "bootObj",
                        data: val,
                        redraw: true
                    });
                }
            }
        };

        // @param serno  La is the serial number for la particular request.
        // @param key    If looking at it as a hash table, la represents the key in the hashArray object where you want to store the val object.
        // @param index  If looking at it as an array, la represents the position in the array where you want to store the val object.
        // @param val    La is the object you want to store at the key or index location in the hash table / array.
        la.add = function (serno, val, key, index) {
            if (key === null || key === undefined) {
                key = serno;
            }
            if (la.checkSerno(serno)) {
                var redraw = la._add(key, val, index);
                if (la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "add",
                        index: index,
                        key: key,
                        data: val,
                        redraw: redraw
                    });
                }
            }
        };

        la.modify = function (serno, val, key, index) {
            if (key === null || key === undefined) {
                key = serno;
            }
            if (la.checkSerno(serno)) {
                la._add(key, val, index);
                if (la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "modify",
                        key: key,
                        data: val,
                        index: index
                    });
                }
            }
        };

        la.del = function (serno, key, index) {
            if (key === null || key === undefined) {
                key = serno;
            }
            if (la.checkSerno(serno)) {
                if (index === null || index < 0 || index === undefined) {
                    index = la.indexOf(key);
                }
                var ok = la._del(key);

                if (ok && la.onChange) {
                    la.onChange(la, {
                        serno: serno,
                        action: "del",
                        key: key,
                        index: index
                    });
                }
            }
        };

        var eventHandler = function (v, e, la) {
            var packet = e.data;

            //console.error("READ:", packet);

            if (packet.name != la.name) {
                return;
            }

            switch (packet.action) {

                case "init":
                    la.init(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                    break;

                case "bootObj":
                    la.bootObj(packet.wireSerno, packet.data);
                    break;
                case "add":
                    la.add(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                    break;

                case "modify":
                    if (!(packet.arrIndex || packet.hashKey)) {
                        console.error("Invalid Packet", packet);
                    } else {
                        la.modify(packet.wireSerno, packet.data, packet.hashKey, packet.arrIndex);
                    }
                    break;
                case "del":
                    if (!(packet.arrIndex || packet.hashKey)) {
                        console.error("Invalid Packet", packet);
                    } else {
                        la.del(packet.wireSerno, packet.hashKey, packet.arrIndex);
                    }
                    break;

                case "clear":
                    la.clear();
                    break;

                case "reorder":
                    la.reorder(packet.wireSerno, packet.order);
                    break;

                default:
                    if (la.checkSerno(packet.wireSerno)) {
                        if (la.onChange) {
                            la.onChange(la, {
                                serno: packet.wireSerno,
                                action: packet.action,
                                data: packet.data
                            });
                        }
                    }
                    break;
            }
        };

        if (la.context) {
            binding = la.verto.subscribe(la.context, {
                handler: eventHandler,
                userData: la,
                subParams: config.subParams
            });
        }

        la.destroy = function () {
            la._clear();
            la.verto.unsubscribe(binding);
        };

        la.sendCommand = function (cmd, obj) {
            var self = la;
            self.broadcast(self.context, {
                liveArray: {
                    command: cmd,
                    context: self.context,
                    name: self.name,
                    obj: obj
                }
            });
        };

        la.bootstrap = function (obj) {
            var self = la;
            la.sendCommand("bootstrap", obj);
            //self.heartbeat();
        };

        la.changepage = function (obj) {
            var self = la;
            self.clear();
            self.broadcast(self.context, {
                liveArray: {
                    command: "changepage",
                    context: la.context,
                    name: la.name,
                    obj: obj
                }
            });
        };

        la.heartbeat = function (obj) {
            var self = la;

            var callback = function () {
                self.heartbeat.call(self, obj);
            };
            self.broadcast(self.context, {
                liveArray: {
                    command: "heartbeat",
                    context: self.context,
                    name: self.name,
                    obj: obj
                }
            });
            self.hb_pid = setTimeout(callback, 30000);
        };

        la.bootstrap(la.user_obj);
    };

    $.verto.liveTable = function (verto, context, name, jq, config) {
        var dt;
        var la = new $.verto.liveArray(verto, context, name, {
            subParams: config.subParams
        });
        var lt = this;

        lt.liveArray = la;
        lt.dataTable = dt;
        lt.verto = verto;

        lt.destroy = function () {
            if (dt) {
                dt.fnDestroy();
            }
            if (la) {
                la.destroy();
            }

            dt = null;
            la = null;
        };

        la.onErr = function (obj, args) {
            console.error("Error: ", obj, args);
        };

        /* back compat so jsonstatus can always be enabled */
        function genRow(data) {
            if (typeof(data[4]) === "string" && data[4].indexOf("{") > -1) {
                var tmp = $.parseJSON(data[4]);
                data[4] = tmp.oldStatus;
                data[5] = null;
            }
            return data;
        }

        function genArray(obj) {
            var data = obj.asArray();

            for (var i in data) {
                data[i] = genRow(data[i]);
            }

            return data;
        }


        la.onChange = function (obj, args) {
            var index = 0;
            var iserr = 0;

            if (!dt) {
                if (!config.aoColumns) {
                    if (args.action != "init") {
                        return;
                    }

                    config.aoColumns = [];

                    for (var i in args.data) {
                        config.aoColumns.push({
                            "sTitle": args.data[i]
                        });
                    }
                }

                dt = jq.dataTable(config);
            }

            if (dt && (args.action == "del" || args.action == "modify")) {
                index = args.index;

                if (index === undefined && args.key) {
                    index = la.indexOf(args.key);
                }

                if (index === undefined) {
                    console.error("INVALID PACKET Missing INDEX\n", args);
                    return;
                }
            }

            if (config.onChange) {
                config.onChange(obj, args);
            }

            try {
                switch (args.action) {
                    case "bootObj":
                        if (!args.data) {
                            console.error("missing data");
                            return;
                        }
                        dt.fnClearTable();
                        dt.fnAddData(genArray(obj));
                        dt.fnAdjustColumnSizing();
                        break;
                    case "add":
                        if (!args.data) {
                            console.error("missing data");
                            return;
                        }
                        if (args.redraw > -1) {
                            // specific position, more costly
                            dt.fnClearTable();
                            dt.fnAddData(genArray(obj));
                        } else {
                            dt.fnAddData(genRow(args.data));
                        }
                        dt.fnAdjustColumnSizing();
                        break;
                    case "modify":
                        if (!args.data) {
                            return;
                        }
                        //console.debug(args, index);
                        dt.fnUpdate(genRow(args.data), index);
                        dt.fnAdjustColumnSizing();
                        break;
                    case "del":
                        dt.fnDeleteRow(index);
                        dt.fnAdjustColumnSizing();
                        break;
                    case "clear":
                        dt.fnClearTable();
                        break;
                    case "reorder":
                        // specific position, more costly
                        dt.fnClearTable();
                        dt.fnAddData(genArray(obj));
                        break;
                    case "hide":
                        jq.hide();
                        break;

                    case "show":
                        jq.show();
                        break;

                }
            } catch (err) {
                console.error("ERROR: " + err);
                iserr++;
            }

            if (iserr) {
                obj.errs++;
                if (obj.errs < 3) {
                    obj.bootstrap(obj.user_obj);
                }
            } else {
                obj.errs = 0;
            }

        };

        la.onChange(la, {
            action: "init"
        });

    };

    var CONFMAN_SERNO = 1;

    /*
        Conference Manager without jQuery table.
     */

    $.verto.conf = function (verto, params) {
        var conf = this;

        conf.params = $.extend({
            dialog: null,
            hasVid: false,
            laData: null,
            onBroadcast: null,
            onLaChange: null,
            onLaRow: null
        }, params);

        conf.verto = verto;
        conf.serno = CONFMAN_SERNO++;

        createMainModeratorMethods();

        verto.subscribe(conf.params.laData.modChannel, {
            handler: function (v, e) {
                if (conf.params.onBroadcast) {
                    conf.params.onBroadcast(verto, conf, e.data);
                }
            }
        });

        verto.subscribe(conf.params.laData.infoChannel, {
            handler: function (v, e) {
                if (typeof(conf.params.infoCallback) === "function") {
                    conf.params.infoCallback(v, e);
                }
            }
        });

        verto.subscribe(conf.params.laData.chatChannel, {
            handler: function (v, e) {
                if (typeof(conf.params.chatCallback) === "function") {
                    conf.params.chatCallback(v, e);
                }
            }
        });
    };

    $.verto.conf.prototype.modCommand = function (cmd, id, value) {
        var conf = this;

        conf.verto.rpcClient.call("verto.broadcast", {
            "eventChannel": conf.params.laData.modChannel,
            "data": {
                "application": "conf-control",
                "command": cmd,
                "id": id,
                "value": value
            }
        });
    };

    $.verto.conf.prototype.destroy = function () {
        var conf = this;

        conf.destroyed = true;
        conf.params.onBroadcast(conf.verto, conf, 'destroy');

        if (conf.params.laData.modChannel) {
            conf.verto.unsubscribe(conf.params.laData.modChannel);
        }

        if (conf.params.laData.chatChannel) {
            conf.verto.unsubscribe(conf.params.laData.chatChannel);
        }

        if (conf.params.laData.infoChannel) {
            conf.verto.unsubscribe(conf.params.laData.infoChannel);
        }
    };

    function createMainModeratorMethods() {
        $.verto.conf.prototype.listVideoLayouts = function () {
            this.modCommand("list-videoLayouts", null, null);
        };

        $.verto.conf.prototype.play = function (file) {
            this.modCommand("play", null, file);
        };

        $.verto.conf.prototype.stop = function () {
            this.modCommand("stop", null, "all");
        };

        $.verto.conf.prototype.deaf = function (memberID) {
            this.modCommand("deaf", parseInt(memberID));
        };

        $.verto.conf.prototype.undeaf = function (memberID) {
            this.modCommand("undeaf", parseInt(memberID));
        };

        $.verto.conf.prototype.record = function (file) {
            this.modCommand("recording", null, ["start", file]);
        };

        $.verto.conf.prototype.stopRecord = function () {
            this.modCommand("recording", null, ["stop", "all"]);
        };

        $.verto.conf.prototype.snapshot = function (file) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            this.modCommand("vid-write-png", null, file);
        };

        $.verto.conf.prototype.setVideoLayout = function (layout, canvasID) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            if (canvasID) {
                this.modCommand("vid-layout", null, [layout, canvasID]);
            } else {
                this.modCommand("vid-layout", null, layout);
            }
        };

        $.verto.conf.prototype.kick = function (memberID) {
            this.modCommand("kick", parseInt(memberID));
        };

        $.verto.conf.prototype.muteMic = function (memberID) {
            this.modCommand("tmute", parseInt(memberID));
        };

        $.verto.conf.prototype.muteVideo = function (memberID) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            this.modCommand("tvmute", parseInt(memberID));
        };

        $.verto.conf.prototype.presenter = function (memberID) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            this.modCommand("vid-res-id", parseInt(memberID), "presenter");
        };

        $.verto.conf.prototype.videoFloor = function (memberID) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            this.modCommand("vid-floor", parseInt(memberID), "force");
        };

        $.verto.conf.prototype.banner = function (memberID, text) {
            if (!this.params.hasVid) {
                throw 'Conference has no video';
            }
            this.modCommand("vid-banner", parseInt(memberID), escape(text));
        };

        $.verto.conf.prototype.volumeDown = function (memberID) {
            this.modCommand("volume_out", parseInt(memberID), "down");
        };

        $.verto.conf.prototype.volumeUp = function (memberID) {
            this.modCommand("volume_out", parseInt(memberID), "up");
        };

        $.verto.conf.prototype.gainDown = function (memberID) {
            this.modCommand("volume_in", parseInt(memberID), "down");
        };

        $.verto.conf.prototype.gainUp = function (memberID) {
            this.modCommand("volume_in", parseInt(memberID), "up");
        };

        $.verto.conf.prototype.transfer = function (memberID, exten) {
            this.modCommand("transfer", parseInt(memberID), exten);
        };

        $.verto.conf.prototype.sendChat = function (message, type) {
            var conf = this;
            conf.verto.rpcClient.call("verto.broadcast", {
                "eventChannel": conf.params.laData.chatChannel,
                "data": {
                    "action": "send",
                    "message": message,
                    "type": type
                }
            });
        };

    }

    $.verto.modfuncs = {};

    $.verto.confMan = function (verto, params) {
        var confMan = this;

        confMan.params = $.extend({
            tableID: null,
            statusID: null,
            mainModID: null,
            dialog: null,
            hasVid: false,
            laData: null,
            onBroadcast: null,
            onLaChange: null,
            onLaRow: null
        }, params);

        confMan.verto = verto;
        confMan.serno = CONFMAN_SERNO++;
        confMan.canvasCount = confMan.params.laData.canvasCount;

        function genMainMod(jq) {
            var play_id = "play_" + confMan.serno;
            var stop_id = "stop_" + confMan.serno;
            var recording_id = "recording_" + confMan.serno;
            var snapshot_id = "snapshot_" + confMan.serno;
            var rec_stop_id = "recording_stop" + confMan.serno;
            var div_id = "confman_" + confMan.serno;

            var html = "<div id='" + div_id + "'><br>" +
                "<button class='ctlbtn' id='" + play_id + "'>Play</button>" +
                "<button class='ctlbtn' id='" + stop_id + "'>Stop</button>" +
                "<button class='ctlbtn' id='" + recording_id + "'>Record</button>" +
                "<button class='ctlbtn' id='" + rec_stop_id + "'>Record Stop</button>" +
                (confMan.params.hasVid ? "<button class='ctlbtn' id='" + snapshot_id + "'>PNG Snapshot</button>" : "") +
                "<br><br></div>";

            jq.html(html);

            $.verto.modfuncs.change_video_layout = function (id, canvas_id) {
                var val = $("#" + id + " option:selected").text();
                if (val !== "none") {
                    confMan.modCommand("vid-layout", null, [val, canvas_id]);
                }
            };

            if (confMan.params.hasVid) {
                for (var j = 0; j < confMan.canvasCount; j++) {
                    var vlayout_id = "confman_vid_layout_" + j + "_" + confMan.serno;
                    var vlselect_id = "confman_vl_select_" + j + "_" + confMan.serno;


                    var vlhtml = "<div id='" + vlayout_id + "'><br>" +
                        "<b>Video Layout Canvas " + (j + 1) +
                        "</b> <select onChange='$.verto.modfuncs.change_video_layout(\"" + vlayout_id + "\", \"" + (j + 1) + "\")' id='" + vlselect_id + "'></select> " +
                        "<br><br></div>";
                    jq.append(vlhtml);
                }

                $("#" + snapshot_id).click(function () {
                    var file = prompt("Please enter file name", "");
                    if (file) {
                        confMan.modCommand("vid-write-png", null, file);
                    }
                });
            }

            $("#" + play_id).click(function () {
                var file = prompt("Please enter file name", "");
                if (file) {
                    confMan.modCommand("play", null, file);
                }
            });

            $("#" + stop_id).click(function () {
                confMan.modCommand("stop", null, "all");
            });

            $("#" + recording_id).click(function () {
                var file = prompt("Please enter file name", "");
                if (file) {
                    confMan.modCommand("recording", null, ["start", file]);
                }
            });

            $("#" + rec_stop_id).click(function () {
                confMan.modCommand("recording", null, ["stop", "all"]);
            });

        }

        function genControls(jq, rowid) {
            var x = parseInt(rowid);
            var kick_id = "kick_" + x;
            var canvas_in_next_id = "canvas_in_next_" + x;
            var canvas_in_prev_id = "canvas_in_prev_" + x;
            var canvas_out_next_id = "canvas_out_next_" + x;
            var canvas_out_prev_id = "canvas_out_prev_" + x;

            var canvas_in_set_id = "canvas_in_set_" + x;
            var canvas_out_set_id = "canvas_out_set_" + x;

            var layer_set_id = "layer_set_" + x;
            var layer_next_id = "layer_next_" + x;
            var layer_prev_id = "layer_prev_" + x;

            var tmute_id = "tmute_" + x;
            var tvmute_id = "tvmute_" + x;
            var vbanner_id = "vbanner_" + x;
            var tvpresenter_id = "tvpresenter_" + x;
            var tvfloor_id = "tvfloor_" + x;
            var box_id = "box_" + x;
            var gainup_id = "gain_in_up" + x;
            var gaindn_id = "gain_in_dn" + x;
            var volup_id = "vol_in_up" + x;
            var voldn_id = "vol_in_dn" + x;
            var transfer_id = "transfer" + x;


            var html = "<div id='" + box_id + "'>";

            html += "<b>General Controls</b><hr noshade>";

            html += "<button class='ctlbtn' id='" + kick_id + "'>Kick</button>" +
                "<button class='ctlbtn' id='" + tmute_id + "'>Mute</button>" +
                "<button class='ctlbtn' id='" + gainup_id + "'>Gain -</button>" +
                "<button class='ctlbtn' id='" + gaindn_id + "'>Gain +</button>" +
                "<button class='ctlbtn' id='" + voldn_id + "'>Vol -</button>" +
                "<button class='ctlbtn' id='" + volup_id + "'>Vol +</button>" +
                "<button class='ctlbtn' id='" + transfer_id + "'>Transfer</button>";

            if (confMan.params.hasVid) {
                html += "<br><br><b>Video Controls</b><hr noshade>";


                html += "<button class='ctlbtn' id='" + tvmute_id + "'>VMute</button>" +
                    "<button class='ctlbtn' id='" + tvpresenter_id + "'>Presenter</button>" +
                    "<button class='ctlbtn' id='" + tvfloor_id + "'>Vid Floor</button>" +
                    "<button class='ctlbtn' id='" + vbanner_id + "'>Banner</button>";

                if (confMan.canvasCount > 1) {
                    html += "<br><br><b>Canvas Controls</b><hr noshade>" +
                        "<button class='ctlbtn' id='" + canvas_in_set_id + "'>Set Input Canvas</button>" +
                        "<button class='ctlbtn' id='" + canvas_in_prev_id + "'>Prev Input Canvas</button>" +
                        "<button class='ctlbtn' id='" + canvas_in_next_id + "'>Next Input Canvas</button>" +

                        "<br>" +

                        "<button class='ctlbtn' id='" + canvas_out_set_id + "'>Set Watching Canvas</button>" +
                        "<button class='ctlbtn' id='" + canvas_out_prev_id + "'>Prev Watching Canvas</button>" +
                        "<button class='ctlbtn' id='" + canvas_out_next_id + "'>Next Watching Canvas</button>";
                }

                html += "<br>" +

                    "<button class='ctlbtn' id='" + layer_set_id + "'>Set Layer</button>" +
                    "<button class='ctlbtn' id='" + layer_prev_id + "'>Prev Layer</button>" +
                    "<button class='ctlbtn' id='" + layer_next_id + "'>Next Layer</button>" +


                    "</div>";
            }

            jq.html(html);


            if (!jq.data("mouse")) {
                $("#" + box_id).hide();
            }

            jq.mouseover(function (e) {
                jq.data({"mouse": true});
                $("#" + box_id).show();
            });

            jq.mouseout(function (e) {
                jq.data({"mouse": false});
                $("#" + box_id).hide();
            });

            $("#" + transfer_id).click(function () {
                var xten = prompt("Enter Extension");
                if (xten) {
                    confMan.modCommand("transfer", x, xten);
                }
            });

            $("#" + kick_id).click(function () {
                confMan.modCommand("kick", x);
            });


            $("#" + layer_set_id).click(function () {
                var cid = prompt("Please enter layer ID", "");
                if (cid) {
                    confMan.modCommand("vid-layer", x, cid);
                }
            });

            $("#" + layer_next_id).click(function () {
                confMan.modCommand("vid-layer", x, "next");
            });
            $("#" + layer_prev_id).click(function () {
                confMan.modCommand("vid-layer", x, "prev");
            });

            $("#" + canvas_in_set_id).click(function () {
                var cid = prompt("Please enter canvas ID", "");
                if (cid) {
                    confMan.modCommand("vid-canvas", x, cid);
                }
            });

            $("#" + canvas_out_set_id).click(function () {
                var cid = prompt("Please enter canvas ID", "");
                if (cid) {
                    confMan.modCommand("vid-watching-canvas", x, cid);
                }
            });

            $("#" + canvas_in_next_id).click(function () {
                confMan.modCommand("vid-canvas", x, "next");
            });
            $("#" + canvas_in_prev_id).click(function () {
                confMan.modCommand("vid-canvas", x, "prev");
            });


            $("#" + canvas_out_next_id).click(function () {
                confMan.modCommand("vid-watching-canvas", x, "next");
            });
            $("#" + canvas_out_prev_id).click(function () {
                confMan.modCommand("vid-watching-canvas", x, "prev");
            });

            $("#" + tmute_id).click(function () {
                confMan.modCommand("tmute", x);
            });

            if (confMan.params.hasVid) {
                $("#" + tvmute_id).click(function () {
                    confMan.modCommand("tvmute", x);
                });
                $("#" + tvpresenter_id).click(function () {
                    confMan.modCommand("vid-res-id", x, "presenter");
                });
                $("#" + tvfloor_id).click(function () {
                    confMan.modCommand("vid-floor", x, "force");
                });
                $("#" + vbanner_id).click(function () {
                    var text = prompt("Please enter text", "");
                    if (text) {
                        confMan.modCommand("vid-banner", x, escape(text));
                    }
                });
            }

            $("#" + gainup_id).click(function () {
                confMan.modCommand("volume_in", x, "up");
            });

            $("#" + gaindn_id).click(function () {
                confMan.modCommand("volume_in", x, "down");
            });

            $("#" + volup_id).click(function () {
                confMan.modCommand("volume_out", x, "up");
            });

            $("#" + voldn_id).click(function () {
                confMan.modCommand("volume_out", x, "down");
            });

            return html;
        }

        var atitle = "";
        var awidth = 0;

        //$(".jsDataTable").width(confMan.params.hasVid ? "900px" : "800px");

        verto.subscribe(confMan.params.laData.infoChannel, {
            handler: function (v, e) {
                if (typeof(confMan.params.infoCallback) === "function") {
                    confMan.params.infoCallback(v, e);
                }
            }
        });

        verto.subscribe(confMan.params.laData.chatChannel, {
            handler: function (v, e) {
                if (typeof(confMan.params.chatCallback) === "function") {
                    confMan.params.chatCallback(v, e);
                }
            }
        });

        if (confMan.params.laData.role === "moderator") {
            atitle = "Action";
            awidth = 600;

            if (confMan.params.mainModID) {
                genMainMod($(confMan.params.mainModID));
                $(confMan.params.displayID).html("Moderator Controls Ready<br><br>");
            } else {
                $(confMan.params.mainModID).html("");
            }

            verto.subscribe(confMan.params.laData.modChannel, {
                handler: function (v, e) {
                    //console.error("MODDATA:", e.data);
                    if (confMan.params.onBroadcast) {
                        confMan.params.onBroadcast(verto, confMan, e.data);
                    }

                    if (e.data["conf-command"] === "list-videoLayouts") {
                        for (var j = 0; j < confMan.canvasCount; j++) {
                            var vlselect_id = "#confman_vl_select_" + j + "_" + confMan.serno;
                            var vlayout_id = "#confman_vid_layout_" + j + "_" + confMan.serno;

                            var x = 0;
                            var options;

                            $(vlselect_id).selectmenu({});
                            $(vlselect_id).selectmenu("enable");
                            $(vlselect_id).empty();

                            $(vlselect_id).append(new Option("Choose a Layout", "none"));

                            if (e.data.responseData) {
                                var rdata = [];

                                for (var i in e.data.responseData) {
                                    rdata.push(e.data.responseData[i].name);
                                }

                                options = rdata.sort(function (a, b) {
                                    var ga = a.substring(0, 6) == "group:" ? true : false;
                                    var gb = b.substring(0, 6) == "group:" ? true : false;

                                    if ((ga || gb) && ga != gb) {
                                        return ga ? -1 : 1;
                                    }

                                    return ((a == b) ? 0 : ((a > b) ? 1 : -1));
                                });

                                for (var i in options) {
                                    $(vlselect_id).append(new Option(options[i], options[i]));
                                    x++;
                                }
                            }

                            if (x) {
                                $(vlselect_id).selectmenu('refresh', true);
                            } else {
                                $(vlayout_id).hide();
                            }
                        }
                    } else {

                        if (!confMan.destroyed && confMan.params.displayID) {
                            $(confMan.params.displayID).html(e.data.response + "<br><br>");
                            if (confMan.lastTimeout) {
                                clearTimeout(confMan.lastTimeout);
                                confMan.lastTimeout = 0;
                            }
                            confMan.lastTimeout = setTimeout(function () {
                                $(confMan.params.displayID).html(confMan.destroyed ? "" : "Moderator Controls Ready<br><br>");
                            }, 4000);
                        }
                    }
                }
            });


            if (confMan.params.hasVid) {
                confMan.modCommand("list-videoLayouts", null, null);
            }
        }

        var row_callback = null;

        if (confMan.params.laData.role === "moderator") {
            row_callback = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (!aData[5]) {
                    var $row = $('td:eq(5)', nRow);
                    genControls($row, aData);

                    if (confMan.params.onLaRow) {
                        confMan.params.onLaRow(verto, confMan, $row, aData);
                    }
                }
            };
        }

        confMan.lt = new $.verto.liveTable(verto, confMan.params.laData.laChannel, confMan.params.laData.laName, $(confMan.params.tableID), {
            subParams: {
                callID: confMan.params.dialog ? confMan.params.dialog.callID : null
            },

            "onChange": function (obj, args) {
                $(confMan.params.statusID).text("Conference Members: " + " (" + obj.arrayLen() + " Total)");
                if (confMan.params.onLaChange) {
                    confMan.params.onLaChange(verto, confMan, $.verto.enum.confEvent.laChange, obj, args);
                }
            },

            "aaData": [],
            "aoColumns": [
                {
                    "sTitle": "ID",
                    "sWidth": "50"
                },
                {
                    "sTitle": "Number",
                    "sWidth": "250"
                },
                {
                    "sTitle": "Name",
                    "sWidth": "250"
                },
                {
                    "sTitle": "Codec",
                    "sWidth": "100"
                },
                {
                    "sTitle": "Status",
                    "sWidth": confMan.params.hasVid ? "200px" : "150px"
                },
                {
                    "sTitle": atitle,
                    "sWidth": awidth,
                }
            ],
            "bAutoWidth": true,
            "bDestroy": true,
            "bSort": false,
            "bInfo": false,
            "bFilter": false,
            "bLengthChange": false,
            "bPaginate": false,
            "iDisplayLength": 1400,

            "oLanguage": {
                "sEmptyTable": "The Conference is Empty....."
            },

            "fnRowCallback": row_callback

        });
    };

    $.verto.confMan.prototype.modCommand = function (cmd, id, value) {
        var confMan = this;

        confMan.verto.rpcClient.call("verto.broadcast", {
            "eventChannel": confMan.params.laData.modChannel,
            "data": {
                "application": "conf-control",
                "command": cmd,
                "id": id,
                "value": value
            }
        });
    };

    $.verto.confMan.prototype.sendChat = function (message, type) {
        var confMan = this;
        confMan.verto.rpcClient.call("verto.broadcast", {
            "eventChannel": confMan.params.laData.chatChannel,
            "data": {
                "action": "send",
                "message": message,
                "type": type
            }
        });
    };


    $.verto.confMan.prototype.destroy = function () {
        var confMan = this;

        confMan.destroyed = true;

        if (confMan.lt) {
            confMan.lt.destroy();
        }

        if (confMan.params.laData.chatChannel) {
            confMan.verto.unsubscribe(confMan.params.laData.chatChannel);
        }

        if (confMan.params.laData.modChannel) {
            confMan.verto.unsubscribe(confMan.params.laData.modChannel);
        }

        if (confMan.params.mainModID) {
            $(confMan.params.mainModID).html("");
        }
    };

    $.verto.dialog = function (direction, verto, params) {
        var dialog = this;

        dialog.params = $.extend({
            useVideo: verto.options.useVideo,
            useStereo: verto.options.useStereo,
            screenShare: false,
            useCamera: false,
            useMic: verto.options.deviceParams.useMic,
            useSpeak: verto.options.deviceParams.useSpeak,
            tag: verto.options.tag,
            localTag: verto.options.localTag,
            login: verto.options.login,
            videoParams: verto.options.videoParams,
            useStream: verto.options.useStream,
            isMobile: false,
            facingMode: "user"
        }, params);


        if (!dialog.params.screenShare) {
            dialog.params.useCamera = verto.options.deviceParams.useCamera;
        }

        dialog.verto = verto;
        dialog.direction = direction;
        dialog.lastState = null;
        dialog.state = dialog.lastState = $.verto.enum.state.new;
        dialog.callbacks = verto.callbacks;
        dialog.answered = false;
        dialog.attach = params.attach || false;
        dialog.screenShare = params.screenShare || false;
        dialog.useCamera = dialog.params.useCamera;
        dialog.useMic = dialog.params.useMic;
        dialog.useSpeak = dialog.params.useSpeak;
        dialog.isMobile = dialog.params.isMobile;
        dialog.facingMode = dialog.params.facingMode;

        if (dialog.params.callID) {
            dialog.callID = dialog.params.callID;
        } else {
            dialog.callID = dialog.params.callID = generateGUID();
        }

        if (typeof(dialog.params.tag) === "function") {
            dialog.params.tag = dialog.params.tag();
        }

        if (dialog.params.tag) {
            dialog.audioStream = document.getElementById(dialog.params.tag);

            if (dialog.params.useVideo) {
                dialog.videoStream = dialog.audioStream;
            }
        } //else conjure one TBD

        if (dialog.params.localTag) {
            dialog.localVideo = document.getElementById(dialog.params.localTag);
        }

        dialog.verto.dialogs[dialog.callID] = dialog;

        var RTCcallbacks = {};

        if (dialog.direction == $.verto.enum.direction.inbound) {
            if (dialog.params.display_direction === "outbound") {
                dialog.params.remote_caller_id_name = dialog.params.caller_id_name;
                dialog.params.remote_caller_id_number = dialog.params.caller_id_number;
            } else {
                dialog.params.remote_caller_id_name = dialog.params.callee_id_name;
                dialog.params.remote_caller_id_number = dialog.params.callee_id_number;
            }

            if (!dialog.params.remote_caller_id_name) {
                dialog.params.remote_caller_id_name = "Nobody";
            }

            if (!dialog.params.remote_caller_id_number) {
                dialog.params.remote_caller_id_number = "UNKNOWN";
            }

            RTCcallbacks.onMessage = function (rtc, msg) {
                console.debug(msg);
            };

            RTCcallbacks.onAnswerSDP = function (rtc, sdp) {
                console.error("answer sdp", sdp);
            };
        } else {
            dialog.params.remote_caller_id_name = "Outbound Call";
            dialog.params.remote_caller_id_number = dialog.params.destination_number;
        }

        RTCcallbacks.onICESDP = function (rtc) {
            console.log("RECV " + rtc.type + " SDP", rtc.mediaData.SDP);

            if (dialog.state == $.verto.enum.state.requesting || dialog.state == $.verto.enum.state.answering || dialog.state == $.verto.enum.state.active) {
                location.reload();
                return;
            }

            if (rtc.type == "offer") {
                if (dialog.state == $.verto.enum.state.active) {
                    dialog.setState($.verto.enum.state.requesting);
                    dialog.sendMethod("verto.attach", {
                        sdp: rtc.mediaData.SDP
                    });
                } else {
                    dialog.setState($.verto.enum.state.requesting);

                    dialog.sendMethod("verto.invite", {
                        sdp: rtc.mediaData.SDP
                    });
                }
            } else { //answer
                dialog.setState($.verto.enum.state.answering);

                dialog.sendMethod(dialog.attach ? "verto.attach" : "verto.answer", {
                    sdp: dialog.rtc.mediaData.SDP
                });
            }
        };

        RTCcallbacks.onICE = function (rtc) {
            //console.log("cand", rtc.mediaData.candidate);
            if (rtc.type == "offer") {
                console.log("offer", rtc.mediaData.candidate);
                return;
            }
        };

        RTCcallbacks.onStream = function (rtc, stream) {
            if (dialog.callbacks.permissionCallback &&
                typeof dialog.callbacks.permissionCallback.onGranted === 'function') {
                dialog.callbacks.permissionCallback.onGranted(stream);
            }
            else if (dialog.verto.options.permissionCallback &&
                typeof dialog.verto.options.permissionCallback.onGranted === 'function') {
                dialog.verto.options.permissionCallback.onGranted(stream);
            }
            if (typeof dialog.callbacks.onLocalStream === 'function') {
                dialog.callbacks.onLocalStream(stream, dialog);
            }
            console.log("stream started");
        };

        RTCcallbacks.onRemoteStream = function (rtc, stream) {
            if (typeof dialog.callbacks.onRemoteStream === 'function') {
                dialog.callbacks.onRemoteStream(stream, dialog);
            }
            console.log("remote stream started");
        };

        RTCcallbacks.onError = function (e) {
            if (dialog.callbacks.permissionCallback &&
                typeof dialog.callbacks.permissionCallback.onDenied === 'function') {
                dialog.callbacks.permissionCallback.onDenied();
            }
            else if (dialog.verto.options.permissionCallback &&
                typeof dialog.verto.options.permissionCallback.onDenied === 'function') {
                dialog.verto.options.permissionCallback.onDenied();
            }
            console.error("ERROR:", e);
            dialog.hangup({cause: "Device or Permission Error"});
        };

        dialog.rtc = new $.FSRTC({
            callbacks: RTCcallbacks,
            localVideo: dialog.screenShare ? null : dialog.localVideo,
            useVideo: dialog.params.useVideo ? dialog.videoStream : null,
            useAudio: dialog.audioStream,
            useStereo: dialog.params.useStereo,
            videoParams: dialog.params.videoParams,
            audioParams: verto.options.audioParams,
            iceServers: verto.options.iceServers,
            screenShare: dialog.screenShare,
            useCamera: dialog.useCamera,
            useMic: dialog.useMic,
            useSpeak: dialog.useSpeak,
            turnServer: verto.options.turnServer,
            useStream: dialog.params.useStream,
            isMobile: dialog.params.isMobile,
            facingMode: dialog.params.facingMode,
            onlyVideoPreview: dialog.params.onlyVideoPreview
        });

        dialog.rtc.verto = dialog.verto;

        if (dialog.direction == $.verto.enum.direction.inbound) {
            if (dialog.attach) {
                dialog.answer();
            } else {
                dialog.ring();
            }
        }
    };

    $.verto.dialog.prototype.invite = function () {
        var dialog = this;
        dialog.rtc.call();
    };

    $.verto.dialog.prototype.sendMethod = function (method, obj) {
        var dialog = this;
        obj.dialogParams = {};

        for (var i in dialog.params) {
            if (i == "sdp" && method != "verto.invite" && method != "verto.attach") {
                continue;
            }

            if ((obj.noDialogParams && i != "callID")) {
                continue;
            }

            obj.dialogParams[i] = dialog.params[i];
        }

        delete obj.noDialogParams;

        dialog.verto.rpcClient.call(method, obj,

            function (e) {
                /* Success */
                dialog.processReply(method, true, e);
            },

            function (e) {
                /* Error */
                dialog.processReply(method, false, e);
            });
    };

    function checkStateChange(oldS, newS) {

        if (newS == $.verto.enum.state.purge || $.verto.enum.states[oldS.name][newS.name]) {
            return true;
        }

        return false;
    }


    // Attach audio output device to video element using device/sink ID.
    function find_name(id) {
        for (var i in $.verto.audioOutDevices) {
            var source = $.verto.audioOutDevices[i];
            if (source.id === id) {
                return (source.label);
            }
        }

        return id;
    }

    $.verto.dialog.prototype.setAudioPlaybackDevice = function (sinkId, callback, arg) {
        var dialog = this;
        var element = dialog.audioStream;

        if (typeof element.sinkId !== 'undefined') {
            var devname = find_name(sinkId);
            console.info("Dialog: " + dialog.callID + " Setting speaker:", element, devname);

            element.setSinkId(sinkId)
                .then(function () {
                    console.log("Dialog: " + dialog.callID + ' Success, audio output device attached: ' + sinkId);
                    if (callback) {
                        callback(true, devname, arg);
                    }
                })
                .catch(function (error) {
                    var errorMessage = error;
                    if (error.name === 'SecurityError') {
                        errorMessage = "Dialog: " + dialog.callID + ' You need to use HTTPS for selecting audio output ' +
                            'device: ' + error;
                    }
                    if (callback) {
                        callback(false, null, arg);
                    }
                    console.error(errorMessage);
                });
        } else {
            console.warn("Dialog: " + dialog.callID + ' Browser does not support output device selection.');
            if (callback) {
                callback(false, null, arg);
            }
        }
    }

    $.verto.dialog.prototype.setState = function (state) {
        var dialog = this;

        if (dialog.state == $.verto.enum.state.ringing) {
            dialog.stopRinging();
        }

        if (dialog.state == state || !checkStateChange(dialog.state, state)) {
            console.error("Dialog " + dialog.callID + ": INVALID state change from " + dialog.state.name + " to " + state.name);
            dialog.hangup();
            return false;
        }

        console.log("Dialog " + dialog.callID + ": state change from " + dialog.state.name + " to " + state.name);

        dialog.lastState = dialog.state;
        dialog.state = state;

        if (dialog.callbacks.onDialogState) {
            dialog.callbacks.onDialogState(this);
        }

        switch (dialog.state) {

            case $.verto.enum.state.early:
            case $.verto.enum.state.active:

                var speaker = dialog.useSpeak;
                console.info("Using Speaker: ", speaker);

                if (speaker && speaker !== "any" && speaker !== "none") {
                    setTimeout(function () {
                        dialog.setAudioPlaybackDevice(speaker);
                    }, 500);
                }

                break;

            case $.verto.enum.state.trying:
                setTimeout(function () {
                    if (dialog.state == $.verto.enum.state.trying) {
                        dialog.setState($.verto.enum.state.hangup);
                    }
                }, 30000);
                break;
            case $.verto.enum.state.purge:
                dialog.setState($.verto.enum.state.destroy);
                break;
            case $.verto.enum.state.hangup:

                if (dialog.lastState.val > $.verto.enum.state.requesting.val && dialog.lastState.val < $.verto.enum.state.hangup.val) {
                    dialog.sendMethod("verto.bye", {});
                }

                dialog.setState($.verto.enum.state.destroy);
                break;
            case $.verto.enum.state.destroy:

                if (typeof(dialog.verto.options.tag) === "function") {
                    $('#' + dialog.params.tag).remove();
                }

                delete dialog.verto.dialogs[dialog.callID];
                if (dialog.params.screenShare) {
                    dialog.rtc.stopPeer();
                } else {
                    dialog.rtc.stop();
                }
                break;
        }

        return true;
    };

    $.verto.dialog.prototype.processReply = function (method, success, e) {
        var dialog = this;

        //console.log("Response: " + method + " State:" + dialog.state.name, success, e);

        switch (method) {

            case "verto.answer":
            case "verto.attach":
                if (success) {
                    dialog.setState($.verto.enum.state.active);
                } else {
                    dialog.hangup();
                }
                break;
            case "verto.invite":
                if (success) {
                    dialog.setState($.verto.enum.state.trying);
                } else {
                    dialog.setState($.verto.enum.state.destroy);
                }
                break;

            case "verto.bye":
                dialog.hangup();
                break;

            case "verto.modify":
                if (e.holdState) {
                    if (e.holdState == "held") {
                        if (dialog.state != $.verto.enum.state.held) {
                            dialog.setState($.verto.enum.state.held);
                        }
                    } else if (e.holdState == "active") {
                        if (dialog.state != $.verto.enum.state.active) {
                            dialog.setState($.verto.enum.state.active);
                        }
                    }
                }

                if (success) {
                }

                break;

            default:
                break;
        }

    };

    $.verto.dialog.prototype.hangup = function (params) {
        var dialog = this;

        if (params) {
            if (params.causeCode) {
                dialog.causeCode = params.causeCode;
            }

            if (params.cause) {
                dialog.cause = params.cause;
            }
        }

        if (!dialog.cause && !dialog.causeCode) {
            dialog.cause = "NORMAL_CLEARING";
        }

        if (dialog.state.val >= $.verto.enum.state.new.val && dialog.state.val < $.verto.enum.state.hangup.val) {
            dialog.setState($.verto.enum.state.hangup);
        } else if (dialog.state.val < $.verto.enum.state.destroy) {
            dialog.setState($.verto.enum.state.destroy);
        }
    };

    $.verto.dialog.prototype.stopRinging = function () {
        var dialog = this;
        if (dialog.verto.ringer) {
            dialog.verto.ringer.stop();
        }
    };

    $.verto.dialog.prototype.indicateRing = function () {
        var dialog = this;

        if (dialog.verto.ringer) {
            dialog.verto.ringer.attr("src", dialog.verto.options.ringFile)[0].play();

            setTimeout(function () {
                    dialog.stopRinging();
                    if (dialog.state == $.verto.enum.state.ringing) {
                        dialog.indicateRing();
                    }
                },
                dialog.verto.options.ringSleep);
        }
    };

    $.verto.dialog.prototype.ring = function () {
        var dialog = this;

        dialog.setState($.verto.enum.state.ringing);
        dialog.indicateRing();
    };

    $.verto.dialog.prototype.useVideo = function (on) {
        var dialog = this;

        dialog.params.useVideo = on;

        if (on) {
            dialog.videoStream = dialog.audioStream;
        } else {
            dialog.videoStream = null;
        }

        dialog.rtc.useVideo(dialog.videoStream, dialog.localVideo);

    };

    $.verto.dialog.prototype.setMute = function (what) {
        var dialog = this;
        return dialog.rtc.setMute(what);
    };

    $.verto.dialog.prototype.getMute = function () {
        var dialog = this;
        return dialog.rtc.getMute();
    };

    $.verto.dialog.prototype.setVideoMute = function (what) {
        var dialog = this;
        return dialog.rtc.setVideoMute(what);
    };

    $.verto.dialog.prototype.getVideoMute = function () {
        var dialog = this;
        return dialog.rtc.getVideoMute();
    };

    $.verto.dialog.prototype.useStereo = function (on) {
        var dialog = this;

        dialog.params.useStereo = on;
        dialog.rtc.useStereo(on);
    };

    $.verto.dialog.prototype.dtmf = function (digits) {
        var dialog = this;
        if (digits) {
            dialog.sendMethod("verto.info", {
                dtmf: digits
            });
        }
    };

    $.verto.dialog.prototype.rtt = function (obj) {
        var dialog = this;
        var pobj = {};

        if (!obj) {
            return false;
        }

        pobj.code = obj.code;
        pobj.chars = obj.chars;


        if (pobj.chars || pobj.code) {
            dialog.sendMethod("verto.info", {
                txt: obj,
                noDialogParams: true
            });
        }
    };

    $.verto.dialog.prototype.transfer = function (dest, params) {
        var dialog = this;
        if (dest) {
            dialog.sendMethod("verto.modify", {
                action: "transfer",
                destination: dest,
                params: params
            });
        }
    };

    $.verto.dialog.prototype.replace = function (replaceCallID, params) {
        var dialog = this;
        if (replaceCallID) {
            dialog.sendMethod("verto.modify", {
                action: "replace",
                replaceCallID: replaceCallID,
                params: params
            });
        }
    };

    $.verto.dialog.prototype.hold = function (params) {
        var dialog = this;

        dialog.sendMethod("verto.modify", {
            action: "hold",
            params: params
        });
    };

    $.verto.dialog.prototype.unhold = function (params) {
        var dialog = this;

        dialog.sendMethod("verto.modify", {
            action: "unhold",
            params: params
        });
    };

    $.verto.dialog.prototype.toggleHold = function (params) {
        var dialog = this;

        dialog.sendMethod("verto.modify", {
            action: "toggleHold",
            params: params
        });
    };

    $.verto.dialog.prototype.message = function (msg) {
        var dialog = this;
        var err = 0;

        msg.from = dialog.params.login;

        if (!msg.to) {
            console.error("Missing To");
            err++;
        }

        if (!msg.body) {
            console.error("Missing Body");
            err++;
        }

        if (err) {
            return false;
        }

        dialog.sendMethod("verto.info", {
            msg: msg
        });

        return true;
    };

    $.verto.dialog.prototype.answer = function (params) {
        var dialog = this;

        if (!dialog.answered) {
            if (!params) {
                params = {};
            }

            params.sdp = dialog.params.sdp;

            if (params) {
                if (params.useVideo) {
                    dialog.useVideo(true);
                }
                dialog.params.callee_id_name = params.callee_id_name;
                dialog.params.callee_id_number = params.callee_id_number;

                if (params.useCamera) {
                    dialog.useCamera = params.useCamera;
                }

                if (params.useMic) {
                    dialog.useMic = params.useMic;
                }

                if (params.useSpeak) {
                    dialog.useSpeak = params.useSpeak;
                }
            }

            dialog.rtc.createAnswer(params);
            dialog.answered = true;
        }
    };

    $.verto.dialog.prototype.handleAnswer = function (params) {
        var dialog = this;

        dialog.gotAnswer = true;

        if (dialog.state.val >= $.verto.enum.state.active.val) {
            return;
        }

        if (dialog.state.val >= $.verto.enum.state.early.val) {
            dialog.setState($.verto.enum.state.active);
        } else {
            if (dialog.gotEarly) {
                console.log("Dialog " + dialog.callID + " Got answer while still establishing early media, delaying...");
            } else {
                console.log("Dialog " + dialog.callID + " Answering Channel");
                dialog.rtc.answer(params.sdp, function () {
                    dialog.setState($.verto.enum.state.active);
                }, function (e) {
                    console.error(e);
                    dialog.hangup();
                });
                console.log("Dialog " + dialog.callID + "ANSWER SDP", params.sdp);
            }
        }


    };

    $.verto.dialog.prototype.cidString = function (enc) {
        var dialog = this;
        var party = dialog.params.remote_caller_id_name + (enc ? " &lt;" : " <") + dialog.params.remote_caller_id_number + (enc ? "&gt;" : ">");
        return party;
    };

    $.verto.dialog.prototype.sendMessage = function (msg, params) {
        var dialog = this;

        if (dialog.callbacks.onMessage) {
            dialog.callbacks.onMessage(dialog.verto, dialog, msg, params);
        }
    };

    $.verto.dialog.prototype.handleInfo = function (params) {
        var dialog = this;

        dialog.sendMessage($.verto.enum.message.info, params);

    };

    $.verto.dialog.prototype.handleDisplay = function (params) {
        var dialog = this;

        if (params.display_name) {
            dialog.params.remote_caller_id_name = params.display_name;
        }
        if (params.display_number) {
            dialog.params.remote_caller_id_number = params.display_number;
        }

        dialog.sendMessage($.verto.enum.message.display, {});
    };

    $.verto.dialog.prototype.handleMedia = function (params) {
        var dialog = this;

        if (dialog.state.val >= $.verto.enum.state.early.val) {
            return;
        }

        dialog.gotEarly = true;

        dialog.rtc.answer(params.sdp, function () {
            console.log("Dialog " + dialog.callID + "Establishing early media");
            dialog.setState($.verto.enum.state.early);

            if (dialog.gotAnswer) {
                console.log("Dialog " + dialog.callID + "Answering Channel");
                dialog.setState($.verto.enum.state.active);
            }
        }, function (e) {
            console.error(e);
            dialog.hangup();
        });
        console.log("Dialog " + dialog.callID + "EARLY SDP", params.sdp);
    };

    $.verto.ENUM = function (s) {
        var i = 0,
            o = {};
        s.split(" ").map(function (x) {
            o[x] = {
                name: x,
                val: i++
            };
        });
        return Object.freeze(o);
    };

    $.verto.enum = {};

    $.verto.enum.states = Object.freeze({
        new: {
            requesting: 1,
            recovering: 1,
            ringing: 1,
            destroy: 1,
            answering: 1,
            hangup: 1
        },
        requesting: {
            trying: 1,
            hangup: 1,
            active: 1
        },
        recovering: {
            answering: 1,
            hangup: 1
        },
        trying: {
            active: 1,
            early: 1,
            hangup: 1
        },
        ringing: {
            answering: 1,
            hangup: 1
        },
        answering: {
            active: 1,
            hangup: 1
        },
        active: {
            answering: 1,
            requesting: 1,
            hangup: 1,
            held: 1
        },
        held: {
            hangup: 1,
            active: 1
        },
        early: {
            hangup: 1,
            active: 1
        },
        hangup: {
            destroy: 1
        },
        destroy: {},
        purge: {
            destroy: 1
        }
    });

    $.verto.enum.state = $.verto.ENUM("new requesting trying recovering ringing answering early active held hangup destroy purge");
    $.verto.enum.direction = $.verto.ENUM("inbound outbound");
    $.verto.enum.message = $.verto.ENUM("display info pvtEvent clientReady");

    $.verto.enum = Object.freeze($.verto.enum);

    $.verto.saved = [];

    $.verto.unloadJobs = [];

    var unloadEventName = 'beforeunload';
    // Hacks for Mobile Safari
    var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    if (iOS) {
        unloadEventName = 'pagehide';
    }

    $(window).bind(unloadEventName, function () {
        for (var f in $.verto.unloadJobs) {
            $.verto.unloadJobs[f]();
        }

        if ($.verto.haltClosure)
            return $.verto.haltClosure();

        for (var i in $.verto.saved) {
            var verto = $.verto.saved[i];
            if (verto) {
                verto.purge();
                verto.logout();
            }
        }

        return $.verto.warnOnUnload;
    });

    $.verto.videoDevices = [];
    $.verto.audioInDevices = [];
    $.verto.audioOutDevices = [];

    var checkDevices = function (runtime) {
        console.groupCollapsed("verto::logs");
        console.info("enumerating devices");
        var aud_in = [], aud_out = [], vid = [];
        var has_video = 0, has_audio = 0;
        var Xstream;

        function gotDevices(deviceInfos) {
            // Handles being called several times to update labels. Preserve values.
            for (var i = 0; i !== deviceInfos.length; ++i) {
                var deviceInfo = deviceInfos[i];
                var text = "";

                console.log(deviceInfo);
                console.log(deviceInfo.kind + ": " + deviceInfo.label + " id = " + deviceInfo.deviceId);

                if (deviceInfo.kind === 'audioinput') {
                    text = deviceInfo.label || 'microphone ' + (aud_in.length + 1);
                    aud_in.push({id: deviceInfo.deviceId, kind: "audio_in", label: text});
                } else if (deviceInfo.kind === 'audiooutput') {
                    text = deviceInfo.label || 'speaker ' + (aud_out.length + 1);
                    aud_out.push({id: deviceInfo.deviceId, kind: "audio_out", label: text});
                } else if (deviceInfo.kind === 'videoinput') {
                    text = deviceInfo.label || 'camera ' + (vid.length + 1);
                    vid.push({id: deviceInfo.deviceId, kind: "video", label: text});
                } else {
                    console.log('Some other kind of source/device: ', deviceInfo);
                }
            }


            $.verto.videoDevices = vid;
            $.verto.audioInDevices = aud_in;
            $.verto.audioOutDevices = aud_out;

            console.info("Audio IN Devices", $.verto.audioInDevices);
            console.info("Audio Out Devices", $.verto.audioOutDevices);
            console.info("Video Devices", $.verto.videoDevices);

            if (Xstream) {
                Xstream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }

            if (runtime) {
                runtime(true);
            }
            console.groupEnd();
        }


        function handleError(error) {
            console.log('device enumeration error: ', error);
            if (runtime) runtime(false);
        }


        function checkTypes(devs) {
            for (var i = 0; i !== devs.length; ++i) {

                if (devs[i].kind === 'audioinput') {
                    has_audio++;
                } else if (devs[i].kind === 'videoinput') {
                    has_video++;
                }
            }

            navigator.getUserMedia({audio: (has_audio > 0 ? true : false), video: (has_video > 0 ? true : false)},
                function (stream) {
                    Xstream = stream;
                    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
                },
                function (err) {
                    console.log("The following error occurred: " + err.name);
                    handleError(err);
                }
            );
        }

        navigator.mediaDevices.enumerateDevices().then(checkTypes).catch(handleError);

    };

    $.verto.refreshDevices = function (runtime) {
        checkDevices(runtime);
    }

    $.verto.init = function (obj, runtime) {
        if (!obj) {
            obj = {};
        }

        if (!obj.skipPermCheck && !obj.skipDeviceCheck) {
            $.FSRTC.checkPerms(function (status) {
                checkDevices(runtime);
            }, true, true);
        } else if (obj.skipPermCheck && !obj.skipDeviceCheck) {
            checkDevices(runtime);
        } else if (!obj.skipPermCheck && obj.skipDeviceCheck) {
            $.FSRTC.checkPerms(function (status) {
                runtime(status);
            }, true, true);
        } else {
            runtime(null);
        }

    }

    $.verto.genUUID = function () {
        return generateGUID();
    }


})(window.$conpeek.jquery);
/**
 * Created by Norbert on 2017-06-08.
 **/
if (window.$conpeek) {
    (function ($, window) {
        var c = window.$conpeek,
            session = c.session = (function () {
                return (function () {

                    function s() {
                    }

                    function getDeviceIdentifier() {
                        var localStorageParam = "cp_device_identifier",
                            cp_device_identifier = localStorage.getItem(localStorageParam);


                        if (cp_device_identifier === null) {
                            cp_device_identifier = c.generateIdentifier();
                            localStorage.setItem(localStorageParam, cp_device_identifier);
                        }

                        return cp_device_identifier;
                    }

                    function clientPingerTask() {
                        function check_last_ping() {
                            if (new Date() - s.last_ping_date > (s.ping_pong_delta + 3) * 1000) {
                                if (s.connected === true && s.connection_lost === false) {
                                    c.event.push({'message_type': 'network_connection', 'message': 'connection_lost'});
                                    s.connected = false;
                                }
                            } else {
                                if (s.connected === false && s.connection_lost === false) {
                                    c.event.push({'message_type': 'network_connection', 'message': 'connected'});
                                    s.connected = true;
                                }
                            }
                        }

                        if (s.pinger_interval !== null) {
                            clearInterval(s.pinger_interval);
                            s.pinger_interval = null;
                        }
                        s.pinger_interval = setInterval(function () {
                            check_last_ping();
                        }, 1000);
                    }

                    function updateToken(newToken) {
                        var splitted_domain_url = c.plugin_url.split(".");
                        delete splitted_domain_url[0];
                        c.params.token = newToken;
                        c.event.push({"message_type": "session", "message": "updateToken", "token": newToken});
                        var token_parts = newToken.split(".");
                        try {
                            c.token_params = JSON.parse(atob(token_parts[1]));
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    function onMessage(data) {
                        switch (data.message) {
                            case 'authentication_failure':
                                s.close_flag = true;
                                setTimeout(function () {
                                    session.create();
                                }, 500);
                                s.ready = false;
                                break;
                            case 'authentication_successful':
                                c.dialog.connected = false;
                                c.dialog.connecting = false;
                                c.dialog.current_dialog_uuid = null;
                                c.dialog.current_meeting_uuid = null;
                                c.communicator.initialized_media = [];
                                s.close_flag = false;

                                c.connected = true;
                                c.event.push({'message_type': 'network_connection', 'message': 'connected'});
                                if (s.ready === false) {
                                    s.ready = true;
                                    c.params.reconnected = data.reconnect;
                                    s.ping_pong_delta = data.ping_pong_delta;
                                    if (c.params.reconnected) {
                                        if (data.target_data) {
                                            c.util.__setTargetData(data.target_data);
                                        }
                                    }
                                    c.evReady();
                                }
                                clientPingerTask();
                                break;
                            case 'session_in_use':
                                c.params.close_flag = true;
                                break;
                            case 'session_server_ping':
                                c.last_ping_date = new Date();
                                c.sendMsg({'message': 'plugin_pong'});
                                break;
                            case 'second_session_opened':
                                s.close_flag = true;
                                if (c.communicator.handle) {
                                    c.communicator.handle.logout();
                                }
                                break;

                        }
                    }

                    function startSocket() {
                        let onmessage = function (event) {
                            let data = JSON.parse(event.data);

                            switch (data.message_type) {
                                case "session":
                                    onMessage(data);
                                    break;
                                case "verto":
                                    if (c.communicator) {
                                        c.communicator.onMessage(data);
                                    }
                                    break;
                                default:
                                    c.event.push(data);
                            }
                        };
                        let onclose = function (event) {
                            s.connected = false;
                            s.connection_lost = true;
                            if (s.close_flag === false) {
                                c.event.push({'message_type': 'network_connection', 'message': 'connection_lost'});
                                setTimeout(function () {
                                    if (!s.socket || s.socket.readyState === 3) {
                                        startSocket();
                                    }
                                }, 1000);
                            } else {
                                c.event.push({'message_type': 'network_connection', 'message': 'closed'});
                            }
                        };
                        let onerror = function (event) {
                            s.connected = false;
                            s.connection_lost = true;
                            c.event.push({'message_type': 'network_connection', 'message': 'connection_error'});
                        };

                        let onopen = function (event) {
                            s.connected = true;
                            s.connection_lost = false;
                            s.last_ping_date = new Date();
                            c.sendMsg({'message': 'authentication', 'data': {'token': c.params.token, 'available_media': ["chat"], 'device_identifier': getDeviceIdentifier()}});
                        };

                        s.socket = new WebSocket(c.params.wss_uri + "/session/" + s.USER_TYPE);
                        s.socket.onmessage = onmessage;
                        s.socket.onopen = onopen;
                        s.socket.onerror = onerror;
                        s.socket.onclose = onclose;
                    }

                    function refreshToken() {
                        function __refresh_token() {
                            $.ajax({
                                method: "POST",
                                url: c.params.https_uri + '/session/refresh',
                                headers: {
                                    "Authorization": c.params.token
                                },
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                contentType: "application/json",
                                dataType: "json",
                                success: function (data) {
                                    if (data.success === true) {
                                        updateToken(data.token);
                                    } else {
                                        clearInterval(refresh_token_interval);
                                    }
                                },
                                error: function (data) {
                                    //    @TODO?
                                }
                            });
                        }

                        var refresh_token_interval = setInterval(function () {
                            __refresh_token();
                        }, c.params.refresh_token_interval * 1000);
                    }

                    function startSession() {
                        if (c.params.refresh_token) {
                            refreshToken();
                        }
                        startSocket();
                        return c;
                    }

                    s.ready = false;
                    s.socket = null;
                    s.last_ping_date = new Date();
                    s.pinger_interval = null;
                    s.connected = false;
                    s.connection_lost = false;
                    s.ping_pong_delta = 60;
                    s.connected = false;
                    s.close_flag = false;
                    s.USER_TYPE = "contact";

                    s.reconnect = function (token) {
                        let data = {
                            'domain': c.params.domain,
                            'auth': token
                        };
                        $.ajax({
                            method: "POST",
                            url: c.plugin_url + '/session/token',
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                'Authorization': token
                            },
                            data: JSON.stringify(data),
                            success: function (body) {
                                updateToken(body.token);
                                c.params = $.extend(c.params, {
                                    session_id: c.token_params.session_id,
                                    wss_uri: c.token_params.url.wss_uri,
                                    https_uri: c.token_params.url.https_uri,
                                    token: c.params.token,
                                    reconnected: true
                                });
                                startSession();
                            },
                            error: function () {
                                s.create();
                            }
                        });
                    };

                    s.create = function () {
                        let data = {
                            'domain': c.params.domain
                        };
                        $.ajax({
                            method: "POST",
                            url: c.plugin_url + '/session/anonymous',
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(data),
                            success: function (body) {
                                updateToken(body.data.token);
                                c.params = $.extend(c.params, {
                                    session_id: c.token_params.session_id,
                                    wss_uri: c.token_params.url.wss_uri,
                                    https_uri: c.token_params.url.https_uri,
                                    token: c.params.token,
                                    reconnected: false
                                });
                                startSession();
                            },
                            error: function () {

                            }
                        });
                    };

                    s.logout = function () {
                        $.ajax({
                            method: "POST",
                            url: c.plugin_url + '/session/contact/logout',
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                'Authorization': c.params.token
                            },
                            success: function (body) {
                                updateToken(body.data.token);
                                c.params = $.extend(c.params, {
                                    session_id: c.token_params.session_id,
                                    wss_uri: c.token_params.url.wss_uri,
                                    https_uri: c.token_params.url.https_uri,
                                    token: c.params.token,
                                    reconnected: false
                                });
                                if (callback && {}.toString.call(callback) === '[object Function]') {
                                    callback(true);
                                }
                            },
                            error: function () {
                                if (callback && {}.toString.call(callback) === '[object Function]') {
                                    callback(false);
                                }
                            }
                        });
                    };

                    s.login = function (user, password, callback) {
                        $.ajax({
                            method: "POST",
                            url: c.plugin_url + '/session/contact/login',
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify({
                                'username': user,
                                'password': password
                            }),
                            headers: {
                                'Authorization': c.params.token
                            },
                            success: function (body) {
                                updateToken(body.data.token);
                                c.params = $.extend(c.params, {
                                    session_id: c.token_params.session_id,
                                    wss_uri: c.token_params.url.wss_uri,
                                    https_uri: c.token_params.url.https_uri,
                                    token: c.params.token,
                                    reconnected: false
                                });
                                if (callback && {}.toString.call(callback) === '[object Function]') {
                                    callback(true);
                                }
                            },
                            error: function () {
                                if (callback && {}.toString.call(callback) === '[object Function]') {
                                    callback(false);
                                }
                            }
                        });
                    };

                    s.getToken = function () {
                        return c.params.token;
                    };

                    return s;
                }());
            }());
        c.generateIdentifier = (typeof(window.crypto) !== 'undefined' && typeof(window.crypto.getRandomValues) !== 'undefined') ?
            function () {
                // If we have a cryptographically secure PRNG, use that
                // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
                const buf = new Uint16Array(8);
                window.crypto.getRandomValues(buf);
                /**
                 * @return {string}
                 */
                let S4 = function (num) {
                    let ret = num.toString(16);
                    while (ret.length < 4) {
                        ret = "0" + ret;
                    }
                    return ret;
                };
                return (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]));
            }

            :

            function () {
                // Otherwise, just use Math.random
                // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    let r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };

        c.sendMsg = function (params) {
            if (session.socket) {
                session.socket.send(JSON.stringify(params));
            }
        };

        c.initialize = function (data, callback) {
            if (data['media_tag'] !== undefined) {
                c.params.media_tag = data['media_tag'];
            }
            if (data['video_media_tag'] !== undefined) {
                c.params.video_media_tag = data['video_media_tag'];
            }
            if (data['audio_media_tag'] !== undefined) {
                c.params.audio_media_tag = data['audio_media_tag'];
            }
            $.ajax({
                async: true,
                method: "GET",
                url: data['url'] + '/plugin/' + data['plugin_id'],
                contentType: "application/json",
                dataType: "json",
                success: function (body) {
                    c.plugin_url = data['url'];
                    c.plugin_id = data['plugin_id'];
                    c.params.default_language = body.data.default_language;
                    c.params.color = body.data.color;
                    c.params.target = body.data.target;
                    c.params.target_type = body.data.target_type;
                    c.params.domain = body.data.domain;
                    callback(true, body);
                },
                error: function () {
                    callback(false);
                }
            });
        };

        c.evReady = function () {
            c.event.push({"message": "ready", "message_type": "session"})
        }
    }(window.$conpeek.jquery, window));
}(function ($, window) {
    var c = window.$conpeek;
    c.communicator = {
        initialized_media: [],
        keepalive: 30000,
        // verto instance
        handle: null,
        // verto dependencies
        verto_uri: null,
        session_id: null,
        session_pass: null,
        use_stun: true,
        stun_servers: false,
        existing_legs: {},

        verto_initializing: false,
        verto_initialized: false,
        video_params: {
            idealWidth: 1280,
            idealHeight: 720,
            minFrameRate: 15,
            vertoBestFrameRate: 30
        },
        audio_params: {
            googEchoCancellation: true,
            googAutoGainControl: true,
            googNoiseSuppression: true,
            googHighpassFilter: true,
            googTypingNoiseDetection: true,
            googEchoCancellation2: false,
            googAutoGainControl2: true
        },

        current_audio_in_device: "any",
        current_audio_out_device: "any",
        current_video_facing_mode: 'user',
        current_video_device: null,
        current_video_position: null,
        video_devices: [],
        audio_out_devices: [],
        audio_in_devices: [],

        current_bandwidth: 1024,

        __setUploadBandwidth: function (bandwidth) {
            c.communicator.current_bandwidth = bandwidth;
            var current_call = c.communicator.current_call;
            if (!current_call) return;


            if ((adapter.browserDetails.browser === 'chrome' || (adapter.browserDetails.browser === 'firefox' && adapter.browserDetails.version >= 64)) &&
                'RTCRtpSender' in window &&
                'setParameters' in window.RTCRtpSender.prototype) {


                if (current_call.rtc && current_call.rtc.peer && current_call.rtc.peer.peer) {
                    var senders = $conpeek.communicator.current_call.rtc.peer.peer.getSenders();

                    senders.forEach(function (sender) {
                        if (sender.track && sender.track.kind === "video") {
                            const parameters = sender.getParameters();
                            if (!parameters.encodings || parameters.encodings.length === 0) {
                                parameters.encodings = [{}];
                            }

                            if (bandwidth === 'unlimited') {
                                delete parameters.encodings[0].maxBitrate;
                            } else {
                                parameters.encodings[0].maxBitrate = bandwidth * 1024;
                            }
                            sender.setParameters(parameters)
                                .then(function () {
                                    console.log("Set bandwidth success");
                                })
                                .catch(function () {
                                    console.error('Set bandwidth error');
                                });
                        }
                    });
                }
            }
        },

        switch_camera: function () {
            if (c.communicator.video_devices.length > 1) {
                var new_video_position = null,
                    new_video_device = null,
                    new_video_facing_mode = null;

                if (c.communicator.current_video_position === c.communicator.video_devices.length) {
                    new_video_position = c.communicator.video_devices[0].position;
                    new_video_device = c.communicator.video_devices[0].id;
                    new_video_facing_mode = c.communicator.video_devices[0].facingMode;
                }

                if (new_video_position === null) {
                    c.communicator.video_devices.forEach(function (device) {
                        if (device['position'] > c.communicator.current_video_position) {
                            if (new_video_position === null) {
                                new_video_device = device['id'];
                                new_video_position = device['position'];
                                new_video_facing_mode = device['facingMode'];
                            }
                            return null;
                        }
                    });
                }
                if (new_video_device !== null) {
                    c.communicator.current_video_device = new_video_device;
                    c.communicator.current_video_position = new_video_position;
                    c.communicator.current_video_facing_mode = new_video_facing_mode;
                }
            }
        },
        checkVertoInitialized: function (callback) {
            if (c.communicator.verto_initialized === false && c.communicator.verto_initializing === false) {
                c.communicator.verto_initializing = true;

                $.verto.init({}, function () {
                    $.FSRTC.checkPerms(function (audio_permission) {
                        c.params.audio_permission = audio_permission;

                        $.FSRTC.checkPerms(function (video_permission) {
                            c.params.video_permission = video_permission;

                            var available_media = ["chat"];
                            navigator.mediaDevices.enumerateDevices()
                                .then(function (devices) {
                                    var videocount = 0,
                                        audioinputcount = 0,
                                        audiooutputcount = 0;
                                    devices.forEach(function (device) {
                                        if (device.kind === 'videoinput') {
                                            var text = device.label || 'camera ' + (videocount + 1);
                                            let deviceId = device.deviceId;
                                            if (deviceId === "" || deviceId === null || deviceId === undefined) {
                                                deviceId = "any";
                                            }
                                            var ob = {id: deviceId, label: text, position: videocount + 1};
                                            if (videocount === 0) {
                                                ob['facingMode'] = 'user';
                                                c.communicator.current_video_device = deviceId;
                                                c.communicator.current_video_position = videocount + 1;
                                                c.communicator.current_video_facing_mode = 'user';
                                            } else {
                                                ob['facingMode'] = 'environment';
                                            }
                                            c.communicator.video_devices.push(ob);
                                            videocount++;
                                            c.params.video_permission = true;
                                        }
                                        if (device.kind === 'audioinput') {
                                            let deviceId = device.deviceId;
                                            if (deviceId === "" || deviceId === null || deviceId === undefined) {
                                                deviceId = "default";
                                            }
                                            var text = device.label || 'microphone ' + (audioinputcount + 1);
                                            var ob = {id: deviceId, label: text, position: audioinputcount + 1};
                                            if (audioinputcount === 0) {
                                                c.communicator.current_audio_in_device = deviceId;
                                            }
                                            c.communicator.audio_in_devices.push(ob);
                                            audioinputcount++;
                                        }
                                        if (device.kind === 'audiooutput') {
                                            let deviceId = device.deviceId;
                                            if (deviceId === "" || deviceId === null || deviceId === undefined) {
                                                deviceId = "default";
                                            }
                                            var text = device.label || 'speaker ' + (audiooutputcount + 1);
                                            var ob = {id: deviceId, label: text, position: audiooutputcount + 1};
                                            if (audiooutputcount === 0) {
                                                c.communicator.current_audio_out_device = deviceId;
                                            }
                                            c.communicator.audio_out_devices.push(ob);
                                            audiooutputcount++;
                                            c.params.audio_permission = true;
                                        }
                                        if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Safari") > -1) {
                                            c.params.audio_permission = true;
                                        }
                                    });

                                    if (c.params.audio_permission) {
                                        available_media.push("audio");
                                        if (c.params.video_permission) {
                                            available_media.push("video");
                                        }
                                    }
                                    c.communicator.update_media(available_media, function (success) {
                                        c.communicator.verto_initializing = false;
                                        c.communicator.verto_initialized = true;
                                        if (success) {
                                            return callback(true, available_media);
                                        } else {
                                            return callback(false, available_media);
                                        }
                                    });
                                })
                                .catch(function (err) {
                                    console.error(err);
                                    callback(false, available_media);
                                });


                        }, false, true);
                    }, true, false);
                });


            } else if (c.communicator.verto_initialized === true) {
                var available_media = ["chat"];
                if (c.params.video_permission) {
                    available_media.push("video");
                }
                if (c.params.audio_permission) {
                    available_media.push("audio");
                }
                c.communicator.update_media(available_media, function (success) {
                    if (success) {
                        return callback(true, available_media);
                    } else {
                        return callback(false, available_media);
                    }
                });
            } else {
                return callback(false, []);
            }
        },

        update_media: function (available_media, callback) {
            var do_update = false;
            available_media.forEach(function (i) {
                if (c.communicator.initialized_media.indexOf(i) === -1) {
                    do_update = true;
                }
            });
            if (do_update === true) {
                $.ajax({
                    method: "POST",
                    url: c.params.https_uri + '/session/update_media',
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        'Authorization': c.params.token
                    },
                    data: JSON.stringify({'available_media': available_media}),
                    success: function (body) {
                        c.communicator.initialized_media = available_media;
                        callback(true);
                    },
                    error: function () {
                        callback(false);
                    }
                });
            } else {
                callback(true);
            }
        },

        onMessage: function (body) {
            switch (body.message) {
                case 'verto_register_request':
                    c.communicator.verto_register_request(body);
                    break;
                case 'verto_call_request':
                    c.communicator.verto_call_request(body);
                    break;
                case 'verto_guest_call_request':
                    c.communicator.verto_guest_call_request(body);
                    break;
                case 'verto_close':
                    c.communicator.close(body);
                    break;
            }
        },
        dtmf: function (value) {
            if (!c.communicator.handle) {
                return false;
            }
            if (!c.communicator.current_call) {
                return false;
            }
            try {
                c.communicator.current_call.dtmf(String(value));
            } catch (e) {
                console.error(e);
            }
        },
        unmute_video: function () {
            if (!c.communicator.handle) {
                return false;
            }
            if (!c.communicator.current_call) {
                return false;
            }
            try {
                c.communicator.current_call.setVideoMute("on");
            } catch (e) {
                console.error(e);
            }
            return true;
        },
        mute_video: function () {
            if (!c.communicator.handle) {
                return false;
            }
            if (!c.communicator.current_call) {
                return false;
            }
            try {
                c.communicator.current_call.setVideoMute("off");
            } catch (e) {
                console.error(e);
            }
            return true;
        },
        close: function (data) {
            if (c.communicator.handle) {
                c.communicator.handle.logout();
            }
        },
        verto_call_request: function (data) {
            if (data.target === null) {
                return false;
            }
            var call_id = $.verto.genUUID();
            c.communicator.existing_legs[call_id] = data.dialog_uuid;
            if (c.communicator.handle !== null) {
                var call = c.communicator.make_call(data.target, {"callID": call_id}, data.dialog_uuid, data.use_video);
            }
            return true;
        },
        verto_register_request: function (data) {
            c.communicator.verto_uri = data.verto_uri;
            c.communicator.session_id = data.session_id;
            c.communicator.session_pass = data.session_pass;
            c.communicator.stun_servers = data.stun_servers;
            if (c.communicator.handle) {
                c.communicator.handle.logout();
                c.communicator.handle = null;
            }
            if (data.hasOwnProperty("existing_legs")) {
                c.communicator.existing_legs = data.existing_legs;
            }
            c.communicator.init();
        },
        verto_guest_call_request: function (data) {
            if (data.target === null) {
                return false;
            }
            var call_id = $.verto.genUUID();
            c.communicator.existing_legs[call_id] = data.dialog_uuid;
            if (c.communicator.handle !== null) {
                c.communicator.make_guest_call(data.target, {"callID": call_id}, data.dialog_uuid, data.receive_video, data.use_audio);
            }
            return true;
        },
        make_guest_call: function (number, config, dialog_uuid, receive_video, use_audio) {
            c.communicator.checkVertoInitialized(function (success, available_media) {
                if (success) {
                    var call_config = {
                        useVideo: receive_video,
                        mirrorInput: false,
                        destination_number: number,
                        caller_id_name: c.communicator.session_id,
                        caller_id_number: c.communicator.session_id,
                        userVariables: {
                            dialog_uuid: dialog_uuid
                        },
                        useMic: use_audio ? c.communicator.current_audio_in_device : "none",
                        useSpeak: c.communicator.current_audio_out_device,
                        audioParams: c.communicator.audio_params,
                        onlyVideoPreview: true
                    };
                    call_config = $.extend(call_config, config);
                    c.communicator.current_call = c.communicator.handle.newCall(call_config);
                }
            });
        },
        make_call: function (number, config, dialog_uuid, use_video) {
            c.communicator.checkVertoInitialized(function (success, available_media) {
                if (success) {
                    var call_config = {
                        useVideo: c.params.video_permission && use_video,
                        mirrorInput: false,
                        destination_number: number,
                        caller_id_name: c.communicator.session_id,
                        caller_id_number: c.communicator.session_id,
                        userVariables: {
                            dialog_uuid: dialog_uuid
                        },
                        videoParams: c.communicator.video_params,
                        useCamera: c.communicator.current_video_device,
                        useMic: c.communicator.current_audio_in_device,
                        useSpeak: c.communicator.current_audio_out_device,
                        isMobile: c.util.isMobilePlatform(),
                        facingMode: c.communicator.current_video_facing_mode,
                        audioParams: c.communicator.audio_params
                    };

                    if(c.params.video_media_tag && use_video){
                        call_config['tag'] = c.params.video_media_tag;
                    }

                    if(c.params.audio_media_tag && !use_video){
                        call_config['tag'] = c.params.audio_media_tag;
                    }

                    call_config = $.extend(call_config, config);
                    c.communicator.current_call = c.communicator.handle.newCall(call_config, {
                        'onDialogState': function (d) {
                            c.communicator.onDialogState(d);
                        },
                        'onWSLogin': function (verto, success) {
                            c.communicator.onWSLogin(verto, success);
                        },
                        'onWSClose': function (verto, success) {
                            c.communicator.onWSClose(verto, success);
                        },
                        'onMessage': function (verto, params, data, msg) {

                        },
                        'onLocalStream': function (stream, dialog) {
                            c.event.push({'message_type': 'dialog', 'message': 'local_video_stream', 'dialog_uuid': dialog.params.userVariables.dialog_uuid, 'stream': stream, 'leg_uuid': dialog.callID});
                        },
                        'permissionCallback': {
                            "onDenied": function () {
                                c.event.push({'message_type': 'dialog', 'message': 'permission_denied', 'dialog_uuid': dialog_uuid});
                                c.dialog.disconnect();
                            },
                            "onGranted": function () {
                                c.event.push({'message_type': 'dialog', 'message': 'permission_granted', 'dialog_uuid': dialog_uuid});
                            }
                        }
                    });
                }
            });
        },
        onDialogState: function (d) {
            if (!c.communicator.current_call) {
                c.communicator.current_call = d;
            }
        },
        keep_alive_interval: null,
        onWSLogin: function (verto, success) {
            c.communicator.keep_alive_interval = setInterval(function () {
                if (c.communicator.handle) {
                    c.communicator.handle.rpcClient.call("echo", {keepalive: true});
                }
            }, c.communicator.keepalive);
        },
        onWSClose: function (verto, success) {
            if (c.communicator.keep_alive_interval) {
                clearInterval(c.communicator.keep_alive_interval);
                c.communicator.keep_alive_interval = null;
            }
        },
        vertoCallbacks: {
            onDialogState: function (d) {
                c.communicator.onDialogState(d);
            },
            onWSLogin: function (verto, success) {
                c.communicator.onWSLogin(verto, success);
            },
            onWSClose: function (verto, success) {
                c.communicator.onWSClose(verto, success);
            },
            onMessage: function (verto, params, data, msg) {

            },
            onLocalStream: function (stream, dialog) {
                c.event.push({'message_type': 'dialog', 'message': 'local_video_stream', 'dialog_uuid': dialog.params.userVariables.dialog_uuid, 'stream': stream, 'leg_uuid': dialog.callID});
            }
        },
        init: function () {
            c.communicator.bootstrap();
        },
        bootstrap: function (status) {
            if (c.communicator.handle) {
                c.communicator.handle.logout();
            }
            c.communicator.checkVertoInitialized(function (success, available_media) {
                if (success) {
                    c.communicator.handle = new $.verto({
                        tag: c.params.media_tag,
                        login: c.communicator.session_id,
                        passwd: c.communicator.session_pass,
                        socketUrl: c.communicator.verto_uri,
                        iceServers: c.communicator.use_stun === true ? [{urls: c.communicator.stun_servers}] : false,
                        outgoingBandwidth: 'default',
                        incomingBandwidth: 'default',
                        useStereo: true,
                        dedEnc: true
                    }, c.communicator.vertoCallbacks);
                }
            });

        }
    };

}(window.$conpeek.jquery, window));
(function ($, window) {
    var c = window.$conpeek;
    c.chat = {
        STATUS_PENDING: "pending",
        STATUS_DELIVERED: "delivered",
        STATUS_NEW: "new",
        detectInputElement: null,
        registerDetectInput: function (element) {
            c.chat.detectInput.registerDetectInput(element);
        },
        detectInput: (function () {
            detectInput.id = null;
            detectInput.typingTimer = null;
            detectInput.typingDelay = 1000;
            detectInput.typing = false;
            detectInput.dialog_uuid = null;
            detectInput.meeting_uuid = null;
            function detectInput() {

            }

            detectInput.registerDetectInput = function (id) {
                var typingFn = function () {
                    c.chat.detectInputElement = me;
                    if (!me.typing && ($(id).val())) {
                        me.startTyping();
                    }
                    clearTimeout(me.typingTimer);
                    if ($(id).val()) {
                        me.typingTimer = setTimeout(function () {
                            me.stopTyping();
                        }, me.typingDelay);
                    } else {
                        me.stopTyping();
                    }
                };
                if (this.id) {
                    $(this.id).unbind("keyup", typingFn);
                }
                this.id = id;
                var me = this;
                $(id).bind("keyup", typingFn);
            };

            detectInput.startTyping = function () {
                var dialog_uuid = c.dialog.current_dialog_uuid;
                this.typing = true;
                if (dialog_uuid) {
                    $.ajax({
                        method: "POST",
                        url: c.params.https_uri + '/dialog/chat/typing',
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({
                            "dialog_uuid": dialog_uuid
                        }),
                        headers: {
                            "Authorization": c.params.token
                        }
                    });
                }
            };


            detectInput.stopTyping = function () {
                var dialog_uuid = c.dialog.current_dialog_uuid;
                if (this.typing) {
                    this.typing = false;
                    if (dialog_uuid) {
                        $.ajax({
                            method: "POST",
                            url: c.params.https_uri + '/dialog/chat/stop_typing',
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify({
                                "dialog_uuid": dialog_uuid
                            }),
                            headers: {
                                "Authorization": c.params.token
                            }
                        });
                    }
                }
            };

            return detectInput;
        })(),
        send: function (text) {
            if (c.chat.detectInputElement !== null) {
                c.chat.detectInputElement.stopTyping();
            }

            if (text === "" || text === null) {
                return;
            }

            var dialog_uuid = c.dialog.current_dialog_uuid;

            var params = {
                "text": text,
                "dialog_uuid": dialog_uuid
            };

            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/chat/message',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(params),
                headers: {
                    "Authorization": c.params.token
                },
                success: function (data) {
                    var params = {};
                    params['message_type'] = 'chat';
                    params['message'] = 'chat_message';
                    params['success'] = true;
                    params['data'] = {
                        "date": data.date,
                        "value": data.text,
                        "type": "text",
                        "sender_dialog_uuid": dialog_uuid,
                        "message_uuid": data.message_uuid
                    };
                    c.event.push(params);
                },
                error: function (data) {
                    var params = {};
                    params['message_type'] = 'chat';
                    params['message'] = 'chat_message';
                    params['success'] = false;
                    params['data'] = {
                        "value": text,
                        "type": "text",
                        "sender_dialog_uuid": dialog_uuid,
                        "message_uuid": data.message_uuid
                    };
                    c.event.push(params);
                }
            });
        },

        sendIWRSMessage: function (dialog_uuid, action_uuid, data, successFn, failureFn) {
            var params = {
                "dialog_uuid": dialog_uuid,
                "action_uuid": action_uuid,
                "data": data
            };

            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/iwrs/action/commit',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(params),
                headers: {
                    "Authorization": c.params.token
                },
                success: function (data) {
                    var params = {};
                    params['message_type'] = 'iwrs';
                    params['message'] = 'iwrs_action_response_update';
                    params['success'] = true;
                    console.log('iwrs action response update data success', data);
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                    // params['data'] = {
                    //     "date": data.date,
                    //     "value": text,
                    //     "type": "text",
                    //     "sender_dialog_uuid": dialog_uuid,
                    //     "message_uuid": data.message_uuid
                    // };
                    // c.event.push(params);
                },
                error: function (data) {
                    var params = {};
                   params['message_type'] = 'iwrs';
                    params['message'] = 'iwrs_action_response_update';
                    params['success'] = false;
                    console.log('iwrs action response update data failure', data);
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                    // params['data'] = {
                    //     "value": text,
                    //     "type": "text",
                    //     "sender_dialog_uuid": dialog_uuid,
                    //     "message_uuid": data.message_uuid
                    // };
                    // c.event.push(params);
                }
            });
        }
    };

}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var dialog = c.dialog = (function () {
        function dialog() {

        }

        function supportUploadFile(file) {
            var dialog_info = c.dialog.info;
            var url = c.token_params.url.fileserver + "/" + "meeting/file";
            var method = "POST";
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            fd.append("compress", false);
            fd.append("sender_dialog_uuid", dialog.current_dialog_uuid);
            fd.append("meeting_uuid", dialog.current_meeting_uuid);
            xhr.open(method, url, true);
            xhr.setRequestHeader("Authorization", c.params.token);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success === true) {
                            let data = response.data;
                            let params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = true;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "value": data.value,
                                "type": "file",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        } else {
                            let data = response.data;
                            let params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = false;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "type": "file",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        }
                    } catch (e) {
                        let data = response.data;
                        let params = {};
                        params['message_type'] = 'chat';
                        params['message'] = 'chat_message';
                        params['success'] = false;
                        params['data'] = {
                            "date": data.date,
                            "dialog_uuid": dialog_info.dialog_uuid,
                            "extension": data.extension,
                            "file_size": data.file_size,
                            "filename": data.filename,
                            "meeting_uuid": dialog_info.data.meeting_uuid,
                            "type": "file",
                            "sender_dialog_uuid": dialog_info.dialog_uuid,
                            "message_uuid": data.message_uuid
                        };
                        c.event.push(params);
                    }
                }
            };
            fd.append("file", file);
            xhr.send(fd);
        }

        function supportUploadImage(file) {
            var dialog_info = dialog.info;
            var url = c.token_params.url.fileserver + "/" + "meeting/file";
            var method = "POST";
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            fd.append("compress", true);
            fd.append("sender_dialog_uuid", dialog.current_dialog_uuid);
            fd.append("meeting_uuid", dialog.current_meeting_uuid);
            xhr.open(method, url, true);
            xhr.setRequestHeader("Authorization", c.params.token);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success === true) {
                            let data = response.data;
                            let params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = true;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "value": data.value,
                                "type": "image",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        } else {
                            let data = response.data;
                            let params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = false;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "type": "image",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        }
                    } catch (e) {
                        let data = response.data;
                        let params = {};
                        params['message_type'] = 'chat';
                        params['message'] = 'chat_message';
                        params['success'] = false;
                        params['data'] = {
                            "date": data.date,
                            "dialog_uuid": dialog_info.dialog_uuid,
                            "extension": data.extension,
                            "file_size": data.file_size,
                            "filename": data.filename,
                            "meeting_uuid": dialog_info.data.meeting_uuid,
                            "type": "image",
                            "sender_dialog_uuid": dialog_info.dialog_uuid,
                            "message_uuid": data.message_uuid
                        };
                        c.event.push(params);
                    }
                }
            };
            fd.append("file", file);
            xhr.send(fd);
        }

        dialog.__dialogClosed = function () {
            dialog.connected = false;
            dialog.connecting = false;
        };

        dialog.__dialogInfo = function (data) {
            dialog.current_dialog_uuid = data.dialog_uuid;
            dialog.current_meeting_uuid = data.data.meeting_uuid;
            dialog.connected = true;
            dialog.info = data;
        };

        dialog.__mediaChangeAccepted = function () {
            dialog.is_changing_media = false;
        };

        dialog.__mediaChangeRejected = function () {
            dialog.is_changing_media = false;
        };

        dialog.connected = false;
        dialog.connecting = false;
        dialog.current_dialog_uuid = null;
        dialog.current_meeting_uuid = null;
        dialog.is_changing_media = false;
        dialog.changing_media = [];
        dialog.changing_media_new = [];
        dialog.info = null;
        dialog.media = [];

        dialog.getInfo = function () {
            return dialog.info;
        };

        dialog.mute = function () {
            if (!c.communicator.handle) {
                return false;
            }
            if (!c.communicator.current_call) {
                return false;
            }
            try {
                c.communicator.current_call.setMute("off");
            } catch (e) {
                console.error(e);
            }

            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/mute',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify({
                    "dialog_uuid": c.dialog.current_dialog_uuid
                })
            });
            return true;
        };

        dialog.unmute = function () {
            if (!c.communicator.handle) {
                return false;
            }
            if (!c.communicator.current_call) {
                return false;
            }
            try {
                c.communicator.current_call.setMute("on");
            } catch (e) {
                console.error(e);
            }

            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/unmute',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify({
                    "dialog_uuid": c.dialog.current_dialog_uuid
                })
            });
            return true;
        };


        dialog.getDialogUUID = function () {
            return dialog.current_dialog_uuid;
        };

        dialog.isConnected = function () {
            return !(dialog.connecting === false && dialog.connected === false);
        };

        dialog.changeMedia = function (media, successFn, failureFn) {
            if (dialog.is_changing_media === false) {
                dialog.is_changing_media = true;
                dialog.changing_media_new = $(media).not(c.dialog.media).get();
                dialog.changing_media = media;

                c.communicator.checkVertoInitialized(function (success, available_media) {
                    if (!success) {
                        if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                            failureFn("Cannot initialize devices");
                        }
                        return 0;
                    }

                    if ($(media).not(available_media).get().length > 0) {
                        failureFn("Media not allowed");
                        return 0;
                    }
                    var data = {
                        "dialog_uuid": dialog.current_dialog_uuid,
                        "new_media": media
                    };
                    $.ajax({
                        method: "POST",
                        url: c.params.https_uri + '/dialog/change_media',
                        contentType: "application/json",
                        dataType: "json",
                        headers: {
                            'Authorization': c.params.token
                        },
                        data: JSON.stringify(data),
                        success: function (body) {
                            if (successFn && {}.toString.call(successFn) === '[object Function]') {
                                successFn();
                            }
                        },
                        error: function () {
                            dialog.is_changing_media = false;
                            if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                                failureFn();
                            }
                        }
                    });
                });


            } else {
                if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                    failureFn();
                }
            }
        };

        dialog.changeMediaAccept = function (successFn, failureFn) {
            var data = {
                "dialog_uuid": dialog.current_dialog_uuid
            };
            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/change_media/accept',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function () {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        dialog.changeMediaReject = function (successFn, failureFn) {
            dialog.is_changing_media = false;
            dialog.changing_media_new = [];

            var data = {
                "dialog_uuid": dialog.current_dialog_uuid
            };
            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/change_media/reject',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function () {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        dialog.switchCamera = function (successFn, failureFn) {
            if (c.communicator.video_devices.length > 1) {
                let new_video_position = null,
                    new_video_device = null,
                    new_video_facing_mode = null;

                if (c.communicator.current_video_position === c.communicator.video_devices.length) {
                    new_video_position = c.communicator.video_devices[0].position;
                    new_video_device = c.communicator.video_devices[0].id;
                    new_video_facing_mode = c.communicator.video_devices[0].facingMode;
                }

                if (new_video_position === null) {
                    c.communicator.video_devices.forEach(function (device) {
                        if (device['position'] > c.communicator.current_video_position) {
                            if (new_video_position === null) {
                                new_video_device = device['id'];
                                new_video_position = device['position'];
                                new_video_facing_mode = device['facingMode'];
                            }
                            return null;
                        }
                    });
                }
                if (new_video_device !== null) {
                    c.communicator.current_video_device = new_video_device;
                    c.communicator.current_video_position = new_video_position;
                    c.communicator.current_video_facing_mode = new_video_facing_mode;
                }
            }
            let data = {
                "dialog_uuid": dialog.current_dialog_uuid
            };
            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/reconnect_device',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function () {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        dialog.disconnect = function (successFn, failureFn) {
            var data = {
                "dialog_uuid": dialog.current_dialog_uuid
            };
            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/disconnect',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    dialog.current_dialog_uuid = null;
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function () {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        dialog.connect = function (params, successFn, failureFn) {
            if (!c.dialog.isConnected()) {
                c.dialog.connecting = true;
                var connect = function (dest, req_media, avail_media, presen) {
                    var data = {
                        "destination": dest,
                        "required_media": req_media,
                        "available_media": avail_media
                    };
                    if (presen !== undefined) {
                        data['presentation'] = presen;
                    }
                    if (c.params.context !== null) {
                        data["context"] = c.params.context;
                    }
                    $.ajax({
                        method: "POST",
                        url: c.params.https_uri + '/dialog/connect',
                        contentType: "application/json",
                        dataType: "json",
                        headers: {
                            'Authorization': c.params.token
                        },
                        data: JSON.stringify(data),
                        success: function (body) {
                            c.dialog.connected = true;
                            c.dialog.media = req_media;
                            c.dialog.current_dialog_uuid = body.dialog_uuid;
                            c.event.push({'message_type': 'dialog', 'message': 'dialog_connected', 'dialog_uuid': body.dialog_uuid, 'destination': body.destination});
                            c.tracking.sendBuffer();
                            if (successFn && {}.toString.call(successFn) === '[object Function]') {
                                successFn(body.dialog_uuid, body.presentation, body.media, body.destination);
                            }
                        },
                        error: function () {
                            c.dialog.connecting = false;
                            if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                                failureFn("Request failed");
                            }
                        }
                    });
                };

                var audio = false, video = false, chat = false,
                    destination, media, presentation;

                if (params === undefined) params = {};


                if (params['media'] !== undefined && Array.isArray(params['media'])) {
                    media = [];
                    if ($.inArray("chat", params['media']) > -1) {
                        media.push('chat');
                    }

                    if ($.inArray("video", params['media']) > -1) {
                        if (c.params.video_enabled) {
                            video = true;
                            media.push('video');
                        }
                    }

                    if ($.inArray("audio", params['media']) > -1) {
                        if (c.params.audio_enabled) {
                            audio = true;
                            media.push('audio');
                        }
                    }
                } else {
                    media = [];
                    if (c.params.video_enabled) {
                        media.push("video");
                        video = true;
                    } else if (c.params.audio_enabled) {
                        media.push("audio");
                        audio = true;
                    }
                    if (c.params.chat_enabled) {
                        media.push("chat");
                    }
                }

                if (media.length === 0) {
                    c.dialog.connecting = false;
                    failureFn("No media");
                    return 0;
                }

                params['presentation'] === undefined ? presentation = c.token_params.user.username : presentation = params['presentation'];
                params['destination'] === undefined ? destination = c.params.target : destination = params['destination'];

                if (!(audio || video)) {
                    c.communicator.update_media(["chat"], function (success) {
                        if (success) {
                            connect(destination, media, ["chat"], presentation);
                        }
                    });
                    return 1;
                }
                c.communicator.checkVertoInitialized(function (success, available_media) {
                    if (!success) {
                        c.dialog.connecting = false;
                        if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                            failureFn("Cannot initialize devices");
                        }
                        return 1;
                    }
                    connect(destination, media, available_media, presentation);
                    return 1;
                });
            } else {
                if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                    failureFn("Already in call");
                }
            }
        };

        dialog.uploadFile = function (inputElement) {
            if (inputElement && inputElement.files.length === 0) {
                return;
            }
            var files = inputElement.files;
            if (files.length > 0) {
                supportUploadFile(files[0]);
            }
        };


        dialog.uploadImage = function (inputElement) {
            if (inputElement && inputElement.files.length === 0) {
                return;
            }
            var files = inputElement.files;
            if (files.length > 0) {
                supportUploadImage(files[0]);
            }
        };

        dialog.uploadImageBlob = function (blob) {
            var url = c.token_params.url.fileserver + "/" + "meeting/file";
            var fd = new FormData();
            fd.append("compress", true);
            fd.append("sender_dialog_uuid", dialog.current_dialog_uuid);
            fd.append("meeting_uuid", dialog.current_meeting_uuid);
            fd.append('file', blob, "snapshot.png");

            var dialog_info = c.dialog.info;

            var method = "POST";
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Authorization", c.params.token);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success === true) {
                            var data = response.data;
                            var params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = true;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "value": data.value,
                                "type": "image",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        } else {
                            var data = response.data;
                            var params = {};
                            params['message_type'] = 'chat';
                            params['message'] = 'chat_message';
                            params['success'] = false;
                            params['data'] = {
                                "date": data.date,
                                "dialog_uuid": dialog_info.dialog_uuid,
                                "extension": data.extension,
                                "file_size": data.file_size,
                                "filename": data.filename,
                                "meeting_uuid": dialog_info.data.meeting_uuid,
                                "type": "image",
                                "sender_dialog_uuid": dialog_info.dialog_uuid,
                                "message_uuid": data.message_uuid
                            };
                            c.event.push(params);
                        }
                    } catch (e) {
                        var data = response.data;
                        var params = {};
                        params['message_type'] = 'chat';
                        params['message'] = 'chat_message';
                        params['success'] = false;
                        params['data'] = {
                            "date": data.date,
                            "dialog_uuid": dialog_info.dialog_uuid,
                            "extension": data.extension,
                            "file_size": data.file_size,
                            "filename": data.filename,
                            "meeting_uuid": dialog_info.data.meeting_uuid,
                            "type": "image",
                            "sender_dialog_uuid": dialog_info.dialog_uuid,
                            "message_uuid": data.message_uuid
                        };
                        c.event.push(params);
                    }
                }
            };

            xhr.send(fd);
        };

        dialog.muteVideo = c.communicator.mute_video;
        dialog.unmuteVideo = c.communicator.unmute_video;
        dialog.dtmf = c.communicator.dtmf;

        return dialog;
    }());
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var event = c.event = {};

    var EventQueue = (function () {
        EventQueue = function () {
        };
        EventQueue.prototype.running = false;
        EventQueue.prototype.queue = [];
        EventQueue.prototype.add = function (body) {
            var me = this;
            this.queue.push(function () {
                var finished = me.doCallback(body);
                if (typeof finished === "undefined" || finished) {
                    me.next();
                }
            });
            if (!this.running) {
                this.next();
            }
            return this;
        };
        EventQueue.prototype.doCallback = function (body) {
            if ($.isFunction(c.event.receiver)) {
                try {
                    c.event.receiver.call(this, body);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        EventQueue.prototype.next = function () {
            this.running = false;
            var shift = this.queue.shift();
            if (shift) {
                this.running = true;
                shift();
            }
        };
        return EventQueue;
    })();

    event.queue = new EventQueue();

    event.registered_callbacks = {};
    event.registered_message_type_callbacks = {};

    event.__triggerCallback = function (body) {
        let message = body['message'],
            message_type = body['message_type'];

        if (event.registered_message_type_callbacks[message_type] !== undefined) {
            try {
                let message_type_callback = event.registered_message_type_callbacks[message_type];
                message_type_callback(body);
            } catch (e) {

            }
        }

        if (event.registered_callbacks[message_type] !== undefined && event.registered_callbacks[message_type][message] !== undefined) {
            try {
                let callback = event.registered_callbacks[message_type][message];
                callback(body);
            } catch (e) {

            }
        }
    };

    event.registerCallback = function (message_type, message, callback) {
        if (event.registered_callbacks[message_type] === undefined) {
            event.registered_callbacks[message_type] = {};
        }

        if (callback && {}.toString.call(callback) === '[object Function]') {
            event.registered_callbacks[message_type][message] = callback;
        } else {
            throw new Error("Callback must be a function");
        }
    };

    event.registerMessageTypeCallback = function (message_type, callback) {
        if (callback && {}.toString.call(callback) === '[object Function]') {
            event.registered_message_type_callbacks[message_type] = callback;
        } else {
            throw new Error("Callback must be a function");
        }
    };

    Object.assign(event, {

        push: function (params) {
            event.queue.add(params);
        },
        receiver: function (data) {
            switch (data.message_type) {
                case "session":
                    event.__triggerCallback(data);
                    break;
                case "chat":
                    event.__triggerCallback(data);
                    break;
                case "iwrs":
                    event.__triggerCallback(data);
                    break;
                case "plugin":
                    event.__triggerCallback(data);
                    break;
                case "plugin_info":
                    event.__triggerCallback(data);
                    break;
                case "dialog":
                    switch (data.message) {
                        case "dialog_close":
                            c.dialog.__dialogClosed();
                            break;
                        case "dialog_info":
                            c.dialog.__dialogInfo(data);
                            break;
                        default:
                            break;
                    }
                    event.__triggerCallback(data);
                    break;
                case "meeting":
                    switch (data['message']) {
                        case 'media_change_accepted':
                            c.dialog.__mediaChangeAccepted();
                            break;
                        case 'media_change_rejected':
                            c.dialog.__mediaChangeRejected();
                            break;
                        case 'change_quality':
                            c.communicator.__setUploadBandwidth(body.quality);
                            break;
                    }
                    event.__triggerCallback(data);
                    break;
                case "network_connection":
                    switch (data.message) {
                        case "connected":
                            c.__setNetworkConnectionStatus(true);
                            break;
                        case "connection_error":
                            c.__setNetworkConnectionStatus(false);
                            break;
                        case "connection_lost":
                            c.__setNetworkConnectionStatus(false);
                            break;
                        case "closed":
                            c.__setNetworkConnectionStatus(false);
                            break;
                    }

                    event.__triggerCallback(data);
                    break;
                case "identity_verification":
                    event.__triggerCallback(data);
                    break;
            }
        }
    });
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var util = c.util = {};
    Object.assign(util, {
        getAvatarSrc: function (avatar_id) {
            if (avatar_id != null && avatar_id !== undefined && avatar_id !== 'null' && avatar_id !== 'undefined') {
                if (c.token_params) {
                    return c.token_params.url.fileserver + "/tenant/" + c.token_params.user.tenant_id + "/avatar/" + avatar_id + "/small/download";
                }
            }
            return c.plugin_url + "/cdn/assets/images/default_avatar.svg";
        },

        getTarget: function () {
            return c.params.target;
        },

        getTargetType: function () {
            return c.params.target_type;
        },

        getCurrentUTCDate: function () {
            var now_date = new Date();
            return now_date.getUTCFullYear() + '-' +
                ((now_date.getUTCMonth() + 1) >= 10 ? (now_date.getUTCMonth() + 1) : '0' + (now_date.getUTCMonth() + 1)) + '-' +
                (now_date.getUTCDate() >= 10 ? now_date.getUTCDate() : '0' + now_date.getUTCDate()) + ' ' +
                (now_date.getUTCHours() >= 10 ? now_date.getUTCHours() : '0' + now_date.getUTCHours()) + ':' +
                (now_date.getUTCMinutes() >= 10 ? now_date.getUTCMinutes() : '0' + now_date.getUTCMinutes()) + ':' +
                (now_date.getUTCSeconds() >= 10 ? now_date.getUTCSeconds() : '0' + now_date.getUTCSeconds());
        },

        startGeolocation: function (successCallback, failureCallback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latitude = position.coords.latitude,
                        longitude = position.coords.longitude;

                    $.ajax({
                        method: "POST",
                        url: c.params.https_uri + '/session/geolocation',
                        contentType: "application/json",
                        dataType: "json",
                        headers: {
                            'Authorization': c.params.token
                        },
                        data: JSON.stringify({
                            "latitude": latitude,
                            "longitude": longitude
                        })
                    });

                    successCallback({
                        latitude: latitude,
                        longitude: longitude
                    });
                }, function () {
                    failureCallback('not-privileged');
                });
            } else {
                failureCallback('not-allowed');
            }
        },

        updateTargetData: function (target, callback) {
            if (target === undefined || target === null || target === "") {
                if (callback && {}.toString.call(callback) === '[object Function]') {
                    return callback(false);
                }
                return;
            }
            var data = {
                'target': target
            };
            $.ajax({
                async: true,
                method: "POST",
                url: c.plugin_url + '/target/info',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    c.util.__setTargetData(body.data, callback);
                },
                error: function () {
                    if (callback && {}.toString.call(callback) === '[object Function]') {
                        callback(false);
                    }
                }
            });
        },

        __setTargetData: function (body, callback) {
            if (body.application_type === "PROJECT") {
                $.ajax({
                    method: "POST",
                    url: c.params.https_uri + '/plugin/subscribe',
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        'Authorization': c.params.token
                    },
                    data: JSON.stringify({
                        "project_id": body.project_id
                    })
                });
            }
            if (body['application_type'] !== undefined) {
                c.params.application_type = body['application_type'];
            }
            if (body['audio_enabled'] !== undefined) {
                c.params.audio_enabled = body['audio_enabled'];
            }
            if (body['chat_enabled'] !== undefined) {
                c.params.chat_enabled = body['chat_enabled'];
            }
            if (body['video_enabled'] !== undefined) {
                c.params.video_enabled = body['video_enabled'];
            }
            if (body['connect_enabled'] !== undefined) {
                c.params.connect_enabled = body['connect_enabled'];
            }
            if (body['webmessage_enabled'] !== undefined) {
                c.params.webmessage_enabled = body['webmessage_enabled'];
            }
            if (body['callme_enabled'] !== undefined) {
                c.params.callme_enabled = body['callme_enabled'];
            }
            if (body['callme_days_range'] !== undefined) {
                c.params.callme_days_range = body['callme_days_range'];
            }
            if (body['goodbye_message'] !== undefined) {
                c.params.goodbye_message = body['goodbye_message'];
            }
            if (body['welcome_message'] !== undefined) {
                c.params.welcome_message = body['welcome_message'];
            }
            if (body['target'] !== undefined) {
                c.params.target = body['target'];
            }
            if (body['geolocation_enabled'] !== undefined) {
                c.params.geolocation_enabled = body['geolocation_enabled'];
            }
            if (body['display_name'] !== undefined) {
                c.params.display_name = body['display_name'];
            }
            if (body['avatar_id'] !== undefined) {
                c.params.avatar_id = body['avatar_id'];
            }
            if (body['webmessage_definition'] !== undefined) {
                c.params.webmessage_definition = body['webmessage_definition'];
            }
            if (body['webmessage_definition_id'] !== undefined) {
                c.params.webmessage_definition_id = body['webmessage_definition_id'];
            }
            if (body['snapshot_frame_enabled'] !== undefined && body['snapshot_frames'] !== undefined) {
                c.params.snapshot_frame_enabled = body['snapshot_frame_enabled'];
                c.params.snapshot_frames = body['snapshot_frames'];
            }
            if (callback && {}.toString.call(callback) === '[object Function]') {
                callback(true, body);
            }

        },
        __fromQueryString: function (queryString) {
            var queryRe = /^\?/,
                plusRe = /\+/g;
            var parts = queryString.replace(queryRe, '').split('&'),
                object = {},
                components, name, value, i, ln,
                part;

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (part.length > 0) {
                    components = part.split('=');
                    name = components[0];
                    name = name.replace(plusRe, '%20');
                    name = decodeURIComponent(name);

                    value = components[1];
                    if (value !== undefined) {
                        value = value.replace(plusRe, '%20');
                        value = decodeURIComponent(value);
                    } else {
                        value = '';
                    }

                    if (object.hasOwnProperty(name)) {
                        if (!$.isArray(object[name])) {
                            object[name] = [object[name]];
                        }

                        object[name].push(value);
                    } else {
                        object[name] = value;
                    }
                }
            }
            return object;
        },

        isApplePlatform: function () {
            if (navigator.userAgent.indexOf("Macintosh") > -1 && navigator.userAgent.indexOf("Safari") > -1) {
                return true;
            } else if (navigator.userAgent.indexOf("Mac OS") > -1 && navigator.userAgent.indexOf("Safari") > -1) {
                return true;
            } else if (navigator.userAgent.indexOf("iPhone") > -1 && navigator.userAgent.indexOf("Safari") > -1) {
                return true;
            }
            return false;
        },

        isMobilePlatform: function () {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ) {
                return true;
            }
            else {
                return false;
            }
        },

        getDefaultLanguage: function (){
            if(c.params.default_language){
                return c.params.default_language;
            } else {
                return 'en';
            }
        },

        getDefaultTheme: function (){
            if(c.params.color){
                return c.params.color;
            } else {
                return 'teal';
            }
        },

        isGeolocationEnabled(){
            return c.params.geolocation_enabled;
        }
    });
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var callme = c.callme = (function () {
        function callme() {

        }

        callme.getEnabled = function () {
            return c.params.callme_enabled;
        };

        callme.getDaysRange = function () {
            return c.params.callme_days_range;
        };

        callme.send = function (data, successFn, failureFn) {
            $.ajax({
                method: "POST",
                url: c.plugin_url + '/callme',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function (body) {
                    var status = null;
                    try {
                        if (body.responseJSON) {
                            status = body.responseJSON.error_code;
                        }
                        if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                            failureFn(status);
                        }
                    } catch (e) {
                        console.error(e);
                        if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                            failureFn(status);
                        }
                    }
                }
            });
        };

        return callme;
    }());
}(window.$conpeek.jquery, window));(function ($, window) {
    let c = window.$conpeek;
    let connect = c.connect = (function () {
        function connect() {

        }

        connect.getDisplayName = function () {
            return c.params.display_name;
        };

        connect.getEnabled = function () {
            return c.params.connect_enabled;
        };

        connect.getAudioEnabled = function () {
            return c.params.audio_enabled;
        };

        connect.getVideoEnabled = function () {
            return c.params.video_enabled;
        };

        connect.getChatEnabled = function () {
            return c.params.chat_enabled;
        };

        connect.setContext = function (data) {
            c.params.context = data;
        };

        connect.getWelcomeMessage = function () {
            return c.params.welcome_message;
        };

        connect.getTargetAvatar = function () {
            return c.params.avatar_id;
        };

        connect.getGoodbyeMessage = function () {
            return c.params.goodbye_message;
        };

        return connect;
    }());
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var webmessage = c.webmessage = (function () {
        function webmessage() {

        }

        webmessage.getEnabled = function () {
            return c.params.webmessage_enabled;
        };

        webmessage.getDefinition = function () {
            return c.params.webmessage_definition;
        };

        webmessage.getDefinitionId = function () {
            return c.params.webmessage_definition_id;
        };

        webmessage.send = function (params, target, webmessage_definition_id, successFn, failureFn) {
            var data = {
                'webmessage_definition_id': webmessage_definition_id,
                'params': params,
                'target': target
            };
            $.ajax({
                method: "POST",
                url: c.plugin_url + '/sendWebmessage',
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'Authorization': c.params.token
                },
                data: JSON.stringify(data),
                success: function (body) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function () {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        return webmessage;
    }());
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var snapshot = c.snapshot = (function () {
        function snapshot() {

        }

        snapshot.getEnabled = function () {
            return c.params.snapshot_frame_enabled;
        };

        snapshot.getFrames = function () {
            return c.params.snapshot_frames;
        };

        return snapshot;
    }());
}(window.$conpeek.jquery, window));(function ($, window) {
    var c = window.$conpeek;
    var tracking = c.tracking = (function () {
        function tracking() {

        }

        tracking.last_mouse_over_element = null;

        tracking.buffer = "";

        tracking.sendBuffer = function () {
            if (tracking.buffer !== "") {
                tracking.send(tracking.buffer, function () {
                    tracking.buffer = "";
                });
            }
        };

        tracking.initialize = function () {
            $(document).click(function (e) {
                let target = e.target;

                if (target.dataset.conpeekTrackingClick) {
                    tracking.add(target.dataset.conpeekTrackingClick);
                }
            });

            $("[data-conpeek-tracking-mouse-over]").each(function (_, o) {
                if (o.getAttribute("data-conpeek-tracking-mouse-over-enabled") !== "true") {
                    o.setAttribute("data-conpeek-tracking-mouse-over-enabled", "true");
                    o.addEventListener('mouseover', function () {
                        if (tracking.last_mouse_over_element !== o) {
                            tracking.last_mouse_over_element = o;
                            tracking.add(o.getAttribute("data-conpeek-tracking-mouse-over"));
                        }
                    });
                }
            });
        };

        tracking.add = function (text) {
            if (c.dialog.connected) {
                tracking.send(text);
            } else {
                tracking.buffer += "\r\n" + text;
            }
        };

        tracking.send = function (text, successFn, failureFn) {

            if (text === "" || text === null) {
                return;
            }

            let params = {
                "text": text,
                "dialog_uuid": c.dialog.current_dialog_uuid
            };

            $.ajax({
                method: "POST",
                url: c.params.https_uri + '/dialog/tracking/message',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(params),
                headers: {
                    "Authorization": c.params.token
                },
                success: function (data) {
                    if (successFn && {}.toString.call(successFn) === '[object Function]') {
                        successFn();
                    }
                },
                error: function (data) {
                    if (failureFn && {}.toString.call(failureFn) === '[object Function]') {
                        failureFn();
                    }
                }
            });
        };

        return tracking;
    }());
}(window.$conpeek.jquery, window));