const chai = require('chai');
const chaiHttp = require('chai-http');
/*
import jwt from 'jsonwebtoken';
import jwt_conf from '../private/jwt/jwt_config';
*/
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:80';

const id = 'test@aaaa';
const pw = 'test';
const nick = id;
// let token;

describe('Request Test', ()=>{
  it('Register', (done) => {
    chai.request(url)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({email: id, password: pw, nickname: nick})
      .end((err, res)=>{
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Login',(done) => {
    chai.request(url)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({email: id, password: pw})
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
      .set('Content-Type', 'application/json')
      .set('Cookie', `Authorization=${token};`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.success).is.true;
        console.log(res.body.message);
        done();
      });
  });
});