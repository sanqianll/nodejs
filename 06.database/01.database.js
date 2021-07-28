const mongoose = require("mongoose");

// 创建数据库
mongoose
  .connect("mongodb://127.0.0.1/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败");
  });

// 创建 集合规则
const courseSchema = new mongoose.Schema({
  name: {
    // 类型
    type: String,
    // 是否为必填项
    required: [true, "未填写姓名"],
    // 字符串最小长度
    minlength: [2, "最少2个字符"],
    // 字符串最大长度
    maxlength: [5, "最大填写5个字符"],
    // 省略字符串两端空格
    trim: true,
  },
  age: {
    type: Number,
    // 数字最小值
    min: 18,
    // 数字最大值
    max: 35,
    // 默认值
    defualt: 18,
  },
  subject: {
    type: String,
    // 枚举 规定可选项
    enum: {
      values: ["数学", "语文", "英语", "javascript", "node.js"],
      message: "不符合规范",
    },
  },
  password: {
    type: Number,
    // 自定义选项
    validata: {
      validator: (v) => {
        return v && v.length > 4;
      },
      message: "传入的值不存在或长度小于4",
    },
  },
  author: String,
  isPublished: Boolean,
});
// 创建 集合
const Course = mongoose.model("Course", courseSchema); //courses

/*
// 创建文档
const course = new Course({
  name: "node",
  author: "黑马讲师",
  isPublished: true,
});
// 保存记录
course.save();
*/

// 创建文档
Course.create({
  name: "javasc",
  age: 19,
  subject: "123",
  password: 111111,
  author: "pink",
  isPublished: true,
})
  .then((result) => {
    console.log();
  })
  .catch((err) => {
    let error = err.errors;
    for (let attr in error) {
      console.log(error[attr]["message"]);
    }
  });

// // 返回符合条件的数据 返回数组
// Course.find({ _id: "61000e75d4e4ee32c0a6faac" }).then((result) =>
//   console.log(result)
// );
// // 返回符合条件的数据 返回唯一一个对象
// Course.findOne({ _id: "61000e75d4e4ee32c0a6faac" }).then((result) =>
//   console.log(result)
// );
// // 删除选中的一组数据
// Course.findOneAndDelete({ name: "高数" }).then((result) => console.log(result));
// // 删除多组数据 （危险）
// Course.deleteMany({}).then((result) => console.log(result));
