const expect = require('chai').expect
const scheduler = require('../lib/_index.js')

const data = require('./data/_index.js')

describe('surveyTools', () => {
  describe('totalResults', () => {
    it('should count the results', () => {
      let totalResultsFunction = scheduler.surveyTools.totalResults(data.exampleSurveyResults)
      expect(totalResultsFunction).to.equal(data.exampleSurveyResultsTabulated.totalResults)
    })

    it('should return count as a number', () => {
      let totalResultsFunction = scheduler.surveyTools.totalResults(data.exampleSurveyResults)
      expect(totalResultsFunction).to.be.a('number')
    })
  })

  describe('tabulateResults', () => {
    let trf = scheduler.surveyTools.tabulateResults(data.exampleSurveyResults)

    it('should count how many people like one thing', () => {
      expect(trf).to.have.deep.property('skiing', 2)
      expect(trf).to.have.deep.property('hiking', 1)
      expect(trf).to.have.deep.property('cycling', 4)
      expect(trf).to.have.deep.property('reading', 2)
      expect(trf).to.have.deep.property('cooking', 0)
      expect(trf).to.have.deep.property('running', 2)
      expect(trf).to.have.deep.property('other', 1)
      expect(trf).to.have.deep.property('rowing', 1)
    })

    let trfRedable = scheduler.surveyTools.tabulateResults(data.exampleSurveyResults, true)
    it('should return human readable numbers if asked for', () => {
      expect(trfRedable).to.have.deep.property('skiing', 3)
      expect(trfRedable).to.have.deep.property('hiking', 2)
      expect(trfRedable).to.have.deep.property('cycling', 5)
      expect(trfRedable).to.have.deep.property('reading', 3)
      expect(trfRedable).to.have.deep.property('cooking', 1)
      expect(trfRedable).to.have.deep.property('running', 3)
      expect(trfRedable).to.have.deep.property('other', 2)
      expect(trfRedable).to.have.deep.property('rowing', 2)
    })
  })

  describe('countDuplicates', () => {
    let gsa = scheduler.surveyTools.getSpeakerAssignments

    it('should count the duplicates', () => {
      expect(gsa.countDuplicates(data.exampleSpeakerList)).to.equal(2)
    })
  })
})
