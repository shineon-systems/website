import { html } from "../utils/react-components.ts"
import { Article } from "../types.ts"

import Head from "../components/Head.ts"
import Header from "../components/Header.ts"
import Newsletter from "../components/Newsletter.ts"
import Footer from "../components/Footer.ts"

export default function News({ articles, article }: { articles?: Article[], article?: Article }) {
  return html`
    <${Head} pageName="News"/>
    <body>
      <${Header} />

      <section id="main" class="grow">
        ${!article 
          ? html`<div id="content" class="container">
              <h1>News</h1> 

              <div id="articles" class="flex full-width justify-around wrap">
                ${articles && articles
                  .sort((a,b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                  .map(({ title, slug, date, desc, imgs }) => html`
                  <a class="card wide-card" href="/news/${slug}#main">
                    <div class="card-img" dangerouslySetInnerHTML=${{ __html: imgs[0] }} />
                    
                    <div class="card-content">
                        <h2>${title}</h2>
                        <p>${date}</p>
                        <p>${desc}</p>
                    </div>
                  </a>`)}
              </div>
            </div>`
          : html`<div id="content" class="container" dangerouslySetInnerHTML=${{ __html: html`${article.body}`}} />`
        }
      </section> 

      <${Newsletter} />

      <${Footer} />
    </body>
  `
}