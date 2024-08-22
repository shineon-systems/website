import * as Peko from "@sejori/peko"
import { html } from "./utils/react-components.ts"
import { setupPublic } from "./utils/setup-public.ts"
import { renderToReadableStream } from "react-dom/server"
// import { 
//   subscribe,
//   unsubscribe
// } from "./handlers/gcp-emailstore.ts"

import Home from "./src/pages/Home.ts"
import Source from "./src/pages/Source.ts"
import News from "./src/pages/News.ts"
import { githubHandler } from "./handlers/github.handler.ts"

// SETUP
export const router = new Peko.Router()
router.use(Peko.logger(console.log))
router.use(async (_, next) => {
  try { 
    return await next() 
  } catch(e) { 
    console.log(e) 
    return new Response("", { status: 500 })
  }
})

// PAGES
// const articles = await setupPublicRoutes(router)
router.get("/public/:p1/:p2/:p3/:p4", (ctx) => {
  const path = [ctx.params.p1, ctx.params.p2, ctx.params.p3, ctx.params.p4].filter(Boolean).join("/")
  return githubHandler(path)(ctx)
});
router.get("/", (ctx) => {
  setupPublic()
  return Peko.ssr(() => renderToReadableStream(html`<${Home} />`))(ctx)
})

// router.get("/source", Peko.ssr(() => renderToReadableStream(html`<${Source} articles=${articles.source} />`)))
// articles.source?.forEach(article => router.get(`/source/${article.slug}`, Peko.ssr(() => renderToReadableStream(html`<${Source} article=${article} />`))))

// router.get("/news", Peko.ssr(() => renderToReadableStream(html`<${News} articles=${articles.news} />`)))
// articles.news?.forEach(article => router.get(`/news/${article.slug}`, Peko.ssr(() => renderToReadableStream(html`<${News} article=${article} />`))))

router.get("/contact", Peko.ssr(() => renderToReadableStream(html`<${Home} />`)))

// APIS
// router.post("/subscribe", subscribe("shineponics-mailing-list"))
// router.post("/unsubscribe", unsubscribe("shineponics-mailing-list"))

// LISTENER
export default {
  fetch(request: Request, env: Record<string, string>) {
    router.middleware.unshift((ctx) => {
      ctx.state.env = env;
    });
    return router.handle(request);
  },
};

console.log("Cloudflare Worker running Shineon Systems with Peko <3");


