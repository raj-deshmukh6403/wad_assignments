// Importing necessary modules
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Port on which the server will be created
const PORT = 1800;

// Maps file extension to MIME types which
// helps the browser to understand what to
// do with the file
const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".PDF": "application/pdf",
  ".doc": "application/msword",
  ".eot": "application/vnd.ms-fontobject",
  ".ttf": "application/font-sfnt",
};

// Creating a server and listening on the specified port
http
  .createServer((req, res) => {
    // Parsing the requested URL
    const parsedUrl = url.parse(req.url);

    // If requested URL is "/" like "http://localhost:1800/"
    if (parsedUrl.pathname === "/") {
      var filesLink = "<ul>";
      res.setHeader("Content-type", "text/html");
      var filesList = fs.readdirSync("./");
      var html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Static File Server</title>
          <link rel="stylesheet" href="style.css">
      </head>
      <body>
          <h1>List of files:</h1>
          <ul>
      `;

      filesList.forEach((element) => {
          if (fs.statSync("./" + element).isFile()) {
              html += `<br/><li><a href='./${element}'>${element}</a></li>`;
          }
      });

      html += `
          </ul>
      </body>
      </html>
      `;

      res.end(html);

    } else {
      /* Processing the requested file pathname to
       avoid directory traversal like,
       http://localhost:1800/../fileOutofContext.txt
       by limiting to the current directory only */
      const sanitizePath = path
        .normalize(parsedUrl.pathname)
        .replace(/^(\.\.[\/\\])+/, "");
      let pathname = path.join(__dirname, sanitizePath);

      // Check whether the file exists
      if (!fs.existsSync(pathname)) {
        // If the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
      } else {
        // Read file from file system limited to the
        // current directory only.
        fs.readFile(pathname, function (err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error in getting the file.`);
          } else {
            // Based on the URL path, extract the file
            // extension. Ex .js, .doc, ...
            const ext = path.parse(pathname).ext;

            // If the file is found, set Content-type
            // and send the data
            res.setHeader("Content-type", mimeType[ext] || "text/plain");
            res.end(data);
          }
        });
      }
    }
  })
  .listen(PORT);

console.log(`Server is listening on port ${PORT}`);
