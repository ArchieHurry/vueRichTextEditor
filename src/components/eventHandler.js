function addHandler(element,type,handler){   //绑定事件
  if(element.addEventListener){      // IE9以下不兼容
    element.addEventListener(type,handler,false)
  }else if(element.attachEvent){     //IE独有
    element.attachEvent('on' + type ,handler)
  }else{
    element['on'+type] = handler;    //一个元素只能绑定一个处理程序
  }
}
function removeHandler(element,type,handler){   //移除事件
  if(element.removeEventListener){      //addEventListener
    element.removeEventListener(type,handler,false)
  }else if(element.detachEvent){           //attachEvent
    element.detachEvent('on' + type,handler)
  }else{
    element['on' + type ] = null;

  }
}
function preventDefault (event){
  if(event.preventDefault){
    event.preventDefault()
  } else{
    event.returnValue = false;
  }
}
function stoppropagation(event){
  if(event.stopPropagation){
    event.stopPropagation()
  }else{
    evenvt.cancelBubble = true;
  }
}

export default {
  addHandler,
  removeHandler,
  preventDefault,
  stoppropagation
}
