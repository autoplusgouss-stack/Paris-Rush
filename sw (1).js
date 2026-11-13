const C="paris-rush-79fad91a32";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!=C).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET")return;const u=new URL(r.url);
 const same=u.origin==location.origin,font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);if(!same&&!font)return;
 if(same&&r.mode=="navigate"){e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put("./index.html",cp));return x}).catch(()=>caches.match("./index.html")));return}
 e.respondWith(caches.match(r,{ignoreSearch:same}).then(m=>m||fetch(r).then(x=>{if(x&&(x.ok||x.type=="opaque")){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}return x})))});
