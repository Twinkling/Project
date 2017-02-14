$(function($) {
	// $('.select').JQSelect({
	// 	width: 100,
	// 	height: 30,
	// 	url: 'data/select.json',
	// 	method: 'get',			
	// 	filter: function(data) {return data;},
	// 	onChange: function(oldVal, newVal) {console.log(this);},
	// 	onBeforeSelect: function(record) {console.log(this);},
	// 	onBeforeLoad: function(params) {console.log(this);},  
	// 	onAfterSelect: function(record) {console.log(this);},
	// 	onLoadSuccess: function(data) {console.log(this);},  
	// 	onLoadError: function(error) {console.log(this);}
	// });
	// $('#select').JQSelect('reload', 'data/data.json');
	/* 
     init syntax highlight
	 初始化语法高亮模块
	 */
	$('pre code').each(function(i, block) {
		hljs.configure({
			tabReplace: '  '
		});
		hljs.initHighlightingOnLoad(block);
	});

	/* 
	 load remote data
	 加载远程数据
	 */
	$('#remote').JQSelect({
		url: 'data/select.json',
		method: 'get'
	});

	/*
	 load local data
	 加载本地数据
	 */
	/* method 1 */
	$("#local").JQSelect({
		data: [{
			"text": "local1","value": "localVal1"
		},{
			"text": "local2","value": "localVal2"
		}]
	});
	/* method 2 */
	/*$("#local").JQSelect().JQSelect('loadData', [{
		"text": "local1","value": "localVal1"
	},{
		"text": "local2","value": "localVal2"
	}]);*/

	/*
     on after select, fired another JQSelect widget load remote data
     选择之后触发另一个JQSelect组件加载远程数据
	 */
	$('#afterSelect').JQSelect({
		url: 'data/select.json',
		method: 'get',
		onAfterSelect: function(record) {
			$('#associate').JQSelect('clear').JQSelect('reload', record);
		}
	});
	$('#associate').JQSelect();

	/*
     filter data
     进行数据过滤
	 */
	$('#filter').JQSelect({
		data: [{
			"text": "local1","value": "localVal1"
		},{
			"text": "local2","value": "localVal2"
		}],
		filter: function(data) {
			return data.filter(function(item, index, arr) {
				if(item.value === "localVal1"){
					return item;
				}
			});
		}
	});

	/*
	 reload remote data
	 重新加载远程数据
	 */
	$('#reload').JQSelect({
		onLoadSuccess: function(data) {
			alert('load success');
		}
	});
	$('.reload').click(function(e) {
		$('#reload').JQSelect('reload', $(this).attr('data-url'));
	});
});