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
			type: 'POST',
			url: 'core/Tables.php',
			success: (response) => {
				response = $.parseJSON(response);
				console.log(response);

				var list = $('<ul class="collection with-header"></ul>').appendTo(this.root.find('.s12'));

				response.forEach(table => {
					list.append(`<a href="tables/${table}" class="collection-item">${table}</a>`);
				});

				list.append(`<li class="collection-item">
					<div class="input-field col s4">
						<input placeholder="Название таблицы" id="create_table" type="text" class="validate">
					    <label for="create_table">Название таблицы</label>
					</div>
					<div class="input-field col s1 right">
						<a href="#" class="waves-effect waves-green btn js-create-table"><i class="material-icons">add</i></a>
					</div>
				</li>`);
			}
		});


		this.root.on('click', '.js-create-table', (event) => {
			event.preventDefault();

			var tableName = $('#create_table').val();

			if (tableName === '') {
				return;
			}

			$.ajax({
				type: 'POST',
				url: 'core/TableCreate.php',
				data: {
					tableName: tableName
				},
				success: (response) => {
					response = $.parseJSON(response);

					if (response.success) {
						Materialize.toast('Таблица успешно создана', 2000, 'green accent-4');
					} else {
						Materialize.toast('Ошибка при создании', 2000, 'red accent-4');
					}
				}
			});
		})
	}
};
