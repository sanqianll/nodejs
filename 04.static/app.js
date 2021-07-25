const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const mime = require("mime");

// 创建http对象
const app = http.createServer();

app.on("request", (req, res) => {
  // 获得url参数
  let pathname = url.parse(req.url).pathname;
  // 如果不输入参数，默认为主页
  pathname = pathname == "/" ? (pathname = "/index.html") : pathname;
  // 获得文件实际地址
  let realpath = path.join(__dirname, "public" + pathname);
  // 获取文件类型
  let type = mime.getType(realpath);

  // 文件操作
  fs.readFile(realpath, (err, doc) => {
    if (err) {
      res.writeHead(404, {
        "content-type": "text/plain;charset=utf8",
      });
      res.end("文件读取失败");
    }
    res.writeHead(200, {
      type,
    });
    // 将读入的文件写入网页
    res.end(doc);
  });
});

app.listen(3000);
console.log("服务器已启动");
