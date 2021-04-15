// Load the AWS SDK for JS
var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

const TableName = "LOCAGAMA";

var params = {
  AttributeDefinitions: [
    {
      AttributeName: "PK",
      AttributeType: "S"
    },
    {
      AttributeName: "SK",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      AttributeName: "PK",
      KeyType: "HASH"
    },
    {
      AttributeName: "SK",
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2
  },
  TableName
};

// Create the table.
dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log(`Erro ao criar tabela: ${err}`);
  } else {
    console.log(`Tabela criada com sucesso: ${data}`);
  }
});