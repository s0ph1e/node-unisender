var _ = require('lodash');

var request = require('./make-request');
var prepare = require('./prepare-params');
var defaults = require('./config/defaults');
var methods = require('./config/methods');

function composeUrl (lang, methodName) {
	return defaults.url + '/' + lang + '/api/' + methodName + '?format=json';
}

function composeBody (apiKey, methodArgs) {
	methodArgs = methodArgs || {};
	return _.extend(methodArgs, { api_key: apiKey });
}

function call (method) {
	return function (options) {
		var params = prepare[method] ? prepare[method](options) : options;

		var endpoint = composeUrl(this.lang, method);
		var body = composeBody(this.api_key, params);

		return request(endpoint, body);
	}
}

function UniSender (options) {
	this.api_key = options.api_key;
	this.lang = options.lang || defaults.lang;
}

_.forIn(methods, function (method) {
	UniSender.prototype[method] = call(method);
});

module.exports = UniSender;
