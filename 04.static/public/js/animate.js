// 变速移动动画
function animate(obj, target, callback) {
    clearInterval(obj.timer); //只允许一个动画
    obj.timer = this.setInterval(function () {
        // 如果到达目标位置，清楚动画，并返回回调函数
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback(); //回调函数
        }
        //变速动画核心代码
        var step = ((target - obj.offsetLeft) / 10);
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}