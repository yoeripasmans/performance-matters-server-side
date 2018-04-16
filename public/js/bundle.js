!function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}return e}()({1:[function(require,module,exports){!function(window,factory){"use strict";"function"==typeof define&&define.amd?define(factory):"object"==typeof module&&module.exports?module.exports=factory():window.matchesSelector=factory()}(window,function(){"use strict";var matchesMethod=function(){var ElemProto=window.Element.prototype;if(ElemProto.matches)return"matches";if(ElemProto.matchesSelector)return"matchesSelector";for(var prefixes=["webkit","moz","ms","o"],i=0;i<prefixes.length;i++){var prefix=prefixes[i],method=prefix+"MatchesSelector";if(ElemProto[method])return method}}();return function(elem,selector){return elem[matchesMethod](selector)}})},{}],2:[function(require,module,exports){!function(global,factory){"function"==typeof define&&define.amd?define(factory):"object"==typeof module&&module.exports?module.exports=factory():global.EvEmitter=factory()}("undefined"!=typeof window?window:this,function(){"use strict";function EvEmitter(){}var proto=EvEmitter.prototype;return proto.on=function(eventName,listener){if(eventName&&listener){var events=this._events=this._events||{},listeners=events[eventName]=events[eventName]||[];return listeners.indexOf(listener)==-1&&listeners.push(listener),this}},proto.once=function(eventName,listener){if(eventName&&listener){this.on(eventName,listener);var onceEvents=this._onceEvents=this._onceEvents||{};return(onceEvents[eventName]=onceEvents[eventName]||{})[listener]=!0,this}},proto.off=function(eventName,listener){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){var index=listeners.indexOf(listener);return index!=-1&&listeners.splice(index,1),this}},proto.emitEvent=function(eventName,args){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){listeners=listeners.slice(0),args=args||[];for(var onceListeners=this._onceEvents&&this._onceEvents[eventName],i=0;i<listeners.length;i++){var listener=listeners[i];onceListeners&&onceListeners[listener]&&(this.off(eventName,listener),delete onceListeners[listener]),listener.apply(this,args)}return this}},proto.allOff=function(){delete this._events,delete this._onceEvents},EvEmitter})},{}],3:[function(require,module,exports){!function(window,factory){"function"==typeof define&&define.amd?define(["desandro-matches-selector/matches-selector"],function(matchesSelector){return factory(window,matchesSelector)}):"object"==typeof module&&module.exports?module.exports=factory(window,require("desandro-matches-selector")):window.fizzyUIUtils=factory(window,window.matchesSelector)}(window,function(window,matchesSelector){"use strict";var utils={};utils.extend=function(a,b){for(var prop in b)a[prop]=b[prop];return a},utils.modulo=function(num,div){return(num%div+div)%div};var arraySlice=Array.prototype.slice;utils.makeArray=function(obj){return Array.isArray(obj)?obj:null===obj||void 0===obj?[]:"object"==typeof obj&&"number"==typeof obj.length?arraySlice.call(obj):[obj]},utils.removeFrom=function(ary,obj){var index=ary.indexOf(obj);index!=-1&&ary.splice(index,1)},utils.getParent=function(elem,selector){for(;elem.parentNode&&elem!=document.body;)if(elem=elem.parentNode,matchesSelector(elem,selector))return elem},utils.getQueryElement=function(elem){return"string"==typeof elem?document.querySelector(elem):elem},utils.handleEvent=function(event){var method="on"+event.type;this[method]&&this[method](event)},utils.filterFindElements=function(elems,selector){elems=utils.makeArray(elems);var ffElems=[];return elems.forEach(function(elem){if(elem instanceof HTMLElement){if(!selector)return void ffElems.push(elem);matchesSelector(elem,selector)&&ffElems.push(elem);for(var childElems=elem.querySelectorAll(selector),i=0;i<childElems.length;i++)ffElems.push(childElems[i])}}),ffElems},utils.debounceMethod=function(_class,methodName,threshold){threshold=threshold||100;var method=_class.prototype[methodName],timeoutName=methodName+"Timeout";_class.prototype[methodName]=function(){var timeout=this[timeoutName];clearTimeout(timeout);var args=arguments,_this=this;this[timeoutName]=setTimeout(function(){method.apply(_this,args),delete _this[timeoutName]},threshold)}},utils.docReady=function(callback){var readyState=document.readyState;"complete"==readyState||"interactive"==readyState?setTimeout(callback):document.addEventListener("DOMContentLoaded",callback)},utils.toDashed=function(str){return str.replace(/(.)([A-Z])/g,function(match,$1,$2){return $1+"-"+$2}).toLowerCase()};var console=window.console;return utils.htmlInit=function(WidgetClass,namespace){utils.docReady(function(){var dashedNamespace=utils.toDashed(namespace),dataAttr="data-"+dashedNamespace,dataAttrElems=document.querySelectorAll("["+dataAttr+"]"),jsDashElems=document.querySelectorAll(".js-"+dashedNamespace),elems=utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems)),dataOptionsAttr=dataAttr+"-options",jQuery=window.jQuery;elems.forEach(function(elem){var options,attr=elem.getAttribute(dataAttr)||elem.getAttribute(dataOptionsAttr);try{options=attr&&JSON.parse(attr)}catch(error){return void(console&&console.error("Error parsing "+dataAttr+" on "+elem.className+": "+error))}var instance=new WidgetClass(elem,options);jQuery&&jQuery.data(elem,namespace,instance)})})},utils})},{"desandro-matches-selector":1}],4:[function(require,module,exports){!function(window,factory){"use strict";"function"==typeof define&&define.amd?define(function(){return factory()}):"object"==typeof module&&module.exports?module.exports=factory():window.getSize=factory()}(window,function(){"use strict";function getStyleSize(value){var num=parseFloat(value);return value.indexOf("%")==-1&&!isNaN(num)&&num}function noop(){}function getZeroSize(){for(var size={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},i=0;i<measurementsLength;i++){size[measurements[i]]=0}return size}function getStyle(elem){var style=getComputedStyle(elem);return style||logError("Style returned "+style+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),style}function setup(){if(!isSetup){isSetup=!0;var div=document.createElement("div");div.style.width="200px",div.style.padding="1px 2px 3px 4px",div.style.borderStyle="solid",div.style.borderWidth="1px 2px 3px 4px",div.style.boxSizing="border-box";var body=document.body||document.documentElement;body.appendChild(div);var style=getStyle(div);getSize.isBoxSizeOuter=isBoxSizeOuter=200==getStyleSize(style.width),body.removeChild(div)}}function getSize(elem){if(setup(),"string"==typeof elem&&(elem=document.querySelector(elem)),elem&&"object"==typeof elem&&elem.nodeType){var style=getStyle(elem);if("none"==style.display)return getZeroSize();var size={};size.width=elem.offsetWidth,size.height=elem.offsetHeight;for(var isBorderBox=size.isBorderBox="border-box"==style.boxSizing,i=0;i<measurementsLength;i++){var measurement=measurements[i],value=style[measurement],num=parseFloat(value);size[measurement]=isNaN(num)?0:num}var paddingWidth=size.paddingLeft+size.paddingRight,paddingHeight=size.paddingTop+size.paddingBottom,marginWidth=size.marginLeft+size.marginRight,marginHeight=size.marginTop+size.marginBottom,borderWidth=size.borderLeftWidth+size.borderRightWidth,borderHeight=size.borderTopWidth+size.borderBottomWidth,isBorderBoxSizeOuter=isBorderBox&&isBoxSizeOuter,styleWidth=getStyleSize(style.width);styleWidth!==!1&&(size.width=styleWidth+(isBorderBoxSizeOuter?0:paddingWidth+borderWidth));var styleHeight=getStyleSize(style.height);return styleHeight!==!1&&(size.height=styleHeight+(isBorderBoxSizeOuter?0:paddingHeight+borderHeight)),size.innerWidth=size.width-(paddingWidth+borderWidth),size.innerHeight=size.height-(paddingHeight+borderHeight),size.outerWidth=size.width+marginWidth,size.outerHeight=size.height+marginHeight,size}}var isBoxSizeOuter,logError="undefined"==typeof console?noop:function(message){console.error(message)},measurements=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],measurementsLength=measurements.length,isSetup=!1;return getSize})},{}],5:[function(require,module,exports){!function(window,factory){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(EvEmitter){return factory(window,EvEmitter)}):"object"==typeof module&&module.exports?module.exports=factory(window,require("ev-emitter")):window.imagesLoaded=factory(window,window.EvEmitter)}("undefined"!=typeof window?window:this,function(window,EvEmitter){"use strict";function extend(a,b){for(var prop in b)a[prop]=b[prop];return a}function makeArray(obj){return Array.isArray(obj)?obj:"object"==typeof obj&&"number"==typeof obj.length?arraySlice.call(obj):[obj]}function ImagesLoaded(elem,options,onAlways){if(!(this instanceof ImagesLoaded))return new ImagesLoaded(elem,options,onAlways);var queryElem=elem;if("string"==typeof elem&&(queryElem=document.querySelectorAll(elem)),!queryElem)return void console.error("Bad element for imagesLoaded "+(queryElem||elem));this.elements=makeArray(queryElem),this.options=extend({},this.options),"function"==typeof options?onAlways=options:extend(this.options,options),onAlways&&this.on("always",onAlways),this.getImages(),$&&(this.jqDeferred=new $.Deferred),setTimeout(this.check.bind(this))}function LoadingImage(img){this.img=img}function Background(url,element){this.url=url,this.element=element,this.img=new Image}var $=window.jQuery,console=window.console,arraySlice=Array.prototype.slice;ImagesLoaded.prototype=Object.create(EvEmitter.prototype),ImagesLoaded.prototype.options={},ImagesLoaded.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},ImagesLoaded.prototype.addElementImages=function(elem){"IMG"==elem.nodeName&&this.addImage(elem),this.options.background===!0&&this.addElementBackgroundImages(elem);var nodeType=elem.nodeType;if(nodeType&&elementNodeTypes[nodeType]){for(var childImgs=elem.querySelectorAll("img"),i=0;i<childImgs.length;i++){var img=childImgs[i];this.addImage(img)}if("string"==typeof this.options.background){var children=elem.querySelectorAll(this.options.background);for(i=0;i<children.length;i++){var child=children[i];this.addElementBackgroundImages(child)}}}};var elementNodeTypes={1:!0,9:!0,11:!0};return ImagesLoaded.prototype.addElementBackgroundImages=function(elem){var style=getComputedStyle(elem);if(style)for(var reURL=/url\((['"])?(.*?)\1\)/gi,matches=reURL.exec(style.backgroundImage);null!==matches;){var url=matches&&matches[2];url&&this.addBackground(url,elem),matches=reURL.exec(style.backgroundImage)}},ImagesLoaded.prototype.addImage=function(img){var loadingImage=new LoadingImage(img);this.images.push(loadingImage)},ImagesLoaded.prototype.addBackground=function(url,elem){var background=new Background(url,elem);this.images.push(background)},ImagesLoaded.prototype.check=function(){function onProgress(image,elem,message){setTimeout(function(){_this.progress(image,elem,message)})}var _this=this;if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length)return void this.complete();this.images.forEach(function(loadingImage){loadingImage.once("progress",onProgress),loadingImage.check()})},ImagesLoaded.prototype.progress=function(image,elem,message){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded,this.emitEvent("progress",[this,image,elem]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,image),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&console&&console.log("progress: "+message,image,elem)},ImagesLoaded.prototype.complete=function(){var eventName=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(eventName,[this]),this.emitEvent("always",[this]),this.jqDeferred){var jqMethod=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[jqMethod](this)}},LoadingImage.prototype=Object.create(EvEmitter.prototype),LoadingImage.prototype.check=function(){if(this.getIsImageComplete())return void this.confirm(0!==this.img.naturalWidth,"naturalWidth");this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src},LoadingImage.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},LoadingImage.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.img,message])},LoadingImage.prototype.handleEvent=function(event){var method="on"+event.type;this[method]&&this[method](event)},LoadingImage.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},LoadingImage.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},LoadingImage.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype=Object.create(LoadingImage.prototype),Background.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},Background.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.element,message])},ImagesLoaded.makeJQueryPlugin=function(jQuery){(jQuery=jQuery||window.jQuery)&&($=jQuery,$.fn.imagesLoaded=function(options,callback){return new ImagesLoaded(this,options,callback).jqDeferred.promise($(this))})},ImagesLoaded.makeJQueryPlugin(),ImagesLoaded})},{"ev-emitter":2}],6:[function(require,module,exports){!function(window,factory){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],factory):"object"==typeof module&&module.exports?module.exports=factory(require("outlayer"),require("get-size")):window.Masonry=factory(window.Outlayer,window.getSize)}(window,function(Outlayer,getSize){"use strict";var Masonry=Outlayer.create("masonry");Masonry.compatOptions.fitWidth="isFitWidth";var proto=Masonry.prototype;return proto._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var i=0;i<this.cols;i++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},proto.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var firstItem=this.items[0],firstItemElem=firstItem&&firstItem.element;this.columnWidth=firstItemElem&&getSize(firstItemElem).outerWidth||this.containerWidth}var columnWidth=this.columnWidth+=this.gutter,containerWidth=this.containerWidth+this.gutter,cols=containerWidth/columnWidth,excess=columnWidth-containerWidth%columnWidth,mathMethod=excess&&excess<1?"round":"floor";cols=Math[mathMethod](cols),this.cols=Math.max(cols,1)},proto.getContainerWidth=function(){var isFitWidth=this._getOption("fitWidth"),container=isFitWidth?this.element.parentNode:this.element,size=getSize(container);this.containerWidth=size&&size.innerWidth},proto._getItemLayoutPosition=function(item){item.getSize();var remainder=item.size.outerWidth%this.columnWidth,mathMethod=remainder&&remainder<1?"round":"ceil",colSpan=Math[mathMethod](item.size.outerWidth/this.columnWidth);colSpan=Math.min(colSpan,this.cols);for(var colPosMethod=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",colPosition=this[colPosMethod](colSpan,item),position={x:this.columnWidth*colPosition.col,y:colPosition.y},setHeight=colPosition.y+item.size.outerHeight,setMax=colSpan+colPosition.col,i=colPosition.col;i<setMax;i++)this.colYs[i]=setHeight;return position},proto._getTopColPosition=function(colSpan){var colGroup=this._getTopColGroup(colSpan),minimumY=Math.min.apply(Math,colGroup);return{col:colGroup.indexOf(minimumY),y:minimumY}},proto._getTopColGroup=function(colSpan){if(colSpan<2)return this.colYs;for(var colGroup=[],groupCount=this.cols+1-colSpan,i=0;i<groupCount;i++)colGroup[i]=this._getColGroupY(i,colSpan);return colGroup},proto._getColGroupY=function(col,colSpan){if(colSpan<2)return this.colYs[col];var groupColYs=this.colYs.slice(col,col+colSpan);return Math.max.apply(Math,groupColYs)},proto._getHorizontalColPosition=function(colSpan,item){var col=this.horizontalColIndex%this.cols;col=colSpan>1&&col+colSpan>this.cols?0:col;var hasSize=item.size.outerWidth&&item.size.outerHeight;return this.horizontalColIndex=hasSize?col+colSpan:this.horizontalColIndex,{col:col,y:this._getColGroupY(col,colSpan)}},proto._manageStamp=function(stamp){var stampSize=getSize(stamp),offset=this._getElementOffset(stamp),isOriginLeft=this._getOption("originLeft"),firstX=isOriginLeft?offset.left:offset.right,lastX=firstX+stampSize.outerWidth,firstCol=Math.floor(firstX/this.columnWidth);firstCol=Math.max(0,firstCol);var lastCol=Math.floor(lastX/this.columnWidth);lastCol-=lastX%this.columnWidth?0:1,lastCol=Math.min(this.cols-1,lastCol);for(var isOriginTop=this._getOption("originTop"),stampMaxY=(isOriginTop?offset.top:offset.bottom)+stampSize.outerHeight,i=firstCol;i<=lastCol;i++)this.colYs[i]=Math.max(stampMaxY,this.colYs[i])},proto._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var size={height:this.maxY};return this._getOption("fitWidth")&&(size.width=this._getContainerFitWidth()),size},proto._getContainerFitWidth=function(){for(var unusedCols=0,i=this.cols;--i&&0===this.colYs[i];)unusedCols++;return(this.cols-unusedCols)*this.columnWidth-this.gutter},proto.needsResizeLayout=function(){var previousWidth=this.containerWidth;return this.getContainerWidth(),previousWidth!=this.containerWidth},Masonry})},{"get-size":4,outlayer:8}],7:[function(require,module,exports){!function(window,factory){"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter","get-size/get-size"],factory):"object"==typeof module&&module.exports?module.exports=factory(require("ev-emitter"),require("get-size")):(window.Outlayer={},window.Outlayer.Item=factory(window.EvEmitter,window.getSize))}(window,function(EvEmitter,getSize){"use strict";function isEmptyObj(obj){for(var prop in obj)return!1;return null,!0}function Item(element,layout){element&&(this.element=element,this.layout=layout,this.position={x:0,y:0},this._create())}var docElemStyle=document.documentElement.style,transitionProperty="string"==typeof docElemStyle.transition?"transition":"WebkitTransition",transformProperty="string"==typeof docElemStyle.transform?"transform":"WebkitTransform",transitionEndEvent={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[transitionProperty],vendorProperties={transform:transformProperty,transition:transitionProperty,transitionDuration:transitionProperty+"Duration",transitionProperty:transitionProperty+"Property",transitionDelay:transitionProperty+"Delay"},proto=Item.prototype=Object.create(EvEmitter.prototype);proto.constructor=Item,proto._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},proto.handleEvent=function(event){var method="on"+event.type;this[method]&&this[method](event)},proto.getSize=function(){this.size=getSize(this.element)},proto.css=function(style){var elemStyle=this.element.style;for(var prop in style){elemStyle[vendorProperties[prop]||prop]=style[prop]}},proto.getPosition=function(){var style=getComputedStyle(this.element),isOriginLeft=this.layout._getOption("originLeft"),isOriginTop=this.layout._getOption("originTop"),xValue=style[isOriginLeft?"left":"right"],yValue=style[isOriginTop?"top":"bottom"],x=parseFloat(xValue),y=parseFloat(yValue),layoutSize=this.layout.size;xValue.indexOf("%")!=-1&&(x=x/100*layoutSize.width),yValue.indexOf("%")!=-1&&(y=y/100*layoutSize.height),x=isNaN(x)?0:x,y=isNaN(y)?0:y,x-=isOriginLeft?layoutSize.paddingLeft:layoutSize.paddingRight,y-=isOriginTop?layoutSize.paddingTop:layoutSize.paddingBottom,this.position.x=x,this.position.y=y},proto.layoutPosition=function(){var layoutSize=this.layout.size,style={},isOriginLeft=this.layout._getOption("originLeft"),isOriginTop=this.layout._getOption("originTop"),xPadding=isOriginLeft?"paddingLeft":"paddingRight",xProperty=isOriginLeft?"left":"right",xResetProperty=isOriginLeft?"right":"left",x=this.position.x+layoutSize[xPadding];style[xProperty]=this.getXValue(x),style[xResetProperty]="";var yPadding=isOriginTop?"paddingTop":"paddingBottom",yProperty=isOriginTop?"top":"bottom",yResetProperty=isOriginTop?"bottom":"top",y=this.position.y+layoutSize[yPadding];style[yProperty]=this.getYValue(y),style[yResetProperty]="",this.css(style),this.emitEvent("layout",[this])},proto.getXValue=function(x){var isHorizontal=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!isHorizontal?x/this.layout.size.width*100+"%":x+"px"},proto.getYValue=function(y){var isHorizontal=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&isHorizontal?y/this.layout.size.height*100+"%":y+"px"},proto._transitionTo=function(x,y){this.getPosition();var curX=this.position.x,curY=this.position.y,didNotMove=x==this.position.x&&y==this.position.y;if(this.setPosition(x,y),didNotMove&&!this.isTransitioning)return void this.layoutPosition();var transX=x-curX,transY=y-curY,transitionStyle={};transitionStyle.transform=this.getTranslate(transX,transY),this.transition({to:transitionStyle,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},proto.getTranslate=function(x,y){var isOriginLeft=this.layout._getOption("originLeft"),isOriginTop=this.layout._getOption("originTop");return x=isOriginLeft?x:-x,y=isOriginTop?y:-y,"translate3d("+x+"px, "+y+"px, 0)"},proto.goTo=function(x,y){this.setPosition(x,y),this.layoutPosition()},proto.moveTo=proto._transitionTo,proto.setPosition=function(x,y){this.position.x=parseFloat(x),this.position.y=parseFloat(y)},proto._nonTransition=function(args){this.css(args.to),args.isCleaning&&this._removeStyles(args.to);for(var prop in args.onTransitionEnd)args.onTransitionEnd[prop].call(this)},proto.transition=function(args){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(args);var _transition=this._transn;for(var prop in args.onTransitionEnd)_transition.onEnd[prop]=args.onTransitionEnd[prop];for(prop in args.to)_transition.ingProperties[prop]=!0,args.isCleaning&&(_transition.clean[prop]=!0);if(args.from){this.css(args.from);this.element.offsetHeight;null}this.enableTransition(args.to),this.css(args.to),this.isTransitioning=!0};var transitionProps="opacity,"+function(str){return str.replace(/([A-Z])/g,function($1){return"-"+$1.toLowerCase()})}(transformProperty);proto.enableTransition=function(){if(!this.isTransitioning){var duration=this.layout.options.transitionDuration;duration="number"==typeof duration?duration+"ms":duration,this.css({transitionProperty:transitionProps,transitionDuration:duration,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(transitionEndEvent,this,!1)}},proto.onwebkitTransitionEnd=function(event){this.ontransitionend(event)},proto.onotransitionend=function(event){this.ontransitionend(event)};var dashedVendorProperties={"-webkit-transform":"transform"};proto.ontransitionend=function(event){if(event.target===this.element){var _transition=this._transn,propertyName=dashedVendorProperties[event.propertyName]||event.propertyName;if(delete _transition.ingProperties[propertyName],isEmptyObj(_transition.ingProperties)&&this.disableTransition(),propertyName in _transition.clean&&(this.element.style[event.propertyName]="",delete _transition.clean[propertyName]),propertyName in _transition.onEnd){_transition.onEnd[propertyName].call(this),delete _transition.onEnd[propertyName]}this.emitEvent("transitionEnd",[this])}},proto.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(transitionEndEvent,this,!1),this.isTransitioning=!1},proto._removeStyles=function(style){var cleanStyle={};for(var prop in style)cleanStyle[prop]="";this.css(cleanStyle)};var cleanTransitionStyle={transitionProperty:"",transitionDuration:"",transitionDelay:""};return proto.removeTransitionStyles=function(){this.css(cleanTransitionStyle)},proto.stagger=function(delay){delay=isNaN(delay)?0:delay,this.staggerDelay=delay+"ms"},proto.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},proto.remove=function(){if(!transitionProperty||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();this.once("transitionEnd",function(){this.removeElem()}),this.hide()},proto.reveal=function(){delete this.isHidden,this.css({display:""});var options=this.layout.options,onTransitionEnd={};onTransitionEnd[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:options.hiddenStyle,to:options.visibleStyle,isCleaning:!0,onTransitionEnd:onTransitionEnd})},proto.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},proto.getHideRevealTransitionEndProperty=function(styleProperty){var optionStyle=this.layout.options[styleProperty];if(optionStyle.opacity)return"opacity";for(var prop in optionStyle)return prop},proto.hide=function(){this.isHidden=!0,this.css({display:""});var options=this.layout.options,onTransitionEnd={};onTransitionEnd[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:options.visibleStyle,to:options.hiddenStyle,isCleaning:!0,onTransitionEnd:onTransitionEnd})},proto.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},proto.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},Item})},{"ev-emitter":2,"get-size":4}],8:[function(require,module,exports){!function(window,factory){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(EvEmitter,getSize,utils,Item){return factory(window,EvEmitter,getSize,utils,Item)}):"object"==typeof module&&module.exports?module.exports=factory(window,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):window.Outlayer=factory(window,window.EvEmitter,window.getSize,window.fizzyUIUtils,window.Outlayer.Item)}(window,function(window,EvEmitter,getSize,utils,Item){"use strict";function Outlayer(element,options){var queryElement=utils.getQueryElement(element);if(!queryElement)return void(console&&console.error("Bad element for "+this.constructor.namespace+": "+(queryElement||element)));this.element=queryElement,jQuery&&(this.$element=jQuery(this.element)),this.options=utils.extend({},this.constructor.defaults),this.option(options);var id=++GUID;this.element.outlayerGUID=id,instances[id]=this,this._create(),this._getOption("initLayout")&&this.layout()}function subclass(Parent){function SubClass(){Parent.apply(this,arguments)}return SubClass.prototype=Object.create(Parent.prototype),SubClass.prototype.constructor=SubClass,SubClass}function getMilliseconds(time){if("number"==typeof time)return time;var matches=time.match(/(^\d*\.?\d*)(\w*)/),num=matches&&matches[1],unit=matches&&matches[2];return num.length?(num=parseFloat(num))*(msUnits[unit]||1):0}var console=window.console,jQuery=window.jQuery,noop=function(){},GUID=0,instances={};Outlayer.namespace="outlayer",Outlayer.Item=Item,Outlayer.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var proto=Outlayer.prototype;utils.extend(proto,EvEmitter.prototype),proto.option=function(opts){utils.extend(this.options,opts)},proto._getOption=function(option){var oldOption=this.constructor.compatOptions[option];return oldOption&&void 0!==this.options[oldOption]?this.options[oldOption]:this.options[option]},Outlayer.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},proto._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),utils.extend(this.element.style,this.options.containerStyle),this._getOption("resize")&&this.bindResize()},proto.reloadItems=function(){this.items=this._itemize(this.element.children)},proto._itemize=function(elems){for(var itemElems=this._filterFindItemElements(elems),Item=this.constructor.Item,items=[],i=0;i<itemElems.length;i++){var elem=itemElems[i],item=new Item(elem,this);items.push(item)}return items},proto._filterFindItemElements=function(elems){return utils.filterFindElements(elems,this.options.itemSelector)},proto.getItemElements=function(){return this.items.map(function(item){return item.element})},proto.layout=function(){this._resetLayout(),this._manageStamps();var layoutInstant=this._getOption("layoutInstant"),isInstant=void 0!==layoutInstant?layoutInstant:!this._isLayoutInited;this.layoutItems(this.items,isInstant),this._isLayoutInited=!0},proto._init=proto.layout,proto._resetLayout=function(){this.getSize()},proto.getSize=function(){this.size=getSize(this.element)},proto._getMeasurement=function(measurement,size){var elem,option=this.options[measurement];option?("string"==typeof option?elem=this.element.querySelector(option):option instanceof HTMLElement&&(elem=option),this[measurement]=elem?getSize(elem)[size]:option):this[measurement]=0},proto.layoutItems=function(items,isInstant){items=this._getItemsForLayout(items),this._layoutItems(items,isInstant),this._postLayout()},proto._getItemsForLayout=function(items){return items.filter(function(item){return!item.isIgnored})},proto._layoutItems=function(items,isInstant){if(this._emitCompleteOnItems("layout",items),items&&items.length){var queue=[];items.forEach(function(item){var position=this._getItemLayoutPosition(item);position.item=item,position.isInstant=isInstant||item.isLayoutInstant,queue.push(position)},this),this._processLayoutQueue(queue)}},proto._getItemLayoutPosition=function(){return{x:0,y:0}},proto._processLayoutQueue=function(queue){this.updateStagger(),queue.forEach(function(obj,i){this._positionItem(obj.item,obj.x,obj.y,obj.isInstant,i)},this)},proto.updateStagger=function(){var stagger=this.options.stagger;return null===stagger||void 0===stagger?void(this.stagger=0):(this.stagger=getMilliseconds(stagger),this.stagger)},proto._positionItem=function(item,x,y,isInstant,i){isInstant?item.goTo(x,y):(item.stagger(i*this.stagger),item.moveTo(x,y))},proto._postLayout=function(){this.resizeContainer()},proto.resizeContainer=function(){if(this._getOption("resizeContainer")){var size=this._getContainerSize();size&&(this._setContainerMeasure(size.width,!0),this._setContainerMeasure(size.height,!1))}},proto._getContainerSize=noop,proto._setContainerMeasure=function(measure,isWidth){if(void 0!==measure){var elemSize=this.size
;elemSize.isBorderBox&&(measure+=isWidth?elemSize.paddingLeft+elemSize.paddingRight+elemSize.borderLeftWidth+elemSize.borderRightWidth:elemSize.paddingBottom+elemSize.paddingTop+elemSize.borderTopWidth+elemSize.borderBottomWidth),measure=Math.max(measure,0),this.element.style[isWidth?"width":"height"]=measure+"px"}},proto._emitCompleteOnItems=function(eventName,items){function onComplete(){_this.dispatchEvent(eventName+"Complete",null,[items])}function tick(){++doneCount==count&&onComplete()}var _this=this,count=items.length;if(!items||!count)return void onComplete();var doneCount=0;items.forEach(function(item){item.once(eventName,tick)})},proto.dispatchEvent=function(type,event,args){var emitArgs=event?[event].concat(args):args;if(this.emitEvent(type,emitArgs),jQuery)if(this.$element=this.$element||jQuery(this.element),event){var $event=jQuery.Event(event);$event.type=type,this.$element.trigger($event,args)}else this.$element.trigger(type,args)},proto.ignore=function(elem){var item=this.getItem(elem);item&&(item.isIgnored=!0)},proto.unignore=function(elem){var item=this.getItem(elem);item&&delete item.isIgnored},proto.stamp=function(elems){(elems=this._find(elems))&&(this.stamps=this.stamps.concat(elems),elems.forEach(this.ignore,this))},proto.unstamp=function(elems){(elems=this._find(elems))&&elems.forEach(function(elem){utils.removeFrom(this.stamps,elem),this.unignore(elem)},this)},proto._find=function(elems){if(elems)return"string"==typeof elems&&(elems=this.element.querySelectorAll(elems)),elems=utils.makeArray(elems)},proto._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},proto._getBoundingRect=function(){var boundingRect=this.element.getBoundingClientRect(),size=this.size;this._boundingRect={left:boundingRect.left+size.paddingLeft+size.borderLeftWidth,top:boundingRect.top+size.paddingTop+size.borderTopWidth,right:boundingRect.right-(size.paddingRight+size.borderRightWidth),bottom:boundingRect.bottom-(size.paddingBottom+size.borderBottomWidth)}},proto._manageStamp=noop,proto._getElementOffset=function(elem){var boundingRect=elem.getBoundingClientRect(),thisRect=this._boundingRect,size=getSize(elem);return{left:boundingRect.left-thisRect.left-size.marginLeft,top:boundingRect.top-thisRect.top-size.marginTop,right:thisRect.right-boundingRect.right-size.marginRight,bottom:thisRect.bottom-boundingRect.bottom-size.marginBottom}},proto.handleEvent=utils.handleEvent,proto.bindResize=function(){window.addEventListener("resize",this),this.isResizeBound=!0},proto.unbindResize=function(){window.removeEventListener("resize",this),this.isResizeBound=!1},proto.onresize=function(){this.resize()},utils.debounceMethod(Outlayer,"onresize",100),proto.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},proto.needsResizeLayout=function(){var size=getSize(this.element);return this.size&&size&&size.innerWidth!==this.size.innerWidth},proto.addItems=function(elems){var items=this._itemize(elems);return items.length&&(this.items=this.items.concat(items)),items},proto.appended=function(elems){var items=this.addItems(elems);items.length&&(this.layoutItems(items,!0),this.reveal(items))},proto.prepended=function(elems){var items=this._itemize(elems);if(items.length){var previousItems=this.items.slice(0);this.items=items.concat(previousItems),this._resetLayout(),this._manageStamps(),this.layoutItems(items,!0),this.reveal(items),this.layoutItems(previousItems)}},proto.reveal=function(items){if(this._emitCompleteOnItems("reveal",items),items&&items.length){var stagger=this.updateStagger();items.forEach(function(item,i){item.stagger(i*stagger),item.reveal()})}},proto.hide=function(items){if(this._emitCompleteOnItems("hide",items),items&&items.length){var stagger=this.updateStagger();items.forEach(function(item,i){item.stagger(i*stagger),item.hide()})}},proto.revealItemElements=function(elems){var items=this.getItems(elems);this.reveal(items)},proto.hideItemElements=function(elems){var items=this.getItems(elems);this.hide(items)},proto.getItem=function(elem){for(var i=0;i<this.items.length;i++){var item=this.items[i];if(item.element==elem)return item}},proto.getItems=function(elems){elems=utils.makeArray(elems);var items=[];return elems.forEach(function(elem){var item=this.getItem(elem);item&&items.push(item)},this),items},proto.remove=function(elems){var removeItems=this.getItems(elems);this._emitCompleteOnItems("remove",removeItems),removeItems&&removeItems.length&&removeItems.forEach(function(item){item.remove(),utils.removeFrom(this.items,item)},this)},proto.destroy=function(){var style=this.element.style;style.height="",style.position="",style.width="",this.items.forEach(function(item){item.destroy()}),this.unbindResize(),delete instances[this.element.outlayerGUID],delete this.element.outlayerGUID,jQuery&&jQuery.removeData(this.element,this.constructor.namespace)},Outlayer.data=function(elem){elem=utils.getQueryElement(elem);var id=elem&&elem.outlayerGUID;return id&&instances[id]},Outlayer.create=function(namespace,options){var Layout=subclass(Outlayer);return Layout.defaults=utils.extend({},Outlayer.defaults),utils.extend(Layout.defaults,options),Layout.compatOptions=utils.extend({},Outlayer.compatOptions),Layout.namespace=namespace,Layout.data=Outlayer.data,Layout.Item=subclass(Item),utils.htmlInit(Layout,namespace),jQuery&&jQuery.bridget&&jQuery.bridget(namespace,Layout),Layout};var msUnits={ms:1,s:1e3};return Outlayer.Item=Item,Outlayer})},{"./item":7,"ev-emitter":2,"fizzy-ui-utils":3,"get-size":4}],9:[function(require,module,exports){const toggle=require("./modules/toggle.js");require("./modules/gallery.js");!function(){({init:function(){toggle.init()}}).init()}()},{"./modules/gallery.js":10,"./modules/toggle.js":11}],10:[function(require,module,exports){var Masonry=require("masonry-layout"),imagesLoaded=require("imagesloaded"),gallery={init:function(){var grid=document.querySelector(".grid"),msnry=new Masonry(grid,{itemSelector:".grid-item",columnWidth:".grid-sizer",gutter:5,percentPosition:!0,horizontalOrder:!0});imagesLoaded(grid).on("progress",function(){msnry.layout()}),imagesLoaded(grid).on("done",function(){})}};module.exports=gallery},{imagesloaded:5,"masonry-layout":6}],11:[function(require,module,exports){const toggle={chevronDown:document.querySelector(".fa-chevron-down"),chevronUp:document.querySelector(".fa-chevron-up"),header:document.querySelector("body>header"),introText:document.querySelector(".intro"),init:function(){this.show(),this.chevronUp.addEventListener("click",()=>this.hide()),this.chevronDown.addEventListener("click",()=>this.show())},show:function(){this.introText.style.opacity=.8,this.chevronDown.classList.remove("show"),this.chevronUp.classList.add("show"),this.header.classList.remove("hidden"),this.introText.classList.add("show")},hide:function(){this.introText.style.opacity=0,this.chevronDown.classList.add("show"),this.chevronUp.classList.remove("show"),this.header.classList.add("hidden"),this.introText.classList.remove("show")}};module.exports=toggle},{}]},{},[9]);
