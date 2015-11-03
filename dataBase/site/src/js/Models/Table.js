var $$ = $$ || {};

$$.Model.Table = class ModelTable {
	constructor (root = $('main'), options = {}) {
		"use strict";

		this.options = options;
		this.root = root === '' ? $('main') : root;
		this.model = {};

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
		this.form = `
			<form action="core/TableSave.php" method="POST" data-bind="submit: saveTable">
				<table></table>
		        <button type="submit" class="waves-effect waves-light btn">Сохранить</button>
				<button class="waves-effect waves-light btn right" data-bind="click: addRecord">Добавить</button>
			</form>`;

		this.template = `
			<div class="container">
				<div class="row">
					<div class="col s12">
						<h1>${this.options.tableName}</h1>
						${this.form}
					</div>
				</div>
			</div>`;
	}

	createTable (response) {
		"use strict";
		var names = '';
		var _this = this;
		_.each(response[0], (object, key) => {
			names += `<th data-${key}="${object.fieldType}">${key}</th>`;
		});

		names += `<th></th>`;

		this.root.find('table').append(`
							<thead>
								<tr>
									${names}
								</tr>
							</thead>
							`);
		var records = '';

		_.each(response[0], (object, key) => {
			var html = new $$.FieldType[object.fieldType]({
				bindKey: `${key}.value`,
				uniqueId: _.uniqueId(`${object.fieldType}_`)
			});

			records += `<td>${html.template}</td>`;
		});

		records += `<td><a class="waves-effect waves-light btn red"><i class="material-icons">delete</i></a></td>`;

		this.root.find('table').append(`
				 			<tbody data-bind="foreach: names">
				 				<tr>
									${records}
								</tr>
							</tbody>
							`);

		function SeatReservation (key, value) {
			var self = this;
			self[key] = value;
		}

		function ReservationsViewModel (response) {
			var self = this;

			self.names = ko.observableArray([]);

			response.forEach(record => {
				self.names.push(record);
			});

			self.saveTable = function () {
				$.ajax({
					type: 'POST',
					url: 'core/TableSave.php',
					data: {
						tableName: _this.options.tableName,
						data: ko.toJSON(self.names)
					},
					success: (response) => {
						response = $.parseJSON(response);

						if (response.success) {
							Materialize.toast('Таблица успешно обновлена', 2000) // 4000 is the duration of the toast
						}
					}
				});
			};

			self.addRecord = function () {
				console.log('addRecord');
				/*$.ajax({
				 type: 'POST',
				 url: 'core/TableSave.php',
				 data: {
				 tableName: 'catalog',
				 data: ko.toJSON(self.names)
				 },
				 success: (response) => {
				 console.log(response);
				 }
				 });*/
			};

			self.deleteRecord = function () {
				console.log('deleteRecord');
				/*$.ajax({
				 type: 'POST',
				 url: 'core/TableSave.php',
				 data: {
				 tableName: 'catalog',
				 data: ko.toJSON(self.names)
				 },
				 success: (response) => {
				 console.log(response);
				 }
				 });*/
			};
		}

		ko.applyBindings(new ReservationsViewModel(response));
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

				this.createTable(response);
			}
		});
	}
};
