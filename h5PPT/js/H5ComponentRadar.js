/* 雷达图组件对象 */

var H5ComponentRadar=function(name,cfg){
	var component=H5ComponentBase(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//背景层
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);

	var r=w/2;
	var step=cfg.data.length;

	for(var j=10;j>0;j--){
		one(j/10);
	}
	//per从1到0.1，绘制多个等边多边形，小的叠加在大的层上
	function one(per){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var x=r+Math.sin(rad)*r*per;
			var y=r+Math.cos(rad)*r*per;
			ctx.lineTo(x,y);	
		}
		ctx.closePath();
		ctx.fillStyle=(per*10)%2===0?"#99c0ff":"#f1f9ff";
		ctx.fill();
	}
	//伞骨，添加html标题
	for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;
		var x=r+Math.sin(rad)*r;
		var y=r+Math.cos(rad)*r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		var txt=$("<div class='text'>");
		txt.text(cfg.data[i][0]);
		txt.css("transition","all 1s "+0.1*i+"s" );
		if(x>w/2){
			txt.css("left",x/2);
		}else{
			txt.css("right",(w-x)/2);
		}
		if(y>h/2){
			txt.css("top",y/2);
		}else{
			txt.css("bottom",(h-y)/2);
		}
		if(cfg.data[i][2]){
			txt.css("color",cfg.data[i][2]);
		}
		txt.css("opacity",0);
		component.append(txt);
	}	
	ctx.strokeStyle="#e0e0e0";
	ctx.stroke();
	//数据层
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);
	ctx.beginPath();
	ctx.strokeStyle="#f00";
	//绘制连线动画，从中心点扩散开
	function draw(per){
		if(per>=1){
			component.find(".text").css("opacity",1);	
		}
		if(per<1){
			component.find(".text").css("opacity",0);	
		}
		ctx.clearRect(0,0,w,h);
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var rate=cfg.data[i][1]*per;
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.stroke();
		//填充数据点
		ctx.fillStyle="#ff7676";
		for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;
		var rate=cfg.data[i][1]*per;
		var x=r+Math.sin(rad)*r*rate;
		var y=r+Math.cos(rad)*r*rate;
		ctx.beginPath();
		ctx.arc(x,y,5,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		}
	}
	component.on("onLoad",function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10);	
		}
	});
	component.on("onLeave",function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10+500);	
		}
	});


	return component;
}