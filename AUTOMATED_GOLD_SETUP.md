# Automated Gold Price Scraping Setup

This guide will help you set up automatic 22K gold price scraping for Coimbatore from bankbazaar.com that runs daily at 10:30 AM IST.

## Overview

The system includes:
- **Manual refresh**: Button in your gold tracking page to get current prices immediately
- **Automated scraping**: GitHub Actions workflow that runs daily at 10:30 AM IST
- **Price history**: Tracks price changes over time

## Setup Instructions

### 1. Create a GitHub Repository for Data Storage

1. Go to GitHub and create a new **private** repository named `gold-data`
2. This will store your encrypted gold portfolio data

### 2. Set Up GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Gold Data Access"
4. Set expiration to "No expiration" or a long period
5. Select these scopes:
   - `repo` (Full control of private repositories)
6. Copy the token (you won't see it again!)

### 3. Configure Environment Variables

#### For Local Development (Manual Refresh):
Add to your `.env.local` file:
```
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

#### For GitHub Actions (Automatic Scraping):
1. Go to your **main project repository** (HeyVish)
2. Go to Settings → Secrets and variables → Actions
3. Add these secrets:
   - `GITHUB_TOKEN`: Your personal access token (already exists, use that)
   - `ENCRYPTION_KEY`: `vishnu0923` (or change this to a stronger password)

4. Add these variables (if needed):
   - `GOLD_DATA_REPO`: `gold-data` (the repository name for storing data)

### 4. Test the Setup

#### Test Manual Refresh:
1. Go to your gold tracking page
2. Click the "Refresh Price" button
3. It should fetch the current gold price from goodreturns.in

#### Test GitHub Actions:
1. Go to your repository's Actions tab
2. Find the "Gold Price Scraper" workflow
3. Click "Run workflow" to test it manually
4. Check the logs to see if it works

### 5. Verify Automatic Scheduling

The workflow is scheduled to run at:
- **5:00 AM UTC** = **10:30 AM IST**
- Runs every day automatically

You can check if it's working by:
1. Looking at the Actions tab for successful runs
2. Checking your gold-data repository for automatic commits
3. Seeing updated prices in your gold tracking page

## How It Works

### Manual Refresh
```
User clicks "Refresh Price" 
→ Calls /api/gold-price endpoint
→ Scrapes 22K gold price for Coimbatore from bankbazaar.com
→ Updates price in your gold tracking page
→ Saves to GitHub repository
```

### Automatic Daily Updates
```
GitHub Actions runs at 10:30 AM IST
→ Scrapes bankbazaar.com for 22K gold price in Coimbatore
→ Loads existing data from GitHub
→ Compares with current price
→ Updates data if price changed
→ Saves back to GitHub with price history
```

### Data Storage
- All data is encrypted using AES encryption
- Stored in your private GitHub repository
- Includes price history for tracking trends
- Accessible only with your GitHub token

## Troubleshooting

### Manual Refresh Not Working
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_GITHUB_TOKEN` is set correctly
3. Ensure the GitHub token has `repo` permissions
4. Check if goodreturns.in is accessible

### GitHub Actions Failing
1. Go to Actions tab and check the logs
2. Common issues:
   - GitHub token expired or invalid
   - Repository permissions incorrect
   - Website structure changed (selectors need updating)

### Price Not Updating
1. Check if the website structure changed
2. Look at the GitHub Actions logs for parsing errors
3. The scraper looks for: `.gold-each-container` with "22K Gold" text

## Customization

### Change Schedule
Edit `.github/workflows/gold-price-scraper.yml`:
```yaml
schedule:
  # Change this cron expression
  - cron: '0 5 * * *'  # Currently 5 AM UTC = 10:30 AM IST
```

### Change Website or Selectors
Edit `scripts/scrape-gold-price.js` and `app/api/gold-price/route.ts` to modify:
- Target URL
- CSS selectors
- Price parsing logic

### Add More Data
You can extend the system to:
- Track multiple cities
- Store additional metadata
- Add notifications for price changes
- Create price alerts

## Security Notes

- All data is encrypted before storage
- GitHub repository should be private
- Keep your GitHub token secure
- Never commit tokens to your code

## Files Created

- `.github/workflows/gold-price-scraper.yml` - GitHub Actions workflow
- `scripts/scrape-gold-price.js` - Scraping script for GitHub Actions
- `scripts/test-scraper.js` - Local testing script
- `app/api/gold-price/route.ts` - API endpoint for manual refresh
- Updated `lib/goldStorage.ts` - Added price history support
- Updated `app/gold/page.tsx` - Added refresh button

## Testing Commands

Test the scraper locally:
```bash
# Install dependencies
npm install axios cheerio

# Test the BankBazaar scraper (recommended)
node scripts/test-bankbazaar-scraper.js

# Test via API endpoint
curl http://localhost:3000/api/gold-price
```

The BankBazaar scraper successfully gets the exact 22K gold price for Coimbatore (currently ₹9,065 per gram). 