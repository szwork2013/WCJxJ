var connect = require('connect');
var app = connect();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var OAuth = require('wechat-oauth');
var client = new OAuth('wx5da8feae452c075e', '645a33c8ae5084ac3e739ed9bed559b7');
//var corp = require('wechat-enterprise');
var api = new WechatAPI("wx5da8feae452c075e", "645a33c8ae5084ac3e739ed9bed559b7");
var config = {
    token: 'xiaof',
    appid: 'wx5da8feae452c075e',
    encodingAESKey: 'QBmt2VvlMHQ3MRKHTjMeCAFoJTkfbDcp90Z7wQOOlRm',
    corpId: 'wx5da8feae452c075e'
};

app.use(connect.query()); // Or app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
     // 微信输入信息都在req.weixin上
     var message = req.weixin;
     if (message.Content === 'diaosi') {
         // 回复屌丝(普通回复)
         //api.getIp( function (err, data, res) {
         //    console.log(data);
         //})
         client.getUser('openid', function (err, result) {
             var userInfo = result;
             console.log("userInfo::"+userInfo)
         });
         var url =  client.getAuthorizeURL('redirectUrl', 'state', 'scope');
         res.reply(url);
     } else if (message.Content === 'text') {
         //你也可以这样回复text类型的信息
         res.reply({
             content: 'text object',
             type: 'text'
         });
     } else if (message.Content === 'hehe') {
         // 回复一段音乐
         res.reply({
             type: "music",
             content: {
                 title: "来段音乐吧",
                 description: "一无所有",
                 musicUrl: "http://mp3.com/xx.mp3",
                 hqMusicUrl: "http://mp3.com/xx.mp3",
                 thumbMediaId: "thisThumbMediaId"
             }
         });
     } else {
         console.log(message);
         // 回复高富帅(图文回复)
         res.reply([
             {
                 title: '你来我家接我吧',
                 description: '这是女神与高富帅之间的对话',
                 picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                 url: 'http://nodeapi.cloudfoundry.com/'
             }
         ]);
     }
}));
//client.getAccessToken('code', function (err, result) {
//    var accessToken = result.data.access_token;
//    var openid = result.data.openid;
//    console.log(accessToken+"aaaa"+openid);
//});
//app.use('/corp', corp(config, function (req, res, next) {
//    res.writeHead(200);
//    res.end('hello node api');
//}));

app.listen(3000)