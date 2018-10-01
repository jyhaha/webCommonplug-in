/*
** Create by 张晓坤 on 2018/6/27
* 工具包封装：好处  便于维护/使用很方便,复用性高
* 本文件主要处理浏览器兼容性问题
* 获取元素常用方法
*/

/**
 * 1. 根据id获取元素
 * @param str  id字符串
 * @return {HTMLElement | null}  元素/null
 */
function id ( str ) {
    return document.getElementById(str);
}

/**
 * 2.获取元素文本内容兼容性封装
 * @param ele  元素
 * @return {*}   文本内容
 */
function getText ( ele ) {
    //能力检测
    if(ele.innerText == undefined){//获取不到，火狐42之前浏览器
        return ele.textContent;//直接获取textContent
    }else{//如果innerText可以使用（非IE8浏览器）
        return ele.innerText;
    }
}


/**
 * 3.设置元素文本内容兼容性封装
 * @param ele  元素
 * @param text  文本
 * @return {*}   无返回值
 */
function setText ( ele,text ) {
    //能力检测
    if(ele.innerText == undefined){//获取不到，火狐42之前浏览器
        ele.textContent = text;//直接获取textContent
    }else{//如果innerText可以使用（非IE8浏览器）
        ele.innerText = text;
    }
}


/**
 * 4.获取元素的上一个兄弟元素
 * @param ele 元素
 * @return 上一个元素
 */
function getPreviousElementSibling ( ele ) {
    if(ele.previousElementSibling){//只要previousElementSibling不是undeifined，条件成立
        return ele.previousElementSibling;//非IE8浏览器
    }else{
        var node = ele.previousSibling;//获取元素的上一个节点（注释 文本 null ）
        console.log ( node.nodeType );
        /*思路：如果上一个节点类型不是1，说明不是元素，就要继续往上找
        循环特点：（1）次数不固定
        （2）循环结束的条件固定：（2.1）node.nodeType == 1  || node == null
         while小括号，条件成立才会执行循环体： node.nodeType != 1 &&  node != null
         while(条件 true){
             node = node.previousSibling;
         }
         */
        while (node && node.nodeType != 1 ){//如果能够找到上一个节点，并且上一个节点的类型不是1
            node = node.previousSibling;//继续寻找
        }
        return node;
    }
}

/**
 * 5.获取元素的下一个兄弟元素
 * @param ele 元素
 * @return 元素
 */
function getNextElementSibling ( ele ) {
    if(ele.nextElementSibling){//只要previousElementSibling不是undeifined，条件成立
        return ele.nextElementSibling;//非IE8浏览器
    }else{
        //IE8浏览器
        var node = ele.nextSibling;//上一个节点 文本  注释  元素  null
        /*while循环
        结束条件：可以找到节点，并且节点类型是1
         */
        while(node &&  node.nodeType != 1){//只要节点存在并且类型不是1，就说明一定不是元素节点，继续寻找
            node = node.nextSibling;//继续找上一个
        }
        //只要节点的类型是1，就结束寻找，返回找到的节点
        return node;
    }
}

/**
 * 6.获取第一个子元素
 * @param ele  父元素
 * @return {*} 第一个子元素
 */
function getfirstElementChild  ( ele ) {
    if(ele.firstElementChild){
        return ele.firstElementChild;//非IE8浏览器
    }else{
        //IE8 需要通过节点来获取
        var node = ele.firstChild;
        while (node &&  node.nodeType != 1){
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * 7.获取元素的最后一个子元素
 * @param ele 元素
 * @return {*} 最后子元素
 */
function getlastElementChild ( ele ) {
    if(ele.lastElementChild){//非IE8
        return ele.lastElementChild;
    }else{//IE
        var node = ele.lastChild;//获取最后一个节点
        while (node &&  node.nodeType != 1){
            node = node.previousSibling;//找上一个节点
        }
        return node;
    }
}

/**
 * 8.获取元素的属性
 * @param obj   要获取的元素
 * @param attr   属性名字符串
 * @return {*}   属性的值
 */
function getStyle ( obj,attr ) {
    //能力检测
    if(obj.currentStyle){//如果可以获取
        return obj.currentStyle[attr];
    }else{//非IE8浏览器
        return window.getComputedStyle(obj,null)[attr];
    }
}

/**
 * 9.获取页面滚动出去的距离
 * @return {{scrollLeft: number, scrollTop: number}}
 */
function getScroll (  ) {
    //如果window.pageXOffset 获取不到的话，希望获取document.documentElement.scrollLeft
    //逻辑或运算符短路：找真，（左边为真，无条件返回左边式子的结果，反之无条件返回右边式子的结果）
    var scrollLeft = window.pageXOffset  || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var scrollTop = window.pageYOffset  || document.documentElement.scrollTop || document.body.scrollTop || 0;

    return {
        scrollLeft : scrollLeft,//左边是属性名，右边是属性值
        scrollTop : scrollTop
    }
}

/**10.获取页面的可视区域大小
 *
 * @return {{clientWidth: number, clientHeight: number}}
 */
function getClientSize (  ) {
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

/**11.获取事件触发点的page坐标（相当于页面左上角距离）
 *
 * @param e
 * @return {{pageX: number, pageY: number}}
 */
function getPagePoint ( e ) {
    return {
        pageX : e.pageX || e.clientX + getScroll().scrollLeft,
        pageY : e.pageY || e.clientY + getScroll().scrollTop
    }
}

/**
 *12.使用addEventListener方式添加事件
 * @param obj 要添加事件的元素
 * @param key  事件名  去掉on
 * @param fn  事件处理函数
 */
function addEventListener ( obj,key,fn ) {
    //能力检测
    if(obj.addEventListener){//非IE8
        obj.addEventListener(key,fn);
    }else if(obj.attachEvent){//IE8
        obj.attachEvent('on' + key,fn);
    }else{//如果上面两个都不支持，则使用点语法添加
        obj['on' + key] = fn;
    }
}

/**
 * 13.移除事件removeEventListener
 * @param obj 要移除事件的元素
 * @param key  事件名  去掉on
 * @param fn  事件处理函数
 */
function removeEventListener ( obj,key,fn ) {
    if(obj.removeEventListener){//非IE8
        obj.removeEventListener(key,fn);
    }else if(obj.detachEvent){//IE8
        obj.detachEvent('on' + key,fn);
    }else{//其他情况
        obj['on' + key] = null;
    }
}