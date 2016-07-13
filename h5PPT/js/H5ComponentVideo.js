var H5ComponentVideo=function(name,cfg){
	var component=H5ComponentBase(name,cfg);
	var video=$('<video src="'+cfg.src+'" controls>');
 	cfg.width&&video.attr("width","100%");
 	cfg.height&&video.attr("height",cfg.height/2);
	cfg.css&&component.css(cfg.css);
	
	component.append(video);
	return component;
}