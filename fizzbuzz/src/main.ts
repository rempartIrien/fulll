import { FizzBuzzArray, fizzbuzz } from './fizzbuzz';

const commandArgs: string[] = process.argv.slice(2);

try {
  const value: number = parseInt(commandArgs[0], 10);
  console.log(`FizzBuzz result for ${value}`);
  const result: FizzBuzzArray = fizzbuzz(value);
  console.log(result);
} catch (e) {
  console.error(`Cannot parse ${String(commandArgs)}`);
}
