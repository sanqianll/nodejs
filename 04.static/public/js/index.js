window.addEventListener("load", function () {
  var focus = document.querySelector(".focus");
  var ul = focus.querySelector("ul");
  var prov = document.querySelector(".prov");
  var next = document.querySelector(".next");
  var ol = document.querySelector(".circle");
  var focusWidth = focus.offsetWidth;
  var pagenum = 0;

  // 鼠标控制左右按钮显示
  focus.addEventListener("mouseenter", function () {
    prov.style.display = "block";
    next.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    prov.style.display = "none";
    next.style.display = "none";
    timer = setInterval(function () {
      next.click();
    }, 4000);
  });

  // 添加滚动图的导航 并且添加事件
  for (var i = 0; i < ul.children.length; i++) {
    // 创建一个li
    var li = document.createElement("li");
    //创建的同时给一个 index 属性用作记录
    li.setAttribute("index", i);
    // 把 li 放进ul 中
    ol.appendChild(li);
    li.addEventListener("click", function () {
      // 新增页与点击导航点的特殊情况
      if (pagenum == ol.children.length) {
        ul.style.left = 0 + "px";
      }
      // 排他思想1.干掉其他
      for (var j = 0; j < ol.children.length; j++) {
        ol.children[j].className = "";
      }
      // 排他思想2.留下自己
      this.className = "current";

      var index = this.getAttribute("index"); //记录页号最后一页相当于第一页
      animate(ul, -index * focusWidth);
      pagenum = index;
    });
  }

  // 将第一个小点 设置为默认红色
  ol.children[0].className = "current";
  //添加最后一个元素 用于无缝播放
  var last = ul.children[0].cloneNode(true);
  ul.appendChild(last);

  // 添加向右点击的事件
  //右侧点击按钮添加 节流阀
  var flag = true;
  next.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (pagenum == ol.children.length) {
        ul.style.left = 0;
        pagenum = 0;
      }
      for (var j = 0; j < ol.children.length; j++) {
        ol.children[j].className = "";
      }
      pagenum++;
      ol.children[pagenum % ol.children.length].className = "current";
      animate(ul, -pagenum * focusWidth, function () {
        flag = true;
      });
    }
  });

  // 左按钮
  prov.addEventListener("click", function () {
    if (pagenum == 0) {
      ul.style.left = -(ul.children.length - 1) * focusWidth + "px";
      pagenum = ol.children.length;
    }
    for (var j = 0; j < ol.children.length; j++) {
      ol.children[j].className = "";
    }
    pagenum--;
    ol.children[pagenum % ol.children.length].className = "current";
    animate(ul, -pagenum * focusWidth);
  });

  // 添加自动播放事件
  var timer = setInterval(function () {
    next.click();
  }, 4000);

  // 固定电梯导航栏
  toggleTool();

  function toggleTool() {
    if ($(document).scrollTop() >= $(".recom_hd").offset().top) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }

  $(function () {
    var flag = true;
    $(window).scroll(function () {
      toggleTool();
      if (flag) {
        $(".floor .w").each(function (index, element) {
          // element == this
          if ($(document).scrollTop() > $(element).offset().top) {
            $(".fixedtool li")
              .eq(index)
              .addClass("current")
              .siblings("li")
              .removeClass();
          }
        });
      }
    });

    $(".fixedtool ul li").click(function (e) {
      e.preventDefault();
      flag = false;
      $(this).addClass("current").siblings("li").removeClass();
      var index = $(this).index();
      var current = $(".floor .w").eq(index).offset().top;
      $("body,html")
        .stop()
        .animate(
          {
            scrollTop: current,
          },
          function () {
            flag = true;
          }
        );
    });
  });
});
