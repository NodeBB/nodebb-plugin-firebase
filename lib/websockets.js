'use strict';

const SocketPlugins = require.main.require('./src/socket.io/plugins');
const messaging = require('./messaging');

SocketPlugins.firebase = {
	messaging: {},
};

SocketPlugins.firebase.getConfig = async () => {
	const settings = module.parent.exports.settings;
	return {
		app: {
			apiKey: settings.apiKey,
			authDomain: settings.authDomain,
			databaseURL: settings.databaseURL,
			projectId: settings.projectId,
			storageBucket: settings.storageBucket,
			messagingSenderId: settings.messagingSenderId,
			appId: settings.appId,
		},
		messaging: {
			vapidKey: settings.vapidKey,
		},
	};
};

SocketPlugins.firebase.messaging.check = async (socket, token) => messaging.check(token);
SocketPlugins.firebase.messaging.subscribe = async (socket, token) => messaging.subscribe(socket.uid, token);
SocketPlugins.firebase.messaging.unsubscribe = async (socket, token) => {
	const uid = await messaging.getUidFromToken(token);
	if (uid === socket.uid) {
		await messaging.unsubscribe(token);
		return true;
	}

	return false;
};
