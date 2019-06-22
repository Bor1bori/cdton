const chai = require('chai');
const chaiHttp = require('chai-http');
/*
import jwt from 'jsonwebtoken';
import jwt_conf from '../private/jwt/jwt_config';
*/
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://49.247.131.57:30704';

const id = 'testaaa123';
const pw = 'test';
const mem_power = 1;
let token;

describe('Request Test', ()=>{
  it('Register', (done) => {
    chai.request(url)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({id: id, pw: pw, mem_power: mem_power})
      .end((err, res)=>{
        expect(err).to.be.null;
        expect(res.status).is.oneOf([200,202])//to.have.status(200);
        done();
      });
  });
  it('Login',(done) => {
    chai.request(url)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({id: id, pw: pw})
      .end((err, res) =>{
        expect(err).to.be.null;
        expect(res.body.success).is.true;
        expect(res.body.jwtToken).is.not.null;
        token = res.body.jwtToken;
        done();
      });
  });
  it('Get userinfo',(done) => {
    chai.request(url)
      .get(`/Users/${id}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.success).is.true;
        done();
      });
  });
});