import { html } from "../../utils/react.utils.ts"

export default function Head({ pageName }: { pageName: string }) {
  return html`
    <head>
      <title>${`Shineon Systems${pageName ? " | " + pageName : ""}`}</title>
      <meta charset="utf-8" />
      <meta name="description" content="smart food sovereignty" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" href="/public/icons/favicon.png" type="image/png" />
      <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Bellota:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/public/style.css" />
    </head>
  `
}
