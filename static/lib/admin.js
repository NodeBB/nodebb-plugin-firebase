'use strict';

/* globals $, app, socket, define */

define('admin/plugins/firebase', ['settings'], function (Settings) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('firebase', $('.firebase-settings'));

		$('#save').on('click', function () {
			Settings.save('firebase', $('.firebase-settings'), function () {
				app.alert({
					type: 'success',
					alert_id: 'firebase-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function () {
						socket.emit('admin.restart');
					},
				});
			});
		});
	};

	return ACP;
});
