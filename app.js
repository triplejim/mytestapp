var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// 3000ポートでプログラムを動作させる
//app.listen(3000);
app.listen(process.env.PORT, process.env.IP);
// ソケットを作る
var socketIO = require('socket.io');
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var socket = socketIO.listen(app);

// クライアントが接続してきたときの処理
socket.on('connection', function(client) {
  console.log(client.sessionId + 'が接続しました。');
  // メッセージを受けたときの処理
  client.on('message', function(msg) {
    console.log(client.sessionId + "'がメッセージを送信しました。(" + msg + ")");
    // つながっているクライアント全員に送信
    client.send(msg);
    client.broadcast(msg);
  });
  
  // クライアントが切断したときの処理
  client.on('disconnect', function(){
    console.log(client.sessionId + 'が切断しました。');
  });
});

// リクエストが来たら、index.ejsの内容をクライアントに出力する
app.get('/', function(req, res){

  res.render('index.ejs', {
    layout: false
  });
});