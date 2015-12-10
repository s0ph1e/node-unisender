var expect = require('chai').expect;
var nock = require('nock');
var makeRequest = require('../src/make-request');

var goodResponse = {
	result: {
		message_id: 34423432
	}
};

var errorResponse = {
	error: 'AK100310-02',
	code: 'invalid_api_key'
};

describe('make-request', function() {

	beforeEach(function() {
		nock.cleanAll();
		nock.disableNetConnect();
	});

	afterEach(function() {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it('should send port request to specified url with specified body', function() {
		var url = 'http://example.com';
		var body = 'some body';

		nock(url).post('/', body).reply(200, goodResponse);

		return makeRequest(url, body).then(function requestDone() {
			expect(nock.isDone()).to.equal(true);
		});
	});

	it('should return resolved promise with correct object if response contains "result"', function() {
		var url = 'http://example.com';
		var body = 'some body';

		nock(url).post('/', body).reply(200, goodResponse);

		return makeRequest(url, body).then(function requestDone(result) {
			expect(result).to.deep.equal(goodResponse);
		});
	});

	it('should return rejected promise with correct object if response doesn\'t contain "result"', function() {
		var url = 'http://example.com';
		var body = 'some body';

		nock(url).post('/', body).reply(200, errorResponse);

		return makeRequest(url, body).then(function requestDone() {
			expect(true).to.equal(false);
		}).catch(function catchErrorResponse(err) {
			expect(err).to.deep.equal(errorResponse);
		});
	});

	it('should return rejected promise if request failed', function() {
		var url = 'http://example.com';
		var body = 'some body';

		nock(url).post('/', body).replyWithError('something awful happened');

		return makeRequest(url, body).then(function requestDone() {
			expect(true).to.equal(false);
		}).catch(function catchErrorResponse() {
			expect(true).to.equal(true);
		});
	});
});