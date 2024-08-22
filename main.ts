import * as Peko from "@sejori/peko";
import { renderToReadableStream } from "react-dom/server";

import { githubHandler } from "./handlers/github.handler.ts";
import { html } from "./utils/react.utils.ts";
import { setupArticleData } from "./utils/article.utils.ts";
import articlesData from "./articles/index.json" assert { type: "JSON" };

import Home from "./src/pages/Home.ts";
import Source from "./src/pages/Source.ts";
import News from "./src/pages/News.ts";
import { getMimeType } from "./utils/mimeType.utils.ts";

// SETUP
export const router = new Peko.Router();
router.use(Peko.logger(console.log));
router.use(async (_, next) => {
  try {
    return await next();
  } catch (e) {
    console.log(e);
    return new Response("", { status: 500 });
  }
});

// PUBLIC ASSETS
router.get("/public/:p1/:p2", async (ctx) => {
  const path = [ctx.params.p1, ctx.params.p2].filter(Boolean).join("/");
  return githubHandler(`public/${path}`, getMimeType(path))(ctx);
});
router.get("/public/:p1", async (ctx) =>
  githubHandler(`public/${ctx.params.p1}`, getMimeType(ctx.params.p1))(ctx)
);

// PAGES
router.get(
  "/",
  Peko.ssr(() => renderToReadableStream(html`<${Home} />`))
);
const articles = setupArticleData(articlesData);
console.log(articles);

router.get(
  "/source",
  Peko.ssr(() =>
    renderToReadableStream(html`<${Source} articles=${articles.source} />`)
  )
);
articles.source.forEach((article) =>
  router.get(
    `/source/${article.slug}`,
    Peko.ssr(() =>
      renderToReadableStream(html`<${Source} article=${article} />`)
    )
  )
);

router.get(
  "/news",
  Peko.ssr(() =>
    renderToReadableStream(html`<${News} articles=${articles.news} />`)
  )
);
articles.news.forEach((article) =>
  router.get(
    `/news/${article.slug}`,
    Peko.ssr(() => renderToReadableStream(html`<${News} article=${article} />`))
  )
);

router.get(
  "/contact",
  Peko.ssr(() => renderToReadableStream(html`<${Home} />`))
);

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
