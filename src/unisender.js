var _ = require('lodash');
var url = require('url');

var transport = require('./utils/transport');
var methods = require('./prepare-method-body');
var defaults = require('./config/defaults');

function composeUrl (location, methodName) {
	return defaults.url + '/' + location + '/api/' + methodName + '?format=json';
}

function composeBody (apiKey, methodArgs) {
	return _.extend(methodArgs, { api_key: apiKey });
}

function call (method, name) {
	return function (options) {
		var endpoint = composeUrl(this.location, name);
		var body = composeBody(this.api_key, method(options));

		return transport.makeRequest(endpoint, body);
	}
}

function UniSender (options) {
	this.api_key = options.api_key;
	this.location = options.location || defaults.location;
}

_.forIn(methods, function (method, name) {
	UniSender.prototype[name] = call(method, name);
});

module.exports = UniSender;
