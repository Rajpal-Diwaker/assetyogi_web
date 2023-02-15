// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': 'AAAAtka0uEM:APA91bGPmkdhBjhaLUS7_ulvpEHEMdyx9qe4ESKozxh0_I5iTml3vgGWrJ-KGz9wSgRXqAyp7zN0nJ0PEEjRRkxBbJfmcQuTSx-OuN_qrcYnIDS2Sy_P4o9My41z58-TZ2hcfB7nz2Ky'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();