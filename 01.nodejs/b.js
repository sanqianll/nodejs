let fs = require("fs"); //引入 fs
let path = require("path"); //引入 path
let aaa = require("./a"); //文件名的后缀可以省略掉

let num1 = 10;
let num2 = 5;
console.log(aaa.sum(num1, num2));
console.log(aaa.sub(num1, num2));

//调用fs 下的 readFile 并进行输出
fs.readFile("./read.txt", "utf-8", (err, doc) => {
  if (err == null) {
    console.log(doc);
  }
});

// 写文件操作
let content = "写入一句话";
fs.writeFile("./write.txt", content, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("文件写入成功");
});

// 路径拼接
let finalpath = path.join("atupian", "csgo", "ump45");
console.log(finalpath);

// 利用绝对路径进行文件写操作
fs.readFile(path.join(__dirname, "read2.txt"), "utf-8", (err, doc) => {
  console.log(err);
  console.log(doc);
});
console.log('=========');
console.log(__dirname);