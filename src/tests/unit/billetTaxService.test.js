const billetTaxService = require('../../services/billetTax');

describe('Unit tests Tax Bank Services', () => {
  // cenários felizes
  test('Get tax billet barCode', async () => {
    const result = await billetTaxService.getBarCodeTax('856200000037194300042026204304030057713141812105');
    expect(result).toEqual('85620000003194300042022043040300571314181210');
  });

  test('Get tax billet expirationDate', async () => {
    const result = await billetTaxService.getExpirationTax('85620000003194300042022043040300571314181210');
    expect(result).toEqual('2022-04-30');
  });

  test('Get tax billet amount', async () => {
    const result = await billetTaxService.getAmountTax('85620000003194300042022043040300571314181210');
    expect(result).toEqual('319.43');
  });

  // cenários não felizes
  test('Get tax billet with no expirationDate', async () => {
    const result = await billetTaxService.getExpirationTax('84670000001435900240200240500024384221010811');
    expect(result).toEqual('boleto sem vencimento determinado');
  });

  test('Get tax billet with no amount', async () => {
    const result = await billetTaxService.getAmountTax('85620000000000000042022043040300571314181210');
    expect(result).toEqual('boleto sem valor determinado');
  });
});