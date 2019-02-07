// Dirty Code..
interface IDbOpts {
    db: string,
    servers?: any[];
}
const dbOpts: IDbOpts = {
    db: process.env.db || `urlshortener`,
};
if (process.env.DB_ADDR) {
    dbOpts.servers = [{host: process.env.DB_ADDR.split(":")[0], port: parseInt(process.env.DB_ADDR.split(":")[1],10)}]
}
const r = require(`rethinkdbdash`)(dbOpts); // Connect to RethinkDB
export default r;