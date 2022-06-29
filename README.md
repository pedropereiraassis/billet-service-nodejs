# boleto-service-nodejs
This API fuction is to work as a microservice in Node.js to get a billet info from 
the billet digitable line.

## Run application
Run the following command to install necessary dependencies:
```
npm install
```

And then to run the application locally run:
```
npm run start
```

If you want to run the application in a container, make sure docker is running 
and then run the command:
```
docker-compose up
```

## Usage
Now with the application running locally you can use it by running the following 
request:

```
GET http://localhost:8080/boleto/:billetCode

// replace ':billetCode' by the billet digitable line
```

Example of responses:
```
statusCode: 200
Body:
{
  "barCode": "21299758700000020000001121100012100447561740",
  "amount": "20.00",
  "expirationDate": "2018-07-16"
}
```

```
statusCode: 400
Body:
{
  "message": "Boleto inválido: dígito verificador geral inválido."
}
```