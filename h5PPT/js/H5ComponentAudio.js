var H5ComponentAudio=function(name,cfg){
	var component=H5ComponentBase(name,cfg);
	var audio=$('<audio src="'+cfg.src+'" controls>');
	cfg.autoplay&&audio.attr("autoplay","autoplay");
	cfg.css&&component.css(cfg.css);
	component.append(audio);


	return component;
}