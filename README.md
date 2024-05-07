# Firebase Integration for NodeBB

This plugin integrates NodeBB with [Firebase](https://firebase.google.com/). Currently, it does not support all products, but as needs arise, additional functionality will be added.

## History

This plugin was originally created in February of 2020 for a paid client, but it did not function as intended when released as iOS had no support for web push notifications.

As of 2024, this is now available for installed apps, so this plugin is theoretically able to fully function.

It has not been tested with NodeBB v3.x, but is now re-licensed to an open source license.

## Roadmap

* Initial Release
    * [x] Cloud Messaging
* Future Release
    * [ ] Authentication (currently unsupported, but a [plugin created by another developer](https://www.npmjs.com/package/nodebb-plugin-sso-firebase) may work)
    * [ ] Crashlytics
    * [ ] Performance Monitoring