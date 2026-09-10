const CACHE_NAME = "lifeadmin-v1";

const FILES_TO_CACHE = [
    "index.html",
    "bills.html",
    "subscriptions.html",
    "appointments.html",
    "style.css",
    "script.js",
    "manifest.json"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response ||
                       fetch(event.request);

            })

    );

});
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {

                console.log(
                    "LifeAdmin PWA registered:",
                    registration.scope
                );

            })
            .catch(error => {

                console.error(
                    "PWA registration failed:",
                    error
                );

            });

    });

}
