
var appid = 108055;
var secret = "5209e21536fb41ce95a6d241f8a0d024";
var param = "?showapi_appid=" + appid +"&showapi_sign="+secret;

var textJoke = "https://route.showapi.com/341-1"+param;
var imgJoke = "https://route.showapi.com/341-2" + param;
var gifJoke = "https://route.showapi.com/341-3" + param;

//module.exports为固定写法

module.exports = {
  textJoke: textJoke,
  imgJoke: imgJoke,
  gifJoke: gifJoke
};