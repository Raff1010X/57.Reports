const { createServer } = require("http");
const { parse } = require("url");
const { join } = require('path')
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = !dev ? process.env.PORT : 3000;

// Create the Express-Next App
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
   .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
                   
      if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
         const filePath = join(__dirname, '.next', pathname)
         app.serveStatic(req, res, filePath)
      } else {
         handle(req, res, parsedUrl)
      }   
                   
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
 