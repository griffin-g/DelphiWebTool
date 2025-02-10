const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Helper function to pause the script
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTest() {
  // Configure Chrome to suppress unwanted prompts
  let options = new chrome.Options();
  options.addArguments(
    "--no-default-browser-check",
    "--no-first-run",
    "--disable-default-apps",
    "--disable-infobars"
  );

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Open the target webpage
    await driver.get("https://example.com"); // Change this URL to the site you want to test

    // Wait for an element to load
    await driver.wait(
      until.elementLocated(By.className("sample-class")),
      10000
    );
    console.log('Found element with class "sample-class".');

    // Generic wait for 6 seconds to handle any dynamic content
    await sleep(6000);

    // Wait for the button to be clickable
    await driver.wait(until.elementLocated(By.id("sample-button")), 10000);

    // Re-locate the button to ensure it’s still in the DOM
    let button = await driver.findElement(By.id("sample-button"));
    console.log("Button located:", button);

    // Click the button
    await button.click();
    console.log("Button clicked successfully.");

    // Wait for the next page or action to load
    await driver.wait(until.urlContains("new-page"), 10000);
    console.log("Navigation to new page was successful.");
  } catch (error) {
    console.error("Error during the test:", error);
  } finally {
    // Always close the browser
    await driver.quit();
  }
}

runTest();
