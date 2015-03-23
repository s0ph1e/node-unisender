var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('lodash');

function makeRequest (url, body) {
	var options = {
		method: 'post',
		url: url,
		form: body
	};

	return request(options).then(function (response) {
		return Promise.resolve(JSON.parse(response[0].body));
	});
}

module.exports = {
	makeRequest: makeRequest
};
