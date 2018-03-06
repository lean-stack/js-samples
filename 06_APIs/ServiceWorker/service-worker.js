
// Important: location matters here

var CACHE_NAME = 'todo-v1';

var resourcesToCache = [
    '.',
    '/',
    '/index.html',
    '/styles/styles.css',
    '/script.js'
];

self.addEventListener('install', (ev) => {
     console.log('installed worker');
  
    ev.waitUntil( 
        caches.open(CACHE_NAME)
            .then(function(cache) {
                

                return cache.addAll(resourcesToCache);
            }));
});

self.addEventListener('activate', () => {
    console.log('activated ');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                console.log('request:', event.request);

                if (response) {
                    console.info('cache hit');
                    return response;
                }

                console.info('fetching');
                return fetch(event.request);
            })
    );
});
