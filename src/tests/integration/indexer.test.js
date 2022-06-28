const supertest = require('supertest');
const { startServer } = require("../../app");

let server;

beforeAll(async () => {
  server = startServer();
  request = supertest(server)
})

afterAll(async () => {
  server.close()
})

describe('GET /boleto/:billetCode', () => {

  test('GET /boleto/21290001192110001210904475617405975870000002000', async () => {
    const response = await request
      .get('/boleto/21290001192110001210904475617405975870000002000');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('21299758700000020000001121100012100447561740');
    expect(response.body.amount).toEqual('20.00');
    expect(response.body.expirationDate).toEqual('2018-07-16');
  });

  test('GET /boleto/856200000037194300042026204304030057713141812105', async () => {
    const response = await request
      .get('/boleto/856200000037194300042026204304030057713141812105');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('85620000003194300042022043040300571314181210');
    expect(response.body.amount).toEqual('319.43');
    expect(response.body.expirationDate).toEqual('2022-04-30');
  });
});
