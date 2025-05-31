import { requestGPIOAccess } from './node_modules/node-web-gpio/dist/index.js';
import { requestI2CAccess } from './node_modules/node-web-i2c/index.js';

import { blink } from './gpio.js';
import { blinkNeoPixel } from './i2c.js';

async function main() {
  const gpioAccess = await requestGPIOAccess();
  const gpioPort = gpioAccess.ports.get(26);
  await gpioPort.export('out');

  const i2cAccess = await requestI2CAccess();
  const i2cPort = i2cAccess.ports.get(1);
  const npix = await initNeoPixel(i2cPort);

  for (;;) {
    blink(gpioPort);
    blinkNeoPixel(npix);
  }
}

main();
