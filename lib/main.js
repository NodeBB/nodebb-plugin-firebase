'use strict';

const path = require('path');
const fs = require('fs').promises;

const meta = require.main.require('./src/meta');
const controllers = require('./controllers');
const messaging = require('./messaging');
require('./websockets');

const plugin = {};

plugin.init = async (params) => {
	const router = params.router;
	const hostMiddleware = params.middleware;
	const hostHelpers = require.main.require('./src/routes/helpers');
	// const hostControllers = params.controllers;

	router.get('/admin/plugins/firebase', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/firebase', controllers.renderAdminPage);

	// UCP for FCM
	hostHelpers.setupPageRoute(router, '/user/:userslug/push-notifications', hostMiddleware, [hostMiddleware.requireUser, hostMiddleware.exposeUid], controllers.renderSettings);

	await plugin.syncSettings();

	// Required for firebase cloud messaging, must be after settings are sync'd
	router.get('/firebase-messaging-sw.js', async (req, res) => {
		let contents = await fs.readFile(path.join(__dirname, '../static/lib/firebase-messaging-sw.js'), { encoding: 'utf-8' });
		contents = contents.replace('/* config */', JSON.stringify(plugin.getConfig().app, undefined, 4));
		res.set('Content-Type', 'text/javascript').send(contents);
	});
};

plugin.getConfig = () => {
	const settings = plugin.settings;
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

plugin.syncSettings = async () => {
	const settings = await meta.settings.get('firebase');
	plugin.settings = Object.assign((plugin.settings || {}), settings);
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
