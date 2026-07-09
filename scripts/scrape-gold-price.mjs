// Scrapes the 22K gold price (Coimbatore) and writes it to Neon Postgres.
// Used by GitHub Actions - Important - Do not Delete - Do not remove this comment
//
// Run locally with:
//   node --env-file=.env.local scripts/scrape-gold-price.mjs
import axios from "axios";
import * as cheerio from "cheerio";
import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error("❌ No DATABASE_URL / POSTGRES_URL found in environment.");
  process.exit(1);
}

const sql = neon(connectionString);

// Scrape 22K gold price from BankBazaar Coimbatore
async function scrapeGoldPrice() {
  console.log("🔍 Scraping 22K gold price from BankBazaar Coimbatore...");

  const response = await axios.get(
    "https://www.bankbazaar.com/gold-rate-coimbatore.html",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      timeout: 15000,
      maxRedirects: 5,
    }
  );

  const $ = cheerio.load(response.data);
  console.log("📄 Page loaded, parsing HTML for 22K gold price...");

  let goldPrice = null;

  // Method 1: exact section structure
  $("h2").each((_index, element) => {
    const headerText = $(element).text().trim();
    if (headerText.includes("Today's Gold Rate in Coimbatore")) {
      const container = $(element).parent();
      const priceElement = container
        .find("span")
        .filter(function () {
          return (
            $(this).text().includes("₹") && !!$(this).text().match(/[\d,]+/)
          );
        })
        .first();

      if (priceElement.length > 0) {
        const priceMatch = priceElement.text().trim().match(/₹\s*([\d,]+)/);
        if (priceMatch) {
          goldPrice = parseInt(priceMatch[1].replace(/,/g, ""), 10);
        }
      }
    }
  });

  // Method 2: any element mentioning 22K + gram
  if (!goldPrice) {
    $("*").each(function () {
      const text = $(this).text();
      if (text.includes("₹") && text.includes("(22K)") && text.includes("gram")) {
        const priceMatch = text.match(/₹\s*([\d,]+)/);
        if (priceMatch) {
          goldPrice = parseInt(priceMatch[1].replace(/,/g, ""), 10);
          return false;
        }
      }
    });
  }

  // Method 3: typical 22K price range
  if (!goldPrice) {
    $("*").each(function () {
      const priceMatch = $(this).text().match(/₹\s*(9,0\d{2}|[89][0-9]{3})/);
      if (priceMatch) {
        goldPrice = parseInt(priceMatch[1].replace(/,/g, ""), 10);
        return false;
      }
    });
  }

  if (!goldPrice) {
    throw new Error("Could not find 22K gold price for Coimbatore on the page");
  }

  console.log(
    `💰 Scraped 22K gold price: ₹${goldPrice.toLocaleString("en-IN")} per gram (Coimbatore)`
  );
  return goldPrice;
}

async function main() {
  try {
    console.log("🚀 Starting gold price update process...");
    console.log("📅 UTC:", new Date().toISOString());

    const newGoldPrice = await scrapeGoldPrice();

    // Read the current stored price.
    const metaRows = await sql`
      SELECT current_gold_price FROM gold_meta WHERE id = 1
    `;
    const currentPrice = metaRows[0]
      ? Number(metaRows[0].current_gold_price)
      : 0;

    if (currentPrice === newGoldPrice) {
      console.log("📊 Gold price unchanged, no update needed");
      return;
    }

    console.log(`📈 Price change: ₹${currentPrice} → ₹${newGoldPrice}`);

    const now = new Date();
    const day = now.toISOString().slice(0, 10);

    // Ensure the meta row exists, then update it.
    await sql`
      INSERT INTO gold_meta (id, current_gold_price, last_updated)
      VALUES (1, ${newGoldPrice}, ${now.toISOString()})
      ON CONFLICT (id) DO UPDATE
      SET current_gold_price = EXCLUDED.current_gold_price,
          last_updated = EXCLUDED.last_updated
    `;

    // Record daily price history (one row per day).
    await sql`
      INSERT INTO gold_price_history (date, price, timestamp)
      VALUES (${day}, ${newGoldPrice}, ${now.toISOString()})
      ON CONFLICT (date) DO UPDATE
      SET price = EXCLUDED.price, timestamp = EXCLUDED.timestamp
    `;

    console.log("🎉 Gold price update completed successfully!");
  } catch (error) {
    console.error("💥 Fatal error:", error.message || error);
    process.exit(1);
  }
}

main();
