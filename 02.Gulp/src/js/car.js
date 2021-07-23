$(function () {
    // 全选按钮
    $(".checkall").change(function (e) {
        e.preventDefault();
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 小的复选框进行全选判定
    $(".j-checkbox").change(function (e) {
        e.preventDefault();
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    //点击加号 数量加一 价格修改
    $(".increment").click(function (e) {
        e.preventDefault();
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);

        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 点击减号 数量减一 价格修改
    $(".decrement").click(function (e) {
        if ($(this).siblings(".itxt").val() == 1) {
            return;
        }
        e.preventDefault();
        var n = $(this).siblings(".itxt").val();
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 手动操作更改数量和价格
    $(".itxt").change(function (e) {
        if ($(this).val() < 1) {
            $(this).val(1);
            return;
        }
        e.preventDefault();
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    getSum();

    // 设置获取总个数和总金额函数
    function getSum() {
        var count = 0; //总数量
        var sum = 0; //总金额
        // 获取总个数
        $(".itxt").each(function (index, element) {
            // element == this
            count += parseInt($(element).val());
        });
        $(".amount-sum em").text(count);
        // 获取总价格
        $(".p-sum").each(function (index, element) {
            // element == this
            sum += parseFloat($(element).text().substr(1));
        });
        $(".price-sum em").text("￥" + sum.toFixed(2));
    }

    // 删除单个按钮
    $(".p-action").click(function (e) {
        e.preventDefault();
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // 删除选中
    $(".remove-batch").click(function (e) {
        e.preventDefault();
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    $(".clear-all").click(function (e) {
        e.preventDefault();
        $(".j-checkbox").parents(".cart-item").remove();
        getSum();
    });
})