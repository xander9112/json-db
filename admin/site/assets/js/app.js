/**
 * Base emitter class.
 *
 * Dependencies: underscore.js.
 *
 * Example:
 *
 *   var e = new $$.Emitter();
 *
 *   e.on('event1', function() {});
 *   e.on('event2.namespace1', function() {});
 *   e.on('event2.namespace2', function() {});
 *   e.on('event3a.namespace3', function() {});
 *   e.on('event3b.namespace3', function() {});
 *   e.on('event3c.namespace3', function() {});
 *   e.emit('event1', { Some event data here... });
 *   e.emit('event2.namespace1');
 *   e.off('event1');
 *   e.off('event2.namespace1');
 *   e.off('event2.namespace2');
 *   e.off('.namespace3');
 *
 * Multiple event data arguments are supported.
 *
 *   e.on('event10', function(a, b, c) { ... });
 *   e.emit('event10', 2, 'qwe', { x: 3, y: 'zxc' });
 *
 * Also #trigger() is an alias for #emit().
 *
 * NOTE: The namespace name "*" has a special meaning in $$.Emitter.ItemContainer.
 */

'use strict';

var $$ = $$ || {};

/**
 * @constructor
 */
$$.Emitter = function () {
	this._itemContainer = new $$.Emitter.ItemContainer();
};

$$.Emitter.prototype = {
	/**
  * @param {String} eventId
  * @return {Boolean}
  * @private
  */
	_isEventIdJustANamespace: function _isEventIdJustANamespace(eventId) {
		eventId = String(eventId);

		return !!eventId.match(/^\.[a-z\d]+$/i);
	},

	/**
  * @param {String} eventId
  * @return {Array} [eventName, namespace]
  * @throws {Error}
  * @private
  */
	_parseAndValidateEventId: function _parseAndValidateEventId(eventId) {
		eventId = String(eventId);

		// Either a single event name.

		var match = eventId.match(/^[a-z\d]+$/i);

		if (match) {
			return [match[0], null];
		}

		// Or an event name + a namespace name.

		match = eventId.match(/^([a-z\d]+)\.([a-z\d]+)$/i);

		if (!match) {
			throw Error('Full event names should not be empty, should consist of letters and numbers' + ' and may contain only single dot in the middle.');
		}

		return [match[1], match[2]];
	},

	/**
  * @param {String} eventId
  */
	emit: function emit(eventId /*, eventData1, eventData2, ... */) {
		eventId = String(eventId);

		var parts = this._parseAndValidateEventId(eventId);
		var items = this._itemContainer.getItems(parts[0], parts[1]);
		var args = Array.prototype.slice.call(arguments, 1);

		_.each(items, function (item) {
			item.callback.apply(null, args);
		});
	},

	/**
  * @param {String} eventId
  * @param {Function} callback
  */
	on: function on(eventId, callback) {
		if (callback == null) {
			throw Error('An event callback should be provided.');
		}

		if (!_.isFunction(callback)) {
			throw Error('An event callback should be a function.');
		}

		var parts = this._parseAndValidateEventId(eventId);

		this._itemContainer.add(parts[0], parts[1], callback);
	},

	off: function off(eventId) {
		eventId = String(eventId);

		if (this._isEventNameWithNamespaceJustANamespace(eventId)) {
			// Just a namespace.
			this._itemContainer.remove(null, eventId.substr(1));
		} else {
			// Event name and possible namespace.
			var parts = this._parseAndValidateEventId(eventId);
			this._itemContainer.remove(parts[0], parts[1]);
		}
	}
};

$$.Emitter.prototype.trigger = $$.Emitter.prototype.emit;

$$.Emitter.ItemContainer = function () {
	/* Items:
  *
  * {
  *   eventName1: {
  *     namespace1: [ { callback, *... }, ... ],
  *     namespace2: [ ... ]
  *     ...
  *   },
  *
  *   eventName2: { ... }
  *   ...
  * }
  */
	this._items = {};
};

