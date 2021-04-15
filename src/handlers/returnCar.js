exports.handler = async (event) => {

    const dynamodb = require('aws-sdk/clients/dynamodb');

    const docClient = new dynamodb.DocumentClient();

    const tableName = "LOCAGAMA";

    const { body, httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'PUT') {
        throw new Error(`putMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }

    console.log('received:', JSON.stringify(event));

    const { carId } = pathParameters;

    let params = {
        KeyConditionExpression: 'PK = :PK',
        FilterExpression: 'carId = :carId AND statusRent = :statusRent',
        ExpressionAttributeValues: {
            ':PK': 'ALUGUEL#',
            ':carId': carId,
            ':statusRent': true
        },
        TableName: tableName
    };

    const rented = await docClient.query(params).promise();

    if(!rented.Items[0]){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Este carro não está alugado`
            }),
            headers: {
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
    }

    params = {
        TableName: tableName,
        Item: {
          "PK":  "ALUGUEL#",
          "SK": rented.Items[0].SK,
          "userId":  rented.Items[0].userId,
          "carId": carId,
          "statusRent": false
        }
    };
    
    await docClient.put(params).promise();


    params = {
        TableName: tableName,
        Key: {
            "PK": "CARRO#",
            "SK": `${carId}`
        }
    };

    const car = await docClient.get(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `Carro ${car.Item.model} devolvido com sucesso`
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
