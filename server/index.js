const express = require('express');
const app = express();
const port = 9000;
const cors = require("cors");

const request = require('request');
let TDKEY = '176ae2eed1124edaa2ff0f240459fbb5';

let stockData;
let chartData;
let labelData;

async function getStockData(ticker) {

  return await new Promise((resolve, reject) => {
      let tdurl = 'https://api.twelvedata.com/quote?symbol=' + ticker.toString() + '&apikey=' + TDKEY;

      request.get({
          url: tdurl,
          json: true,
          headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
          if (err) {
              console.log('Error:', err);
          } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
          } else {
              resolve(data);
          }
});
});

}

async function getData(ticker) {
  stockData = await getStockData([ticker]);
}

async function getChart(ticker) {

  return await new Promise((resolve, reject) => {
      let tdurl = 'https://api.twelvedata.com/time_series?symbol=' + ticker.toString() + '&interval=1day&outputsize=365&apikey=' + TDKEY;

      request.get({
          url: tdurl,
          json: true,
          headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
          if (err) {
              console.log('Error:', err);
          } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
          } else {
              resolve(data);
          }
});
});

}

async function getChartData(ticker) {
  let info = await getChart(ticker);
  chartData = info.values.map((item) => parseFloat(item.close));
  labelData = info.values.map((item) => item.datetime);
  chartData = chartData.reverse();
  labelData = labelData.reverse();
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', cors(), async (req, res) => {
  res.send("This is working");
});

app.post("/post_name", async (req, res) => {
  let { name } = req.body;
  getData(name);
  getChartData(name);
})

app.get("/stockdata", async (req, res) => {
  res.send(stockData);
})

app.get("/chartdata", async (req, res) => {
  res.send(chartData);
})

app.get("/labeldata", async (req, res) => {
  res.send(labelData);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});