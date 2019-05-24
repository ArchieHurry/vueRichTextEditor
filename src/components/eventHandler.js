function addHandler(element,type,handler) {   //绑定事件
  if (element.addEventListener) {      // IE9以下不兼容
    element.addEventListener(type,handler,false);
  } else if (element.attachEvent) {     //IE独有
    element.attachEvent("on" + type ,handler)
  } else {
    element["on"+type] = handler;    //一个元素只能绑定一个处理程序
  }
}
function preventDefault (event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}

export default {
  addHandler,
  preventDefault,
}
