self.addEventListener("install", (event) => {
     event.waitUntil(
          caches.open("bingo-cache").then((cache) => {
               return cache.addAll([
                    "/",
                    "/index.html",
                    "/style.css",
                    "/script.js",
                    "/bingo-icon.png",
                    "/db.js",
                    "/manifest.json",
                    "/service-worker.js",
               ]);
          })
     );
});

self.addEventListener("fetch", (event) => {
     event.respondWith(
          caches.match(event.request).then((response) => {
               return response || fetch(event.request);
          })
     );
});
