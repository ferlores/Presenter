/*!
* Presenter
* Copyright(c) 2012 Fernando Lores <ferlores@gmail.com>
* MIT Licensed
*/

/*

Presenter class for creating bradway plugins that will handle routes


module.exports = Presenter.extend({
	'name': "todos",
	'/posts get': function(){},
	'/posts post': function(){},
	'/posts put': function(){},
	'/posts delete': function(){}
});

*/

var keywords = window == null ? 
				['route', 'click']                   // browser keywords
			  : ['get', 'put', 'delete', 'post'];    // nodejs keywords

var Presenter = (function(){
	function Presenter(){};
	
	Presenter.extend = function(options){
		return {
			name: options.name || "Presenter",
			attach: function(){
				app = this;
				var	before = typeof options['before filter'] == 'function' ? options['before filter'] : false,
					after = typeof options['after filter'] == 'function' ? options['after filter'] : false;
				
				// attaching routes
				for (var routeFull in options){
					var route = routeFull.split(/ +/);
					var key = route.pop().toLowerCase();
					
					if (keywords.indexOf(key) != -1 && typeof options[routeFull] == 'function'){
						
						app.router.on(key, route.join('/'), (function(fn){
								return function(){
									(!before || before.call(this)) && fn.apply(this, arguments); 
									after && after.call(this);
								}	
							})(options[routeFull])
						);
					}		
				};
			},
			deattach: function(){},
			init: function(callback){
				callback();
			}
		};
	};
	
	return Presenter;	
})(); 
