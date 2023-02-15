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

router.addRoute("/news", Peko.ssrHandler(async () => {
  const HTML = await Deno.readTextFile(new URL("./index.html", import.meta.url))
  
  const content = await Promise.all(articles.map(async article => ({
    ...article,
    content: marky(await Deno.readTextFile(article.path))
  })))
  
  const cardData = content.map(article => {
    const headings =  /(?<=<h1(.)*?>)(.)*?(?=<\/h1>)/.exec(article.content)
    const imgs = /<img(.)*?>/.exec(article.content)
    const date = /(?<=<h4 id="date">)(.|\n)*?(?=<\/h4>)/.exec(article.content)
    const desc = /(?<=<p id="desc">)(.|\n)*?(?=<\/p>)/.exec(article.content)

    return {
      ...article,
      heading: headings ? headings[0] : "no-heading",
      img: imgs ? imgs[0] : "",
      date: date ? date[0] : "no-date",
      desc: desc ? desc[0] : "no-desc"
    }
  })
  
  const cardHTML = cardData
    .sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .map(article => `<a class="card wide-card" href="/news/${article.name}#main">
      ${article.img}
      <div class="card-content">
        <h2>${article.heading}</h2>
        <p>${article.date}</p>
        <p>${article.desc}</p>
      </div>
    </a>`)
    .join("\n")

  return HTML.replace(
    /(?<=<div id="articles"(.)*?>)(.|\n)*?(?=<\/div>)/,
    cardHTML
  )
}))

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