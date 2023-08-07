import { html } from "../utils/react-components.ts"
import { Article } from "../types.ts"

import Head from "../components/Head.ts"
import Header from "../components/Header.ts"
import Newsletter from "../components/Newsletter.ts"
import Footer from "../components/Footer.ts"

export default function Source({ articles, article }: { articles?: Article[], article?: Article }) {
  return html`
    <${Head} pageName="Source"/>
    <body>
      <${Header} />

      <section id="main" class="grow">
        ${!article 
          ? html`<div id="content" class="container">
              <h1>Our technologies</h1>
              <div id="FOSS-tech" class="flex full-width justify-around wrap">
                ${articles && articles.map(({ title, slug, desc, imgs }) => html`<a href="/source/${slug}#main">
                  <div class="card">
                    <div class="card-img" dangerouslySetInnerHTML=${{ __html: imgs[0] ? imgs[0] : "no-image" }} />
                    
                    <div class="card-content">
                      <h2>${title}</h2>
                      <p>${desc}</p>
                    </div>
                  </div>
                </a>`)}
              </div>
            </div>`
          : html`<div id="content" class="container" dangerouslySetInnerHTML=${{ __html: html`${article.body}`}} />`
        }
        <br />
      </section> 

      <${Newsletter} />

      <${Footer} />
    </body>
  `
}
