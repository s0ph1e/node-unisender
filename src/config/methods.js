var methods = [
	// Lists
	'getLists',
	'createList',
	'updateList',
	'deleteList',
	'subscribe',
	'unsubscribe',
	'exclude',
	'importContacts',
	'exportContacts',

	// Messages
	'createEmailMessage',
	'createSmsMessage',
	'createCampaign',
	'getCampaigns',
	'getCampaignStatus',
	'sendEmail',
	'checkEmail',
	'sendSms',
	'checkSms',
	'getMessage',
	'deleteMessage',

	// Stats
	'getCampaignAggregateStats',
	'getCampaignDeliveryStats',
	'getVisitedLinks',

	// Additional fields and tags
	'getFields',
	'createField',
	'updateField',
	'deleteField',
	'getTags',
	'deleteTag',

	// Methods for affiliate sites
	'validateSender',
	'register',
	'checkUserExists',
	'getUserInfo',
	'getUsers',
	'transferMoney',
	'getPayments',
	'getTariffs',
	'getAvailableTariffs',
	'changeTariff',
	'callbacks'
];

module.exports = methods;
