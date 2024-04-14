import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//syncing js file to html files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var jsonParser = bodyParser.json()
 
app.use(express.static(__dirname + '/'));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

app.use(
  bodyParser.json({
      limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/html/about', (req, res) => {
  res.sendFile(__dirname + '/html/about.html'); 
});

app.get('/html/contant', (req, res) => {
  res.sendFile(__dirname + '/html/contant.html'); 
});

//form sunmission code
app.post('/submit-form', jsonParser, (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  if (name == "" || email == "" || message == "") {
    res.send("Form data was invalid.")
  } else {
    res.send("Form data successfully sent -> " + JSON.stringify(req.body))
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});