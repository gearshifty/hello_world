
## H5PPT简介
此Demo为慕课网实战课程《组件式开发Web App全站》的实践项目，基本实现了课程中的全部内容，另外有些增强点，如补充了音频，视频的添加功能，环图（Ring）实现了类似中控台的指针跟随（CSS小技巧）。

整个项目实现了用HTML5&CSS3&Jquery模仿PPT的功能，项目灵感来源于百度移动互联网发展年度报告，以手机屏幕为开发基准，故浏览器查看请开控制台手机调试模式（当然是现代浏览器）。

##### 库依赖：
jquery，jquery-ui，jquery-fullPage

##### 项目结构：
- index.html为入口文件。
- 项目类H5.js（对应样式H5.css）
- 网络延迟加载动画H5_loading.js（对应样式H5_loading.css）。
- 10种组件类比，每一种组件为一个js加一个css（分别位于js和css文件夹，Audio和Video类无css），以H5ComponentXxx命名，1个基类Base，2个多媒体类Audio/Video,3个用纯CSS实现Bar/Bar_v/Point，4个结合canvas实现Polyline/Pie/Ring/Radar。