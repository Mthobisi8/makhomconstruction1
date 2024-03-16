const express = require("express");
const path = require("path");
const mail = require('./components/Mail');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use("/mail", mail)
app.use(cors())

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://makhomconstruction.co.za'; // Change this to your base URL
    const page = { url: '/', lastmod: '2024-03-14', changefreq: 'weekly', priority: '1.0' };
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      </urlset>`;
  
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));