import { sleep } from './sleep.js';

export async function blink(gpioPort) {
  await gpioPort.write(1);
  await sleep(1000);
  await gpioPort.write(0);
  await sleep(1000);
}

export { sleep };
