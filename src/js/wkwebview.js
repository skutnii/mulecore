module.exports = function(handlerName) {
	var handler = window.webkit.messageHandlers[handlerName];

	return function(message) {
		handler.postMessage(message);
	};
};