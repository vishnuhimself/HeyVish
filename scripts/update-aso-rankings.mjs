import postgres from "postgres";

const SEARCH_DELAY_MS = 3_250; // Apple's Search API allows roughly 20 requests/minute.
const MAX_ATTEMPTS = 4;
const dryRun = process.argv.includes("--dry-run");
const sampleArg = process.argv.find((arg) => arg.startsWith("--sample="));
const sampleSize = sampleArg ? Number(sampleArg.split("=")[1]) : null;

if (sampleArg && (!dryRun || !Number.isInteger(sampleSize) || sampleSize < 1)) {
  throw new Error("--sample=N requires --dry-run and a positive integer");
}

const connectionString = process.env.DASHBOARD_DATABASE_URL;
if (!connectionString) throw new Error("DASHBOARD_DATABASE_URL is not configured");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function searchApps(keyword) {
  const url = new URL("https://itunes.apple.com/search");
  url.search = new URLSearchParams({
    term: keyword,
    country: "us",
    entity: "software",
    limit: "50",
  }).toString();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
      if (response.ok) {
        const body = await response.json();
        if (!Array.isArray(body.results)) throw new Error("Invalid Search API response");
        return body.results;
      }

      if (response.status !== 429 && response.status < 500) {
        throw new Error(`Search API returned HTTP ${response.status}`);
      }
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`Search API returned HTTP ${response.status} after ${attempt} attempts`);
      }

      const retryAfter = Number(response.headers.get("retry-after"));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(retryAfter * 1_000, 120_000)
        : 4_000 * 2 ** (attempt - 1));
    } catch (error) {
      if (attempt === MAX_ATTEMPTS || /Search API returned HTTP 4\d\d/.test(error.message)) {
        throw error;
      }
      await sleep(4_000 * 2 ** (attempt - 1));
    }
  }

  throw new Error("Search API attempts exhausted");
}

async function main() {
  const sql = postgres(connectionString, { max: 1, idle_timeout: 20 });
  try {
    const keywords = await sql`
      SELECT k.id AS keyword_id, k.keyword, a.bundle_id
      FROM keywords k
      JOIN apps a ON a.id = k.app_id
      ORDER BY k.id
    `;
    const selected = sampleSize ? keywords.slice(0, sampleSize) : keywords;
    if (selected.length === 0) throw new Error("No tracked keywords found");

    const rankings = [];
    for (const [index, item] of selected.entries()) {
      if (index > 0) await sleep(SEARCH_DELAY_MS);
      const results = await searchApps(item.keyword);
      const resultIndex = results.findIndex((app) => app.bundleId === item.bundle_id);
      rankings.push({
        keywordId: item.keyword_id,
        found: resultIndex !== -1,
        position: resultIndex === -1 ? null : resultIndex + 1,
      });
      console.log(`Searched ${index + 1}/${selected.length}: ${item.keyword}`);
    }

    const date = new Date().toISOString().slice(0, 10);
    const found = rankings.filter((ranking) => ranking.found).length;
    if (dryRun) {
      console.log(`Dry run: ${found}/${rankings.length} keywords found on ${date}; no rows written`);
      return;
    }

    await sql.begin(async (transaction) => {
      for (const ranking of rankings) {
        await transaction`
          INSERT INTO rankings (keyword_id, date, position, found)
          VALUES (${ranking.keywordId}, ${date}, ${ranking.position}, ${ranking.found})
          ON CONFLICT (keyword_id, date)
          DO UPDATE SET position = EXCLUDED.position, found = EXCLUDED.found
        `;
      }
    });
    console.log(`Saved ${rankings.length} rankings for ${date}; ${found} found`);
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(`ASO ranking update failed: ${error.message}`);
  process.exitCode = 1;
});
