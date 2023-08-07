import { html } from "../utils/react-components.ts"

export default function Newsletter() {
  return html`
    <section id="newsletter" class="flex column align-center">
      <div class="container cta">
        <form method="post" action="/subscribe">
          <label>
            <h3>Subscribe to news on our technologies and smart farms.</h3>
            <p>Maximum of one email per week. Zero marketing BS.</p>
            <input id="email" name="email" type="email" required size="30" />
          </label>
          <input type="submit" value="Subscribe" />
          <button id="unsubscribe">Unsubscribe</button>
          <script>
            const unsubBtn = document.querySelector("#unsubscribe")
            const emailIpt = document.querySelector("#email")
            unsubBtn.addEventListener("click", (e) => {
              e.preventDefault()
              window.location.href = "/unsubscribe?email=" + emailIpt.value
            })
          </script>
        </form>
      </div>
      <br />
    </section>
  `
}