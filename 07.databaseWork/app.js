const http = require("http");
const mongoose = require("mongoose");
const url = require("url");
const querystring = require("querystring");

mongoose
  .connect("mongodb://localhost/dbground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败");
  });

// 创建集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "姓名为空"],
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 18,
    max: 80,
  },
  password: String,
  email: String,
  hobbies: [String],
});
// 创建集合
const User = mongoose.model("User", userSchema);

// 开启服务器
const app = http.createServer();
// 为服务器添加响应事件
app.on("request", async (req, res) => {
  // 获取监听方式
  const method = req.method;
  // 获取路径
  let { pathname } = url.parse(req.url, true);
  if (method == "GET") {
    if (pathname == "/list") {
      let users = await User.find();

      let list = `
      <!DOCTYPE html>
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>主页</title>
          <!-- <link rel="stylesheet" href="css/bootstrap.min.css" /> -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        </head>
        <body>
          <div class="container">
            <h6>
              <a href='/add' type="button" class="btn btn-primary">添加用户</a>
            </h6>
            <table class="table table-striped table-bordered">
              <tr>
                <td>用户名</td>
                <td>年龄</td>
                <td>爱好</td>
                <td>邮箱</td>
                <td>操作</td>
              </tr>

            `;
      users.forEach((element) => {
        list += `
      <tr>
         <td>${element.name}</td>
         <td>${element.age}</td>
         <td> 
        `;
        element.hobbies.forEach((items) => {
          list += `
            <span>${items}</span>
            `;
        });
        list += `
        </td>
         <td>${element.email}</td>
         <td>
          <button type="button" class="btn btn-success">修改</button>
          <button type="button" class="btn btn-danger">删除</button>
         </td>
      </tr>
        `;
      });
      list += `
        </table>
          </div>
        </body>
      </html>
      `;
      res.end(list);
    } else if (pathname == "/add") {
      let add = `
        <!DOCTYPE html>
        <html lang="zh-CN">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>添加页</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        
          </head>
          <body>
              <div class="container">
                  <h3>添加用户</h3>
                <form method="post" action="/add">
                    <div class="form-group">
                      <label>用户名</label>
                      <input name='name' type="text" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="form-group">
                      <label >密码</label>
                      <input name='password' type="password" class="form-control"  placeholder="请输入密码">
                    </div>
                    <div class="checkbox">
                    <div class="form-group">
                      <label >年龄</label>
                      <input name='age' type="text" class="form-control"  placeholder="请输入年龄">
                    </div>
                    <div class="checkbox">
                    <div class="form-group">
                      <label >邮箱</label>
                      <input name='email' type="email" class="form-control"  placeholder="请输入邮箱">
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" name='hobbies' value='足球'>  足球
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='篮球'>  篮球
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='刷抖音'>  刷抖音
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='看B站'>  看B站
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='打csgo'>  打csgo
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='看A-SOUL'> 看A-SOUL
                      </label>
                      <label>
                        <input type="checkbox" name='hobbies' value='学习'> 学习 
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary">添加用户</button>
        
                 </form>
            
              </div>
          </body>
        </html>
                
        `;
      res.end(add);
    }
  } else if (method == "POST") {
    if (pathname == "/add") {
      let formdata = "";
      req.on("data", (param) => {
        formdata += param;
      });
      req.on("end", async () => {
        let user = querystring.parse(formdata);
        await User.create(user);
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    }
  }
});

app.listen(3000);
