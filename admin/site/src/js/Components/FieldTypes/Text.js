$$.FieldType.Text = class FieldTypeText {
	constructor (options = {}) {
		this.options = {
			column: 's12',
			label: 'Textarea',
			bindKey: '',
			uniqueId: _.uniqueId('text_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_template () {
		"use strict";
		this.template = `
			<div class="field">
				<div class="ui icon input">
					<textarea id="${this.options.uniqueId}" data-bind="value: ${this.options.bindKey}.value, uniqueName: true" rows="1"></textarea>
					<i class="inverted circular edit link icon" data-bind="click: $parent.openTextEditor"></i>
				</div>
			</div>`;
	}
};
