import * as Peko from "https://deno.land/x/peko@1.3.5/mod.ts"
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"

const server = new Peko.Server()

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

server.listen()



