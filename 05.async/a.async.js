// 异步执行顺序
console.log(1);

function setmsg(callback) {
  // 下面的时间函数是异步函数，setmsg默认返回undefined
  // 回调函数相当于过了两秒再回来执行。不影响异步
  setTimeout(() => {
    callback("过了2s输出");
  }, 2000);
}
setmsg(function (num) {
  console.log(num);
});

console.log(2);

//=========================分割线=====================================
setTimeout(() => {
  console.log("0s到了");
}, 0);
setTimeout(() => {
  console.log("3s到了");
}, 3000);
// 先将同步代码全部执行完 才能开始异步代码
for (let i = 0; i < 10000; i++) {
  console.log(i);
}
