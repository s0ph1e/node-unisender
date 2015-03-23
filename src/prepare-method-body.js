var _ = require('lodash');

function defaultMethod(options) {
	return options;
}

var methods = {
	getLists: defaultMethod,
	createEmailMessage: defaultMethod,
	createCampaign: defaultMethod,

	importContacts: function(options) {
		var params = _.clone(options);
		var data = [];

		_.forEach(params.data, function(dataValue, dataKey) {
			data[dataKey] = [];
			_.forEach(params.field_names, function(fieldValue, fieldKey) {
				data[dataKey][fieldKey] = dataValue[fieldValue];
			});
		});

		params.data = data;

		return params;
	}
};

module.exports = methods;
