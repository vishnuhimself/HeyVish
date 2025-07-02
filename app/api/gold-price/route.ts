import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    console.log('📡 API: Scraping 22K gold price from BankBazaar Coimbatore...');
    
    // Scrape BankBazaar for Coimbatore 22K gold price
    const response = await fetch('https://www.bankbazaar.com/gold-rate-coimbatore.html', {
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
      cache: 'no-store', // Don't cache the request
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    console.log('📄 API: Page loaded, parsing HTML for 22K gold price...');
    
    // Look for the specific price element containing "₹ 9,065/ 1 gram (22K)"
    let goldPrice = null;
    
    // Method 1: Look for the exact structure you provided
    $('h2').each((index, element) => {
      const headerText = $(element).text().trim();
      if (headerText.includes("Today's Gold Rate in Coimbatore")) {
        console.log('🎯 Found the gold rate section header');
        
        // Look for the price in the next sibling or parent container
        const container = $(element).parent();
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
        }
      }
    });
    
    // Method 2: Alternative search - look for any element containing the price pattern
    if (!goldPrice) {
      console.log('🔄 Trying alternative search method...');
      
      $('*').each(function() {
        const text = $(this).text();
        // Look for pattern like "₹ 9,065/ 1 gram (22K)" or similar
        if (text.includes('₹') && text.includes('(22K)') && text.includes('gram')) {
          console.log(`🎯 Found potential 22K price text: "${text.trim()}"`);
          
          const priceMatch = text.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price from alternative method: ${goldPrice}`);
            return false; // Break the loop
          }
        }
      });
    }
    
    // Method 3: Look for the specific class structure
    if (!goldPrice) {
      console.log('🔄 Trying class-based search...');
      
      $('.white-space-nowrap, .whitespace-nowrap').each(function() {
        const text = $(this).text().trim();
        if (text.includes('₹') && text.match(/[\d,]+/)) {
          console.log(`🎯 Found potential price in class: "${text}"`);
          
          const priceMatch = text.match(/₹\s*([\d,]+)/);
          if (priceMatch) {
            goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            console.log(`💰 Extracted price from class: ${goldPrice}`);
            return false; // Break the loop
          }
        }
      });
    }
    
    // Method 4: Broad search for any price that looks like the target
    if (!goldPrice) {
      console.log('🔄 Trying broad search for price patterns...');
      
      $('*').each(function() {
        const text = $(this).text();
        // Look for price around 9000-10000 range with ₹ symbol
        const priceMatch = text.match(/₹\s*(9,0\d{2}|9[0-9]{3})/);
        if (priceMatch) {
          goldPrice = parseInt(priceMatch[1].replace(/,/g, ''));
          console.log(`💰 Found potential 22K gold price: ₹${goldPrice}`);
          return false; // Break the loop
        }
      });
    }
    
    if (!goldPrice) {
      console.error('❌ API: Could not find 22K gold price for Coimbatore');
      return NextResponse.json(
        { success: false, error: 'Could not find 22K gold price for Coimbatore on the page' },
        { status: 500 }
      );
    }
    
    console.log(`✅ API: Successfully scraped 22K gold price: ₹${goldPrice} for Coimbatore`);
    
    return NextResponse.json({
      success: true,
      price: goldPrice,
      karat: '22K',
      currency: 'INR',
      unit: 'gram',
      city: 'Coimbatore',
      timestamp: new Date().toISOString(),
      source: 'bankbazaar.com'
    });
    
  } catch (error) {
    console.error('💥 API Error scraping gold price:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 