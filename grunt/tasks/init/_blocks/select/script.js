/* Author: Artem Sapegin, http://sapegin.me, 2012 */

/*global utils:true*/
;(function($) {
	'use strict';

	$.fn.formSelect = function() {
		return this.each(function() {
			var container = $(this),
				select = container.find('select'),
				box = container.find('.select__box');

				if (!box.length) {
					box = $('<div class="select__box">');
					container.append(box);
				}

				select.focus(function() {
					container.addClass('is-focused');
				});
				select.blur(function() {
					container.removeClass('is-focused');
				});
				select.change(function() {
					box.text(select.find(':selected').text());
				});

				select.triggerHandler('change');
		});
	};

	// Init component
	utils.initComponents({ select: function(elem) {
		$(elem).formSelect();
	}});

})(jQuery);