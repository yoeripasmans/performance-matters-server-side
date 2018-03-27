self.addEventListener('install', event => event.waitUntil(
    caches.open('bs-v1-core')
        .then(cache => cache.add('/offline/'))
        .then(self.skipWaiting())
));

/* check in DevTools > Application > Cache Storage
 * or check in console using:
caches.open('bs-v1-core')
.then(cache => cache.match('/offline/'))
.then(res => res.text())
.then(text => console.log(text))
*/

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(err => fetchOfflinePage())
    );
});

function fetchOfflinePage() {
    return caches.open('bs-v1-core')
        .then(cache => cache.match('/offline/'));
}
