const billetTaxDigit = require('../../validators/billetTaxDigit');

test('Validate tax billet general digit mod 10', async () => {
  const result = await billetTaxDigit.validateMod10('84670000001435900240200240500024384221010811');
  expect(result).toBeTruthy();
});

test('Validate tax billet general digit mod 11', async () => {
  const result = await billetTaxDigit.validateMod11('81940000000010936599704113107970300143370831');
  expect(result).toBeTruthy();
});

test('Validate tax billet digits', async () => {
  const result = await billetTaxDigit.validateDigits('817700000000010936599702411310797039001433708318');
  expect(result).toBeTruthy();
});

test('Get tax billet digit by field', async () => {
  const result = await billetTaxDigit.getDigit('81770000000');
  expect(result).toEqual(0);
});