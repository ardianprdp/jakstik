self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    // Add a call to skipWaiting here if needed
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    // Add a call to claim clients here if needed
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    // Add fetch event handling here if needed
});