import { html } from "../utils/react-components.ts"

export default function Footer() {
  return html`
    <footer>
      <div class="container">
        <h3>Get in touch</h3>
        <p>Community leaders, please email to learn more about our projects and how we can work together.</p>
        <p>Organisations and individuals wanting to use our technologies, email or open an issue on GitHub.</p>
        <br />
        <div class="flex wrap full-width justify-around">
          <a href="mailto:hello@shineponics.org"><p><strong>Email:</strong> hello@shineponics.org</p></a>
          <a href="https://github.com/shine-systems"><p><strong>GitHub:</strong> shine-systems</p></a>  
        </div>
      </div>
    </footer>
  `
}