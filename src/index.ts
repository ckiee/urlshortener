import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import r from "./db"
app.use(require("helmet")());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.redirect("https://ronthecookie.me");
});

/* Our DB structure is just one table, urlshortener.urls. */

interface IURLRedir {
    id: string,
    views: number,
    url: string
}

app.get("/:id", async (req, res) => {
    let url: IURLRedir = await r.table("urls").get(req.params.id).run();
    if (!url) return res.sendStatus(404);
    res.redirect(url.url);
    url.views = url.views ? url.views + 1 : 1;
    await r.table("urls").get(req.params.id).update(url).run();
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}`));