import http, { createServer } from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

// get filename to get the dirname
const __filename = url.fileURLToPath(import.meta.url);


//get dirname
const __dirname = path.dirname(__filename);

//create async server, with the ususal try catch block
const server = createServer(async (req, res) => {
  try {
    if(req.method === "GET") {
      //specify what file to look for based on url path
      let filepath;
      if(req.url === '/') {
        filepath = path.join(__dirname, 'public', 'index.html')
      } else if (req.url === '/about') {
        filepath = path.join(__dirname, 'public', 'about.html')
      } else if (req.url === '/contact-me') {
        filepath = path.join(__dirname, 'public', 'contact-me.html')
      } else {
        filepath = path.join(__dirname, 'public', '404.html')
      }
      //then read and write the file as response to the client
      const data = await fs.readFile(filepath)
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.write(data);
      res.end()

    } else {
      throw new Error('Method not allowed')
    }
  } catch (error) {
    res.writeHead(500, {'Content-Type' : 'text/plain'})
    res.end('Server Error')
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})