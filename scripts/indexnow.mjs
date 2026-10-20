// Tells Bing, Yandex and other IndexNow engines about every page in the
// sitemap, so new and changed pages are crawled within hours instead of weeks.
// Bing's index also feeds ChatGPT search and Copilot.
//
// Usage (after the real domain is live):  npm run indexnow
// Optional: SITE=https://www.manasgeotextile.com npm run indexnow

const KEY = "8c4c56f1598ebcf26fcc2de6debe3dbe"; // also served at /8c4c56f1598ebcf26fcc2de6debe3dbe.txt
const SITE = (process.env.SITE ?? "https://www.manasgeotextile.com").replace(/\/$/, "");

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
