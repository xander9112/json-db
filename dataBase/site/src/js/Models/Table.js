var $$ = $$ || {};

$$.Model.Table = class ModelTable {
	constructor (root = $('main'), options) {
		"use strict";

		this.options = options;
		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";

		this.getTable();

		this.root.html(this.template);
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `<h1>${this.options.tableName}</h1>`;
	}

	getTable () {
		"use strict";

		$.ajax({
			type: 'POST',
			url: 'core/Table.php',
			success: (response) => {
				response = $.parseJSON(response);
				console.log(response);

				var list = $('<ul class="collection with-header"></ul>').appendTo(this.root);

				response.forEach(table => {
					list.append(`<a href="tables/${table}" class="collection-item">${table}</a>`);
				});
			}
		});
	}
}
