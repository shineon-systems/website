import * as Peko from "peko"
import { marky } from "marky"
import { Article } from "../types.ts"

export const setupPublicRoutes = async (router: Peko.Router) => {
  const articles: Record<string, Article[]> = {}

  router.addRoutes(await Peko.routesFromDir(new URL("../public", import.meta.url), async (path, url) => {
    if (path.includes("articles") && path.includes(".md")) {
      const pathBits = path.split("/")
      const page = pathBits[pathBits.indexOf("articles")+1]
      const content = marky(await Deno.readTextFile(url.pathname))
  
      const headings =  /(?<=<h1(.)*?>)(.)*?(?=<\/h1>)/.exec(content)
      const imgs = /<img(.)*?>/.exec(content)
      const date = /(?<=<h4 id="date">)(.|\n)*?(?=<\/h4>)/.exec(content)
      const desc = /(?<=<p id="desc">)(.|\n)*?(?=<\/p>)/.exec(content)
      const article = {
        title: headings ? headings[0] : "",
        slug: pathBits[pathBits.indexOf("articles")+2],
        date: date ? date[0] : "no-date",
        desc: desc ? desc[0] : "no-desc",
        body: content,
        imgs: imgs ? Array.from(imgs) : [],
      }
  
      articles[page] = articles[page]
        ? [ ...articles[page], article]
        : [ article ]
    }
  
    return { path, handler: Peko.staticHandler(url) }
  }))

  return articles
}