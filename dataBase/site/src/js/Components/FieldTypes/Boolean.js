$$.FieldType.Boolean = class FieldTypeBoolean {
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
			<div class="switch">
			    <label for="${this.options.uniqueId}">
			      Off
			      <input type="checkbox" id="${this.options.uniqueId}" data-bind="checked: ${this.options.bindKey}">
			      <span class="lever"></span>
			      On
			    </label>
		    </div>`;
	}
};
