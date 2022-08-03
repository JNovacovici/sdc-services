const app = require('./server.js');
const request = require('supertest');

describe('Test basic setup', () => {
  it('should respond with get request', async () => {
    var response = await request(app).get('/qna');
    expect(response.body).toEqual({getQnA: 'QnA get test check'});
  });

  it('should respond with post request', async () => {
    var response = await request(app).post('/qna');
    expect(response.body).toEqual({postQnA: 'QnA post test check'});
  });
});