const express = require("express");
const app = express();
const port = process.env.port || 3000;
const dbOpts = {
    db: process.env.db || `urlshortener`,
};
if (process.env.DB_ADDR) dbOpts.servers = [{host: process.env.DB_ADDR.split(":")[0], port: parseInt(process.env.DB_ADDR.split(":")[1],10)}]
const r = require(`rethinkdbdash`)(dbOpts); // Connect to RethinkDB
app.use(require("helmet")());
app.listen(port, () => console.log(`Listening on port ${port}`));
app.disable("x-powered-by");
app.get("/", (req, res) => {
    res.redirect("https://ronthecookie.me");
});
app.get("/:id", async (req, res) => {
    let url = await r.table("urls").get(req.params.id).run();
    if (!url) res.sendStatus(404);
    url.views++;
    res.redirect(url.url);
    await r.table("urls").get(req.params.id).update(url).run();
});
app.use((req, res) => {
    res.sendStatus(404);
});