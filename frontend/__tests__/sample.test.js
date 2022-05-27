function add(a, b) {
  return a + b;
}

describe('Same test 101', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
    expect(add(2, 3)).toBeGreaterThanOrEqual(3);
  });
  it('runs the add func properly', () => {
    expect(add(2, 3)).toBeGreaterThanOrEqual(3);
  });
});
