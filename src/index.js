// PageLens AI Visibility for any site behind Cloudflare (Wix, Squarespace, Framer, Webflow, Shopify, static hosting…).
// The Worker passes every request through unchanged and, for AI crawlers and assistants (GPTBot, ClaudeBot,
// ChatGPT-User…), reports the request to PageLens in the background. Human visitors are never sent.
const BOT = /bot|crawl|spider|GPT|Claude|Perplexity|Gemini|meta-external|MistralAI|GoogleOther/i;
const SKIP = /\.(?:js|css|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|map|json|xml|txt)$/i;

export default {
  async fetch(request, env, ctx) {
    const ua = request.headers.get('user-agent') || '';
    const url = new URL(request.url);
    if (env.PAGELENS_SITE_ID && BOT.test(ua) && !SKIP.test(url.pathname)) {
      ctx.waitUntil(fetch(`${env.PAGELENS_HOST || 'https://app.pagelens.io'}/api/crawl`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ site_id: env.PAGELENS_SITE_ID, user_agent: ua, path: url.pathname, ip: request.headers.get('CF-Connecting-IP') }),
      }).catch(() => {}));
    }
    return fetch(request);
  },
};
