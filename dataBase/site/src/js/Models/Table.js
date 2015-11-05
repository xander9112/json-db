var $$ = $$ || {};

$$.Model.Table = class ModelTable {
	constructor (root = $('main'), options = {}) {
		"use strict";

		this.options = options;
		this.root = root === '' ? $('main') : root;
		this.model = {};
		this.fieldsType = [];

		_.each($$.FieldType, (value, key) => {
			this.fieldsType.push(key)
		});

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";

		/**
		 * TODO: Связать всё в одну модель и настройки и вывод таблицы
		 */


		this.getTable().then((response) => {
			response = $.parseJSON(response);

			if (response.success) {
				this.root.html(this.template);
				this.createTable(response.data);
			} else {
				this.root.html(this.settings);
				$('#modal_1').openModal();
				this.tableSettings();
			}
		});
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.settings = `
		<div id="modal_1" class="modal">
			<form action="core/TableSave.php" method="POST" data-bind="submit: updateTable">
				<div class="modal-content">
				  <h4>Настройка таблицы</h4>
					<div class="row" data-bind="foreach: fields">
						<div class="input-field col s6">
						  <input placeholder="Название поля" id="field_name_$index" data-bind="value: name" type="text" class="validate">
						  <label for="field_name_$index">Название поля</label>
						</div>
						<div class="input-field col s6">
							<select data-bind="options: types, selectedOptions: chosenType"></select>
							<label>Тип поля</label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="waves-effect waves-green btn-flat">Сохранить</button>
					<a class="waves-effect waves-green btn-flat" data-bind="click: addField">Добавить поле</a>
				</div>
			</form>
	 	</div>`;

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
		this.modelKeys = [];

		_.each(response[0], (object, key) => {
			names += `<th data-${key}="${object.fieldType}">${key}</th>`;
			this.modelKeys.push({
				value: key
			});

			this.model[key] = {
				value: '',
				fieldType: object.fieldType
			};

		});

		var records = ``;
		_.each(response[0], (object, key) => {
			var id = _.uniqueId(`${object.fieldType}_`);

			if (_.isUndefined($$.FieldType[object.fieldType])) {
				console.log(object.fieldType);
			}

			var html = new $$.FieldType[object.fieldType]({
				bindKey: `${key}.value`,
				uniqueId: id
			});

			//records += `<td>${html.template}</td>`;

			records += `<td>
				<div class="input-field col s12">
		          <input placeholder="${object.fieldType}" type="text" data-bind="value: ${key}.value">
		        </div>
			</td>`;
		});

		records += `<td><a href="#"><i class="material-icons" data-bind="click: $parent.deleteRecord">delete</i></a></td>`;

		this.root.find('table').html(`
							<thead>
								<tr data-bind="foreach: keys">
									<th data-bind="text: value"></th>
								</tr>
							</thead>
							<tbody data-bind="foreach: names">
		 						<tr>
									${records}
								 </tr>
							 </tbody>
							`);

		function ReservationsViewModel (response) {
			var self = this;

			this.names = ko.observableArray([]);
			this.keys = ko.observableArray([]);

			_this.modelKeys.forEach(key => {
				this.keys.push(key);
			});

			response.forEach(record => {
				this.names.push(record);
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
							Materialize.toast('Таблица успешно обновлена', 2000, 'green accent-4');
						} else {
							Materialize.toast('Ошибка при сохранении', 2000, 'red accent-4');
						}
					}
				});
			};

			self.addRecord = function () {
				this.names.push(_this.model);
			};

			self.deleteRecord = function () {
				self.names.remove(this);
			};
		}

		ko.applyBindings(new ReservationsViewModel(response));
	}

	getTable () {
		"use strict";

		return $.ajax({
			type: 'POST',
			url: 'core/Table.php',
			data: {
				tableName: this.options.tableName
			},
			success: (response) => {

			}
		});
	}

	tableSettings () {
		"use strict";
		var _this = this;

		function ReservationsViewModel (fieldsType) {
			var self = this;

			this.fields = ko.observableArray([]);
			this.updateTable = function () {

				var json = $.parseJSON(ko.toJSON(self.fields));

				json.forEach(field => {
					_this.model[field.name] = {
						value: '',
						fieldType: field.chosenType[0]
					};
				});

				$.ajax({
					type: 'POST',
					url: 'core/TableSave.php',
					data: {
						tableName: _this.options.tableName,
						data: ko.toJSON([_this.model])
					},
					success: (response) => {
						response = $.parseJSON(response);

						if (response.success) {
							Materialize.toast('Таблица успешно создана', 2000, 'green accent-4');

							setTimeout(() => {
								location.reload()
							}, 200);
						} else {
							Materialize.toast('Ошибка при создании', 2000, 'red accent-4');
						}
					}
				});
			};

			this.addField = function () {
				this.fields.push({
					name: '',
					types: ko.observableArray(fieldsType),
					chosenType: ko.observableArray(['NULL'])
				});

				$('select').material_select();
			};

			this.removeField = function () {
				self.names.remove(this);
			};
		}

		ko.applyBindings(new ReservationsViewModel(this.fieldsType));
	}
};
