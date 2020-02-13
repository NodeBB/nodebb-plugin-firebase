'use strict';

const db = require.main.require('./src/database');
const meta = require.main.require('./src/meta');
const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
const translator = require.main.require('./src/translator');
const analytics = require.main.require('./src/analytics');

const striptags = require('striptags');
const request = require('request-promise-native');

const Messaging = module.exports;

Messaging.constants = Object.freeze({
	tokenKey: 'fcmToken:uid',
});

Messaging.check = async (token) => db.isSortedSetMember(Messaging.constants.tokenKey, token);

Messaging.subscribe = async (uid, token) => {
	await Promise.all([
		db.sortedSetAdd(Messaging.constants.tokenKey, uid, token),
		db.sortedSetAdd('uid:' + uid + ':fcmTokens', Date.now(), token),
		analytics.increment('firebase.messaging.subscribe'),
	]);
	winston.verbose('[plugins/firebase] FCM subscribe for uid ' + uid + '; ' + token);
};

Messaging.unsubscribe = async (token) => {
	const uid = await Messaging.getUidFromToken(token);
	await Promise.all([
		db.sortedSetRemove(Messaging.constants.tokenKey, token),
		db.sortedSetRemove('uid:' + uid + ':fcmTokens', token),
		analytics.increment('firebase.messaging.unsubscribe'),
	]);
	winston.verbose('[plugins/firebase] FCM unsubscribe for uid ' + uid + '; ' + token);
};

Messaging.getUidFromToken = async (token) => db.sortedSetScore(Messaging.constants.tokenKey, token);

/*
 * Yes, this uses the old legacy HTTP API
 * Upgrade docs: https://firebase.google.com/docs/cloud-messaging/migrate-v1
 * However, there does not seem to be any deprecation date scheduled, and this
 * is definitely easier than using a service account (for now)
 */
Messaging.notify = async (data) => {
	const keys = data.uids.map((uid) => 'uid:' + uid + ':fcmTokens');
	let tokens = await db.getSortedSetsMembers(keys);
	tokens = tokens.reduce((memo, cur) => memo.concat(cur));

	await Promise.all(tokens.map(async (token) => {
		try {
			const res = await request({
				method: 'POST',
				url: 'https://fcm.googleapis.com/fcm/send',
				json: true,
				headers: {
					Authorization: 'key=' + module.parent.exports.settings.serverKey,
				},
				body: {
					notification: {
						title: striptags(await translator.translate(data.notification.bodyShort)),
						body: striptags(await translator.translate(data.notification.bodyLong)),
						click_action: nconf.get('url') + data.notification.path,
						image: nconf.get('url') + (meta.config['brand:logo'] || '/logo.png'),
					},
					to: token,
				},
			});

			if (res.failure === 1) {
				switch (res.results[0].error) {
				case 'NotRegistered':
					Messaging.unsubscribe(token);
					break;
				default:
					winston.error('[plugins/firebase] Unhandled error from FCM: ' + res.results);
					break;
				}
			} else {
				winston.verbose('[plugins/firebase] FCM notify; ' + token);
				await analytics.increment('firebase.messaging.notifications');
			}
		} catch (e) {
			winston.warn('[plugins/firebase] Error encountered (' + e.code + ') while sending push notification to token ' + token + '. ' + e.message);
		}

		return token;
	}));
};
