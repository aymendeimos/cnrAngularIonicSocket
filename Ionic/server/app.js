const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const socket = require('socket.io');
const http = require('http');

//schemaa 

var teamSchema = new mongoose.Schema({
  name: String,
  gameNumbre: 0,
  game: [{
    pointPhase1: {
      points      : Number,
      hitTheWall  : Number,
      tropheUp    : Boolean,
      tropheDown  : Boolean,
      tropheDrop  : Number,
      intervention: Number,
      infonctionel: Boolean
    },
    pointPhase2: {
      points      : Number,
      outOfLine   : Number,
      correctFlag : Number,
      wrongFlag   : Number,
      openDoor    : Boolean,
      intervention: Number,
      infonctionel: Boolean
    },
    pointPhase3: {
      points      : Number,
      goal        : Number,
      yellowCard  : Number,
      redCard     : Number,
      intervention: Number,
      forfait     : Boolean
    },
    pointPhase4: {
      points      : Number,
      goal        : [],
      missed      : Number,
      scored      : Number,
      intervention: Number,
      forfait     : Boolean
    },
  }]
});

var Team = mongoose.model("Team", teamSchema);


// define our app using express
const app = express();
const server = http.Server(app);
const io = socket(server);

// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!" + socket.id);
  // Receiving Todos from client
  socket.on('selectedTeam', (data) => {
    //console.log('socketData: ' + JSON.stringify(data));
    // Sending a response
    // let teamm = new Team(data);
    // teamm.save().then(t=>{
    //     console.log("cool")
    //   }
    // ).catch(err=>{
    //   console.log("error")
    // })
    Team.findOne({"name" : data.name}, function (err, team) {
      if (err) {
        io.emit("error", {error : "there's no team"});
      }
      io.emit("teamSelected", team);
    });
  });

  socket.on("teamdata" , (data)=>{
     // console.log(data)
    //   io.emit("teamData", data);
    Team.findOneAndUpdate({"name" : data.name},{...data},{new : true}, function (err, team) {
        if (err) {
          //console.log(err)
        }
        io.emit("teamData", team);
      });
  }) 
})

// allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// set the port
const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CNR_APP', {
  useMongoClient: true,
});


app.get('/', (req, res) => {
  return res.end('Api working');
});

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});


// start the server
server.listen(port, () => {
  console.log(`App Server Listening at ${port}`);
});
