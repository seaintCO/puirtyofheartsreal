const CACHE = "purity-public-v3";
const OFFLINE = "/offline";
const PUBLIC_PAGES = ["/","/culture","/education","/private-advisory","/purityos","/about","/consultation","/membership",OFFLINE];
const ASSETS = ["/manifest.webmanifest","/pwa-icon-192.png","/pwa-icon-512.png","/apple-touch-icon.png","/purity-group.webp","/purity-writing.webp","/purity-one-on-one.webp"];
const PRIVATE_PREFIXES = ["/api/","/dashboard","/login","/membership/manage","/membership/success","/purityos/chat","/success","/auth/"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([...PUBLIC_PAGES,...ASSETS])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("purity-public-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

function isPrivate(pathname) {
  return PRIVATE_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(prefix));
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isPrivate(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok && PUBLIC_PAGES.includes(url.pathname)) {
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(request,copy));
        }
        return response;
      }).catch(async () => (await caches.match(request)) || (await caches.match(OFFLINE)))
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || /.(?:css|js|woff2?|png|jpg|jpeg|webp|svg|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response.ok) caches.open(CACHE).then(cache => cache.put(request,response.clone()));
        return response;
      }))
    );
  }
});
