const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

driver.get('http://localhost:8080')

// Find the element with a specific class
// Find the element with a specific class
const targetClass = 'game--container'; // Replace with the actual class name
driver.findElement(webdriver.By.className(targetClass)).then((element) => {
    element.findElements(webdriver.By.css("div")).then(async (cells) => {
        const elements = await Promise.all(cells);
        // Player 1 win
        click(elements,0,1,3,4,6,8)

        let resetButton = await driver.findElement(webdriver.By.className("game--restart"))
        resetButton.click();
        
        // Player 2 win
        click(elements,1,0,4,3,2,6)
        resetButton.click();

        //Draw
        click(elements,0,3,1,2,6,7,5,4,8)

    }).catch((error) => {
        console.error(`Error finding inner div elements: ${error}`);
    });
}).catch((error) => {
    console.error(`Error finding element with class ${targetClass}: ${error}`);
});

function click(cells, x1,o1,x2,o2,x3,o3,x4=-1,o4=-1,x5=-1){
  cells[x1].click()
  cells[o1].click()
  cells[x2].click()
  cells[o2].click()
  cells[x3].click()
  cells[o3].click()
  if(x4===-1){
    return
  }
  cells[x4].click()
  cells[o4].click()
  cells[x5].click()
}
