window.addEventListener('load', function () {
    var regtel = /^\d{3}\d{8}|\d{4}\d{7}$/;
    var regqq = /^[1-9][0-9]{4,}$/;
    var regid = /^[\u4e00-\u9fa5]{2,8}$/;
    var regpw = /^[a-zA-Z0-9_]{6,18}$/;
    var telnum = document.querySelector('.telnum');
    var qqnum = document.querySelector('.qqnum');
    var idnum = document.querySelector('.idnum');
    var pwnum = document.querySelector('.pwnum');
    var surepwd = document.querySelector('.surepwd');

    function regexp(ipt, reg) {
        ipt.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"> </i>格式正确'
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"> </i>格式不正确，请重新输入'
            }
        });
    }
    regexp(telnum, regtel);
    regexp(qqnum, regqq);
    regexp(idnum, regid);
    regexp(pwnum, regpw);
    surepwd.addEventListener('blur', function () {
        if (this.value == pwnum.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"> </i>密码正确'
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"> </i>两次密码不一致，请重新输入'
        }
    })

});