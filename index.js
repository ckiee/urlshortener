const express = require("express");
const app = express();
const port = process.env.port || 3000;
const r = require("rethinkdbdash")({db: "urlshortener"})
app.listen(port, () => console.log(`Listening on port ${port}`));
app.disable("x-powered-by");
app.get("/", (req, res) => {
    res.send("Hello! This is my private URL Shortener.");
});
app.get("/:id", async (req, res) => {
    let url = await r.table("urls").get(req.params.id).run();
    if (!url) res.sendStatus(404);
    url.views++;
    res.redirect(url.url);
    await r.table("urls").get(req.params.id).update(url).run();
});