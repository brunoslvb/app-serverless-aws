exports.handler = async (event) => {
    
    const dynamodb = require('aws-sdk/clients/dynamodb');

    const docClient = new dynamodb.DocumentClient();
    
    const tableName = "LOCAGAMA";

    const { httpMethod, path } = event;
    
    if (httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
    }

     const params = {
        KeyConditionExpression: 'PK = :PK',
        ExpressionAttributeValues: {
            ':PK': 'CARRO#'
        },
        TableName: tableName
    };
    
    const { Items } = await docClient.query(params).promise();

    const cars = Items.map(car => {
        return {
            id: car.SK,
            model: car.model,
            brand: car.brand
        };
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify(cars),
        headers: {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
    
};
