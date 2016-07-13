/* 散点图表组件对象 */

var H5ComponentPoint=function(name,cfg){
	var component=H5ComponentBase(name,cfg);
	//以第一个为定位基准
	var base=cfg.data[0][1];
	$.each(cfg.data,function(index,item){
		var point=$("<div class='point point_"+index+"'>");
		var name=$("<div class='name'>"+item[0]+"</div>");	
		var rate=$("<div class='per'>"+(item[1])*100+"%</div>");	
		name.append(rate);
		point.append(name);
		var per=(item[1]/base)*100+"%";
		point.width(per).height(per);
		
		if(item[2]){
			point.css("background-color",item[2]);
		}
		if(item[3]!==undefined&&item[4]!==undefined){
			point.css("left",item[3]).css("top",item[4]);
			//jquery的data方法暂存数据
			point.data("left",item[3]).data("top",item[4]);
		}
		point.css("z-index",100-index);
		point.css("left",0).css("top",0);
		point.css("transition","all 1s "+index*0.5+"s");
		component.append(point);
	})
	component.on("onLoad",function(){
		component.find(".point").each(function(index,item){
			$(item).css("left",$(item).data("left")).css("top",$(item).data("top"));
		})
	});
	component.on("onLeave",function(){
		component.find(".point").each(function(index,item){
			$(item).css("left",0).css("top",0);
		})
	});
	component.find(".point").on("click",function(){
		component.find(".point").removeClass("point_focus");
		$(this).addClass("point_focus");
		return false;
	}).eq(0).addClass("point_focus");
	return component;
}