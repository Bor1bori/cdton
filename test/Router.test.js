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
let ind;

describe('Request Test', ()=>{
  it('/auth/register', (done) => {
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
  it('/auth/login',(done) => {
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
  it('/Users/:id/category(get)', (done) => {
    chai.request(url)
      .get(`/Users/${id}/category`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.category).is.not.null
        done();
      })
  });
  it('/Users/:id/category(put)', (done) => {
    chai.request(url)
      .put(`/Users/${id}/category`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({category: ['default', 'for_test']})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.success).is.true
        done();
      })
  });
  it('/Users/userinfo',(done) => {
    chai.request(url)
      .get(`/Users/userinfo`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.id).is.equal(id)
        console.log(res.body);
        done();
      });
  });

  it('/Users/:id/records(post)', (done) => {
    chai.request(url)
      .post(`/Users/${id}/records`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({title: 'bdas', link: 'aaa.com', content: 'blahblah', category: 'aa'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.success).is.true;
        console.log(res.body);
        done();
      });
  });
  it('/Users/:id/records(get)', (done) => {
    chai.request(url)
      .get(`/Users/${id}/records`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.records).is.not.null;
        console.log(res.body.records);
        ind = res.body.records[0].index
        done();
      });
  });
  it('/Users/:id/records/:index(delete)', (done) => {
    chai.request(url)
      .delete(`/Users/${id}/records/${ind}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        console.log('index: '+ind);
        expect(err).to.be.null;
        expect(res.body.success).is.true;
        done();
      });
  });
});