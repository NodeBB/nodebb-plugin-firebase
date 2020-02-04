'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res/* , next */) {
	res.render('admin/plugins/firebase', {});
};

Controllers.renderSettings = async (req, res) => {
	if (res.locals.uid !== req.user.uid) {
		return res.render('403', {});
	}

	res.render('account/push-notifications');
};

module.exports = Controllers;
