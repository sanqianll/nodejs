const fs = require("fs");

// Promise 按顺序连续读取三个文件
function p1() {
  return new Promise((resolve, reject) => {
    fs.readFile("./1.txt", "utf8", (err, doc) => {
      resolve(doc);
    });
  });
}
function p2() {
  return new Promise((resolve, reject) => {
    fs.readFile("./2.txt", "utf8", (err, doc) => {
      resolve(doc);
    });
  });
}
function p3() {
  return new Promise((resolve, reject) => {
    fs.readFile("./3.txt", "utf8", (err, doc) => {
      resolve(doc);
    });
  });
}

p1()
  .then((doc) => {
    console.log(doc);
    return p2();
  })
  .then((doc) => {
    console.log(doc);
    return p3();
  })
  .then((doc) => {
    console.log(doc);
  });

// 