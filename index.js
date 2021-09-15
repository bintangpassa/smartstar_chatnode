const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    // origins: ['http://localhost:8080','http://localhost:8080/console','http://192.168.1.5:8080/*']
    origins: '*',
    credentials:true
  }
});

app.get('/', (req, res) => {
    res.send('<h4>Smartstar chat service is running</h4>');
});

io.on('connection', (socket) => {
  // let token = socket.handshake.auth.token;
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('sendchat', (email, msg, sender) => {
    console.log('message: ' + msg);
    // io.emit('my broadcast', `server: ${msg} ${email}`);
    io.emit(email, msg, sender);
  });
});

http.listen(3070, () => {
  console.log('listening on *:3070');
});


