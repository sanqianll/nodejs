// async function fn() {
//   throw "错误弹出";
//   return 123;
// }
// fn()
//   .then((params) => {
//     console.log(params);
//   })
//   .catch((params) => {
//     console.log(params);
//   });

// async await ES7
// 导包
const fs = require("fs");
const promisify = require("util").promisify;
// 改造函数 将返回值更改为 Promise
const readFile = promisify(fs.readFile);

async function run() {
  let r1 = await readFile("./1.txt", "utf8");
  let r2 = await readFile("./2.txt", "utf8");
  let r3 = await readFile("./3.txt", "utf8");
  console.log(r1);
  console.log(r2);
  console.log(r3);
}
run();
