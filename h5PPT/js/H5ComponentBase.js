/* 基本图文组件对象 */

var H5ComponentBase=function(name,cfg){
 var cfg=cfg||{};
 //随机ID
 var id=("h5_c_"+Math.random()).replace(".","_");
 var cls=" h5_component_"+cfg.type;//H5构造函数addComponent会预定义type为base类型
 //组件类：h5_component h5_component_name_myName h5_component_type
 var component=$('<div class="h5_component h5_component_name_'+name+cls+'" id="'+id+'">');
 cfg.text&&component.text(cfg.text);
 cfg.bg&&component.css("backgroundImage","url("+cfg.bg+")");
 //为适配双倍分辨率高清屏，设计尺寸/2
 cfg.width&&component.width(cfg.width/2);
 cfg.height&&component.height(cfg.height/2);
 
 cfg.css&&component.css(cfg.css);
 
 if(cfg.center===true&&cfg.width){
    component.css({
        marginLeft:-1*(cfg.width/4)+"px",
        left:"50%"
    });
 }
 if(typeof cfg.onclick==="function"){
    component.on("click",cfg.onclick);
 }
 //translate方法相对定位
 if(cfg.relativeTo){
        //取得作为定位参考的元素parent为jquery对象
        var parent = $('body').find('.h5_component_name_'+cfg.relativeTo);
        //parent[0]等同于parent.get(0)得到原生DOM元素
        //不能用parent.offset()来取，它是相对文档的距离
        //这里是相对父元素
        var position = {
            left:parent[0].offsetLeft,
            top:parent[0].offsetTop
        };
        if(cfg.center === true){
            position.left=0;
        }
        component.css('transform','translate('+position.left+'px,'+position.top+'px)');
 }
 component.on("onLoad",function () {
    //父子DOM结构相对定位
 	// if(cfg.relativeTo){
 	// 	var parent=component.parent().find('.h5_component_name_'+cfg.relativeTo);
 	// 	if(parent.size()){
 	// 		component.appendTo(parent);	
 	// 	}
  //       cfg.relativeTo=false;
 	// }	
    setTimeout(function(){
    	component.addClass(cls+"_load").removeClass(cls+"_leave");
    	cfg.animateIn&&component.animate(cfg.animateIn);
    },cfg.delay||0)
    
    return false;
 });
 component.on("onLeave",function () {
    setTimeout(function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate( cfg.animateOut );
    },cfg.delay || 0)
    return false;
 });
 return component;
}