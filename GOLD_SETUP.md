# Gold portfolio

Gold is a tab in Mission Control at `/dashboard?tab=gold`. The old `/gold` URL
redirects there. One dashboard password and signed, HTTP-only session cookie
protect the dashboard and every `/api/gold-data` endpoint.

Gold entries, the current price, and price history live in the same Coolify
PostgreSQL database as the rest of the site. The app uses `DATABASE_URL` for
Gold and `DASHBOARD_DATABASE_URL` for Mission Control data. Coolify needs
`DASHBOARD_PASSWORD` and `DASHBOARD_SESSION_SECRET` for login.

The Coolify scheduled task `Gold Price Scraper` runs
`node scripts/scrape-gold-price.mjs` daily at 05:00 UTC. The database has a
separate daily backup schedule in Coolify. Those scheduled backups currently
stay on the VPS, so configure S3 storage for automatic offsite copies.
