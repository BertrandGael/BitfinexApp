var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const BFX = require('bitfinex-api-node')

const API_KEY = 'secret'
const API_SECRET = 'secret'

const opts = {
  version: 1,
  transform: true
}

const bws = new BFX(API_KEY, API_SECRET, opts).ws



bws.on('open', () => {
  bws.subscribeTrades('BTCUSD')
})


bws.on('trade', (pair, trade) => {
  //console.log('Trade:', trade)
  io.emit('trade',trade);
})

bws.on('error', console.error)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});