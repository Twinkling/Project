(function($) {
	var defaultOptions = {
		/* properties */
		name: '',
		width: 100,
		height: 30,
		textAlign: 'center',
		valueField: 'value',
		textField: 'text',
		url: null,
		method: 'get',
		queryParams: {},
		data: null,  // local data, override remote data
		filter: function(data) {return data;},  // filter data

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

	/* parser DOM struct, parser options */
	function parserDOM(DOM) {
		;
	}

	function setValues(target, value) {
		var state = $.data(target, 'JQSelect');
		var opts = state.options;
		var data = state.data;
		var $JQSelect = state.JQSelect;
		var oldVal = $(target).JQSelect('getValue');
		if(opts.onBeforeSelect.call(target, oldVal) == false) {return ;}
		if(typeof value == 'string') {
			var selected = data.filter(function(item, index, arr) {
				return item.value === value;
			});
			$JQSelect.find('.JQSelect-selected input').val(selected[0].value);
			$JQSelect.find('.val').text(selected[0].text);
			opts.onChange.call(target, oldVal, value);
			opts.onAfterSelect.call(target, value);
		}
	}

	function render(target) {
		var state = $.data(target, 'JQSelect');
		var $JQSelect = state.JQSelect;
		var opts = state.options;
		var data = state.data;
		var value, text, option, options = [];

		for(var i = 0;i < data.length; i ++) {
			value = data[i][opts.valueField];
			text = data[i][opts.textField];
			option = '<li data-value="' + value + '"><span class="JQSelect-blockCenMid">' + text + '</span></li>';
			options.push(option);
		}

		options = $(options.join(''));
		$JQSelect.find('.JQSelect-options ul').empty().append(options);

		for(var i = 0;i < options.length; i ++) {
			options.eq(i).bind('click.JQSelect', {target: target}, _clickHandler);
		}

		function _clickHandler(e) {
			value = $(this).attr('data-value');
			$(target).JQSelect('setValue', value);

			$JQSelect.find('.JQSelect-icon').removeClass('JQSelect-rotate180');
			$JQSelect.find('.JQSelect-options').slideUp();

			e.stopPropagation();
		}
	}

	/* load data */
	function loadData(target, data) {
		var state = $.data(target, 'JQSelect');
		var opts = state.options;
		state.data = opts.filter.call(target, data);
		
		render(target);

		opts.onLoadSuccess.call(target, data);
	}

    /* request remote data if url is setted */
	function request(target, url, params) {
		var opts = $.data(target, 'JQSelect').options;
		if(url) {
			opts.url = url;
		}
		params = $.extend({}, opts.queryParams, params || {});
		if(opts.onBeforeLoad.call(target, params) == false) {return ;}

		opts.loader.call(target, params, function(data) {
			loadData(target, data);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}

	/**/
	function clickHandler(e) {
		$(this).find('.JQSelect-icon').addClass('JQSelect-rotate180');
		$(this).find('.JQSelect-options').slideDown();

		e.stopPropagation();
	}

	/**/
	function mouseleaveHandler(e) {
		$(this).find('.JQSelect-icon').removeClass('JQSelect-rotate180');
		$(this).find('.JQSelect-options').slideUp();
		e.stopPropagation();
	}

	function create(target) {
		var state = $.data(target, 'JQSelect');
		var opts = state.options;

		var $wrapper = $('<div class="JQSelect-wrapper" onselectstart="return false;" unselectable="on"></div>');
		// $wrapper.appnd(target);
		// $(target).hide();

		var $select = $('<div class="JQSelect-selected"><input type="hidden" name="' + opts.name + '"><span class="JQSelect-blockCenMid val">请选择</span><i class="JQSelect-icon JQSelect-blockCenMid"></i></div>');
		$select.css({height: opts.height, width: opts.width});
		$select.find('.val').css({'text-align': opts.textAlign});
		$wrapper.append($select);

		var $optionsWrapper = $('<div class="JQSelect-options"></div>');
		$optionsWrapper.css({top: opts.height, width: opts.width});
		var $options = $('<ul></ul>');
		$optionsWrapper.append($options).appendTo($wrapper);

		// $wrapper.after(target);
		$(target).after($wrapper).hide().prop('disabled', true);

		for(var event in opts.events) {
			$wrapper.bind(event + '.JQSelect', {target: target}, opts.events[event]);
		}

		state.JQSelect = $wrapper;
	}

	/* modify default options */
	/*function modifyDefault(opts) {
		;
	}*/

	$.fn.JQSelect = function(opts, params) {			
		if(typeof opts == 'string') {
			var method = $.fn.JQSelect.method[opts];
			if(method) {
				return method(this, params);
			}
			return ;
		}
		var _this = this;
		var defaults = $.fn.JQSelect.defaults;
		opts = $.extend({}, defaults, opts);
		return this.each(function() {
			var state = $.data(this, 'JQSelect');
			if(state) {
				$.extend(state.options, opts);
			} else {
				state = $.data(this, 'JQSelect', {
					options: opts,
					JQSelect: null,
					data: []
				});
			}
			create(this);
			if(state.options.data) {
				loadData(this, state.options.data);
			}

			request(this);
		});
	}

	$.fn.JQSelect.method = {
		options: function(jq) {  // get instance options
			return $.data(jq[0], 'JQSelect').options;
			/*var options = [];
			jq.each(function() {
				options.push($.data(this, 'JQSelect').options);
			});
			return options;*/
		},
		getData: function(jq) {  // get loaded list data
			return $.data(jq[0], 'JQSelect').data;
			/*var data = [];
			jq.each(function() {
				data.push($.data(this, 'JQSelect').data);
			});
			return data;*/
		},
		loadData: function(jq, data) {  // load locale list data
			return jq.each(function() {
				loadData(this, data);
			});
		},
		reload: function(jq, url) {  // request romote data,pass parameter url override original url value
			return jq.each(function() {
				if(typeof url == 'string') {
					request(this, url);
				}
			});
		},
		setValue: function(jq, value) {  // set value
			return jq.each(function() {
				setValues(this, value);
			});
		},
		getValue: function(jq) {  // get value
			var $JQSelect = $.data(jq[0], 'JQSelect').JQSelect;
			return $JQSelect.find('.JQSelect-selected input').val();
		},
		clear: function(jq) {  // clear select value
			return jq.each(function() {
				var $JQSelect = $.data(this, 'JQSelect').JQSelect;
				$JQSelect.find('.JQSelect-selected input').val('');
				$JQSelect.find('.val').text('请选择');
			});
		}
	}

	$.fn.JQSelect.defaults = $.extend({}, defaultOptions, {
		events: {
			click: clickHandler,
			mouseleave: mouseleaveHandler
		}
		,loader: function(params, success, error) {
			var opts = $(this).JQSelect('options');
			if(!opts.url) {return ;}
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: params,
				dataType: 'json',
				success: function(data) {
					success(data);
				},
				error: function() {
					error.apply(this, arguments)
				}
			});
		}
	});

})(jQuery);