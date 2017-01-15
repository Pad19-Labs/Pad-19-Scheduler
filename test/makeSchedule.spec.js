const expect = require('chai').expect
const scheduler = require('../lib/_index.js')

const data = require('./data/_index.js')

describe('makeMasterSchedule', () => {
  it('test', () => {
    let test = scheduler.makeSchedule.makeMasterSchedule(data.exampleSurveyResults, data.exampleGlobalSchedule)
    console.log(test)
    expect(true).to.equal(true)
  })
})
