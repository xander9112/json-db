$$.FieldType.Media = class FieldTypeMedia {
	constructor (options = {}) {
		this.options = {
			column: 's12',
			label: 'Media',
			bindKey: '',
			uniqueId: _.uniqueId('media_')
		};

		_.assign(this.options, options);

		this._template();
	}

	_template () {
		"use strict";

		var id = _.uniqueId('input_');
		//col ${this.options.column}
		this.template = `
			<div class="field">
				<div class="ui icon input">
					<input placeholder="Placeholder" id="${this.options.uniqueId}" type="text" data-bind="value: ${this.options.bindKey}.value">
					<i class="inverted circular file image outline link icon" data-bind="click: $parent.openImageFolder"></i>
				</div>
			</div>`;
	}
};
