import { Crypto } from "peko";

const gcloud = Deno.env.get("DENO_REGION")
  ? Deno.env.toObject() as { private_key: string }
  : (await import("../keys/shineponics-aab9d679a43d.json", {
    assert: { type: "json" },
  })).default;
const gCrypto = new Crypto(gcloud.private_key, { name: "RSA", hash: "SHA-256" })

const service_payload = {
  "iss": "shineponics-deno@shineponics.iam.gserviceaccount.com",
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "aud": "https://oauth2.googleapis.com/token",
  "exp": Date.now()/1000 + 3600,
  "iat": Date.now()/1000
}

let access_creds = { access_token: '', dob: 0, expires_in: 0 };

export const getAccess = async () => {
  if (access_creds.access_token && Date.now() < access_creds.dob + access_creds.expires_in * 1000) {
    return access_creds
  }

  service_payload.exp = Date.now()/1000 + 3600
  service_payload.iat = Date.now()/1000

  const service_jwt = await gCrypto.sign(service_payload)

  const access_response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify({
      "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "assertion": service_jwt
    })
  })

  access_creds = await access_response.json()

  return access_creds
}