import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { marky } from "marky"

const router = new Peko.Router()

const articles = await Promise.all((await recursiveReaddir(fromFileUrl(new URL("./articles", import.meta.url))))
  .filter(path => path.includes(".md"))
  .map(path => ({
    path,
    name: path.split("/")[path.split("/").length-2]
  })))

console.log(articles)

router.addRoute("/news", Peko.ssrHandler(async () => (await Deno.readTextFile(new URL("./index.html", import.meta.url)))
  .replace(
    /(?<=<div id="articles"(.)*?>)(.|\n)*?(?=<\/div>)/,
    (await Promise.all(articles.map(async article => {
      const content = marky(await Deno.readTextFile(article.path))
      const headings = /(?<=<h1(.)*?>)(.)*?(?=<\/h1>)/.exec(content)
      const imgs = /<img(.)*?>/.exec(content)
      const date = /(?<=<p id="date">)(.|\n)*?(?=<\/p>)/.exec(content)
      const desc = /(?<=<p id="desc">)(.|\n)*?(?=<\/p>)/.exec(content)
      
      return `<a class="card wide-card" href="/news/${article.name}#main">
        ${imgs ? imgs[0] : "no-image"}
        <div class="card-content">
          <h2>${headings ? headings[0] : "no-heading"}</h2>
          <p>${date ? date[0] : "no-desc"}</p>
          <p>${desc ? desc[0] : "no-desc"}</p>
        </div>
      </a>`
    }))).join("\n")
  )
))

articles.forEach(article => router.addRoute(
  `/news/${article.name}`, 
  Peko.ssrHandler(async () => {
    const content = marky(await Deno.readTextFile(article.path))
    return (await Deno.readTextFile(new URL("./index.html", import.meta.url))).replace(
      /(?<=<div id="content"(.)*>)(.|\n)*?(?=<\/div>)/,
      content
    )
  })
))

export default router