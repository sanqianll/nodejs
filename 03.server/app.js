// 导包
const http = require("http");
const url = require("url");
// 创建对象
const app = http.createServer();
// 当 客户端发送请求的时候
app.on("request", (req, res) => {
  res.writeHead(200, {
    "content-type": "text/html;charset=utf8",
  });
  // 解析请求参数
  let { query, pathname } = url.parse(req.url, true);
  console.log(query.name);
  console.log(query.age);

  //判断path路径
  if (pathname == "/" || pathname == "/index") {
    res.end("<h2>welcom to homepage 欢迎来到首页</h2>");
  } else if (pathname == "/list") {
    res.end("list");
  } else {
    res.end("<i>not fond</i>");
  }
  // console.log(req.headers["dnt"]);
  //   if (req.method == "GET") {
  //     res.end("GET");
  //   } else if (req.method == "POST") {
  //     res.end("POST");
  //   }
  // 响应
  //   res.end("<h2>hello 你好 China</h2>"); //中文目前会乱码
});
// 监听3000端口号
app.listen(3000);
console.log("服务器已启动");
console.log("===================分界线====================");
