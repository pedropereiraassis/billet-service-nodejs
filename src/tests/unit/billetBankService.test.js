const billetBankService = require('../../services/billetBank');

describe('Unit tests Billet Bank Services', () => {
  // cenários felizes
  test('Get bank billet barCode', async () => {
    const result = await billetBankService.getBarCodeBank('21290001192110001210904475617405975870000002000');
    expect(result).toEqual('2129975870000002000000112110001210044756174');
  });
  
  test('Get bank billet expirationDate', async () => {
    const result = await billetBankService.getExpirationDateBank('21299758700000020000001121100012100447561740');
    expect(result).toEqual('2018-07-16');
  });
  
  test('Get bank billet amount', async () => {
    const result = await billetBankService.getAmountBank('21299758700000020000001121100012100447561740');
    expect(result).toEqual('20.00');
  });

  // cenários não felizes
  test('Get bank billet with no amount', async () => {
    const result = await billetBankService.getAmountBank('21299758700000000000001121100012100447561740');
    expect(result).toEqual('boleto sem valor determinado');
  });
});
