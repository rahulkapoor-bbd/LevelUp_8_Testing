const PercyScript = require('@percy/script');

async function captureSnapshots(page, percySnapshot) {

  await page.goto('https://escconf.com');

  await page.setViewport({ width: 20, height: 80 });
  await percySnapshot('Tick Tack Toe at 20x80');

  await page.setViewport({ width: 320, height: 480 });
  await percySnapshot('Tick Tack Toe at 320x480');

  await page.setViewport({ width: 768, height: 1024 });
  await percySnapshot('Tick Tack Toe at 768x1024');

  await page.setViewport({ width: 1080, height: 1920 });
  await percySnapshot('Tick Tack Toe at 1080x1920');

}

PercyScript.run(captureSnapshots);

module.exports = {
  captureSnapshots 
};
