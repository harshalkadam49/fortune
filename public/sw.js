if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5WUqa5JnZQTq6r_GaR9Eg/_buildManifest.js",revision:"43baae41bd30cb0f8d7d57446b0e5667"},{url:"/_next/static/5WUqa5JnZQTq6r_GaR9Eg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/163-44bf95946ccb1784.js",revision:"44bf95946ccb1784"},{url:"/_next/static/chunks/164-8951ffc4bb6bbca1.js",revision:"8951ffc4bb6bbca1"},{url:"/_next/static/chunks/271-e3f726ff8692fac0.js",revision:"e3f726ff8692fac0"},{url:"/_next/static/chunks/303-4d92ba9ea1ea14ed.js",revision:"4d92ba9ea1ea14ed"},{url:"/_next/static/chunks/312-ca61c577a8f9a0df.js",revision:"ca61c577a8f9a0df"},{url:"/_next/static/chunks/363-9011f4d5e34d3720.js",revision:"9011f4d5e34d3720"},{url:"/_next/static/chunks/396-09677fc3cf69264a.js",revision:"09677fc3cf69264a"},{url:"/_next/static/chunks/41-6dce1b7dab2e8aaa.js",revision:"6dce1b7dab2e8aaa"},{url:"/_next/static/chunks/493-63a78d6bdd725ce5.js",revision:"63a78d6bdd725ce5"},{url:"/_next/static/chunks/50-c78b9f27874a7e10.js",revision:"c78b9f27874a7e10"},{url:"/_next/static/chunks/739-6416ea4b0b36537f.js",revision:"6416ea4b0b36537f"},{url:"/_next/static/chunks/864-a0887966d67480e8.js",revision:"a0887966d67480e8"},{url:"/_next/static/chunks/873-7c69d698e6b05321.js",revision:"7c69d698e6b05321"},{url:"/_next/static/chunks/941-1942891f0204605b.js",revision:"1942891f0204605b"},{url:"/_next/static/chunks/967-f989e64e43f77fb5.js",revision:"f989e64e43f77fb5"},{url:"/_next/static/chunks/982-1ef8bff4ce5d318e.js",revision:"1ef8bff4ce5d318e"},{url:"/_next/static/chunks/ea88be26-b21151d5035ec7c2.js",revision:"b21151d5035ec7c2"},{url:"/_next/static/chunks/framework-7a7e500878b44665.js",revision:"7a7e500878b44665"},{url:"/_next/static/chunks/main-2ee9031ab836abfa.js",revision:"2ee9031ab836abfa"},{url:"/_next/static/chunks/pages/_app-70e4ee19a4eaa666.js",revision:"70e4ee19a4eaa666"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/index-bdf9fe62377592dc.js",revision:"bdf9fe62377592dc"},{url:"/_next/static/chunks/pages/postLogin-c826e6bb93e7ce1b.js",revision:"c826e6bb93e7ce1b"},{url:"/_next/static/chunks/pages/postLogin/stocks/equityOrders-4205d4ccf2671ffe.js",revision:"4205d4ccf2671ffe"},{url:"/_next/static/chunks/pages/postLogin/stocks/orderExecution-0be41e8f51ad28ba.js",revision:"0be41e8f51ad28ba"},{url:"/_next/static/chunks/pages/postLogin/stocks/stockDetails-7d4061805d4286c3.js",revision:"7d4061805d4286c3"},{url:"/_next/static/chunks/pages/postLogin/stocks/stockLists-1d531ec2ca9ecfbe.js",revision:"1d531ec2ca9ecfbe"},{url:"/_next/static/chunks/pages/prelogin/carrousel-08e92db83b5d7775.js",revision:"08e92db83b5d7775"},{url:"/_next/static/chunks/pages/prelogin/login-9c252627db33b227.js",revision:"9c252627db33b227"},{url:"/_next/static/chunks/pages/prelogin/registrationdone-9644ba26280f6a07.js",revision:"9644ba26280f6a07"},{url:"/_next/static/chunks/pages/prelogin/signup-9dd774334b60ad72.js",revision:"9dd774334b60ad72"},{url:"/_next/static/chunks/pages/test-719742ab55b5c123.js",revision:"719742ab55b5c123"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1e9d3f973bd7f51f.js",revision:"1e9d3f973bd7f51f"},{url:"/_next/static/css/a01d8fdb5c847453.css",revision:"a01d8fdb5c847453"},{url:"/_next/static/css/f67928b0e3cecc35.css",revision:"f67928b0e3cecc35"},{url:"/_next/static/media/comingSoon.d72a9084.svg",revision:"f213c16eb24e77a2370b7a29f75fb471"},{url:"/_next/static/media/dummyImg.e0507c9f.svg",revision:"b06b87235c52c7912b2ade904a5e8a3b"},{url:"/_next/static/media/easyReturns.ee66e8dd.svg",revision:"b978b7e8edd716d6713daeca0da293d2"},{url:"/_next/static/media/emptyOrderList.9bfcb8ae.svg",revision:"a6ecf5efda7f76a63234c1b3041828c3"},{url:"/_next/static/media/errorlessTrading.05ff6aaf.svg",revision:"fef99cd9d5045999c0d17e078c9edffa"},{url:"/_next/static/media/femaleSelected.e8d8c72f.svg",revision:"774642e95ada5bd4079ebec9e2da417e"},{url:"/_next/static/media/femaleUnSelected.45345c13.svg",revision:"70ff7ad88ea17015959b1d3e1cfb95ce"},{url:"/_next/static/media/login.bca8d3f5.svg",revision:"29c91bb9d9ebb9babb793de88b209d23"},{url:"/_next/static/media/logo.1ddd484f.svg",revision:"971aa079375f192d85a1b4920fa6ca16"},{url:"/_next/static/media/maleSelected.1a7ffb05.svg",revision:"af2bac6f413efc8e92d833a02cb6ccf1"},{url:"/_next/static/media/maleUnSelected.dd5d3323.svg",revision:"0f47794223bdd9aa15278e69e1f48582"},{url:"/_next/static/media/maxROI.ab529332.svg",revision:"1f3e9d0ed4156c6b6da98c2ee4497e53"},{url:"/_next/static/media/simplifiedverification.732d2c53.svg",revision:"3097229f3ac12801cc0816fe210fb407"},{url:"/android-chrome-192x192.png",revision:"2c9466bb0db4162043ab0809683dcf4d"},{url:"/android-chrome-512x512.png",revision:"9a0b05eb736546dbae68aa4e7f1fbd0b"},{url:"/animations/SMSOTPAnimation.json",revision:"501513a09d6d26ced2dbb19f4cf5b53d"},{url:"/animations/emailOTPAnimation.json",revision:"b24fc63e9011d0c162f6f81cc09ca122"},{url:"/animations/registrationDone.json",revision:"f025dd10b211685777be1fc8b9d43f37"},{url:"/apple-touch-icon.png",revision:"deda7e81100a8222f15458e171af269f"},{url:"/dummyImg.svg",revision:"b06b87235c52c7912b2ade904a5e8a3b"},{url:"/favicon-16x16.png",revision:"c9326f442de8d8ffb69803178e8c427d"},{url:"/favicon-32x32.png",revision:"46b47e8fb539cd1df15633a004f2d103"},{url:"/favicon.ico",revision:"1da810b5fa6665458e70870b5e95ca24"},{url:"/icon-192x192.png",revision:"4af86d77950c328dc53caa477cebcc8e"},{url:"/icon-256x256.png",revision:"742d5140cee26c683e6a214dcabf8b6d"},{url:"/icon-384x384.png",revision:"a4c96a3edba50ac73b2568f92e4425cb"},{url:"/icon-512x512.png",revision:"4b6fd0e6d7348e23fb37bd3c991dfb3c"},{url:"/manifest.webmanifest",revision:"561187bfcfa6c9ea3683f28c5943ab91"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/postLogin/comingSoon.svg",revision:"f213c16eb24e77a2370b7a29f75fb471"},{url:"/postLogin/emptyOrderList.svg",revision:"a6ecf5efda7f76a63234c1b3041828c3"},{url:"/prelogin/checkIcon.svg",revision:"24be72360f62477dd037c5837c914fad"},{url:"/prelogin/easyReturns.svg",revision:"b978b7e8edd716d6713daeca0da293d2"},{url:"/prelogin/errorIcon.svg",revision:"477ddc0b624d652c15fc2d6d6183ef50"},{url:"/prelogin/errorlessTrading.svg",revision:"fef99cd9d5045999c0d17e078c9edffa"},{url:"/prelogin/femaleSelected.svg",revision:"774642e95ada5bd4079ebec9e2da417e"},{url:"/prelogin/femaleUnSelected.svg",revision:"70ff7ad88ea17015959b1d3e1cfb95ce"},{url:"/prelogin/fingerprint.svg",revision:"66cd001ba7ae3c98d0c6b1de1f4545e7"},{url:"/prelogin/google-icon.svg",revision:"eba94b82c9c504902bf14007abbec876"},{url:"/prelogin/login.svg",revision:"29c91bb9d9ebb9babb793de88b209d23"},{url:"/prelogin/logo.png",revision:"1798466f274e1b77c03ea37311121af5"},{url:"/prelogin/logo.svg",revision:"971aa079375f192d85a1b4920fa6ca16"},{url:"/prelogin/maleSelected.svg",revision:"af2bac6f413efc8e92d833a02cb6ccf1"},{url:"/prelogin/maleUnSelected.svg",revision:"0f47794223bdd9aa15278e69e1f48582"},{url:"/prelogin/maxROI.svg",revision:"1f3e9d0ed4156c6b6da98c2ee4497e53"},{url:"/prelogin/mobile.svg",revision:"2b89c74ca5600836ace824396e78f3eb"},{url:"/prelogin/simplifiedverification.svg",revision:"3097229f3ac12801cc0816fe210fb407"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
