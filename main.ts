import * as Peko from "@sejori/peko"
import { html } from "./utils/react-components.ts"
import { setupPublicRoutes } from "./utils/setup-public.ts"
import { renderToReadableStream } from "react-dom/server"
import { sheetlytics } from "./middleware/gcp-sheetlytics.ts"
import { getLatestFarmData } from "./middleware/gcp-farmsheet.ts"
import { 
  subscribe,
  unsubscribe
} from "./handlers/gcp-emailstore.ts"

import Home from "./src/pages/Home.ts"
import News from "./src/pages/News.ts"
import Farms from "./src/pages/Farms.ts"
import Source from "./src/pages/Source.ts"

// SETUP
export const router = new Peko.Router()
router.use(Peko.logger(console.log))
router.use(sheetlytics(Deno.env.get("sheetlytics_sheet_id") || ""))
router.use(async (_, next) => {
  try { 
    return await next() 
  } catch(e) { 
    console.log(e) 
    return new Response("", { status: 500 })
  }
})

// PAGES
const articles = await setupPublicRoutes(router)
router.get("/", Peko.ssr(() => renderToReadableStream(html`<${Home} />`)))

router.get("/farms", {
  middleware: getLatestFarmData(),
  handler: Peko.ssr((ctx) => renderToReadableStream(html`<${Farms} farms=${ctx.state.farms} />`))
})

router.get("/news", Peko.ssr(() => renderToReadableStream(html`<${News} articles=${articles.news} />`)))
articles.news?.forEach(article => router.get(`/news/${article.slug}`, Peko.ssr(() => renderToReadableStream(html`<${News} article=${article} />`))))

router.get("/source", Peko.ssr(() => renderToReadableStream(html`<${Source} articles=${articles.source} />`)))
articles.source?.forEach(article => router.get(`/source/${article.slug}`, Peko.ssr(() => renderToReadableStream(html`<${Source} article=${article} />`))))

router.get("/contact", Peko.ssr(() => renderToReadableStream(html`<${Home} />`)))

// APIS
router.post("/subscribe", subscribe("shineponics-mailing-list"))
router.post("/unsubscribe", unsubscribe("shineponics-mailing-list"))

// LISTENER
Deno.serve((req) => router.handle(req));



