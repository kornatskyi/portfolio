if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,c)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const r={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return r;default:return e(s)}}))).then((e=>{const s=c(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-1ca495a9"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CDFN.jfif",revision:"ed722fa03e382fb24c08a7190c6952ce"},{url:"/Frame 12.png",revision:"2e8c2cc6b055ae27987e97e25997f483"},{url:"/Front_End_Web_UI_Frameworks_and_Tools_Bootstrap_4-Front_End_Web_and_Mobile_Development_Certificate_8045.pdf",revision:"ec4015278fdcce482b31d628ddcb5c57"},{url:"/_next/static/chunks/0e226fb0.adc3262d9cb897c5a260.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.64f2cd743a126177cadb.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.3fc8cc5398b028727c6a.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/framework.a4b3ed6c46c358b601ab.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/main-1fcbee7ea7f601f83c0f.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/pages/_app-89676d99d99c77324d01.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/pages/_error-85ecf6d6555ecf3d2c84.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/pages/index-084c4a2ddba6bbc25513.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/polyfills-144e5fa6fafab6397d9c.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/nctvaeZqpDBIK6KT20Cq_/_buildManifest.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/_next/static/nctvaeZqpDBIK6KT20Cq_/_ssgManifest.js",revision:"nctvaeZqpDBIK6KT20Cq_"},{url:"/about.svg",revision:"6a3966fb7a834f454712c4596dd67d99"},{url:"/about.txt",revision:"16e8d178f8abe60047aeff8b7a829ec9"},{url:"/android-chrome-192x192.png",revision:"79a49e5082650cf8c9711493f66767e3"},{url:"/android-chrome-512x512.png",revision:"664703588ce75d9e9d6685485bc0df78"},{url:"/apple-touch-icon.png",revision:"71d536a37abeac41cafea8e1dd100cda"},{url:"/experience.svg",revision:"e018df5592ccda0cb1bed79b4382f916"},{url:"/favicon-16x16.png",revision:"aa50e9ce2c863a32ff921928feca5407"},{url:"/favicon-32x32.png",revision:"2f66bb91ac59a7c4820841cabbdb2bca"},{url:"/favicon.ico",revision:"08c17908ed80c76371f843d05895134c"},{url:"/freecodecamp.jpg",revision:"d46b0037652bf9f9d183aa1ce1f2e0b5"},{url:"/kisspng-igor-sikorsky-kyiv-polytechnic-institute-duhok-pol-5b1f41d1924fc6.8965930915287751215993.jpg",revision:"d3e94771a348b469a7ea09e7c8e07bfa"},{url:"/landing.svg",revision:"6edb1a99e74e31a7a3f3f0eeb6250d64"},{url:"/manifest.webmanifest",revision:"40251dda391993dd211fea66f7ccac23"},{url:"/nucamp.jpeg",revision:"2bd3fb0ac9f275882d7b7203ce8cfa60"},{url:"/nuk.jpeg",revision:"3a4310431696bd8baf383cf9adbcff37"},{url:"/photo.jpg",revision:"00bd27530be44dcc68bd2070374c3501"},{url:"/projects.svg",revision:"1d6f5005e24ee7774f8a6280d75d661d"},{url:"/skill.svg",revision:"44f72ed9ce281d77f1459e47660e6c58"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
