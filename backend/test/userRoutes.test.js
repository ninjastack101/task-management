import request from "supertest";
import app from "../app";
import { randomString } from "./helpers/randomString";
import { getUserId } from "./helpers/generateTestUser";

describe("Get Users", function() {
  it("Response with json containing a list of all users", function(done) {
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("Add User", function() {
  const data = {
    user_name: randomString(10)
  };
  it("Response with User Created Successfully", function(done) {
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Add User", function() {
  const data = {};
  it("Response with 500 not created", function(done) {
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect('{"message":"User Name is empty."}')
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Update user", async function() {
  const data = {
    user_name: "Test Update"
  };

  const id = await getUserId();
  it("Response with 200 and User Record updated", function(done) {
    request(app)
      .put(`/users/${id}`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
