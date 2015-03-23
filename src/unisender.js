var _ = require('lodash');

var transport = require('./utils/transport');
var prepare = require('./prepare-params');
var defaults = require('./config/defaults');
var methods = require('./config/methods');

function composeUrl (location, methodName) {
	return defaults.url + '/' + location + '/api/' + methodName + '?format=json';
}

function composeBody (apiKey, methodArgs) {
	methodArgs = methodArgs || {};
	return _.extend(methodArgs, { api_key: apiKey });
}

function call (method) {
	return function (options) {
		var params = prepare[method] ? prepare[method](options) : options;
		
		var endpoint = composeUrl(this.location, method);
		var body = composeBody(this.api_key, params);

		return transport.makeRequest(endpoint, body);
	}
}

function UniSender (options) {
	this.api_key = options.api_key;
	this.location = options.location || defaults.location;
}

_.forIn(methods, function (method) {
	UniSender.prototype[method] = call(method);
});

module.exports = UniSender;
