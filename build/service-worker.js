"use strict";var precacheConfig=[["/index.html","85c448e1cc079a57e87ade42d98f7529"],["/static/css/main.d79f7e05.chunk.css","61ceab1f7074870e3d8e3caa5a5708ad"],["/static/css/vendors.1cac5028.chunk.css","6227f55552321da071f9566dfa8362f5"],["/static/js/main.36fdb656.chunk.js","fc190daa6d30f920772ea56eb0e48666"],["/static/js/runtime~main.41117e05.js","b7addbf5607266c9e5e708aaef0ad942"],["/static/js/vendors.c8fcf3cc.chunk.js","a9b41e1858a450e7e96b2edd95637a40"],["/static/media/Climate_off.462f15af.svg","462f15af74efd361e31a1306ba38efdf"],["/static/media/Climate_on.89cacdbe.svg","89cacdbe99eb7df7bc4101cdeb07d2b7"],["/static/media/Header_Background.44cfe75c.png","44cfe75cfd555b95b0d08ef96cc1a521"],["/static/media/Knob_down.10958344.svg","1095834441d43b2d9dd2e3ca7c114dc5"],["/static/media/Knob_up.0cc0d3ba.svg","0cc0d3ba75436fa356d207e4b47798fb"],["/static/media/MediaPlayer_off.6c7da8f7.svg","6c7da8f7aaa3850c9b51f4ffe3e79cef"],["/static/media/MediaPlayer_on.4dcecbe8.svg","4dcecbe82610db76d3dcd1ad0db89495"],["/static/media/MediaPlayer_paused.44c1054f.svg","44c1054fc2b0118a4feca4c38065b6e2"],["/static/media/MediaPlayer_playing.b18afe3b.svg","b18afe3b7043e7b56a8829d934cabae2"],["/static/media/Settings_pause.a8ea652f.svg","a8ea652fc2e304c78c120f6e62872fa3"],["/static/media/Settings_play.8273ddc2.svg","8273ddc2fd1ee8c8136d1870c7af2eb8"],["/static/media/Settings_power.8a4998da.svg","8a4998da5a976dccb99d27736a4258b8"],["/static/media/Switch_off.c01592be.svg","c01592be8820449221a17244d3f9186a"],["/static/media/Switch_on.2f57be49.svg","2f57be49c6f4af0b8e536b961411ade5"],["/static/media/clear.bcce2d93.jpg","bcce2d93e52fe066bbcf071d2821918f"],["/static/media/cloudy.dfc77d0c.jpg","dfc77d0c173935ea13aaee994e15d65f"],["/static/media/rain.fad8314b.jpg","fad8314b2d9e8f1d0b6fa1d1e904f986"],["/static/media/snow.7a6953d2.jpg","7a6953d29ccb4350c9973306926ae761"],["/static/media/storm.760db0f8.jpg","760db0f83c5691302ee9df76185f31b2"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});