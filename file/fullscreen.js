// 浏览器进入全屏
export const viewFullScreen = function () {
    // 主要，这边要全屏的对象是这个body，如果只是选择点击的对象，比如 e.currentTarget，那么就会变成只有这个按钮全屏
    var docElm = document.documentElement;
    // 浏览器兼容
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
};


// 浏览器退出全屏
export const cancelFullScreen = function () {
    // 浏览器兼容
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};

/**
 * 监听浏览器全屏
 * @param open{Function}
 * @param cancel{Function}
 */
export const listenFullScreen = function (open, cancel) {
    // 浏览器兼容
    if (document.exitFullscreen) {

        document.addEventListener("fullscreenchange", function () {
            (document.fullscreenElement) ? open(): cancel();
        }, false);

    } else if (document.msExitFullscreen) {

        document.addEventListener("msfullscreenchange", function () {
            (document.msFullscreenElement) ? open(): cancel();
        }, false);

    } else if (document.mozCancelFullScreen) {

        document.addEventListener("mozfullscreenchange", function () {
            (document.mozFullScreen) ? open(): cancel();
        }, false);

    } else if (document.webkitCancelFullScreen) {

        document.addEventListener("webkitfullscreenchange", function () {
            (document.webkitIsFullScreen) ? open(): cancel();
        }, false);

    }
};
