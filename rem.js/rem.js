window.addEventListener('resize', setHtmlFontSize)
setHtmlFontSize();

function setHtmlFontSize() {
    // 根据屏幕的宽度来改变根元素的字体大小的值
    // 当前屏幕 / 标准的375屏幕 求得你当前屏幕是标准屏幕的多少倍  * 标准屏幕根元素的字体大小
    // 当前屏幕的宽度 / 375 * 100
    // 假如当前750/375 = 2 * 100 == 200px  
    // 1. 当前屏幕的宽度
    var windowWidth = document.documentElement.offsetWidth;
    // 限制最大屏幕 和最小屏幕
    if (windowWidth > 750) {
        windowWidth = 750;
    } else if (windowWidth < 320) {
        windowWidth = 320;
    }
    //2. 标准屏幕的宽度
    var StandardWidth = 375;
    // 标准屏幕的html的字体大小
    var StandardHtmlFontSize = 100;
    //3. 当前屏幕需要设置的根元素的字体大小
    var htmlFontSize = windowWidth / StandardWidth * StandardHtmlFontSize;
    //4. 把当前计算的html 字体大小设置到页面的html元素上就可以
    document.querySelector('html').style.fontSize = htmlFontSize + 'px';
}
