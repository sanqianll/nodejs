const fs = require("fs");

// 嵌套文件顺序执行（回调地域）
fs.readFile("./1.txt", "utf8", (err, doc1) => {
  console.log(doc1);
  fs.readFile("./2.txt", "utf8", (err, doc2) => {
    console.log(doc2);
    fs.readFile("./3.txt", "utf8", (err, doc3) => {
      console.log(doc3);
    });
  });
});

// Promise ES6
let pms = new Promise((resolve, reject) => {
  fs.readFile("./5.txt", "utf8", (err, doc) => {
    if (err) {
      reject(err);
    } else {
      resolve(doc);
    }
  });
});

pms.then((doc) => {
  console.log(doc);
});
pms.catch((err) => {
  console.log(err);
})
