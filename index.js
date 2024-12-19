import express from "express";
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const app = express()

const PORT = process.env.PORT || 8080;

// get filename to get the dirname
const __filename = url.fileURLToPath(import.meta.url);
//get dirname
const __dirname = path.dirname(__filename);

//create async server, with the ususal try catch block
app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname, 'public')
  }
  res.sendFile('/index.html', options, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Sent')
    }
  })
})

app.get("/about", (req, res) => {
  const options = {
    root: path.join(__dirname, 'public')
  }
  res.sendFile('/about.html', options, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Sent')
    }
  })
})

app.get("/contact-me", (req, res) => {
  const options = {
    root: path.join(__dirname, 'public')
  }
  res.sendFile('/contact-me.html', options, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Sent')
    }
  })
})

app.get("*", (req, res) => {
  const options = {
    root : path.join(__dirname, 'public')
  }
  res.status(404).sendFile('/404.html', options, (err) => {
    if (err) {
      console.log (err)
    } else {
      console.log('Sent')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Express App listening on ${PORT}`)
})