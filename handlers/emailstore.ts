import { Handler } from "peko"
import { getAccess } from "../utils/gcp.ts"

export const subscribe: Handler = async (ctx) => {
  // if (!Deno.env.get("DENO_REGION")) return new Response("Not in prod so email not subscribed to sheet.")

  const data = await ctx.request.formData()
  const email = data.get("email") as string
  if (!data || !email) return new Response("No 'email' field in request FormData.", { status: 400 })

  const access_creds = await getAccess()
  const existingRes = await fetch(`https://storage.googleapis.com/storage/v1/b/shineponics-mailing-list/o/${email}`, {
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    }
  })
  const existingData = await existingRes.json()
  if (existingData.id) return new Response(`Email: ${email} is already subscribed! :^)`)

  const res = await fetch(`https://storage.googleapis.com/upload/storage/v1/b/shineponics-mailing-list/o?name=${email}&uploadType=media`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    }
  })
  console.log(res)
  console.log(await res.json())

  return new Response(`Email ${email} has successfully been subscribed. Welcome to the family!`)
}

export const unsubscribe: Handler = async (ctx) => {
  // if (!Deno.env.get("DENO_REGION")) return new Response("Not in prod so email not unsubscribed from sheet.")
  
  const email = new URL(ctx.request.url).searchParams.get("email")
  if (!email) return new Response("No 'email' param in request url.", { status: 400 })

  const access_creds = await getAccess()
  const deleteRes = await fetch(`https://storage.googleapis.com/storage/v1/b/shineponics-mailing-list/o/${email}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + access_creds.access_token
    }
  })
  console.log(deleteRes)

  return new Response(`Email: ${email} has been removed. Farewell traveller, we wish you pleasant surf.`)
}