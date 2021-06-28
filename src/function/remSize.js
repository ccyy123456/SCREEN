(function () {
    var docEl = document.documentElement;
    var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var setRem = function () {
        var screenWidth = docEl.clientWidth || window.screen.width || 360;
        // 1366 PSD宽度(可变的)
        docEl.style.fontSize = (100 * screenWidth / 1366) + 'px';
    };
    window.addEventListener('resize', setRem, false);
    setRem();
})();// 用法psd量出来的像素距离 除以100  比如psd: 100px 转换后 1rem;
