import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/drinks', () => {

  it('should retun the list of drinks', () => {
    return chai.request(app).get('/api/drinks')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(4);
      });
  });

  it('should include the Leffe', () => {
    return chai.request(app).get('/api/drinks')
      .then(res => {
        let leffe = res.body.find(drink => drink.name === 'Leffe');
        expect(leffe).to.exist;
        expect(leffe).to.have.all.keys([
          'id',
          'name',
          'ingredients',
          'photo',
          'type',
          'country',
          'recipe'
        ]);
      });
  });
});

describe('GET api/drinks/:id', () => {

  it('should responds with single JSON object', () => {
    return chai.request(app).get('/api/drinks/1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return Mojito', () => {
    return chai.request(app).get('/api/drinks/1')
      .then(res => {
        expect(res.body.name).to.equal('Mojito');
      });
  });
});