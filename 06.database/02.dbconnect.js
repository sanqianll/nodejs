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
// 创建学生规则
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "未填写学生姓名"],
  },
});
// 创建分数规则
const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
  },
  sname: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});
// 创建学生集合
const Student = mongoose.model("Student", studentSchema);
// 创建分数集合
const Score = mongoose.model("Score", scoreSchema);

// 创建用户
// Student.create({
//   name: "徐嘉乐",
// });
// 创建得分
// Score.create({
//   score: 100,
//   sname: "6101359541b56c24905db7fc",
// });
Score.find()
  .populate("sname")
  .then((result) => {
    console.log(result);
  });
