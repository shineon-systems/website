import * as Peko from "https://deno.land/x/peko@1.4.1/mod.ts"
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"

import osRouter from "./public/open-source/index.ts"

// import { sheetlytics } from "./middleware/google-sheet.ts"

const server = new Peko.Server()
server.use(Peko.logger(console.log))
// server.use(async (_, next) => {
//   try { 
//     return await next() 
//   } catch(e) { 
//     console.log(e) 
//     return new Response("", { status: 500 })
//   }
// })

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
// server.addRoute("/open-source", Peko.staticHandler(new URL(`./public/open-source/index.html`, import.meta.url)))
server.addRoutes(osRouter.routes)
server.addRoute("/dashboard", Peko.staticHandler(new URL(`./public/dashboard/index.html`, import.meta.url)))

server.listen()



