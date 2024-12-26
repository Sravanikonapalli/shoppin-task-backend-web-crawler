const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the HTML page (index.html)
app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

// Crawl route that handles the POST request
app.post('/crawl', async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Crawling URL: ${url}`);
        const browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        
        // Add random User-Agent for better scraping simulation (useful if the site detects bots)
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        await page.setUserAgent(userAgent);
        
        console.log('Navigating to URL...');
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        // Wait for the selector to ensure the page content is loaded
        await page.waitForSelector('.s-main-slot', { timeout: 30000 });

        const productUrls = await page.$$eval('.s-main-slot a.s-link-style', links => links.map(link => link.href));

        await browser.close();

        if (productUrls.length === 0) {
            return res.status(404).json({ error: 'No product URLs found.' });
        }

        res.json({ productUrls: productUrls, urlHistory: [{ url: url, success: true }] });

    } catch (error) {
        console.error('Error crawling the website:', error.message);
        console.error(error.stack);
        res.status(500).json({ error: 'Failed to crawl the website. Please try again.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
