var $$ = $$ || {};

$$.Application = class Application {
	constructor () {
		this.currentPage = undefined;

		this.root = $('body');

		this._cacheNodes();
		this._createComponents();

		this._initialize();
	}

	_cacheNodes () {
		this.nodes = {};
	}

	/**
	 * Создает необходимые компоненты.
	 *
	 * @private
	 */
	_createComponents () {
		this.siteMenu = new $$.Component.Menu($('.js-application > header'));

		this.route = new $$.Component.Route($('body'), {
			menu: this.siteMenu
		});
	}

	_initialize () {

	}
};

$(function () {
	$$.window = $(window);
	$$.windowWidth = $$.window.width();
	$$.windowHeight = $$.window.height();

	$$.application = new $$.Application();

	$$.window.on('resize', () => {
		$$.windowWidth = $$.window.width();
		$$.windowHeight = $$.window.height();
	});
});
