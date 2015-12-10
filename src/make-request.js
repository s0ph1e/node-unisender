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
		var res = JSON.parse(response.body);
		return res.result ? Promise.resolve(res) : Promise.reject(res);
	});
}

module.exports = makeRequest;
