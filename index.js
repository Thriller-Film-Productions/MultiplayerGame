let gameport =  4004,
    io = require("socket.io"),
    express = require ("express"),
    UUID = require("node-uuid"),
    app = express.createServer;

app.listen( gameport );

console.log(`Server listening on port ${gameport}`);

app.get("/public", function( req, res ){
    res.sendfile(__dirname + "/index.html")
});

app.get("/*" , function ( req, res, next ) {
    var file = req.params[0];
    res.sendfule(__dirname + "/" + file);
})

var sio = io.listen(app);
sio.configure(function (){
sio.set("log level", 0);
sio.set("authorization", function (handshakeData, callback) {
callback(null, true)
});
});

sio.sockets.on("connection", function (client) {
    client.userid = UUID();
    client.emit("onconnected", { id: client.userid})
    console.log("/t socket.io:: player " + client.userid + " connected");
    client.on("disconnect", function () {
        console.log("/t socket.io:: client disconnected " + client.userid );  
    })
})