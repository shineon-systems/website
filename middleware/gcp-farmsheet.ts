import { Middleware } from "peko"
import { getAccess } from "../utils/gcp-access.ts"
import { FarmData } from "../types.ts"

export const getLatestFarmData = (farms: FarmData[]): Middleware => async (ctx) => {
  const access_creds = await getAccess("https://www.googleapis.com/auth/spreadsheets")

  await Promise.all(farms.map(async (farm) => {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${farm.sheetID}`, {
      headers: {
        "Authorization": "Bearer " + access_creds.access_token
      }
    })

    const data = await res.json()
    const firstSheet = data.sheets[0].properties.title
    const lastRow = data.sheets[0].properties.gridProperties.rowCount
    const sheetRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${farm.sheetID}/values/${firstSheet}!A${lastRow}:B${lastRow}`, {
      headers: {
        "Authorization": "Bearer " + access_creds.access_token
      }
    })

    const sheetData = await sheetRes.json()
    farm.date = new Date(sheetData.values[0][0])
    farm.devices = JSON.parse(sheetData.values[0][1])
  }))

  ctx.state.farms = farms
}