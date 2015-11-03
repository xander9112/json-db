$$.FieldType.Integer = class FieldTypeInteger {
	constructor (options = {}) {
		this.options = {
			column: 's12',
			label: 'Integer',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_template () {
		"use strict";

		this.template = `
			<div class="input-field col ${this.options.column}">
	          <input placeholder="Placeholder" id="${this.options.uniqueId}" type="text" data-bind="value: ${this.options.bindKey}">
	          <label class="active" for="${this.options.uniqueId}">${this.options.label}</label>
	        </div>
		`;
	}
};
