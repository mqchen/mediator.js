
'use strict';

var buster = require("buster");
var sinon = require("sinon");
var Mediator = require("../src/mediator");


buster.testCase("Mediator test", {

	setUp : function() {
		this.mediator = new Mediator();
	},

	"listen" : {
		"should be able to listen to event" : function() {
			this.mediator.listen("event", function() {  });

			// One event should have been created
			assert(this.mediator.listeners.hasOwnProperty("event"));

			// One listener on that event should be attached
			assert.equals(this.mediator.listeners["event"].length, 1);
		}
	},

	"trigger" : {
		"should be able to trigger one listener" : function() {
			
			var callback = sinon.spy();

			// Listen to event
			this.mediator.listen("event", callback);

			// Should not be called yet
			assert(!callback.called);

			// Trigger
			this.mediator.trigger("event");

			// Should be called once
			assert(callback.calledOnce);
		},

		"should be able to trigger multiple listeners" : function() {
			var callback = sinon.spy();

			// Listen to event twice
			this.mediator.listen("event", callback);
			this.mediator.listen("event", callback);

			// Should not have been called
			assert(!callback.called);

			// Trigger
			this.mediator.trigger("event");

			// Should be called twice
			assert.equals(callback.callCount, 2);
		},

		"should not trigger listeneres that listen to different events" : function() {

			var anotherCallback = sinon.spy();
			this.mediator.listen("another event", anotherCallback);

			var callback = sinon.spy();
			this.mediator.listen("event", callback);

			this.mediator.trigger("event");

			assert.equals(callback.callCount, 1);
			assert.equals(anotherCallback.callCount, 0);
		}
	}
});