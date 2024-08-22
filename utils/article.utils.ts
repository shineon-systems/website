type Article = {
  title: string;
  slug: string;
  date: string;
  desc: string;
  body: string;
  imgs: string[];
};

export function setupArticleData(inputData: Record<string, string>) {
  const articles: Record<string, Article[]> = {
    source: [],
    news: [],
  };

  Object.entries(inputData).forEach(async (entry) => {
    const pathBits = entry[0].split("/");
    const page = pathBits[pathBits.indexOf("articles") + 1];
    const content = entry[1]

    const headings = /(?<=<h1(.)*?>)(.)*?(?=<\/h1>)/.exec(content);
    const imgs = /<img(.)*?>/.exec(content);
    const date = /(?<=<h4 id="date">)(.|\n)*?(?=<\/h4>)/.exec(content);
    const desc = /(?<=<p id="desc">)(.|\n)*?(?=<\/p>)/.exec(content);
    const article = {
      title: headings ? headings[0] : "",
      slug: pathBits[pathBits.indexOf("articles") + 2],
      date: date ? date[0] : "no-date",
      desc: desc ? desc[0] : "no-desc",
      body: content,
      imgs: imgs ? Array.from(imgs) : [],
    };

    const type = entry[0].includes('/source/') ? 'source' : 'news';

    articles[type].push(article);
  });

  return articles;
}
