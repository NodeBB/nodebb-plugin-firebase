'use strict';

/* globals define, $, Notification, socket */

define('forum/account/push-notifications', ['firebase'], function (firebase) {
	var module = {};

	module.init = function init() {
		// Wait until firebase is initialized before proceeding
		if (!firebase._ok.app) {
			setTimeout(init, 250);
		}

		const elements = {
			check: $('.messages .check'),
			error: $('.messages .alert-danger'),
			subscribed: $('.messages .alert-success'),
			unsubscribed: $('.messages .alert-warning'),
		};

		const hideAll = () => {
			Object.keys(elements).forEach(key => elements[key].hide());
		};

		// Handle invalid browser/incognito(?)
		if (!firebase._ok.messaging) {
			hideAll();
			elements.error.show();
		}

		elements.check.on('click', function check() {
			const permission = Notification.permission;
			const ok = () => {
				firebase.messaging.getToken().then(function (currentToken) {
					hideAll();
					socket.emit('plugins.firebase.messaging.check', currentToken, (err, subscribed) => {
						if (err) {
							return elements.error.show();
						}

						elements[subscribed ? 'subscribed' : 'unsubscribed'].show();
					});
				});
			};

			switch (permission) {
			case 'granted':
				ok();
				break;
			case 'denied':
				hideAll();
				elements.error.show();
				break;
			default:
				Notification.requestPermission().then(check);
				break;
			}
		});

		elements.unsubscribed.on('click', 'button', () => {
			firebase.messaging.getToken().then(function (currentToken) {
				hideAll();
				socket.emit('plugins.firebase.messaging.subscribe', currentToken, () => {
					elements.subscribed.show();
				});
			});
		});

		elements.subscribed.on('click', 'button', () => {
			firebase.messaging.getToken().then(function (currentToken) {
				hideAll();
				socket.emit('plugins.firebase.messaging.unsubscribe', currentToken, (err, ok) => {
					if (err && !ok) {
						return elements.error.show();
					}

					elements.unsubscribed.show();
				});
			});
		});
	};

	return module;
});
