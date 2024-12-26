const puppeteer = require('puppeteer');

const userAgentList = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    // Add more user agents as needed
];

function getRandomUserAgent() {
    return userAgentList[Math.floor(Math.random() * userAgentList.length)];
}

async function crawlWebsite(url) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 50,
    });

    const page = await browser.newPage();
    const randomUserAgent = getRandomUserAgent();
    console.log(`Using User-Agent: ${randomUserAgent}`);
    await page.setUserAgent(randomUserAgent);

    try {
        console.log(`Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        await page.waitForSelector('body', { timeout: 30000 });
        console.log('Page loaded successfully');

        await page.waitForTimeout(Math.floor(Math.random() * 5000) + 2000);

        const productUrls = await page.$$eval('a.s-pagination-item, a.s-product-image-link, a[href^="http"]', links => {
            return links.map(link => link.href).filter(href => href.includes('http'));
        });

        await browser.close();
        return Array.from(new Set(productUrls));

    } catch (error) {
        console.error(`Error crawling the URL: ${url}`);
        console.error(error.message);
        await browser.close();
        return []; // Return an empty array if crawling fails
    }
}

module.exports = { crawlWebsite };
