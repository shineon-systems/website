import { html } from "../../utils/react-components.ts"

export default function Footer() {
  return html`
    <footer>
      <div class="container">
        <h2>Get in touch</h2>
        <p>Community leaders, please email to learn more about our projects and how we can work together.</p>
        <p>Organisations and individuals wanting to use our technologies, email or open an issue on GitHub.</p>
        <br />
        <div class="flex wrap full-width justify-around">
          <a href="mailto:hello@shineon.systems.org" class="highlighted"><p><strong>Email:</strong> hello@shineon.systems</p></a>
          <a href="https://github.com/shine-systems" class="highlighted"><p><strong>GitHub:</strong> shine-systems</p></a>  
        </div>
      </div>
    </footer>
  `
}