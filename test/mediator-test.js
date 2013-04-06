
'use strict';

var buster = require("buster");
var sinon = require("sinon");
var Mediator = require("../src/mediator");


buster.testCase("Mediator test", {

	setUp : function() {
		this.mediator = new Mediator();
	},

	"listen" : {
		"should get unique guid for every listener" : function() {

			var testAmount = 100; // Number of listeners to add

			var guids = {};
			var callback = sinon.spy();

			for(var i = 0; i < testAmount; i++) {
				var guid = this.mediator.listen("event", callback);
				guids[guid] = null;
			}

			assert.equals(testAmount, Object.keys(guids).length);
		}
	},

	"removeListener" : {
		"should be able to remove listener with guid" : function() {
			var callback = sinon.spy();
			var anotherCallback = sinon.spy();

			var guid = this.mediator.listen("event", callback);
			this.mediator.listen("event", anotherCallback);

			this.mediator.trigger("event");

			assert.equals(callback.callCount, 1);

			this.mediator.removeListener(guid);

			this.mediator.trigger("event");

			assert.equals(callback.callCount, 1); // Should not have been called again
			assert.equals(anotherCallback.callCount, 2); // Another callback should be uneffected
		},

		"should be able to handle non-existing guid" : function() {
			var dummyGuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

			var callback = sinon.spy();
			
			this.mediator.listen("event", callback);

			this.mediator.removeListener(dummyGuid); // Should not remove anything

			this.mediator.trigger("event");

			assert.equals(callback.callCount, 1);
		},

		"should be able to listen to events with *" : function() {
			var callback = sinon.spy();
			var anotherCallback = sinon.spy();

			this.mediator.listen("event:*", callback);
			this.mediator.listen("*", callback);
			this.mediator.listen("*:1", callback);
			this.mediator.listen("event:2", anotherCallback);
			this.mediator.listen("*:2", anotherCallback);

			this.mediator.trigger("event:1");

			assert.equals(callback.callCount, 3);
			assert.equals(anotherCallback.callCount, 0);
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
		},

		"should trigger listener with given data" : function() {
			var orgData = { "hello" : "world" }
			var listener = function(data) {
				assert.same(data, orgData);
			}

			this.mediator.listen("event", listener);
			this.mediator.trigger("event", orgData);
		},

		"should be able to trigger multiple listeners with *" : function() {
			var callback = sinon.spy();

			this.mediator.listen("event:1", callback);
			this.mediator.listen("event:2", callback);

			this.mediator.trigger("event:*");

			assert.equals(callback.callCount, 2);
		},

		"should escape regex characters" : function() {
			var callback = sinon.spy();

			this.mediator.listen(".^$event:1", callback);
			this.mediator.listen(".^$event:2", callback);

			this.mediator.trigger(".^$event:*");

			assert.equals(callback.callCount, 2);
		}
	}
});