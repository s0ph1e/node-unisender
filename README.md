# node-unisender
Sends POST reguest to UniSender API. 

List of available in module methods is in [src/config/methods.js](https://github.com/s0ph1e/node-unisender/blob/master/src/config/methods.js).

## Installation
```
npm install unisender
```

## Usage
You can send request to unisender API via calling function of unisender object with appropriate name:
```javascript
unisender.<method name>(options);
```
for example 
```javascript
var UniSender = require('unisender');

var uniSender = new UniSender({
	api_key: 'YOUR_API_KEY',
	location: 'ru'              // optional, 'en' by default
});

uniSender.getLists().then(console.log);

uniSender.createEmailMessage({
	sender_name: 'Test',
	sender_email: 'admin@example.com',
	subject: 'hello',
	body: '<h1>Hello world!</h1>',
	list_id: 1234567
}).then(function (response) {
	console.log('Message id: ' + response.result.message_id);
}).catch(function (response) {
	console.log('Error:' + response.error);
});
```

Full list of methods and options you can find in [UniSender API Documentation](http://www.unisender.com/ru/help/api/).


### Note
For all methods except `importContacts` you have to pass parameters as described in documentation.

To call `importContacts` specify parameters `field_names` and `data` in another way:
```javascript
uniSender.importContacts({
	field_names: ['email', 'email_list_ids'],
	data: [
		{ email: 'test1@example.com', email_list_ids: '1, 2, 3' },
		{ email: 'test2@example.com', email_list_ids: '1' },
		{ email: 'test3@example.com', email_list_ids: '3' },
	]
});
```

They'll be transformed into 
```
field_names[0]=email&field_names[1]=email_list_ids
&data[0][0]=test1@example.com&data[0][1]=1,2,3
&data[1][0]=test2@example.com&data[1][1]=1
&data[2][0]=test3@0example.com&data[2][1]=3
```





