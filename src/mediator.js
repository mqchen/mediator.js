// Cross platform 
(function(name, definition) {
	// AMD
	if(typeof define === 'function') {
		define(definition);
	}
	// Node.js
	else if(typeof module !== 'undefined' && module.exports) {
		module.exports = definition();
	}
	// Browser
	else {
		var theModule = definition(),
			global = this,
			old = global[name];
		theModule.noConflict = function() {
			global[name] = old;
			return theModule;
		};
		global[name] = theModule;
	}
})('Mediator', function() {
// MEDITAOR begins

	// return the module's API
	var Mediator = function() {
		this.listeners = {};
	};

	Mediator.prototype.listen = function(event, callback) {
		if(!this.listeners.hasOwnProperty(event)) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	};

	Mediator.prototype.trigger = function(event, data) {
		if(this.listeners.hasOwnProperty(event)) {
			for(var i in this.listeners[event]) {
				this.listeners[event][i](data);
			}
		}
	};


	return Mediator;
});