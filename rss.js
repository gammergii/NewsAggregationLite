export async function handler(event) {
  const url = (event.queryStringParameters && event.queryStringParameters.url) || "";
  if (!url) return { statusCode: 400, body: "Missing ?url=" };
  try {
    const res = await fetch(url, { headers: { "User-Agent": "NewsAggregationLite/1.0 (+https://netlify.app)" } });
    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (e) {
    return { statusCode: 502, body: "Fetch failed: " + (e && e.message ? e.message : String(e)) };
  }
}