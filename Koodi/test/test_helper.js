const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservations');
 
//Luo tietokantayhteyden
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    //Droppaa tietokannan ennen testiä
    beforeEach((done) => {
        mongoose.connection.collections.reservations.drop(() => {
        done();
       });
});