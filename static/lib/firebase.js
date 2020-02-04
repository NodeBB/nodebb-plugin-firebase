'use strict';

/* globals define, socket */

define('firebase', ['@firebase/app', '@firebase/messaging'], (firebase) => {
	var module = {
		_ok: {
			app: false,
			messaging: false,
		},
	};

	module.init = () => {
		socket.emit('plugins.firebase.getConfig', function (err, config) {
			if (err) {
				console.warn('[plugin/firebase] Unable to retrieve client-side config from server.');
				return;
			}

			var required = {
				app: ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'],
				messaging: ['vapidKey'],
			};

			if (required.app.every(function (key) {
				return config.app.hasOwnProperty(key);
			})) {
				firebase.initializeApp(config.app);
				module._ok.app = true;
				console.info('[plugin/firebase] App initialized OK');
			} else {
				console.warn('[plugin/firebase] Config does not contain all required values, please double-check configuration in ACP.');
			}

			if (required.messaging.every(function (key) {
				return config.messaging.hasOwnProperty(key);
			})) {
				try {
					module.messaging = firebase.messaging();
					module.messaging.usePublicVapidKey(config.messaging.vapidKey);
					module._ok.messaging = true;
					console.info('[plugin/firebase] Cloud Messaging initialized OK');
				} catch (err) {
					console.info('[plugin/firebase] Cloud Messaging NOT initialized, error follows.');
					console.debug('[plugin/firebase]', err);
				}
			} else {
				console.warn('[plugin/firebase] VAPID Key missing or incorrect, please double-check configuration in ACP. Cloud Messaging not enabled.');
			}
		});
	};

	return module;
});
