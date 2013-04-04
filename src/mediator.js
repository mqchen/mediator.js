// Cross platform 
'use strict';
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
		this.listenersGuids = {};
		this.listenersEvents = {};
	};

	Mediator.prototype._createGuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : r & 0x3 | 0x8;
			return v.toString(16);
		});
	};

	Mediator.prototype.listen = function(event, callback) {

		var guid = this._createGuid();
		this.listenersGuids[guid] = callback;

		if(!this.listenersEvents.hasOwnProperty(event)) {
			this.listenersEvents[event] = [];
		}

		this.listenersEvents[event].push(guid);

		return guid;
	};

	Mediator.prototype.removeListener = function(guid) {
		if(!this.listenersGuids.hasOwnProperty(guid)) {
			return;
		}
		delete this.listenersGuids[guid];

		for(var event in this.listenersEvents) {
			if(this.listenersEvents.hasOwnProperty(event)) {
				for(var i = 0; i < this.listenersEvents[event].length; i++) {
					if(this.listenersEvents[event][i] === guid) {
						delete this.listenersEvents[event][i];
					}
				}
			}
		}
	};

	Mediator.prototype.trigger = function(event, data) {
		if(this.listenersEvents.hasOwnProperty(event)) {
			for(var i in this.listenersEvents[event]) {
				var guid = this.listenersEvents[event][i];
				this.listenersGuids[guid](data);
			}
		}
	};


	return Mediator;
});