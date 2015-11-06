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

		faker.locale = "ru";

		this.fakerObject = {
			Boolean: faker.random.boolean,
			Integer: faker.random.number,
			String: faker.name.title,
			Text: faker.lorem.sentences, //(number) - количество предложений
			Media: faker.image.technics  //({min: 150,max: 200})
		};

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

			this.root.html(this.template);
			this.createTable(response.data);
			this.tableSettings();
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
					<div class="container" data-bind="foreach: settingsModel">
						<div class="row">
							<div class="col s12" data-bind="initSettings: $data"></div>
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
				<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
				    <a class="btn-floating btn-large red">
				      <i class="large material-icons">menu</i>
				    </a>
				    <ul>
				      <li>
				      <button type="submit" class="btn-floating red"><i class="material-icons">insert_chart</i></button>
				      </li>
				      <li><a class="btn-floating yellow darken-1" data-bind="click: addRandomRecord"><i class="material-icons">add</i></a></li>
				      <li><a class="btn-floating green" data-bind="click: addRecord"><i class="material-icons">add</i></a></li>
				    </ul>
				  </div>
			</form>`;

		this.template = `
			<div class="container">
				<div class="row">
					<div class="col s12">
						<h1>${this.options.tableName}</h1>
						<a class="btn-floating indigo darken-4 right" data-bind="click: openSettings"><i class="material-icons">settings</i></a>
						${this.form}
						${this.settings}
					</div>
				</div>
			</div>`;
	}

	createTable (response) {
		"use strict";
		var names = '';
		var _this = this;

		this.root.find('table').html(`
							<thead>
								<tr data-bind="insertKey: keys"></tr>
							</thead>
							<tbody data-bind="foreach: fields">
		 						<tr data-bind="tableTypes: $data"></tr>
							 </tbody>
							`);


		ko.bindingHandlers.tableTypes = {
			init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
				_.each(valueAccessor(), (object, key) => {
					var field = new $$.FieldType[object.fieldType]({
						bindKey: key,
						column: 's12'
					});

					$(element).append(`<td>${field.template}</td>`);
				});


				$(element).append(`<td><a href="#"><i class="material-icons" data-bind="click: $parent.deleteRecord">delete</i></a></td>`)
			},
			update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			}
		};

		ko.bindingHandlers.initSettings = {
			init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
				//console.log(element);
				//console.log(valueAccessor());

				var field = '';

				_.each(valueAccessor(), (object, key) => {
					if (key === 'chosenType' || key === 'types') {
						if (key === 'chosenType') {
						}
					} else {
						field += `
								<div class="row">
									<div class="input-field col s6">
										<input placeholder="Название поля" id="field_name_$index" data-bind="value: ${key}.fieldType" type="text" class="validate">
										<label class="active" for="field_name_$index">Название поля</label>
									</div>
									<div class="input-field col s6">
										<select data-bind="options: ${valueAccessor().types}, selectedOptions: ${valueAccessor().chosenType}"></select>
										<label>Тип поля</label>
									</div>
								</div>`;
					}
				});

				$(element).append(field);
			},
			update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			}
		};

		ko.bindingHandlers.insertKey = {
			init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
				var keys = valueAccessor();
				_.each(keys()[0], (object, key) => {
					$(element).append(`<th>${key}</th>`)

				});
			},
			update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			}
		};

		function ReservationsViewModel (response) {
			var self = this;

			this.fields = ko.observableArray(response);
			this.keys = ko.observableArray([this.fields()[0]]);
			this.types = ko.observableArray(_this.fieldsType);

			_.each(response[0], (object, key) => {
				_this.model[key] = {
					value: '',
					fieldType: object.fieldType
				};
			});

			this.settingsModel = ko.observableArray([_this.model]);
			this.settingsModel()[0].types = _this.fieldsType;
			this.settingsModel()[0].chosenType = ko.observableArray([_this.fieldsType[0]]);

			/*response.forEach(record => {
				this.fields.push(record);
			});*/

			self.openSettings = function () {
				$('#modal_1').openModal();
			};

			self.saveTable = function () {
				$.ajax({
					type: 'POST',
					url: 'core/TableSave.php',
					data: {
						tableName: _this.options.tableName,
						data: ko.toJSON(self.fields)
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

			self.addRandomRecord = function () {
				_.each(_this.model, (object, key) => {
					if (object.fieldType === 'Text') {
						object.value = _this.fakerObject[object.fieldType](5)
					} else {
						object.value = _this.fakerObject[object.fieldType]();
					}
				});

				this.fields.push(_this.model);
			};

			self.addRecord = function () {
				_.each(_this.model, (object, key) => {
					object.value = "";
				});

				this.fields.push(_this.model);
			};

			self.deleteRecord = function () {
				self.fields.remove(this);
			};


			this.updateTable = function () {

				/*var json = $.parseJSON(ko.toJSON(self.fields));

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
				 });*/
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

		ko.applyBindings(new ReservationsViewModel(response));
	}

	getTable () {
		"use strict";

		return $.ajax({
			type: 'POST',
			url: 'core/Table.php',
			data: {
				tableName: this.options.tableName
			}
		});
	}

	tableSettings () {
		"use strict";
	}
}
;
