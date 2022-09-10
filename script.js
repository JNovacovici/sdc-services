import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(99)<2000'],
    http_req_failed: ['rate<0.01']
  },
};

export default function() {

  var question = {
    product_id: 1,
    body: 'stress test body',
    name: 'stress test name',
    email: 'stress test email'
  }

  var answer = {
    question_id: 1,
    body: 'stress test body',
    name: 'stress test name',
    email: 'stress test email',
    photos: ['firstURL', 'secondURL']
  }

  const response = http.post(`http://localhost:3002/qa/questions/1/answers`, answer)
  check(response, {'status should be 201': (res) => res.status === 201});

  sleep(1);
}

// const response = http.put(`http://localhost:3002/qa/answers/1/report`)
// const response = http.put(`http://localhost:3002/qa/answers/1/helpful`)
// const response = http.put(`http://localhost:3002/qa/questions/1/helpful`)
// const response = http.put(`http://localhost:3002/qa/questions?productId=1`)
// const response = http.post(`http://localhost:3002/qa/questions`, question)
// const response = http.post(`http://localhost:3002/qa/questions/1/answers`, answer)