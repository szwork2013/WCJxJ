var express = require('express');
var app = express();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var OAuth = require('wechat-oauth');
//var api = new WechatAPI("wx5da8feae452c075e", "645a33c8ae5084ac3e739ed9bed559b7");
var config = {
    token: 'xiaof',
    appid: 'wx5da8feae452c075e'
    //,
    //encodingAESKey: 'lyXqsl8jZEYebvnenBECszQVrX0m0aD8WBtBmRAoOlF'
};
app.use(express. static (__dirname + '/public'));
app.use(express.query()); // Or app.use(express.query());
app.use('/wechat/web',function(req, res){
    console.log(111);
        //res.render('index', {
        //    title: '首页',
        //    posts: posts
        //})
});
app.use('/wechat', wechat(config, function (req, res, next) {
     // 微信输入信息都在req.weixin上
     var message = req.weixin;
     if (message.Content === 'diaosi') {
         // 回复屌丝(普通回复)
         //api.getIp( function (err, data, res) {
         //    console.log(data);
         //})
         //client.getUser('openid', function (err, result) {
         //    var userInfo = result;
         //    console.log("userInfo::"+userInfo)
         //});
         //var url =  client.getAuthorizeURL('http://xiaofweixin.ngrok.io/', 'none', 'snsapi_base');
         //oqr_Ft-3fd7HcIu_gCfO_sKMoleU
         //api.getUser('oqr_Ft-3fd7HcIu_gCfO_sKMoleU', function (err, result) {
         //    var userInfo = result;
         //    console.log(userInfo)
         //});
         //api.sendTemplate('oqr_Ft7dLB6Ijw4rPHIDpqXc__eM', "CDkIVPnQ0zENCaIwleeG6ynykn1Mkm76zDDjaH1QHhk", "wwww.baidu.com", "#FF0000", {
         //    "first": {
         //        "value": "恭喜你购买成功！",
         //        "color": "#173177"
         //    },
         //    "keynote1": {
         //        "value": "巧克力",
         //        "color": "#EDAE08"
         //    },
         //    "keynote2": {
         //        "value": "39.8元",
         //        "color": "#173177"
         //    },
         //    "keynote3": {
         //        "value": "2014年9月16日",
         //        "color": "#F44248"
         //    },
         //    "remark": {
         //        "value": "欢迎再次购买！",
         //        "color": "#000000"
         //    }
         //}, null);
         res.reply("hehe");
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
app.use('/send', function(req, res){
    console.log(11111);
    api.sendTemplate('oqr_Ft-3fd7HcIu_gCfO_sKMoleU', "CDkIVPnQ0zENCaIwleeG6ynykn1Mkm76zDDjaH1QHhk", "wwww.baidu.com", "#FF0000", {
        "first": {
            "value": "恭喜你购买成功！",
            "color": "#173177"
        },
        "keynote1": {
            "value": "巧克力",
            "color": "#EDAE08"
        },
        "keynote2": {
            "value": "39.8元",
            "color": "#173177"
        },
        "keynote3": {
            "value": "2014年9月16日",
            "color": "#F44248"
        },
        "remark": {
            "value": "欢迎再次购买！",
            "color": "#000000"
        }
    }, null);
    res.render()
});
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