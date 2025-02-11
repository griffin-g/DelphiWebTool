const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

// Helper function to pause the script
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const url = "http://localhost:5173";

// profileCreateLogIn.test.js

(async function profileCreateLogInTests() {
  console.log("Starting the Selenium test...");

  // Configure Chrome to suppress unwanted prompts
  let options = new chrome.Options();
  options.addArguments(
    "--no-default-browser-check",
    "--no-first-run",
    "--disable-default-apps",
    "--start-maximized"
  );

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    console.log("Navigating to sign-up page...");
    await driver.get(url + "/about-us");
    await driver.findElement(By.id("sign-up")).click();
    await sleep(5000);

    console.log("Filling out the sign-up form...");
    await driver.findElement(By.name("first_name")).sendKeys("selenium");
    await driver.findElement(By.name("last_name")).sendKeys("test");
    await driver
      .findElement(By.name("email"))
      .sendKeys("seleniumtest@gmail.com");
    await driver.findElement(By.name("password_hash")).sendKeys("password123");
    await driver.findElement(By.name("submit")).click();

    console.log("Sign-up completed. Proceeding to login...");

    // Test login
    await driver.get(url + "/login");
    await driver
      .findElement(By.name("email"))
      .sendKeys("seleniumtest@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("password123");
    await driver.findElement(By.name("submit")).click();

    console.log("Waiting for login confirmation...");
    let successMessage = await driver.wait(
      until.elementLocated(By.id("logout")),
      10000
    );
    assert.strictEqual(await successMessage.getText(), "Logout");

    console.log(
      "✅ Test completed successfully! User was created and logged in."
    );
  } catch (error) {
    console.error("❌ Error during the test:", error);
  } finally {
    console.log("Closing browser...");
    await driver.quit();
  }
})();
