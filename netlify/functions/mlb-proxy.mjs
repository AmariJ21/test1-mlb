export async function handler(event) {
  try {
    const endpoint = event.queryStringParameters.endpoint;

    if (!endpoint) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing endpoint parameter"
        })
      };
    }

    const url = `https://statsapi.mlb.com/api/v1${endpoint}`;

    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
        "Cache-Control": "public, max-age=60"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
