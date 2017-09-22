var CACHE_NAME = 'swtest-v1';
var urlsToCache = [
  '/',
  '/images/chrome-logo.svg',
  '/src/show-app/show-app.html',
  '/src/show-app/show-icons.html',
  '/src/show-app/show-list-page.html',
  '/src/show-app/show-video-page.html',
];

// Listen for install event, set callback
self.addEventListener('install', function (event) {
  console.log('Install successful, scope is:', registration.scope);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Activate successful, scope is:', registration.scope);
});

