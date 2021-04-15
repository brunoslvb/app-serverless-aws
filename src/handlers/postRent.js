exports.handler = async (event) => {

    const dynamodb = require('aws-sdk/clients/dynamodb');

    const docClient = new dynamodb.DocumentClient();

    const tableName = "LOCAGAMA";

    const headers = {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };
    
    const { body, httpMethod, path } = event;
    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }

    console.log('received:', JSON.stringify(event));

    const { userId, carId } = JSON.parse(body);

    let { SK } = JSON.parse(body);

    let params = {
        TableName: tableName,
        Key: { PK: "USUARIO#", SK: userId }
    };

    let user = await docClient.get(params).promise();

    if(!user.Item){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Usuário não encontrado na base de dados`
            }),
            headers: {
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
    }

    user = user.Item;

    params.Key.PK = "CARRO#";
    params.Key.SK = carId;

    let car = await docClient.get(params).promise();

    if(!car.Item){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Carro não encontrado na base de dados`
            }),
            headers: {
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
    }

    car = car.Item;

    params = {
        KeyConditionExpression: 'PK = :PK',
        FilterExpression: 'carId = :carId AND statusRent = :statusRent',
        ExpressionAttributeValues: {
            ':PK': 'ALUGUEL#',
            ':carId': carId,
            ':statusRent': true
        },
        TableName: tableName
    };

    const isRented = await docClient.query(params).promise();

    if(isRented.Items && isRented.Items[0]){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Este carro já está alugado`
            }),
            headers: {
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }
    }

    params = {
        KeyConditionExpression: 'PK = :PK',
        FilterExpression: 'carId = :carId AND userId = :userId AND statusRent = :statusRent',
        ExpressionAttributeValues: {
            ':PK': 'ALUGUEL#',
            ':carId': carId,
            ':userId': userId,
            ':statusRent': false
        },
        TableName: tableName
    };

    const rent = await docClient.query(params).promise();


    params = {
        KeyConditionExpression: 'PK = :PK',
        ExpressionAttributeValues: {
            ':PK': 'ALUGUEL#'
        },
        TableName: tableName
    };
    
    const { Items } = await docClient.query(params).promise();

    const ids = Items.map(user => {
        return user.SK;
    });


    if(rent.Items && rent.Items[0]) {
        SK = rent.Items[0].SK;
    } else {
        SK = ids.length === 0 ? "1" : parseInt(ids.sort()[ids.length - 1]) + 1 + "";
    }

    params = {
        TableName: tableName,
        Item: {
          "PK":  "ALUGUEL#",
          "SK": SK,
          "userId":  userId,
          "carId": carId,
          "statusRent": true
        }
    };
    
    await docClient.put(params).promise();

    const response = {
        statusCode: 201,
        body: JSON.stringify({
            message: `Carro ${car.model} alugado com sucesso`
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
