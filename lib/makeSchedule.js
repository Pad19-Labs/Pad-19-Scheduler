const _ = require('lodash');

const scheduleTools = require('./scheduleTools')

module.exports = {
  makeMasterSchedule: function(surveyResults, globalSchedule) {

    let keynotes = scheduleTools.returnKeynotes(globalSchedule);
    let masterSchedule = [];

    for (var i = 0; i < surveyResults.length; i++) {
      let studentSurveyResults = surveyResults[i];
    }

    return masterSchedule;
  },
}
