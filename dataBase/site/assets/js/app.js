"use strict";

$$ = $$ || {};

$$.Model = $$.Model || {};
$$.Component = $$.Component || {};
$$.FieldType = $$.FieldType || {};;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.Index = (function () {
	function ModelIndex() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];

		_classCallCheck(this, ModelIndex);

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	_createClass(ModelIndex, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";
			this.root.html(this.template);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy Index');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '<h1>Index</h1>';
		}
	}]);

	return ModelIndex;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.NotFound = (function () {
	function ModelNotFound() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];

		_classCallCheck(this, ModelNotFound);

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	_createClass(ModelNotFound, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";
			this.root.html(this.template);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy NotFound');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '<h1>NotFound</h1>';
		}
	}]);

	return ModelNotFound;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.Table = (function () {
	function ModelTable() {
		"use strict";

		var _this2 = this;

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, ModelTable);

		this.options = options;
		this.root = root === '' ? $('main') : root;
		this.model = {};
		this.fieldsType = [];

		_.each($$.FieldType, function (value, key) {
			_this2.fieldsType.push(key);
		});

		this._template();
		this.initialize();
	}

	_createClass(ModelTable, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";

			/**
    * TODO: Связать всё в одну модель и настройки и вывод таблицы
    */

			var _this3 = this;

			this.getTable().then(function (response) {
				response = $.parseJSON(response);

				if (response.success) {
					_this3.root.html(_this3.template);
					_this3.createTable(response.data);
				} else {
					_this3.root.html(_this3.settings);
					$('#modal_1').openModal();
					_this3.tableSettings();
				}
			});
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy Index');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.settings = '\n\t\t<div id="modal_1" class="modal">\n\t\t\t<form action="core/TableSave.php" method="POST" data-bind="submit: updateTable">\n\t\t\t\t<div class="modal-content">\n\t\t\t\t  <h4>Настройка таблицы</h4>\n\t\t\t\t\t<div class="row" data-bind="foreach: fields">\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t  <input placeholder="Название поля" id="field_name_$index" data-bind="value: name" type="text" class="validate">\n\t\t\t\t\t\t  <label for="field_name_$index">Название поля</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t<select data-bind="options: types, selectedOptions: chosenType"></select>\n\t\t\t\t\t\t\t<label>Тип поля</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button type="submit" class="waves-effect waves-green btn-flat">Сохранить</button>\n\t\t\t\t\t<a class="waves-effect waves-green btn-flat" data-bind="click: addField">Добавить поле</a>\n\t\t\t\t</div>\n\t\t\t</form>\n\t \t</div>';

			this.form = '\n\t\t\t<form action="core/TableSave.php" method="POST" data-bind="submit: saveTable">\n\t\t\t\t<table></table>\n\t\t        <button type="submit" class="waves-effect waves-light btn">Сохранить</button>\n\t\t\t\t<button class="waves-effect waves-light btn right" data-bind="click: addRecord">Добавить</button>\n\t\t\t</form>';

			this.template = '\n\t\t\t<div class="container">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col s12">\n\t\t\t\t\t\t<h1>' + this.options.tableName + '</h1>\n\t\t\t\t\t\t' + this.form + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
		}
	}, {
		key: 'createTable',
		value: function createTable(response) {
			"use strict";

			var _this4 = this;

			var names = '';
			var _this = this;
			this.modelKeys = [];
			_.each(response[0], function (object, key) {
				names += '<th data-' + key + '="' + object.fieldType + '">' + key + '</th>';
				_this4.modelKeys.push(key);

				_this4.model[key] = {
					value: '',
					fieldType: ''
				};
			});

			var records = '';

			_.each(response[0], function (object, key) {
				var id = _.uniqueId(object.fieldType + '_');

				var html = new $$.FieldType[object.fieldType]({
					bindKey: key + '.value',
					uniqueId: id
				});

				records += '<td>' + html.template + '</td>';
			});

			records += '<td><a class="waves-effect waves-light btn red" data-bind="click: $parent.deleteRecord"><i class="material-icons">delete</i></a></td>';

			this.root.find('table').html('\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t' + names + '\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody data-bind="foreach: names">\n\t\t \t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t \t' + records + '\n\t\t\t\t\t\t\t\t </tr>\n\t\t\t\t\t\t\t </tbody>\n\t\t\t\t\t\t\t');

			function ReservationsViewModel(response) {
				var _this5 = this;

				var self = this;

				this.names = ko.observableArray([]);
				this.keys = ko.observableArray([]);

				self.keys.push(_this.modelKeys);

				response.forEach(function (record) {
					_this5.names.push(record);
				});

				self.saveTable = function () {
					$.ajax({
						type: 'POST',
						url: 'core/TableSave.php',
						data: {
							tableName: _this.options.tableName,
							data: ko.toJSON(self.names)
						},
						success: function success(response) {
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
	}, {
		key: 'getTable',
		value: function getTable() {
			"use strict";

			return $.ajax({
				type: 'POST',
				url: 'core/Table.php',
				data: {
					tableName: this.options.tableName
				},
				success: function success(response) {}
			});
		}
	}, {
		key: 'tableSettings',
		value: function tableSettings() {
			"use strict";
			var _this = this;

			function ReservationsViewModel(fieldsType) {
				var self = this;

				this.fields = ko.observableArray([]);
				this.updateTable = function () {

					var json = $.parseJSON(ko.toJSON(self.fields));

					json.forEach(function (field) {

						_this.model[field.name] = {
							value: '',
							fieldType: field.chosenType[0]
						};
					});

					return;
					$.ajax({
						type: 'POST',
						url: 'core/TableSave.php',
						data: {
							tableName: _this.options.tableName,
							data: ko.toJSON(self.names)
						},
						success: function success(response) {
							response = $.parseJSON(response);

							if (response.success) {
								Materialize.toast('Таблица успешно обновлена', 2000, 'green accent-4');
							} else {
								Materialize.toast('Ошибка при сохранении', 2000, 'red accent-4');
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
	}]);

	return ModelTable;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.Tables = (function () {
	function ModelTables() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];

		_classCallCheck(this, ModelTables);

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	_createClass(ModelTables, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";

			this.getTables();

			this.root.html(this.template);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy Index');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '\n\t\t\t<div class="container">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col s12">\n\t\t\t\t\t\t<h1>Tables</h1>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
		}
	}, {
		key: 'getTables',
		value: function getTables() {
			"use strict";

			var _this = this;

			$.ajax({
				type: 'POST',
				url: 'core/Tables.php',
				success: function success(response) {
					response = $.parseJSON(response);
					console.log(response);

					var list = $('<ul class="collection with-header"></ul>').appendTo(_this.root.find('.s12'));

					response.forEach(function (table) {
						list.append('<a href="tables/' + table + '" class="collection-item">' + table + '</a>');
					});
				}
			});
		}
	}]);

	return ModelTables;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.FieldType.Boolean = (function () {
	function FieldTypeBoolean() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FieldTypeBoolean);

		this.options = {
			column: 's12',
			label: 'Integer',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);
		this._template();
	}

	_createClass(FieldTypeBoolean, [{
		key: '_template',
		value: function _template() {
			"use strict";

			this.template = '\n\t\t\t<div class="switch">\n\t\t\t    <label for="' + this.options.uniqueId + '">\n\t\t\t      Off\n\t\t\t      <input type="checkbox" id="' + this.options.uniqueId + '" data-bind="checked: ' + this.options.bindKey + '">\n\t\t\t      <span class="lever"></span>\n\t\t\t      On\n\t\t\t    </label>\n\t\t    </div>';
		}
	}]);

	return FieldTypeBoolean;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.FieldType.Integer = (function () {
	function FieldTypeInteger() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FieldTypeInteger);

		this.options = {
			column: 's12',
			label: 'Integer',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_createClass(FieldTypeInteger, [{
		key: '_template',
		value: function _template() {
			"use strict";

			this.template = '\n\t\t\t<div class="input-field col ' + this.options.column + '">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
		}
	}]);

	return FieldTypeInteger;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.FieldType.Media = (function () {
	function FieldTypeMedia() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FieldTypeMedia);

		this.options = {
			column: 's12',
			label: 'Media',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_createClass(FieldTypeMedia, [{
		key: '_template',
		value: function _template() {
			"use strict";

			var id = _.uniqueId('input_');

			this.template = '\n\t\t\t<div class="input-field col ' + this.options.column + '">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
		}
	}]);

	return FieldTypeMedia;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.FieldType.String = (function () {
	function FieldTypeString() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FieldTypeString);

		this.options = {
			column: 's12',
			label: 'String',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_createClass(FieldTypeString, [{
		key: '_template',
		value: function _template() {
			"use strict";

			var id = _.uniqueId('input_');

			this.template = '\n\t\t\t<div class="input-field col ' + this.options.column + '">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
		}
	}]);

	return FieldTypeString;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.FieldType.Text = (function () {
	function FieldTypeText() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, FieldTypeText);

		this.options = {
			column: 's12',
			label: 'Textarea',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_createClass(FieldTypeText, [{
		key: '_template',
		value: function _template() {
			"use strict";

			var id = _.uniqueId('textarea_');

			this.template = '\n\t\t\t<div class="input-field col ' + this.options.column + '">\n\t          <textarea id="' + this.options.uniqueId + '" class="materialize-textarea" data-bind="value: ' + this.options.bindKey + ', uniqueName: true"></textarea>\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';

			/*$(`#${id}`).on('change', function () {
    $(this).trigger('autoresize');
    });*/
		}
	}]);

	return FieldTypeText;
})();;
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$$.Component.Menu = (function () {
	function ComponentMenu() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, ComponentMenu);

		var defaultOptions = {};

		this.root = root;
		this.options = _.merge(options || {}, defaultOptions, _.defaults);
		this.current = '';

		this._template();
		this._cacheNodes();
		this.initialize();
	}

	_createClass(ComponentMenu, [{
		key: "initialize",
		value: function initialize() {
			"use strict";

			this.root.append(this.template);
		}
	}, {
		key: "_template",
		value: function _template() {
			"use strict";

			this.template = $("\n\t\t\t<nav>\n\t\t        <div class=\"nav-wrapper\">\n\t\t\t      <a href=\"/dataBase\" class=\"brand-logo\">DataBase</a>\n\t\t\t      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t\t\t        <li><a href=\"tables\">Tables</a></li>\n\t\t\t      </ul>\n\t\t\t    </div>\n\t\t    </nav>");
		}
	}, {
		key: "updateMenu",
		value: function updateMenu(currentItem) {
			this.nodes.items.each(function (index, element) {
				$(element).removeClass('selected active');
			});

			if (!_.isUndefined(currentItem)) {
				currentItem.addClass('active');
			}
		}
	}, {
		key: "findUrl",
		value: function findUrl(url) {
			var currentItem = undefined;

			if (url !== '/') {
				if (url.charAt(url.length - 1) === '/') {
					url = url.substring(0, url.length - 1);
				}
			}

			this.nodes.items.each(function (index, element) {
				var href = $(element).find('a').attr('href');

				if (href === url) {
					currentItem = $(element);
				}
			});

			return currentItem;
		}
	}, {
		key: "_cacheNodes",
		value: function _cacheNodes() {
			this.nodes = {
				nav: this.template.find('ul'),
				items: this.template.find('li')
			};
		}
	}, {
		key: "currentItem",
		set: function set(url) {
			"use strict";

			this.updateMenu(this.findUrl(url));
		}
	}, {
		key: "userInfo",
		set: function set(template) {
			"use strict";

			this.nodes.nav.append(template);
		}
	}]);

	return ComponentMenu;
})();;
"use strict";;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.Component.Route = (function () {
	function Route() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Route);

		this.root = root;
		this.currentModel = null;

		this.menu = options.menu;

		this.initialize();
	}

	_createClass(Route, [{
		key: 'initialize',
		value: function initialize() {
			this.currentUrl = window.location.pathname;
			this._registerRoutes();
		}
	}, {
		key: '_registerRoutes',
		value: function _registerRoutes() {
			var _this = this;

			page.base('/dataBase');

			page('/', function (options) {
				"use strict";
				options.pathname = '/index';
				_this._initModel(options);
			});

			page('/tables', function (options) {
				"use strict";
				_this._initModel(options);
			});

			page('/tables/:tableName', function (options) {
				"use strict";
				_this._initModel(options);
			});

			page('*', function (options) {
				"use strict";

				options.pathname = '/notFound';
				_this._initModel(options);
			});

			page({
				hashbang: true
			});
		}
	}, {
		key: '_initModel',
		value: function _initModel(options) {
			"use strict";

			var pathname = options.path.split('/')[1];

			var modelName = pathname.charAt(0).toUpperCase() + pathname.substr(1);

			if (_.size(options.params)) {
				modelName = modelName.slice(0, -1);
			}

			if (this.currentModel) {
				this.currentModel.destroy();
			}

			if (!_.isUndefined($$.Model[modelName])) {
				this.currentModel = new $$.Model[modelName]('', options.params);
				this.menu.currentItem = options.pathname;

				return;
			}

			//page.redirect('/');
		}
	}]);

	return Route;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['ContentPage'] = (function () {
    function ContentPage() {
        var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, ContentPage);

        this.root = root;

        this._cacheNodes();
        this._bindEvents();

        this.initialize();
    }

    _createClass(ContentPage, [{
        key: 'destroy',
        value: function destroy() {
            this.root.off();
            delete this.root;
            delete this.nodes;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            //console.log('ContentPage');
        }
    }, {
        key: '_cacheNodes',
        value: function _cacheNodes() {
            this.nodes = {};
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {}
    }]);

    return ContentPage;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['Default'] = (function () {
	function Default() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Default);

		this.root = root;

		this._cacheNodes();
		this._bindEvents();

		this.initialize();
	}

	_createClass(Default, [{
		key: 'destroy',
		value: function destroy() {
			delete this.root;
			delete this.nodes;
		}
	}, {
		key: 'initialize',
		value: function initialize() {
			//console.log('Default');
		}
	}, {
		key: '_cacheNodes',
		value: function _cacheNodes() {
			this.nodes = {};
		}
	}, {
		key: '_bindEvents',
		value: function _bindEvents() {}
	}]);

	return Default;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['MainPage'] = (function () {
    function MainPage() {
        var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, MainPage);

        this.root = root;

        this._cacheNodes();
        this._bindEvents();

        this.initialize();
    }

    _createClass(MainPage, [{
        key: 'destroy',
        value: function destroy() {
            this.root.off();
            delete this.root;
            delete this.nodes;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            //console.log('MainPage');
        }
    }, {
        key: '_cacheNodes',
        value: function _cacheNodes() {
            this.nodes = {};
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {}
    }]);

    return MainPage;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

/**
 * Создать типы полей
 *
 * integer
 * string
 * boolean
 * text
 * image
 *
 * @type {Application}
 */

$$.Application = (function () {
	function Application() {
		_classCallCheck(this, Application);

		this.currentPage = undefined;

		this.root = $('body');

		this._cacheNodes();
		this._createComponents();

		this._initialize();
	}

	_createClass(Application, [{
		key: '_cacheNodes',
		value: function _cacheNodes() {
			this.nodes = {};
		}

		/**
   * Создает необходимые компоненты.
   *
   * @private
   */
	}, {
		key: '_createComponents',
		value: function _createComponents() {
			this.siteMenu = new $$.Component.Menu($('.js-application > header'));

			this.route = new $$.Component.Route($('body'), {
				menu: this.siteMenu
			});
		}
	}, {
		key: '_initialize',
		value: function _initialize() {}
	}]);

	return Application;
})();

$(function () {
	$$.window = $(window);
	$$.windowWidth = $$.window.width();
	$$.windowHeight = $$.window.height();

	$$.application = new $$.Application();

	$$.window.on('resize', function () {
		$$.windowWidth = $$.window.width();
		$$.windowHeight = $$.window.height();
	});
});
//# sourceMappingURL=app.js.map
