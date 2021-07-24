// 导包
const http = require("http");
const querystring = require("querystring");
// 创建对象
const app = http.createServer();
// 当 客户端发送请求的时候
app.on("request", (req, res) => {
  let postParams = "";
  req.on("data", (params) => {
    postParams = postParams + params;
  });
  req.on("end", () => {
    console.log(querystring.parse(postParams));
  });
  res.end("ok");
});
// 监听3000端口号
app.listen(3000);
console.log("服务器已启动");
