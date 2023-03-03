import * as Peko from "peko"
import { sheetlytics } from "./middleware/sheetlytics.ts"
import { 
  subscribe,
  unsubscribe
} from "./handlers/emailstore.ts"

import techRouter from "./public/technologies/index.ts"
import newsRouter from "./public/news/index.ts"

export const server = new Peko.Server()
server.use(async (_, next) => {
  try { 
    return await next() 
  } catch(e) { 
    console.log(e) 
    return new Response("", { status: 500 })
  }
})
server.use(Peko.logger(console.log))
server.use(sheetlytics)

server.addRoutes(await Peko.staticDir(new URL("./public", import.meta.url)))
server.addRoute("/", Peko.staticHandler(new URL(`./public/index.html`, import.meta.url)))
server.addRoute("/projects", Peko.staticHandler(new URL(`./public/projects/index.html`, import.meta.url)))
server.addRoutes(techRouter.routes)
server.addRoutes(newsRouter.routes)

server.addRoute("/subscribe", {
  method: "POST",
  handler: subscribe
})

server.addRoute("/unsubscribe", {
  method: "GET",
  handler: unsubscribe
})

server.listen()



