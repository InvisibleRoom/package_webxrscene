const Utils = {

  WorldToScreenPosition : (vector3,camera,container = null) =>{
    var size = {
      x : window.innerWidth,
      y :  window.innerHeight,
      top : 0,
      left : 0
    }

    if(container !== null){
      var rect = container.getBoundingClientRect();
      size.x = rect.width;
      size.y = rect.height;
      size.top = rect.top;
      size.left = rect.left;
    }
    var widthHalf = size.x / 2, heightHalf = size.y / 2;
    
    var pos = vector3.clone();
    pos.project(camera);
    pos.x = ( pos.x * widthHalf ) + widthHalf + size.left;
    pos.y = - ( pos.y * heightHalf ) + heightHalf + size.top;
   
    return pos;
  }
  
}

export {Utils}