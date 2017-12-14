var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('lodash');

function makeRequest(url, body) {
	var options = {
		method: 'post',
		url: url,
		form: body
	};

	return request(options).then(function (response) {
		var res = JSON.parse(response.body);
		if (!res.result) {
			var error = new Error(res.error);
			error.code = res.error.code;
			error.message = res.error.message;
			throw error;
		}
		return Promise.resolve(res);
	});
}

module.exports = makeRequest;
