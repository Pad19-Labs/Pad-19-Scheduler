const _ = require('lodash')

const expect = require('chai').expect
const scheduler = require('../lib/_index.js')

const data = require('./data/_index.js')

describe('scheduleTools', () => {
  describe('returnKeynotes', () => {
    let keynoteTest = scheduler.scheduleTools.returnKeynotes(data.exampleGlobalSchedule)

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

    it('should return an array', () => {
      expect(keynoteTest).to.be.instanceof(Array)
    })

    it('should return all the keynotes present in the global schedule as an array', () => {

      expect(keynoteTest).to.deep.equal(keynoteArray)
    })
  })

  describe('caniFit', () => {
    let fullTest = scheduler.scheduleTools.caniFit(data.exampleGlobalSchedule, data.masterSchedule0, 401)
    let thereIsSpaceTest = scheduler.scheduleTools.caniFit(data.exampleGlobalSchedule, data.masterSchedule0, 100)
    let overBookingAllowanceTest = scheduler.scheduleTools.caniFit(data.exampleGlobalSchedule, data.masterSchedule0, 401, 2)


    it('should return false to add another attendee to full session', () => {
      expect(fullTest).to.equal(false)
    })

    it('should return true to add to a session wiht space', () => {
      expect(thereIsSpaceTest).to.equal(true)
    })

    it('should allow for a configuration that allows over-booking', () => {
      expect(overBookingAllowanceTest).to.equal(true)
    })
  })

  describe('addToSession', () => {
    let testAttendee = 'attendee999'
    let failTest = scheduler.scheduleTools.addToSession(data.exampleGlobalSchedule, data.masterSchedule0, 22222, testAttendee)
    let goodTest = scheduler.scheduleTools.addToSession(data.exampleGlobalSchedule, data.masterSchedule0, 100, testAttendee)

    it('Should fail to add to an invalid session', () => {
      expect(failTest).to.equal('That is not a valid session.')
    })

    it('Should add to a valid session', () => {
      let foundResult = _.find(goodTest, {'sessionId': 100})
      foundResult = foundResult['attendees']
      let studentIndex = _.indexOf(foundResult, testAttendee)
      let student = foundResult[studentIndex]
      expect(student).to.equal(testAttendee)
    })
  })

  describe('howManySessionPeriods', () => {
    it('Should return how many Session Periods there are', () => {
      let test = scheduler.scheduleTools.howManySessionPeriods(data.exampleGlobalSchedule)
      expect(test).to.equal(7)
    })
  })
})
