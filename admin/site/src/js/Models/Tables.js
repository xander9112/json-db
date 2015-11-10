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
		console.log('destroy Tables');

		this.root.find('[data-bind]').each(function () {
			$(this).unbind();
			ko.removeNode($(this)[0]);
		});

		this.root.html('');

		delete this.root;
	}

	_template () {
		"use strict";
		this.template = `
			<div class="ui grid container segment">
				<div class="column row">
					<div class="column">
						<h1 class="ui header">Tables</h1>
					</div>
				</div>
				<div class="column row two">
				</div>
			</div>
			`;
	}

	getTables () {
		"use strict";

		$.ajax({
			type: 'POST',
			url: 'core/Tables.php',
			success: (response) => {
				response = $.parseJSON(response);

				var list = $('<div class="column">').appendTo(this.root.find('.row.two'));

				response.forEach(table => {
					list.append(`
					<div class="ui segment">
						<a href="tables/${table}"><i class="icon table"></i> ${table}</a>
					</div>
					`);
				});

				list.append(`

				<div class="item ui form grid ui segment">
					<div class="field four wide column">
						<input placeholder="Название таблицы" id="create_table" type="text" class="validate">
					</div>
					<div class="field four wide column right floated">
						<div class="ui animated fade button green js-create-table" tabindex="0">
							<div class="visible content">Создать</div>
							<div class="hidden content">
								<i class="icon add Circle"></i>
							</div>
						</div>
					</div>
				</div>`);
			}
		});


		this.root.on('click', '.js-create-table', (event) => {
			event.preventDefault();

			var tableName = $('#create_table').val();

			if (tableName === '') {
				$('body').trigger('showMessage', {
					type: 'error',
					message: 'Название таблицы не должно быть пустым'
				});
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
						$('body').trigger('showMessage', {
							type: 'success',
							message: 'Таблица успешно создана'
						});

						$('.item.ui.form.grid').before(`<a href="tables/${tableName}" class="item">${tableName}</a>`);

					} else {
						$('body').trigger('showMessage', {
							type: 'error',
							message: 'Ошибка при создании'
						});
					}
				}
			});
		})
	}
};
