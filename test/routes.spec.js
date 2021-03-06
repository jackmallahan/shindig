const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client', () => {
  it('should return a homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('should return an error if the route does not exist', (done) => {
    chai.request(server)
      .get('/fakenews')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => console.log(error));
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => console.log(error));
  });

  describe('GET /api/v1/users', () => {
    it('should retrieve users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.forEach(user => {
            user.should.have.property('id');
            user.should.have.property('authID');
            user.should.have.property('name');
            user.should.have.property('email');
            user.should.have.property('photo');
          });
          done();
        });
    });
  });

  describe('GET /api/v1/categories', () => {
    it('should retrieve categories', (done) => {
      chai.request(server)
        .get('/api/v1/categories')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.length.should.equal(21);
          response.body.forEach(category => {
            category.should.have.property('id');
            category.should.have.property('event_id');
            category.should.have.property('name');
            category.should.have.property('resource_uri');
          });
          done();
        });
    });
  });

  describe('GET /api/v1/joint_tables', () => {
    it('should return a page with join table data', (done) => {
      chai.request(server)
        .get('/api/v1/joint_tables')
        .end((error, response) => {
          response.should.have.status(200);
        });
        done();
    });
  });

  // describe('POST /api/v1/users', () => {
  //   it('should POST a new user', (done) => {
  //       chai.request(server)
  //         .post('/api/v1/users')
  //         .send({
  //           name: 'Travis',
  //           email: 'travisalwaysrollins@gmail.com',
  //           authID: 'TravisIs2Kool',
  //           photo: 'http://www.dope.com/coolestdude.png'
  //         })
  //         .end((error, response) => {
  //           response.should.have.status(201);
  //           response.should.be.json;
  //           response.body[0].should.have.property('id');
  //           response.body[0].should.have.property('name');
  //           response.body[0].should.have.property('email');
  //           response.body[0].should.have.property('authID');
  //           response.body[0].should.have.property('photo');
  //           done();
  //         });
  //       });
  // });

  // describe('POST /api/v1/joint_tables', () => {
  //   it('should POST user preferences', (done) => {
  //   });
  // });

  // describe('DELETE /api/v1/joint_tables/:uid/:categoryId', () => {
  //   it('should delete a user with preferences', (done) => {
  //     chai.request(server)
  //     .delete('/api/v1/joint_tables/202323904893483921489102/3')
  //     .end((error, response) => {
  //       chai.request(server)
  //       .get('/api/v1/joint_tables')
  //       .end( (error, response) => {
  //       response.should.have.status(200);
  //       done();
  //       });
  //     });
  //   });
  // });

});
