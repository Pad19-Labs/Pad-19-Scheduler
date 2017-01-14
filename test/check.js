const _ = require('lodash');

const exampleCareerArray = [
  'skiing',
  'hiking',
  'cycling',
  'reading',
  'cooking',
  'running',
  'rowing',
]

const exampleSurveyResults = [
  {
    uuid: 'attendee1',
    surveyResults: ['skiing', 'hiking', 'cycling']
  },
  {
    uuid: 'attendee2',
    surveyResults: ['reading', 'cooking', 'cycling']
  },
  {
    uuid: 'attendee3',
    surveyResults: ['running', 'reading', 'other']
  },
  {
    uuid: 'attendee4',
    surveyResults: ['rowing', 'running', 'cycling']
  },
  {
    uuid: 'attendee5',
    surveyResults: ['skiing', 'running', 'rowing']
  },
  {
    uuid: 'attendee6',
    surveyResults: ['other', 'hiking', 'cycling']
  },
  {
    uuid: 'attendee7',
    surveyResults: ['reading', 'skiing', 'cycling']
  }
];

const exampleSurveyResultsTabulated = {
  totalResults: 7,
  individualResults: {
    skiing: 3,
    hiking: 2,
    cycling: 5,
    reading: 3,
    cooking: 1,
    running: 3,
    other: 2,
    rowing: 2
  }
}

const exampleSpeakerList = [
  {
    'speaker1': ['skiing', 'running']
  },
  {
    'speaker2': ['reading']
  },
  {
    'speaker3': ['rowing']
  },
  {
    'speaker4': ['reading', 'cycling']
  },
  {
    'speaker5': ['cycling', 'cooking']
  }
];

const exampleSpeakerListAvailable = {
  duplicates: 2,
  assignments: {
    speaker1: ['skiing', 'running'],
    speaker2: ['reading'],
    speaker3: ['rowing'],
    speaker4: ['cycling'],
    speaker5: ['cooking']
  }
};

const expect = require('chai').expect;
const scheduler = require('../index.js');

const exampleGlobalSchedule = [
  {
    sessionId: 100,
    sessionPeriod: 0,
    sessionName: 'Keynote',
    sessionType: 'keynote',
    sessionSubject: '',
    sessionCapacity: 1200,
  },
  {
    sessionId: 101,
    sessionPeriod: 1,
    sessionName: 'Cycling',
    sessionType: 'breakout',
    sessionSubject: 'cycling',
    sessionCapacity: 60,
  },
  {
    sessionId: 101,
    sessionPeriod: 1,
    sessionName: 'Intro Session',
    sessionType: 'breakout',
    sessionSubject: 'cycling',
    sessionCapacity: 60,
  },
  {
    sessionId: 400,
    sessionPeriod: 4,
    sessionName: 'Lunch Session',
    sessionType: 'keynote',
    sessionSubject: '',
    sessionCapacity: 1200,
  },
  {
    sessionId: 401,
    sessionPeriod: 4,
    sessionName: 'Special Tiny Session',
    sessionType: 'breakout',
    sessionSubject: 'cycling',
    sessionCapacity: 2,
  },
];

const masterSchedule0 = [
  {
    sessionId: 100,
    attendees: [
      'attendee1',
      'attendee2',
      'attendee3',
      'attendee4',
      'attendee5',
      'attendee6',
      'attendee7',
    ],
  },
  {
    sessionId: 401,
    attendees: [
      'attendee1',
      'attendee6',
    ]
  }
];


describe('surveyTools', () => {
  describe('totalResults', () => {
    it('should count the results', () => {
      let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
      expect(totalResultsFunction).to.equal(exampleSurveyResultsTabulated.totalResults);
    });

    it('should return count as a number', () => {
      let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
      expect(totalResultsFunction).to.be.a('number');
    });
  });

  describe('tabulateResults', () => {
    let trf = scheduler.surveyTools.tabulateResults(exampleSurveyResults);

    it('should count how many people like one thing', () => {
      expect(trf).to.have.deep.property('skiing', 2);
      expect(trf).to.have.deep.property('hiking', 1);
      expect(trf).to.have.deep.property('cycling', 4);
      expect(trf).to.have.deep.property('reading', 2);
      expect(trf).to.have.deep.property('cooking', 0);
      expect(trf).to.have.deep.property('running', 2);
      expect(trf).to.have.deep.property('other', 1);
      expect(trf).to.have.deep.property('rowing', 1);
    });

    let trfRedable = scheduler.surveyTools.tabulateResults(exampleSurveyResults, true);
    it('should return human readable numbers if asked for', () => {
      expect(trfRedable).to.have.deep.property('skiing', 3);
      expect(trfRedable).to.have.deep.property('hiking', 2);
      expect(trfRedable).to.have.deep.property('cycling', 5);
      expect(trfRedable).to.have.deep.property('reading', 3);
      expect(trfRedable).to.have.deep.property('cooking', 1);
      expect(trfRedable).to.have.deep.property('running', 3);
      expect(trfRedable).to.have.deep.property('other', 2);
      expect(trfRedable).to.have.deep.property('rowing', 2);
    });
  });

  describe('countDuplicates', () => {
    let gsa = scheduler.surveyTools.getSpeakerAssignments;

    it('should count the duplicates', () => {
      expect(gsa.countDuplicates(exampleSpeakerList)).to.equal(2);
    });
  });
});

describe('scheduleTools', () => {
  describe('returnKeynotes', () => {
    let keynoteTest = scheduler.scheduleTools.returnKeynotes(exampleGlobalSchedule);

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
    ];

    it('should return an array', () => {
      expect(keynoteTest).to.be.instanceof(Array);
    });

    it('should return all the keynotes present in the global schedule as an array', () => {

      expect(keynoteTest).to.deep.equal(keynoteArray);
    });
  });

  describe('caniFit', () => {
    let fullTest = scheduler.scheduleTools.caniFit(exampleGlobalSchedule, masterSchedule0, 401);
    let thereIsSpaceTest = scheduler.scheduleTools.caniFit(exampleGlobalSchedule, masterSchedule0, 100);
    let overBookingAllowanceTest = scheduler.scheduleTools.caniFit(exampleGlobalSchedule, masterSchedule0, 401, 2);


    it('should return false to add another attendee to full session', () => {
      expect(fullTest).to.equal(false);
    });

    it('should return true to add to a session wiht space', () => {
      expect(thereIsSpaceTest).to.equal(true);
    });

    it('should allow for a configuration that allows over-booking', () => {
      expect(overBookingAllowanceTest).to.equal(true);
    });
  });

  describe('addToSession', () => {
    let testAttendee = 'attendee999';
    let failTest = scheduler.scheduleTools.addToSession(exampleGlobalSchedule, masterSchedule0, 22222, testAttendee);
    let goodTest = scheduler.scheduleTools.addToSession(exampleGlobalSchedule, masterSchedule0, 100, testAttendee);

    expect(failTest).to.equal('That is not a valid session.');
    let foundResult = _.find(goodTest, {'sessionId': 100});
    foundResult = foundResult['attendees'];
    let studentIndex = _.indexOf(foundResult, testAttendee);
    let student = foundResult[studentIndex];
    expect(student).to.equal(testAttendee);
  });
});
