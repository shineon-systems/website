import { html } from "../utils/react-components.ts"
import Head from "../components/Head.ts"
import Header from "../components/Header.ts"
import Newsletter from "../components/Newsletter.ts"
import Footer from "../components/Footer.ts"

export default function Farms() {
  return html`
    <${Head} pageName="Farms"/>
    <body>
      <${Header} />

      <section id="main" class="grow">
        <div class="container">
          <h1>Under construction - come back soon!</h1>
          <p>Subscribe your email below and we'll let you know when the first farm project launches :^)</p>
          <p>You'll be able to see live metrics from farm systems right here... :o</p>
        </div>
      </section> 

      <${Newsletter} />

      <${Footer} />
    </body>
  `
}
