import { Middleware } from "peko"
import { getAccess } from "../utils/gcp-access.ts"

export const sheetlytics = (sheetId: string): Middleware => async (ctx, next) => {
  await next()

  const access_creds = await getAccess("https://www.googleapis.com/auth/spreadsheets")

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Requests!A1:F1:append?valueInputOption=USER_ENTERED`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    },
    body: JSON.stringify({
      "range": "Requests!A1:F1",
      "majorDimension": "ROWS",
      "values": [
        [
          new Date().toISOString(),
          ctx.request.url,
          Deno.env.get("DENO_REGION"),
          ctx.request.headers.get("referer"),
          ctx.request.headers.get("accept-language"),
          ctx.request.headers.get("user-agent")
        ],
      ],
    })
  })
}