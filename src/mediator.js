(function(exports){

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

    module.exports = Mediator;

})(typeof exports === 'undefined' ? this['module'] = {} : exports);