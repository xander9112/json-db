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


		this.root.on('submit', 'form', (event) => {
			event.preventDefault();
			var form = $(event.currentTarget);

			$.ajax({
				type: 'POST',
				url: 'core/TableSave.php',
				data: {
					form: form.serialize()
				}
			});
		});
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `<h1>${this.options.tableName}</h1>
			<div class="container">
				<div class="row">
					<div class="col s12">
						<form action="core/TableSave.php" method="POST">
							<table>
						        <thead>
						        </thead>
						        <tbody>
						        </tbody>
				            </table>
			            </form>
					</div>
				</div>
			</div>`;
	}

	getTable () {
		"use strict";

		$.ajax({
			type: 'POST',
			url: 'core/Table.php',
			data: {
				tableName: this.options.tableName
			},
			success: (response) => {
				response = $.parseJSON(response);

				_.each(response[0], (value, key) => {
					this.root.find('table thead').append(`<th data-field="${key}">${key}</th>`)
				});

				response.forEach(table => {
					var tr = $('<tr />').appendTo(this.root.find('table tbody'));

					_.each(table, (value, key) => {
						tr.append(`<td><div class="input-field"><input type="text" value="${value}" /></div></td>`);
					});

					//list.append(`<a href="tables/${table}" class="collection-item">${table}</a>`);
				});

				var tr = $('<tr />').appendTo(this.root.find('table tbody'));
				tr.append(`<td><div class="input-field"><input type="submit" value="Сохранить" /></div></td>`);
			}
		});
	}
}
