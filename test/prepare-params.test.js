var expect = require('chai').expect;
var prepareParams = require('../src/prepare-params');

describe('prepare-params', function() {
	describe('importContacts', function() {
		it('should correctly transform options', function() {
			var input = {
				field_names: ['email', 'email_list_ids'],
				data: [
					{ email: 'test1@example.com', email_list_ids: '1, 2, 3' },
					{ email: 'test2@example.com', email_list_ids: '1' },
					{ email: 'test3@example.com', email_list_ids: '3' }
				]
			};

			var expectedOutput = {
				field_names: ['email', 'email_list_ids'],
				data: [
					['test1@example.com', '1, 2, 3'],
					['test2@example.com', '1'],
					['test3@example.com', '3']
				]
			};

			var actualOutput = prepareParams.importContacts(input);

			expect(actualOutput).to.deep.equal(expectedOutput);
		});
	});
});