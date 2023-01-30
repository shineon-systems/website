import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"

import { sheetlytics } from "./middleware/google-sheet.ts"
import osRouter from "./public/open-source/index.ts"

const server = new Peko.Server()
server.use(Peko.logger(console.log))
server.use(sheetlytics)
server.use(async (_, next) => {
  try { 
    return await next() 
  } catch(e) { 
    console.log(e) 
    return new Response("", { status: 500 })
  }
})

const files = await recursiveReaddir(fromFileUrl(new URL("./public", import.meta.url)))
const fileRoutes = files.map((file): Peko.Route => {
  const fileRoute = file.slice(Deno.cwd().length+8)
  return {
    route: `/${fileRoute}`,
    handler: Peko.staticHandler(new URL(`./public/${fileRoute}`, import.meta.url))
  }
})

server.addRoutes(fileRoutes)
server.addRoute("/", Peko.staticHandler(new URL(`./public/index.html`, import.meta.url)))
server.addRoute("/projects", Peko.staticHandler(new URL(`./public/projects/index.html`, import.meta.url)))
server.addRoutes(osRouter.routes)
server.addRoute("/dashboard", Peko.staticHandler(new URL(`./public/dashboard/index.html`, import.meta.url)))

server.listen()



