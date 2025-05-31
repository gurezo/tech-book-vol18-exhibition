import { blink } from './gpio.js';
import { blinkNeoPixel } from './i2c.js';

async function main() {
  blink();
  blinkNeoPixel();
}

main();
