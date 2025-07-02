const axios = require('axios');
const cheerio = require('cheerio');

// Test the BankBazaar scraping approach
async function testBankBazaarScraping() {
  try {
    console.log('🚀 Testing BankBazaar scraping for 22K gold price in Coimbatore...');
    console.log('📅 Current time:', new Date().toISOString());
    
    console.log('🔍 Scraping from BankBazaar...');
    
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

    console.log('✅ Page request successful!');
    console.log('📄 Response status:', response.status);
    console.log('📄 Page size:', response.data.length, 'characters');
    
    const $ = cheerio.load(response.data);
    console.log('📄 HTML parsed successfully');
    
    // Look for the specific price element
    let goldPrice = null;
    
    console.log('\n🔍 Method 1: Looking for header "Today\'s Gold Rate in Coimbatore"...');
    $('h2').each((index, element) => {
      const headerText = $(element).text().trim();
      console.log(`   H2 ${index + 1}: "${headerText}"`);
      
      if (headerText.includes("Today's Gold Rate in Coimbatore")) {
        console.log('🎯 Found the gold rate section header!');
        
        const container = $(element).parent();
        console.log('   Container HTML:', container.html()?.substring(0, 200) + '...');
        
        const priceElement = container.find('span').filter(function() {
          return $(this).text().includes('₹') && !!$(this).text().match(/[\d,]+/);
        }).first();
        
        if (priceElement.length > 0) {
          const priceText = priceElement.text().trim();
          console.log(`🔍 Found price element: "${priceText}"`);
          
          const priceMatch = priceText.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price: ${goldPrice}`);
          }
        } else {
          console.log('   No price element found in container');
        }
      }
    });
    
    // Method 2: Alternative search patterns
    if (!goldPrice) {
      console.log('\n🔄 Method 2: Searching for elements containing "₹", "(22K)", and "gram"...');
      
      let found = false;
      $('*').each(function(index) {
        const text = $(this).text();
        if (text.includes('₹') && text.includes('(22K)') && text.includes('gram')) {
          console.log(`🎯 Found potential match ${index}: "${text.trim().substring(0, 100)}"`);
          
          const priceMatch = text.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price: ${goldPrice}`);
            found = true;
            return false; // Break the loop
          }
        }
      });
      
      if (!found) {
        console.log('   No matching elements found');
      }
    }
    
    // Method 3: Look for specific classes
    if (!goldPrice) {
      console.log('\n🔄 Method 3: Searching for price in specific classes...');
      
      const classesToCheck = ['.white-space-nowrap', '.whitespace-nowrap', '[class*="nowrap"]'];
      
      for (const selector of classesToCheck) {
        console.log(`   Checking selector: ${selector}`);
        $(selector).each(function(index) {
          const text = $(this).text().trim();
          if (text.includes('₹') && text.match(/[\d,]+/)) {
            console.log(`🎯 Found potential price in ${selector}: "${text}"`);
            
            const priceMatch = text.match(/₹\s*([\d,]+)/);
            if (priceMatch) {
              goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
              console.log(`💰 Extracted price from class: ${goldPrice}`);
              return false; // Break the loop
            }
          }
        });
        
        if (goldPrice) break;
      }
    }
    
    // Method 4: Look for price in typical range
    if (!goldPrice) {
      console.log('\n🔄 Method 4: Broad search for prices in 22K gold range...');
      
      $('*').each(function(index) {
        const text = $(this).text();
        // Look for price around 8000-10000 range with ₹ symbol
        const priceMatch = text.match(/₹\s*(9,0\d{2}|[89][0-9]{3})/);
        if (priceMatch) {
          const price = parseInt(priceMatch[1].replace(/,/g, ''));
          console.log(`🎯 Found potential price: ₹${price} in element: "${text.trim().substring(0, 50)}"`);
          
          if (price >= 8000 && price <= 10000) {
            goldPrice = price;
            console.log(`💰 Accepted price: ${goldPrice}`);
            return false; // Break the loop
          }
        }
      });
    }
    
    // Method 5: Debug - show all elements containing ₹
    if (!goldPrice) {
      console.log('\n🔍 Debug: All elements containing ₹ symbol...');
      
      $('*').each(function(index) {
        const text = $(this).text().trim();
        if (text.includes('₹') && text.length < 100) {
          console.log(`   ${index}: "${text}"`);
        }
      });
    }
    
    if (!goldPrice) {
      throw new Error('Could not find 22K gold price for Coimbatore on the page');
    }
    
    console.log(`\n🎉 SUCCESS: Found 22K gold price for Coimbatore: ₹${goldPrice.toLocaleString('en-IN')} per gram`);
    console.log(`📅 Scraped at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
    
    return goldPrice;
    
  } catch (error) {
    console.error('❌ Error testing BankBazaar scraping:', error.message);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Status Text: ${error.response.statusText}`);
      if (error.response.status === 403) {
        console.error('   🚫 403 Forbidden - BankBazaar may be blocking automated requests');
      }
    } else if (error.request) {
      console.error('   No response received from server');
    } else {
      console.error('   Request setup error:', error.message);
    }
    
    throw error;
  }
}

// Run the test
console.log('🚀 Starting BankBazaar scraping test...');

testBankBazaarScraping()
  .then(price => {
    console.log(`\n✨ Test completed successfully!`);
    console.log(`   22K gold price in Coimbatore: ₹${price.toLocaleString('en-IN')}`);
    console.log(`\n📝 Notes:`);
    console.log(`   - This scrapes the exact 22K gold price for Coimbatore`);
    console.log(`   - Data source: bankbazaar.com`);
    console.log(`   - More reliable than generic gold APIs`);
    console.log(`   - Specific to your location (Coimbatore)`);
  })
  .catch(error => {
    console.log(`\n💥 Test failed:`, error.message);
    process.exit(1);
  }); 