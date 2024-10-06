self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('jakstik').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/page/login.html',
                '/page/jadwal.html',
                '/page/kelas.html',
                '/page/riwayat_absensi.html',
                '/manifest.json',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'
            ]).catch(function(error) {
                console.error('Failed to cache:', error);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});