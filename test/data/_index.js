module.exports = {
  'exampleCareerArray': [
    'skiing',
    'hiking',
    'cycling',
    'reading',
    'cooking',
    'running',
    'rowing',
  ],
  'exampleSurveyResults': [
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
  ],
  'exampleSurveyResultsTabulated': {
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
  },
  exampleSpeakerList: [
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
  ],
  exampleSpeakerListAvailable: {
    duplicates: 2,
    assignments: {
      speaker1: ['skiing', 'running'],
      speaker2: ['reading'],
      speaker3: ['rowing'],
      speaker4: ['cycling'],
      speaker5: ['cooking']
    }
  },
  exampleGlobalSchedule : [
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
      sessionId: 201,
      sessionPeriod: 2,
      sessionName: 'Intro Session',
      sessionType: 'breakout',
      sessionSubject: 'cycling',
      sessionCapacity: 60,
    },
    {
      sessionId: 301,
      sessionPeriod: 3,
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
    {
      sessionId: 501,
      sessionPeriod: 5,
      sessionName: 'Intro Session',
      sessionType: 'breakout',
      sessionSubject: 'cycling',
      sessionCapacity: 60,
    },
    {
      sessionId: 601,
      sessionPeriod: 6,
      sessionName: 'Intro Session',
      sessionType: 'breakout',
      sessionSubject: 'cycling',
      sessionCapacity: 60,
    },
  ],
  masterSchedule0:[
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
  ],
}
