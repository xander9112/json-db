$$.FieldType.Text = class FieldTypeText {
	constructor (options = {}) {
		this.options = {
			column:   's12',
			label:    'Textarea',
			bindKey:  '',
			uniqueId: _.uniqueId('prefix_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_template () {
		"use strict";

		var id = _.uniqueId('textarea_');

		this.template = `
			<div class="input-field col ${this.options.column}">
	          <textarea id="${this.options.uniqueId}" class="materialize-textarea" data-bind="value: ${this.options.bindKey}.value, uniqueName: true"></textarea>
	          <label class="active" for="${this.options.uniqueId}">${this.options.label}</label>
	        </div>
		`;

		/*$(`#${id}`).on('change', function () {
		 $(this).trigger('autoresize');
		 });*/
	}
};
