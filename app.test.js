import { expect } from "chai";
const axios = require('axios');


const Message = require('./models/messages');
const Group = require('./models/group');
const User = require('./models/User');

describe("app", function() {
  it("Positive Word", async function() {
    let data = {
        text: "bien",
      };
    await axios.post('https://qzd76d6xkk.execute-api.us-east-2.amazonaws.com/default/sentiment', data)
        .then((res) => {
            expect(res.data.Sentiment).to.be.equal("POSITIVE")
        })
  });
  it("Negative Word", async function() {
    let data = {
        text: "malo",
      };
    await axios.post('https://qzd76d6xkk.execute-api.us-east-2.amazonaws.com/default/sentiment', data)
        .then((res) => {
            expect(res.data.Sentiment).to.be.equal("NEGATIVE")
        })
  });
  it("Neutral Word", async function() {
    let data = {
        text: "normal",
      };
    await axios.post('https://qzd76d6xkk.execute-api.us-east-2.amazonaws.com/default/sentiment', data)
        .then((res) => {
            expect(res.data.Sentiment).to.be.equal("NEUTRAL")
        })
  });
});