'use strict';

/* globals firebase, importScripts */

importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

firebase.initializeApp({
	apiKey: 'AIzaSyBi3-G3s3W-yvgOZisDkutWACzOnLVACdA',
	authDomain: 'playground-3f15c.firebaseapp.com',
	databaseURL: 'https://playground-3f15c.firebaseio.com',
	projectId: 'playground-3f15c',
	storageBucket: 'playground-3f15c.appspot.com',
	messagingSenderId: '39485711083',
	appId: '1:39485711083:web:ef4d842f4b0bc2aaba54ae',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-unused-vars
const messaging = firebase.messaging();
