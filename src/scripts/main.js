'use strict';

import $ from 'jquery';
import 'bootstrap';
import 'magnific-popup';

/*setBodyClass($(window).width());

$(window).resize(function () {
	setBodyClass($(window).width());
});*/

$(window).on('load', function(){
	$('#overlay').fadeOut();
});

$(window).scroll(function () {
	if ($(this).scrollTop() > 50) {
		$('.js-to-top').fadeIn();
	} else {
		$('.js-to-top').fadeOut();
	}
});

$(function () {
	let cookieClose = Cookies.get('alert'),
		windowWidth = $(window).width();

	if (cookieClose !== 'alert_close') {
		$('.alert-cookie').removeClass('alert--hidden');
	}

	$('.js-alert-close').on('click', function(e) {
		e.preventDefault();
		$(e.target).closest('.alert-cookie').addClass('alert--hidden');
		Cookies.set('alert', 'alert_close', {expires: 1, path: '/'});
	});

	$('.js-to-top').on('click', function () {
		let btn = $('.js-to-top');

		btn.fadeOut();

		$('body, html').animate({
			scrollTop: 0
		}, 800);

		return false;
	});
});

/*function setBodyClass(width) {
	if (width > 1280) {
		$('body').removeClass('break-1280 break-768 break-360').addClass('break-1920');
	} else if (width > 768 && width <= 1280) {
		$('body').removeClass('break-1920 break-768 break-360').addClass('break-1280');
	} else if (width > 360 && width <= 768) {
		$('body').removeClass('break-1280 break-1920 break-360').addClass('break-768');
	} else {
		$('body').removeClass('break-1280 break-768 break-1920').addClass('break-360');
	}
}*/

export {
	$// export jquery for another scripts out from webpack
};