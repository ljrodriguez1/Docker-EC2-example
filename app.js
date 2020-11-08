const db = require('./db');
const Message = require('./models/messages');
const Group = require('./models/group');
const User = require('./models/User');
const WebSocket = require('ws');
const { Schema } = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
const redis = require('redis');

const axios = require('axios');
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
var redisAddress = process.env.REDIS_ADDRESS || 'redis://cache:6379';
const redisClient = redis.createClient(redisAddress);

var mailer = require('./mailer');

const WebSocketServer = require("ws").Server,
  express = require("express"),
  http = require("http"),
  app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());


const router = express.Router();
const api = express.Router();

const path = __dirname + '/views/';
const port = 8080;

app.use(function (req,res,next) {
  axios.get('http://169.254.169.254/latest/meta-data/instance-id')
    .then((res)=> {
      req.setHeader("Instance-Id", res.data)
      next()
    })
    .catch((error)=>{
      next()
    })
  console.log('/' + req.method);
});


api.use(function (req, res, next) {
  console.log('/' + req.method);
  next();
});


api.get('/allmessages', function (req, res) {
  Message.find({}).exec(function (err, messages) {
    if (err) {
      return;
    }
    res.json({ messages })
  });
});

api.get('/groups', function (req, res) {
  Group.find({}).exec(function (err, messages) {
    if (err) {
      return
    }
    res.json(messages)
  })
})

router.get('/', function (req, res) {
  console.log('holaaaa')
  res.send('hola como esta Updated 33');
});

router.get('/world', function (req, res) {
  console.log('holaaaa')
  res.send('helloworld');
});

app.use(express.static(path));
app.use('/', router);
app.use('/api', api);
const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
const wss = new WebSocketServer({ server: server });
wss.on('connection', function connection(ws) {
  console.log('conection incoming')
  ws.on('message', function incoming(data) {
    var message = JSON.parse(data);
    if (message.initial) {
      Group.find({}).exec(function (err, groups) {
        if (err) {
          return;
        }
        User.find({}).exec(function (err, users){
          wss.clients.forEach(function each(client) {
            if (client === ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'datainput', groups, users, messages: [] }));
            }
          });
        }); 
      });
    } else if (message.initialGroup) {
      console.log(message)
      redisClient.lrange(message.groupId, 0, -1,(err, data) => {
        console.log(data);
        console.log(err);
        if (!err && data != null && data.length != 0) {
          wss.clients.forEach(function each(client){
            if (client === ws && client.readyState === WebSocket.OPEN){
              client.send(JSON.stringify({type: 'groupInput', messages: data.map(function parse(value, i){return JSON.parse(value)})}));
            } 
          });
        } else {
          const group = Message.find({group_id: message.groupId}).exec(function(err, messages){
            if (err) { 
              return
            }
            wss.clients.forEach(function each(client){
              if (client === ws && client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({type: 'groupInput', messages}));
              } 
            });
            if (messages.length != 0){
              const redisMessages = messages.map(function stringify(value, i){
                return JSON.stringify(value)
              });
              redisClient.rpush(message.groupId, ...redisMessages);
              redisClient.expire(message.groupId, 600);
            }
          });  
        }
      });
    } else if (message.createGroup) {
      console.log(message)
      const group = new Group({ name: message.groupName, messages: [] })
      group.save(function (err, group) {
        if (err) {
          console.log('fue erroneo')
          return
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'newGroup', group }));
          }
        });
      });
    } else {

      const data = {
        text: message.message,
      };

      axios.post('https://qzd76d6xkk.execute-api.us-east-2.amazonaws.com/default/sentiment', data)
        .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
          console.log(message)
          console.log(`ws: ${ws}`);
          console.log('---')
          if (res.data.Sentiment === 'NEGATIVE') {
            message.message = 'Mensaje censurado por ser muy negativo'
          }
          var newMessage = new Message(message);
          newMessage.save(function (err, message) {
            if (err) {
              console.log('Unable to save message to database');
            } else {
            }
          });
          redisClient.rpushx(message.group_id, JSON.stringify(message), function(err, resp){
            if (err) {
              console.log(err);
            }
          });
          wss.clients.forEach(function each(client) {
            if (client && client.readyState === WebSocket.OPEN) {
              message['type'] = 'message'
              client.send(JSON.stringify(message));
            }
          });

          if (/.*@/.test(message.message)) {
            var regexMatch = message.message.match(/@[^ ]+/);
            var username = regexMatch[0].replace("@", "");

            User.find({ name: username }).exec(function (err, users) {
              if (err) {
                return next(err);
              }

              if (typeof(users[0]) !== 'undefined') {
                var email = users[0].email;
                mailer.sender(email, message.message);
              }
              else {
                console.log("user not found");
              }
              
                
            });
            }


        }).catch((err) => {
          console.error(err);
        });
    }
  });
});

