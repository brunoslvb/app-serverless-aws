# AWS - Serverless API

## Desafio

Criar uma solução de aplicativo de serveless da AWS com os seguintes recursos:

- [x] 6 Lambda functions 
- [x] API Gateway
- [x] DynamoDB

## Solução

Foi desenvolvido uma aplicação web serverless com toda sua infraestrutura baseada em serviços da AWS.

O tema da aplicação web desenvolvida é de uma locadora de carros, onde há o cadastro de usuários, carros e aluguéis.

Serviços e tecnologias utilizadas:

- [API Gateway](https://aws.amazon.com/pt/api-gateway/)
- [DynamoDB](https://aws.amazon.com/pt/dynamodb/)
- [Lambda](https://aws.amazon.com/pt/lambda/)
- [AWS Amplify](https://aws.amazon.com/pt/amplify/)
- [NodeJS](https://nodejs.org/en/about/)
- [AngularJS](https://angularjs.org/)

## Endpoints

Foram criados ***endpoints*** separados para cada funcionalidade, sendo cada funcionalidade, uma função Lambda separada.

**Endpoints criados:**

Segue descrição dos endpoints criados para as funcionalidades:

### Usuários

Endpoints relacionados aos usuários cadastrados na aplicação.

| Método | Endpoint    | Informação                                                   |
| ------ | ----------- | ------------------------------------------------------------ |
| GET    | /users      | Recupera as informações dos usuários cadastrados no DynamoDB |
| GET    | /users/{id} | Recupera as informações do usuário cadastrado com o ***id*** passado como parâmetro |
| POST   | /users      | Insere um usuário no DynamoDB                                |

### Carros

Endpoints relacionados aos carros cadastrados na aplicação.

| Método | Endpoint   | Informação                                                   |
| ------ | ---------- | ------------------------------------------------------------ |
| GET    | /cars      | Recupera as informações dos carros cadastrados no DynamoDB   |
| GET    | /cars/{id} | Recupera as informações do carro cadastrado com o ***id*** passado como parâmetro |
| POST   | /cars      | Insere um carro no DynamoDB                                  |

### Aluguéis

Endpoints relacionados aos alugúeis cadastrados na aplicação.

| Método | Endpoint       | Informação                                                   |
| ------ | -------------- | ------------------------------------------------------------ |
| GET    | /rents         | Recupera as informações dos carros que estão alugados e disponíveis no DynamoDB |
| POST   | /rents         | Aluga um carro que está disponível no DynamoDB               |
| PUT    | /rents/{carId} | Realiza a devolução de carro                                 |

------

## API

As funcionalidades da sistema foram desenvolvidas utilizando funções Lambda juntamente com o API Gateway para o gerenciamento dos acessos a API.

Link para acesso:

> https://qxk6pov3eg.execute-api.us-east-1.amazonaws.com/dev

## Sistema Web

O sistema web foi desenvolvido com o Framework AngularJS e hospedado no AWS Amplify.

Repositório: https://github.com/gloureiro100/aws-project-front

Link para acesso:

> https://develop.d13os02svtlasc.amplifyapp.com/

------

## Colaboradores

- [Alexsander Penavilla De Oliveira](https://github.com/AlexPenavilla)
- [Bruno da Silva Barros](https://github.com/brunoslvb)
- [Edna Adalgisa da Silva](https://github.com/ednaadal)
- [Gabriel Loureiro](https://github.com/gloureiro100/)

