var H5_loading=function(images){
	var id=this.id;
	if(this._images===undefined){
		this._images=(images||[]).length;
		this._loaded=0;
		window[id]=this;//暂时把this保存到window下
		for(var i=0;i<images.length;i++){
			var item=images[i];
			var img=new Image();
			img.onload=function(){
				window[id].loader();
			}
			img.src=item;
		}
		$("#rate").text("0%");
		return this;
	}else{
		this._loaded++;
		$("#rate").text(((this._loaded/this._images*100)>>0)+"%");
		if(this._loaded<this._images){
			return this;
		}
	}
	window[id]=null;
	this.el.fullpage({
		onLeave:function(index,nextIndex,direction){
            $(this).find(".h5_component").trigger("onLeave");
          },
        afterLoad:function(anchorLink,index){
            $(this).find(".h5_component").trigger("onLoad");
          }
	});
	this.pages[0].find(".h5_component").trigger("onLoad");
	this.el.show();
	// $.fn.fullpage.moveTo(0);//指定单页调试用(1-10),0,-1可以倒数，0为最后页
}