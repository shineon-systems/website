import { html } from "../../utils/react.utils.ts"

export default function Header() {
  return html`
    <header>
      <div class="header-img">
        <a href="/" class="flex column align-center justify-center">
          <img src="/public/icons/leaf_white.svg" alt="Logo" />
          <h1>Shineon Systems</h1>
          <p>smart food sovereignty</p>
        </a>
      </div>
    </header>

    <nav>
      <ul class="container flex wrap justify-around">
        <li><a href="/">home</a></li>
        <li><a href="/source#main">source code</a></li>
        <li><a href="/news#main">news</a></li>
        <li><a href="#newsletter">contact</a></li>
      </ul>
    </nav>
  `
}
