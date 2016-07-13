/* 饼图组件对象 */

var H5ComponentPie=function(name,cfg){
	var component=H5ComponentBase(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//背景层
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	$(cvs).css("z-index",1);
	component.append(cvs);

	var r=w/2;
	var step=cfg.data.length;
	ctx.beginPath();
	ctx.fillStyle="#eee";
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	//数据层，复用cvs及ctx变量
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	$(cvs).css("z-index",2);
	component.append(cvs);
	//预定义一组填充色，初始化起始角度，结束角度
	var colors=["#f00","#0f0","#00f","#0ff","#f0f"];
	var sAngel=cfg.sAng||1.5*Math.PI;
	var eAngel=0;
	var aAngel=2*Math.PI;//一周

	for(var i=0;i<step;i++){
		var item=cfg.data[i];
		var color=item[2]||(item[2]=colors.pop());
		eAngel=sAngel+aAngel*item[1];
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.lineWidth=1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		sAngel=eAngel;
		var text=$("<div class='text'>");
		text.text(cfg.data[i][0]);
		var per=$("<div class='per'>");
		per.text(cfg.data[i][1]*100+"%");
		text.append(per);
		var x=r+Math.sin(0.5*Math.PI-sAngel)*r;
		var y=r+Math.cos(0.5*Math.PI-sAngel)*r;
		if(x>w/2){
			text.css("left",x/2);	
		}else{
			text.css("right",(w-x)/2);
		}
		if(y>h/2){
			text.css("top",y/2);	
		}else{
			text.css("bottom",(h-y)/2);
		}
		if(cfg.data[i][2]){
			text.css("color",cfg.data[i][2]);
			// text.css("color","#fff");
			// text.css("backgroundColor",cfg.data[i][2]);
		}
		text.css("opacity",0);
		component.append(text);
	}


	//遮罩层
	var cvs=document.createElement("canvas");
	var ctx=cvs.getContext("2d");
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	$(cvs).css("z-index",3);
	component.append(cvs);

	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	function draw(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per<=0){
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find(".text").css("opacity",0);
		}else{
			//最后参数设为true为逆时针绘制，由多变少
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}
		ctx.fill();
		ctx.stroke();
		if(per>=1){
			// component.find(".text").css("transition","all 0s");
			// H5ComponentPie.reSort(component.find(".text"));
			component.find(".text").css("transition","all 1s .5s").css("opacity",1);
			//动画到最后要清除遮罩层
			ctx.clearRect(0,0,w,h);
		}
	}
	//初始要完全遮罩
	draw(0);
	component.on("onLoad",function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);	
			},i*10);
		}
	});
	// component.on("onLeave",function(){
	// 	var s=1;
	// 	for(var i=0;i<100;i++){
	// 		setTimeout(function(){
	// 			s-=.01;
	// 			draw(s);
	// 		},i*10+500);	
	// 	}
	// 	component.find(".text").css("opacity",0);
	// });
	return component;
}
//项目重排
// H5ComponentPie.reSort=function(list){
// 	//检测相交
// 	var compare=function(domA,domB){
// 		var offsetA=$(domA).offset();
// 		var offsetB=$(domB).offset();

// 		var widthA=$(domA).width();
// 		var heightA=$(domA).height();
// 		var widthB=$(domB).width();
// 		var heightB=$(domB).height();

// 		var shadowA_x=[offsetA.left,widthA+offsetA.left];
// 		var shadowA_y=[offsetA.top,heightA+offsetA.top];

// 		var shadowB_x=[offsetB.left,widthB+offsetB.left];
// 		var shadowB_y=[offsetB.top,heightB+offsetB.top];

// 		var intersect_x=(shadowA_x[0]>shadowB_x[0]&&shadowA_x[0]<shadowB_x[1])||(shadowA_x[1]>shadowB_x[0]&&shadowA_x[1]<shadowB_x[1]);
// 		var intersect_y=(shadowA_y[0]>shadowB_y[0]&&shadowA_y[0]<shadowB_y[1])||(shadowA_y[1]>shadowB_y[0]&&shadowA_y[1]<shadowB_y[1]);
// 		return intersect_x&&intersect_y;
// 	}
// 	//错开重排
// 	var reset=function(domA,domB){
// 		if($(domA).css("top")!=="auto"){
// 			$(domA).css("top",parseInt($(domA).css("top"))+$(domB).height());
// 		}
// 		if($(domA).css("bottom")!=="auto"){
// 			$(domA).css("bottom",parseInt($(domA).css("bottom"))+$(domB).height());
// 		}
// 	}
// 	//定义将要重排的元素
// 	var willReset=[list[0]];
// 	$.each(list,function(i,domTarget){
// 		if(list[i+1]){
// 			if(compare(willReset[willReset.length-1],domTarget)){
// 				willReset.push(domTarget);
// 			}
// 		}
// 	});
// 	if(willReset.length>1){
// 		$.each(willReset,function(i,domA){
// 			if(willReset[i+1]){
// 				reset(domA,willReset[i+1]);//domA就是willReset[i]
// 			}
// 		});
// 		H5ComponentPie.reSort(willReset);
// 	}
// }







