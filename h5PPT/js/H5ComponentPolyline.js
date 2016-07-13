/* 柱图组件对象 */

var H5ComponentPolyline=function(name,cfg){
	var component=H5ComponentBase(name,cfg);

	var w=cfg.width;
	var h=cfg.height;
	//canvas会在CSS中设置为100%以适应其容器component
	//canvas可按cfg给的尺寸设置原始值，新加入html元素如
	//下面文字则要缩小一半以适应双倍屏
	//背景网格线层
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);
	
	var step=10;//10行
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#444";
	//划线数=行数+1
	for(var i=0;i<step+1;i++){
		//每行高度=总长/行数
		var y=(h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//数据列数，可以复用step变量，要求左右各留一条纵坐标轴
	step=cfg.data.length;
	//求每列宽，总列数=数据列数+1，划线数还要+1
	var row_w=w/(step+1);
	for(var i=0;i<step+2;i++){
		var x=row_w*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
			var txt=$("<div class='text'>");
			txt.text(cfg.data[i][0]);
			txt.css("width",row_w/2);
			txt.css("left",row_w*(i+1)/2-row_w/4);
			txt.css("-webkit-transition","all 1s "+(1.5+0.1*i)+"s");
			component.append(txt);
		}
	}
	ctx.stroke();

	//数据展示层
	var cvs2=document.createElement("canvas");
	var ctx2=cvs2.getContext("2d");
	cvs2.width=ctx2.width=w;
	cvs2.height=ctx2.height=h; 
	component.append(cvs2);

	var draw=function(per){
		ctx2.clearRect(0,0,w,h);
		ctx2.beginPath();
		ctx2.lineWidth=3;
		ctx2.strokeStyle="#ff8878";
		//标记数据圆点
		var x=0;
		var y=0;
		for(var i=0;i<step;i++){
			var item=cfg.data[i];
			x=(i+1)*row_w;
			y=(1-item[1]*per)*h;
			ctx2.moveTo(x,y);
			ctx2.arc(x,y,5,0,2*Math.PI);
		}
		//连线，移动到第一点
		//引入per实现垂直方向按百分比变化的动画
		ctx2.moveTo(row_w,h*(1-cfg.data[0][1]*per));
		for(var i=1;i<step;i++){
			var item=cfg.data[i];
			x=(i+1)*row_w;
			y=(1-item[1]*per)*h;
			ctx2.lineTo(x,y);
		}
		ctx2.stroke();
		//填充下方区域
		ctx2.strokeStyle="rgba(255,255,255,0)";
		ctx2.lineTo(x,h);
		ctx2.lineTo(row_w,h);
		ctx2.closePath();
		ctx2.fillStyle="rgba(255,136,120,.2)";
		ctx2.fill();
		//显示数据文字
		for(var i=0;i<step;i++){
			var item=cfg.data[i];
			x=(i+1)*row_w;
			y=(1-item[1]*per)*h;
			ctx2.fillStyle=item[2]?item[2]:"#595959";
			ctx2.fillText((item[1]*100>>0)+"%",x-10,y-10);
		}
	}
	component.on("onLoad",function(){
		var s=0;//per=s，0-1变化实现y的比例变化
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10);	
		}
	});
	//离开动画可省略，看不到
	// component.on("onLeave",function(){
	// 	var s=1;
	// 	for(var i=0;i<100;i++){
	// 		setTimeout(function(){
	// 			s-=.01;
	// 			draw(s);
	// 		},i*10+500);	
	// 	}
	// });
	
	return component;
}
