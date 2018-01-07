// eslint-disable-next-line
const _ = require('lodash')

const scheduleTools = require('./scheduleTools')

module.exports = {
  makeMasterSchedule: function(surveyResults, globalSchedule) {

    // eslint-disable-next-line
    let keynotes = scheduleTools.returnKeynotes(globalSchedule)
    let masterSchedule = []

    for (var i = 0; i < surveyResults.length; i++) {
      // eslint-disable-next-line
      let studentSurveyResults = surveyResults[i]
    }

    return masterSchedule
  },
}
