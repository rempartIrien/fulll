export type FizzBuzzArray = (string | number)[];

/**
 * Returns an array whose length equals to the given value. For a given index:
 *  - if index can be divided by 3, value is 'Fizz';
 *  - if index can be divided by 5, value is 'Buzz';
 *  - if index can be divided by both 3 and 5, value is 'FizzBuzz'.
 *
 * The given value needs to be strictly greater than 0 and an integer;
 * otherwise, thsis methods returns an empty array.
 * @param value The length of the returned array
 */
export function fizzbuzz(value: number): FizzBuzzArray {
  if (value > 0 && Number.isInteger(value)) {
    const result: FizzBuzzArray = [];
    let count: number = 1;
    while (count <= value) {
      result.push(getValue(count));
      ++count;
    }
    return result;
  }
  return [];
}

function getValue(value: number): string | number {
  const realValue: number = value;
  const isFizz: boolean = realValue % 3 === 0;
  const isBuzz: boolean = realValue % 5 === 0;
  if (isFizz && isBuzz) {
    return 'FizzBuzz';
  } else if (isFizz) {
    return 'Fizz';
  } else if (isBuzz) {
    return 'Buzz';
  } else {
    return value;
  }
}
