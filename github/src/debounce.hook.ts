import { useEffect, useState } from 'react';

/**
 * Debounces a bunch of values and returns the last one after the given delay.
 * @param value The new value to returned after given delay.
 * @param delay Time in milliseconds
 * @returns
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer: number = setTimeout(
      () => setDebouncedValue(value),
      delay
    ) as unknown as number;
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
