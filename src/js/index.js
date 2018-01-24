var _options = {
	timeout: 10000,
	send: function() {}
};

var _callbacks = {};

var core = {
	messengers: {
		ios: require("./wkwebview")
	},

	msgSend: function(target, message, payload) {
		var id = new Date().getUTCMilliseconds();
		var data = {
			target: target,
			message: message,
			payload: payload,
			muleId: id
		};

		var callback = new window.Promise(function() {
			setTimeout(function() {
				core.callback.reject(id, "Timeout in platform call");
			}, _options.timeout);
		});

		Object.defineProperty(callback, "muleId", {
			get: function() {
				return id;
			}
		});

		_callbacks[id] = callback;

		_options.send(data);

		return callback;
	},

	callback: {
		resolve: function(id, data) {
			var promise = _callbacks[id];
			if (promise) {
				promise.resolve(data);
				delete _callbacks[id];
			}
		},

		reject: function(id, error) {
			var promise = _callbacks[id];
			if (promise) {
				promise.reject(error);
				delete _callbacks[id];
			}			
		}
	},

	onConfigChange: false,

	configure: function(options) {
		Object.assign(_options, options);

		if (core.onConfigChange instanceof Function) {
			core.onConfigChange();
		}
	}
};

module.exports = core;