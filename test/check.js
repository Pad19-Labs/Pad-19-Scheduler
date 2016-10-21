const exampleSurveyResults = [
  [ 'skiing', 'hiking', 'cycling' ],
  [ 'reading', 'cooking', 'cycling' ],
  [ 'running', 'reading', 'other' ],
  [ 'rowing', 'running', 'cycling' ],
  [ 'skiing', 'running', 'rowing' ],
  [ 'other', 'hiking', 'cycling' ],
  [ 'reading', 'skiing', 'cycling' ]
];

const exampleSurveyResultsTabulates = {
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

let expect    = require('chai').expect;

let scheduler = require('../index.js');
let test = scheduler.test;

describe('initial test passes', function() {
  it('should return value given', function() {
    let testString = 'testing';
    let testFunction = test(testString);
    expect(testFunction).to.equal(testString);
  });
})

describe('an array of survey results should return an object with each tabulated', function() {

  it('should count the results', function() {
    let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
    expect(totalResultsFunction).to.equal(exampleSurveyResultsTabulates.totalResults);
  });

  it('should return count as a number', function() {
    let totalResultsFunction = scheduler.surveyTools.totalResults(exampleSurveyResults);
    expect(totalResultsFunction).to.be.a('number');
  })
})
