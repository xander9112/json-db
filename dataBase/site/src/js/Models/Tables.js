var $$ = $$ || {};

$$.Model.Tables = class ModelTables {
	constructor (root = $('main')) {
		"use strict";

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";

		this.getTables();

		this.root.html(this.template);
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `
			<div class="container">
				<div class="row">
					<div class="col s12">
						<h1>Tables</h1>
					</div>
				</div>
			</div>`;
	}

	getTables () {
		"use strict";

		$.ajax({
			type:    'POST',
			url:     'core/Tables.php',
			success: (response) => {
				response = $.parseJSON(response);
				console.log(response);

				var list = $('<ul class="collection with-header"></ul>').appendTo(this.root.find('.s12'));

				response.forEach(table => {
					list.append(`<a href="tables/${table}" class="collection-item">${table}</a>`);
				});
			}
		});
	}
}
