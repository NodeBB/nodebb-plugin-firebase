<form role="form" class="firebase-settings">
	<ul class="nav nav-tabs">
		<li role="presentation" class="active"><a href="#home" data-toggle="tab">Dashboard</a></li>
		<li role="presentation"><a href="#app" data-toggle="tab">App Configuration</a></li>
		<li role="presentation"><a href="#messaging" data-toggle="tab">Cloud Messaging</a></li>
	</ul>
	<div class="tab-content">
		<div role="tabpanel" class="tab-pane active" id="home">
			<p class="lead">
				Configuration for the Firebase plugin can be accessed with the tabs above.
			</p>
			<p>
				For assistance setting up or using this plugin, to report a deficiency, or to request a new feature for this plugin, please contact NodeBB at <a href="mailto:support@nodebb.org">support@nodebb.org</a>.
			</p>

			<hr />

			<div class="row">
				<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-body">
							<div><canvas id="firebase.messaging.notifications" height="250"></canvas></div>
						</div>
						<div class="panel-footer">Figure 1 &ndash; Notifications sent per day</div>
					</div>
				</div>
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-body">
							<div><canvas id="firebase.messaging.subscribe" height="250"></canvas></div>
						</div>
						<div class="panel-footer">Figure 2 &ndash; Device subscriptions per day</div>
					</div>
				</div>
				<div class="col-sm-6 col-xs-12">
					<div class="panel panel-default">
						<div class="panel-body">
							<div><canvas id="firebase.messaging.unsubscribe" height="250"></canvas></div>
						</div>
						<div class="panel-footer">Figure 3 &ndash; Device unsubscriptions per day</div>
					</div>
				</div>
			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="app">

			<p class="lead">
				Enter your Firebase app configuration here. You are given these values when you create an app from the <a href="https://console.firebase.google.com">Firebase Console</a>.
			</p>
			<p>
				<strong>Note</strong> that apps and projects are different! You'll want to create a project, and then create an app from inside that project.
			</p>
			<p>
				After the initial creation step, you can also retrieve these values from the Project settings page. Click the <i class="fa fa-gear"></i> next to "Project Overview", and click "Project Settings".
			</p>
			<div class="form-group">
				<label for="apiKey">API Key</label>
				<input type="text" id="apiKey" name="apiKey" title="API Key" class="form-control" placeholder="API Key">
			</div>
			<div class="form-group">
				<label for="authDomain">Auth Domain</label>
				<input type="text" id="authDomain" name="authDomain" title="Auth Domain" class="form-control" placeholder="Auth Domain">
			</div>
			<div class="form-group">
				<label for="databaseURL">Database URL</label>
				<input type="text" id="databaseURL" name="databaseURL" title="Database URL" class="form-control" placeholder="Database URL">
			</div>
			<div class="form-group">
				<label for="projectId">Project ID</label>
				<input type="text" id="projectId" name="projectId" title="Project ID" class="form-control" placeholder="Project ID">
			</div>
			<div class="form-group">
				<label for="storageBucket">Storage Bucket</label>
				<input type="text" id="storageBucket" name="storageBucket" title="Storage Bucket" class="form-control" placeholder="Storage Bucket">
			</div>
			<div class="form-group">
				<label for="messagingSenderId">Messaging Sender ID</label>
				<input type="text" id="messagingSenderId" name="messagingSenderId" title="Messaging Sender ID" class="form-control" placeholder="Messaging Sender ID">
			</div>
			<div class="form-group">
				<label for="appId">App ID</label>
				<input type="text" id="appId" name="appId" title="App ID" class="form-control" placeholder="App ID">
			</div>
		</div>
		<div role="tabpanel" class="tab-pane" id="messaging">
			<p class="lead">
				The values here can also be found in the Project Settings page, but under the "Cloud Messaging" tab.
			</p>
			<div class="form-group">
				<label for="vapidKey">VAPID Key</label>
				<input type="text" id="vapidKey" name="vapidKey" title="VAPID Key" class="form-control" placeholder="VAPID Key">
			</div>
			<div class="form-group">
				<label for="serverKey">Server Key</label>
				<input type="text" id="serverKey" name="serverKey" title="Server Key" class="form-control" placeholder="Server Key">
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