$$.Emitter.ItemContainer.prototype = {
	/**
  * @param {String} eventName
  * @param {String}|null namespace
  * @param {Function} callback
  */
	add: function add(eventName, namespace, callback) {
		eventName = String(eventName);
		namespace = namespace == null ? '*' : String(namespace);

		if (!this._items.hasOwnProperty(eventName)) {
			this._items[eventName] = {};
		}

		if (!this._items[eventName].hasOwnProperty(namespace)) {
			this._items[eventName][namespace] = [];
		}

		this._items[eventName][namespace].push({
			callback: callback
		});
	},

	/**
  * @param {String} eventName
  * @param {String}|null namespace
  * @return {Array}
  */
	getItems: function getItems(eventName, namespace) {
		eventName = String(eventName);

		if (!this._items.hasOwnProperty(eventName)) {
			return [];
		}

		if (namespace == null) {
			// Return items for all namespaces of the event.

			var arraysOfItems = _.values(this._items[eventName]);

			return _.union.apply(null, arraysOfItems);
		}

		namespace = String(namespace);

		if (!this._items[eventName].hasOwnProperty(namespace)) {
			return [];
		}

		return this._items[eventName][namespace];
	},

	/**
  * Removes by event name, by namespace or by both.
  *
  * @param {String}|null eventName
  * @param {String}|null namespace
  */
	remove: function remove(eventName, namespace) {
		if (eventName == null && namespace == null) {
			throw Error('Only one of the arguments can be omitted.');
		}

		if (namespace == null) {
			this.removeByEventName(eventName);
		} else if (eventName == null) {
			this.removeByNamespace(namespace);
		} else {
			// Both eventName and namespace are not null.

			eventName = String(eventName);
			namespace = String(namespace);

			if (!this._items.hasOwnProperty(eventName) || !this._items[eventName].hasOwnProperty(namespace)) {
				return;
			}

			delete this._items[eventName][namespace];
		}
	},

	/**
  * @param {String} eventName
  */
	removeByEventName: function removeByEventName(eventName) {
		eventName = String(eventName);

		if (!this._items.hasOwnProperty(eventName)) {
			return;
		}

		delete this._items[eventName];
	},

	/**
  * @param {String} namespace
  */
	removeByNamespace: function removeByNamespace(namespace) {
		namespace = String(namespace);

		_.each(this._items, function (itemsByNamespace) {
			if (!itemsByNamespace.hasOwnProperty(namespace)) {
				return;
			}

			delete itemsByNamespace[namespace];
		});
	}
};;
"use strict";

var $$ = $$ || {};

$$.Simulation = $$.Simulation || {};

/**
 * Не нужно использовать этот класс напрямую. Нужно использовать $$.Simulation.Spring.
 */
$$.Simulation.SpringSimulator = function () {
	var self = this;

	this._springs = [];
	this._lastTime = +new Date();

	setInterval(function () {
		var now = +new Date();
		var time = (now - self._lastTime) / 1000;
		var dt = 0.01;

		if (time > 0.2) {
			// Если жс работает слишком медленно, замедлить симуляцию.
			time = 0.2;
		}

		var i,
		    ni = self._springs.length,
		    spring,
		    dampings = [],
		    distance,
		    newDistance,
		    force,
		    newVelocity,
		    targetVelocityLimit,
		    velocityLimit,
		    positionLimits;

		for (i = 0; i < ni; i++) {
			spring = self._springs[i];
			dampings.push(2 * Math.sqrt(spring._rigidness) * spring._damping);
		}

		while (time > 0.000001) {
			for (i = 0; i < ni; i++) {
				spring = self._springs[i];

				if (spring._frozen) {
					continue;
				}

				distance = spring._target - spring._position;

				force = (distance >= 0 ? 1 : -1) * Math.pow(Math.abs(distance), spring._forcePower) * spring._rigidness - (spring._velocity >= 0 ? 1 : -1) * Math.abs(spring._velocity) * dampings[i];

				newVelocity = spring._velocity + force * dt;

				velocityLimit = spring._velocityLimit;
				targetVelocityLimit = spring._targetVelocityLimit;

				if (targetVelocityLimit !== null) {
					targetVelocityLimit *= Math.pow(spring._targetVelocityLimitPower, Math.abs(distance));

					if (velocityLimit === null || targetVelocityLimit < velocityLimit) {
						velocityLimit = targetVelocityLimit;
					}
				}

				if (velocityLimit !== null && Math.abs(newVelocity) > velocityLimit) {
					newVelocity = (newVelocity >= 0 ? 1 : -1) * velocityLimit;
				}

				spring._position += newVelocity * dt;
				spring._velocity = newVelocity;

				if (spring._stopAtTarget) {
					newDistance = spring._target - spring._position;

					if (distance > 0 && newDistance <= 0 || distance < 0 && newDistance >= 0) {
						spring._position = spring._target;
						spring._velocity = 0;
						continue;
					}
				}

				if (spring._positionLimits !== null) {
					positionLimits = spring._positionLimits;

					if (spring._position < positionLimits[0]) {
						spring._position = positionLimits[0];
						spring._velocity = 0;
					} else if (spring._position > positionLimits[1]) {
						spring._position = positionLimits[1];
						spring._velocity = 0;
					}
				}
			}

			time -= dt;
		}

		self._lastTime = now;

		for (i = 0; i < ni; i++) {
			spring = self._springs[i];

			if (spring == null) {
				continue;
			}

			if (!spring._frozen && spring._step) {
				spring._step.call();
			}
		}
	}, 20);
};

