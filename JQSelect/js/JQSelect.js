(function($) {
	var defaultOptions = {
		/* properties */
		width: 100,
		height: 30,
		textAlign: 'center',
		valueField: 'value',
		textField: 'text',
		url: '',
		method: 'get',
		queryParams: {},
		data: [],
		filter: function() {},  // filter data

		/* method */
		/*options: function() {},  // get instance options
		getData: function() {},  // get loaded list data
		loadData: function(data) {},  // load locale list data
		reload: function(url) {},  // request romote data,pass parameter url override original url value
		setValue: function(value) {},  // set value
		getValue: function() {},  // get value
		clear: function() {},  // clear select value*/

		/* events */
		onChange: function(newVal, oldVal) {},  // fires when change selected data
		onBeforeSelect: function(record) {},  // fires before select data
		onAfterSelect: function(record) {},  // fires after select data
		onBeforeLoad: function(params) {},  // fires brfore request remote data,return false cancel load data
		onLoadSuccess: function(data) {},  // fires when success load remote data
		onLoadError: function(error) {},  // fires when one or more errors occurs during loading remote data
	};

	/* parser parameter */
	function parserOptions(opts) {
		;
	}

	/* parser data(include local & remote & DOM) */
	function parserData(data) {
		if(typeof data == 'Array') {
			;
		} else {
			;
		}
		function _parserArray() {
			
		}
	}
	/* modify default options */
	/*function modifyDefault(opts) {
		;
	}*/

	$.fn.JQSelect = function(opts) {
		opts = opts || {};
		return this.each(function() {
			console.log(this);
		});
	}

	$.fn.JQSelect.method = {
		options: function(jq) {},  // get instance options
		getData: function(jq) {},  // get loaded list data
		loadData: function(jq, data) {},  // load locale list data
		reload: function(jq, url) {},  // request romote data,pass parameter url override original url value
		setValue: function(jq, value) {},  // set value
		getValue: function(jq) {},  // get value
		clear: function(jq) {},  // clear select value
	}

	$.fn.JQSelect.defaults = $.extend({}, defaultOptions);

	/*$.fn.extend({
		"JQSelect": function(opts){
			return this;
			;
		}
	});*/

	$('.JQSelect-selected').click(function() {
		$(this).find('.JQSelect-icon').addClass('JQSelect-rotate180');
		$(this).next('.JQSelect-options').slideDown();
	});
	$('.JQSelect-wrapper').mouseleave(function() {
		$(this).find('.JQSelect-icon').removeClass('JQSelect-rotate180');
		$(this).find('.JQSelect-options').slideUp();
	});
	$('.JQSelect-options li').click(function() {
		/* TODO */
		var $parent = $(this).parents('.JQSelect-options');
		var $prev = $parent.prev('.JQSelect-selected');
		var text = $(this).find('span').text();
		$prev.attr('data-value', $(this).attr('data-value'))
			.find('span').text(text)
			.next('.JQSelect-icon').removeClass('JQSelect-rotate180');
		$parent.slideUp();
	});
})(jQuery);