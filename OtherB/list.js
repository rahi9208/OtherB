let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	let response = {
		"isBase64Encoded": 1,
		"statusCode": 200,
		"headers": {
			"headerName": "headerValue"
		},
		"body": "..."
	};

	let itemType = (event.queryStringParameters && event.queryStringParameters.type) || "VEG";

	ddb.scan({
		TableName: 'OtherB',
		ExpressionAttributeValues: {
			':it': itemType
		},
		FilterExpression: 'itemType = :it'
	}, function (err, data) {
		if (!err && data.Items) {
			response.body = JSON.stringify(data.Items);
		} else {
			response.statusCode = 404;
			response.body = "No Items";
		}
		callback(err, response);
	});




}