$$.Simulation.SpringSimulator.prototype = {
	addSpring: function addSpring(spring) {
		this._springs.push(spring);
	},

	deleteSpring: function deleteSpring(spring) {
		var i = _.indexOf(this._springs, spring);

		if (i != -1) {
			this._springs.splice(i, 1);
		}
	}
};

// Создать один "глобальный" экземпляр.

$$.Simulation.__springSimulator = new $$.Simulation.SpringSimulator();;
'use strict';

var $$ = $$ || {};

$$.Simulation = $$.Simulation || {};

/**
 * @constructor
 */
$$.Simulation.Spring = function (options) {
	options = _.extend({
		frozen: false,
		position: 0,
		positionLimits: null,
		target: 0,
		targetLimits: null,
		velocity: 0,
		velocityLimit: null,
		rigidness: 1,
		damping: 1,
		forcePower: 1,
		targetVelocityLimit: null,
		targetVelocityLimitPower: 1.25,
		stopAtTarget: false,
		step: null
	}, options || {});

	this._frozen = options.frozen;
	this._position = options.position;
	this._positionLimits = options.positionLimits;
	this._target = options.target;
	this._targetLimits = options.targetLimits;
	this._velocity = options.velocity;
	this._velocityLimit = options.velocityLimit;
	this._rigidness = options.rigidness;
	this._damping = options.damping;
	this._forcePower = options.forcePower;
	this._targetVelocityLimit = options.targetVelocityLimit;
	this._targetVelocityLimitPower = options.targetVelocityLimitPower;
	this._stopAtTarget = options.stopAtTarget;
	this._step = null;

	if (options.step) {
		this.step(options.step);
	}

	this._applyTargetLimits();

	$$.Simulation.__springSimulator.addSpring(this);
};

$$.Simulation.Spring.prototype = {
	_applyTargetLimits: function _applyTargetLimits() {
		if (this._targetLimits === null) {
			return;
		}

		if (this._target < this._targetLimits[0]) {
			this._target = this._targetLimits[0];
		} else if (this._target > this._targetLimits[1]) {
			this._target = this._targetLimits[1];
		}
	},

	destroy: function destroy() {
		this._step = null;
		$$.Simulation.__springSimulator.deleteSpring(this);
	},

	moveTarget: function moveTarget(delta) {
		this._target += delta;
		this._applyTargetLimits();
	},

	step: function step(callback) {
		this._step = _.bind(callback, this);
	},

	target: function target(value) {
		if (arguments.length == 0) {
			return this._target;
		}

		this._target = value;
		this._applyTargetLimits();
	},

	targetLimits: function targetLimits(value) {
		if (arguments.length == 0) {
			return this._targetLimits;
		}

		this._targetLimits = value;
		this._applyTargetLimits();
	}
};

