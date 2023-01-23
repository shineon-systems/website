import { Middleware } from "https://deno.land/x/peko@1.4.1/mod.ts"

const gcloud = Deno.env.get("DENO_REGION")
  ? Deno.env.toObject() as { "sheet_id": string, client_email: string, private_key: string }
  : (await import("../keys/gcloud.json", {
    assert: { type: "json" },
  })).default;
console.log(gcloud);

// need to generate a JWT for google cloud here...

const URL = `https://sheets.googleapis.com/v4/spreadsheets/${gcloud.sheet_id}/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED`

export const sheetlytics: Middleware = async (ctx, next) => {
  await next()

  return fetch(URL, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + gcloud.private_key
    },
    body: JSON.stringify({
      "range": "Page_views!A1:E1",
      "majorDimension": "ROWS",
      "values": [
        [
          ctx.request.url,
          Deno.env.get("DENO_REGION"),
          ctx.request.headers.get("referer"),
          ctx.request.headers.get("user-agent"),
          ctx.request.headers.get("accept-language")
        ],
      ],
    })
  })
}