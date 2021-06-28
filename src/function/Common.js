exports.install = function (Vue, options) {
  //全屏设置
  Vue.prototype.FullScreen = function () {
    var docElm = document.documentElement;
    //W3C   
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    //FireFox   
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    }
    //Chrome等   
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  };
  Vue.prototype.exitFullscreen = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  };
};