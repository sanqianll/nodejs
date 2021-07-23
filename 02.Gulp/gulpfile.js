// 导入gulp模块包
const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const less = require("gulp-less");
const csso = require("gulp-csso");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const { series } = require("gulp");
// 建立一个gulp任务
gulp.task("first", () => {
  console.log("人生中的第一个Gulp任务执行了");
  return (
    // 获取源文件
    gulp
      .src("./src/css/base.css")
      //   处理获取到的文件（输出到目标地址）
      .pipe(gulp.dest("./dist/css/base.css"))
  );
});

// html压缩 文件提取
gulp.task("htmlmin", () => {
  return gulp
    .src("./src/*.html")
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});

//css压缩 less处理
gulp.task("cssmin", function () {
  return gulp
    .src(["./src/less/*.less", "./src/css/*.css"])
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("./dist/css"));
});

//js压缩 es6处理
gulp.task("jsmin", () =>
  gulp
    .src("src/js/*.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
);

gulp.task("copy", (done) => {
  gulp.src("./src/fonts/*").pipe(gulp.dest("./dist/fonts"));
  gulp.src("./src/img/*").pipe(gulp.dest("./dist/img"));
  gulp.src("./src/upload/*").pipe(gulp.dest("./dist/upload"));
  done();
});


// 默认执行
gulp.task("default", series("htmlmin", "cssmin", "jsmin", "copy"));
