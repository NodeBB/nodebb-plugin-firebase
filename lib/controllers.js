'use strict';

const analytics = require.main.require('./src/analytics');

var Controllers = {};

Controllers.renderAdminPage = async (req, res) => {
	res.render('admin/plugins/firebase', {
		analytics: {
			messaging: {
				notifications: await analytics.getDailyStatsForSet('analytics:firebase.messaging.notifications', Date.now(), 30),
				subscribe: await analytics.getDailyStatsForSet('analytics:firebase.messaging.subscribe', Date.now(), 30),
				unsubscribe: await analytics.getDailyStatsForSet('analytics:firebase.messaging.unsubscribe', Date.now(), 30),
			},
		},
	});
};

Controllers.renderSettings = async (req, res) => {
	if (res.locals.uid !== req.user.uid) {
		return res.render('403', {});
	}

	res.render('account/push-notifications');
};

module.exports = Controllers;
