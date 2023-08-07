import { html } from "../utils/react-components.ts"
import Head from "../components/Head.ts"
import Header from "../components/Header.ts"
import Newsletter from "../components/Newsletter.ts"
import Footer from "../components/Footer.ts"
import { FarmData } from "../types.ts"

export default function Farms({ farms = [] }: { farms: FarmData[] }) {
  return html`
    <${Head} pageName="Farms"/>
    <body>
      <${Header} />

      <section id="main" class="grow">
        <div id="content" class="container">
          <h1>Operational smart farms</h1> 

          <div id="articles" class="flex full-width justify-around wrap">
            ${farms.map(farm => html`<div class="card">
              <img src=${farm.img} alt=${farm.name} />
              
              <div class="card-content">
                <h2>${farm.name}</h2>
                <p>${farm.desc}</p>
                <p>Latest data:</p>
                <ul>
                  ${farm.devices[0].sensors.map(sensor => {
                    return html`<li>${sensor.name}: ${sensor.value} ${sensor.unit}</li>`
                  })}
                  <li>Updated: ${farm.date.toLocaleString()}</li>
                </ul>
                <!-- <a href=${farm.link} class="highlighted"><p>Read more</p></a> -->
              </div>
            </div>`)}
          </div>
        </div>
      </section> 

      <${Newsletter} />

      <${Footer} />
    </body>
  `
}
