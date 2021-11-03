import { FizzBuzzArray, fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('should exist', () => {
    expect(fizzbuzz).toBeDefined();
  });

  it('should return an array', () => {
    const result: unknown = fizzbuzz(1);
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should return an array of strings and numbers', () => {
    const result: unknown[] = fizzbuzz(15);
    result.forEach((item) => {
      const isNumber: boolean = typeof item === 'number';
      const isString: boolean = typeof item === 'string';
      expect(isNumber || isString).toBeTruthy();
    });
  });

  it('should return an array whose length equals to the given value number', () => {
    const value: number = 15;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(result.length).toBe(value);
  });

  it('should return an empty array if provided value is 0', () => {
    const value: number = 0;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(result).toEqual([]);
  });

  it('should return an empty array if provided value is negative', () => {
    const value: number = -10;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(result).toEqual([]);
  });

  it('should return an empty array if provided value is decimal', () => {
    const value: number = 8.1;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(result).toEqual([]);
  });

  it('should return an empty array if provided value is infinite', () => {
    const value: number = Math.PI;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(result).toEqual([]);
  });

  it('should return an array ending with Fizz if provided value is 3', () => {
    const value: number = 3;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(getLastValue(result)).toBe('Fizz');
  });

  it('should return an array ending with Fizz if provided value can be divided by 3 and not 5', () => {
    const value: number = 6;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(getLastValue(result)).toBe('Fizz');
  });

  it('should return an array ending with Buzz if provided value is 5', () => {
    const value: number = 5;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(getLastValue(result)).toBe('Buzz');
  });

  it('should return an array ending with Buzz if provided value can be divided by 5 and not 3', () => {
    const value: number = 10;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(getLastValue(result)).toBe('Buzz');
  });

  it('should return an array ending with FizzBuzz if provided value can be divided by both 3 and 5', () => {
    const value: number = 15;
    const result: FizzBuzzArray = fizzbuzz(value);
    expect(getLastValue(result)).toBe('FizzBuzz');
  });

  it('should return an array whose length equals to the given value number', () => {
    const value: number = 32;
    const result: FizzBuzzArray = fizzbuzz(value);
    const expected: FizzBuzzArray = [
      1,
      2,
      'Fizz',
      4,
      'Buzz',
      'Fizz',
      7,
      8,
      'Fizz',
      'Buzz',
      11,
      'Fizz',
      13,
      14,
      'FizzBuzz',
      16,
      17,
      'Fizz',
      19,
      'Buzz',
      'Fizz',
      22,
      23,
      'Fizz',
      'Buzz',
      26,
      'Fizz',
      28,
      29,
      'FizzBuzz',
      31,
      32
    ];
    expect(result).toEqual(expected);
  });
});

function getLastValue(result: FizzBuzzArray): number | string {
  return result[result.length - 1];
}
