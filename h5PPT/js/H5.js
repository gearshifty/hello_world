/* 内容管理对象 */

var H5=function(){
	//滑动页面总容器，带随机ID
	this.id=("h5_"+Math.random()).replace(".","_");
	this.el=$('<div class="h5" id="'+this.id+'">').hide();
	this.pages=[];
	$("body").append(this.el);
	//添加滑动单页，section类为fullpage.js需要，单页通常只做容器
	this.addPage=function(name,text){
		var page=$('<div class="h5_page section">');
		if(name!=undefined){
			page.addClass("h5_page_"+name)
		}
		if(text!=undefined){
			page.text(text);
		}
		this.el.append(page);
		this.pages.push(page);
		//入口页添加的自定义方法，给每页添加footer
		if(typeof this.whenAddPage==="function"){
			this.whenAddPage();
		}
		return this;
	};
	//每个单页内添加组件，共10种，
	//1个基本图文(base)，
	//2个多媒体(audio,video)，
	//3个HTML&CSS简单图表(point,bar,bar_v)，
	//4个Canvas复杂图表(polyline,radar,pie,ring)
	this.addComponent=function(name,cfg){
		var cfg=cfg||{};
		//jquery的extend方法定义默认组件类型,同参数名后面覆盖前面
		//还可以$.extend({},{type:"base"},cfg)这样{type:"base"}自身不会被修改
		cfg=$.extend({type:"base"},cfg);

		var component;
		// var page=this.pages.slice(-1)[0];//slice返回数组
		var page=this.pages[this.pages.length-1];
		switch(cfg.type){
			case "base":
				component=H5ComponentBase(name,cfg);
				break;
			case "polyline":
				component=H5ComponentPolyline(name,cfg);
				break;
			case "pie":
				component=H5ComponentPie(name,cfg);
				break;
			case "bar":
				component=H5ComponentBar(name,cfg);
				break;
			case "bar_v":
				component=H5ComponentBar_v(name,cfg);
				break;
			case "ring":
				component=H5ComponentRing(name,cfg);
				break;
			case "radar":
				component=H5ComponentRadar(name,cfg);
				break;
			case "point":
				component=H5ComponentPoint(name,cfg);
				break;
			case "audio":
				component=H5ComponentAudio(name,cfg);
				break;
			case "video":
				component=H5ComponentVideo(name,cfg);
				break;
			default:
		}
		page.append(component);
		return this;
	}

	this.loader=H5_loading;
	//未加入loading前的loader，加入loading后firstPage失效(？待解决)
	// this.loader=function(images,firstPage){
	// 	this.el.fullpage({
	// 		onLeave:function(index,nextIndex,direction){
 //                $(this).find(".h5_component").trigger("onLeave");
 //              },
 //            afterLoad:function(anchorLink,index){
 //                $(this).find(".h5_component").trigger("onLoad");
 //              }
	// 	});
	// 	this.pages[0].find(".h5_component").trigger("onLoad");
	// 	this.el.show();
	// 	if(firstPage){
	// 		$.fn.fullpage.moveTo(firstPage);
	// 	}
	// };	
	// this.loader=typeof H5_loading=="function" ? H5_loading : this.loader;	
	return this;
}