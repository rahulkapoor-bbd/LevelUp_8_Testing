const {evaluate} = require('../public/script')

describe('Addition', ()=>{
  const input_1 = 1;
  const input_2 = 2;
  const expected_output = 3;

  it('Should add the inputs together', ()=>{
    inputValue = input_1 + "+" + input_2
    const result = evaluate(inputValue);
    expect(result).toEqual(expected_output)
  })
  
})