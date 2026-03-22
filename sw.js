// ═══════════════════════════════════════════════
// Service Worker – Altmühltal-Panoramaweg 2026
// Strategie: App Shell cached bei Installation,
//            Map-Tiles cached beim Browsen (Cache-as-you-go)
// ═══════════════════════════════════════════════

const CACHE_NAME = 'altmuehltal-v1';

// App Shell: index.html enthält CSS+JS inline → nur noch diese Dateien cachen
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
];

// ── Install: App Shell vorab cachen ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: alte Caches aufräumen ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: Anfragen abfangen ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // OpenStreetMap Kartenkacheln: Cache-first, bei Miss netzwerk + speichern
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            // Nur gültige Antworten cachen
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => new Response('', { status: 408, statusText: 'Offline – Karte nicht gecacht' }));
      })
    );
    return;
  }

  // App Shell & CDN-Ressourcen: Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // CDN-Ressourcen (Leaflet, Chart.js) beim ersten Laden cachen
        if (response.ok && (url.hostname.includes('cdnjs') || url.origin === self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
