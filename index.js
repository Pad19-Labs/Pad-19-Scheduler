module.exports = {
  test: function(foo) {
    return foo;
  },

  surveyTools: {
    totalResults: function(surveyResults) {
      return surveyResults.length;
    }
  }
}
