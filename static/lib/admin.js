'use strict';

/* globals $, app, socket, define, ajaxify, utils, document */

define('admin/plugins/firebase', ['settings', 'Chart'], function (Settings, Chart) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('firebase', $('.firebase-settings'));
		ACP.loadGraphs();

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

	ACP.loadGraphs = () => {
		const notificationsCanvas = document.getElementById('firebase.messaging.notifications');
		const subscribeCanvas = document.getElementById('firebase.messaging.subscribe');
		const unsubscribeCanvas = document.getElementById('firebase.messaging.unsubscribe');
		const dailyLabels = utils.getDaysArray().map(function (text, idx) {
			return idx % 3 ? '' : text;
		});
		const datasets = {
			notifications: [
				{
					label: '',
					backgroundColor: 'rgba(186,139,175,0.2)',
					borderColor: 'rgba(186,139,175,1)',
					pointBackgroundColor: 'rgba(186,139,175,1)',
					pointHoverBackgroundColor: '#fff',
					pointBorderColor: '#fff',
					pointHoverBorderColor: 'rgba(186,139,175,1)',
					data: ajaxify.data.analytics.messaging.notifications,
				},
			],
			subscribe: [
				{
					label: '',
					backgroundColor: 'rgba(151,187,205,0.2)',
					borderColor: 'rgba(151,187,205,1)',
					pointBackgroundColor: 'rgba(151,187,205,1)',
					pointHoverBackgroundColor: '#fff',
					pointBorderColor: '#fff',
					pointHoverBorderColor: 'rgba(151,187,205,1)',
					data: ajaxify.data.analytics.messaging.subscribe,
				},
			],
			unsubscribe: [
				{
					label: '',
					backgroundColor: 'rgba(171,70,66,0.2)',
					borderColor: 'rgba(171,70,66,1)',
					pointBackgroundColor: 'rgba(171,70,66,1)',
					pointHoverBackgroundColor: '#fff',
					pointBorderColor: '#fff',
					pointHoverBorderColor: 'rgba(171,70,66,1)',
					data: ajaxify.data.analytics.messaging.unsubscribe,
				},
			],
		};
		const options = {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			legend: {
				display: false,
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						precision: 0,
					},
				}],
			},
		};

		const canvases = [notificationsCanvas, subscribeCanvas, unsubscribeCanvas];
		canvases.forEach((canvas) => {
			canvas.width = $(canvas).parent().width();
		});

		new Chart(notificationsCanvas.getContext('2d'), {
			type: 'line',
			data: {
				labels: dailyLabels,
				datasets: datasets.notifications,
			},
			options: options,
		});
		new Chart(subscribeCanvas.getContext('2d'), {
			type: 'line',
			data: {
				labels: dailyLabels,
				datasets: datasets.subscribe,
			},
			options: options,
		});
		new Chart(unsubscribeCanvas.getContext('2d'), {
			type: 'line',
			data: {
				labels: dailyLabels,
				datasets: datasets.unsubscribe,
			},
			options: options,
		});
	};

	return ACP;
});
