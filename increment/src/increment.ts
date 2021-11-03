export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Returns an array of digits that corresponds to the given array of digits but
 * with the last element incremented by 1. If this element is 9, then it
 * becomes 0 and the previous element is increment by 1. If we encounter
 * the same situation, the behavior is the same but with its previous element.
 * In case all elements become 0, preprends the returned array with 1.
 *
 * This functions reproduces a basic addition.
 * @param value
 * @returns
 */
export function increment(value: number[]): Digit[] {
  if (checkValue(value)) {
    const results: Digit[] = value
      .reverse()
      .reduce(
        ({ array, add }, cur) => {
          const tmpITem: Digit | 10 = (cur + add) as Digit | 10;
          if (isTen(tmpITem)) {
            const newItem: Digit = tmpITem === 10 ? 0 : tmpITem;
            return { array: array.concat(newItem), add: 1 };
          } else {
            return { array: array.concat(tmpITem), add: 0 };
          }
        },
        { array: [] as Digit[], add: 1 }
      )
      .array.reverse();
    return onlyZeros(results) ? [1 as Digit].concat(results) : results;
  }
  return [];
}

function checkValue(value: number[]): value is Digit[] {
  return value.every(
    (item) => Number.isInteger(item) && item > -1 && item < 10
  );
}

function isTen(value: Digit | 10): value is 10 {
  return value === 10;
}

function onlyZeros(value: Digit[]): boolean {
  return value.every((item) => item === 0);
}
