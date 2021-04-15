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
            PK: "USUARIO#",
            SK: id
        }
    };
    
    const { Item } = await docClient.get(params).promise();

    if(!Item){
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `Usuário com ID ${id} não encontrado na base de dados`
            }),
        }
    }

    const user = {
            id: Item.SK,
            name: Item.name,
            email: Item.email
        };


    const response = {
        statusCode: 200,
        body: JSON.stringify(user),
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;   
    
};
