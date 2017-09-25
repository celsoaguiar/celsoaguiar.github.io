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

self.addEventListener('activate', function(event) {
  console.log('Activate successful, scope is:', registration.scope);

  var cacheWhitelist = ['swtest-v1'];
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('cached url:', event.request.url);                
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});