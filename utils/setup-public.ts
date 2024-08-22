import fs from "fs/promises"

export async function setupPublic() {
  const publicFiles = await fs.readdir("public")
  console.log(publicFiles);
}

setupPublic();

//     if (path.includes("articles") && path.includes(".md")) {
//       const pathBits = path.split("/")
//       const page = pathBits[pathBits.indexOf("articles")+1]
//       const content = marky(await (await fetch(url.pathname)).text())
  
//       const headings =  /(?<=<h1(.)*?>)(.)*?(?=<\/h1>)/.exec(content)
//       const imgs = /<img(.)*?>/.exec(content)
//       const date = /(?<=<h4 id="date">)(.|\n)*?(?=<\/h4>)/.exec(content)
//       const desc = /(?<=<p id="desc">)(.|\n)*?(?=<\/p>)/.exec(content)
//       const article = {
//         title: headings ? headings[0] : "",
//         slug: pathBits[pathBits.indexOf("articles")+2],
//         date: date ? date[0] : "no-date",
//         desc: desc ? desc[0] : "no-desc",
//         body: content,
//         imgs: imgs ? Array.from(imgs) : [],
//       }
  
//       articles[page] = articles[page]
//         ? [ ...articles[page], article]
//         : [ article ]
//     }
  
//     return { path, handler: Peko.file(url) }
//   }))

//   return articles
// }