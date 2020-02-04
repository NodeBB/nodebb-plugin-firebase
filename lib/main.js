'use strict';

const path = require('path');

const meta = require.main.require('./src/meta');
const controllers = require('./controllers');
const messaging = require('./messaging');
require('./websockets');

const plugin = {};

plugin.init = function (params, callback) {
	const router = params.router;
	const hostMiddleware = params.middleware;
	const hostHelpers = require.main.require('./src/routes/helpers');
	// const hostControllers = params.controllers;

	router.get('/admin/plugins/firebase', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/firebase', controllers.renderAdminPage);

	// Required for firebase cloud messaging
	router.get('/firebase-messaging-sw.js', (req, res) => {
		res.set('Content-Type', 'text/javascript').sendFile(path.join(__dirname, '../static/lib/firebase-messaging-sw.js'));
	});

	// UCP for FCM
	hostHelpers.setupPageRoute(router, '/user/:userslug/push-notifications', hostMiddleware, [hostMiddleware.requireUser, hostMiddleware.exposeUid], controllers.renderSettings);

	plugin.syncSettings(callback);
};

plugin.syncSettings = function (callback) {
	meta.settings.get('firebase', function (err, settings) {
		if (err) {
			return callback(err);
		}

		plugin.settings = Object.assign((plugin.settings || {}), settings);
		callback();
	});
};

plugin.onSettingsChange = function (data) {
	if (data.plugin === 'firebase') {
		plugin.settings = Object.assign((plugin.settings || {}), data.settings);
	}
};

plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/firebase',
		icon: 'fa-gear',
		name: 'Firebase',
	});

	callback(null, header);
};

plugin.addProfileItem = async (data) => {
	data.links.push({
		id: 'push-notifications',
		route: 'push-notifications',
		icon: 'fa-mobile',
		name: 'Push Notifications',
		visibility: {
			self: true,
			other: false,
			moderator: false,
			globalMod: false,
			admin: false,
		},
	});

	return data;
};

plugin.notify = messaging.notify;

module.exports = plugin;
