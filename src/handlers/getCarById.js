exports.handler = async (event) => {
    
    const dynamodb = require('aws-sdk/clients/dynamodb');

    const docClient = new dynamodb.DocumentClient();
    
    const tableName = "LOCAGAMA";

    const { httpMethod, path, pathParameters } = event;
    
    if (httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
    }

    console.log('received:', JSON.stringify(event));

    const { id } = pathParameters;

    const params = {
        TableName: tableName,
        Key: {
            PK: "CARRO#",
            SK: id
        }
    };
    
    const { Item } = await docClient.get(params).promise();

    if(!Item){
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `Carro com ID ${id} não encontrado na base de dados`
            }),
        }
    }

    const car = {
            id: Item.SK,
            model: Item.model,
            brand: Item.brand
        };


    const response = {
        statusCode: 200,
        body: JSON.stringify(car),
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;   
    
};
