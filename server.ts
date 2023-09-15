import express from "express";
const crypto = require('crypto');
const bodyParser = require('body-parser')

const app = express();
const port = 6969;

const dummyData = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
  anything: "test test test"
};

const jsonTest = JSON.stringify(dummyData);

app.get("/read", (req, res) => {
  res.send(jsonTest);
});

app.use(bodyParser.text());

app.post('/insert', (req, res) => {
    const body = req.body;
    const hashSum = crypto.createHash('md5');
    hashSum.update(body);
    const md5 = hashSum.digest('hex');
    return res.send(md5);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});