$(function($) {
	$('.select').JQSelect({
		width: 100,
		height: 30,
		url: 'data/select.json',
		method: 'get',			
		filter: function(data) {return data;},
		onChange: function(oldVal, newVal) {console.log(this);},
		onBeforeSelect: function(record) {console.log(this);},
		onBeforeLoad: function(params) {console.log(this);},  
		onAfterSelect: function(record) {console.log(this);},
		onLoadSuccess: function(data) {console.log(this);},  
		onLoadError: function(error) {console.log(this);}
	});
	$('#select').JQSelect('reload', 'data/data.json');
});