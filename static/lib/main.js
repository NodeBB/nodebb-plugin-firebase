'use strict';

/* globals document, $ */

$(document).ready(function () {
	require(['firebase'], function (firebase) {
		firebase.init();
	});
});
