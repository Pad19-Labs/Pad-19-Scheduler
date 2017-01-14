import _ from 'lodash'

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
    validateSchedule: function(schedule) {
      let _s = schedule;
      let returnValue = {
        'valid': false,
        'err': []
      };
      let _rve = returnValue.err;

      // Event Type
      if (_s.type === undefined) {
        _rve.push(`There should be an event type.`);
      }
      if (typeof(_s.type) !== 'string') {
        _rve.push(`Event type should be a string.`);
      }
      if (_s.type === '') {
        _rve.push(`Event type shouldn't be an empty string.`);
      }

      // Name
      if (_s.nameFirst === undefined) {
        _rve.push(`The first and last name should be set.`);
      }

      if (!Array.isArray(_s.schedule)) {
        _rve.push(`The schedule isn't an array.`);
      }

      if (_rve.length === 0) {
        returnValue = true;
      }
      return returnValue;
    },
    returnKeynotes: function(globalSchedule) {
      let keynotePeriods = []
      for (var i = 0; i < globalSchedule.length; i++) {
        if (globalSchedule[i].sessionType === 'keynote') {
          keynotePeriods.push(globalSchedule[i].sessionId);
        }

      }
      console.log(keynotePeriods);
      return keynotePeriods;
    }
  },
  generateSchedules: function(globalSchedule, attendees) {

    // set some temporary global sesssion info
    let stubbedGlobalSchedule = [];
    let foo = {};

    for (var i = 0; i < globalSchedule.length; i++) {
      stubbedGlobalSchedule.push(globalSchedule[i]);
      console.log(stubbedGlobalSchedule);
    }

    foo.global = stubbedGlobalSchedule;

    return foo;




  }
}
