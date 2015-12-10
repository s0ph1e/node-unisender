var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
var proxyquire =  require('proxyquire');

chai.use(spies);

var defaultsStub = {
	url: 'http://example.com',
	lang: 'lang'
};
var methodsStub = ['methodA', 'methodB'];
var requestStub = chai.spy();

var Unisender = proxyquire('../src/unisender', {
	'./config/defaults': defaultsStub,
	'./config/methods': methodsStub,
	'./make-request': requestStub
});

describe('unisender', function() {
	it('should set api key and lang on create', function() {
		var unisender = new Unisender({
			api_key: 'test api key',
			lang: 'my lang'
		});

		expect(unisender.api_key).to.equal('test api key');
		expect(unisender.lang).to.equal('my lang');
	});

	it('should set default lang from config on create', function() {
		var unisender = new Unisender({
			api_key: 'test api key'
		});

		expect(unisender.api_key).to.equal('test api key');
		expect(unisender.lang).to.equal(defaultsStub.lang);
	});

	it('should contain all methods', function() {
		var unisender = new Unisender({
			api_key: 'test api key'
		});

		expect(unisender).to.respondTo('methodA');
		expect(unisender).to.respondTo('methodB');
	});
});