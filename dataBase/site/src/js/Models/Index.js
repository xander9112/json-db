var $$ = $$ || {};

$$.Model.Index = class ModelIndex {
	constructor (root = $('main')) {
		"use strict";

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	initialize () {

		"use strict";
		this.root.html(this.template);

		function TestViewModel () {
			var self = this;

			this.names = ko.observableArray([
				{
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
				},
				{
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
				},
				{
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
				}
			]);

			this.test = function () {
				console.log(this.names());
			}
		}



		ko.applyBindings(new TestViewModel());
	}

	destroy () {
		"use strict";
		console.log('destroy Index');
	}

	_template () {
		"use strict";
		this.template = `<h1>Index</h1>
		<div data-bind="foreach: names">
			<div class="row" data-bind="tableTypes: $data"></div>
		</div>
		<button data-bind="click: test">test</button>
		`;
	}
};
