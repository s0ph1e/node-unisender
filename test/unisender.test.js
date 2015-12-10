var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire =  require('proxyquire');

describe('unisender', function() {
	it('should set api key and lang on create', function() {
		var Unisender = require('../src/unisender');
		var unisender = new Unisender({
			api_key: 'test api key',
			lang: 'my lang'
		});

		expect(unisender.api_key).to.equal('test api key');
		expect(unisender.lang).to.equal('my lang');
	});

	it('should set default lang from config on create', function() {
		var defaultsStub = {
			url: 'http://example.com',
			lang: 'lang'
		};
		var Unisender = proxyquire('../src/unisender', {
			'./config/defaults': defaultsStub
		});
		var unisender = new Unisender({
			api_key: 'test api key'
		});

		expect(unisender.api_key).to.equal('test api key');
		expect(unisender.lang).to.equal(defaultsStub.lang);
	});

	it('should contain all methods', function() {
		var methodsStub = ['methodA', 'methodB'];
		var Unisender = proxyquire('../src/unisender', {
			'./config/methods': methodsStub
		});
		var unisender = new Unisender({
			api_key: 'test api key'
		});

		expect(unisender).to.respondTo('methodA');
		expect(unisender).to.respondTo('methodB');
	});

	it('should call request with appropriate params', function() {
		var defaultsStub = {
			url: 'http://example.com',
			lang: 'lang'
		};
		var methodsStub = ['methodA'];
		var requestStub = sinon.stub();

		var Unisender = proxyquire('../src/unisender', {
			'./config/defaults': defaultsStub,
			'./config/methods': methodsStub,
			'./make-request': requestStub
		});

		var unisender = new Unisender({
			api_key: 'test api key'
		});

		var options = { a: 1, b: 2 };

		unisender.methodA(options);

		var expectedUrl = 'http://example.com/lang/api/methodA?format=json';
		var expectedBody = {
			a: 1,
			b: 2,
			api_key: 'test api key'
		};

		expect(requestStub.calledOnce).to.be.equal(true);
		expect(requestStub.args[0][0]).to.equal(expectedUrl);
		expect(requestStub.args[0][1]).to.deep.equal(expectedBody);
	});

	it('should call request with appropriate params when no options', function() {
		var defaultsStub = {
			url: 'http://example.com',
			lang: 'lang'
		};
		var methodsStub = ['methodA'];
		var requestStub = sinon.stub();

		var Unisender = proxyquire('../src/unisender', {
			'./config/defaults': defaultsStub,
			'./config/methods': methodsStub,
			'./make-request': requestStub
		});

		var unisender = new Unisender({
			api_key: 'test api key'
		});

		unisender.methodA();

		var expectedUrl = 'http://example.com/lang/api/methodA?format=json';
		var expectedBody = { api_key: 'test api key' };

		expect(requestStub.calledOnce).to.be.equal(true);
		expect(requestStub.args[0][0]).to.equal(expectedUrl);
		expect(requestStub.args[0][1]).to.deep.equal(expectedBody);
	});

	it('should call appropriate prepare method', function() {
		var defaultsStub = {
			url: 'http://example.com',
			lang: 'lang'
		};
		var methodsStub = ['methodA'];
		var requestStub = sinon.stub();
		var prepareStub = {
			methodA: sinon.stub()
		};

		var Unisender = proxyquire('../src/unisender', {
			'./config/defaults': defaultsStub,
			'./config/methods': methodsStub,
			'./make-request': requestStub,
			'./prepare-params': prepareStub
		});

		var unisender = new Unisender({
			api_key: 'test api key'
		});

		var options = { hahaha: 46674 };

		unisender.methodA(options);

		expect(prepareStub.methodA.called).to.be.equal(true);
		expect(prepareStub.methodA.args[0][0]).to.deep.equal(options);
	});
});