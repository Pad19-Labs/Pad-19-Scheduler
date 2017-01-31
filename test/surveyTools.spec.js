import _ from 'lodash'
import test from 'ava'
const scheduler = require('../lib/_index.js')
const data = require('./data/_index.js')

test.beforeEach(t => {
  t.context.data = data
})

test('totalResults', t => {
  let test = scheduler.surveyTools.totalResults(data.exampleSurveyResults)

  t.is(
    test,
    t.context.data.exampleSurveyResultsTabulated.totalResults)
})

test('tabulateResults', t => {
  let test = scheduler.surveyTools.tabulateResults(t.context.data.exampleSurveyResults)

  let result = {
    skiing : 2,
    hiking : 1,
    cycling : 4,
    reading : 2,
    cooking : 0,
    running : 2,
    other : 1,
    rowing : 1
  }

  let trfTest = scheduler.surveyTools.tabulateResults(data.exampleSurveyResults, true)

  let trfResult = {
    skiing : 3,
    hiking : 2,
    cycling : 5,
    reading : 3,
    cooking : 1,
    running : 3,
    other : 2,
    rowing : 2
  }

  t.deepEqual(test, result)
  t.truthy(trfTest)
  t.deepEqual(trfTest, trfResult)
})

test('countDuplicates', t => {
  let gsa = scheduler.surveyTools.getSpeakerAssignments

  t.is(gsa.countDuplicates(t.context.data.exampleSpeakerList), 2)
})
