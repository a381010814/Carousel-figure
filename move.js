

//获取style样式的值
//obj: 要获取的style样式的目标元素节点
//attr: 要获取的样式的属性值
function getStyle(obj, attr) {
	if (window.getComputedStyle) { //支持IE9+, 谷歌, 火狐...
		return getComputedStyle(obj, null)[attr];
	} else { //IE8及以下
		return obj.currentStyle[attr];
	}
}

//startMove(oList, {top: iTop, left:100, opacity:100}, next);
//obj: 需要移动的目标节点对象
//json: 包含一个或多个属性值(attr)和目标值(iTarget)
//fn: 运动完成后的回调函数
function startMove(obj, json, fn) {
	//清除原来的定时器
	clearInterval(obj.timer);
	
	//开启新定时器
	obj.timer = setInterval(function(){
		
		//遍历json对象
		for (var attr in json) {
			//目标值
			var iTarget = json[attr];
			
			//1, 当前值current
			var current = 0;
			//如果改的是透明度
			if (attr == "opacity") {
				current = parseFloat(getStyle(obj, attr))*100;
				current = iTarget>current ? current : parseInt(current);
			}
			//如果是left/top/width/height
			else {
				current = parseInt(getStyle(obj, attr));
			}
			
			//2, 计算速度iSpeed
			var iSpeed = (iTarget - current) / 8;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			//3, 判断临界值
			if (current == iTarget) {
				clearInterval(obj.timer);
				
				//当运动停止后, 回调函数, 告诉调用者我的运动结束了
if (fn) {
	fn(); //回调
}
			}
			//4, 移动/改变
			else {
				//透明度
				if (attr == "opacity") {
					obj.style.opacity = (current + iSpeed)/100;
					obj.style.filter = "alpha(opacity=" + (current+iSpeed) + ")"; 
				}
				//非透明度
				else {
					obj.style[attr] = current + iSpeed + "px";
				}
			}
			
		}
		
		
	}, 30);
}




