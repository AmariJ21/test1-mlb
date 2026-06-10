export async function handler(event) {
  try {
    const path = event.path.replace(/^\/api\/mlb/, '');
    const query = event.rawQuery ? `?${event.rawQuery}` : '';
    const url = `https://statsapi.mlb.com${path}${query}`;

    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Cache-Control': 'public, max-age=60'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
