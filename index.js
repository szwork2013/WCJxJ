/**
 * Created by xiaoF on 15/4/20.
 */
var express = require('express');
var app = express();
var wechat = require('wechat');
var request = require('request');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var configa=require('./libs/config.json');//配置文件

//var routes = require('./routes/index');
//var users = require('./routes/users');
//var token = require('./routes/token');
var sign=require('./libs/sign');//微信提供的签名方法

var OAuth = require('wechat-oauth');
var api = new OAuth('wx5da8feae452c075e', '645a33c8ae5084ac3e739ed9bed559b7');

var config = {
    token: 'xiaof',
    appid: 'wx5da8feae452c075e'
    //,
    //encodingAESKey: 'lyXqsl8jZEYebvnenBECszQVrX0m0aD8WBtBmRAoOlF'
};
var globalToken={};
var max_live=7200-1000;
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
app.use(express. static (__dirname + '/public'));
app.use(express.query()); // Or app.use(express.query());


var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' }
];

app.get('/web', function(req, res){
    console.log(555555);
    console.log(req);
    res.render('new', {
    });
});


app.use('/client', function(req, res) {
    var now=new Date().getTime()/1000;

    if (!globalToken.time || now-globalToken.time>max_live){
        refreshGlobalToken(req,res,function(){
            console.log('获取新的token');
            renderClient(req,res);
        })
    }else{
        console.log('重复使用token');
        renderClient(req,res);
    }
});

function refreshGlobalToken(req,res,callback){
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+configa.appId+'&secret='+configa.appSecret, function (error, response, body) {
        console.log('根据appId和appSecret获取accessToken ..');
        if(error || response.statusCode != 200){
            res.send(error);
            return;
        }
        var access_token=JSON.parse(body).access_token;
        console.log('access_token: '+access_token);

        request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi', function (error, response, body) {
            console.log('根据accessToken获取..');
            if (error || response.statusCode != 200) {
                res.send(error);
                return;
            }

            var ticket=JSON.parse(body).ticket;
            console.log('ticket: '+ticket);

            globalToken.time=new Date().getTime()/1000;
            globalToken.ticket=ticket;
            callback();
        });
    });
}

function renderClient(req,res){
    var port = req.app.settings.port;
    var url=req.protocol + '://' + req.host  + ( port == 80 || port == 443 ? '' : ':'+port ) + req.path;
    var result=sign(globalToken.ticket,url);
    res.render('users',{config:configa,result:result});
}

app.use('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
    var url = api.getAuthorizeURL("http://xiaofweixin.ngrok.io/web","state","snsapi_userinfo")
    res.reply(url);
    console.log(message)
}).event(function (event, req, res, next) {
    console.log(2222);
    console.log(event);
    // TODO
})));
app.listen(3000)