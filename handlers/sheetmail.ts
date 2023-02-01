import { Handler } from "peko"
import { getAccess } from "../utils/google-sheet.ts"

export const sheetmail: Handler = async (ctx) => {
  if (!Deno.env.get("DENO_REGION")) return new Response("Not in prod so email not written to sheet.")

  const data = await ctx.request.formData()
  const email = data.get("email")
  if (!data || !email) return new Response("No 'email' field in request FormData.", { status: 400 })

  const access_creds = await getAccess()

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1_6LKS9_xLO5AtQQB4saAaK2aI8tKS7OFB3r0HLjMSNw/values/Emails!A1:B1:append?valueInputOption=USER_ENTERED`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    },
    body: JSON.stringify({
      "range": "Emails!A1:B1",
      "majorDimension": "ROWS",
      "values": [
        [
          email,
          new Date().toISOString()
        ],
      ],
    })
  })

  return new Response("Thank you! Your email has successfully been added.")
}