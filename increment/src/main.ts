import { Digit, increment } from './increment';

const commandArgs: string[] = process.argv.slice(2);

try {
  const value: number[] = JSON.parse(commandArgs[0]);
  console.log(`Increment result for ${String(value)}`);
  const result: Digit[] = increment(value);
  console.log(result);
} catch (e) {
  console.error(`Cannot parse ${String(commandArgs)}`);
}
