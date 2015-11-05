$$.FieldType.Media = class FieldTypeMedia {
	constructor (options = {}) {
		this.options = {
			column: 's12',
			label: 'Media',
			bindKey: '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_template () {
		"use strict";

		var id = _.uniqueId('input_');

		this.template = `
			<div class="input-field col ${this.options.column}">
	          <input placeholder="Placeholder" id="${this.options.uniqueId}" type="text" data-bind="value: ${this.options.bindKey}.value">
	          <label class="active" for="${this.options.uniqueId}">${this.options.label}</label>
	        </div>
		`;
	}
};
