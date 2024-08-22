import { html } from "../../utils/react-components.ts"

export default function Newsletter() {
  return html`
    <section id="newsletter" class="flex column align-center">
      <div class="container cta">
        <form method="post">
          <label>
            <h3>Subscribe to news on our technologies and smart farms.</h3>
            <p>Maximum of one email per week. Zero marketing BS.</p>
            <input id="email" name="email" type="email" required size="30" />
          </label>
          <input type="submit" formaction="/subscribe" value="Subscribe" />
          <input type="submit" formaction="/unsubscribe" value="Unsubscribe" />
        </form>
      </div>
      <br />
    </section>
  `
}