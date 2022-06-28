const billetBankDigit = require('../../validators/billetBankDigit');

test('Validate bank billet general digit', async () => {
  const result = await billetBankDigit.validateGeneralDigit('21299758700000020000001121100012100447561740');
  expect(result).toBeTruthy();
})

test('Validate bank billet digits', async () => {
  const result = await billetBankDigit.validateDigits('21290001192110001210904475617405975870000002000');
  expect(result).toBeTruthy();
})

test('Get bank billet digit by field', async () => {
  const result = await billetBankDigit.getDigit('212900011');
  expect(result).toEqual(9);
})