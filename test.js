const puppeteer = require('puppeteer');

async function testCrawl(url) {
    const browser = await puppeteer.launch({
        headless: false, // Set to false so you can see what happens
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    try {
        console.log(`Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for the page to load the product list section
        await page.waitForSelector('.s-main-slot', { timeout: 30000 }); // Keep or adjust the selector

        // Wait for some time to allow dynamic content to load
        await page.waitForTimeout(5000); // Wait for 5 seconds (adjust as needed)

        console.log('Page loaded successfully and product elements are visible');

        // Extract product URLs (Update the selector if necessary)
        const productUrls = await page.$$eval('a.s-link-style', links => {
            return links.map(link => link.href);
        });

        console.log(`Found ${productUrls.length} product links`);

        // Close the browser after scraping
        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error.message);
        await browser.close();
    }
}

// Run the test with a URL
const url = 'https://www.amazon.com/s?k=laptops'; // Change this to your URL
testCrawl(url);
