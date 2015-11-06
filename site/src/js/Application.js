var $$ = $$ || {};

class Application {
	constructor () {
		this._initMainSlider();
		this._initSlider();
	}

	_initMainSlider () {
		$('.js-main-slider').each(function () {
			new $$.BannerSlider($(this));
		});
	}

	_initSlider () {
		$('.js-slider').each(function () {
			new $$.Slider($(this));
		});
	}
}

$(function () {
	$$.window = $(window);
	$$.body = $(document.body);
	$$.windowWidth = $$.window.width();
	$$.windowHeight = $$.window.height();
	$$.application = new Application();

	$$.window.on('resize', function () {
		$$.windowWidth = $$.window.width();
		$$.windowHeight = $$.window.height();
	});
});
