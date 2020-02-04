<p class="lead">
	This website offers push notifications to help you stay up to date even when not on the site itself.
</p>
<p>
	The button below allows you to enable push notifications on the device you are currently using. You will need to enable push notifications on every device you'd like to receive them.
</p>
<p>
	<strong>Note</strong>: Push notifications and in-app notifications follow the same settings. If you receive notifications for something (i.e. a new reply to a topic you subscribe to), you will receive a push notification as well, but only when you are not on the site itself.
</p>

<div class="messages col-sm-offset-2 col-sm-8">
	<div class="check">
		<button class="btn btn-primary btn-block">Check state of push notifications on this device</button>
	</div>

	<div class="alert alert-danger" style="display: none;">
		It looks like your browser or device is not allowing notifications to be sent from here. Please double-check your privacy settings and try again.
	</div>

	<div class="alert alert-success" style="display: none;">
		<p>
			<i class="fa fa-check"></i> <strong>OK</strong><br />
			You are receiving notifications on your device even when this page is closed
		</p>
		<p>
			<button class="btn btn-danger" data-action="unsub">Unsubscribe</button>
		</p>
	</div>

	<div class="alert alert-warning" style="display: none;">
		<p>
			<i class="fa fa-exclamation-triangle"></i><br />
			You are not currently receiving notifications on this device.
		</p>
		<p>
			<button class="btn btn-primary" data-action="sub">Subscribe</button>
		</p>
	</div>
</div>