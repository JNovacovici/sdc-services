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

describe('Test Questions', () => {
  it('get questions route should exist', async () => {
    const questions = await request(app).get('/qa/questions');
    expect(questions).toBeDefined();
  });

  it("should find the first question based on product_id", async () => {
    let productId = 5;
    let result = await request(app).get("/qa/questions")
      .query({ product_id: productId });
    let firstQuestion;

    for (var questionObj of result.body.results) {
      if (questionObj.question_id === 34) {
        firstQuestion = questionObj.question_body;
      }
    }

    expect(firstQuestion).toEqual("Can I wash it?");
  });

  it('post a new question to the database', async () => {
    let questions = await request(app).post('/qa/questions/')
      .send({
        body: 'This is a test question from JEST',
        name: 'JNOVAKING',
        email: 'Jnovaking@gmail.com',
        product_id: 5
      });

      expect(questions.status).toEqual(201);
      expect(questions.text).toEqual('Question created');
  });
});

describe('Test Answers', () => {
  it('find answers related to a question', async () => {
    let productId = 5;
    const answers = await request(app).get('/qa/questions')
      .query({product_id: productId});
      let firstAnswer;
      let answerLength = Object.keys(answers.body.results).length;

      for (var questionObj of answers.body.results) {
        if (questionObj.question_id === 34) {
          firstAnswer = questionObj.answers['10'].body;
        }
      }

      expect(firstAnswer).toEqual(`I've thrown it in the wash and it seems fine`);
      // expect(answerLength).toEqual(5);
  });

  it('post a new answer related to a question', async () => {
    let questionId = 34;
    let answers = await request(app).post(`/qa/questions/${questionId}/answers`)
      .send({
        body: 'This is a test answer from JEST',
        name: 'JNOVAKING',
        email: 'Jnovaking@gmail.com',
        photos: []
      });

      expect(answers.status).toEqual(201);
      expect(answers.text).toEqual('Answer created');
  });
});

describe('Test helpfulness and reported', () => {
  it("should increment question helpfulness count when 'helpful?' is clicked", async () => {
    let questionId = 34;
    let result = await request(app).put(`/qa/questions/${questionId}/helpful`)
    expect(result.status).toEqual(204);
  });

  it("should increment answer helpfulness count 'helpful?' is clicked", async () => {
    let answerId = 43;
    let result = await request(app).put(`/qa/answers/${answerId}/helpful`);
    expect(result.status).toEqual(204);
  });

  it("should change the reported status of an answer", async () => {
    let answerId = 43;
    let result = await request(app).put(`/qa/answers/${answerId}/report`);
    expect(result.status).toEqual(204);
  });

  it("should change the reported status of a question", async () => {
    let questionId = 328;
    let result = await request(app).put(`/qa/questions/${questionId}/report`);
    expect(result.status).toEqual(204);
  });
});

describe('Handling Errors', () => {
  it('should return an error for incorrect post question', async () => {
    let questionPost = await request(app).post('/qa/questions')
    .send({
      body: 'testing faulty question',
      name: 'Jnova',
      email: 'Jnova@abc.com'
    })
    expect(questionPost.status).toEqual(400);
  });

  it('should return an error for incorrect post answer', async () => {
    let questionId = 20;
    let answerPost = await request(app).post(`/qa/questions/${questionId}/answers`)
    .send({
      body: 'testing faulty answer',
      name: 'Jnova',
      email: 'Jnova@abc.com',
      photos: [['testurlinwrngformat']]
    })
    expect(answerPost.status).toEqual(400);
  });

  if('should return an error for bad product id entry', async () => {
    let productId = 1.5;
    let testRun = await request(app).get('/qa/questions')
    .query({product_id: productId});
    expect(testRun.status).toEqual(400);
  });
});