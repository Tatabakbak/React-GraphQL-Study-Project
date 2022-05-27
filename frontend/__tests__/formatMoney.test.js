import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(140)).toEqual('$1.40');
  });

  it('leaves off cents when it is whole dollars', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(66600)).toEqual('$666');
    expect(formatMoney(500000)).toEqual('$5,000');
  });
});
