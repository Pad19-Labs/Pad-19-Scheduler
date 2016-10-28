const exampleSurveyResults = [
  [ 'skiing', 'hiking', 'cycling' ],
  [ 'reading', 'cooking', 'cycling' ],
  [ 'running', 'reading', 'other' ],
  [ 'rowing', 'running', 'cycling' ],
  [ 'skiing', 'running', 'rowing' ],
  [ 'other', 'hiking', 'cycling' ],
  [ 'reading', 'skiing', 'cycling' ]
];

const exampleSurveyResultsTabulated = {
  totalResults: 7,
  individualResults : {
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
  { 'speaker1': [ 'skiing', 'running']},
  { 'speaker2': [ 'reading' ]},
  { 'speaker3': [ 'rowing' ]},
  { 'speaker4': [ 'reading', 'cycling' ]},
  { 'speaker5': [ 'cycling', 'cooking' ]}
];

const exampleSpeakerListAvailable = {
  duplicates: 2,
  assignments: {
    speaker1: [ 'skiing', 'running'],
    speaker2: [ 'reading' ],
    speaker3: [ 'rowing' ],
    speaker4: [ 'cycling' ],
    speaker5: [ 'cooking' ]
  }
};

let expect    = require('chai').expect;

let scheduler = require('../index.js');
let test = scheduler.test;

describe('initial test passes', function() {
  it('should return value given', function() {
    let testString = 'testing';
    let testFunction = test(testString);
    expect(testFunction).to.equal(testString);
  });
});

describe('an array of survey results should return an object with each tabulated', function() {

  it('should count the results', function() {
    let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
    expect(totalResultsFunction).to.equal(exampleSurveyResultsTabulated.totalResults);
  });

  it('should return count as a number', function() {
    let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
    expect(totalResultsFunction).to.be.a('number');
  })
});

describe('return a count of each type of result', function() {
  let trf = scheduler.surveyTools.tabulateResults(exampleSurveyResults);

  it('should count how many people like one thing', function() {
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
  it('should return human readable numbers if asked for', function() {
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

describe('should determine what speaker should speak if there is a duplicate', function() {
  let gsa = scheduler.surveyTools.getSpeakerAssingments;

  it('should count the duplicates', function() {
    expect(gsa.countDuplicates(exampleSpeakerList)).to.equal(2);
  })

  // it('should just let those with one subject talk on that subject', function() {
  //   expect(gsa).to.have.deep.property('speaker2', [ 'reading' ]);
  //   expect(gsa).to.have.deep.property('speaker3', [ 'rowing' ]);
  // });

  // it('should return correct speaker for duplicates', function() {
  //   expect(gsa).to.have.deep.property('speaker1', [ 'skiing', 'running' ]);
  //   expect(gsa).to.have.deep.property('speaker2', [ 'reading' ]);
  //   expect(gsa).to.have.deep.property('speaker3', [ 'rowing' ]);
  //   expect(gsa).to.have.deep.property('speaker4', [ 'cycling' ]);
  //   expect(gsa).to.have.deep.property('speaker5', [ 'cooking' ]);
  // });
});
