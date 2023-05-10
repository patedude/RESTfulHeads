const reservation = require('../models/reservation');
const assert = require('assert');
const app = require('../index'); //Jos tämän lisää, tietokanta tyhjenee oikeasti

describe('Creating documents', () => {
  it('Add new reservation', (done) => {
    const testReservation = new reservation({
      date: '2022-04-01T00:00:00.000+00:00',
      name: 'John Doe',
      email: 'johnd@email.fi',
      number: '0401234567' 
    });
    testReservation.save()
    .then(() => {
      assert(!testReservation.isNew); 
      //Jos tallennus ok, testi on valmis
      done();
    });
  });
});
