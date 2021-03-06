import fs from "fs";
import anchorme from "anchorme";

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text);
}

// render text to html
export default function render(text, { title }) {
  // turn urls into clickable links
  text = anchorme.default(text, {
    attributes: [
      {
        name: "target",
        value: "_blank"
      }
    ],
    defaultProtocol: "https://"
  });

  const html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet">
            <script async defer data-domain="phgn.io" src="https://plausible.io/js/plausible.js"></script>
        <link rel="stylesheet" type="text/css" href="./index.css">
        </head>
        <body>
            <div class="json">${text}</div>
        </body>
    </html > `;

  return html;
}

const text = read("info.json");
const data = JSON.parse(text);

const html = render(text, data);
write("./index.html", html);
