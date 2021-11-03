import { increment } from './increment';

describe('increment', () => {
  it('should exist', () => {
    expect(increment).toBeDefined();
  });

  it('should return an array', () => {
    expect(Array.isArray(increment([]))).toBeTruthy();
  });

  it('should return an empty array if some items of the given value are not digits', () => {
    expect(increment([10, 3, 4])).toEqual([]);
    expect(increment([-1, 3, 8])).toEqual([]);
    expect(increment([1, 3, -8])).toEqual([]);
    expect(increment([1, 3, Math.PI])).toEqual([]);
    expect(increment([1, 3, 8.4])).toEqual([]);
  });

  it('should return an array with the last item incremented by 1', () => {
    expect(increment([1, 3, 0])).toEqual([1, 3, 1]);
    expect(increment([1, 3, 4])).toEqual([1, 3, 5]);
    expect(increment([1, 3, 8])).toEqual([1, 3, 9]);
  });

  it('should return an array whose items are incremented is next items was 9 and is now 0', () => {
    expect(increment([3, 1, 5, 9])).toEqual([3, 1, 6, 0]);
    expect(increment([3, 1, 9, 9])).toEqual([3, 2, 0, 0]);
  });

  it('should return an array with one more element if all items equalled to 9', () => {
    expect(increment([9])).toEqual([1, 0]);
    expect(increment([9, 9])).toEqual([1, 0, 0]);
    expect(increment([9, 9, 9])).toEqual([1, 0, 0, 0]);
    expect(increment([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 0]);
  });
});
