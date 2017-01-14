const _ = require('lodash');


module.exports = {
  surveyTools: {
    totalResults: function(surveyResults) {
      return surveyResults.length;
    },
    tabulateResults: function(resultsArray, humanReadable = false) {
      let counts = {};

      for (let i = 0; i < resultsArray.length; i++) {
        let resultArray = resultsArray[i];
        let attendeeArray = resultArray.surveyResults;
        for (let i = 0; i < attendeeArray.length; i++) {
          result = attendeeArray[i];
          if (counts.hasOwnProperty(result)) {
            counts[result]++;
          } else {
            if (humanReadable) {
              counts[result] = 1;
            } else {
              counts[result] = 0;
            }
          }
        }
      }
      return counts;
    },
    getSpeakerAssignments: {
      countDuplicates: function(speakersArray) {

        let duplicates = 0;
        let subjectsArray = [];

        for (let i = 0; i < speakersArray.length; i++) {

          let speakerObject = speakersArray[i];
          for (speaker in speakerObject) {
            let speakerTalks = speakerObject[speaker];
            for (let i = 0; i < speakerTalks.length; i++) {
              if (subjectsArray.includes(speakerTalks[i])) {
                duplicates++;
              } else {
                subjectsArray.push(speakerTalks[i]);
              }
            }
          }
        }
        return duplicates;
      },
      filterForDuplicates: function(speakersArray) {
        let speakerAssignments = {};

        for (let i = 0; i < speakersArray.length; i++) {
          let speakerObject = speakersArray[i];
          for (speaker in speakerObject) {
            let speakerTalks = speakerObject[speaker];
            if (speakerTalks.length > 1) {
              // do something
            } else {
              speakerAssignments[speaker] = speakerTalks;
            }
          }
        }
        return speakerAssignments;
      }
    }
  },
  scheduleTools: {
    returnKeynotes: function(globalSchedule) {
      let keynotePeriods = []
      for (var i = 0; i < globalSchedule.length; i++) {
        if (globalSchedule[i].sessionType === 'keynote') {
          keynotePeriods.push(globalSchedule[i].sessionId);
        }

      }
      return keynotePeriods;
    },
    caniFit: function(globalSchedule, masterScheduleSoFar, sessionId, overBooking = 0) {

      let session = _.find(masterScheduleSoFar, { 'sessionId': sessionId });
      let sessionCurrentCount = session.attendees.length;
      let sessionDetails = _.find(globalSchedule, { 'sessionId': sessionId });
      let sessionMax = sessionDetails.sessionCapacity + overBooking;

      return sessionCurrentCount < sessionMax;
    },
    addToSession: function(globalSchedule, masterScheduleSoFar, sessionId, studentId) {

      let sessionIndex = _.findIndex(globalSchedule, { 'sessionId': sessionId });

      if (sessionIndex != -1) {
        let foo = masterScheduleSoFar[sessionIndex]['attendees'];
        foo.push(studentId);
        return masterScheduleSoFar
      } else {
        return 'That is not a valid session.';
      }
    },
  },
}
