/* 柱图组件对象 */

var H5ComponentBar_v=function(name,cfg){
	var component=H5ComponentBar(name,cfg);
	var width=(100/cfg.data.length)>>0;
	component.find(".line").width(width+"%");

	//取出原来水平方向的宽度值设为现在的高度值
	$.each(component.find(".rate"),function(){
		var w=$(this).width();
		$(this).height(w).width("");
	});

	//perDOM结构变动，放入rate里
	$.each(component.find(".per"),function(){
		$(this).appendTo($(this).prev());
	});


	return component;
}