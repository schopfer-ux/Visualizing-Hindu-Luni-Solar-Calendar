self.addEventListener('message', (event) => {
    // Check if the event is a message we are interested in
    if (event.data && event.data.type === 'FETCH_DATA') {
      event.waitUntil(
        fetchSomeData().then((data) => {
          // Respond back with the data
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ type: 'DATA', data: data });
            });
          });
        }).catch((error) => {
          console.error('Error fetching data:', error);
        })
      );
    }
  });
  
  // Example function to fetch some data
  async function fetchSomeData() {
    // Simulate a network request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Fetched Data');
      }, 1000);
    });
  }
  

  // Install a service worker
this.addEventListener("install", (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll([
              "/offline.html",
              "/offline.css",
              "/static/media/Vazirmatn.eb0d9c6914c753f76252.ttf",
              //if you want cache the first page , add "/"
          ])
      })
  )
})

// Update a service worker
// Inside the service worker’s activate event, delete all
// previously cached files if necessary
self.addEventListener("activate", function (event) {
  event.waitUntil(
      caches.keys().then(function (cacheNames) {
          return Promise.all(
              cacheNames.map(function (cacheName) {
                  if (CACHE_NAME !== cacheName && cacheName.startsWith("cache")) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
      event.respondWith(
          fetch(event.request.url).catch(error => {
              return caches.match("offline.html");
          })
      );
  } else {
      // if the resources arent in the cache ,
      // they are requested from the server
      event.respondWith(caches.match(event.request)
          .then(function (response) {
              return response || fetch(event.request);
          })
      );
  }
});

//for notify user when worker file is updated
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
  }
});