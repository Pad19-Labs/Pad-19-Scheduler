const _ = require('lodash')

module.exports = {
  returnKeynotes: function(globalSchedule) {
    let keynotes = []
    for (var i = 0; i < globalSchedule.length; i++) {
      if (globalSchedule[i].sessionType === 'keynote') {
        keynotes.push(globalSchedule[i])
      }

    }
    return keynotes
  },
  caniFit: function(globalSchedule, masterScheduleSoFar, sessionId, overBooking = 0) {

    let session = _.find(masterScheduleSoFar, { 'sessionId': sessionId })
    let sessionCurrentCount = session.attendees.length
    let sessionDetails = _.find(globalSchedule, { 'sessionId': sessionId })
    let sessionMax = sessionDetails.sessionCapacity + overBooking

    return sessionCurrentCount < sessionMax
  },
  addToSession: function(globalSchedule, masterScheduleSoFar, sessionId, studentId) {

    let sessionIndex = _.findIndex(globalSchedule, { 'sessionId': sessionId })

    if (sessionIndex != -1) {
      let foo = masterScheduleSoFar[sessionIndex]['attendees']
      foo.push(studentId)
      return masterScheduleSoFar
    } else {
      return 'That is not a valid session.'
    }
  },
  howManySessionPeriods: function(globalSchedule) {
    let howMany
    let rawArray = []

    _.forEach(globalSchedule, (value) => {
      rawArray.push(value['sessionPeriod'])
    })
    // This is +1 to return human readable number
    howMany = _.max(rawArray) + 1

    return howMany
  },
}
