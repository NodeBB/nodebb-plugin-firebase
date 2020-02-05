'use strict';

const SocketPlugins = require.main.require('./src/socket.io/plugins');
const messaging = require('./messaging');

SocketPlugins.firebase = {
	messaging: {},
};

SocketPlugins.firebase.getConfig = async () => {
	const main = module.parent.exports;
	return main.getConfig();
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
