const CACHE = 'fire-world-offline-v3';
const ASSETS = ['./', './index.html'];
self.addEventListener('install', event => {
  // cache:'reload' bypasses the browser HTTP cache so a new version never pre-caches a stale copy
  event.waitUntil(caches.open(CACHE).then(cache => Promise.all(ASSETS.map(a => cache.add(new Request(a, { cache: 'reload' }))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
// Network-first: online players always get the latest version; the cache is only the offline fallback.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request, { cache: 'no-cache' }).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));
});
