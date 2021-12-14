const Koa = require("koa");
const cors = require("@koa/cors");
const proxy = require("koa-proxies");
const auth = require("koa-basic-auth");
require("dotenv").config();
const app = new Koa();
const port = process.env.PORT || 3001;

const optFunc = function (options, params, ctx) {
  var auth = params.request.header.authorization;
  if (!auth) {
    auth =
      "Basic " +
      Buffer.from(process.env.SNOWUSER + ":" + process.env.PW).toString(
        "base64"
      );
    params.request.header.authorization = auth;
  }
  return {
    target: process.env.PROXY_TO,
    changeOrigin: true,
    logs: true,
  };
};
app.use(cors());
app.use(proxy("/", optFunc));

app.listen(port);
console.log(`listening on port ${port}`);