// Создать методы-аксессоры.

_.each(['frozen', 'position', 'positionLimits', 'velocity', 'velocityLimit', 'rigidness', 'damping', 'forcePower',, 'targetVelocityLimit', 'targetVelocityLimitPower', 'stopAtTarget'], function (k) {
	$$.Simulation.Spring.prototype[k] = function (value) {
		if (arguments.length == 0) {
			return this['_' + k];
		}

		this['_' + k] = value;
	};
});;
'use strict';

var $$ = $$ || {};

$$.extend = function (Child, Parent) {
	var F = function F() {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
};

$$.trim = function (str, charlist) {
	charlist = !charlist ? ' \\s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
};

$$.parseUrlParams = function (url) {
	var url = url || location.href;
	var searchParam = {};
	var regExpParams = /\?{1}.+/;

	if (regExpParams.test(url)) {
		url = url.replace(regExpParams, '');

		var urlParams = location.search.replace('?', '');
		urlParams = urlParams.split('&');

		_.each(urlParams, function (item, index, list) {
			var param = item.split('=');
			searchParam[param[0]] = param[1];
		});
	}
	return searchParam;
};

$$.clamp = function (value, min, max) {
	return Math.min(max, Math.max(min, value));
};

$$.timeLine = function (startTime, factor, finishTime) {
	function getDecimal(num) {
		return +(num % 1).toFixed(6);
	}

	var time = [];
	var j = 0;
	for (var i = startTime; i <= finishTime; i += factor) {

		if (i >= 24) {
			time.push(Math.floor(j) + ':' + getDecimal(j) * 6 + '0');
			j += 0.5;
		} else {
			time.push(Math.floor(i) + ':' + getDecimal(i) * 6 + '0');
		}
	}
	return time;
};

$$.hoursToMinutes = function (from, to) {
	var minutesInHours = (to.replace(':', '').substr(0, 2) - from.replace(':', '').substr(0, 2)) * 60;
	var minutes = to.replace(':', '').substr(2) - from.replace(':', '').substr(2);
	return minutes + minutesInHours;
};;
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

			function TestViewModel() {
				var self = this;

				this.names = ko.observableArray([{
					about: {
						value: "Товар 2",
						fieldType: "Text"
					},
					active: {
						value: false,
						fieldType: "Boolean"
					},
					id: {
						value: "1", fieldType: "Integer"
					},
					imageUrl: {
						value: "/data/images/card2.jpg",
						fieldType: "Media"
					},
					title: {
						value: "Крутой товар 2",
						fieldType: "String"
					}
				}, {
					about: {
						value: "Товар 2",
						fieldType: "Text"
					},
					active: {
						value: true,
						fieldType: "Boolean"
					},
					id: {
						value: "1", fieldType: "Integer"
					},
					imageUrl: {
						value: "/data/images/card2.jpg",
						fieldType: "Media"
					},
					title: {
						value: "Крутой товар 2",
						fieldType: "String"
					}
				}, {
					about: {
						value: "Товар 2",
						fieldType: "Text"
					},
					active: {
						value: false,
						fieldType: "Boolean"
					},
					id: {
						value: "1", fieldType: "Integer"
					},
					imageUrl: {
						value: "/data/images/card2.jpg",
						fieldType: "Media"
					},
					title: {
						value: "Крутой товар 2",
						fieldType: "String"
					}
				}]);

				this.test = function () {
					console.log(this.names());
				};
			}

			ko.applyBindings(new TestViewModel());
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
			this.template = '<h1>Index</h1>\n\t\t<div data-bind="foreach: names">\n\t\t\t<div class="row" data-bind="tableTypes: $data"></div>\n\t\t</div>\n\t\t<button data-bind="click: test">test</button>\n\t\t';
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

		faker.locale = "ru";

		this.fakerObject = {
			Boolean: faker.random.boolean,
			Integer: faker.random.number,
			String: faker.name.title,
			Text: faker.lorem.sentences, //(number) - количество предложений
			Media: faker.image.technics //({min: 150,max: 200})
		};

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

				_this3.root.html(_this3.template);
				_this3.createTable(response.data);
				_this3.tableSettings();
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

			this.settings = '\n\t\t<div id="modal_1" class="modal">\n\t\t\t<form action="core/TableSave.php" method="POST" data-bind="submit: updateTable">\n\t\t\t\t<div class="modal-content">\n\t\t\t\t    <h4>Настройка таблицы</h4>\n\t\t\t\t\t<div class="container" data-bind="foreach: settingsModel">\n\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t<div class="col s12" data-bind="initSettings: $data"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button type="submit" class="waves-effect waves-green btn-flat">Сохранить</button>\n\t\t\t\t\t<a class="waves-effect waves-green btn-flat" data-bind="click: addField">Добавить поле</a>\n\t\t\t\t</div>\n\t\t\t</form>\n\t \t</div>';

			this.form = '\n\t\t\t<form action="core/TableSave.php" method="POST" data-bind="submit: saveTable">\n\t\t\t\t<table></table>\n\t\t\t\t<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">\n\t\t\t\t    <a class="btn-floating btn-large red">\n\t\t\t\t      <i class="large material-icons">menu</i>\n\t\t\t\t    </a>\n\t\t\t\t    <ul>\n\t\t\t\t      <li>\n\t\t\t\t      <button type="submit" class="btn-floating red"><i class="material-icons">insert_chart</i></button>\n\t\t\t\t      </li>\n\t\t\t\t      <li><a class="btn-floating yellow darken-1" data-bind="click: addRandomRecord"><i class="material-icons">add</i></a></li>\n\t\t\t\t      <li><a class="btn-floating green" data-bind="click: addRecord"><i class="material-icons">add</i></a></li>\n\t\t\t\t    </ul>\n\t\t\t\t  </div>\n\t\t\t</form>';

			this.template = '\n\t\t\t<div class="container">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col s12">\n\t\t\t\t\t\t<h1>' + this.options.tableName + '</h1>\n\t\t\t\t\t\t<a class="btn-floating indigo darken-4 right" data-bind="click: openSettings"><i class="material-icons">settings</i></a>\n\t\t\t\t\t\t' + this.form + '\n\t\t\t\t\t\t' + this.settings + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
		}
	}, {
		key: 'createTable',
		value: function createTable(response) {
			"use strict";
			var names = '';
			var _this = this;

			this.root.find('table').html('\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr data-bind="insertKey: keys"></tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody data-bind="foreach: fields">\n\t\t \t\t\t\t\t\t<tr data-bind="tableTypes: $data"></tr>\n\t\t\t\t\t\t\t </tbody>\n\t\t\t\t\t\t\t');

			ko.bindingHandlers.tableTypes = {
				init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
					_.each(valueAccessor(), function (object, key) {
						var field = new $$.FieldType[object.fieldType]({
							bindKey: key,
							column: 's12'
						});

						$(element).append('<td>' + field.template + '</td>');
					});

					$(element).append('<td><a href="#"><i class="material-icons" data-bind="click: $parent.deleteRecord">delete</i></a></td>');
				},
				update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {}
			};

			ko.bindingHandlers.initSettings = {
				init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
					//console.log(element);
					//console.log(valueAccessor());

					var field = '';

					_.each(valueAccessor(), function (object, key) {
						if (key === 'chosenType' || key === 'types') {
							if (key === 'chosenType') {}
						} else {
							field += '\n\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t\t\t\t<input placeholder="Название поля" id="field_name_$index" data-bind="value: ' + key + '.fieldType" type="text" class="validate">\n\t\t\t\t\t\t\t\t\t\t<label class="active" for="field_name_$index">Название поля</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="input-field col s6">\n\t\t\t\t\t\t\t\t\t\t<select data-bind="options: ' + valueAccessor().types + ', selectedOptions: ' + valueAccessor().chosenType + '"></select>\n\t\t\t\t\t\t\t\t\t\t<label>Тип поля</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>';
						}
					});

					$(element).append(field);
				},
				update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {}
			};

			ko.bindingHandlers.insertKey = {
				init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
					var keys = valueAccessor();
					_.each(keys()[0], function (object, key) {
						$(element).append('<th>' + key + '</th>');
					});
				},
				update: function update(element, valueAccessor, allBindings, viewModel, bindingContext) {}
			};

			function ReservationsViewModel(response) {
				var self = this;

				this.fields = ko.observableArray(response);
				this.keys = ko.observableArray([this.fields()[0]]);
				this.types = ko.observableArray(_this.fieldsType);

				_.each(response[0], function (object, key) {
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

				self.addRandomRecord = function () {
					_.each(_this.model, function (object, key) {
						if (object.fieldType === 'Text') {
							object.value = _this.fakerObject[object.fieldType](5);
						} else {
							object.value = _this.fakerObject[object.fieldType]();
						}
					});

					this.fields.push(_this.model);
				};

				self.addRecord = function () {
					_.each(_this.model, function (object, key) {
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
	}, {
		key: 'getTable',
		value: function getTable() {
			"use strict";

			return $.ajax({
				type: 'POST',
				url: 'core/Table.php',
				data: {
					tableName: this.options.tableName
				}
			});
		}
	}, {
		key: 'tableSettings',
		value: function tableSettings() {
			"use strict";
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

					list.append('<li class="collection-item">\n\t\t\t\t\t<div class="input-field col s4">\n\t\t\t\t\t\t<input placeholder="Название таблицы" id="create_table" type="text" class="validate">\n\t\t\t\t\t    <label for="create_table">Название таблицы</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="input-field col s1 right">\n\t\t\t\t\t\t<a href="#" class="waves-effect waves-green btn js-create-table"><i class="material-icons">add</i></a>\n\t\t\t\t\t</div>\n\t\t\t\t</li>');
				}
			});

			this.root.on('click', '.js-create-table', function (event) {
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
					success: function success(response) {
						response = $.parseJSON(response);

						if (response.success) {
							Materialize.toast('Таблица успешно создана', 2000, 'green accent-4');
						} else {
							Materialize.toast('Ошибка при создании', 2000, 'red accent-4');
						}
					}
				});
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
			//col ${this.options.column}
			this.template = '\n\t\t\t<div class="input-field switch">\n\t\t\t    <label for="' + this.options.uniqueId + '">\n\t\t\t      Off\n\t\t\t      <input type="checkbox" id="' + this.options.uniqueId + '" data-bind="checked: ' + this.options.bindKey + '.value">\n\t\t\t      <span class="lever"></span>\n\t\t\t      On\n\t\t\t    </label>\n\t\t    </div>';
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
			//col ${this.options.column}
			this.template = '\n\t\t\t<div class="input-field">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '.value">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
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
			//col ${this.options.column}
			this.template = '\n\t\t\t<div class="input-field">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '.value">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
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
			//col ${this.options.column}
			this.template = '\n\t\t\t<div class="input-field">\n\t          <input placeholder="Placeholder" id="' + this.options.uniqueId + '" type="text" data-bind="value: ' + this.options.bindKey + '.value">\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';
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
			//col ${this.options.column}
			this.template = '\n\t\t\t<div class="input-field">\n\t          <textarea id="' + this.options.uniqueId + '" class="materialize-textarea" data-bind="value: ' + this.options.bindKey + '.value, uniqueName: true"></textarea>\n\t          <label class="active" for="' + this.options.uniqueId + '">' + this.options.label + '</label>\n\t        </div>\n\t\t';

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

			this.template = $("\n\t\t\t<nav>\n\t\t        <div class=\"nav-wrapper\">\n\t\t\t      <a href=\"/admin\" class=\"brand-logo\">Admin</a>\n\t\t\t      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t\t\t        <li><a href=\"tables\">Tables</a></li>\n\t\t\t        <li><a href=\"/\" target=\"_blank\">На сайт</a></li>\n\t\t\t      </ul>\n\t\t\t    </div>\n\t\t    </nav>");
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

			page.base('/admin');

			page('/', function (options) {
				"use strict";
				options.path = '/index';
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
