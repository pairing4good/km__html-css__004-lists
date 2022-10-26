const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe("unordered list", () => {
  it("should exist", async () => {
    const unorderedList = await page.$("ul");
    expect(unorderedList).not.toBeNull();
  });

  it("should have 3 list items", async () => {
    const unorderedListItems = await page.$$("ul > li");
    expect(unorderedListItems.length).toBe(3);
  });
});

describe("ordered list", () => {
  it("should exist", async () => {
    const orderedList = await page.$("ol");
    expect(orderedList).toBeDefined();
  });

  it("should have 3 list items", async () => {
    const orderedListItems = await page.$$("ol > li");
    expect(orderedListItems.length).toBe(3);
  });
});
