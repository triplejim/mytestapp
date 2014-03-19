var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// 3000�|�[�g�Ńv���O�����𓮍삳����
//app.listen(3000);
app.listen(process.env.PORT, process.env.IP);
// �\�P�b�g�����
var socketIO = require('socket.io');
// �N���C�A���g�̐ڑ���҂�(IP�A�h���X�ƃ|�[�g�ԍ������т��܂�)
var socket = socketIO.listen(app);

// �N���C�A���g���ڑ����Ă����Ƃ��̏���
socket.on('connection', function(client) {
  console.log(client.sessionId + '���ڑ����܂����B');
  // ���b�Z�[�W���󂯂��Ƃ��̏���
  client.on('message', function(msg) {
    console.log(client.sessionId + "'�����b�Z�[�W�𑗐M���܂����B(" + msg + ")");
    // �Ȃ����Ă���N���C�A���g�S���ɑ��M
    client.send(msg);
    client.broadcast(msg);
  });
  
  // �N���C�A���g���ؒf�����Ƃ��̏���
  client.on('disconnect', function(){
    console.log(client.sessionId + '���ؒf���܂����B');
  });
});

// ���N�G�X�g��������Aindex.ejs�̓��e���N���C�A���g�ɏo�͂���
app.get('/', function(req, res){

  res.render('index.ejs', {
    layout: false
  });
});