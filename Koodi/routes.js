const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Reservation = require('./models/reservation');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

//Hae varaukset
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

//Hae tietty varaus
router.get('/reservations/search', async (req, res) => {
  const { resName } = req.query;
  try {
    const reservations = await Reservation.find({$text: {$search: resName}});
    res.send({reservations});
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

//Hae käyttäjät/tarkasta että kokoelmaan pääsee (käyttäjätunnuksia ei kuitenkaan näytetä)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(500).json({ message: "Käyttäjiä löytyy" });
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

//Käyttöliittymä
app.get('/', function(req, res){
  res.sendFile(process.cwd() + 'index.html');
});

module.exports = router;