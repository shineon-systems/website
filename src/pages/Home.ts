import { html } from "../../utils/react-components.ts"
import Head from "../components/Head.ts"
import Header from "../components/Header.ts"
import Footer from "../components/Footer.ts"
import Newsletter from "../components/Newsletter.ts"

export default function Home() {
  return html`
    <${Head} pageName="" />
    <body>
      <${Header} />

      <section id="main">
        <div class="container">
          <h1>Welcome</h1>
          <p>Our mission is to empower people with food. We work with communities to design and build smart farming systems that grow nutritious produce all year round with minimal maintenance and cost.</p>
          <p>By combining permaculture design with modern vertical farming technologies and a holistic approach to agriculture, we can improve food security, public health and enhance the beauty and biodiversity of our urban spaces. All while reducing dependence on destructive industrial practise.</p>
          <p>All of our technology is open-source and we are committed to making a positive impact in the communities we serve. This is achieved by using locally-sourced and recycled materials, designing to minimise waste and energy consumption and helping to create meaningful work and social hubs.</p>
          <p>Everyone deserves access to friendly, healthy food and it shouldn't come at the cost of the planet. Let's make that happen!</p>

          <div class="flex wrap justify-around">
            <a class="cta highlighted" href="/projects">Smart farm projects</a>
            <a class="cta highlighted" href="/open-source">Open-source technologies</a>
            <a class="cta highlighted" href="/news">Newsletters</a>
          </div>
        </div>
      </section>

      <section id="partners">
        <div class="container">
          <h2>Partners and supporters</h2>
          <div class="flex justify-around">
            <a target="_blank" href="https://codeworks.me/" class="partner flex column align-center">
              <img src="https://avatars.githubusercontent.com/u/20823973?s=200&v=4" alt="Codeworks" />
              <h4>Codeworks</h4>
            </a>
            <!-- <div class="partner flex column align-center">
              <img src="assets/icons/leaf_white.svg" alt="Cognitant">
              <p>Cognitant</p>
            </div>
            <div class="partner flex column align-center">
              <img src="assets/icons/leaf_white.svg" alt="Permablitz">
              <p>Permablitz</p>
            </div>
            <div class="partner flex column align-center">
              <img src="assets/icons/leaf_white.svg" alt="Lewisham council">
              <p>Lewisham council</p>
            </div>
            <div class="partner flex column align-center">
              <img src="assets/icons/leaf_white.svg" alt="Urban farm-it">
              <p>Urban farm-it</p>
            </div> -->
          </div>
        </div>
      </section>

      <${Newsletter} />
      
      <${Footer} />
    </body>
  `
}
