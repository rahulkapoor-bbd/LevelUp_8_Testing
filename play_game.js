const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.setBinaryPath('C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe');

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

driver.get('http://localhost:5000')

// Find the element with a specific class
// Find the element with a specific class
const targetClass = 'game--container'; // Replace with the actual class name
driver.findElement(webdriver.By.className(targetClass)).then((element) => {
    element.findElements(webdriver.By.css("div")).then(async (cells) => {
        const elements = await Promise.all(cells);
        // Player 1 win
        cells[0].click()
        cells[1].click()
        cells[3].click()
        cells[4].click()
        cells[6].click()
        cells[8].click()

        let resetButton = await driver.findElement(webdriver.By.className("game--restart"))
        resetButton.click();

        // Player 2 win
        cells[1].click()
        cells[0].click()
        cells[4].click()
        cells[3].click()
        cells[8].click()
        cells[6].click()

        resetButton.click();

        cells[0].click()
        cells[3].click()
        cells[1].click()
        cells[2].click()
        cells[6].click()
        cells[7].click()
        cells[5].click()
        cells[4].click()
        cells[8].click()

    }).catch((error) => {
        console.error(`Error finding inner div elements: ${error}`);
    });
}).catch((error) => {
    console.error(`Error finding element with class ${targetClass}: ${error}`);
});


