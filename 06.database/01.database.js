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
  name: String,
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
  name: "javascript",
  author: "pink",
  isPublished: true,
})
  .then((err) => {
    console.log(err);
  })
  .catch((result) => {
    console.log(result);
  });
// 返回符合条件的数据 返回数组
Course.find({ _id: "61000e75d4e4ee32c0a6faac" }).then((result) =>
  console.log(result)
);
// 返回符合条件的数据 返回唯一一个对象
Course.findOne({ _id: "61000e75d4e4ee32c0a6faac" }).then((result) =>
  console.log(result)
);
Course.