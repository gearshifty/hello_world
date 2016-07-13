/* 环图组件对象 */

var H5ComponentRing=function(name,cfg){
	//格式化数据，只保留一个
	if(cfg.data.length>1){
		cfg.data=[cfg.data[0]];
	}
	cfg.type="pie";
	var component=H5ComponentPie(name,cfg);
	component.addClass("h5_component_ring");
	//原图层上覆盖一个html制作的圆形遮罩
	var mask=$("<div class='mask'>");
	//检测是否为仪表盘类型
	var isP=cfg.isPanel||false;
	var panel=$("<div class='triangle'>");
	var circle=$("<div class='circle'>");
	if(isP){
		mask.append(panel);
		mask.append(circle);
	}
	component.append(mask);
	//原来文字样式取消
	var text=component.find(".text");
	text.attr("style","");
	if(cfg.data[0][2]){
		text.css("color",cfg.data[0][2]);
	}
	//非仪表盘类型时文字添加到mask中央
	if(!isP){
		mask.append(text);
	}
	return component;
}








