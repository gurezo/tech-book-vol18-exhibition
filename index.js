import { blink } from './gpio.js';
import { initNeoPixel, nPixTest1, nPixTest2, nPixTest3 } from './i2c.js';
import * as patterns from './patterns.js';

async function main() {
  const npix = await initNeoPixel();

  await nPixTest1(npix);
  await nPixTest2(npix, patterns);
  await nPixTest3(npix, patterns.pattern4);

  await npix.setGlobal(0, 0, 0);

  blink();
}

main();
