const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const Reservation = require('./models/reservation');
const User = require('./models/user');

//MongoDB
const mongoURL = 'mongodb+srv://headmongo:CPKRY5V9RMXV7xK8@restful0.enxe8.mongodb.net/headsdb?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//Varauksen lisäys
app.post('/reservations', async (req, res) => {
  const reservation = new Reservation({
    date: req.body.date, 
    name: req.body.name, 
    email: req.body.email, 
    number: req.body.number
    });
  try {
    const newReservation = await reservation.save();
    res.redirect('/varaus_tehty.html');
  } catch(err) {
  return res.status(500).json({ message: err.message });
  }
})

//Kirjautumisen hallinta
app.post('/login', async (req, res) => {
  try {
    User.countDocuments({username: req.body.username, password: req.body.password}, function (err, count){ 
      if(count>0){
          //Dokumentti käyttäjän antamilla tiedoilla löytyy
          res.redirect('/reservations');
      }
      else{
        res.redirect('/login.html');
      }
    }); 
  } catch(err) {
  return res.status(500).json({ message: err.message });
  }
})

//Komentokehote näkymä
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});