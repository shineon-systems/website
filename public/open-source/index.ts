import * as Peko from "peko"
import { recursiveReaddir } from "recursiveReadDir"
import { fromFileUrl } from "fromFileUrl"
import { marky } from "marky"

const router = new Peko.Router()

const HTML = await Deno.readTextFile(new URL("./index.html", import.meta.url))
const articles = await Promise.all((await recursiveReaddir(fromFileUrl(new URL("./", import.meta.url))))
  .filter(path => path.includes(".md"))
  .map(async path => ({
    path,
    name: path.slice(`${Deno.cwd()}/public/open-source`.length+1).slice(0, -3),
    content: marky(await Deno.readTextFile(path))
  })))

router.addRoute("/open-source", Peko.ssrHandler(() => HTML.replace(
  /(?<=<div id="FOSS-tech"(.)*>)(.|\n)*?(?=<\/div>)/,
  articles.map(article => {
    const imgs = /<img (.)*>/.exec(article.content)
    const desc = /<p id="desc">(.|\n)*?<\/p>/.exec(article.content)
    const date = /<p id="date">(.|\n)*?<\/p>/.exec(article.content)
    return `<a href="/open-source/${article.name}">
      <div class="card">
        ${imgs ? imgs[0] : "no-image"}
        <div class="card-content">
          <h3>${article.name}</h3>
          ${date ? date[0] : "no-date"}
          ${desc ? desc[0] : "no-desc"}
        </div>
      </div
    </a>`
  }).join("\n")
)))

articles.forEach(article => router.addRoute(
  `/open-source/${article.name}`, 
  Peko.ssrHandler(() => HTML.replace(
    /(?<=<div id="content"(.)*>)(.|\n)*?(?=<\/div>)/,
    article.content
  ))
))

export default router