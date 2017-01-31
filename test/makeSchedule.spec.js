import test from 'ava'
const scheduler = require('../lib/_index.js')
const data = require('./data/_index.js')

test.beforeEach(t => {
  t.context.data = data
})

test.failing('makeMasterSchedule', t => {
  let test = scheduler.makeSchedule.makeMasterSchedule(data.exampleSurveyResults, data.exampleGlobalSchedule)
  let result = {}
  t.is(test, result)
})
