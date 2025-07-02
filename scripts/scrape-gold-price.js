const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');
// Used by GitHub Actions - Important - Do not Delete - Do not remove this comment
// Configuration
const GITHUB_OWNER = 'vishnuhimself';
const GITHUB_REPO = process.env.GOLD_DATA_REPO || 'gold-data';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'vishnu0923';
const GITHUB_DATA_KEY = 'gold-portfolio-data.json';

// Encryption functions (matching your goldStorage.ts)
function encrypt(data) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  return encrypted;
}

function decrypt(encryptedData) {
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Scrape 22K gold price from BankBazaar Coimbatore
async function scrapeGoldPrice() {
  try {
    console.log('🔍 Scraping 22K gold price from BankBazaar Coimbatore...');
    
    const response = await axios.get('https://www.bankbazaar.com/gold-rate-coimbatore.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Connection': 'keep-alive'
      },
      timeout: 15000, // 15 second timeout
      maxRedirects: 5 // Follow redirects
    });

    const $ = cheerio.load(response.data);
    console.log('📄 Page loaded, parsing HTML for 22K gold price...');
    
    // Look for the specific price element
    let goldPrice = null;
    
    // Method 1: Look for the exact structure
    $('h2').each((index, element) => {
      const headerText = $(element).text().trim();
      if (headerText.includes("Today's Gold Rate in Coimbatore")) {
        console.log('🎯 Found the gold rate section header');
        
        const container = $(element).parent();
        const priceElement = container.find('span').filter(function() {
          return $(this).text().includes('₹') && $(this).text().match(/[\d,]+/);
        }).first();
        
        if (priceElement.length > 0) {
          const priceText = priceElement.text().trim();
          console.log(`🔍 Found price element: "${priceText}"`);
          
          const priceMatch = priceText.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price: ${goldPrice}`);
          }
        }
      }
    });
    
    // Method 2: Alternative search patterns
    if (!goldPrice) {
      console.log('🔄 Trying alternative search patterns...');
      
      // Look for any element containing "₹" and "(22K)" and "gram"
      $('*').each(function() {
        const text = $(this).text();
        if (text.includes('₹') && text.includes('(22K)') && text.includes('gram')) {
          console.log(`🎯 Found potential 22K price text: "${text.trim()}"`);
          
          const priceMatch = text.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price: ${goldPrice}`);
            return false; // Break the loop
          }
        }
      });
    }
    
    // Method 3: Look for price in specific range
    if (!goldPrice) {
      console.log('🔄 Searching for price in typical 22K range...');
      
      $('*').each(function() {
        const text = $(this).text();
        // Look for price around 8000-10000 range with ₹ symbol
        const priceMatch = text.match(/₹\s*(9,0\d{2}|[89][0-9]{3})/);
        if (priceMatch) {
          goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
          console.log(`💰 Found potential 22K gold price: ₹${goldPrice}`);
          return false; // Break the loop
        }
      });
    }
    
    if (!goldPrice) {
      throw new Error('Could not find 22K gold price for Coimbatore on the page');
    }
    
    console.log(`💰 Successfully scraped 22K gold price: ₹${goldPrice.toLocaleString('en-IN')} per gram for Coimbatore`);
    return goldPrice;
    
  } catch (error) {
    console.error('❌ Error scraping gold price:', error.message);
    throw error;
  }
}

// Load existing data from GitHub
async function loadDataFromGitHub() {
  try {
    console.log('📥 Loading existing data from GitHub...');
    
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DATA_KEY}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    const encryptedData = Buffer.from(response.data.content, 'base64').toString();
    const decrypted = decrypt(encryptedData);
    const data = JSON.parse(decrypted);
    
    return {
      data,
      sha: response.data.sha
    };
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('📝 No existing data file found, will create new one');
      return {
        data: {
          entries: [],
          currentGoldPrice: 0,
          lastUpdated: new Date().toISOString()
        },
        sha: null
      };
    }
    throw error;
  }
}

// Save updated data to GitHub
async function saveDataToGitHub(data, sha) {
  try {
    console.log('💾 Saving updated data to GitHub...');
    
    const encrypted = encrypt(JSON.stringify(data));
    const base64Content = Buffer.from(encrypted).toString('base64');
    
    const requestBody = {
      message: `Auto-update gold price to ₹${data.currentGoldPrice.toLocaleString('en-IN')} - ${new Date().toISOString()}`,
      content: base64Content,
    };
    
    if (sha) {
      requestBody.sha = sha;
    }
    
    const response = await axios.put(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_DATA_KEY}`,
      requestBody,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('✅ Data successfully saved to GitHub');
    return true;
    
  } catch (error) {
    console.error('❌ Error saving to GitHub:', error.response?.data || error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting gold price update process...');
    console.log('📅 Current time (UTC):', new Date().toISOString());
    console.log('📅 Current time (IST):', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    
    // Scrape current gold price
    const newGoldPrice = await scrapeGoldPrice();
    
    // Load existing data
    const { data, sha } = await loadDataFromGitHub();
    
    // Check if price has changed
    if (data.currentGoldPrice === newGoldPrice) {
      console.log('📊 Gold price unchanged, no update needed');
      return;
    }
    
    console.log(`📈 Price change detected: ₹${data.currentGoldPrice} → ₹${newGoldPrice}`);
    
    // Update the price and timestamp
    data.currentGoldPrice = newGoldPrice;
    data.lastUpdated = new Date().toISOString();
    data.priceHistory = data.priceHistory || [];
    
    // Add to price history
    data.priceHistory.push({
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      price: newGoldPrice,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 365 days of price history
    data.priceHistory = data.priceHistory.slice(-365);
    
    // Save updated data
    await saveDataToGitHub(data, sha);
    
    console.log('🎉 Gold price update completed successfully!');
    
  } catch (error) {
    console.error('💥 Fatal error in main process:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 