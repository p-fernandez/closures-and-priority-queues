'use strict';

const defaultArguments = require('./index');

function add(a, b) {
  return a + b;
}

function join(a, b) {
  return `${a}${b}`;
}

describe('Tests for Task1', () => {
  test('Sumatory function. No args and no params returns NaN', () => {
    const result = defaultArguments(add);
    expect(Number.isNaN(result())).toBe(true);
  });

  test('Sumatory function. No args returns NaN', () => {
    const result = defaultArguments(add, { b: 9 });
    expect(Number.isNaN(result())).toBe(true);
  });

  test('Sumatory function. Default arguments: b: 9', () => {
    const result = defaultArguments(add, { b: 9 });
    expect(result(10)).toBe(19);
    expect(result(10, 5)).toBe(15);
  });

  test('Sumatory function. Default arguments is overriden', () => {
    let result = defaultArguments(add, { b: 9 });
    expect(result(10)).toBe(19);
    expect(result(10, 5)).toBe(15);

    result = defaultArguments(result, { b: 3 });
    expect(result(10)).toBe(13);
  });

  test('Example test given in task', () => {
    const add2 = defaultArguments(add, { b: 9 });
    expect(add2(10)).toBe(19);
    expect(add2(10, 7)).toBe(17);
    expect(Number.isNaN(add2())).toBe(true);

    const add3 = defaultArguments(add2, { b: 3, a: 2 });
    expect(add3(10)).toBe(13);
    expect(add3()).toBe(5);
    expect(add3(undefined, 10)).toBe(12);

    const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't an argument
    expect(Number.isNaN(add4(10))).toBe(true);
    expect(add4(10, 10)).toBe(20);
  });

  test('Join function. No args returns "undefinedundefined"', () => {
    const result = defaultArguments(join);
    expect(result()).toBe('undefinedundefined');
  });

  test('Join function. Default arguments: b: "test"', () => {
    const result = defaultArguments(join, { b: 'test' });
    expect(result()).toBe('undefinedtest');
    expect(result(10)).toBe('10test');
    expect(result(10, 5)).toBe('105');
    expect(result('this', 'is')).toBe('thisis');
  });

  test('Join function. Default arguments is overriden', () => {
    let result = defaultArguments(join, { b: 9 });
    expect(result(10)).toBe('109');
    expect(result(10, 5)).toBe('105');
    expect(result('this')).toBe('this9');

    result = defaultArguments(result, { b: 'ok' });
    expect(result(10)).toBe('10ok');
    expect(result('this')).toBe('thisok');
    expect(result('this', 'is')).toBe('thisis');
  });
});
