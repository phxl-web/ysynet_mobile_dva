/**
 * base64图片压缩
 * @param {*} file 
 */
export const compressImage = (imageFile, callback) => {
  const file = imageFile.file;
  const fileType = file.type;
  let fileReader = new FileReader();  
  fileReader.readAsDataURL(file);  
  fileReader.onload = event => {
    let result = event.target.result;   //返回的dataURL  
    let image = new Image();  
    image.src = result;  
    image.onload = function(){  //创建一个image对象，给canvas绘制使用  
      let cvs = document.createElement('canvas');  
      var scale = 1;    
      if(this.width > 500 || this.height > 500){  //800只是示例，可以根据具体的要求去设定    
        if(this.width > this.height){    
          scale = 500 / this.width;  
        }else{    
          scale = 500 / this.height;    
        }    
      }  
      cvs.width = this.width * scale;    
      cvs.height = this.height * scale;     //计算等比缩小后图片宽高  
      let ctx = cvs.getContext('2d');    
      ctx.drawImage(this, 0, 0, cvs.width, cvs.height);  
      let newImageData = cvs.toDataURL(fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>  
      callback(newImageData);
    }
    return image;  
  }
}


export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}