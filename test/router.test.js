const supertest = require("supertest");
const tape = require("tape");
const router = require("../src/router");

tape("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

tape("Search returns a status code of 200 and a JSON object", t => {
  supertest(router)
    .get("/search?fr")
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

tape("Search returns a status code of 200 and any file in public folder", t => {
  supertest(router)
    .get("/search?us")
    .expect(200)
    .expect("Content-type", "application/json")
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});

tape("Return an error if the route is wrong", t => {
  supertest(router)
    .get("/unicorn")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.end("");
    });
});

tape("Translate returns a status code of 200 and text", t => {
  let textToTranslate = encodeURI('hola amigo');
  supertest(router)
    .get(`/translate?from=es&to=en&text=${textToTranslate}`)
    .expect(200)
    .expect("Content-Type", "text/html")
    .expect('hello friend')
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});