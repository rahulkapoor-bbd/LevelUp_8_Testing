const PercyScript = require('@percy/script');

// Define your function to capture snapshots
async function captureSnapshots(page, percySnapshot) {
  // Set the viewport size for each snapshot

  await page.goto('https://d22wq9bg4uf9wu.cloudfront.net/');

  await page.setViewport({ width: 20, height: 80 });
  await percySnapshot('Tick Tack Toe at 20x80');

  await page.setViewport({ width: 320, height: 480 });
  await percySnapshot('Tick Tack Toe at 320x480');

  await page.setViewport({ width: 768, height: 1024 });
  await percySnapshot('Tick Tack Toe at 768x1024');

  await page.setViewport({ width: 1080, height: 1920 });
  await percySnapshot('Tick Tack Toe at 1080x1920');

  // Add more viewport sizes as needed
}

// Run your function using PercyScript
PercyScript.run(captureSnapshots);

module.exports = {
  captureSnapshots // Export your function if needed
};
