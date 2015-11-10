var $$ = $$ || {};

$$.Model.Login = class ModelLogin {
	constructor (root = $('main')) {
		"use strict";

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	initialize () {

		"use strict";
		this.root.html(this.template);
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `
			<div class="b-login-page">
			<div class="ui middle aligned center aligned grid">
			<div class="column">
			<h2 class="ui teal image header">
			<img src="http://semantic-ui.com/examples/assets/images/logo.png" class="image">
			<div class="content">
			Log-in to your account
			</div>
			</h2>
			<form class="ui large form">
			<div class="ui stacked segment">
			<div class="field">
			<div class="ui left icon input">
			<i class="user icon"></i>
			<input type="text" name="email" placeholder="E-mail address">
			</div>
			</div>
			<div class="field">
			<div class="ui left icon input">
			<i class="lock icon"></i>
			<input type="password" name="password" placeholder="Password">
			</div>
			</div>
			<div class="ui fluid large teal submit button">Login</div>
			</div>

			<div class="ui error message"></div>

			</form>
			</div>
			</div>
			</div>
		`;
	}
};
