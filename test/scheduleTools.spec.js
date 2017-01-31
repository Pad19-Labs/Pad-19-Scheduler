import _ from 'lodash'
import test from 'ava'

const scheduler = require('../lib/_index.js')
const data = require('./data/_index.js')

test.beforeEach(t => {
  t.context.data = data
})

test('returnKeynotes', t => {
  let keynoteTest = scheduler.scheduleTools.returnKeynotes(t.context.data.exampleGlobalSchedule)

  let keynoteArray = [
    {
      sessionId: 100,
      sessionPeriod: 0,
      sessionName: 'Keynote',
      sessionType: 'keynote',
      sessionSubject: '',
      sessionCapacity: 1200,
    },
    {
      sessionId: 400,
      sessionPeriod: 4,
      sessionName: 'Lunch Session',
      sessionType: 'keynote',
      sessionSubject: '',
      sessionCapacity: 1200,
    },
  ]

  t.deepEqual(keynoteTest, keynoteArray)
})

test("canIfit", t=>{
  let fullTest = scheduler.scheduleTools.caniFit(t.context.data.exampleGlobalSchedule, t.context.data.masterSchedule0, 401)
  let thereIsSpaceTest = scheduler.scheduleTools.caniFit(t.context.data.exampleGlobalSchedule, t.context.data.masterSchedule0, 100)
  let overBookingAllowanceTest = scheduler.scheduleTools.caniFit(t.context.data.exampleGlobalSchedule, t.context.data.masterSchedule0, 401, 2)

  t.is(fullTest, false)
  t.is(thereIsSpaceTest, true)
  t.is(overBookingAllowanceTest, true)
})

test('addToSession', t => {
  let testAttendee = 'attendee999'
  let failTest = scheduler.scheduleTools.addToSession(t.context.data.exampleGlobalSchedule, t.context.data.masterSchedule0, 22222, testAttendee)
  let goodTest = scheduler.scheduleTools.addToSession(t.context.data.exampleGlobalSchedule, t.context.data.masterSchedule0, 100, testAttendee)

  let foundResult = _.find(goodTest, {'sessionId': 100})
  foundResult = foundResult['attendees']
  let studentIndex = _.indexOf(foundResult, testAttendee)
  let student = foundResult[studentIndex]

  t.is(failTest, 'That is not a valid session.')
  t.is(student, testAttendee)
})

test('howManySessionPeriods', t => {
  let test = scheduler.scheduleTools.howManySessionPeriods(data.exampleGlobalSchedule)

  t.is(test, 7)
})
