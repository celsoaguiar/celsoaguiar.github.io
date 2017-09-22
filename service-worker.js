
// Listen for install event, set callback
self.addEventListener('install', function(event) {
  console.log('Install successful, scope is:', registration.scope);
});

self.addEventListener('activate', function(event) {
  console.log('Activate successful, scope is:', registration.scope);
});

