'use strict';

/* globals define, $, Notification, socket */

define('forum/account/push-notifications', ['firebase'], function (firebase) {
	var module = {};

	module.init = function init() {
		// Wait until firebase is initialized before proceeding
		if (!firebase._ok.app) {
			return setTimeout(init, 250);
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
			return elements.error.show();
		}

		firebase.messaging.onTokenRefresh(async () => {
			const token = await firebase.messaging.getToken();
			socket.emit('plugins.firebase.messaging.subscribe', token);
		});

		elements.check.on('click', function check() {
			const permission = Notification.permission;
			const ok = async () => {
				const token = await firebase.messaging.getToken();
				hideAll();
				socket.emit('plugins.firebase.messaging.check', token, (err, subscribed) => {
					if (err) {
						return elements.error.show();
					}

					elements[subscribed ? 'subscribed' : 'unsubscribed'].show();
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

		elements.unsubscribed.on('click', 'button', async () => {
			const token = await firebase.messaging.getToken();
			hideAll();
			socket.emit('plugins.firebase.messaging.subscribe', token, () => {
				elements.subscribed.show();
			});
		});

		elements.subscribed.on('click', 'button', async () => {
			const token = await firebase.messaging.getToken();
			hideAll();
			socket.emit('plugins.firebase.messaging.unsubscribe', token, (err, ok) => {
				if (err && !ok) {
					return elements.error.show();
				}

				elements.unsubscribed.show();
			});
		});
	};

	return module;
});
