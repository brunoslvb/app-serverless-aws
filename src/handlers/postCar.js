exports.handler = async (event) => {

    const dynamodb = require('aws-sdk/clients/dynamodb');

    const docClient = new dynamodb.DocumentClient();

    const tableName = "LOCAGAMA";

    const { body, httpMethod, path } = event;
    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }

    console.log('received:', JSON.stringify(event));

    const { model, brand } = JSON.parse(body);

        let params = {
        KeyConditionExpression: 'PK = :PK',
        ExpressionAttributeValues: {
            ':PK': 'CARRO#'
        },
        TableName: tableName
    };
    
    const { Items } = await docClient.query(params).promise();

    const ids = Items.map(user => {
        return user.SK;
    });
    
    const SK = parseInt(ids.sort()[ids.length - 1]) + 1 + "";

    params = {
        TableName: tableName,
        Item: {
          "PK":  "CARRO#",
          "SK": SK,
          "model":  model,
          "brand": brand
        }
    };
    
    await docClient.put(params).promise();

    const response = {
        statusCode: 201,
        body: JSON.stringify({
            message: `Carro ${model} cadastrado com sucesso`
        }),
        headers: {
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }

    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
};
