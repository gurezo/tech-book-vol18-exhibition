import NPIX from '@chirimen/neopixel-i2c';
import { sleep } from './gpio.js';
import { requestI2CAccess } from './node_modules/node-web-i2c/index.js';

const neoPixels = 7;

export async function initNeoPixel() {
  const i2cAccess = await requestI2CAccess();
  const port = i2cAccess.ports.get(1);
  const npix = new NPIX(port, 0x41);
  await npix.init(neoPixels);
  return npix;
}

export async function nPixTest1(npix) {
  await npix.setGlobal(10, 0, 0);
  await sleep(200);
  await npix.setGlobal(0, 10, 0);
  await sleep(200);
  await npix.setGlobal(0, 0, 10);
  await sleep(200);
  await npix.setGlobal(0, 20, 20);
  await sleep(200);
  await npix.setGlobal(20, 0, 20);
  await sleep(200);
  await npix.setGlobal(20, 20, 0);
  await sleep(200);
  await npix.setGlobal(20, 20, 20);
  await sleep(200);
  await npix.setGlobal(0, 0, 0);
}

export async function setPattern(npix, pattern) {
  const grbArray = [];
  for (const color of pattern) {
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    grbArray.push(g);
    grbArray.push(r);
    grbArray.push(b);
  }
  await npix.setPixels(grbArray);
}

export async function nPixTest2(npix, patterns) {
  for (let i = 0; i <= 7; i++) {
    await setPattern(npix, patterns[`pattern${i}`]);
    await sleep(200);
  }
}

export async function nPixTest3(npix, pattern) {
  for (let i = 0; i < 30; i++) {
    const spattern = [];
    for (let px = 0; px < pattern.length; px++) {
      const pp = (i + px) % pattern.length;
      spattern.push(pattern[pp]);
    }
    console.log(spattern);
    await setPattern(npix, spattern);
    await sleep(200);
  }
}
