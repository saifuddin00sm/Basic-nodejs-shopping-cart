const fs = require("fs");
const url = require("url");
const http = require("http");
const getProductData = require("./modules/getProductData");

const homeHtml = fs.readFileSync("./templates/home.html", "utf-8");
const itemHtml = fs.readFileSync("./templates/item-card.html", "utf-8");
const shoppingCartHtml = fs.readFileSync(
  "./templates/shopping-cart.html",
  "utf-8"
);

const data = fs.readFileSync("./data/data.json", "utf-8");
const parsedData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const {
    pathname,
    query: { id },
  } = url.parse(req.url, true);

  switch (pathname) {
    case "/home":
    case "/": {
      res.writeHead(200, { "Content-type": "text/html" });
      const finalRes = parsedData.map((el) => getProductData(itemHtml, el));
      const homeHtmlUpdated = homeHtml.replace(/{%ITEMBOX%}/g, finalRes);
      res.end(homeHtmlUpdated);
      break;
    }
    case "/product": {
      res.writeHead(200, { "Content-type": "text/html" });
      const productPage = parsedData.find((f) => f.id === parseInt(id));
      const productsHtml = getProductData(shoppingCartHtml, productPage);
      res.end(productsHtml);
      break;
    }
    default: {
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.end("<h1>Not found</h1>");
      break;
    }
  }
});

server.listen(8000, () => {
  console.log("listening on port: 8000");
});
