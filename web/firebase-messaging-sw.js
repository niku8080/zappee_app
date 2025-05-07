importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAvHbt7AsX16onK-S3_Zh9eVjZc9BIy-DY",
  authDomain: "zeppee-b609c.firebaseapp.com",
  databaseURL: "https://zeppee-b609c-default-rtdb.firebaseio.com/",
  projectId: "zeppee-b609c",
  storageBucket: "zeppee-b609c.firebasestorage.app",
  messagingSenderId: "308417552913",
  appId: "1:308417552913:web:953c9cc81c14ec3aecc7b0",
  measurementId: "G-0BEGYZD160",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});