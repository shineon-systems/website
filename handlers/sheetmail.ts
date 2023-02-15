import { Handler } from "peko"
import { getAccess } from "../utils/google-sheet.ts"

export const subscribe: Handler = async (ctx) => {
  // if (!Deno.env.get("DENO_REGION")) return new Response("Not in prod so email not subscribed to sheet.")

  const data = await ctx.request.formData()
  const email = data.get("email") as string
  if (!data || !email) return new Response("No 'email' field in request FormData.", { status: 400 })

  const access_creds = await getAccess()

  const sheetResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1_6LKS9_xLO5AtQQB4saAaK2aI8tKS7OFB3r0HLjMSNw/values/Emails`, {
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    }
  })
  const sheetData = await sheetResponse.json()
  const existingRow = (sheetData.values as string[][]).findIndex((row: string[]) => row.includes(email))
  if (existingRow > 0) return new Response(`Email: ${email} is already subscribed! :^)`)

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

  return new Response(`Email ${email} has successfully been subscribed. Welcome to the family!`)
}

export const unsubscribe: Handler = async (ctx) => {
  // if (!Deno.env.get("DENO_REGION")) return new Response("Not in prod so email not unsubscribed from sheet.")
  
  const email = new URL(ctx.request.url).searchParams.get("email")
  if (!email) return new Response("No 'email' param in request url.", { status: 400 })

  const access_creds = await getAccess()

  const sheetResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1_6LKS9_xLO5AtQQB4saAaK2aI8tKS7OFB3r0HLjMSNw/values/Emails`, {
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    }
  })
  const sheetData = await sheetResponse.json()
  const rowToClear = (sheetData.values as string[][]).findIndex((row: string[]) => row.includes(email))
  if (rowToClear < 0) return new Response(`Email: ${email} is not stored. You likely entered an incorrect email address or have already unsubscribed!`)
  
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1_6LKS9_xLO5AtQQB4saAaK2aI8tKS7OFB3r0HLjMSNw/values:batchClearByDataFilter`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    },
    body: JSON.stringify({
      "dataFilters": [
        {
          "a1Range": `Emails!A${rowToClear+1}`
        }
      ]
    })
  })

  return new Response(`Email: ${email} has been removed. Farewell traveller, we wish you pleasant surf.`)
}