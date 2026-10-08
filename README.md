# PageLens AI Visibility — Cloudflare Worker

See which AI crawlers and assistants (GPTBot, ClaudeBot, ChatGPT-User, PerplexityBot…) read your site in [PageLens](https://pagelens.io/features/ai-traffic-analytics) — on any site whose domain runs through Cloudflare, including Wix, Squarespace, Framer, Webflow and Shopify.

AI bots don't run JavaScript, so no analytics script sees them. This Worker passes every request through unchanged and reports bot requests to PageLens in the background. Human visitors are never sent.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alibaizhanov/pagelens-cloudflare-worker)

## Setup

1. Click **Deploy to Cloudflare** above.
2. Set the `PAGELENS_SITE_ID` variable to your site ID (PageLens → Site Settings).
3. In the Worker → **Settings → Domains & Routes → Add route**: `example.com/*` (and `www.example.com/*`), with your zone.
4. In PageLens open **AI Visibility → Check connection**.

Your domain must be proxied through Cloudflare (orange cloud). The free plan is enough.

## What is sent

For bot requests only: the site ID, user agent, path (no query string) and the visitor IP, used only to look up the country and never stored.

MIT License.
