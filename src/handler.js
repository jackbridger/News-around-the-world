const fs = require("fs");
const path = require("path");
const extensions = require("./extensions");
let requestModule = require("./request");
const translate = require("./translate");
require("dotenv").config();

let handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry something went wrong!</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

let handlePublic = (request, response, endpoint) => {
  const fileType = endpoint.split(".")[1];
  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>Not found!</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extensions[fileType] });
      response.end(file);
    }
  });
};

let handleApi = (request, response, endpoint) => {
  const newsKey = process.env.DB_APIKEYNEWS;
  const countryCode = endpoint.split("?")[1];
  let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${newsKey}`;
  requestModule(url, (err, data) => {
    if (err) {
      console.error(err);
      response.writeHead(400, { "Content-Type": "text/html" });
      response.end("no data");
    } 
    else {
      let topThreeArticles = data.body.articles.slice(0,3);
      let body = {countryCode:countryCode, topThreeArticles: topThreeArticles}
      translate(topThreeArticles, countryCode, () => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({statusCode: response.statusCode, body}));
      } )
    }
  });
};

module.exports = { handleHome, handlePublic, handleApi };
