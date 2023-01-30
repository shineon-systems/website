import { Middleware, Crypto } from "peko"

const gcloud = Deno.env.get("DENO_REGION")
  ? Deno.env.toObject() as { private_key: string }
  : (await import("../keys/shineponics-aab9d679a43d.json", {
    assert: { type: "json" },
  })).default;

const gCrypto = new Crypto(gcloud.private_key, { name: "RSA", hash: "SHA-256" })

let access_creds = { access_token: '' };
let service_jwt = ''
const service_payload = {
  "iss": "shineponics-deno@shineponics.iam.gserviceaccount.com",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "aud": "https://oauth2.googleapis.com/token",
  "exp": Date.now()/1000 + 3600,
  "iat": Date.now()/1000
}

export const sheetlytics: Middleware = async (ctx, next) => {
  await next()

  if (!access_creds.access_token || !service_jwt || service_payload.exp < Date.now()/1000) {
    service_payload.exp = Date.now()/1000 + 3600
    service_payload.iat = Date.now()/1000

    service_jwt = await gCrypto.sign(service_payload)

    const access_response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: JSON.stringify({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": service_jwt
      })
    })

    access_creds = await access_response.json()
  }

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/1syAwhZIr1LlYL9Z_Zg7KptgBhzLwWKvxKz42SwoUYIk/values/Requests!A1:E1:append?valueInputOption=USER_ENTERED`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    },
    body: JSON.stringify({
      "range": "Requests!A1:E1",
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