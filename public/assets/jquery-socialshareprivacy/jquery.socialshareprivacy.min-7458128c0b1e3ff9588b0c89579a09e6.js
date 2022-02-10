!function(t,e){"use strict";function a(e,a){if(a||(a=document.baseURI||t("html > head > base").last().attr("href")||document.location.href),!e)return a;if(/^[a-z][-+\.a-z0-9]*:/i.test(e))return e;if("//"===e.slice(0,2))return/^[^:]+:/.exec(a)[0]+e;var i=e.charAt(0);if("/"===i)return/^file:/i.test(a)?"file://"+e:/^[^:]+:\/*[^\/]+/i.exec(a)[0]+e;if("#"===i)return a.replace(/#.*$/,"")+e;if("?"===i)return a.replace(/[\?#].*$/,"")+e;var r;if(/^file:/i.test(a))r=a.replace(/^file:\/{0,2}/i,""),a="file://";else{var n=/^([^:]+:\/*[^\/]+)(\/.*?)?(\?.*?)?(#.*)?$/.exec(a);a=n[1],r=n[2]||"/"}return r=r.split("/"),r.pop(),0===r.length&&r.push(""),r.push(e),a+r.join("/")}function i(t){t=Number(t);var e="",a="";if(0>t&&(e="-",t=-t),1/0===t)return e+"Infinity";if(t>9999&&(t/=1e3,a="K"),t=Math.round(t),0===t)return"0";for(var i=[];t>0;){var r=String(t%1e3);if(t=Math.floor(t/1e3))for(;r.length<3;)r="0"+r;i.unshift(r)}return e+i.join(",")+a}function r(e,a,i){var r=i&&i.title;if("function"==typeof r&&(r=r.call(this,e,a,i)),r)return r;var r=t('meta[name="DC.title"]').attr("content"),n=t('meta[name="DC.creator"]').attr("content");return r&&n?r+" - "+n:r||t('meta[property="og:title"]').attr("content")||t("title").text()}function n(e,a,i){var r=i&&i.description;return"function"==typeof r&&(r=r.call(this,e,a,i)),r?r:s(t('meta[name="twitter:description"]').attr("content")||t('meta[itemprop="description"]').attr("content")||t('meta[name="description"]').attr("content")||t.trim(t("article, p").first().text())||t.trim(t("body").text()),3500)}function o(e,i,r){var n,o=r&&r.image;return"function"==typeof o&&(o=o.call(this,e,i,r)),o||(n=t('meta[property="image"], meta[property="og:image"], meta[property="og:image:url"], meta[name="twitter:image"], link[rel="image_src"], itemscope *[itemprop="image"]').first(),n.length>0&&(o=n.attr(k[n[0].nodeName]))),o?a(o):(n=t("img").filter(":visible").filter(function(){return 0===t(this).parents(".social_share_privacy_area").length}),0===n.length?(o=t('link[rel~="shortcut"][rel~="icon"]').attr("href"),o?a(o):"http://www.google.com/s2/favicons?"+t.param({domain:location.hostname})):(n.sort(function(t,e){return e.offsetWidth*e.offsetHeight-t.offsetWidth*t.offsetHeight}),n[0].src))}function s(t,e){if(unescape(encodeURIComponent(t)).length<=e)return t;var a=t.slice(0,e-3);if(!/\W/.test(t.charAt(e-3))){var i=/^(.*)\s\S*$/.exec(a);i&&(a=i[1])}return a+"\u2026"}function c(t){return t.replace(/[<>&"']/g,function(t){return x[t]})}function l(e,a,i){var r=i&&i.embed;if("function"==typeof r&&(r=r.call(this,e,a,i)),r)return r;r=['<iframe scrolling="no" frameborder="0" style="border:none;" allowtransparency="true"'];var n=t('meta[name="twitter:player"]').attr("content");if(n){var o=t('meta[name="twitter:player:width"]').attr("content"),s=t('meta[name="twitter:player:height"]').attr("content");o&&r.push(' width="',c(o),'"'),s&&r.push(' height="',c(s),'"')}else n=a+e.referrer_track;return r.push(' src="',c(n),'"></iframe>'),r.join("")}function u(e){var i=document.location.href,r=t('head meta[property="og:url"]').attr("content")||t("link[rel=canonical]").attr("href");return r?i=a(r):e&&e.ignore_fragment&&(i=i.replace(/#.*$/,"")),i}function m(e){function a(i){var r=t(this).parents("li.help_info").first(),n=r.parents(".social_share_privacy_area").first().parent(),o=n.data("social-share-privacy-options"),s=o.services[e],c=s.button_class||e,l=o.uri;"function"==typeof l&&(l=l.call(n[0],o));var u=r.find("span.switch");u.hasClass("off")?(r.addClass("info_off"),u.addClass("on").removeClass("off").html(s.txt_on||"\xa0"),r.find("img.privacy_dummy").replaceWith("function"==typeof s.button?s.button.call(r.parent().parent()[0],s,l,o):s.button),n.trigger({type:"socialshareprivacy:enable",serviceName:e,isClick:!i.isTrigger})):(r.removeClass("info_off"),u.addClass("off").removeClass("on").html(s.txt_off||"\xa0"),r.find(".dummy_btn").empty().append(t("<img/>").addClass(c+"_privacy_dummy privacy_dummy").attr({alt:s.dummy_alt,src:s.path_prefix+("line"===o.layout?s.dummy_line_img:s.dummy_box_img)}).click(a)),n.trigger({type:"socialshareprivacy:disable",serviceName:e,isClick:!i.isTrigger}))}return a}function d(){var e=t(this);if(!e.hasClass("info_off")){var a=window.setTimeout(function(){e.addClass("display"),e.removeData("timeout_id")},500);e.data("timeout_id",a)}}function p(){var a=t(this),i=a.data("timeout_id");i!==e&&window.clearTimeout(i),a.removeClass("display")}function f(){var e=t(this),a=e.parents(".social_share_privacy_area").first().parent(),i=a.data("social-share-privacy-options");e.is(":checked")?(i.set_perma_option(e.attr("data-service"),i),e.parent().addClass("checked")):(i.del_perma_option(e.attr("data-service"),i),e.parent().removeClass("checked"))}function h(){var e=t(this),a=window.setTimeout(function(){e.find(".settings_info_menu").removeClass("off").addClass("on"),e.removeData("timeout_id")},500);e.data("timeout_id",a)}function _(){var a=t(this),i=a.data("timeout_id");i!==e&&window.clearTimeout(i),a.find(".settings_info_menu").removeClass("on").addClass("off")}function g(e,a){t.cookie("socialSharePrivacy_"+e,"perma_on",a.cookie_expires,a.cookie_path,a.cookie_domain)}function y(e,a){t.cookie("socialSharePrivacy_"+e,null,-1,a.cookie_path,a.cookie_domain)}function v(t,e){return!!e.get_perma_options(e)[t]}function b(){var e=t.cookie(),a={};for(var i in e){var r=/^socialSharePrivacy_(.+)$/.exec(i);r&&(a[r[1]]="perma_on"===e[i])}return a}function w(e){if("string"==typeof e){var a=e;if(1===arguments.length)switch(a){case"enable":this.find(".switch.off").click();break;case"disable":this.find(".switch.on").click();break;case"toggle":this.find(".switch").click();break;case"options":return this.data("social-share-privacy-options");case"destroy":this.trigger({type:"socialshareprivacy:destroy"}),this.children(".social_share_privacy_area").remove(),this.removeData("social-share-privacy-options");break;case"enabled":var i={};return this.each(function(){var e=t(this),a=e.data("social-share-privacy-options");for(var r in a.services)i[r]=e.find("."+(a.services[r].class_name||r)+" .switch").hasClass("on")}),i;case"disabled":var r={};return this.each(function(){var e=t(this),a=e.data("social-share-privacy-options");for(var i in a.services)r[i]=e.find("."+(a.services[i].class_name||i)+" .switch").hasClass("off")}),r;default:throw new Error("socialSharePrivacy: unknown command: "+a)}else{var n=arguments[1];switch(a){case"enable":this.each(function(){var e=t(this),a=e.data("social-share-privacy-options");e.find("."+(a.services[n].class_name||n)+" .switch.off").click()});break;case"disable":this.each(function(){var e=t(this),a=e.data("social-share-privacy-options");e.find("."+(a.services[n].class_name||n)+" .switch.on").click()});break;case"toggle":this.each(function(){var e=t(this),a=e.data("social-share-privacy-options");e.find("."+(a.services[n].class_name||n)+" .switch").click()});break;case"option":if(!(arguments.length>2))return this.data("social-share-privacy-options")[n];var o={};o[n]=arguments[2],this.each(function(){t.extend(!0,t(this).data("social-share-privacy-options"),o)});break;case"options":t.extend(!0,e,n);break;case"enabled":var e=this.data("social-share-privacy-options");return this.find("."+(e.services[n].class_name||n)+" .switch").hasClass("on");case"disabled":var e=this.data("social-share-privacy-options");return this.find("."+(e.services[n].class_name||n)+" .switch").hasClass("off");default:throw new Error("socialSharePrivacy: unknown command: "+a)}}return this}return this.each(function(){var a={};this.lang&&(a.language=this.lang);for(var i=0,r=this.attributes;i<r.length;++i){var n=r[i];if(/^data-./.test(n.name)){for(var o=n.name.slice(5).replace(/-/g,"_").split("."),s=a,c=0;c<o.length-1;++c){var l=o[c];l in s?(s=s[l],"string"==typeof s&&(s=new Function("$","return ("+s+");").call(this,t))):s=s[l]={}}var l=o[c];s[l]="object"==typeof s[l]?t.extend(!0,new Function("$","return ("+n.value+");").call(this,t),s[l]):n.value}}if("cookie_expires"in a&&(a.cookie_expires=Number(a.cookie_expires)),"perma_option"in a&&(a.perma_option="true"===t.trim(a.perma_option).toLowerCase()),"ignore_fragment"in a&&(a.ignore_fragment="true"===t.trim(a.ignore_fragment).toLowerCase()),"set_perma_option"in a&&(a.set_perma_option=new Function("service_name","options",a.set_perma_option)),"del_perma_option"in a&&(a.del_perma_option=new Function("service_name","options",a.del_perma_option)),"get_perma_option"in a&&(a.get_perma_option=new Function("service_name","options",a.get_perma_option)),"get_perma_options"in a&&(a.get_perma_options=new Function("options",a.get_perma_options)),"order"in a&&(a.order=t.trim(a.order),a.order?a.order=a.order.split(/\s+/g):delete a.order),"string"==typeof a.services&&(a.services=new Function("$","return ("+a.services+");").call(this,t)),"options"in a&&(a=t.extend(a,new Function("$","return ("+a.options+");").call(this,t)),delete a.options),"services"in a)for(var u in a.services){var g=a.services[u];"string"==typeof g&&(a.services[u]=new Function("$","return ("+g+");").call(this,t)),"string"==typeof g.status&&(g.status="true"===t.trim(g.status).toLowerCase()),"string"==typeof g.perma_option&&(g.perma_option="true"===t.trim(g.perma_option).toLowerCase())}var y=t.extend(!0,{},w.settings,e,a),v=y.order||[],b="line"===y.layout?"dummy_line_img":"dummy_box_img",k=!1,x=!1,S=!1,T=[];for(var u in y.services){var g=y.services[u];g.status&&(k=!0,-1===t.inArray(u,v)&&T.push(u),"safe"!==g.privacy&&(S=!0,g.perma_option&&(x=!0))),"language"in g||(g.language=y.language),"path_prefix"in g||(g.path_prefix=y.path_prefix),"referrer_track"in g||(g.referrer_track="")}if(T.sort(),v=v.concat(T),k){if(y.css_path){var P=(y.path_prefix||"")+y.css_path;document.createStyleSheet?document.createStyleSheet(P):0===t('link[href="'+P+'"]').length&&t("<link/>",{rel:"stylesheet",type:"text/css",href:P}).appendTo(document.head)}var j;if(y.perma_option&&x)if(y.get_perma_options)j=y.get_perma_options(y);else{j={};for(var u in y.services)j[u]=y.get_perma_option(u,y)}var I=y.uri;"function"==typeof I&&(I=I.call(this,y));var D=t('<ul class="social_share_privacy_area"></ul>').addClass(y.layout),C=t(this);C.prepend(D).data("social-share-privacy-options",y);for(var i=0;i<v.length;++i){var u=v[i],g=y.services[u];if(g&&g.status){var N,F=g.class_name||u,A=g.button_class||u;"safe"===g.privacy?(N=t('<li class="help_info"><div class="info">'+g.txt_info+'</div><div class="dummy_btn"></div></li>').addClass(F),N.find(".dummy_btn").addClass(A).append(g.button.call(this,g,I,y))):(N=t('<li class="help_info"><div class="info">'+g.txt_info+'</div><span class="switch off">'+(g.txt_off||"\xa0")+'</span><div class="dummy_btn"></div></li>').addClass(F),N.find(".dummy_btn").addClass(A).append(t("<img/>").addClass(A+"_privacy_dummy privacy_dummy").attr({alt:g.dummy_alt,src:g.path_prefix+g[b]})),N.find(".dummy_btn img.privacy_dummy, span.switch").click(m(u))),D.append(N)}}if(S){var q=t('<li class="settings_info"><div class="settings_info_menu off perma_option_off"><a><span class="help_info icon"><span class="info">'+y.txt_help+"</span></span></a></div></li>"),E=q.find("> .settings_info_menu > a").attr("href",y.info_link);if(y.info_link_target&&E.attr("target",y.info_link_target),D.append(q),D.find(".help_info").on("mouseenter",d).on("mouseleave",p),y.perma_option&&x){var L=D.find("li.settings_info"),G=L.find(".settings_info_menu");G.removeClass("perma_option_off"),G.append('<span class="settings">'+y.txt_settings+"</span><form><fieldset><legend>"+y.settings_perma+"</legend></fieldset></form>");for(var R=G.find("form fieldset"),i=0;i<v.length;++i){var u=v[i],g=y.services[u];if(g&&g.status&&g.perma_option&&"safe"!==g.privacy){var F=g.class_name||u,Q=j[u],B=t('<label><input type="checkbox"'+(Q?' checked="checked"/>':"/>")+g.display_name+"</label>");B.find("input").attr("data-service",u),R.append(B),Q&&(D.find("li."+F+" span.switch").click(),y.set_perma_option(u,y))}}L.find("span.settings").css("cursor","pointer"),L.on("mouseenter",h).on("mouseleave",_),L.find("fieldset input").on("change",f)}}C.trigger({type:"socialshareprivacy:create",options:y})}})}var k={META:"content",IMG:"src",A:"href",IFRAME:"src",LINK:"href"},x={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"};w.absurl=a,w.escapeHtml=c,w.getTitle=r,w.getImage=o,w.getEmbed=l,w.getDescription=n,w.abbreviateText=s,w.formatNumber=i,w.settings={services:{},info_link:"http://panzi.github.io/SocialSharePrivacy/",info_link_target:"",txt_settings:"Settings",txt_help:"If you activate these fields via click, data will be sent to a third party (Facebook, Twitter, Google, ...) and stored there. For more details click <em>i</em>.",settings_perma:"Permanently enable share buttons:",layout:"line",set_perma_option:g,del_perma_option:y,get_perma_options:b,get_perma_option:v,perma_option:!!t.cookie,cookie_path:"/",cookie_domain:document.location.hostname,cookie_expires:365,path_prefix:"",css_path:"stylesheets/jquery.socialshareprivacy.min.css",uri:u,language:"en",ignore_fragment:!0},t.fn.socialSharePrivacy=w}(jQuery),function(t){"use strict";function e(t,e,a,i,r){var n=e[r];return"function"==typeof n?n.call(t,e,a,i):String(n)}t.fn.socialSharePrivacy.settings.services.buffer={status:!0,dummy_line_img:"images/dummy_buffer.png",dummy_box_img:"images/dummy_box_buffer.png",dummy_alt:'"Buffer"-Dummy',txt_info:"Two clicks for more privacy: The Buffer button will be enabled once you click here. Activating the button already sends data to Buffer &ndash; see <em>i</em>.",txt_off:"not connected to Buffer",txt_on:"connected to Buffer",perma_option:!0,display_name:"Buffer",referrer_track:"",via:"",text:t.fn.socialSharePrivacy.getTitle,picture:t.fn.socialSharePrivacy.getImage,button:function(a,i,r){return t('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr("src","https://widgets.bufferapp.com/button/?"+t.param({count:"line"===r.layout?"horizontal":"vertical",via:e(this,a,i,r,"via"),text:t.fn.socialSharePrivacy.abbreviateText(e(this,a,i,r,"text"),120),picture:e(this,a,i,r,"picture"),url:i+a.referrer_track,source:"button"}))}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.delicious={status:!0,dummy_line_img:"images/dummy_delicious.png",dummy_box_img:"images/dummy_box_delicious.png",dummy_alt:'"Delicious"-Dummy',txt_info:"Two clicks for more privacy: The Delicious button will be enabled once you click here. Activating the button already sends data to Delicious &ndash; see <em>i</em>.",txt_off:"not connected to Delicious",txt_on:"connected to Delicious",perma_option:!0,display_name:"Delicious",txt_button:"Save",referrer_track:"",title:t.fn.socialSharePrivacy.getTitle,button:function(e,a,i){var r=t('<div class="delicious-widget"/>'),n=a+e.referrer_track;return t.ajax({url:"http://feeds.delicious.com/v2/json/urlinfo/data",data:{url:n},dataType:"jsonp",success:function(o){for(var s,c,l,u,m=0;m<o.length;++m){var d=o[m];if(d.url===n){c=parseInt(d.total_posts,10),s=d.hash,l=d.title;break}}u=c?t.fn.socialSharePrivacy.formatNumber(c):e.txt_button;var p="http://delicious.com/save?"+t.param({v:"5",url:n,title:("function"==typeof e.title?e.title.call(this,e,a,i):String(e.title))||l});r.html('<a target="delicious" class="icon"><div class="delicious1"></div><div class="delicious2"></div><div class="delicious3"></div></a><a class="count" target="delicious"><i></i><b></b></a>'),r.find("i").text(e.txt_button),r.find("b").text(u),r.find("a.icon").attr("href",s?"http://delicious.com/url/"+s:p);var f=r.find("a.count").attr("href",p).click(function(t){window.open(p+"&noui&jump=close","delicious","toolbar=no,width=555,height=555"),t.preventDefault()});c&&f.hover(function(){var e=t(this);e.find("b").stop(1,1).css("display","none"),e.find("i").fadeIn()},function(){var e=t(this);e.find("i").stop(1,1).css("display","none"),e.find("b").fadeIn()})}}),r}}}(jQuery),function(t){"use strict";var e={displayCount:function(e){t(".social_share_privacy_area .disqus .disqus-widget:not(.init)").each(function(){var a=t(this),i=e.counts[0].id;if(a.attr("data-uri")===i){var r=a.attr("data-count"),n=e.counts[0][r],o=e.text[r],s=t.fn.socialSharePrivacy.formatNumber(n);a.attr("title",0===n?o.zero:1===n?o.one:o.multiple.replace("{num}",s)),a.find(".count a").text(s),a.addClass("init")}})}};t.fn.socialSharePrivacy.settings.services.disqus={status:!0,dummy_line_img:"images/dummy_disqus.png",dummy_box_img:"images/dummy_box_disqus.png",dummy_alt:'"Disqus"-Dummy',txt_info:"Two clicks for more privacy: The Disqus button will be enabled once you click here. Activating the button already sends data to Disqus &ndash; see <em>i</em>.",txt_off:"not connected to Disqus",txt_on:"connected to Disqus",perma_option:!0,display_name:"Disqus",referrer_track:"",shortname:"",count:"comments",onclick:null,button:function(a,i,r){var n,o=a.shortname||window.disqus_shortname||"";return n=t("line"===r.layout?'<div class="disqus-widget"><a href="#disqus_thread" class="name">Disq<span class="us">us</span></a><span class="count"><i></i><u></u><a href="#disqus_thread">&nbsp;</a></span></div>':'<div class="disqus-widget"><div class="count"><i></i><u></u><a href="#disqus_thread">&nbsp;</a></div><a href="#disqus_thread" class="name">Disq<span class="us">us</span></a></div>'),n.attr({"data-count":a.count,"data-shortname":o,"data-uri":i+a.referrer_track}),a.onclick&&n.find("a").click("function"==typeof a.onclick?a.onclick:new Function("event",a.onclick)),window.DISQUSWIDGETS=e,t.getScript("https://"+o+".disqus.com/count-data.js?2="+encodeURIComponent(i+a.referrer_track)),n}}}(jQuery),function(t){"use strict";var e={af:["ZA"],ar:["AR"],az:["AZ"],be:["BY"],bg:["BG"],bn:["IN"],bs:["BA"],ca:["ES"],cs:["CZ"],cy:["GB"],da:["DK"],de:["DE"],el:["GR"],en:["GB","PI","UD","US"],eo:["EO"],es:["ES","LA"],et:["EE"],eu:["ES"],fa:["IR"],fb:["LT"],fi:["FI"],fo:["FO"],fr:["CA","FR"],fy:["NL"],ga:["IE"],gl:["ES"],he:["IL"],hi:["IN"],hr:["HR"],hu:["HU"],hy:["AM"],id:["ID"],is:["IS"],it:["IT"],ja:["JP"],ka:["GE"],km:["KH"],ko:["KR"],ku:["TR"],la:["VA"],lt:["LT"],lv:["LV"],mk:["MK"],ml:["IN"],ms:["MY"],nb:["NO"],ne:["NP"],nl:["NL"],nn:["NO"],pa:["IN"],pl:["PL"],ps:["AF"],pt:["BR","PT"],ro:["RO"],ru:["RU"],sk:["SK"],sl:["SI"],sq:["AL"],sr:["RS"],sv:["SE"],sw:["KE"],ta:["IN"],te:["IN"],th:["TH"],tl:["PH"],tr:["TR"],uk:["UA"],vi:["VN"],zh:["CN","HK","TW"]};t.fn.socialSharePrivacy.settings.services.facebook={status:!0,button_class:"fb_like",dummy_line_img:"images/dummy_facebook.png",dummy_box_img:"images/dummy_box_facebook.png",dummy_alt:'Facebook "Like"-Dummy',txt_info:"Two clicks for more privacy: The Facebook Like button will be enabled once you click here. Activating the button already sends data to Facebook &ndash; see <em>i</em>.",txt_off:"not connected to Facebook",txt_on:"connected to Facebook",perma_option:!0,display_name:"Facebook Like/Recommend",referrer_track:"",action:"like",colorscheme:"light",font:"",button:function(a,i,r){var n=/^([a-z]{2})_([A-Z]{2})$/.exec(a.language),o="en_US";if(n){if(n[1]in e){var s=e[n[1]];o=-1!==t.inArray(n[2],s)?a.language:n[1]+"_"+s[0]}}else a.language in e&&(o=a.language+"_"+e[a.language][0]);var c={locale:o,href:i+a.referrer_track,send:"false",show_faces:"false",action:a.action,colorscheme:a.colorscheme};return a.font&&(c.font=a.font),"line"===r.layout?(c.width="120",c.height="20",c.layout="button_count"):(c.width="48",c.height="61",c.layout="box_count"),t('<iframe scrolling="no" frameborder="0" allowtransparency="true"></iframe>').attr("src","https://www.facebook.com/plugins/like.php?"+t.param(c))}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.fbshare={status:!0,privacy:"safe",button_class:"fbshare",line_img:"images/fbshare.png",box_img:"images/box_fbshare.png",txt_info:"Share via facebook.",txt_button:"Facebook Share",display_name:"Facebook Share",referrer_track:"",button:function(e,a,i){return t("<a/>",{target:"_blank",href:"https://www.facebook.com/sharer/sharer.php?"+t.param({u:a+e.referrer_track})}).append(t("<img>",{alt:e.txt_button,src:e.path_prefix+("line"===i.layout?e.line_img:e.box_img)}))}}}(jQuery),function(t){"use strict";function e(t,e,a,i,r){var n=e[r];return"function"==typeof n?n.call(t,e,a,i):String(n)}var a={en:!0,sq:!0,ar:!0,be:!0,bg:!0,ca:!0,zh:!0,hr:!0,cs:!0,da:!0,nl:!0,eo:!0,et:!0,fi:!0,fr:!0,es:!0,de:!0,el:!0,iw:!0,hi:!0,hu:!0,is:!0,"in":!0,ga:!0,it:!0,ja:!0,ko:!0,lv:!0,lt:!0,mk:!0,ms:!0,mt:!0,no:!0,nn:!0,fa:!0,pl:!0,pt:!0,ro:!0,ru:!0,sr:!0,sk:!0,sl:!0,sv:!0,th:!0,tr:!0,uk:!0,vi:!0};t.fn.socialSharePrivacy.settings.services.flattr={status:!0,button_class:"flattr",dummy_line_img:"images/dummy_flattr.png",dummy_box_img:"images/dummy_box_flattr.png",dummy_alt:'"Flattr"-Dummy',txt_info:"Two clicks for more privacy: The Flattr button will be enabled once you click here. Activating the button already sends data to Flattr &ndash; see <em>i</em>.",txt_off:"not connected to Flattr",txt_on:"connected to Flattr",perma_option:!0,display_name:"Flattr",referrer_track:"",title:t.fn.socialSharePrivacy.getTitle,description:t.fn.socialSharePrivacy.getDescription,uid:"",category:"",tags:"",popout:"",hidden:"",button:function(i,r,n){var o={href:r+i.referrer_track,title:e(this,i,r,n,"title")};if(i.uid&&(o["data-flattr-uid"]=i.uid),i.hidden&&(o["data-flattr-hidden"]=i.hidden),i.popout&&(o["data-flattr-popout"]=i.popout),i.category&&(o["data-flattr-category"]=i.category),i.tags&&(o["data-flattr-tags"]=i.tags),i.language){var s=String(i.language).replace("-","_"),c=s.split("_")[0];a[c]===!0&&(o["data-flattr-language"]=o.lang=s)}"line"===n.layout&&(o["data-flattr-button"]="compact");var l=t('<a class="FlattrButton">'+e(this,i,r,n,"description")+'</a><script text="text/javscript" src="https://api.flattr.com/js/0.6/load.js?mode=auto"></script>');return l.filter("a").attr(o),l}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.gplus={status:!0,button_class:"gplusone",dummy_line_img:"images/dummy_gplus.png",dummy_box_img:"images/dummy_box_gplus.png",dummy_alt:'"Google+1"-Dummy',txt_info:"Two clicks for more privacy: The Google+ button will be enabled once you click here. Activating the button already sends data to Google &ndash; see <em>i</em>.",txt_off:"not connected to Google+",txt_on:"connected to Google+",perma_option:!0,display_name:"Google+",referrer_track:"",button:function(e,a,i){var r=t('<div class="g-plusone"></div><script type="text/javascript">window.___gcfg = {lang: "'+e.language.replace("_","-")+'"}; (function() { var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/plusone.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>');return r.filter(".g-plusone").attr({"data-href":a+e.referrer_track,"data-size":"line"===i.layout?"medium":"tall"}),r}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.hackernews={status:!0,dummy_line_img:"images/dummy_hackernews.png",dummy_box_img:"images/dummy_box_hackernews.png",dummy_alt:'"Hacker News"-Dummy',txt_info:"Two clicks for more privacy: The Hacker News button will be enabled once you click here. Activating the button already sends data to Hacker News &ndash; see <em>i</em>.",txt_off:"not connected to Hacker News",txt_on:"connected to Hacker News",perma_option:!0,display_name:"Hacker News",txt_n_points:"{points} points",txt_one_point:"1 point",referrer_track:"",title:t.fn.socialSharePrivacy.getTitle,button:function(e,a,i){var r,n=a+e.referrer_track,o="function"==typeof e.title?e.title.call(this,e,a,i):String(e.title);return r=t("line"===i.layout?'<div class="hackernews-widget"><a class="name" target="_blank">Y</a><span class="points"><i></i><u></u><a target="_blank">submit</a></span></div>':'<div class="hackernews-widget"><div class="points"><i></i><u></u><a target="_blank">submit</a></div><a class="name" target="_blank">Y</a></div>'),r.find("a").attr("href","https://news.ycombinator.com/submitlink?"+t.param({u:n,t:o})),t.ajax("https://api.thriftdb.com/api.hnsearch.com/items/_search?filter[fields][url][]="+encodeURIComponent(n),{dataType:"jsonp",success:function(a){var i=a.results[0];if(i){i=i.item;var n=t.fn.socialSharePrivacy.formatNumber(i.points);r.find("a").attr("href","https://news.ycombinator.com/item?id="+i.id),r.find(".points a").text(n).attr("title",1===i.points?e.txt_one_point:e.txt_n_points.replace(/{points}/g,n))}}}),r}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.linkedin={status:!0,dummy_line_img:"images/dummy_linkedin.png",dummy_box_img:"images/dummy_box_linkedin.png",dummy_alt:'"LinkedIn"-Dummy',txt_info:"Two clicks for more privacy: The Linked in button will be enabled once you click here. Activating the button already sends data to Linked in &ndash; see <em>i</em>.",txt_off:"not connected to LinkedIn",txt_on:"connected to LinkedIn",perma_option:!0,display_name:"LinkedIn",referrer_track:"",onsuccess:null,onerror:null,showzero:!1,button:function(e,a,i){var r={"data-counter":"line"===i.layout?"right":"top","data-url":a+e.referrer_track,"data-showzero":String(e.showzero)};e.onsuccess&&(r["data-onsuccess"]=e.onsuccess),e.onerror&&(r["data-onerror"]=e.onerror);var n=t('<script type="IN/Share"></script>').attr(r);return window.IN&&window.IN.parse?n=n.add('<script type="text/javascript">IN.parse(document.body);</script>'):0===t('script[src^="https://platform.linkedin.com/"]').length&&(n=n.add('<script type="text/javascript" src="https://platform.linkedin.com/in.js"></script>')),n}}}(jQuery),function(t){"use strict";function e(t,e,a,i,r){var n=e[r];return"function"==typeof n&&(n=n.call(t,e,a,i)),String(n)}function a(t,e,a){return i.call(this,t,e,a)+"\n\n"+e+t.referrer_track}var i=t.fn.socialSharePrivacy.getDescription;t.fn.socialSharePrivacy.settings.services.mail={status:!0,privacy:"safe",button_class:"mail",line_img:"images/mail.png",box_img:"images/box_mail.png",txt_info:"Send this via email to a friend.",txt_button:"Send Email",display_name:"Mail",referrer_track:"",subject:t.fn.socialSharePrivacy.getTitle,body:a,button:function(a,i,r){return t("<a/>").attr("href","mailto:?"+t.param({subject:e(this,a,i,r,"subject"),body:e(this,a,i,r,"body")}).replace(/\+/g,"%20")).append(t("<img>",{alt:a.txt_button,src:a.path_prefix+("line"===r.layout?a.line_img:a.box_img)}))}}}(jQuery),function(t){"use strict";function e(t,e,a,i,r){var n=e[r];return"function"==typeof n?n.call(t,e,a,i):String(n)}function a(){t(".social_share_privacy_area .pinterest .pinit a[data-pin-log]").attr("data-pin-do","ignore"),t.ajax({url:"https://assets.pinterest.com/js/pinit.js",dataType:"script",cache:!0}),i=!1}var i=!1;t.fn.socialSharePrivacy.settings.services.pinterest={status:!0,button_class:"pinit",dummy_line_img:"images/dummy_pinterest.png",dummy_box_img:"images/dummy_box_pinterest.png",dummy_alt:'"Pin it"-Dummy',txt_info:"Two clicks for more privacy: The Pin it button will be enabled once you click here. Activating the button already sends data to Pinterest &ndash; see <em>i</em>.",txt_off:"not connected to Pinterest",txt_on:"connected to Pinterest",perma_option:!0,display_name:"Pinterest",referrer_track:"",title:t.fn.socialSharePrivacy.getTitle,description:t.fn.socialSharePrivacy.getDescription,media:t.fn.socialSharePrivacy.getImage,button:function(r,n,o){var s={url:n+r.referrer_track,media:e(this,r,n,o,"media")},c=e(this,r,n,o,"title"),l=e(this,r,n,o,"description");c&&(s.title=c),l&&(s.description=l);var u=t('<a data-pin-do="buttonPin"><img /></a>');return u.filter("a").attr({"data-pin-config":"line"===o.layout?"beside":"above",href:"https://pinterest.com/pin/create/button/?"+t.param(s)}).find("img").attr("src","https://assets.pinterest.com/images/pidgets/pin_it_button.png"),i||(i=!0,setTimeout(a,10)),u}}}(jQuery),function(t){"use strict";function e(t,e,a,i,r){var n=e[r];return"function"==typeof n?n.call(t,e,a,i):String(n)}t.fn.socialSharePrivacy.settings.services.reddit={status:!0,button_class:"reddit",dummy_line_img:"images/dummy_reddit.png",dummy_box_img:"images/dummy_box_reddit.png",dummy_alt:'"Reddit this!"-Dummy',txt_info:"Two clicks for more privacy: The reddit this! button will be enabled once you click here. Activating the button already sends data to reddit &ndash; see <em>i</em>.",txt_off:"not connected to reddit",txt_on:"connected to reddit",perma_option:!0,display_name:"Reddit",referrer_track:"",title:t.fn.socialSharePrivacy.getTitle,target:"",newwindow:"1",bgcolor:"transparent",bordercolor:"",button:function(a,i,r){var n,o,s;"line"===r.layout?(o=120,s="/button/button1.html?"):(o=58,s="/button/button2.html?"),n="https://redditstatic.s3.amazonaws.com";var c={url:i+a.referrer_track,width:String(o)},l=e(this,a,i,r,"title"),u=e(this,a,i,r,"target");return l&&(c.title=l),u&&(c.target=u),a.bgcolor&&(c.bgcolor=a.bgcolor),a.bordercolor&&(c.bordercolor=a.bordercolor),a.newwindow&&(c.newwindow=a.newwindow),t('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr("src",n+s+t.param(c))}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.stumbleupon={status:!0,button_class:"stumbleupon",dummy_line_img:"images/dummy_stumbleupon.png",dummy_box_img:"images/dummy_box_stumbleupon.png",dummy_alt:'"Stumble!"-Dummy',txt_info:"Two clicks for more privacy: The Stumble! button will be enabled once you click here. Activating the button already sends data to StumbleUpon &ndash; see <em>i</em>.",txt_off:"not connected to StumbleUpon",txt_on:"connected to StumbleUpon",perma_option:!0,display_name:"Stumble Upon",referrer_track:"",button:function(e,a,i){var r,n,o="https:"===document.location.protocol?"https://":"http://";return"line"===i.layout?(r="74",n="18",o+="badge.stumbleupon.com/badge/embed/1/?"):(r="50",n="60",o+="badge.stumbleupon.com/badge/embed/5/?"),t('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr({src:o+t.param({url:a+e.referrer_track}),width:r,height:n})}}}(jQuery),function(t){"use strict";function e(){var e=t.trim(t("article, p").text());if(e.length<=600)return e;var a=e.slice(0,597);if(/^\w+$/.test(e.slice(596,598))){var i=/^(.*)\s\S*$/.exec(a);i&&(a=i[1])}return t.trim(a)+"\u2026"}function a(t,e){return e+t.referrer_track}function i(t,e,a,i,r){var n=e[r];return"function"==typeof n?n.call(t,e,a,i):String(n)}function r(t){var e=window.screenX||window.screenLeft,a=window.screenY||window.screenTop,i=window.outerWidth||window.innerWidth,r=window.outerHeight||window.innerHeight,n=450,o=430,s=Math.round(e+.5*(i-n)),c=Math.round(a+.5*(r-o));window.open(this.href,"t","left="+s+",top="+c+",toolbar=0,resizable=0,status=0,menubar=0,width="+n+",height="+o),t.preventDefault()}t.fn.socialSharePrivacy.settings.services.tumblr={status:!0,privacy:"safe",button_class:"tumblr",line_img:"images/tumblr.png",box_img:"images/box_tumblr.png",txt_info:"Post this on Tumblr.",txt_button:"Share on Tubmlr",display_name:"Tumblr",referrer_track:"",type:"link",name:t.fn.socialSharePrivacy.getTitle,description:t.fn.socialSharePrivacy.getDescription,quote:e,photo:t.fn.socialSharePrivacy.getImage,clickthrou:a,embed:t.fn.socialSharePrivacy.getEmbed,caption:t.fn.socialSharePrivacy.getDescription,button:function(e,a,n){var o=t('<a target="_blank"/>').click(r);switch(t("<img>",{alt:e.txt_button,src:e.path_prefix+("line"===n.layout?e.line_img:e.box_img)}).appendTo(o),e.type){case"link":return o.attr("href","https://www.tumblr.com/share/link?"+t.param({url:a+e.referrer_track,name:i(this,e,a,n,"name"),description:i(this,e,a,n,"description")}));case"quote":return o.attr("href","https://www.tumblr.com/share/quote?"+t.param({source:a+e.referrer_track,quote:i(this,e,a,n,"quote")}));case"photo":return o.attr("href","https://www.tumblr.com/share/photo?"+t.param({source:i(this,e,a,n,"photo"),caption:i(this,e,a,n,"caption"),clickthrou:i(this,e,a,n,"clickthrou")}));case"video":return o.attr("href","https://www.tumblr.com/share/video?"+t.param({embed:i(this,e,a,n,"embed"),caption:i(this,e,a,n,"caption")}))}}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.twitter={status:!0,button_class:"tweet",dummy_line_img:"images/dummy_twitter.png",dummy_box_img:"images/dummy_box_twitter.png",dummy_alt:'"Tweet this"-Dummy',txt_info:"Two clicks for more privacy: The Tweet this button will be enabled once you click here. Activating the button already sends data to Twitter &ndash; see <em>i</em>.",txt_off:"not connected to Twitter",txt_on:"connected to Twitter",perma_option:!0,display_name:"Twitter",referrer_track:"",via:"",related:"",hashtags:"",dnt:!0,text:t.fn.socialSharePrivacy.getTitle,button:function(e,a,i){var r="function"==typeof e.text?e.text.call(this,e,a,i):String(e.text);r=t.fn.socialSharePrivacy.abbreviateText(r,120);var n={url:a+e.referrer_track,counturl:a,
text:r,count:"line"===i.layout?"horizontal":"vertical",lang:e.language};return e.via&&(n.via=e.via),e.related&&(n.related=e.related),e.hashtags&&(n.hashtags=e.hashtags),e.dnt&&(n.dnt=e.dnt),t('<iframe allowtransparency="true" frameborder="0" scrolling="no"></iframe>').attr("src","https://platform.twitter.com/widgets/tweet_button.html?"+t.param(n).replace(/\+/g,"%20"))}}}(jQuery),function(t){"use strict";t.fn.socialSharePrivacy.settings.services.xing={status:!0,dummy_line_img:"images/dummy_xing.png",dummy_box_img:"images/dummy_box_xing.png",dummy_alt:'"XING"-Dummy',txt_info:"Two clicks for more privacy: The XING button will be enabled once you click here. Activating the button already sends data to XING &ndash; see <em>i</em>.",txt_off:"not connected to XING",txt_on:"connected to XING",perma_option:!0,display_name:"XING",referrer_track:"",button:function(e,a,i){var r=t('<script type="XING/Share"></script>').attr({"data-counter":"line"===i.layout?"right":"top","data-url":a+e.referrer_track,"data-lang":e.language});return r.add("<script type='text/javascript'>(function(d, s) { var x = d.createElement(s); s = d.getElementsByTagName(s)[0]; x.src = 'https://www.xing-share.com/js/external/share.js'; s.parentNode.insertBefore(x, s); })(document, 'script');</script>")}}}(jQuery),jQuery(document).ready(function(t){"use strict";t('script[type="application/x-social-share-privacy-settings"]').each(function(){var e=new Function("return ("+(this.textContent||this.innerText||this.text)+");").call(this);"object"==typeof e&&t.extend(!0,t.fn.socialSharePrivacy.settings,e)})});