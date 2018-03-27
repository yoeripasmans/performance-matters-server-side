self.addEventListener('install', event => event.waitUntil(
    caches.open('oba-core')
        .then(cache => cache.addAll([
            '/css/bundle.css',
			'/js/bundle.js',
        ]))
        .then(self.skipWaiting())
));

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
